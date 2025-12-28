# Bleeech UI

Bleeech is a modular and aesthetically pleasing UI library built for React Native with type-safety and a small bundle size. It is the stylish UI library you've probably been looking for.

Visit [the website]() to get started. 

## Features
- Strictly Modular: Import only the specific components you use via direct sub-paths.
- Tree-Shaking Optimized: Designed to ensure zero dead code in your production bundle.
- Named Exports: Consistent, predictable API surface across the entire library.
- TypeScript First: Comprehensive type definitions for a superior developer experience.


## Installation
Install the library using your preferred package manager:

```bash
npm install @bleeech/ui
# or
yarn add @bleeech/ui
# or
pnpm add @bleeech/ui
# or
bun add @bleeech/ui
```

## Usage
See below for a basic example:

```tsx
import React from 'react';
import { View } from 'react-native';

import { Avatar } from '@bleeech/ui/components/avatar';
import { Button } from '@bleeech/ui/components/button';
import { Text } from '@bleeech/ui/components/text';

export const Example = () => (
  <View>
    <Avatar variant="circular" source={{ uri: 'https://test.com/image.png' }} />
    <Text variant="lg" color="text.secondary">Here is some text!</Text>
    <Button variant="outlined">Button here</Button>
  </View>
);
```

## Theming
Bleeech features a theming system that supports multi-theming (light/dark) and uses React's context to create a theme provider which can be used to wrap the root layout.


```tsx
/** screen-stack.tsx **/
import { useTheme } from '@bleeech/ui/theme'
import { Stack } from 'expo-router'

export function ScreenStack() {
  const theme = useTheme()

  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: 'Buttons',
          headerTitle: 'Buttons',
          headerTitleStyle: {
            color: theme.palette.text.primary,
            ...(theme.typography.weights.medium as { fontFamily: string }),
          },
        }}
      />
    </Stack>
  )
}
```

```tsx
/** app-provider.tsx **/
import * as React from 'react'
import { ThemeProvider, useThemeMode, getNativeTheme } from '@bleeech/ui/theme'
import { ThemeProvider as NativeThemeProvider } from '@react-navigation/native'
import { StatusBar } from 'expo-status-bar'
import { ScreenStack } from './screen-stack'

const LightTheme = createTheme({
  palette: {
    secondary: {
      main: '#00D0FF',
      foreground: '#000000',
    },
  },
})

const DarkTheme = createTheme({ mode: 'dark' })

export const Themes: { [_ in ThemeMode]: Theme } = { light: LightTheme, dark: DarkTheme }


export default function AppProvider() {
  const { mode } = useThemeMode()

  return (
    <ThemeProvider themes={Themes}>
      <NativeThemeProvider value={getNativeTheme(mode === 'dark' ? Themes.dark : Themes.light)}>
        <ScreenStack />
        <StatusBar style="auto" />
      </NativeThemeProvider>
    </ThemeProvider>
  )
}
```


## Styling
To style your components, Bleeech provides styling primitives that integrate directly with your theme tokens. See the examplex below that use the `createStylesheet` and `styled` utilities:

```tsx
import { View } from 'react-native';
import { createStylesheet, styled } from '@bleeech/theme/styles';
import { Text } from '@bleeech/ui/components/text';

// Create a styled component from another component
const Container = styled(View)((theme) => ({
  backgroundColor: theme.palette.primary.main,
  padding: 16,
  borderRadius: 8,
}));

// Create a theme-aware stylesheet
const useStyles = createStylesheet((theme) => ({
  header: {
    padding: theme.spacing(2),
  },
}));

function Component() {
  // `createStylesheet` returns a hook when called
  const styles = useStyles()

  return (
    <Container>
      <View style={styles.header}>
        <Text>Header</Text>
      </View>
    </Container>
  )
}
```

## Contributing
All contributions to Bleeech are welcome! Please check out our [contributing guide]() to get started.

## License
Bleeech is MIT licensed.
