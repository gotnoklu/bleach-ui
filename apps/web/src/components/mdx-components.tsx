// src/components/mdx-components.tsx
import { Button } from '@/components/ui/button'
import type { MDXComponents } from 'mdx/types'
import { CodeExample } from './code-example'

export const AppMdxComponents: MDXComponents = {
  // Example: Map Markdown <h1> to a custom styled H1 component
  h1: (props) => <h1 className="text-4xl font-bold pb-4" {...props} />,
  // Example: Allow using <Button> directly in MDX
  Button: Button,
  CodeExample: CodeExample,
}
