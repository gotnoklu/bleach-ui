import { pluginReact } from '@rsbuild/plugin-react'
import { defineConfig } from '@rslib/core'

export default defineConfig({
  lib: [
    {
      bundle: false,
      format: 'esm',
      output: {
        filename: {
          js: '[name].jsx',
        },
      },
    },
  ],
  output: {
    target: 'web',
  },
  plugins: [pluginReact(/** options here */)],
})
