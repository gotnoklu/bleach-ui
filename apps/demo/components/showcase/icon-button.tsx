import { styled } from 'bleach/dist/theme/utilities'
import Box, { type BoxProps } from 'bleach/dist/components/Box'
import Typography from 'bleach/dist/components/Typography'
import ListItem from 'bleach/dist/components/ListItem'
import IconButton from 'bleach/dist/components/IconButton'
import { ActivityIndicator, Alert } from 'react-native'
import { useState } from 'react'
import Icon from 'bleach/dist/components/Icon'

const Section = styled(Box)<BoxProps>((theme) => ({ gap: theme.spacing.create(4) }))
const SubSection = styled(Box)<BoxProps>((theme) => ({ gap: theme.spacing.create(2) }))

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
