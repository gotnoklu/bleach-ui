import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/docs/components/')({
  component: ComponentsPage,
  context: () => ({ title: 'Components' }),
})

function ComponentsPage() {
  return <div>Hello "/docs/components/"!</div>
}
