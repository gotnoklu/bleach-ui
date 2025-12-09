import { createStylesheet } from '@bleach/ui'
import { Button } from '@bleach/ui/components/button'
import { Color } from '@bleach/ui/components/color'
import { IconSettings } from '@bleach/ui/components/icon'
import { ListItem } from '@bleach/ui/components/list-item'
import { Text } from '@bleach/ui/components/text'
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
        <Text variant="h5">Buttons</Text>
        <SubSection>
          <Text variant="h6" color="text.secondary">
            Variants
          </Text>
          <ListItem disableMinHeight disablePadding>
            <Button variant="filled">Contained</Button>
            <Button variant="outlined">Outlined</Button>
            <Button variant="ghost">Ghost</Button>
          </ListItem>
        </SubSection>
        <SubSection>
          <Text variant="h6" color="text.secondary">
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
          <Text variant="h6" color="text.secondary">
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
          <Text variant="h6" color="text.secondary">
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
        <Text variant="h5">IconButtons</Text>
        <SubSection>
          <Text variant="h6" color="text.secondary">
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
          <Text variant="h6" color="text.secondary">
            Shapes
          </Text>
          <ListItem disableMinHeight disablePadding>
            <Button variant="filled" size="icon">
              <IconSettings color={styles.icon.color} />
            </Button>
            <Button variant="filled" size="icon" shape="rounded">
              <IconSettings color={styles.icon.color} />
            </Button>
          </ListItem>
        </SubSection>
        <SubSection>
          <Text variant="h6" color="text.secondary">
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
          <Text variant="h6" color="text.secondary">
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
