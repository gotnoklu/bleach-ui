import type { PressableProps, StyleProp, TextStyle, View, ViewStyle } from 'react-native'
import type {
  ComponentProps,
  ComponentType,
  ForwardRefExoticComponent,
  PropsWithChildren,
  RefAttributes,
} from 'react'

export type DeepPartial<T> = T extends object
  ? {
      [P in keyof T]?: DeepPartial<T[P]>
    }
  : T

export type Merge<
  TData extends ReadonlyArray<object | undefined> | Array<object | undefined>,
  TResult = {},
> = TData extends [
  infer CurrentObject,
  ...infer Rest extends ReadonlyArray<object | undefined> | Array<object | undefined>,
]
  ? Merge<Rest, TResult & CurrentObject>
  : TResult

export type Color = string | { main: string; light: string; dark: string; text: string }
export type TextColor = {
  primary: string
  secondary: string
}
export type ThemeMode = 'light' | 'dark'

export type BasePalette = {
  primary: Color
  secondary: Color
  text: TextColor
  backgrounds: {
    default: string
    paper: string
    notification: string
  }
  action: Color
  success: Color
  error: Color
  info: Color
  disabled: Color
  divider: string
}

export type Palette = {
  primary: Exclude<Color, string>
  secondary: Exclude<Color, string>
  text: TextColor
  backgrounds: {
    default: string
    paper: string
    notification: string
  }
  success: Exclude<Color, string>
  error: Exclude<Color, string>
  info: Exclude<Color, string>
  disabled: string
  action: string
  divider: string
}

export type TypographyType = Exclude<TextStyle['fontWeight'], undefined> | 'italic'

export type FontType =
  | number
  | (Omit<TextStyle, 'fontWeight' | 'fontFamily'> & {
      fontFamily: string
      fontWeight: Exclude<TextStyle['fontWeight'], undefined>
    })

export type TypographyTypes = {
  [_ in TypographyType]: Exclude<FontType, number>
}

export type TypographyVariants = {
  h1: TextStyle
  h2: TextStyle
  h3: TextStyle
  h4: TextStyle
  h5: TextStyle
  h6: TextStyle
  body1: TextStyle
  body2: TextStyle
  caption: TextStyle
}

export type Typography = {
  fontFamily?: string
  types: TypographyTypes
  variants: TypographyVariants
}

export type LocaleDirection = 'ltr' | 'rtl'

export type LoadedFonts = string | { [_ in TypographyType]?: string }

export interface Theme {
  mode: ThemeMode
  palette: Palette
  typography: Typography
  spacing: {
    default: number
    create: (value: number) => number
  }
  radius: {
    default: number
    create: (value: number) => number
  }
  shadows: {
    [_ in 1 | 2 | 3 | 4 | 5]: {
      shadowColor: string
      shadowOffset: {
        width: number
        height: number
      }
      shadowOpacity: number
      shadowRadius: number
      elevation: number
    }
  }
}

export type BaseTheme = DeepPartial<Theme>

export type Sx<
  TElement extends
    | ComponentType<PropsWithChildren<{ style?: StyleProp<ViewStyle> }>>
    | ComponentType<PropsWithChildren<{ style?: StyleProp<TextStyle> }>>
    | ForwardRefExoticComponent<PressableProps & RefAttributes<View>>,
> = (theme: Theme) => ComponentProps<TElement>['style']

export type SxFromProps<
  TProps extends
    | ComponentProps<ComponentType<PropsWithChildren<{ style?: StyleProp<ViewStyle> }>>>
    | ComponentProps<ComponentType<PropsWithChildren<{ style?: StyleProp<TextStyle> }>>>
    | ComponentProps<ForwardRefExoticComponent<PressableProps & RefAttributes<View>>>,
> = (theme: Theme) => TProps['style']

export type SxProps<
  TProps extends
    | ComponentProps<ComponentType<PropsWithChildren<{ style?: StyleProp<ViewStyle> }>>>
    | ComponentProps<ComponentType<PropsWithChildren<{ style?: StyleProp<TextStyle> }>>>
    | ComponentProps<ForwardRefExoticComponent<PressableProps & RefAttributes<View>>>,
> = {
  sx?: SxFromProps<TProps>
}
