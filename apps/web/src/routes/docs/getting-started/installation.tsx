import { createFileRoute } from '@tanstack/react-router'
import { CodeExample } from '../../../components/code-example'

export const Route = createFileRoute('/docs/getting-started/installation')({
  component: InstallationPage,
  context: () => ({ title: 'Getting Started/Installation' }),
})

function InstallationPage() {
  return (
    <div className="max-w-xl">
      <CodeExample />
    </div>
  )
}
