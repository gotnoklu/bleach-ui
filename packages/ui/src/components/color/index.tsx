import { cloneElement, type ReactElement } from 'react'
import type { TextStyle, ViewStyle } from 'react-native'
import { createStyles } from '../../theme/styles'
import type { PaletteColorToken } from '../../theme/types'
import { getThemeProperty } from '../../theme/utilities'

export interface ColorProps {
  color?: PaletteColorToken
  background?: PaletteColorToken
  children: ReactElement
}

const useStyles = createStyles<Pick<ColorProps, 'color' | 'background'>, ViewStyle | TextStyle>(
  (theme, { color, background }) => ({
    color: color ? getThemeProperty({ object: theme.palette, key: color, fallback: color }) : undefined,
    backgroundColor: background
      ? getThemeProperty({ object: theme.palette, key: background, fallback: background })
      : undefined,
  })
)

export function Color({ color, background, children }: ColorProps) {
  const styles = useStyles({ color, background })
  return cloneElement(children, { ...children.props, style: [children.props.style, styles] })
}
