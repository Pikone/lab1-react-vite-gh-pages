import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { expect, test, vi } from 'vitest';
import Table from './Table';

// Мокаем fetch
const mockAlbums = [
  { userId: 1, id: 1, title: "quidem molestiae enim" },
  { userId: 1, id: 2, title: "sunt qui excepturi placeat culpa" },
];

vi.mock('node-fetch'); // не обязателен, если используешь глобальный fetch
global.fetch = vi.fn();

test('loads and displays first album title', async () => {
  (global.fetch as any).mockResolvedValue({
    ok: true,
    json: async () => mockAlbums,
  });

  render(<Table />);

  // Нажимаем кнопку
  fireEvent.click(screen.getByText(/Load Albums/i));

  // Ждём, пока появится ожидаемый текст из первой строки
  await waitFor(() => {
    expect(screen.getByText(/quidem molestiae enim/)).toBeInTheDocument();
  });

  // Проверяем, что fetch был вызван
  expect(global.fetch).toHaveBeenCalledWith('https://jsonplaceholder.typicode.com/albums');
});
