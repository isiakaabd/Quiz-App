import { render, screen } from '@testing-library/react'
import App from './App'

test('renders learn react link', () => {
  render(<App />)
  const linkElement = screen.getByText(/Let's get Started/i)
  expect(linkElement).toBeInTheDocument()
})
