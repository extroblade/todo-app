import * as zustand from 'zustand';
import { act } from '@testing-library/react';
import { iTodo } from '../src/types';
const { create: actualCreate, createStore: actualCreateStore } =
  await vi.importActual<typeof zustand>('zustand');

const initialTodos: iTodo[] = [
  {
    id: '1',
    value: 'todo1 active',
    completed: false,
    created: 0,
  },
  {
    id: '2',
    value: 'todo2 completed',
    completed: true,
    created: 1,
  },
  {
    id: '3',
    value: 'todo3 active',
    completed: false,
    created: 2,
  },
  {
    id: '4',
    value: 'todo4 active',
    completed: false,
    created: 3,
  },
];

export const storeResetFns = new Set<() => void>();

export const create = (<T>() => {
  return (stateCreator: zustand.StateCreator<T>) => {
    const store = actualCreate(stateCreator);
    const initialState = { ...store.getState(), todos: initialTodos };
    storeResetFns.add(() => {
      store.setState(initialState, true);
    });
    return store;
  };
}) as typeof zustand.create;

export const createStore = (<T>(stateCreator: zustand.StateCreator<T>) => {
  const store = actualCreateStore(stateCreator);
  const initialState = { ...store.getState(), todos: initialTodos };
  storeResetFns.add(() => {
    store.setState(initialState, true);
  });
  return store;
}) as typeof zustand.createStore;

beforeEach(() => {
  act(() => {
    storeResetFns.forEach((resetFn) => {
      resetFn();
    });
  });
});
afterEach(() => {
  act(() => {
    storeResetFns.forEach((resetFn) => {
      resetFn();
    });
  });
});
