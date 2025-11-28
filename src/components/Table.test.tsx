// src/components/Table.test.tsx
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { expect, test, vi } from 'vitest';
import Table from './Table';

const mockAlbums = [
  { userId: 1, id: 1, title: "quidem molestiae enim" },
  { userId: 1, id: 2, title: "sunt qui excepturi placeat culpa" },
];

// Мокаем fetch в браузерном окружении
window.fetch = vi.fn();

test('loads and displays first album title', async () => {
  (window.fetch as any).mockResolvedValue({
    ok: true,
    json: async () => mockAlbums,
  });

  render(<Table />);

  fireEvent.click(screen.getByText(/Load Albums/i));

  await waitFor(() => {
    expect(screen.getByText(/quidem molestiae enim/)).toBeInTheDocument();
  });

  expect(window.fetch).toHaveBeenCalledWith('https://jsonplaceholder.typicode.com/albums');
});
