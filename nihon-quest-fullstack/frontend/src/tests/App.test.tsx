import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import App from '../App'

describe('App', () => {
  it('renders without crashing', () => {
    render(<App />)
    expect(document.querySelector('body')).toBeTruthy()
  })

  it('contains router', () => {
    const { container } = render(<App />)
    expect(container.querySelector('div')).toBeTruthy()
  })
})
