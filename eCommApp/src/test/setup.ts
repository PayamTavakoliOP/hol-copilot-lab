import '@testing-library/jest-dom'
import { beforeAll, afterAll } from 'vitest'

// Global test setup for all tests

// Suppress React Router future flag warnings in tests
const originalConsoleWarn = console.warn
beforeAll(() => {
  console.warn = (...args) => {
    if (
      typeof args[0] === 'string' &&
      args[0].includes('React Router Future Flag Warning')
    ) {
      return
    }
    originalConsoleWarn(...args)
  }
})

afterAll(() => {
  console.warn = originalConsoleWarn
})