import { baseURL } from '../constants';

export type userSignUp = {
  name?: string,
  email: string,
  password: string,
};

export async function createUser(user: userSignUp) {
  const response = await fetch(`${baseURL}users`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
  });
  if (!response.ok) {
    throw new Error(`${response.status}`);
  }
  return await response.json();
}

export async function loginUser(user: userSignUp) {
  const response = await fetch(`${baseURL}signin`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(user)
  });
  if (!response.ok) {
    throw new Error(`${response.status}`);
  }
  return await response.json();
};