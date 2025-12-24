import {
  cloneElement,
  isValidElement,
  type MutableRefObject,
  type PropsWithRef,
  type ReactElement,
  type ReactNode,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import { Animated, Modal, type ModalProps, Pressable, StyleSheet, useWindowDimensions, type View } from 'react-native'
import { styled } from '../../theme/styles'
import { PopupProvider } from './context'
import { PopupContent } from './PopupContent'
import { PopupTrigger, type PopupTriggerProps } from './PopupTrigger'

export interface PopupProps extends Omit<ModalProps, 'children'> {
  variant?: 'default' //| 'elevated'
  position?:
    | 'top'
    | 'top-center'
    | 'top-right'
    | 'left'
    | 'left-top'
    | 'left-bottom'
    | 'left-center'
    | 'right'
    | 'right-top'
    | 'right-bottom'
    | 'right-center'
    | 'bottom'
    | 'bottom-center'
    | 'bottom-right'
    | 'center'
  offsetMargin?: number | { x: number } | { y: number } | { x: number; y: number }
  showOnMount?: boolean
  children: Array<ReactNode>
}

export { PopupTrigger, PopupContent }

function getPopupChildren(children: Array<ReactNode>, refs: { trigger: MutableRefObject<View | null> }) {
  const result = [null, null] as [
    ReactElement<PropsWithRef<PopupTriggerProps & { ref: MutableRefObject<View | null> }>> | null,
    ReactNode,
  ]
  let index = 0
  let child: ReactNode

  for (index; index < children.length; index++) {
    child = children[index]
    if (isValidElement(child)) {
      if (child.type === PopupTrigger) {
        result[0] = cloneElement(
          child as ReactElement<PropsWithRef<PopupTriggerProps & { ref: MutableRefObject<View | null> }>>,
          { ref: refs.trigger }
        )
      } else if (child.type === PopupContent) {
        result[1] = child
      }
    }
  }

  return result
}

const StyledPopup = styled(Modal)<Omit<PopupProps, 'children' | 'popper'> & { children: ReactNode }>({})

export function Popup({
  position = 'bottom',
  variant = 'default',
  showOnMount = false,
  offsetMargin = 8,
  children,
  ...props
}: PopupProps) {
  const triggerRef = useRef<View | null>(null)
  const contentRef = useRef<View | null>(null)
  const dimensions = useWindowDimensions()
  const scale = useRef(new Animated.Value(1)).current
  const opacity = useRef(new Animated.Value(0)).current
  const [state, setState] = useState({
    shown: false,
    targetRect: { width: 0, height: 0, x: 0, y: 0 },
    contentOffsets: { left: 0, top: 0 },
    contentOffsetsSet: false,
  })

  function showContent() {
    triggerRef.current?.measureInWindow((x, y, width, height) => {
      setState((prev) => ({ ...prev, shown: true, targetRect: { x, y, width, height } }))
    })
  }

  function hideContent() {
    Animated.spring(scale, {
      speed: 30,
      bounciness: 100,
      toValue: 0,
      useNativeDriver: true,
    }).start(({ finished }) => {
      if (finished) {
        setState((prev) => ({
          ...prev,
          shown: false,
          contentOffsetsSet: false,
          targetRect: { width: 0, height: 0, x: 0, y: 0 },
          contentOffsets: { left: 0, top: 0 },
        }))
      }
    })
  }

  useLayoutEffect(() => {
    if (state.shown) {
      contentRef.current?.measure((_x, _y, width, height) => {
        const xyOffsets = { left: 0, top: 0 }
        const marginX =
          typeof offsetMargin === 'number'
            ? offsetMargin
            : typeof offsetMargin === 'object' && 'x' in offsetMargin
              ? offsetMargin.x
              : 0
        const marginY =
          typeof offsetMargin === 'number'
            ? offsetMargin
            : typeof offsetMargin === 'object' && 'y' in offsetMargin
              ? offsetMargin.y
              : 0

        if (position.startsWith('top') || position.startsWith('bottom')) {
          if (position.endsWith('-right')) {
            xyOffsets.left = state.targetRect.x + state.targetRect.width - width
          } else if (position.endsWith('-center')) {
            xyOffsets.left = state.targetRect.x + state.targetRect.width / 2 - width / 2
          } else {
            xyOffsets.left = state.targetRect.x
          }

          if (position.startsWith('top')) {
            xyOffsets.top = state.targetRect.y - height - marginY
          } else if (position.startsWith('bottom')) {
            if (state.targetRect.y + state.targetRect.height + marginY + height >= dimensions.height) {
              xyOffsets.top = state.targetRect.y - height - marginY
            } else {
              xyOffsets.top = state.targetRect.y + state.targetRect.height + marginY
            }
          }
        } else if (position.startsWith('left') || position.startsWith('right')) {
          if (state.targetRect.y + state.targetRect.height + marginY + height >= dimensions.height) {
            xyOffsets.top = state.targetRect.y + state.targetRect.height - height
          } else {
            if (position.endsWith('-top')) {
              xyOffsets.top = state.targetRect.y - height - marginY
            } else if (position.endsWith('-bottom')) {
              xyOffsets.top = state.targetRect.y + height + marginY
            } else if (position.endsWith('-center')) {
              xyOffsets.top = state.targetRect.y + state.targetRect.height / 2 - height / 2
            } else {
              xyOffsets.top = state.targetRect.y
            }
          }

          if (position.startsWith('left')) {
            xyOffsets.left = state.targetRect.x - width - marginX
          } else if (position.startsWith('right')) {
            xyOffsets.left = state.targetRect.x + state.targetRect.width + marginX
          }
        } else if (position === 'center') {
          xyOffsets.top = state.targetRect.y + state.targetRect.height / 2 - height / 2
          xyOffsets.left = state.targetRect.x + state.targetRect.width / 2 - width / 2
        }

        setState((prev) => ({ ...prev, contentOffsetsSet: true, contentOffsets: xyOffsets }))
        scale.setValue(0)
        opacity.setValue(1)
      })
    }
  }, [state.shown])

  useLayoutEffect(() => {
    if (state.contentOffsetsSet) {
      Animated.spring(scale, {
        speed: 30,
        bounciness: 100,
        toValue: 1,
        useNativeDriver: true,
      }).start()
    } else {
      scale.setValue(1)
      opacity.setValue(0)
    }
  }, [state.contentOffsetsSet])

  useEffect(() => {
    if (showOnMount) {
      showContent()
    }

    return () => {
      hideContent()
    }
  }, [])

  const [trigger, content] = useMemo(() => {
    return getPopupChildren(children, { trigger: triggerRef })
  }, [children])

  return (
    <PopupProvider onShow={showContent}>
      {trigger}
      <StyledPopup
        visible={state.shown}
        animationType="none"
        transparent={true}
        onDismiss={hideContent}
        onRequestClose={hideContent}
        {...props}
      >
        <Pressable
          style={[
            StyleSheet.absoluteFill,
            {
              overflow: 'hidden',
              backgroundColor: 'transparent', //variant === 'elevated' ? 'rgba(100, 100, 100, 0.5)' : 'transparent',
            },
          ]}
          onPress={hideContent}
        >
          {/* <Show when={variant === 'elevated'}>
            <View style={{ height: '100%', width: '100%', position: 'relative' }}>
              <View
                style={{
                  position: 'absolute',
                  left: state.targetRect.x,
                  top: state.targetRect.y,
                  width: state.targetRect.width,
                  height: state.targetRect.height,
                }}
              >
                {state.shown && variant === 'elevated' ? trigger : null}
              </View>
            </View>
          </Show> */}
          <Animated.View
            ref={contentRef}
            style={[{ opacity }, { transform: [{ scale }] }, { position: 'absolute', ...state.contentOffsets }]}
          >
            {content}
          </Animated.View>
        </Pressable>
      </StyledPopup>
    </PopupProvider>
  )
}
