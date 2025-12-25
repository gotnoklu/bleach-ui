import type { ReactElement, ReactNode } from 'react'

export type ShowProps = {
  when: boolean
  children: ReactNode | ((...args: unknown[]) => ReactNode | ReactElement) | ReactElement
  fallback?: ReactNode | ((...args: unknown[]) => ReactNode | ReactElement) | ReactElement
}

export function Show({ when, fallback = null, children }: ShowProps) {
  if (when === true) {
    if (typeof children === 'function') {
      return children()
    }

    return children
  }

  if (typeof fallback === 'function') {
    return fallback()
  }

  return fallback
}
