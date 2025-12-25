import { createFileRoute } from '@tanstack/react-router'
import type { ReactNode } from 'react'

export const Route = createFileRoute('/')({ component: App })

interface AppProps {
  children?: ReactNode
}

function App({ children }: AppProps) {
  return <div>Hello</div>
}
