import { useContext, useEffect, useState } from 'react';

import ErrorOverlay from '../components/UI/ErrorOverlay';
import { ExpensesContext } from '../store/expenses-context';
import ExpensesOutput from '../components/ExpensesOutput/ExpensesOutput';
import LoadingOverlay from '../components/UI/LoadingOverlay';
import { fetchExpenses } from '../util/http';
import { getDateMinusDays } from '../util/date';

function RecentExpenses() {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState();

  const expensesCtx = useContext(ExpensesContext);

  useEffect(() => {
    async function getExpenses() {
      setIsLoading(true);
      try {
        const expenses = await fetchExpenses();
        expensesCtx.setExpenses(expenses);
      } catch (error) {
        setError(error.message);
      }
      setIsLoading(false);
    }

    getExpenses();
  }, [setIsLoading]);

  if (isLoading) return <LoadingOverlay />;
  if (error && !isLoading) return <ErrorOverlay message={error} />;

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
