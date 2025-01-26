import {
  Modal,
  type ModalProps,
  Pressable,
  StyleSheet,
  useWindowDimensions,
  type View,
} from 'react-native'
import { styled } from '../../theme/utilities'
import type { SxProps } from '../../theme/types'
import {
  isValidElement,
  useRef,
  type ReactElement,
  cloneElement,
  Fragment,
  useMemo,
  useState,
  useLayoutEffect,
} from 'react'
import Show from '../Show'
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated'

export interface PopupProps extends ModalProps, SxProps<ModalProps> {
  position?: 'top' | 'bottom' | 'top-left' | 'bottom-left' | 'top-right' | 'bottom-right' | 'center'
  showOnEvent?: 'onPress' | 'onPressIn' | 'onPressOut' | 'onLongPress'
  popper: ReactElement
  elevate?: boolean
}

const StyledPopup = styled(Modal)<Omit<PopupProps, 'sx' | 'popper' | 'showOnEvent'>>({})

export default function Popup({
  popper,
  position = 'bottom',
  elevate = false,
  showOnEvent = 'onPress',
  children,
  ...props
}: PopupProps) {
  const elevatedRef = useRef<View | null>(null)
  const popperRef = useRef<View | null>(null)
  const childrenRef = useRef<View | null>(null)
  const dimensions = useWindowDimensions()
  const animationHeight = useSharedValue(0.5)
  const [popupState, setPopupState] = useState({
    shown: false,
    popper: {} as { top: number; left: number; right: number; bottom: number },
    elevated: { width: 0, height: 0, top: 0, left: 0 },
  })
  const childrenStyles = useRef({ width: 0, height: 0, top: 0, left: 0 })

  const popupAnimationStyles = useAnimatedStyle(() => {
    return {
      transform: [
        {
          scale: withSpring(animationHeight.value, {
            duration: 100,
            stiffness: 200,
            dampingRatio: 0.7,
          }),
        },
      ],
    }
  })

  function showPopper() {
    childrenRef.current?.measureInWindow((left, top, width, height) => {
      childrenStyles.current = { left, top, width, height }
      setPopupState((prev) => ({ ...prev, shown: true }))
    })
  }

  useLayoutEffect(() => {
    if (popupState.shown) {
      popperRef.current?.measure((_left, _top, _width, height) => {
        const styles = {} as { top: number; left: number; right: number; bottom: number }

        if (position.startsWith('top')) {
          if (childrenStyles.current.top <= height + 8) {
            styles.top = childrenStyles.current.top + childrenStyles.current.height + 8
          } else {
            styles.bottom = dimensions.height - childrenStyles.current.top + 8
          }

          if (position.endsWith('right')) {
            styles.right =
              dimensions.width - childrenStyles.current.width - childrenStyles.current.left
          } else if (position === 'top' || position.endsWith('left')) {
            styles.left = childrenStyles.current.left
          }
        } else if (position.startsWith('bottom')) {
          if (
            childrenStyles.current.top + childrenStyles.current.height + 8 + height >=
            dimensions.height
          ) {
            styles.bottom = dimensions.height - childrenStyles.current.top + 8
          } else {
            styles.top = childrenStyles.current.top + childrenStyles.current.height + 8
          }

          if (position.endsWith('right')) {
            styles.right =
              dimensions.width - childrenStyles.current.width - childrenStyles.current.left
          } else if (position === 'bottom' || position.endsWith('left')) {
            styles.left = childrenStyles.current.left
          }
        }

        animationHeight.value = 1
        setPopupState((prev) => ({
          ...prev,
          shown: true,
          popper: styles,
          elevated: childrenStyles.current,
        }))
      })
    }
  }, [popupState.shown])

  function closePopper() {
    animationHeight.value = 0.5
    setPopupState((prev) => ({ ...prev, shown: false }))
  }

  const popupChildren = useMemo(() => {
    return isValidElement(children) ? (
      cloneElement(children as Exclude<typeof children, ReactElement>, {
        ref: childrenRef,
        [showOnEvent]: showPopper,
      })
    ) : (
      <Pressable ref={childrenRef} {...{ [showOnEvent]: showPopper }}>
        {children}
      </Pressable>
    )
  }, [children])

  return (
    <Fragment>
      {popupChildren}
      <StyledPopup
        visible={popupState.shown}
        animationType="none"
        transparent={true}
        onDismiss={closePopper}
        onRequestClose={closePopper}
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
          onPress={closePopper}
        >
          <Show visible={elevate}>
            {isValidElement(popupChildren)
              ? cloneElement(popupChildren as ReactElement<{ style: any; ref: any }>, {
                  ref: elevatedRef,
                  style: {
                    flex: 0,
                    ...popupState.elevated,
                  },
                })
              : popupChildren}
          </Show>
          <Animated.View
            ref={popperRef}
            style={[
              popupAnimationStyles,
              {
                position: 'absolute',
                ...popupState.popper,
              },
            ]}
          >
            {popper}
          </Animated.View>
        </Pressable>
      </StyledPopup>
    </Fragment>
  )
}
