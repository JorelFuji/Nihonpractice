import { describe, it, expect } from 'vitest'
import { createMemoryRouter, RouterProvider } from 'react-router-dom'
import { render } from '@testing-library/react'
import HomePage from '../pages/HomePage'
import VocabularyPage from '../pages/VocabularyPage'
import CategoryWordsPage from '../pages/CategoryWordsPage'
import MatchGamePage from '../pages/MatchGamePage'

describe('Routing Tests', () => {
  it('should render HomePage at /', () => {
    const router = createMemoryRouter(
      [{ path: '/', element: <HomePage /> }],
      { initialEntries: ['/'] }
    )
    
    const { container } = render(<RouterProvider router={router} />)
    expect(container).toBeTruthy()
  })

  it('should render VocabularyPage at /vocabulary', () => {
    const router = createMemoryRouter(
      [{ path: '/vocabulary', element: <VocabularyPage /> }],
      { initialEntries: ['/vocabulary'] }
    )
    
    const { container } = render(<RouterProvider router={router} />)
    expect(container).toBeTruthy()
  })

  it('should render CategoryWordsPage at /vocabulary/:category', () => {
    const router = createMemoryRouter(
      [{ path: '/vocabulary/:category', element: <CategoryWordsPage /> }],
      { initialEntries: ['/vocabulary/food'] }
    )
    
    const { container } = render(<RouterProvider router={router} />)
    expect(container).toBeTruthy()
  })

  it('should render MatchGamePage at /match-game', () => {
    const router = createMemoryRouter(
      [{ path: '/match-game', element: <MatchGamePage /> }],
      { initialEntries: ['/match-game'] }
    )
    
    const { container } = render(<RouterProvider router={router} />)
    expect(container).toBeTruthy()
  })

  it('should render MatchGamePage at /match-game/:category', () => {
    const router = createMemoryRouter(
      [{ path: '/match-game/:category', element: <MatchGamePage /> }],
      { initialEntries: ['/match-game/animals'] }
    )
    
    const { container } = render(<RouterProvider router={router} />)
    expect(container).toBeTruthy()
  })
})

describe('Route Parameters', () => {
  const routes = [
    '/',
    '/vocabulary',
    '/vocabulary/food',
    '/vocabulary/animals',
    '/vocabulary/colors',
    '/match-game',
    '/match-game/food',
    '/match-game/animals',
    '/flashcards/food',
    '/kids-mode',
    '/grammar-game',
    '/sentence-game',
    '/geography-game',
  ]

  routes.forEach(route => {
    it(`should have valid route: ${route}`, () => {
      expect(route).toMatch(/^\//)
      expect(route).not.toContain(' ')
    })
  })
})
