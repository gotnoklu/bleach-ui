import { Avatar } from '@bleeech/ui/components/avatar'
import { Box } from '@bleeech/ui/components/box'
import { Button } from '@bleeech/ui/components/button'
import { Card } from '@bleeech/ui/components/card'
import { IconEye, IconUser } from '@bleeech/ui/components/icons'
import { Input } from '@bleeech/ui/components/input'
import { Separator } from '@bleeech/ui/components/separator'
import { Text } from '@bleeech/ui/components/text'
import { ScrollView } from 'react-native'

export default function Forms() {
  return (
    <ScrollView
      style={{
        flex: 1,
      }}
      contentContainerStyle={{
        paddingBottom: 40,
        paddingTop: 16,
        paddingHorizontal: 16,
        gap: 24,
      }}
    >
      <Card>
        <Box gap={6} paddingX={2} paddingY={3}>
          <Box gap={2} alignItems="center" style={{ alignSelf: 'center' }}>
            <Avatar size="lg">
              <IconUser color="primary.main" />
            </Avatar>
            <Box>
              <Text variant="lg" fontWeight="medium" textAlign="center" gutterBottom>
                Welcome!
              </Text>
              <Text variant="sm" color="text.secondary" textAlign="center">
                Please enter your email and password to login
              </Text>
            </Box>
          </Box>
          <Box gap={2}>
            <Input variant="outlined" label="Email" placeholder="Enter your email" />
            <Input
              variant="outlined"
              label="Password"
              placeholder="Enter your password"
              rightActions={
                <Button variant="ghost" size="icon">
                  <IconEye />
                </Button>
              }
              secureTextEntry
              fullWidth
            />
            <Text color="primary" variant="sm" textAlign="right" style={{ flex: 1 }}>
              Forgot Password?
            </Text>
          </Box>
          <Button variant="filled">Login</Button>
        </Box>
        <Separator />
        <Box gap={2} paddingY={3} paddingX={2}>
          <Text color="text.secondary">Are you new here?</Text>
          <Button variant="outlined">Sign up</Button>
        </Box>
      </Card>
      <Card>
        <Box gap={6} paddingX={2} paddingY={3}>
          <Box gap={2} alignItems="center" style={{ alignSelf: 'center' }}>
            <Avatar size="lg">
              <IconUser />
            </Avatar>
            <Box>
              <Text variant="lg" fontWeight="medium" textAlign="center" gutterBottom>
                Create New Account
              </Text>
              <Text variant="sm" color="text.secondary" textAlign="center">
                Please enter your details to signup
              </Text>
            </Box>
          </Box>
          <Box gap={2}>
            <Input variant="outlined" label="First Name" placeholder="eg: John" />
            <Input variant="outlined" label="Last Name" placeholder="eg: Doe" />
            <Input variant="outlined" label="Email" placeholder="Enter your email" />
            <Input
              variant="outlined"
              label="Password"
              placeholder="Enter your password"
              rightActions={
                <Button variant="ghost" size="icon">
                  <IconEye />
                </Button>
              }
              secureTextEntry
              fullWidth
            />
            <Input
              variant="outlined"
              label="Confirm Password"
              placeholder="Retype password"
              rightActions={
                <Button variant="ghost" size="icon">
                  <IconEye />
                </Button>
              }
              secureTextEntry
              fullWidth
            />
          </Box>
          <Button variant="filled">Sign up</Button>
        </Box>
        <Separator />
        <Box gap={2} paddingY={3} paddingX={2}>
          <Text color="text.secondary">Already have an account?</Text>
          <Button variant="outlined">Log in</Button>
        </Box>
      </Card>
    </ScrollView>
  )
}
