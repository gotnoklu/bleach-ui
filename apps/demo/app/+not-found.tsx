import Box from 'bleach/dist/components/Box'
import Typography from 'bleach/dist/components/Typography'
import { Link, Stack } from 'expo-router'
import { Fragment } from 'react'

export default function NotFoundScreen() {
  return (
    <Fragment>
      <Stack.Screen options={{ title: 'Oops!' }} />
      <Box flex={1} alignItems="center" justifyContent="center" padding={4}>
        <Typography variant="h3">This screen doesn't exist.</Typography>
        <Link href="/" style={{ marginTop: 15, paddingVertical: 15 }}>
          <Typography color="primary">Go to home screen!</Typography>
        </Link>
      </Box>
    </Fragment>
  )
}
