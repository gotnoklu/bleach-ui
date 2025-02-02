import {
  type ForwardedRef,
  type ReactElement,
  type ReactNode,
  cloneElement,
  forwardRef,
  isValidElement,
} from 'react'
import { Pressable, type ViewProps, type View } from 'react-native'
import { usePopupContext } from './context'

export interface PopupTriggerProps extends ViewProps {
  triggerOnEvent?: 'onPress' | 'onPressIn' | 'onPressOut' | 'onLongPress'
  children: ReactNode
}

const PopupTrigger = forwardRef(function PopupTrigger(
  { triggerOnEvent = 'onPress', children, ...props }: PopupTriggerProps,
  ref: ForwardedRef<View>
) {
  const { onShow } = usePopupContext()

  if (isValidElement(children)) {
    return cloneElement(children as Exclude<typeof children, ReactElement>, {
      ...props,
      ref,
      [triggerOnEvent]: onShow,
    })
  }

  return (
    <Pressable {...{ ...props, [triggerOnEvent]: onShow }} ref={ref}>
      {children}
    </Pressable>
  )
})

export default PopupTrigger
