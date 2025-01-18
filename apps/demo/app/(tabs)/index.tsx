import Button from 'bleach/dist/components/Button'
import Typography from 'bleach/dist/components/Typography'
import { View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function HomeScreen() {
  return (
    <SafeAreaView>
      <View style={{ padding: 10, gap: 10 }}>
        <Button variant="contained">Normal Button</Button>
        <Button variant="contained" rounded>
          Rounded Button
        </Button>
      </View>
      <Typography variant="h1">Hello There!</Typography>
    </SafeAreaView>
  )
}
