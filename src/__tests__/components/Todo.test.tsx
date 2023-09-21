import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Todo } from '@/components/Todo.tsx';
import { expect } from 'vitest';

describe('Todo', () => {
  test('should render with initial state', async () => {
    renderTodo('1');

    expect(await screen.findByText(/todo1/i)).toBeInTheDocument();
    expect(await screen.findByRole('button')).toBeInTheDocument();
  });
  test('should not be checked', async () => {
    renderTodo('1');

    expect(await screen.findByRole('checkbox')).not.toBeChecked();
  });
  test('should be checked', async () => {
    renderTodo('2');

    expect(await screen.findByRole('checkbox')).toBeChecked();
  });

  test('should toggle state to false', async () => {
    const user = userEvent.setup();
    renderTodo('2');

    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toBeChecked();

    await user.click(screen.getByRole('checkbox'));
    expect(await screen.findByRole('checkbox')).not.toBeChecked();
  });
  test('should toggle state to true', async () => {
    const user = userEvent.setup();
    renderTodo('1');

    expect(await screen.findByRole('checkbox')).toBeInTheDocument();

    await act(async () => {
      await user.click(await screen.findByRole('checkbox'));
    });

    expect(await screen.findByRole('checkbox')).toBeChecked();
  });
  test('should toggle state twice', async () => {
    const user = userEvent.setup();
    renderTodo('1');

    expect(await screen.findByRole('checkbox')).toBeInTheDocument();

    await act(async () => {
      await user.click(await screen.findByRole('checkbox'));
      await user.click(await screen.findByRole('checkbox'));
    });

    expect(await screen.findByRole('checkbox')).not.toBeChecked();
  });
  it('should not throw error if todo was not found', () => {
    renderTodo('random id');
    expect(screen.getByText(/wrong id/i)).toBeInTheDocument();
  });
});

const renderTodo = (id: string) => {
  return render(<Todo id={id} />);
};
