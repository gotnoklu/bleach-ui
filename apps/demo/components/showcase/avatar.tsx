import { styled } from 'bleach/dist/theme/utilities'
import Box, { type BoxProps } from 'bleach/dist/components/Box'
import Typography from 'bleach/dist/components/Typography'
import ListItem from 'bleach/dist/components/ListItem'
import Avatar from 'bleach/dist/components/Avatar'
import Icon from 'bleach/dist/components/Icon'

const Section = styled(Box)<BoxProps>((theme) => ({ gap: theme.spacing.create(4) }))
const SubSection = styled(Box)<BoxProps>((theme) => ({ gap: theme.spacing.create(2) }))

export const AvatarShowcase = () => {
  return (
    <Section>
      <Typography variant="h5">Avatars</Typography>
      <SubSection>
        <Typography variant="h6" color="text.secondary">
          Variants
        </Typography>
        <ListItem disableMinHeight disablePadding>
          <Avatar>Jeremy Doe</Avatar>
          <Avatar variant="rounded">Random Brand</Avatar>
          <Avatar variant="square">Nathaniel Stevens</Avatar>
        </ListItem>
      </SubSection>
      <SubSection>
        <Typography variant="h6" color="text.secondary">
          Sizes
        </Typography>
        <ListItem disableMinHeight disablePadding>
          <Avatar size="small">S</Avatar>
          <Avatar size="medium">M</Avatar>
          <Avatar size="large">L</Avatar>
        </ListItem>
      </SubSection>
      <SubSection>
        <Typography variant="h6" color="text.secondary">
          Colors
        </Typography>
        <ListItem disableMinHeight disablePadding>
          <Avatar backgroundColor="primary.main" color="primary.text">
            Primary
          </Avatar>
          <Avatar backgroundColor="secondary" color="secondary.text">
            Secondary
          </Avatar>
          <Avatar backgroundColor="error.main" color="error.text">
            Error
          </Avatar>
        </ListItem>
      </SubSection>
      <SubSection>
        <Typography variant="h6" color="text.secondary">
          Images
        </Typography>
        <ListItem disableMinHeight disablePadding>
          <Avatar src="https://i.pravatar.cc/300?img=1" alt="User 1" />
          <Avatar variant="rounded" src="https://i.pravatar.cc/300?img=2" alt="User 2" />
          <Avatar variant="square" src="https://i.pravatar.cc/300?img=3" alt="User 3" />
        </ListItem>
      </SubSection>
      <SubSection>
        <Typography variant="h6" color="text.secondary">
          Custom Content
        </Typography>
        <ListItem disableMinHeight disablePadding>
          <Avatar backgroundColor="primary.light">
            <Icon name="person" size={20} color="primary.text" />
          </Avatar>
          <Avatar backgroundColor="secondary">
            <Icon name="gear" size={20} color="secondary.text" />
          </Avatar>
          <Avatar backgroundColor="error">
            <Icon name="bell" size={20} color="error.text" />
          </Avatar>
        </ListItem>
      </SubSection>
    </Section>
  )
}
