import axios from 'axios';

const API_KEY = 'AIzaSyC7VaXqyFGXaxduz2w6-uwGkbLzAo_xKL4';

export async function authenticate(mode, email, password) {
  const url = `https://identitytoolkit.googleapis.com/v1/accounts:${mode}?key=${API_KEY}`;

  const response = await axios.post(url, {
    email,
    password,
    returnSecureToken: true,
  });

  return response.data.idToken;
}

export function CreateUser(email, password) {
  return authenticate('signUp', email, password);
}

export function loginUser(email, password) {
  return authenticate('signInWithPassword', email, password);
}
