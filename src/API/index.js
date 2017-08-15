// @flow
import fetch from 'isomorphic-fetch';

const API_HOST:string = process.env.REACT_APP_API_HOST_URL;

function headers() {
  const token = JSON.parse(localStorage.getItem('token'));

  return {
    Accept:         'application/json',
    'Content-Type': 'application/json',
    Authorization:  `Bearer: ${token}`,
  };
}

function parseResponse(response) {
  return response.json().then((json) => {
    if (!response.ok) {
      return Promise.reject(json);
    }
    return json;
  });
}

function queryString(params) {
  const query =
    Object
      .keys(params)
      .map((k) => { return (`${encodeURIComponent(k)}=${encodeURIComponent(params[k])}`); })
      .join('&');
  return `${query.length ? '?' : ''}${query}`;
}

const API = {
  fetch(url, params = {}) {
    return fetch(`${API_HOST}${url}${queryString(params)}`, {
      method:  'GET',
      headers: headers(),
    })
      .then(parseResponse);
  },
  post(url, data) {
    const body = JSON.stringify(data);

    return fetch(`${API_HOST}${url}`, {
      method:  'POST',
      headers: headers(),
      body,
    })
      .then(parseResponse);
  },
};

export default API;
