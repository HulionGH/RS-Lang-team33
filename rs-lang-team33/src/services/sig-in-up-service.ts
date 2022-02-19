import axios, { AxiosInstance } from 'axios';
import { useNavigate } from "react-router-dom";
import { baseURL } from '../constants';
import { IUserInfo, IUserSignUp } from '../interfaces';

let userInfo: IUserInfo | null = null;
let instance: AxiosInstance;

const setLocalStorage = (userInfo: IUserInfo) => {
  localStorage.setItem('userInfo', JSON.stringify(userInfo));
};

const getLocalStorage = () => {
  if (localStorage.getItem('userInfo')) {
    userInfo = JSON.parse(localStorage.getItem('userInfo') as string);
  }
};
getLocalStorage();

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

export async function getNewToken(userId: string, refreshToken: string) {
  const response = axios.get(`${baseURL}users/${userId}/tokens`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${refreshToken}`,
      'Content-Type': 'application/json',
    },
  });  
  return await response;
}

instance = axios.create({});

axios.interceptors.response.use(
  (response) => {
    console.log('axios return response');

    return response;
  },
  async (error) => {
    console.log('axios error');

    let originalConfig = error.config;
    if (error.response.status === 401) {
      console.log('401');
      console.log((userInfo as IUserInfo).userId);
      console.log((userInfo as IUserInfo).refreshToken);

      getNewToken(
        (userInfo as IUserInfo).userId,
        (userInfo as IUserInfo).refreshToken
      ).then((res) => {
        console.log(res);

        if (res && res.status === 200) {
          console.log('create newUser and setLocalStorage');
          console.log('create new Config');
  
          setLocalStorage({
            name: (userInfo as IUserInfo).name,
            email: (userInfo as IUserInfo).email,
            message: (userInfo as IUserInfo).message,
            token: res.data.token,
            refreshToken: res.data.refreshToken,
            userId: (userInfo as IUserInfo).userId,
          });
          originalConfig = {
            ...originalConfig,
            headers: {
              ...originalConfig.headers,
              Authorization: `Bearer ${userInfo?.token}`,
            },
          };
        }
        console.log('return instance(originalConfig)');
  
        return instance(originalConfig);
      }).catch(() => {
        localStorage.clear();
        let navigate = useNavigate();
        navigate("/sign-in")
      })
    }
    return Promise.reject(error);
  }
);
