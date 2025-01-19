import type { PressableProps, StyleProp, TextStyle, View, ViewStyle } from 'react-native'
import type { BaseTheme, Color, Merge, Palette, Sx, TextColor, Theme } from '../types'
import { useTheme } from '../hooks'
import {
  type Component,
  type ComponentProps,
  type ComponentType,
  createElement,
  forwardRef,
  type ForwardRefExoticComponent,
  type PropsWithChildren,
  type PropsWithoutRef,
  type RefAttributes,
} from 'react'
import { _DEFAULT_BASE_THEME } from '../constants'

function isObject<TValue>(value: TValue): value is Record<PropertyKey, any> {
  return Object.prototype.toString.call(value) === '[object Object]'
}

export function merge<TObjects extends Array<Record<PropertyKey, any> | undefined>>(
  ...objects: TObjects
): Merge<TObjects> {
  const merged = {} as Merge<TObjects>

  let index = 0
  let object: TObjects[number]
  for (index; index < objects.length; index++) {
    object = objects[index]

    if (object === undefined) continue

    for (const key in object) {
      const value = object[key]
      if (value !== undefined) {
        if (isObject(value) && isObject(merged[key])) {
          merged[key] = merge(merged[key] as object, value)
        } else if (Array.isArray(value) && Array.isArray(merged[key]) && value.length > 0) {
          merged[key] = (merged[key] as Array<unknown>).concat(value) as Merge<TObjects>[Extract<
            keyof TObjects[number],
            string
          >]
        } else {
          merged[key] = value
        }
      }
    }
  }

  return merged
}

export function createTheme(theme: BaseTheme): Theme {
  return merge(_DEFAULT_BASE_THEME, theme) as Theme
}

export function getThemeProperty(config: {
  object: Theme | Palette | TextColor
  key: keyof Palette | keyof TextColor | (string & {})
  fallback?: string
}): string | undefined {
  const { object, key, fallback } = config
  if (key in object) {
    const color = object[key as keyof typeof object]
    if (typeof color === 'string') return color
    if ('main' in color) return (color as Exclude<Color, string>).main
    return fallback
  }

  let result = object
  const splitPaths = key.split('.')
  for (const path of splitPaths) {
    if (typeof result === 'object') {
      result = result[path as keyof typeof object] as any
    } else {
      break
    }
  }

  if (typeof result === 'object' && 'main' in result) {
    return result.main as string
  }

  return (result as unknown as string | undefined) ?? fallback
}

export function styled<
  const TElement extends
    | ComponentType<PropsWithChildren<{ style?: StyleProp<ViewStyle> }>>
    | ComponentType<PropsWithChildren<{ style?: StyleProp<TextStyle> }>>
    | ForwardRefExoticComponent<PressableProps & RefAttributes<View>>,
>(el: TElement) {
  return function createStyledComponent<
    TProps extends ComponentProps<TElement> | Record<string, any>,
  >(
    styles:
      | Exclude<TProps['style'], (...args: any[]) => any>
      | ((theme: Theme, props: TProps) => Exclude<TProps['style'], (...args: any[]) => any>)
  ) {
    return forwardRef<TElement, TProps & { sx?: Sx<TElement> }>(function Component(
      { sx, style, ...props },
      ref
    ) {
      const theme = useTheme()
      let finalStyles = style
      let finalSx: Sx<TElement> | StyleProp<any> | undefined = sx
      if (typeof styles === 'function') finalStyles = styles(theme, props as TProps)
      if (typeof sx === 'function') finalSx = sx(theme)
      if (typeof style === 'function') {
        return createElement(
          el as any,
          {
            style: (...args: any[]) => {
              return merge(finalStyles, finalSx, style(...args))
            },
            ref,
            ...props,
          } as any
        )
      }

      return createElement(
        el as any,
        { style: [finalStyles, finalSx, style], ref, ...props } as any
      )
    }) as ForwardRefExoticComponent<
      PropsWithoutRef<
        TProps & {
          sx?: Sx<TElement>
        }
      > &
        RefAttributes<Component<TProps>>
    >
  }
}

type StyleObject = Record<string, ViewStyle | TextStyle>

export function createStyles<
  TProps extends Record<string, any> | undefined,
  const TStyles extends StyleObject,
>(styles: TStyles | ((theme: Theme, props: TProps) => TStyles)) {
  return function useStyles(props?: TProps): TStyles {
    const theme = useTheme()
    if (typeof styles === 'function') {
      return styles(theme, props as TProps) as TStyles
    }
    return styles as TStyles
  }
}

export function createComponentStyles<
  TProps extends Record<string, any> | undefined,
  const TStyles extends ViewStyle | TextStyle,
>(styles: TStyles | ((theme: Theme, props: TProps) => TStyles)) {
  return function useStyles(props?: TProps): TStyles {
    const theme = useTheme()
    if (typeof styles === 'function') {
      return styles(theme, props as TProps) as TStyles
    }
    return styles as TStyles
  }
}

export function selectStyles<
  TStyles extends Array<{
    if?: boolean
    styles: StyleProp<ViewStyle> | StyleProp<TextStyle>
    fallback?: StyleProp<ViewStyle> | StyleProp<TextStyle>
  }>,
>(...styles: TStyles): TStyles[number]['styles'] {
  const result = [] as Array<TStyles[number]['styles']>

  for (const def of styles) {
    if (def.if === true || !('if' in def)) {
      result.push(def.styles)
    } else if (def.fallback !== undefined) {
      result.push(def.fallback)
    }
  }

  return merge(...result.filter((style) => style !== null)) as TStyles[number]['styles']
}
