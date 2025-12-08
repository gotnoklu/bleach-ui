import { Avatar } from '@bleach/ui/components/avatar'
import { Badge } from '@bleach/ui/components/badge'
import { Box, type BoxProps } from '@bleach/ui/components/box'
import { Button } from '@bleach/ui/components/button'
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
} from '@bleach/ui/components/icon'
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
      <Text variant="h5">Badges</Text>
      <SubSection>
        <Text variant="h6" color="text.secondary">
          Basic Usage
        </Text>
        <ListItem disableMinHeight disablePadding>
          <BadgeShowcaseItem>
            <Badge indicator={3} color="primary">
              <IconInbox size={28} />
            </Badge>
            <Text variant="body2" color="text.secondary">
              Unread messages
            </Text>
          </BadgeShowcaseItem>
          <BadgeShowcaseItem>
            <Badge indicator="NEW" color="success">
              <IconGift size={28} />
            </Badge>
            <Text variant="body2" color="text.secondary">
              Special offer
            </Text>
          </BadgeShowcaseItem>
        </ListItem>
      </SubSection>

      <SubSection>
        <Text variant="h6" color="text.secondary">
          Colors
        </Text>
        <ListItem disableMinHeight disablePadding>
          <BadgeShowcaseItem>
            <Badge indicator={12} color="primary">
              <IconBell size={24} />
            </Badge>
            <Text variant="body2" color="text.secondary">
              Notifications
            </Text>
          </BadgeShowcaseItem>
          <BadgeShowcaseItem>
            <Badge indicator="LIVE" color="error">
              <IconBroadcast size={24} />
            </Badge>
            <Text variant="body2" color="text.secondary">
              Streaming
            </Text>
          </BadgeShowcaseItem>
          <BadgeShowcaseItem>
            <Badge indicator="5" color="warning">
              <IconAlertSquareRounded size={24} />
            </Badge>
            <Text variant="body2" color="text.secondary">
              Alerts
            </Text>
          </BadgeShowcaseItem>
        </ListItem>
      </SubSection>

      <SubSection>
        <Text variant="h6" color="text.secondary">
          Interactive Examples
        </Text>
        <ListItem disableMinHeight disablePadding>
          <BadgeShowcaseItem>
            <Badge indicator={99} maxValue={99} color="error">
              <Button variant="outlined" size="sm">
                See Messages <IconMail size={16} />
              </Button>
            </Badge>
            <Text variant="body2" color="text.secondary">
              Message count
            </Text>
          </BadgeShowcaseItem>
          <BadgeShowcaseItem>
            <Badge indicator="1" color="success">
              <Button variant="filled" size="sm">
                View Cart <IconShoppingCart size={16} color={styles.icon.color} />
              </Button>
            </Badge>
            <Text variant="body2" color="text.secondary">
              Shopping cart
            </Text>
          </BadgeShowcaseItem>
        </ListItem>
      </SubSection>

      <SubSection>
        <Text variant="h6" color="text.secondary">
          Profile Examples
        </Text>
        <ListItem disableMinHeight disablePadding>
          <BadgeShowcaseItem>
            <Badge color="success" position={{ y: 'bottom', x: 'right' }} cutout>
              <Avatar size="lg" source={{ uri: 'https://i.pravatar.cc/300?img=4' }}>
                <Text>JD</Text>
              </Avatar>
            </Badge>
            <Text variant="body2" color="text.secondary">
              Active now
            </Text>
          </BadgeShowcaseItem>
          <BadgeShowcaseItem>
            <Badge color="disabled" position={{ y: 'bottom', x: 'right' }} cutout>
              <Avatar size="lg" source={{ uri: 'https://i.pravatar.cc/300?img=5' }}>
                <Text>MK</Text>
              </Avatar>
            </Badge>
            <Text variant="body2" color="text.secondary">
              Away status
            </Text>
          </BadgeShowcaseItem>
          <BadgeShowcaseItem>
            <Badge
              indicator={<IconCircleDashedCheck size={16} color={styles.icon.color} />}
              color="primary"
              position={{ y: 'bottom', x: 'right' }}
              cutout
            >
              <Avatar size="lg" source={{ uri: 'https://i.pravatar.cc/300?img=6' }}>
                <Text>VK</Text>
              </Avatar>
            </Badge>
            <Text variant="body2" color="text.secondary">
              Verified user
            </Text>
          </BadgeShowcaseItem>
        </ListItem>
      </SubSection>

      <SubSection>
        <Text variant="h6" color="text.secondary">
          Advanced Examples
        </Text>
        <ListItem disableMinHeight disablePadding>
          <BadgeShowcaseItem>
            <Badge indicator="1st" color="primary">
              <Avatar size="lg" color="warning.main">
                <IconStar size={24} color={styles.icon.color} />
              </Avatar>
            </Badge>
            <Text variant="body2" color="text.secondary">
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
            <Text variant="body2" color="text.secondary">
              Special item
            </Text>
          </BadgeShowcaseItem>
        </ListItem>
      </SubSection>
    </Section>
  )
}
