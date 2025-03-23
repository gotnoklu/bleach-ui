import { type ForwardedRef, forwardRef } from 'react'
import {
  type AnimatableNumericValue,
  type DimensionValue,
  View,
  type ViewProps,
} from 'react-native'
import type { Palette, SxProps, TextColor } from '../../theme/types'
import { getThemeProperty, selectStyles, styled } from '../../theme/utilities'

export interface BoxProps extends ViewProps, SxProps<ViewProps> {
  width?: DimensionValue
  height?: DimensionValue
  borderRadius?: string | AnimatableNumericValue
  direction?: 'row' | 'column' | 'row-reverse' | 'column-reverse'
  flex?: number
  gap?: number
  padding?: DimensionValue
  margin?: DimensionValue
  paddingX?: DimensionValue
  marginX?: DimensionValue
  paddingY?: DimensionValue
  paddingTop?: DimensionValue
  paddingBottom?: DimensionValue
  paddingLeft?: DimensionValue
  paddingRight?: DimensionValue
  marginY?: DimensionValue
  marginTop?: DimensionValue
  marginBottom?: DimensionValue
  marginLeft?: DimensionValue
  marginRight?: DimensionValue
  alignItems?: 'flex-start' | 'flex-end' | 'center' | 'stretch' | 'baseline'
  justifyContent?:
    | 'flex-start'
    | 'flex-end'
    | 'center'
    | 'space-between'
    | 'space-around'
    | 'space-evenly'
  backgroundColor?: keyof Palette | keyof TextColor | (string & {})
}

const StyledBox = styled(View, {
  omitProps: [
    'width',
    'height',
    'borderRadius',
    'direction',
    'flex',
    'alignItems',
    'justifyContent',
    'padding',
    'paddingY',
    'paddingX',
    'margin',
    'marginY',
    'marginX',
    'paddingTop',
    'paddingBottom',
    'paddingLeft',
    'paddingRight',
    'marginTop',
    'marginBottom',
    'marginLeft',
    'marginRight',
    'gap',
    'backgroundColor',
  ],
})<Omit<BoxProps, 'sx'>>(
  (
    theme,
    {
      width,
      height,
      borderRadius,
      direction,
      flex,
      alignItems,
      justifyContent,
      backgroundColor,
      padding,
      paddingY,
      paddingX,
      margin,
      marginY,
      marginX,
      paddingTop,
      paddingBottom,
      marginTop,
      marginBottom,
      gap = 0,
    }
  ) => {
    return selectStyles(
      {
        if: typeof padding === 'string' || typeof padding === 'number',
        styles: { padding: typeof padding === 'number' ? theme.spacing.create(padding) : padding },
      },
      {
        if: typeof paddingTop === 'string' || typeof paddingTop === 'number',
        styles: {
          paddingTop:
            typeof paddingTop === 'number' ? theme.spacing.create(paddingTop) : paddingTop,
        },
      },
      {
        if: typeof paddingBottom === 'string' || typeof paddingBottom === 'number',
        styles: {
          paddingBottom:
            typeof paddingBottom === 'number' ? theme.spacing.create(paddingBottom) : paddingBottom,
        },
      },
      {
        if: typeof paddingX === 'string' || typeof paddingX === 'number',
        styles: {
          paddingHorizontal:
            typeof paddingX === 'number' ? theme.spacing.create(paddingX as number) : paddingX,
        },
      },
      {
        if: typeof paddingY === 'string' || typeof paddingY === 'number',
        styles: {
          paddingVertical:
            typeof paddingY === 'number' ? theme.spacing.create(paddingY as number) : paddingY,
        },
      },
      {
        if: typeof margin === 'string' || typeof margin === 'number',
        styles: { margin: typeof margin === 'number' ? theme.spacing.create(margin) : margin },
      },
      {
        if: typeof marginTop === 'string' || typeof marginTop === 'number',
        styles: {
          marginTop: typeof marginTop === 'number' ? theme.spacing.create(marginTop) : marginTop,
        },
      },
      {
        if: typeof marginBottom === 'string' || typeof marginBottom === 'number',
        styles: {
          marginBottom:
            typeof marginBottom === 'number' ? theme.spacing.create(marginBottom) : marginBottom,
        },
      },
      {
        if: typeof marginX === 'string' || typeof marginX === 'number',
        styles: {
          marginHorizontal: typeof marginX === 'number' ? theme.spacing.create(marginX) : marginX,
        },
      },
      {
        if: typeof marginY === 'string' || typeof marginY === 'number',
        styles: {
          marginVertical: typeof marginY === 'number' ? theme.spacing.create(marginY) : marginY,
        },
      },
      {
        styles: {
          flex,
          alignItems,
          justifyContent,
          width,
          height,
          borderRadius,
          flexDirection: direction,
          gap: theme.spacing.create(gap),
          backgroundColor: backgroundColor
            ? getThemeProperty({
                object: theme.palette,
                key: backgroundColor,
                fallback: backgroundColor,
              })
            : undefined,
        },
      }
    )
  }
)

const Box = forwardRef(function Box(
  { children, ...props }: BoxProps,
  ref: ForwardedRef<View | null>
) {
  return (
    <StyledBox ref={ref} {...props}>
      {children}
    </StyledBox>
  )
})

export default Box
