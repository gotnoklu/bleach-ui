import Button from 'bleach/dist/components/Button'
import Typography from 'bleach/dist/components/Typography'
import Checkbox from 'bleach/dist/components/Checkbox'
import Box, { type BoxProps } from 'bleach/dist/components/Box'
import BackgroundView from 'bleach/dist/components/BackgroundView'
import Switch from 'bleach/dist/components/Switch'
import ListItem from 'bleach/dist/components/ListItem'
import Divider from 'bleach/dist/components/Divider'
import { Alert, ScrollView } from 'react-native'
import { useState } from 'react'
import { styled } from 'bleach'

const Section = styled(Box)<BoxProps>((theme) => ({ gap: theme.spacing.create(4) }))
const SubSection = styled(Box)<BoxProps>((theme) => ({ gap: theme.spacing.create(2) }))

export default function HomeScreen() {
  const [isChecked1, setIsChecked1] = useState(false)
  const [_isChecked2, _setIsChecked2] = useState(true)
  const [loading, setLoading] = useState(false)

  const handleLoadingPress = () => {
    setLoading(true)
    setTimeout(() => setLoading(false), 2000)
  }

  const handleButtonAlertPress = () => {
    Alert.alert('Button pressed')
  }

  return (
    <ScrollView style={{ flex: 1 }} contentContainerStyle={{ paddingBottom: 40 }}>
      <BackgroundView
        sx={(theme) => ({
          paddingHorizontal: theme.spacing.create(2),
          paddingVertical: theme.spacing.create(4),
          gap: theme.spacing.create(5),
        })}
      >
        <Box>
          <Typography variant="h1" fontWeight="medium" gutterBottom>
            Bleach UI
          </Typography>
          <Typography variant="h6" color="text.secondary">
            The stylish React Native UI library
          </Typography>
        </Box>

        {/* Buttons Section */}
        <Section>
          <Typography variant="h5">Buttons</Typography>
          <SubSection>
            <Typography variant="h6" color="text.secondary">
              Variants
            </Typography>
            <ListItem disableMinHeight disablePadding>
              <Button variant="contained">Contained</Button>
              <Button variant="outlined">Outlined</Button>
              <Button variant="text">Text</Button>
            </ListItem>
          </SubSection>
          <SubSection>
            <Typography variant="h6" color="text.secondary">
              Shapes
            </Typography>
            <ListItem disableMinHeight disablePadding>
              <Button variant="contained">Default</Button>
              <Button variant="contained" rounded>
                Rounded
              </Button>
            </ListItem>
          </SubSection>
          <SubSection>
            <Typography variant="h6" color="text.secondary">
              States
            </Typography>
            <ListItem disableMinHeight disablePadding>
              <Button variant="contained" onPress={handleLoadingPress}>
                {loading ? 'Loading...' : 'Press me'}
              </Button>
              <Button variant="contained" disabled>
                Disabled
              </Button>
              <Button variant="contained" onPress={handleButtonAlertPress}>
                Action
              </Button>
            </ListItem>
          </SubSection>
        </Section>

        <Divider />

        {/* Checkboxes Section */}
        <Section>
          <Typography variant="h5">Checkboxes</Typography>
          <SubSection>
            <Typography variant="h6" color="text.secondary">
              Sizes
            </Typography>
            <ListItem disableMinHeight disablePadding>
              <Checkbox checked size="small" />
              <Typography>Small</Typography>
            </ListItem>
            <ListItem disableMinHeight disablePadding>
              <Checkbox checked />
              <Typography>Medium</Typography>
            </ListItem>
            <ListItem disableMinHeight disablePadding>
              <Checkbox checked size="large" />
              <Typography>Large</Typography>
            </ListItem>
          </SubSection>
          <SubSection>
            <Typography variant="h6" color="text.secondary">
              Variants
            </Typography>
            <ListItem disableMinHeight disablePadding>
              <Checkbox checked rounded />
              <Typography>Rounded</Typography>
            </ListItem>
            <ListItem disableMinHeight disablePadding>
              <Checkbox checked />
              <Typography>Default</Typography>
            </ListItem>
          </SubSection>
          <SubSection>
            <Typography variant="h6" color="text.secondary">
              States
            </Typography>
            <ListItem disableMinHeight disablePadding>
              <Checkbox checked={isChecked1} onChange={setIsChecked1} />
              <Typography>Controlled</Typography>
            </ListItem>
            <ListItem disableMinHeight disablePadding>
              <Checkbox />
              <Typography>Uncontrolled</Typography>
            </ListItem>
            <ListItem disableMinHeight disablePadding>
              <Checkbox checked disabled />
              <Typography style={{ flex: 1 }}>Disabled checked</Typography>
            </ListItem>
            <ListItem disableMinHeight disablePadding>
              <Checkbox disabled />
              <Typography style={{ flex: 1 }}>Disabled unchecked</Typography>
            </ListItem>
          </SubSection>
        </Section>
        <Divider />
        <Section>
          <Typography variant="h5">Switches</Typography>
          <SubSection>
            <Typography variant="h6" color="text.secondary">
              Variants
            </Typography>
            <ListItem disableMinHeight disablePadding>
              <Switch rounded />
              <Typography>Rounded</Typography>
            </ListItem>
            <ListItem disableMinHeight disablePadding>
              <Switch />
              <Typography>Default</Typography>
            </ListItem>
          </SubSection>
          <SubSection>
            <Typography variant="h6" color="text.secondary">
              States
            </Typography>
            <ListItem disableMinHeight disablePadding>
              <Switch />
              <Typography>Uncontrolled</Typography>
            </ListItem>
            <ListItem disableMinHeight disablePadding>
              <Switch />
              <Typography>Controlled</Typography>
            </ListItem>
            <ListItem disableMinHeight disablePadding>
              <Switch checked disabled />
              <Typography>Disabled Checked</Typography>
            </ListItem>
            <ListItem disableMinHeight disablePadding>
              <Switch disabled />
              <Typography>Disabled Unchecked</Typography>
            </ListItem>
          </SubSection>
        </Section>
      </BackgroundView>
    </ScrollView>
  )
}
