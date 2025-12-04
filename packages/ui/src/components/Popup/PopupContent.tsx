import type { ReactNode } from 'react'

export interface PopupContentProps {
  children: ReactNode
}

export function PopupContent({ children }: PopupContentProps) {
  return children
}
