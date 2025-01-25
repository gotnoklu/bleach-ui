import { styled } from 'bleach/dist/theme/utilities'
import Box, { type BoxProps } from 'bleach/dist/components/Box'
import Typography from 'bleach/dist/components/Typography'
import ListItem from 'bleach/dist/components/ListItem'
import Chip from 'bleach/dist/components/Chip'
import Icon from 'bleach/dist/components/Icon'

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
