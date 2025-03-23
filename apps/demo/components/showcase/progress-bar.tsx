import { styled } from 'bleach/dist/theme/utilities'
import Box, { type BoxProps } from 'bleach/dist/components/Box'
import Typography from 'bleach/dist/components/Typography'
import ListItem from 'bleach/dist/components/ListItem'
import ProgressBar from 'bleach/dist/components/ProgressBar'

const Section = styled(Box)<BoxProps>((theme) => ({ gap: theme.spacing.create(4) }))
const SubSection = styled(Box)<BoxProps>((theme) => ({ gap: theme.spacing.create(2) }))

export const ProgressBarShowcase = () => {
  return (
    <Section>
      <Typography variant="h5">ProgressBares</Typography>
      <SubSection>
        <Typography variant="h6" color="text.secondary">
          Variants
        </Typography>
        <ListItem disableMinHeight disablePadding>
          <ProgressBar progress={20} rounded />
          <Typography>Rounded</Typography>
        </ListItem>
        <ListItem disableMinHeight disablePadding>
          <ProgressBar progress={20} />
          <Typography>Default</Typography>
        </ListItem>
      </SubSection>
      <SubSection>
        <Typography variant="h6" color="text.secondary">
          States
        </Typography>
        <ListItem disableMinHeight disablePadding>
          <ProgressBar progress={20} />
          <Typography>Uncontrolled</Typography>
        </ListItem>
        <ListItem disableMinHeight disablePadding>
          <ProgressBar />
          <Typography>Controlled</Typography>
        </ListItem>
        <ListItem disableMinHeight disablePadding>
          <ProgressBar progress={20} />
          <Typography>Disabled Checked</Typography>
        </ListItem>
        <ListItem disableMinHeight disablePadding>
          <ProgressBar progress={20} />
          <Typography>Disabled Unchecked</Typography>
        </ListItem>
      </SubSection>
    </Section>
  )
}
