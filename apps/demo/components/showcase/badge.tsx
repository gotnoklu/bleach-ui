import { styled } from '@bleach/ui/dist/theme/utilities'
import Box, { type BoxProps } from '@bleach/ui/dist/components/Box'
import Typography from '@bleach/ui/dist/components/Typography'
import ListItem from '@bleach/ui/dist/components/ListItem'
import Button from '@bleach/ui/dist/components/Button'
import Badge from '@bleach/ui/dist/components/Badge'
import Icon from '@bleach/ui/dist/components/Icon'
import Avatar from '@bleach/ui/dist/components/Avatar'
import { useTheme } from '@bleach/ui/dist/theme/hooks'

const Section = styled(Box)<BoxProps>((theme) => ({ gap: theme.spacing.create(4) }))
const SubSection = styled(Box)<BoxProps>((theme) => ({ gap: theme.spacing.create(2) }))
const BadgeItem = styled(Box)<BoxProps>((theme) => ({
  gap: theme.spacing.create(1),
  alignItems: 'center',
  flex: 1,
}))

export const BadgeShowcase = () => {
  const theme = useTheme()

  return (
    <Section>
      <Typography variant="h5">Badges</Typography>
      <SubSection>
        <Typography variant="h6" color="text.secondary">
          Basic Usage
        </Typography>
        <ListItem disableMinHeight disablePadding>
          <BadgeItem>
            <Badge content={3} color="primary" variant="contained">
              <Icon name="inbox" size={28} />
            </Badge>
            <Typography variant="body2" color="text.secondary">
              Unread messages
            </Typography>
          </BadgeItem>
          <BadgeItem>
            <Badge content="NEW" color="success">
              <Icon name="gift" size={28} />
            </Badge>
            <Typography variant="body2" color="text.secondary">
              Special offer
            </Typography>
          </BadgeItem>
          <BadgeItem>
            <Badge
              content={
                <Box
                  style={{
                    width: 10,
                    height: 10,
                    borderRadius: '50%',
                    backgroundColor: theme.palette.success.main,
                  }}
                />
              }
              color="success"
              variant="contained"
            >
              <Avatar size="medium" variant="rounded" src="https://i.pravatar.cc/300?img=3" />
            </Badge>
            <Typography variant="body2" color="text.secondary">
              Online status
            </Typography>
          </BadgeItem>
        </ListItem>
      </SubSection>

      <SubSection>
        <Typography variant="h6" color="text.secondary">
          Colors & Variants
        </Typography>
        <ListItem disableMinHeight disablePadding>
          <BadgeItem>
            <Badge content={12} color="primary" variant="contained" rounded>
              <Icon name="bell" size={24} />
            </Badge>
            <Typography variant="body2" color="text.secondary">
              Notifications
            </Typography>
          </BadgeItem>
          <BadgeItem>
            <Badge content="LIVE" color="error" variant="outlined" rounded>
              <Icon name="broadcast" size={24} />
            </Badge>
            <Typography variant="body2" color="text.secondary">
              Streaming
            </Typography>
          </BadgeItem>
          <BadgeItem>
            <Badge content="5" color="warning" variant="contained">
              <Icon name="alert" size={24} />
            </Badge>
            <Typography variant="body2" color="text.secondary">
              Alerts
            </Typography>
          </BadgeItem>
        </ListItem>
      </SubSection>

      <SubSection>
        <Typography variant="h6" color="text.secondary">
          Interactive Examples
        </Typography>
        <ListItem disableMinHeight disablePadding>
          <BadgeItem>
            <Badge content={99} max={99} color="error" variant="contained" rounded>
              <Button variant="outlined" size="small">
                Messages <Icon name="mail" size={16} />
              </Button>
            </Badge>
            <Typography variant="body2" color="text.secondary">
              Message count
            </Typography>
          </BadgeItem>
          <BadgeItem>
            <Badge
              content={<Icon name="check" size={12} color="success.text" />}
              color="success"
              variant="contained"
              rounded
            >
              <Button variant="outlined" size="small">
                Connected <Icon name="link" size={16} />
              </Button>
            </Badge>
            <Typography variant="body2" color="text.secondary">
              Status indicator
            </Typography>
          </BadgeItem>
          <BadgeItem>
            <Badge content="1" color="primary" rounded>
              <Button variant="contained" size="small">
                Cart <Icon name="package" size={16} color="primary.text" />
              </Button>
            </Badge>
            <Typography variant="body2" color="text.secondary">
              Shopping cart
            </Typography>
          </BadgeItem>
        </ListItem>
      </SubSection>

      <SubSection>
        <Typography variant="h6" color="text.secondary">
          Profile Examples
        </Typography>
        <ListItem disableMinHeight disablePadding>
          <BadgeItem>
            <Badge
              content={
                <Box
                  style={{
                    width: 12,
                    height: 12,
                    borderRadius: 6,
                    backgroundColor: theme.palette.success.main,
                  }}
                />
              }
              color="success"
              variant="contained"
              anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            >
              <Avatar size="large" variant="rounded" src="https://i.pravatar.cc/300?img=4">
                JD
              </Avatar>
            </Badge>
            <Typography variant="body2" color="text.secondary">
              Active now
            </Typography>
          </BadgeItem>
          <BadgeItem>
            <Badge
              content="AWAY"
              color="error"
              rounded
              anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            >
              <Avatar size="large" variant="rounded" src="https://i.pravatar.cc/300?img=5">
                MK
              </Avatar>
            </Badge>
            <Typography variant="body2" color="text.secondary">
              Away status
            </Typography>
          </BadgeItem>
          <BadgeItem>
            <Badge
              content={<Icon name="verified" size={16} color="primary.text" />}
              color="primary"
              variant="contained"
              anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            >
              <Avatar size="large" variant="rounded" src="https://i.pravatar.cc/300?img=6">
                VK
              </Avatar>
            </Badge>
            <Typography variant="body2" color="text.secondary">
              Verified user
            </Typography>
          </BadgeItem>
        </ListItem>
      </SubSection>

      <SubSection>
        <Typography variant="h6" color="text.secondary">
          Advanced Examples
        </Typography>
        <ListItem disableMinHeight disablePadding>
          <BadgeItem>
            <Badge content="1st" color="secondary" variant="contained" rounded>
              <Avatar size="large" backgroundColor="primary.light" color="primary.text">
                <Icon name="star" size={24} color="primary.text" />
              </Avatar>
            </Badge>
            <Typography variant="body2" color="text.secondary">
              Achievement
            </Typography>
          </BadgeItem>
          <BadgeItem>
            <Badge
              content={<Icon name="star-fill" size={12} color="warning.text" />}
              color="warning"
              variant="contained"
              anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
            >
              <Avatar size="large" backgroundColor="primary.main" color="primary.text">
                <Icon name="gift" size={24} color="primary.text" />
              </Avatar>
            </Badge>
            <Typography variant="body2" color="text.secondary">
              Special item
            </Typography>
          </BadgeItem>
          <BadgeItem>
            <Badge
              content="PRO"
              color="secondary"
              variant="contained"
              rounded
              anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            >
              <Avatar size="large" backgroundColor="secondary.light" color="secondary.text">
                <Icon name="rocket" size={24} color="secondary.text" />
              </Avatar>
            </Badge>
            <Typography variant="body2" color="text.secondary">
              Premium user
            </Typography>
          </BadgeItem>
        </ListItem>
      </SubSection>
    </Section>
  )
}
