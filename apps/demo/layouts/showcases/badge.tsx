import { Avatar } from '@bleach/ui/components/avatar'
import { Badge } from '@bleach/ui/components/badge'
import { Box, type BoxProps } from '@bleach/ui/components/box'
import { Button } from '@bleach/ui/components/button'
import { Color } from '@bleach/ui/components/color'
import {
  IconAlertSquareRounded,
  IconBell,
  IconBroadcast,
  IconCircleDashedCheck,
  IconGift,
  IconInbox,
  IconMail,
  IconShoppingCart,
  IconStar,
  IconStarFilled,
} from '@bleach/ui/components/icons'
import { ListItem } from '@bleach/ui/components/list-item'
import { Text } from '@bleach/ui/components/text'
import { createStylesheet, styled } from '@bleach/ui/theme/styles'
import { Section, SubSection } from '../../components/section'

const BadgeShowcaseItem = styled(Box)<BoxProps>((theme) => ({
  gap: theme.spacing(2),
  alignItems: 'center',
  flex: 1,
}))

const useStyles = createStylesheet((theme) => ({
  icon: {
    color: theme.palette.primary.foreground,
  },
}))

export const BadgeShowcase = () => {
  const styles = useStyles()

  return (
    <Section>
      <Text variant="xl">Badges</Text>
      <SubSection style={{ paddingVertical: 24 }}>
        <Text variant="lg" color="text.secondary">
          Basic Usage
        </Text>
        <ListItem disableMinHeight disablePadding>
          <BadgeShowcaseItem>
            <Badge indicator={3} color="primary">
              <Color color="icon">
                <IconInbox size={28} />
              </Color>
            </Badge>
            <Text variant="sm" color="text.secondary">
              Unread messages
            </Text>
          </BadgeShowcaseItem>
          <BadgeShowcaseItem>
            <Badge indicator="NEW" color="success">
              <Color color="icon">
                <IconGift size={28} />
              </Color>
            </Badge>
            <Text variant="sm" color="text.secondary">
              Special offer
            </Text>
          </BadgeShowcaseItem>
        </ListItem>
      </SubSection>

      <SubSection style={{ paddingVertical: 24 }}>
        <Text variant="lg" color="text.secondary">
          Colors
        </Text>
        <ListItem disableMinHeight disablePadding>
          <BadgeShowcaseItem>
            <Badge indicator={12} color="primary">
              <Color color="icon">
                <IconBell size={24} />
              </Color>
            </Badge>
            <Text variant="sm" color="text.secondary">
              Notifications
            </Text>
          </BadgeShowcaseItem>
          <BadgeShowcaseItem>
            <Badge indicator="LIVE" color="error">
              <Color color="icon">
                <IconBroadcast size={24} />
              </Color>
            </Badge>
            <Text variant="sm" color="text.secondary">
              Streaming
            </Text>
          </BadgeShowcaseItem>
          <BadgeShowcaseItem>
            <Badge indicator="5" color="warning">
              <Color color="icon">
                <IconAlertSquareRounded size={24} />
              </Color>
            </Badge>
            <Text variant="sm" color="text.secondary">
              Alerts
            </Text>
          </BadgeShowcaseItem>
        </ListItem>
      </SubSection>

      <SubSection style={{ paddingVertical: 24 }}>
        <Text variant="lg" color="text.secondary">
          Interactive Examples
        </Text>
        <ListItem disableMinHeight disablePadding>
          <BadgeShowcaseItem>
            <Badge indicator={99} maxValue={99} color="error">
              <Button variant="outlined" size="sm">
                See Messages{' '}
                <Color color="primary.main">
                  <IconMail size={16} />
                </Color>
              </Button>
            </Badge>
            <Text variant="sm" color="text.secondary">
              Message count
            </Text>
          </BadgeShowcaseItem>
          <BadgeShowcaseItem>
            <Badge indicator="1" color="success">
              <Button variant="outlined" size="sm">
                View Cart{' '}
                <Color color="primary.main">
                  <IconShoppingCart size={16} />
                </Color>
              </Button>
            </Badge>
            <Text variant="sm" color="text.secondary">
              Shopping cart
            </Text>
          </BadgeShowcaseItem>
        </ListItem>
      </SubSection>

      <SubSection style={{ paddingVertical: 24 }}>
        <Text variant="lg" color="text.secondary">
          Profile Examples
        </Text>
        <ListItem disableMinHeight disablePadding>
          <BadgeShowcaseItem>
            <Badge color="success" position={{ y: 'bottom', x: 'right' }} cutout>
              <Avatar size="lg" source={{ uri: 'https://i.pravatar.cc/300?img=4' }}>
                <Text>JD</Text>
              </Avatar>
            </Badge>
            <Text variant="sm" color="text.secondary">
              Active now
            </Text>
          </BadgeShowcaseItem>
          <BadgeShowcaseItem>
            <Badge color="disabled" position={{ y: 'bottom', x: 'right' }} cutout>
              <Avatar size="lg" source={{ uri: 'https://i.pravatar.cc/300?img=5' }}>
                <Text>MK</Text>
              </Avatar>
            </Badge>
            <Text variant="sm" color="text.secondary">
              Away status
            </Text>
          </BadgeShowcaseItem>
          <BadgeShowcaseItem>
            <Badge
              indicator={
                <Color color="primary.main">
                  <IconCircleDashedCheck size={16} />
                </Color>
              }
              position={{ y: 'bottom', x: 'right' }}
              color="transparent"
              style={{ paddingVertical: 0, paddingHorizontal: 0 }}
              cutout
            >
              <Avatar size="lg" source={{ uri: 'https://i.pravatar.cc/300?img=6' }}>
                <Text>VK</Text>
              </Avatar>
            </Badge>
            <Text variant="sm" color="text.secondary">
              Verified user
            </Text>
          </BadgeShowcaseItem>
        </ListItem>
      </SubSection>

      <SubSection style={{ paddingVertical: 24 }}>
        <Text variant="lg" color="text.secondary">
          Advanced Examples
        </Text>
        <ListItem disableMinHeight disablePadding>
          <BadgeShowcaseItem>
            <Badge indicator="1st" color="primary">
              <Avatar size="lg" color="warning.main">
                <IconStar size={24} color={styles.icon.color} />
              </Avatar>
            </Badge>
            <Text variant="sm" color="text.secondary">
              Achievement
            </Text>
          </BadgeShowcaseItem>
          <BadgeShowcaseItem>
            <Badge
              indicator={<IconStarFilled size={12} color={styles.icon.color} />}
              color="warning"
              position={{ y: 'top', x: 'left' }}
            >
              <Avatar size="lg" color="primary.main">
                <IconGift size={24} color={styles.icon.color} />
              </Avatar>
            </Badge>
            <Text variant="sm" color="text.secondary">
              Special item
            </Text>
          </BadgeShowcaseItem>
        </ListItem>
      </SubSection>
    </Section>
  )
}
