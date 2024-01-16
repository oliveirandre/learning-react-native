import { ExpensesContext } from '../store/expenses-context';
import ExpensesOutput from '../components/ExpensesOutput/ExpensesOutput';
import { useContext } from 'react';

function AllExpenses() {
  const expensesCtx = useContext(ExpensesContext);
  return (
    <ExpensesOutput
      period='total'
      expenses={expensesCtx.expenses}
      fallbackText='No expenses.'
    />
  );
}

export default AllExpenses;
