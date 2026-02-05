import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { ErrorBoundary } from './ErrorBoundary'

const ThrowError = () => {
  throw new Error('Test error')
}

describe('ErrorBoundary', () => {
  beforeEach(() => {
    vi.spyOn(console, 'error').mockImplementation(() => {})
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('should render children when there is no error', () => {
    render(
      <ErrorBoundary>
        <div>Test content</div>
      </ErrorBoundary>
    )

    expect(screen.getByText('Test content')).toBeInTheDocument()
  })

  it('should render error UI when there is an error', () => {
    render(
      <ErrorBoundary>
        <ThrowError />
      </ErrorBoundary>
    )

    expect(screen.getByText(/Oops! Something went wrong/i)).toBeInTheDocument()
    expect(screen.getByText(/Please try refreshing the page/i)).toBeInTheDocument()
  })

  it('should render custom fallback when provided', () => {
    const customFallback = <div>Custom error message</div>

    render(
      <ErrorBoundary fallback={customFallback}>
        <ThrowError />
      </ErrorBoundary>
    )

    expect(screen.getByText('Custom error message')).toBeInTheDocument()
  })

  it('should show error details', () => {
    render(
      <ErrorBoundary>
        <ThrowError />
      </ErrorBoundary>
    )

    expect(screen.getByText('Error details')).toBeInTheDocument()
  })
})
