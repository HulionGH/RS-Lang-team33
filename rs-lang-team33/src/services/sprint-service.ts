const baseURL = 'https://react-learnwords-example.herokuapp.com/';

export const ServiceDictionary = {
  async getWords(activePage: number, groupNum: number) {
    const params = {
      group: groupNum.toString(),
      page: activePage.toString(),
    };
    const queryParams = new URLSearchParams(params).toString();
    return fetch(`${baseURL}words?${queryParams}`).then((response) => {
      return response.json();
    });
  },
};