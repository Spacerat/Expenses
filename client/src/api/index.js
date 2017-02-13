import urljoin from 'url-join'
import Swagger from 'swagger-client'

import spec from './swagger'

let TOKEN = null;
let API_HOST = 'localhost:8000'
let API_BASE = urljoin('http://', API_HOST)
let AUTH_URL = '/get_token/'

const client = new Swagger({
	spec: spec,
	usePromise: true,
	basePath: API_BASE,
    responseInterceptor: {
        apply: function(data) {
            data.data = JSON.parse(data.data)
            return data
        }
    }
}).then((client)=>{
	client.setHost(API_HOST)
    return client;
})

function ApiError(data, message='Request Failed') {
  this.name = 'ApiError';
  this.message = message;
  this.data = data;
  this.stack = (new Error()).stack;
}
ApiError.prototype = Object.create(Error.prototype);
ApiError.prototype.constructor = ApiError;


function setToken(token) {
    window.localStorage.setItem('token', token)
    TOKEN = token;
    const auth = new Swagger.ApiKeyAuthorization("Authorization",`Token ${token}`,"header")
    return client.then((client)=>{
        console.log("set token", token)
        client.clientAuthorizations.add("token_auth", auth)
        return client
    })
}

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
        return setToken(token)
    })
}

export function loadAuth() {
    const token = window.localStorage.getItem('token')
    if (token) {
    	setToken(token)
        return true;
    }
    return false;
}

export function logout() {
    window.localStorage.removeItem('token')
    window.localStorage.removeItem('username')
    TOKEN = null;
    client.then((client)=>client.clientAuthorizations.remove("token_auth"))
}

export default client
