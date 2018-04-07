export const headers = {
  Accept: "application/json",
  "Content-Type": "application/json"
};

const makeServerRequest = (url, method = "GET", json = {}) => {
  const params = {
    method: method,
    headers: headers
  };

  if (method !== "GET") {
    params.body = JSON.stringify(json);
  }

  return fetch(url, params)
    .then(_handleErrors)
    .then(res => res.json())
    .catch(error => console.error(error));
};

function _handleErrors(response) {
  if (!response.ok) {
    throw Error(`${response.status}: ${response.statusText}`);
  }
  return response;
}

export default makeServerRequest;
