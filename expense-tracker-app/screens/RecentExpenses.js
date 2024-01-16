import { ExpensesContext } from '../store/expenses-context';
import ExpensesOutput from '../components/ExpensesOutput/ExpensesOutput';
import { getDateMinusDays } from '../util/date';
import { useContext } from 'react';

function RecentExpenses() {
  const expensesCtx = useContext(ExpensesContext);
  const recentExpenses = expensesCtx.expenses.filter((expense) => {
    const today = new Date();
    const date7DaysAgo = getDateMinusDays(today, 7);

    return expense.date >= date7DaysAgo && expense.date <= today;
  });

  return (
    <ExpensesOutput
      period='last 7 days'
      expenses={recentExpenses}
      fallbackText='No recent expenses.'
    />
  );
}

export default RecentExpenses;
