import Box from 'bleach/dist/components/Box'
import Typography from 'bleach/dist/components/Typography'
import { Link, Stack } from 'expo-router'
import { Fragment } from 'react'
import { StyleSheet } from 'react-native'

export default function NotFoundScreen() {
  return (
    <Fragment>
      <Stack.Screen options={{ title: 'Oops!' }} />
      <Box style={styles.container}>
        <Typography variant="h3">This screen doesn't exist.</Typography>
        <Link href="/" style={styles.link}>
          <Typography color="primary">Go to home screen!</Typography>
        </Link>
      </Box>
    </Fragment>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
})
