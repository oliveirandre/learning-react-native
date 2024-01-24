import axios from 'axios';

const url = 'https://expensetracker-rn-be291-default-rtdb.firebaseio.com/';

export async function storeExpense(expenseData) {
  const response = await axios.post(url + 'expenses.json', expenseData);

  return response.data.name;
}

export async function fetchExpenses() {
  const response = await axios.get(url + 'expenses.json');

  const expenses = [];
  for (const key in response.data) {
    expenses.push({
      id: key,
      amount: response.data[key].amount,
      date: new Date(response.data[key].date),
      description: response.data[key].description,
    });
  }

  return expenses;
}

export function updateExpense(expenseId, expenseData) {
  return axios.put(url + `expenses/${expenseId}.json`, expenseData);
}

export function deleteExpense(expenseId) {
  return axios.delete(url + `expenses/${expenseId}.json`);
}
