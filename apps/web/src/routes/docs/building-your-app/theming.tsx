import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/docs/building-your-app/theming')({
  component: RouteComponent,
  context: () => ({ title: 'Building Your App/Theming' }),
})

function RouteComponent() {
  return <div>Hello "/docs/building-your-app/theming"!</div>
}
