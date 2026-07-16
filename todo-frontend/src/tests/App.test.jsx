import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { App } from '../App';

describe('App component', () => {
  beforeEach(() => {
    global.fetch = jest.fn((url, options = {}) => {
      const method = options.method || 'GET';

      if (method === 'GET') {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve([]),
        });
      }

      if (method === 'POST') {
        const body = JSON.parse(options.body);
        return Promise.resolve({
          ok: true,
          json: () =>
            Promise.resolve({
              id: 1,
              text: body.text,
              isDone: false,
            }),
        });
      }

      if (method === 'DELETE') {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve({}),
        });
      }

      if (method === 'PATCH') {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve({}),
        });
      }

      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve([]),
      });
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
    delete global.fetch;
  });

  test('добавляет новую задачу и отображает ее в списке', async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.type(screen.getByPlaceholderText(/введите задачу/i), 'Проверить тест');
    await user.click(screen.getByText(/добавить/i));

    expect(await screen.findByText('Проверить тест')).toBeInTheDocument();
    expect(screen.getByText(/задач:\s*1/i)).toBeInTheDocument();
  });

  test('удаляет задачу при клике', async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.type(screen.getByPlaceholderText(/введите задачу/i), 'Удалить задачу');
    await user.click(screen.getByText(/добавить/i));

    expect(await screen.findByText('Удалить задачу')).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: /удалить/i }));

    await waitFor(() => {
      expect(screen.queryByText('Удалить задачу')).not.toBeInTheDocument();
    });
  });
});