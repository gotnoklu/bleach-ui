import type { ReactNode } from 'react'

export interface PopupContentProps {
  children: ReactNode
}

export default function PopupContent({ children }: PopupContentProps) {
  return children
}
