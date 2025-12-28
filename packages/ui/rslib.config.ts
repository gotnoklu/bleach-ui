import { pluginReact } from '@rsbuild/plugin-react'
import { defineConfig } from '@rslib/core'

export default defineConfig({
  lib: [
    {
      bundle: false,
      format: 'esm',
      source: {
        entry: {
          index: ['./src/**', '!./src/**/*.{md,json,txt}', '!./src/utilities', '!./src/types'],
        },
        include: ['package.json', 'tsconfig.json'],
        exclude: ['node_modules'],
      },
      dts: { bundle: false },
      output: {
        distPath: { root: './dist/esm' },
        sourceMap: {
          js: 'inline-cheap-source-map',
        },
        filename: {
          js: '[name].js',
        },
      },
    },
    {
      bundle: false,
      format: 'cjs',
      source: {
        entry: {
          index: ['./src/**', '!./src/**/*.{md,json,txt}', '!./src/utilities', '!./src/types'],
        },
        include: ['package.json', 'tsconfig.json'],
        exclude: ['node_modules'],
      },
      dts: { bundle: false },
      output: {
        distPath: { root: './dist/cjs' },
        sourceMap: {
          js: 'inline-cheap-source-map',
        },
        filename: {
          js: '[name].js',
        },
      },
    },
  ],
  output: {
    cleanDistPath: true,
  },
  plugins: [pluginReact()],
})
