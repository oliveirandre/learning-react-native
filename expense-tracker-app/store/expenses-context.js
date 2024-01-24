import { createContext, useReducer } from 'react';

export const ExpensesContext = createContext({
  expenses: [],
  addExpense: ({ description, amount, date }) => {},
  setExpenses: (expenses) => {},
  deleteExpense: (expenseId) => {},
  updateExpense: (expenseId, { description, amount, date }) => {},
});

function expensesReducer(state, action) {
  switch (action.type) {
    case 'add':
      return [action.payload, ...state];
    case 'set':
      const invertedArray = action.payload.reverse();
      return invertedArray;
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
  const [expensesState, dispatch] = useReducer(expensesReducer, []);

  function addExpense(expenseData) {
    dispatch({ type: 'add', payload: expenseData });
  }

  function setExpenses(expenses) {
    dispatch({ type: 'set', payload: expenses });
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
    setExpenses: setExpenses,
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
