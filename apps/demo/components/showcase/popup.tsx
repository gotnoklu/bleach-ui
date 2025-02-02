import { styled } from 'bleach/dist/theme/utilities'
import Box, { type BoxProps } from 'bleach/dist/components/Box'
import Typography from 'bleach/dist/components/Typography'
import Popup, { PopupTrigger, PopupContent } from 'bleach/dist/components/Popup'
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
          <Popup position="top-left">
            <PopupTrigger>
              <Button style={{ flex: 1 }}>Top-Left</Button>
            </PopupTrigger>
            <PopupContent>{PopupPaper}</PopupContent>
          </Popup>
          <Popup position="top-right">
            <PopupTrigger>
              <Button style={{ flex: 1 }}>Top-Right</Button>
            </PopupTrigger>
            <PopupContent>{PopupPaper}</PopupContent>
          </Popup>
        </Box>
        <Box alignItems="center" gap={2} row>
          <Popup position="bottom-right">
            <PopupTrigger>
              <Button style={{ flex: 1 }}>Bottom-Right</Button>
            </PopupTrigger>
            <PopupContent>{PopupPaper}</PopupContent>
          </Popup>
          <Popup position="bottom-left">
            <PopupTrigger>
              <Button style={{ flex: 1 }}>Bottom-Left</Button>
            </PopupTrigger>
            <PopupContent>{PopupPaper}</PopupContent>
          </Popup>
        </Box>
      </SubSection>
      <SubSection>
        <Typography variant="h6" color="text.secondary">
          Variants
        </Typography>
        <Popup>
          <PopupTrigger>
            <ListItemButton sx={({ palette }) => ({ backgroundColor: palette.backgrounds.paper })}>
              <Typography style={{ flex: 1 }}>Press For Default Popup</Typography>
              <Icon name="list-unordered" />
            </ListItemButton>
          </PopupTrigger>
          <PopupContent>{PopupPaper}</PopupContent>
        </Popup>
        <Popup elevate>
          <PopupTrigger>
            <ListItemButton sx={({ palette }) => ({ backgroundColor: palette.backgrounds.paper })}>
              <Typography style={{ flex: 1 }}>Press For Elevated Popup</Typography>
              <Icon name="list-unordered" />
            </ListItemButton>
          </PopupTrigger>
          <PopupContent>{PopupPaper}</PopupContent>
        </Popup>
      </SubSection>
    </Section>
  )
}
