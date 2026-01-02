import { createFileRoute } from '@tanstack/react-router'
import AvatarDocs from '../../../content/docs/components/avatar.mdx'

export const Route = createFileRoute('/docs/components/avatar')({
  component: AvatarComponentPage,
  context: () => ({ title: 'Components/Avatar' }),
})

function AvatarComponentPage() {
  return <AvatarDocs />
}
