import { Box } from '@bleach/ui/components/box'
import { Text } from '@bleach/ui/components/text'
import { Link, Stack } from 'expo-router'
import { Fragment } from 'react'

export default function NotFoundScreen() {
  return (
    <Fragment>
      <Stack.Screen options={{ title: 'Oops!' }} />
      <Box flex={1} alignItems="center" justifyContent="center" padding={4}>
        <Text variant="h3">This screen doesn't exist.</Text>
        <Link href="/" style={{ marginTop: 15, paddingVertical: 15 }}>
          <Text color="primary">Go to home screen!</Text>
        </Link>
      </Box>
    </Fragment>
  )
}
