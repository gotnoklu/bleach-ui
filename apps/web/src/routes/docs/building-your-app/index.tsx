import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/docs/building-your-app/')({
  component: RouteComponent,
  context: () => ({ title: 'Building Your App' }),
})

function RouteComponent() {
  return <div>Hello "/docs/building-your-app/"!</div>
}
