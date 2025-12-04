import { cloneElement, type ForwardedRef, forwardRef, isValidElement, type ReactElement, type ReactNode } from 'react'
import { Pressable, type View, type ViewProps } from 'react-native'
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
      [triggerOnEvent]: onShow,
      ...props,
      ref,
    })
  }

  return (
    <Pressable {...{ [triggerOnEvent]: onShow, ...props }} ref={ref}>
      {children}
    </Pressable>
  )
})

export PopupTrigger
