import Box, { type BoxProps } from '@bleach/ui/dist/components/Box'
import Button from '@bleach/ui/dist/components/Button'
import Icon from '@bleach/ui/dist/components/Icon'
import ListItemButton from '@bleach/ui/dist/components/ListItemButton'
import Paper from '@bleach/ui/dist/components/Paper'
import Popup, { PopupTrigger, PopupContent } from '@bleach/ui/dist/components/Popup'
import Typography from '@bleach/ui/dist/components/Typography'
import { styled } from '@bleach/ui/dist/theme/utilities'

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
        <Box gap={2} direction="row" justifyContent="center">
          <Popup position="left">
            <PopupTrigger>
              <Button variant="outlined">Left</Button>
            </PopupTrigger>
            <PopupContent>{PopupPaper}</PopupContent>
          </Popup>
          <Popup position="right">
            <PopupTrigger>
              <Button variant="outlined">Right</Button>
            </PopupTrigger>
            <PopupContent>{PopupPaper}</PopupContent>
          </Popup>
        </Box>
        <Box gap={2} direction="row" justifyContent="center">
          <Popup position="left-top">
            <PopupTrigger>
              <Button variant="outlined">Left-Top</Button>
            </PopupTrigger>
            <PopupContent>{PopupPaper}</PopupContent>
          </Popup>
          <Popup position="right-top">
            <PopupTrigger>
              <Button variant="outlined">Right-Top</Button>
            </PopupTrigger>
            <PopupContent>{PopupPaper}</PopupContent>
          </Popup>
        </Box>
        <Box gap={2} direction="row" justifyContent="center">
          <Popup position="left-top" offsetMargin={-8}>
            <PopupTrigger>
              <Button variant="outlined">Left-Top-Inset</Button>
            </PopupTrigger>
            <PopupContent>
              <Box
                width={16}
                height={16}
                borderRadius="50%"
                backgroundColor="success.main"
                style={{ borderColor: 'white', borderWidth: 4 }}
              />
            </PopupContent>
          </Popup>
          <Popup position="right-top" offsetMargin={{ x: -8, y: -8 }}>
            <PopupTrigger>
              <Button variant="outlined">Right-Top-Inset</Button>
            </PopupTrigger>
            <PopupContent>
              <Box
                width={16}
                height={16}
                borderRadius="50%"
                backgroundColor="success.main"
                style={{ borderColor: 'white', borderWidth: 4 }}
              />
            </PopupContent>
          </Popup>
        </Box>
        <Box gap={2} direction="row" justifyContent="center">
          <Popup position="left-center">
            <PopupTrigger>
              <Button variant="outlined">Left-Center</Button>
            </PopupTrigger>
            <PopupContent>{PopupPaper}</PopupContent>
          </Popup>
          <Popup position="right-center">
            <PopupTrigger>
              <Button variant="outlined">Right-Center</Button>
            </PopupTrigger>
            <PopupContent>{PopupPaper}</PopupContent>
          </Popup>
        </Box>
        <Box gap={2} direction="row" justifyContent="center">
          <Popup position="left-bottom">
            <PopupTrigger>
              <Button variant="outlined">Left-Bottom</Button>
            </PopupTrigger>
            <PopupContent>{PopupPaper}</PopupContent>
          </Popup>
          <Popup position="right-bottom">
            <PopupTrigger>
              <Button variant="outlined">Right-Bottom</Button>
            </PopupTrigger>
            <PopupContent>{PopupPaper}</PopupContent>
          </Popup>
        </Box>
        <Box gap={2} justifyContent="center" direction="row">
          <Popup position="left-center">
            <PopupTrigger>
              <Button variant="outlined">Left-Center</Button>
            </PopupTrigger>
            <PopupContent>{PopupPaper}</PopupContent>
          </Popup>
          <Popup position="right-center">
            <PopupTrigger>
              <Button variant="outlined">Right-Center</Button>
            </PopupTrigger>
            <PopupContent>{PopupPaper}</PopupContent>
          </Popup>
        </Box>
        <Box gap={2} alignItems="center" justifyContent="center" direction="row">
          <Popup position="center">
            <PopupTrigger>
              <Button variant="outlined">Center</Button>
            </PopupTrigger>
            <PopupContent>
              <Paper sx={({ spacing }) => ({ padding: spacing.create(2) })}>
                <Typography>I will appear from the center of the button</Typography>
              </Paper>
            </PopupContent>
          </Popup>
        </Box>
        <Box gap={2} direction="row" justifyContent="center">
          <Popup position="top">
            <PopupTrigger>
              <Button variant="outlined" fullFlex>
                Top
              </Button>
            </PopupTrigger>
            <PopupContent>{PopupPaper}</PopupContent>
          </Popup>
          <Popup position="bottom">
            <PopupTrigger>
              <Button variant="outlined" fullFlex>
                Bottom
              </Button>
            </PopupTrigger>
            <PopupContent>{PopupPaper}</PopupContent>
          </Popup>
        </Box>
        <Box gap={2} direction="row">
          <Popup position="top">
            <PopupTrigger>
              <Button variant="outlined" fullFlex>
                Top-Left
              </Button>
            </PopupTrigger>
            <PopupContent>{PopupPaper}</PopupContent>
          </Popup>
          <Popup position="top-right">
            <PopupTrigger>
              <Button variant="outlined" fullFlex>
                Top-Right
              </Button>
            </PopupTrigger>
            <PopupContent>{PopupPaper}</PopupContent>
          </Popup>
        </Box>
        <Box gap={2} direction="row">
          <Popup position="top-center">
            <PopupTrigger>
              <Button variant="outlined" fullFlex>
                Top-Center
              </Button>
            </PopupTrigger>
            <PopupContent>{PopupPaper}</PopupContent>
          </Popup>
          <Popup position="bottom-center">
            <PopupTrigger>
              <Button variant="outlined" fullFlex>
                Bottom-Center
              </Button>
            </PopupTrigger>
            <PopupContent>{PopupPaper}</PopupContent>
          </Popup>
        </Box>
        <Box gap={2} direction="row">
          <Popup position="bottom">
            <PopupTrigger>
              <Button variant="outlined" fullFlex>
                Bottom-Left
              </Button>
            </PopupTrigger>
            <PopupContent>{PopupPaper}</PopupContent>
          </Popup>
          <Popup position="bottom-right">
            <PopupTrigger>
              <Button variant="outlined" fullFlex>
                Bottom-Right
              </Button>
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
              <Typography fullFlex>Press For Default Popup</Typography>
              <Icon name="list-unordered" />
            </ListItemButton>
          </PopupTrigger>
          <PopupContent>{PopupPaper}</PopupContent>
        </Popup>
        <Popup elevate>
          <PopupTrigger>
            <ListItemButton sx={({ palette }) => ({ backgroundColor: palette.backgrounds.paper })}>
              <Typography fullFlex>Press For Elevated Popup</Typography>
              <Icon name="list-unordered" />
            </ListItemButton>
          </PopupTrigger>
          <PopupContent>{PopupPaper}</PopupContent>
        </Popup>
        <Popup closeOnElevatedTriggerEvent="onPress" elevate>
          <PopupTrigger>
            <Button variant="contained">Toggle Nested Menu</Button>
          </PopupTrigger>
          <PopupContent>
            <Paper>
              <ListItemButton size="small" divider>
                <Typography>Select</Typography>
              </ListItemButton>
              <ListItemButton size="small" divider>
                <Typography color="error">Delete</Typography>
              </ListItemButton>
              <Popup position="right">
                <PopupTrigger>
                  <ListItemButton size="small">
                    <Typography>More Actions</Typography>
                    <Icon name="chevron-right" />
                  </ListItemButton>
                </PopupTrigger>
                <PopupContent>
                  <Paper>
                    <ListItemButton size="small" divider>
                      <Typography>Nested 1</Typography>
                    </ListItemButton>
                    <Popup position="left">
                      <PopupTrigger>
                        <ListItemButton size="small">
                          <Icon name="chevron-left" />
                          <Typography>Nested 2</Typography>
                        </ListItemButton>
                      </PopupTrigger>
                      <PopupContent>
                        <Paper>
                          <ListItemButton size="small" divider>
                            <Typography>Inner 1</Typography>
                          </ListItemButton>
                          <ListItemButton size="small">
                            <Typography>Inner 2</Typography>
                          </ListItemButton>
                        </Paper>
                      </PopupContent>
                    </Popup>
                  </Paper>
                </PopupContent>
              </Popup>
            </Paper>
          </PopupContent>
        </Popup>
      </SubSection>
    </Section>
  )
}
