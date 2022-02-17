import axios from 'axios';
import { baseURL } from '../constants';
import { IWordType } from '../interfaces';

export async function getWords(activePage: number, groupNum: number) {
  return await axios.get(
    `${baseURL}words?group=${groupNum}&page=${activePage}`,
    {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    }
  );
}

export async function changeWord(
  userId: string,
  wordId: string,
  wordInfo: IWordType,
  token: string
) {
  const response = axios.put(
    `${baseURL}users/${userId}/words/${wordId}`,
    wordInfo,
    {
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    }
  );
  return await response;
}

export async function getWord(userId: string, wordId: string, token: string) {
  const response = axios.get(`${baseURL}users/${userId}/words/${wordId}`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    })
  return await response;
}

export async function setWord(
  userId: string,
  wordId: string,
  wordInfo: IWordType,
  token: string
) {
  const response = axios.post(
    `${baseURL}users/${userId}/words/${wordId}`,
    wordInfo,
    {
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    }
  );
  return await response;
}

export async function getUserWords(userId: string, token: string) {
  return axios.get(`${baseURL}users/${userId}/words/`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });
}
