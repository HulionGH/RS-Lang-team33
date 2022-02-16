import { baseURL } from '../constants';
import { IUserSignUp } from '../interfaces';

export async function createUser(user: IUserSignUp) {
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

export async function loginUser(user: IUserSignUp) {
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

export async function getNewToken(userId: string, refreshToken: string) {
  const response = await fetch(`${baseURL}users/${userId}`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Authorization': `Bearer ${refreshToken}`,
      'Content-Type': 'application/json'
    },
  });

  console.log(response);
  
  // if (!response.ok) {
  //   throw new Error(`${response.status}`);
  // }
  // return await response.json();
};

// getNewToken('620406068f8399001540f9cb', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyMDQwNjA2OGY4Mzk5MDAxNTQwZjljYiIsInRva2VuSWQiOiJiYjQ0ODQ0Mi0xMGE5LTQzNDAtYmUwYi1jY2RhN2MwZGMzMTYiLCJpYXQiOjE2NDQ4NDA4MjcsImV4cCI6MTY0NDg1NzAyN30.sYcL0YT_HcIJi76pLJ42ej0BhgomIwnqDZTgbe_d0ZU')