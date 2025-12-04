import { styled } from '@bleach/ui/dist/theme/utilities'
import Box, { type BoxProps } from '@bleach/ui/dist/components/Box'
import Typography from '@bleach/ui/dist/components/Typography'
import ListItem from '@bleach/ui/dist/components/ListItem'
import Button from '@bleach/ui/dist/components/Button'
import { Alert } from 'react-native'
import { useState } from 'react'

const Section = styled(Box)<BoxProps>((theme) => ({ gap: theme.spacing.create(4) }))
const SubSection = styled(Box)<BoxProps>((theme) => ({ gap: theme.spacing.create(2) }))

export const ButtonShowcase = () => {
  const [loading, setLoading] = useState(false)

  const handleLoadingPress = () => {
    setLoading(true)
    setTimeout(() => setLoading(false), 2000)
  }

  const handleButtonAlertPress = () => {
    Alert.alert('Button pressed')
  }
  return (
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
  )
}
