import { createContext } from 'react'
import type { Theme } from '../types'

export const BaseThemeContext = createContext<Theme>({} as Theme)
