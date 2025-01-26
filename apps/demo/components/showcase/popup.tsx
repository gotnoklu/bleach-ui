import { styled } from 'bleach/dist/theme/utilities'
import Box, { type BoxProps } from 'bleach/dist/components/Box'
import Typography from 'bleach/dist/components/Typography'
import Popup from 'bleach/dist/components/Popup'
import Paper from 'bleach/dist/components/Paper'
import Icon from 'bleach/dist/components/Icon'
import ListItemButton from 'bleach/dist/components/ListItemButton'
import Button from 'bleach/dist/components/Button'

const Section = styled(Box)<BoxProps>((theme) => ({ gap: theme.spacing.create(4) }))
const SubSection = styled(Box)<BoxProps>((theme) => ({ gap: theme.spacing.create(2) }))

const PopupPaper = (
  <Paper sx={({ spacing }) => ({ padding: spacing.create(2) })}>
    <Typography>Hello!</Typography>
  </Paper>
)

export const PopupShowcase = () => {
  return (
    <Section>
      <Typography variant="h5">Popup</Typography>
      <SubSection>
        <Typography variant="h6" color="text.secondary">
          Positions
        </Typography>
        <Box alignItems="center" gap={2} row>
          <Popup popper={PopupPaper} position="top-left">
            <Button style={{ flex: 1 }}>Top-Left</Button>
          </Popup>
          <Popup popper={PopupPaper} position="top-right">
            <Button style={{ flex: 1 }}>Top-Right</Button>
          </Popup>
        </Box>
        <Box alignItems="center" gap={2} row>
          <Popup popper={PopupPaper} position="bottom-right">
            <Button style={{ flex: 1 }}>Bottom-Right</Button>
          </Popup>
          <Popup popper={PopupPaper} position="bottom-left">
            <Button style={{ flex: 1 }}>Bottom-Left</Button>
          </Popup>
        </Box>
      </SubSection>
      <SubSection>
        <Typography variant="h6" color="text.secondary">
          Variants
        </Typography>
        <Popup popper={PopupPaper}>
          <ListItemButton sx={({ palette }) => ({ backgroundColor: palette.backgrounds.paper })}>
            <Typography style={{ flex: 1 }}>Press For Default Popup</Typography>
            <Icon name="list-unordered" />
          </ListItemButton>
        </Popup>
        <Popup popper={PopupPaper} elevate>
          <ListItemButton sx={({ palette }) => ({ backgroundColor: palette.backgrounds.paper })}>
            <Typography style={{ flex: 1 }}>Press For Elevated Popup</Typography>
            <Icon name="list-unordered" />
          </ListItemButton>
        </Popup>
      </SubSection>
    </Section>
  )
}
