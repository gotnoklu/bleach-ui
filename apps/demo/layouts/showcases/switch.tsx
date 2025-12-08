import { ListItem } from '@bleach/ui/components/list-item'
import { Switch } from '@bleach/ui/components/switch'
import { Text } from '@bleach/ui/components/text'
import { useState } from 'react'
import { Button, StyleSheet, View } from 'react-native'
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated'

export const SwitchShowcase = () => {
  const translateX = useSharedValue<number>(0)

  const handlePress = () => {
    translateX.value += 50
  }

  const animatedStyles = useAnimatedStyle(() => ({
    transform: [{ translateX: withSpring(translateX.value * 2) }],
  }))

  return (
    <>
      <Animated.View style={[styles.box, animatedStyles]} />
      <View style={styles.container}>
        <Button onPress={handlePress} title="Click me" />
      </View>
    </>
  )

  // const [checked, setChecked] = useState(false)

  // return (
  //   <Section>
  //     <Switch shape="rounded" />
  //     <Text variant="h5">Switches</Text>
  //     <SubSection>
  //       <Text variant="h6" color="text.secondary">
  //         Variants
  //       </Text>
  //       <ListItem disableMinHeight disablePadding>
  //         <Switch shape="rounded" />
  //         <Text>Rounded</Text>
  //       </ListItem>
  //       <ListItem disableMinHeight disablePadding>
  //         <Switch />
  //         <Text>Default</Text>
  //       </ListItem>
  //     </SubSection>
  //     <SubSection>
  //       <Text variant="h6" color="text.secondary">
  //         States
  //       </Text>
  //       <ListItem disableMinHeight disablePadding>
  //         <Switch defaultChecked />
  //         <Text>Uncontrolled</Text>
  //       </ListItem>
  //       <ListItem disableMinHeight disablePadding>
  //         <Switch checked={checked} onChecked={setChecked} />
  //         <Text>Controlled</Text>
  //       </ListItem>
  //       <ListItem disableMinHeight disablePadding>
  //         <Switch checked disabled />
  //         <Text>Disabled Checked</Text>
  //       </ListItem>
  //       <ListItem disableMinHeight disablePadding>
  //         <Switch disabled />
  //         <Text>Disabled Unchecked</Text>
  //       </ListItem>
  //     </SubSection>
  //   </Section>
  // )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    height: 120,
    width: 120,
    backgroundColor: '#b58df1',
    borderRadius: 20,
    marginVertical: 50,
  },
})
