import { createContext, useReducer } from 'react';

const DUMMY_EXPENSES = [
  {
    id: 'e1',
    description: 'A pair of shoes',
    amount: 59.99,
    date: new Date('2021-12-19'),
  },
  {
    id: 'e2',
    description: 'A pair of trousers',
    amount: 19.99,
    date: new Date('2022-01-22'),
  },
  {
    id: 'e3',
    description: 'Bananas',
    amount: 1.99,
    date: new Date('2021-12-1'),
  },
  {
    id: 'e4',
    description: 'Book',
    amount: 12.99,
    date: new Date('2022-02-19'),
  },
  {
    id: 'e5',
    description: 'Pen',
    amount: 0.99,
    date: new Date('2024-01-11'),
  },
];

export const ExpensesContext = createContext({
  expenses: [],
  addExpense: ({ description, amount, date }) => {},
  deleteExpense: (expenseId) => {},
  updateExpense: (expenseId, { description, amount, date }) => {},
});

function expensesReducer(state, action) {
  switch (action.type) {
    case 'add':
      const id = new Date().toString() + Math.random().toString();
      return [{ ...action.payload, id: id }, ...state];
    case 'update':
      const updatableExpenseIndex = state.findIndex(
        (expense) => expense.id === action.payload.id
      );
      const updatableExpense = state[updatableExpenseIndex];
      const updatedExpense = { ...updatableExpense, ...action.payload.data };
      const updatedExpenses = [...state];
      updatedExpenses[updatableExpenseIndex] = updatedExpense;
      return updatedExpenses;
    case 'delete':
      return state.filter((expense) => expense.id !== action.payload.id);
    default:
      return state;
  }
}

function ExpensesContextProvider({ children }) {
  const [expensesState, dispatch] = useReducer(expensesReducer, DUMMY_EXPENSES);

  function addExpense(expenseData) {
    dispatch({ type: 'add', payload: expenseData });
  }

  function deleteExpense(expenseId) {
    dispatch({ type: 'delete', payload: { id: expenseId } });
  }

  function updateExpense(expenseId, expenseData) {
    dispatch({ type: 'update', payload: { id: expenseId, data: expenseData } });
  }

  const value = {
    expenses: expensesState,
    addExpense: addExpense,
    deleteExpense: deleteExpense,
    updateExpense: updateExpense,
  };

  return (
    <ExpensesContext.Provider value={value}>
      {children}
    </ExpensesContext.Provider>
  );
}

export default ExpensesContextProvider;
