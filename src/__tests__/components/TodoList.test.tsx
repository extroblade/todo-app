import { act, render, screen } from "@testing-library/react";
import userEvent from '@testing-library/user-event';
import { expect } from "vitest";
import { TodoList } from '@/components/TodoList.tsx';

describe('TodoList', () => {
  beforeAll(() => {
    global.ResizeObserver = class ResizeObserver {
      observe() {
        // do nothing
      }
      unobserve() {
        // do nothing
      }
      disconnect() {
        // do nothing
      }
    };
  });

  it('should use mocked initial state ', async () => {
    renderTodos();

    expect(await screen.findByText(/todo2 completed/i)).toBeInTheDocument();
    expect(await screen.findByText(/todo1/i)).toBeInTheDocument();
  });
  test('should not be able to use form buttons without input value', async () => {
    renderTodos();

    expect(screen.getByRole('button', { name: 'Add todo' })).toBeDisabled();
    expect(screen.getByRole('button', { name: 'Clear input' })).toBeDisabled();
  });
  it('should not be able to submit form without input', async () => {
    const user = userEvent.setup();
    renderTodos();

    await act(async () => {
      await user.click(screen.getByPlaceholderText(/what needs to be done?/i));
      await user.keyboard('     ');
    });
    expect(screen.getByRole('button', { name: 'Add todo' })).toBeDisabled();
    expect(screen.getByRole('button', { name: 'Clear input' })).not.toBeDisabled();
  });
  it('should be able to submit form with input', async () => {
    const user = userEvent.setup();
    renderTodos();

    await act(async () => {
      await user.click(screen.getByPlaceholderText(/what needs to be done?/i));
      await user.keyboard('newest todo');
    });
    expect(screen.getByRole('button', { name: 'Add todo' })).not.toBeDisabled();
    expect(screen.getByRole('button', { name: 'Clear input' })).not.toBeDisabled();
  });
  it('should add todo on button', async () => {
    const user = userEvent.setup();
    renderTodos();

    await act(async () => {
      await user.click(screen.getByPlaceholderText(/what needs to be done?/i));
      await user.keyboard('newest todo');
      await user.click(screen.getByRole('button', { name: 'Add todo' }));
    });
    expect(await screen.findByText(/newest todo/i)).toBeInstanceOf(HTMLParagraphElement);
  });
  it('should add todo on enter', async () => {
    const user = userEvent.setup();
    renderTodos();

    await act(async () => {
      await user.type(
        screen.getByPlaceholderText(/what needs to be done?/i),
        'newest todo {enter}'
      );
    });

    expect(await screen.findByText(/newest todo/i)).toBeInstanceOf(HTMLParagraphElement);
  });
  it('should make all todos active', async () => {
    const user = userEvent.setup();
    renderTodos();

    await act(async () => {
      await user.click(screen.getByText(/clear completed/i));
    });
    await act(async () => {
      await user.click(screen.getByText(/continue/i));
    });

    expect(await screen.findByText(/4 active left/i)).toBeInTheDocument();
  });
  it('should delete all todos', async () => {
    const user = userEvent.setup();
    renderTodos();

    await act(async () => {
      await user.click(screen.getByText(/delete all/i));
    });

    expect(await screen.findByText(/nothing found/i)).toBeInTheDocument();
  });
  it('should delete completed todos', async () => {
    const user = userEvent.setup();
    renderTodos();
    const completedTodo = screen.getByText(/todo2 completed/i);

    await act(async () => {
      await user.click(screen.getByText(/delete completed/i));
    });

    expect(completedTodo).not.toBeInTheDocument();
  });
  it('should delete one todo', async () => {
    const user = userEvent.setup();
    renderTodos();

    await act(async () => {
      await user.click(screen.getByTestId('1'));
    });
    await act(async () => {
      await user.click(screen.getByText(/continue/i));
    });

    expect(await screen.findByText(/2 active left/i)).toBeInTheDocument();
  });
  it('should toggle todos\' state', async () => {
    const user = userEvent.setup();
    renderTodos();

    await act(async () => {
      await user.click(screen.getByText(/todo1/i));
    });

    expect(await screen.findByText(/2 active left/i)).toBeInTheDocument();
  });
});

const renderTodos = () => {
  return render(<TodoList />);
};
