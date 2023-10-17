import swc from 'unplugin-swc'
import { configDefaults, defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    include: ['**/*.e2e-spec.ts'],
    globals: true,
    root: './',
    setupFiles: './test/setup-e2e.ts',
    exclude: [...configDefaults.exclude, './data'],
  },
  plugins: [
    swc.vite({
      module: { type: 'es6' },
    }),
  ],
})
