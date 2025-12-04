import Avatar from '@bleach/ui/dist/components/Avatar'
import Box from '@bleach/ui/dist/components/Box'
import Icon from '@bleach/ui/dist/components/Icon'
import Paper from '@bleach/ui/dist/components/Paper'
import TextField from '@bleach/ui/dist/components/TextField'
import Typography from '@bleach/ui/dist/components/Typography'
import Divider from '@bleach/ui/dist/components/Divider'
import { ScrollView } from 'react-native'
import Button from '@bleach/ui/dist/components/Button'

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
      <Paper variant="outlined">
        <Box paddingY={1} paddingX={2}>
          <Typography fontWeight="medium">Login Form</Typography>
        </Box>
        <Divider />
        <Box gap={6} paddingX={2} paddingY={3}>
          <Box gap={2} alignItems="center" style={{ alignSelf: 'center' }}>
            <Avatar size="large">
              <Icon name="person" />
            </Avatar>
            <Box>
              <Typography fontWeight="medium" style={{ textAlign: 'center' }} gutterBottom>
                Welcome!
              </Typography>
              <Typography variant="body2" color="text.secondary" style={{ textAlign: 'center' }}>
                Please enter your email and password to login
              </Typography>
            </Box>
          </Box>
          <Box gap={2}>
            <TextField variant="outlined" label="Email" placeholder="Enter your email" />
            <TextField
              variant="outlined"
              label="Password"
              placeholder="Enter your password"
              slotProps={{ textInput: { secureTextEntry: true } }}
              fullWidth
            />
            <Typography color="primary" variant="body2" style={{ textAlign: 'right' }} fullFlex>
              Forgot Password?
            </Typography>
          </Box>
          <Button variant="contained">Login</Button>
        </Box>
        <Divider />
        <Box gap={2} paddingY={3} paddingX={2}>
          <Typography color="text.secondary">Are you new here?</Typography>
          <Button variant="outlined">Sign up</Button>
        </Box>
      </Paper>
      <Paper variant="outlined">
        <Box paddingY={1} paddingX={2}>
          <Typography fontWeight="medium">Signup Form</Typography>
        </Box>
        <Divider />
        <Box gap={6} paddingX={2} paddingY={3}>
          <Box gap={2} alignItems="center" style={{ alignSelf: 'center' }}>
            <Avatar size="large">
              <Icon name="person" />
            </Avatar>
            <Box>
              <Typography fontWeight="medium" style={{ textAlign: 'center' }} gutterBottom>
                Welcome!
              </Typography>
              <Typography variant="body2" color="text.secondary" style={{ textAlign: 'center' }}>
                Please enter your details to signup
              </Typography>
            </Box>
          </Box>
          <Box gap={2}>
            <TextField variant="outlined" label="First Name" placeholder="eg: John" />
            <TextField variant="outlined" label="Last Name" placeholder="eg: Doe" />
            <TextField variant="outlined" label="Email" placeholder="Enter your email" />
            <TextField
              variant="outlined"
              label="Password"
              placeholder="Enter your password"
              slotProps={{ textInput: { secureTextEntry: true } }}
              fullWidth
            />
            <TextField
              variant="outlined"
              label="Confirm Password"
              placeholder="Retype password"
              slotProps={{ textInput: { secureTextEntry: true } }}
              fullWidth
            />
          </Box>
          <Button variant="contained">Sign up</Button>
        </Box>
        <Divider />
        <Box gap={2} paddingY={3} paddingX={2}>
          <Typography color="text.secondary">Already have an account?</Typography>
          <Button variant="outlined">Log in</Button>
        </Box>
      </Paper>
    </ScrollView>
  )
}
