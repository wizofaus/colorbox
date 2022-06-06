import React from 'react';
import { render, screen, waitFor, waitForElementToBeRemoved } from '@testing-library/react';
import App from './App';

const checkAllColorsUnique = (data: Uint8ClampedArray) => {
  let colorSet = new Set<number>([...Array(data.length / 4)].map((_, i) =>
    data[i * 4] + (data[i * 4 + 1] << 8) + (data[i * 4 + 2] << 16)))
  expect(colorSet.size).toEqual(32 * 32 * 32)
}

test('renders expected elements', () => {
  render(<App />);
  const linkElement = screen.getByText(/A colorbox at 128/i);
  expect(linkElement).toBeInTheDocument();
  const canvasElements = document.getElementsByTagName("canvas")
  expect(canvasElements).toHaveLength(3);
  let context = canvasElements.item(0)!.getContext('2d')
  let data = context!.getImageData(0, 0, context!.canvas.width, context!.canvas.height)!.data
  checkAllColorsUnique(data)
});
