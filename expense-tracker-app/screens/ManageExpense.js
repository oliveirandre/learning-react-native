import { StyleSheet, View } from 'react-native';
import { deleteExpense, storeExpense, updateExpense } from '../util/http';
import { useContext, useLayoutEffect, useState } from 'react';

import ErrorOverlay from '../components/UI/ErrorOverlay';
import ExpenseForm from '../components/ManageExpense/ExpenseForm';
import { ExpensesContext } from '../store/expenses-context';
import { GlobalStyles } from '../constants/styles';
import IconButton from '../components/UI/IconButton';
import LoadingOverlay from '../components/UI/LoadingOverlay';

function ManageExpenses({ route, navigation }) {
  const [isSendingRequest, setIsSendingRequest] = useState(false);
  const [error, setError] = useState();

  const expensesCtx = useContext(ExpensesContext);

  const expenseId = route.params?.expenseId;
  const isEditing = !!expenseId; // true if expenseId exists

  const selectedExpense = expensesCtx.expenses.find(
    (expense) => expense.id === expenseId
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? 'Edit Expense' : 'Add Expense',
    });
  }, [navigation, isEditing]);

  async function deleteExpenseHandler() {
    setIsSendingRequest(true);

    try {
      await deleteExpense(expenseId);
      expensesCtx.deleteExpense(expenseId);
      navigation.goBack();
    } catch (error) {
      setError('Could not delete expense.');
      setIsSendingRequest(false);
    }
  }

  function cancelHandler() {
    navigation.goBack();
  }

  async function confirmHandler(expenseData) {
    setIsSendingRequest(true);

    try {
      if (isEditing) {
        expensesCtx.updateExpense(expenseId, expenseData);
        await updateExpense(expenseId, expenseData);
      } else {
        const expenseId = await storeExpense(expenseData);
        expensesCtx.addExpense({ ...expenseData, id: expenseId }); // store firebase generated id into context
      }
      navigation.goBack();
    } catch (error) {
      setError('Could not add expense.');
      setIsSendingRequest(false);
    }
  }

  if (isSendingRequest) return <LoadingOverlay />;
  if (error && !isSendingRequest) return <ErrorOverlay message={error} />;

  return (
    <View style={styles.container}>
      <ExpenseForm
        submitButtonLabel={isEditing ? 'Update' : 'Add'}
        onCancel={cancelHandler}
        onSubmit={confirmHandler}
        defaultValues={selectedExpense}
      />
      {isEditing && (
        <View style={styles.deleteContainer}>
          <IconButton
            icon='trash'
            color={GlobalStyles.colors.error500}
            size={36}
            onPress={deleteExpenseHandler}
          />
        </View>
      )}
    </View>
  );
}

export default ManageExpenses;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: GlobalStyles.colors.primary800,
  },
  deleteContainer: {
    marginTop: 16,
    paddingTop: 8,
    borderTopWidth: 2,
    borderTopColor: GlobalStyles.colors.primary200,
    alignItems: 'center',
  },
});
