const baseURL = 'https://react-learnwords-example.herokuapp.com/';

type userType = {
  name: string;
  email: string;
  password: string;
};

export async function createUser(user: userType) {
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
