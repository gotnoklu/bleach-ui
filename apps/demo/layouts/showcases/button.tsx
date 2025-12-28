import { Button } from '@bleeech/ui/components/button'
import { IconSettings } from '@bleeech/ui/components/icons'
import { ListItem } from '@bleeech/ui/components/list-item'
import { Text } from '@bleeech/ui/components/text'
import { ActivityIndicator, Alert } from 'react-native'
import { Section, SubSection } from '../../components/section'

export const ButtonShowcase = () => {
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
              <IconSettings color="primary.foreground" />
            </Button>
            <Button size="icon" variant="outlined">
              <IconSettings color="primary.main" />
            </Button>
            <Button size="icon" variant="ghost">
              <IconSettings color="primary.main" />
            </Button>
          </ListItem>
        </SubSection>
        <SubSection>
          <Text variant="lg" color="text.secondary">
            Shapes
          </Text>
          <ListItem disableMinHeight disablePadding>
            <Button variant="filled" size="icon">
              <IconSettings color="primary.foreground" />
            </Button>
            <Button variant="filled" size="icon" shape="rounded">
              <IconSettings color="primary.foreground" />
            </Button>
          </ListItem>
        </SubSection>
        <SubSection>
          <Text variant="lg" color="text.secondary">
            Sizes
          </Text>
          <ListItem disableMinHeight disablePadding>
            <Button variant="filled" size="icon-sm">
              <IconSettings color="primary.foreground" />
            </Button>
            <Button variant="filled" size="icon-md">
              <IconSettings color="primary.foreground" />
            </Button>
            <Button variant="filled" size="icon-lg">
              <IconSettings color="primary.foreground" />
            </Button>
          </ListItem>
          <ListItem disableMinHeight disablePadding>
            <Button size="icon-sm" variant="outlined" shape="rounded">
              <IconSettings size={18} color="primary.main" />
            </Button>
            <Button size="icon-md" variant="outlined" shape="rounded">
              <IconSettings color="primary.main" />
            </Button>
            <Button size="icon-lg" variant="outlined" shape="rounded">
              <IconSettings size={26} color="primary.main" />
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
              <ActivityIndicator color="primary.foreground" />
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
