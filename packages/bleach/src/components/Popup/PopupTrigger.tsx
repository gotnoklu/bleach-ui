import {
  type ForwardedRef,
  type ReactElement,
  type ReactNode,
  cloneElement,
  forwardRef,
  isValidElement,
} from 'react'
import { Pressable, type View } from 'react-native'
import { usePopupContext } from './context'

export interface PopupTriggerProps {
  triggerOnEvent?: 'onPress' | 'onPressIn' | 'onPressOut' | 'onLongPress'
  children: ReactNode
}

const PopupTrigger = forwardRef(function PopupTrigger(
  { triggerOnEvent = 'onPress', children }: PopupTriggerProps,
  ref: ForwardedRef<View>
) {
  const { onShow } = usePopupContext()

  if (isValidElement(children)) {
    return cloneElement(children as Exclude<typeof children, ReactElement>, {
      ref,
      [triggerOnEvent]: onShow,
    })
  }

  return (
    <Pressable ref={ref} {...{ [triggerOnEvent]: onShow }}>
      {children}
    </Pressable>
  )
})

export default PopupTrigger
