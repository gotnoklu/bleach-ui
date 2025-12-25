import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/docs/')({
  component: RouteComponent,
  context: () => ({ title: 'Docs' }),
})

function RouteComponent() {
  return <div>Hello "/docs/"!</div>
}
