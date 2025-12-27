import { Button } from '@bleeech/ui/components/button'
import { Color } from '@bleeech/ui/components/color'
import { IconSettings } from '@bleeech/ui/components/icons'
import { ListItem } from '@bleeech/ui/components/list-item'
import { Text } from '@bleeech/ui/components/text'
import { createStylesheet } from '@bleeech/ui/theme/styles'
import { ActivityIndicator, Alert } from 'react-native'
import { Section, SubSection } from '../../components/section'

const useStyles = createStylesheet((theme) => ({
  icon: { color: theme.palette.primary.foreground },
}))

export const ButtonShowcase = () => {
  const styles = useStyles()

  const handleButtonAlertPress = () => {
    Alert.alert('Button pressed')
  }

  return (
    <>
      <Section>
        <Text variant="xl">Buttons</Text>
        <SubSection>
          <Text variant="lg" color="text.secondary">
            Variants
          </Text>
          <ListItem disableMinHeight disablePadding>
            <Button variant="filled">Contained</Button>
            <Button variant="outlined">Outlined</Button>
            <Button variant="ghost">Ghost</Button>
          </ListItem>
        </SubSection>
        <SubSection>
          <Text variant="lg" color="text.secondary">
            Shapes
          </Text>
          <ListItem disableMinHeight disablePadding>
            <Button variant="filled">Default</Button>
            <Button variant="filled" shape="rounded">
              Rounded
            </Button>
          </ListItem>
        </SubSection>
        <SubSection>
          <Text variant="lg" color="text.secondary">
            Sizes
          </Text>
          <ListItem disableMinHeight disablePadding>
            <Button variant="filled" size="sm">
              sm
            </Button>
            <Button variant="filled" size="md">
              md
            </Button>
            <Button variant="filled" size="lg">
              lg
            </Button>
          </ListItem>
        </SubSection>
        <SubSection>
          <Text variant="lg" color="text.secondary">
            States
          </Text>
          <ListItem disableMinHeight disablePadding>
            <Button variant="filled" disabled>
              Disabled
            </Button>
            <Button variant="filled" onPress={handleButtonAlertPress}>
              Default
            </Button>
          </ListItem>
        </SubSection>
      </Section>
      <Section>
        <Text variant="xl">IconButtons</Text>
        <SubSection>
          <Text variant="lg" color="text.secondary">
            Variants
          </Text>
          <ListItem disableMinHeight disablePadding>
            <Button variant="filled" size="icon">
              <Color color="primary.foreground">
                <IconSettings />
              </Color>
            </Button>
            <Button size="icon" variant="outlined">
              <Color color="primary.main">
                <IconSettings />
              </Color>
            </Button>
            <Button size="icon" variant="ghost">
              <Color color="primary.main">
                <IconSettings />
              </Color>
            </Button>
          </ListItem>
        </SubSection>
        <SubSection>
          <Text variant="lg" color="text.secondary">
            Shapes
          </Text>
          <ListItem disableMinHeight disablePadding>
            <Button variant="filled" size="icon">
              <IconSettings style={styles.icon} />
            </Button>
            <Button variant="filled" size="icon" shape="rounded">
              <IconSettings style={styles.icon} />
            </Button>
          </ListItem>
        </SubSection>
        <SubSection>
          <Text variant="lg" color="text.secondary">
            Sizes
          </Text>
          <ListItem disableMinHeight disablePadding>
            <Button variant="filled" size="icon-sm">
              <Color color="primary.foreground">
                <IconSettings />
              </Color>
            </Button>
            <Button variant="filled" size="icon-md">
              <Color color="primary.foreground">
                <IconSettings />
              </Color>
            </Button>
            <Button variant="filled" size="icon-lg">
              <Color color="primary.foreground">
                <IconSettings />
              </Color>
            </Button>
          </ListItem>
          <ListItem disableMinHeight disablePadding>
            <Button size="icon-sm" variant="outlined" shape="rounded">
              <Color color="primary.main">
                <IconSettings size={18} />
              </Color>
            </Button>
            <Button size="icon-md" variant="outlined" shape="rounded">
              <Color color="primary.main">
                <IconSettings />
              </Color>
            </Button>
            <Button size="icon-lg" variant="outlined" shape="rounded">
              <Color color="primary.main">
                <IconSettings size={26} />
              </Color>
            </Button>
          </ListItem>
        </SubSection>
        <SubSection>
          <Text variant="lg" color="text.secondary">
            States
          </Text>
          <ListItem disableMinHeight disablePadding>
            <Button variant="filled" size="icon" disabled>
              <IconSettings />
            </Button>
            <Button size="icon" variant="outlined" disabled>
              <IconSettings />
            </Button>
          </ListItem>
          <ListItem disableMinHeight disablePadding>
            <Button variant="filled" size="icon">
              <ActivityIndicator color={styles.icon.color} />
            </Button>
            <Button size="icon" variant="outlined">
              <ActivityIndicator />
            </Button>
            <Button size="icon" variant="ghost">
              <ActivityIndicator />
            </Button>
          </ListItem>
        </SubSection>
      </Section>
    </>
  )
}
