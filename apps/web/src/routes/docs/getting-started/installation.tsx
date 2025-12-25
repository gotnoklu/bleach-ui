import { createFileRoute } from '@tanstack/react-router'
import { CodeExample, type CodeExampleProps } from '../../../components/code-example'

export const Route = createFileRoute('/docs/getting-started/installation')({
  component: InstallationPage,
  context: () => ({ title: 'Getting Started/Installation' }),
})

const Codes: CodeExampleProps['codes'] = [
  { language: 'bash', filename: '', code: 'npm i @bleeech/ui', id: 'npm', label: 'npm' },
  { language: 'bash', filename: '', code: 'yarn add @bleeech/ui', id: 'yarn', label: 'yarn' },
  { language: 'bash', filename: '', code: 'pnpm add @bleeech/ui', id: 'pnpm', label: 'pnpm' },
  { language: 'bash', filename: '', code: 'bun add @bleeech/ui', id: 'bun', label: 'bun' },
]

function InstallationPage() {
  return (
    <div className="max-w-xl">
      <CodeExample codes={Codes} />
    </div>
  )
}
