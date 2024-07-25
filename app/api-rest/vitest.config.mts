import { defineConfig } from 'vitest/config'

export default defineConfig({
    test: {
        globals: true,
        root: __dirname + '/tests',
        setupFiles: ['./vitest.setup.ts'],
    },
})