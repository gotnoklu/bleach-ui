import {
  type Component,
  type ComponentProps,
  type ComponentType,
  type ForwardRefExoticComponent,
  type PropsWithChildren,
  type PropsWithoutRef,
  type RefAttributes,
  createElement,
  forwardRef,
} from 'react'
import type { PressableProps, StyleProp, TextStyle, View, ViewStyle } from 'react-native'
import { _DEFAULT_BASE_THEME } from '../constants'
import { useTheme } from '../hooks'
import type { BaseTheme, Color, Merge, Palette, Sx, TextColor, Theme } from '../types'

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
>(
  el: TElement,
  config?: {
    omitProps?: Array<string> | ((prop: string) => boolean)
    allowOnlyProps?: Array<string> | ((prop: string) => boolean)
  }
) {
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
      const componentStyles = typeof styles === 'function' ? styles(theme, props as TProps) : styles
      const componentSx = typeof sx === 'function' ? sx(theme) : sx
      let componentProps = Object.assign({}, props)

      // Create component with only allowed props when supplied
      if (Array.isArray(config?.allowOnlyProps) && config.allowOnlyProps.length > 0) {
        const allowedProps = {} as typeof componentProps
        const propsToAllow = config.allowOnlyProps
        let index = 0
        let prop
        for (index; index < propsToAllow.length; index++) {
          prop = propsToAllow[index] as keyof typeof componentProps
          if (prop in componentProps) {
            allowedProps[prop] = componentProps[prop]
          }
        }
        componentProps = allowedProps
      } else if (typeof config?.allowOnlyProps === 'function') {
        const allowedProps = {} as typeof componentProps
        let prop: keyof typeof componentProps
        for (prop in componentProps) {
          if (config.allowOnlyProps(prop)) {
            allowedProps[prop] = componentProps[prop]
          }
        }
        componentProps = allowedProps
      } else {
        // Create component without omitted props when supplied
        if (Array.isArray(config?.omitProps) && config.omitProps.length > 0) {
          const propsToOmit = config.omitProps
          let index = 0
          let prop
          for (index; index < propsToOmit.length; index++) {
            prop = propsToOmit[index]
            if (prop in componentProps) {
              Reflect.deleteProperty(componentProps, prop)
            }
          }
        } else if (typeof config?.omitProps === 'function') {
          let prop
          for (prop in componentProps) {
            if (config.omitProps(prop)) {
              Reflect.deleteProperty(componentProps, prop)
            }
          }
        }
      }

      if (typeof style === 'function') {
        return createElement(
          el as any,
          {
            style: (...args: any[]) => {
              return merge(componentStyles, componentSx, style(...args))
            },
            ref,
            ...componentProps,
          } as any
        )
      }

      return createElement(
        el as any,
        { style: [componentStyles, componentSx, style], ref, ...componentProps } as any
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

export function alpha(color: string, opacity: number): string {
  if (color.startsWith('rgba')) {
    return color.replace(/[\d.]+\)$/g, `${opacity})`)
  }
  if (color.startsWith('rgb')) {
    return color.replace('rgb', 'rgba').replace(')', `, ${opacity})`)
  }
  if (color.startsWith('#')) {
    const r = Number.parseInt(color.slice(1, 3), 16)
    const g = Number.parseInt(color.slice(3, 5), 16)
    const b = Number.parseInt(color.slice(5, 7), 16)
    return `rgba(${r}, ${g}, ${b}, ${opacity})`
  }
  return color
}
