import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/docs/building-your-app/styling')({
  component: RouteComponent,
  context: () => ({ title: 'Building Your App/Styling' }),
})

function RouteComponent() {
  return <div>Hello "/docs/building-your-app/styling"!</div>
}
