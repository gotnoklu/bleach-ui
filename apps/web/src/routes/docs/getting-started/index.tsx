import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/docs/getting-started/')({
  head: () => ({
    meta: [{ title: 'Getting Started' }],
  }),
  component: GettingStartedPage,
  context: () => ({ title: 'Getting Started' }),
})

function GettingStartedPage() {
  return <div>Hello "/docs/getting-started/"!</div>
}
