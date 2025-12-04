import type { ReactElement, ReactNode } from 'react'

export type ShowProps<TVisible extends boolean> = {
  visible: TVisible
  children: ReactNode | ((...args: unknown[]) => ReactNode | ReactElement) | ReactElement
  fallback?: ReactNode | ((...args: unknown[]) => ReactNode | ReactElement) | ReactElement
}

export default function Show<TVisible extends boolean>({
  visible,
  fallback = null,
  children,
}: ShowProps<TVisible>) {
  if (visible === true) {
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
