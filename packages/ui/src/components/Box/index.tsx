import { type ForwardedRef, forwardRef } from 'react'
import { type AnimatableNumericValue, type DimensionValue, View, type ViewProps } from 'react-native'
import type { Palette, TextPaletteColors } from '../../theme/types'
import { getThemeProperty, selectStyles, styled } from '../../theme/utilities'

export interface BoxProps extends ViewProps {
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
  justifyContent?: 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around' | 'space-evenly'
  backgroundColor?: keyof Palette | keyof TextPaletteColors | (string & {})
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
        when: typeof padding === 'string' || typeof padding === 'number',
        styles: { padding: typeof padding === 'number' ? theme.spacing(padding) : padding },
      },
      {
        when: typeof paddingTop === 'string' || typeof paddingTop === 'number',
        styles: {
          paddingTop: typeof paddingTop === 'number' ? theme.spacing(paddingTop) : paddingTop,
        },
      },
      {
        when: typeof paddingBottom === 'string' || typeof paddingBottom === 'number',
        styles: {
          paddingBottom: typeof paddingBottom === 'number' ? theme.spacing(paddingBottom) : paddingBottom,
        },
      },
      {
        when: typeof paddingX === 'string' || typeof paddingX === 'number',
        styles: {
          paddingHorizontal: typeof paddingX === 'number' ? theme.spacing(paddingX as number) : paddingX,
        },
      },
      {
        when: typeof paddingY === 'string' || typeof paddingY === 'number',
        styles: {
          paddingVertical: typeof paddingY === 'number' ? theme.spacing(paddingY as number) : paddingY,
        },
      },
      {
        when: typeof margin === 'string' || typeof margin === 'number',
        styles: { margin: typeof margin === 'number' ? theme.spacing(margin) : margin },
      },
      {
        when: typeof marginTop === 'string' || typeof marginTop === 'number',
        styles: {
          marginTop: typeof marginTop === 'number' ? theme.spacing(marginTop) : marginTop,
        },
      },
      {
        when: typeof marginBottom === 'string' || typeof marginBottom === 'number',
        styles: {
          marginBottom: typeof marginBottom === 'number' ? theme.spacing(marginBottom) : marginBottom,
        },
      },
      {
        when: typeof marginX === 'string' || typeof marginX === 'number',
        styles: {
          marginHorizontal: typeof marginX === 'number' ? theme.spacing(marginX) : marginX,
        },
      },
      {
        when: typeof marginY === 'string' || typeof marginY === 'number',
        styles: {
          marginVertical: typeof marginY === 'number' ? theme.spacing(marginY) : marginY,
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
          gap: theme.spacing(gap),
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

export const Box = forwardRef(function Box({ children, ...props }: BoxProps, ref: ForwardedRef<View | null>) {
  return (
    <StyledBox ref={ref} {...props}>
      {children}
    </StyledBox>
  )
})
