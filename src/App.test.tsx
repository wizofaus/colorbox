import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders expected elements', () => {
  render(<App />);
  const linkElement = screen.getByText(/A colorbox at 128/i);
  expect(linkElement).toBeInTheDocument();
  const canvasElements = document.getElementsByTagName("canvas")
  expect(canvasElements).toHaveLength(3);
});
