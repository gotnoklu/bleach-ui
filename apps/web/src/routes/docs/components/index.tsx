import { createFileRoute } from '@tanstack/react-router'
import Hello from '../../../content/posts/hello.mdx'

export const Route = createFileRoute('/docs/components/')({
  component: ComponentsPage,
  context: () => ({ title: 'Components' }),
})

function ComponentsPage() {
  return (
    <div>
      <Hello />
    </div>
  )
}
