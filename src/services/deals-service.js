import { setTimeout } from 'core-js';
const cachedData = require('../../fake-data.json');

export default {
  // Returns the preloaded data as a promise much like an API request, with a delay as well
  getDeals: () => {
    const fakeResponse = {
      data: cachedData
    };

    return new Promise((resolve) => {
      setTimeout(resolve, 2000, fakeResponse);
    });
  }
};
