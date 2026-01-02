import { createFileRoute } from '@tanstack/react-router'
import ComponentsHome from '../../../content/docs/components/home.mdx'

export const Route = createFileRoute('/docs/components/')({
  component: ComponentsPage,
  context: () => ({ title: 'Components' }),
})

function ComponentsPage() {
  return (
    <div>
      <ComponentsHome />
    </div>
  )
}
