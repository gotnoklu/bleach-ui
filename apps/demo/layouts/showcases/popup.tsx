import { Box, type BoxProps } from '@bleach/ui/components/box'
import { Button } from '@bleach/ui/components/button'
import { Card } from '@bleach/ui/components/card'
import { Icon } from '@bleach/ui/components/icon'
import { ListItemButton } from '@bleach/ui/components/list-item-button'
import { Popup, PopupContent, PopupTrigger } from '@bleach/ui/components/popup'
import { Text } from '@bleach/ui/components/text'
import { styled } from '@bleach/ui/theme/styles'

const Section = styled(Box)<BoxProps>((theme) => ({ gap: theme.spacing(4) }))
const SubSection = styled(Box)<BoxProps>((theme) => ({ gap: theme.spacing(2) }))

const PopupCard = (
  <Card>
    <Text>Hello!</Text>
  </Card>
)

export const PopupShowcase = () => {
  return (
    <Section>
      <Text variant="h5">Popup</Text>
      <SubSection>
        <Text variant="h6" color="text.secondary">
          Positions
        </Text>
        <Box gap={2} direction="row" justifyContent="center">
          <Popup position="left">
            <PopupTrigger>
              <Button variant="outlined">Left</Button>
            </PopupTrigger>
            <PopupContent>{PopupCard}</PopupContent>
          </Popup>
          <Popup position="right">
            <PopupTrigger>
              <Button variant="outlined">Right</Button>
            </PopupTrigger>
            <PopupContent>{PopupCard}</PopupContent>
          </Popup>
        </Box>
        <Box gap={2} direction="row" justifyContent="center">
          <Popup position="left-top">
            <PopupTrigger>
              <Button variant="outlined">Left-Top</Button>
            </PopupTrigger>
            <PopupContent>{PopupCard}</PopupContent>
          </Popup>
          <Popup position="right-top">
            <PopupTrigger>
              <Button variant="outlined">Right-Top</Button>
            </PopupTrigger>
            <PopupContent>{PopupCard}</PopupContent>
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
            <PopupContent>{PopupCard}</PopupContent>
          </Popup>
          <Popup position="right-center">
            <PopupTrigger>
              <Button variant="outlined">Right-Center</Button>
            </PopupTrigger>
            <PopupContent>{PopupCard}</PopupContent>
          </Popup>
        </Box>
        <Box gap={2} direction="row" justifyContent="center">
          <Popup position="left-bottom">
            <PopupTrigger>
              <Button variant="outlined">Left-Bottom</Button>
            </PopupTrigger>
            <PopupContent>{PopupCard}</PopupContent>
          </Popup>
          <Popup position="right-bottom">
            <PopupTrigger>
              <Button variant="outlined">Right-Bottom</Button>
            </PopupTrigger>
            <PopupContent>{PopupCard}</PopupContent>
          </Popup>
        </Box>
        <Box gap={2} justifyContent="center" direction="row">
          <Popup position="left-center">
            <PopupTrigger>
              <Button variant="outlined">Left-Center</Button>
            </PopupTrigger>
            <PopupContent>{PopupCard}</PopupContent>
          </Popup>
          <Popup position="right-center">
            <PopupTrigger>
              <Button variant="outlined">Right-Center</Button>
            </PopupTrigger>
            <PopupContent>{PopupCard}</PopupContent>
          </Popup>
        </Box>
        <Box gap={2} alignItems="center" justifyContent="center" direction="row">
          <Popup position="center">
            <PopupTrigger>
              <Button variant="outlined">Center</Button>
            </PopupTrigger>
            <PopupContent>
              <Card>
                <Text>I will appear from the center of the button</Text>
              </Card>
            </PopupContent>
          </Popup>
        </Box>
        <Box gap={2} direction="row" justifyContent="center">
          <Popup position="top">
            <PopupTrigger>
              <Button variant="outlined">Top</Button>
            </PopupTrigger>
            <PopupContent>{PopupCard}</PopupContent>
          </Popup>
          <Popup position="bottom">
            <PopupTrigger>
              <Button variant="outlined">Bottom</Button>
            </PopupTrigger>
            <PopupContent>{PopupCard}</PopupContent>
          </Popup>
        </Box>
        <Box gap={2} direction="row">
          <Popup position="top">
            <PopupTrigger>
              <Button variant="outlined">Top-Left</Button>
            </PopupTrigger>
            <PopupContent>{PopupCard}</PopupContent>
          </Popup>
          <Popup position="top-right">
            <PopupTrigger>
              <Button variant="outlined">Top-Right</Button>
            </PopupTrigger>
            <PopupContent>{PopupCard}</PopupContent>
          </Popup>
        </Box>
        <Box gap={2} direction="row">
          <Popup position="top-center">
            <PopupTrigger>
              <Button variant="outlined">Top-Center</Button>
            </PopupTrigger>
            <PopupContent>{PopupCard}</PopupContent>
          </Popup>
          <Popup position="bottom-center">
            <PopupTrigger>
              <Button variant="outlined">Bottom-Center</Button>
            </PopupTrigger>
            <PopupContent>{PopupCard}</PopupContent>
          </Popup>
        </Box>
        <Box gap={2} direction="row">
          <Popup position="bottom">
            <PopupTrigger>
              <Button variant="outlined">Bottom-Left</Button>
            </PopupTrigger>
            <PopupContent>{PopupCard}</PopupContent>
          </Popup>
          <Popup position="bottom-right">
            <PopupTrigger>
              <Button variant="outlined">Bottom-Right</Button>
            </PopupTrigger>
            <PopupContent>{PopupCard}</PopupContent>
          </Popup>
        </Box>
      </SubSection>
      <SubSection>
        <Text variant="h6" color="text.secondary">
          Variants
        </Text>
        <Popup>
          <PopupTrigger>
            <ListItemButton>
              <Text style={{ flex: 1 }}>Press For Default Popup</Text>
              <Icon name="list-unordered" />
            </ListItemButton>
          </PopupTrigger>
          <PopupContent>{PopupCard}</PopupContent>
        </Popup>
        <Popup elevate>
          <PopupTrigger>
            <ListItemButton>
              <Text style={{ flex: 1 }}>Press For Elevated Popup</Text>
              <Icon name="list-unordered" />
            </ListItemButton>
          </PopupTrigger>
          <PopupContent>{PopupCard}</PopupContent>
        </Popup>
        <Popup closeOnElevatedTriggerEvent="onPress" elevate>
          <PopupTrigger>
            <Button variant="filled">Toggle Nested Menu</Button>
          </PopupTrigger>
          <PopupContent>
            <Card>
              <ListItemButton size="small" separator>
                <Text>Select</Text>
              </ListItemButton>
              <ListItemButton size="small" separator>
                <Text color="error">Delete</Text>
              </ListItemButton>
              <Popup position="right">
                <PopupTrigger>
                  <ListItemButton size="small">
                    <Text>More Actions</Text>
                    <Icon name="chevron-right" />
                  </ListItemButton>
                </PopupTrigger>
                <PopupContent>
                  <Card>
                    <ListItemButton size="small" separator>
                      <Text>Nested 1</Text>
                    </ListItemButton>
                    <Popup position="left">
                      <PopupTrigger>
                        <ListItemButton size="small">
                          <Icon name="chevron-left" />
                          <Text>Nested 2</Text>
                        </ListItemButton>
                      </PopupTrigger>
                      <PopupContent>
                        <Card>
                          <ListItemButton size="small" separator>
                            <Text>Inner 1</Text>
                          </ListItemButton>
                          <ListItemButton size="small">
                            <Text>Inner 2</Text>
                          </ListItemButton>
                        </Card>
                      </PopupContent>
                    </Popup>
                  </Card>
                </PopupContent>
              </Popup>
            </Card>
          </PopupContent>
        </Popup>
      </SubSection>
    </Section>
  )
}
