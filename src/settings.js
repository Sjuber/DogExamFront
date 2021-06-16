
import loginWithUser, { getToken, loggedIn } from './apifacade.js';

export let MAINURL = 'http://localhost:8080/jpareststarter';
export const URLDOGCRET = 'http://localhost:8080/jpareststarter/api/dogs/createDog';
export const URLDOGDELET = 'http://localhost:8080/jpareststarter/api/dogs/deleteDog';
export const URLDOGDEWAK = 'http://localhost:8080/jpareststarter/api/dogs/getwalkers';



export const makeOptions = (method, addToken, body) => {
    var opts = {
        method: method,
        headers: {
            "Content-type": "application/json",
            'Accept': 'application/json',
        }
    }
    if (addToken && loginWithUser.loggedIn()) {
        opts.headers["x-access-token"] = loginWithUser.getToken();
    }
    if (body) {
        opts.body = JSON.stringify(body);
    }
    return opts;
}
