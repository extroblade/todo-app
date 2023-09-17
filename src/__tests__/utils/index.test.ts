import { describe, test, it, expect } from 'vitest';
import { active, completed, switchTodoState } from '@/utils/todos.ts';
import { iTodo } from '@/types';

const initialTodos: iTodo[] = [
  {
    id: '1',
    value: 'todo1',
    completed: false,
    created: 0,
  },
  {
    id: '2',
    value: 'todo2',
    completed: true,
    created: 1,
  },
  {
    id: '3',
    value: 'todo3',
    completed: false,
    created: 2,
  },
  {
    id: '4',
    value: 'todo3',
    completed: false,
    created: 3,
  },
];

describe('Todo utils', () => {
  test('completed todos', () => {
    expect(completed(initialTodos).length).toBe(1);
  });
  test('active todos', () => {
    expect(active(initialTodos).length).toBe(3);
  });
  it("should toggle todos' state", () => {
    const newTodos = switchTodoState(initialTodos, '1');
    if (!newTodos) {
      return;
    }
    expect(active(newTodos).length).toBe(2);
    expect(completed(newTodos).length).toBe(2);
  });
  test('toggle should not broke up on empty array', () => {
    const newTodos = switchTodoState(initialTodos, 'random id');
    if (!newTodos) {
      expect(newTodos).toBeUndefined();
    }
  });
  it('should not broke up on empty array', () => {
    expect(active([]).length).toBe(0);
    expect(completed([]).length).toBe(0);
  });
});
