import {
  type MutableRefObject,
  type PropsWithRef,
  type ReactElement,
  type ReactNode,
  cloneElement,
  isValidElement,
  useMemo,
  useRef,
  useState,
} from 'react'
import {
  Modal,
  type ModalProps,
  Pressable,
  StyleSheet,
  type View,
  type ViewProps,
  useWindowDimensions,
} from 'react-native'
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated'
import type { SxProps } from '../../theme/types'
import { styled } from '../../theme/utilities'
import Show from '../Show'
import { PopupProvider } from './context'
import PopupTrigger, { type PopupTriggerProps } from './PopupTrigger'
import PopupContent from './PopupContent'

export interface PopupProps
  extends Omit<ModalProps, 'children'>,
    SxProps<Omit<ModalProps, 'children'>> {
  position?: 'top' | 'bottom' | 'top-left' | 'bottom-left' | 'top-right' | 'bottom-right' | 'center'
  elevate?: boolean
  children: Array<ReactNode>
}

export { PopupTrigger, PopupContent }

function getPopupChildren(
  children: Array<ReactNode>,
  refs: { trigger: MutableRefObject<View | null> }
) {
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
          child as ReactElement<
            PropsWithRef<PopupTriggerProps & { ref: MutableRefObject<View | null> }>
          >,
          { ref: refs.trigger }
        )
      } else if (child.type === PopupContent) {
        result[1] = child
      }
    }
  }

  return result
}

const StyledPopup = styled(Modal)<
  Omit<PopupProps, 'sx' | 'children' | 'popper'> & { children: ReactNode }
>({})

export default function Popup({
  position = 'bottom',
  elevate = false,
  children,
  ...props
}: PopupProps) {
  const elevatedContentRef = useRef<View | null>(null)
  const triggerRef = useRef<View | null>(null)
  const dimensions = useWindowDimensions()
  const scale = useSharedValue(0.5)
  const triggerOffsets = useRef({ width: 0, height: 0, top: 0, left: 0 })

  const [state, setState] = useState({
    shown: false,
    content: {} as { top: number; left: number; right: number; bottom: number },
    elevation: { width: 0, height: 0, top: 0, left: 0 },
  })

  const animationStyles = useAnimatedStyle(() => {
    return {
      transform: [
        {
          scale: withSpring(scale.value, {
            duration: 100,
            stiffness: 200,
            dampingRatio: 0.7,
          }),
        },
      ],
    }
  })

  function showContent() {
    triggerRef.current?.measureInWindow((left, top, width, height) => {
      triggerOffsets.current = { left, top, width, height }
      setState((prev) => ({ ...prev, shown: true }))
    })
  }

  function calculateContentLayout(view: View | null) {
    view?.measure((_left, _top, _width, height) => {
      const styles = {} as { top: number; left: number; right: number; bottom: number }

      if (position.startsWith('top')) {
        if (triggerOffsets.current.top <= height + 8) {
          styles.top = triggerOffsets.current.top + triggerOffsets.current.height + 8
        } else {
          styles.bottom = dimensions.height - triggerOffsets.current.top + 8
        }

        if (position.endsWith('right')) {
          styles.right =
            dimensions.width - triggerOffsets.current.width - triggerOffsets.current.left
        } else if (position === 'top' || position.endsWith('left')) {
          styles.left = triggerOffsets.current.left
        }
      } else if (position.startsWith('bottom')) {
        if (
          triggerOffsets.current.top + triggerOffsets.current.height + 8 + height >=
          dimensions.height
        ) {
          styles.bottom = dimensions.height - triggerOffsets.current.top + 8
        } else {
          styles.top = triggerOffsets.current.top + triggerOffsets.current.height + 8
        }

        if (position.endsWith('right')) {
          styles.right =
            dimensions.width - triggerOffsets.current.width - triggerOffsets.current.left
        } else if (position === 'bottom' || position.endsWith('left')) {
          styles.left = triggerOffsets.current.left
        }
      }

      scale.value = 1
      setState((prev) => ({
        ...prev,
        shown: true,
        content: styles,
        elevation: triggerOffsets.current,
      }))
    })
  }

  function hideContent() {
    scale.value = 0.5
    setState((prev) => ({ ...prev, shown: false }))
  }

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
              backgroundColor: elevate ? 'rgba(100, 100, 100, 0.5)' : 'transparent',
            },
          ]}
          onPress={hideContent}
        >
          <Show visible={elevate}>
            {isValidElement(trigger)
              ? cloneElement(
                  trigger as ReactElement<ViewProps & { ref: MutableRefObject<View | null> }>,
                  {
                    ref: elevatedContentRef,
                    style: {
                      flex: 0,
                      ...state.elevation,
                    },
                  }
                )
              : trigger}
          </Show>
          <Animated.View
            ref={calculateContentLayout}
            style={[
              animationStyles,
              {
                position: 'absolute',
                ...state.content,
              },
            ]}
          >
            {content}
          </Animated.View>
        </Pressable>
      </StyledPopup>
    </PopupProvider>
  )
}
