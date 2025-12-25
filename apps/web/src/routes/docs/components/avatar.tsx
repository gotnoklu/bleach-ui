import { createFileRoute } from '@tanstack/react-router'
import { CodeExample, type CodeExampleProps } from '../../../components/code-example'

export const Route = createFileRoute('/docs/components/avatar')({
  component: AvatarComponentPage,
  context: () => ({ title: 'Components/Avatar' }),
})

const Codes: CodeExampleProps['codes'] = [
  {
    id: 'typescript',
    label: 'Typescript',
    language: 'typescript',
    filename: 'database-query.js',
    code: ``,
  },
  {
    id: 'javascript',
    label: 'JavaScript',
    language: 'javascript',
    filename: 'database-query.js',
    code: ``,
  },
  
]

function AvatarComponentPage() {
  return <CodeExample codes={Codes} />
}
