import { Box } from '@bleeech/ui/components/box'
import { Button } from '@bleeech/ui/components/button'
import { IconCheck, IconEye, IconEyeClosed, IconX } from '@bleeech/ui/components/icons'
import { Input } from '@bleeech/ui/components/input'
import { ListItem } from '@bleeech/ui/components/list-item'
import { Text } from '@bleeech/ui/components/text'
import { createStylesheet } from '@bleeech/ui/theme/styles'
import { useState } from 'react'
import { Section, SubSection } from '../../components/section'

const useStyles = createStylesheet((theme) => ({
  error: {
    color: theme.palette.error.main,
  },
  success: {
    color: theme.palette.success.main,
  },
  icon: {
    color: theme.palette.icon,
  },
}))

export const InputShowcase = () => {
  const styles = useStyles()
  const [showPassword, setShowPassword] = useState(false)

  return (
    <Section>
      <Text variant="xl">Inputs</Text>
      <SubSection>
        <Text variant="lg" color="text.secondary">
          Variants
        </Text>
        <ListItem disableMinHeight disablePadding>
          <Input label="Default" fullWidth />
        </ListItem>
        <ListItem disableMinHeight disablePadding>
          <Input label="Outlined" variant="outlined" fullWidth />
        </ListItem>
        <ListItem disableMinHeight disablePadding>
          <Input label="Filled" variant="filled" fullWidth />
        </ListItem>
      </SubSection>
      <SubSection>
        <Text variant="lg" color="text.secondary">
          Examples
        </Text>
        <ListItem disableMinHeight disablePadding>
          <Input
            label="Full name"
            variant="filled"
            placeholder="John Doe"
            description="Full name must have at least 1 character"
            fullWidth
          />
        </ListItem>
        <ListItem disableMinHeight disablePadding>
          <Input
            label="Password"
            variant="outlined"
            placeholder="********"
            rightActions={
              <Button size="icon-sm" variant="ghost" onPress={() => setShowPassword(!showPassword)}>
                {showPassword ? <IconEyeClosed color={styles.icon.color} /> : <IconEye color={styles.icon.color} />}
              </Button>
            }
            description={
              <Box gap={1}>
                <Box direction="row" alignItems="center" gap={0.5}>
                  <IconCheck size={12} color={styles.success.color} />
                  <Text variant="xs" color="success.main">
                    Be at least 16 characters long
                  </Text>
                </Box>
                <Box direction="row" alignItems="center" gap={0.5}>
                  <IconCheck size={12} color={styles.success.color} />
                  <Text variant="xs" color="success.main">
                    Have at least 1 symbol
                  </Text>
                </Box>
                <Box direction="row" alignItems="center" gap={0.5}>
                  <IconX size={12} color={styles.error.color} />
                  <Text variant="xs" color="error.main">
                    Have at least 1 uppercase character
                  </Text>
                </Box>
                <Box direction="row" alignItems="center" gap={0.5}>
                  <IconX size={12} color={styles.error.color} />
                  <Text variant="xs" color="error.main">
                    Have at least 1 uppercase character
                  </Text>
                </Box>
                <Box direction="row" alignItems="center" gap={0.5}>
                  <IconX size={12} color={styles.error.color} />
                  <Text variant="xs" color="error.main">
                    Have at least 1 lowercase character
                  </Text>
                </Box>
              </Box>
            }
            fullWidth
          />
        </ListItem>
      </SubSection>
    </Section>
  )
}
