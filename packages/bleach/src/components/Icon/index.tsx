import Octicons from '@expo/vector-icons/Octicons'
import { getThemeProperty } from '../../theme/utilities'
import type { OcticonsName } from './types'
import type { Palette, SxProps } from '../../theme/types'
import type { TextProps } from 'react-native'
import { useTheme } from '../../theme/hooks'

export interface IconProps extends TextProps, SxProps<TextProps> {
  name: OcticonsName
  size?: number
  color?: keyof Palette | (string & {})
}

export default function Icon({ name, size = 22.5, color = 'action', style, ...props }: IconProps) {
  const theme = useTheme()

  return (
    <Octicons
      name={name}
      size={size}
      style={[{ marginBottom: -3 }, style]}
      color={getThemeProperty({ object: theme.palette, key: color, fallback: color })}
      {...props}
    />
  )
}
