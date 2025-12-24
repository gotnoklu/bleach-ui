import { createStylesheet } from '@bleeech/ui'
import { Avatar } from '@bleeech/ui/components/avatar'
import { IconBell, IconSettings, IconUser } from '@bleeech/ui/components/icons'
import { ListItem } from '@bleeech/ui/components/list-item'
import { Text } from '@bleeech/ui/components/text'
import { Section, SubSection } from '../../components/section'

const useStyles = createStylesheet((theme) => ({
  icon: {
    color: theme.palette.icon,
  },
}))

export const AvatarShowcase = () => {
  const styles = useStyles()

  return (
    <Section>
      <Text variant="xl">Avatars</Text>
      <SubSection>
        <Text variant="lg" color="text.secondary">
          Variants
        </Text>
        <ListItem disableMinHeight disablePadding>
          <Avatar color="primary">
            <Text color="primary.foreground">J</Text>
          </Avatar>
          <Avatar variant="circular" color="primary">
            <Text color="primary.foreground">R</Text>
          </Avatar>
        </ListItem>
      </SubSection>
      <SubSection>
        <Text variant="lg" color="text.secondary">
          Sizes
        </Text>
        <ListItem disableMinHeight disablePadding>
          <Avatar size="sm">
            <Text fontWeight="medium">S</Text>
          </Avatar>
          <Avatar size="md">
            <Text fontWeight="medium">M</Text>
          </Avatar>
          <Avatar size="lg">
            <Text fontWeight="medium">L</Text>
          </Avatar>
        </ListItem>
      </SubSection>
      <SubSection>
        <Text variant="lg" color="text.secondary">
          Images
        </Text>
        <ListItem disableMinHeight disablePadding>
          <Avatar source={{ uri: 'https://i.pravatar.cc/300?img=1' }} alt="User 1" />
          <Avatar variant="circular" source={{ uri: 'https://i.pravatar.cc/300?img=2' }} alt="User 2" />
        </ListItem>
      </SubSection>
      <SubSection>
        <Text variant="lg" color="text.secondary">
          Icons
        </Text>
        <ListItem disableMinHeight disablePadding>
          <Avatar>
            <IconUser size={20} color={styles.icon.color} />
          </Avatar>
          <Avatar>
            <IconSettings size={20} color={styles.icon.color} />
          </Avatar>
          <Avatar>
            <IconBell size={20} color={styles.icon.color} />
          </Avatar>
        </ListItem>
      </SubSection>
    </Section>
  )
}
