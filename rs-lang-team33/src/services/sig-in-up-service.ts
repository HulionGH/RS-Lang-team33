const baseURL = 'https://react-learnwords-example.herokuapp.com/doc/';

export async function getWords() {
  const response = await fetch(`${baseURL}words?page=2&group=0`);

  return await response.json();
}