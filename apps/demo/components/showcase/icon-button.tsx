import Box, { type BoxProps } from '@bleach/ui/dist/components/Box'
import Icon from '@bleach/ui/dist/components/Icon'
import IconButton from '@bleach/ui/dist/components/IconButton'
import ListItem from '@bleach/ui/dist/components/ListItem'
import Typography from '@bleach/ui/dist/components/Typography'
import { styled } from '@bleach/ui/dist/theme/utilities'
import { useState } from 'react'
import { ActivityIndicator, Alert } from 'react-native'

const Section = styled(Box)<BoxProps>((theme) => ({ gap: theme.spacing(4) }))
const SubSection = styled(Box)<BoxProps>((theme) => ({ gap: theme.spacing(2) }))

export const IconButtonShowcase = () => {
  const [_loading, setLoading] = useState(false)

  const _handleLoadingPress = () => {
    setLoading(true)
    setTimeout(() => setLoading(false), 2000)
  }

  const _handleIconButtonAlertPress = () => {
    Alert.alert('IconButton pressed')
  }
  return (
    <Section>
      <Typography variant="h5">IconButtons</Typography>
      <SubSection>
        <Typography variant="h6" color="text.secondary">
          Variants
        </Typography>
        <ListItem disableMinHeight disablePadding>
          <IconButton variant="contained">
            <Icon name="gear" />
          </IconButton>
          <IconButton variant="outlined">
            <Icon name="gear" />
          </IconButton>
          <IconButton variant="text">
            <Icon name="gear" />
          </IconButton>
        </ListItem>
      </SubSection>
      <SubSection>
        <Typography variant="h6" color="text.secondary">
          Shapes
        </Typography>
        <ListItem disableMinHeight disablePadding>
          <IconButton variant="contained">
            <Icon name="gear" />
          </IconButton>
          <IconButton variant="contained" rounded>
            <Icon name="gear" />
          </IconButton>
        </ListItem>
      </SubSection>
      <SubSection>
        <Typography variant="h6" color="text.secondary">
          Sizes
        </Typography>
        <ListItem disableMinHeight disablePadding>
          <IconButton variant="contained" size="small">
            <Icon name="gear" />
          </IconButton>
          <IconButton variant="contained" size="medium">
            <Icon name="gear" />
          </IconButton>
          <IconButton variant="contained" size="large">
            <Icon name="gear" />
          </IconButton>
        </ListItem>
        <ListItem disableMinHeight disablePadding>
          <IconButton variant="outlined" size="small" rounded>
            <Icon name="gear" />
          </IconButton>
          <IconButton variant="outlined" size="medium" rounded>
            <Icon name="gear" />
          </IconButton>
          <IconButton variant="outlined" size="large" rounded>
            <Icon name="gear" />
          </IconButton>
        </ListItem>
      </SubSection>
      <SubSection>
        <Typography variant="h6" color="text.secondary">
          States
        </Typography>
        <ListItem disableMinHeight disablePadding>
          <IconButton variant="contained" disabled>
            <Icon name="gear" />
          </IconButton>
          <IconButton variant="outlined" disabled>
            <Icon name="gear" />
          </IconButton>
          <IconButton disabled>
            <Icon name="gear" />
          </IconButton>
        </ListItem>
        <ListItem disableMinHeight disablePadding>
          <IconButton variant="contained">
            <ActivityIndicator />
          </IconButton>
          <IconButton variant="outlined">
            <ActivityIndicator />
          </IconButton>
          <IconButton>
            <ActivityIndicator />
          </IconButton>
        </ListItem>
      </SubSection>
    </Section>
  )
}
