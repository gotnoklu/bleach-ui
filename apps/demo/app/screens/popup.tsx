import { PopupShowcase } from '@/layouts/showcases/popup'
import { ShowcaseScreenLayout } from '../../layouts/showcase-screen-layout'

export default function HomeScreen() {
  return (
    <ShowcaseScreenLayout>
      <PopupShowcase />
    </ShowcaseScreenLayout>
  )
}
