import { baseURL } from '../constants';
import { IWordType } from '../interfaces';

export async function getWords(activePage: number, groupNum: number) {
  const response = await fetch(`${baseURL}words?group=${groupNum}&page=${activePage}`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
  });
  if (!response.ok) {
    throw new Error(`${response.status}`);
  }
  return await response.json();
};

export async function changeWord(userId: string, wordId: string, wordInfo: IWordType, token: string) {
  const response = await fetch(`${baseURL}users/${userId}/words/${wordId}`, {
    method: 'PUT',
    headers: {
      'Accept': 'application/json',
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(wordInfo),
  });
  if (!response.ok) {
    throw new Error(`${response.status}`);
  }
  return await response.json();
}; 

export async function getWord(userId: string, wordId: string, token: string) {
  const response = await fetch(`${baseURL}users/${userId}/words/${wordId}`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });
  if (!response.ok) {
    throw new Error(`${response.status}`);
  }
  return await response.json();
}

export async function setWord(userId: string, wordId: string, wordInfo: IWordType, token: string) {
  const response = await fetch(`${baseURL}users/${userId}/words/${wordId}`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(wordInfo),
  });
  if (!response.ok) {
    throw new Error(`${response.status}`);
  }
  return await response.json();
};

export async function getUserWords(userId: string,token: string) {
  const response = await fetch(`${baseURL}users/${userId}/words/`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });
  return await response.json();
};