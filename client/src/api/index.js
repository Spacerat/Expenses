import urljoin from 'url-join' 
let TOKEN = null;
let API_BASE = 'http://localhost:8000'
let AUTH_URL = '/get_token/'

function ApiError(data, message='Request Failed') {
  this.name = 'ApiError';
  this.message = message;
  this.data = data;
  this.stack = (new Error()).stack;
}
ApiError.prototype = Object.create(Error.prototype);
ApiError.prototype.constructor = ApiError;

function getToken(username, password) {
    const d = new FormData();
    d.append("username", username)
    d.append("password", password)
    const options = {method: "POST", body: d}
    return fetch(urljoin(API_BASE, AUTH_URL), options).then(response => {
        if (!response.ok) {
            return response.json().then(json=>{throw new ApiError(json, "Failed to log in")})
        }
        return response.json()
    })
}

export function login(username, password) {
    return getToken(username, password).then(({token}) => {
        TOKEN = token;
    })
}
