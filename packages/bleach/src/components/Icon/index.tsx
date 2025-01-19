import Octicons from '@expo/vector-icons/Octicons'
import { getThemeProperty } from '../../theme/utilities'
import type { OcticonsName } from './types'
import type { Palette, SxProps } from '../../theme/types'
import type { TextProps } from 'react-native'
import { useTheme } from '../../theme/hooks'
import { type ComponentType, createElement } from 'react'

export interface IconProps extends TextProps, SxProps<TextProps> {
  name: OcticonsName
  size?: number
  color?: keyof Palette | (string & {})
  component?: ComponentType<{ name?: string; size?: number; color?: string } & TextProps>
}

export default function Icon({
  name,
  size = 22.5,
  color = 'action',
  component,
  ...props
}: IconProps) {
  const theme = useTheme()
  const iconColor = getThemeProperty({ object: theme.palette, key: color, fallback: color })

  if (component) {
    return createElement(component, { name, size, color: iconColor, ...props })
  }

  return <Octicons name={name} size={size} color={iconColor} {...props} />
}
