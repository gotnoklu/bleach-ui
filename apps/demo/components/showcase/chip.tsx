import { styled } from '@bleach/ui/dist/theme/utilities'
import Box, { type BoxProps } from '@bleach/ui/dist/components/Box'
import Typography from '@bleach/ui/dist/components/Typography'
import ListItem from '@bleach/ui/dist/components/ListItem'
import Chip from '@bleach/ui/dist/components/Chip'
import Icon from '@bleach/ui/dist/components/Icon'

const Section = styled(Box)<BoxProps>((theme) => ({ gap: theme.spacing.create(4) }))
const SubSection = styled(Box)<BoxProps>((theme) => ({ gap: theme.spacing.create(2) }))

export const ChipShowcase = () => {
  return (
    <Section>
      <Typography variant="h5">Chips</Typography>
      <SubSection>
        <Typography variant="h6" color="text.secondary">
          Variants
        </Typography>
        <ListItem disableMinHeight disablePadding>
          <Chip>Default</Chip>
          <Chip>
            With Close Icon <Icon name="x" size={18} />
          </Chip>
        </ListItem>
      </SubSection>
      <SubSection>
        <Typography variant="h6" color="text.secondary">
          Sizes
        </Typography>
        <ListItem disableMinHeight disablePadding>
          <Chip size="small">Small</Chip>
          <Chip size="medium">Medium</Chip>
          <Chip size="large">Large</Chip>
        </ListItem>
      </SubSection>
      <SubSection>
        <Typography variant="h6" color="text.secondary">
          Shapes
        </Typography>
        <ListItem disableMinHeight disablePadding>
          <Chip>Default</Chip>
          <Chip rounded>Rounded</Chip>
        </ListItem>
      </SubSection>
      <SubSection>
        <Typography variant="h6" color="text.secondary">
          States
        </Typography>
        <ListItem disableMinHeight disablePadding>
          <Chip checked>Checked</Chip>
        </ListItem>
        <ListItem disableMinHeight disablePadding>
          <Chip disabled>Disabled</Chip>
        </ListItem>
      </SubSection>
    </Section>
  )
}
