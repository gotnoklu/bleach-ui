import Box, { type BoxProps } from '@bleach/ui/dist/components/Box'
import ListItem from '@bleach/ui/dist/components/ListItem'
import ProgressBar from '@bleach/ui/dist/components/ProgressBar'
import Typography from '@bleach/ui/dist/components/Typography'
import { styled } from '@bleach/ui/dist/theme/utilities'

const Section = styled(Box)<BoxProps>((theme) => ({ gap: theme.spacing(4) }))
const SubSection = styled(Box)<BoxProps>((theme) => ({ gap: theme.spacing(2) }))

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
