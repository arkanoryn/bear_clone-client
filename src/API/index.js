import fetch from 'isomorphic-fetch';

const API_HOST = process.env.REACT_APP_API_HOST_URL;

function headers() {
  return {
    Accept: 'application/json',
    'Content-Type': 'application/json',
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
  const query = Object.keys(params)
                      .map((k) => `${encodeURIComponent(k)}=${encodeURIComponent(params[k])}`)
                      .join('&');
  return `${query.length ? '?' : ''}${query}`;
}

const API = {
  fetch(url, params = {}) {
    return fetch(`${API_HOST}${url}${queryString(params)}`, {
      method: 'GET',
      headers: headers(),
    })
      .then(parseResponse);
  },
}

export default API;
