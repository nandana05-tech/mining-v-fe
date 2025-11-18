import { getActiveRoute } from "../routes/url-parser";
import ACCESS_TOKEN_KEY from "../config";

export function getAccessToken() {
    try {
        const accessToken = localStorage.getItem(ACCESS_TOKEN_KEY);

        if(accessToken === null || accessToken === undefined) {
            return null;
        }

        return accessToken;
    } catch (error) {
        console.error(error);
        return null;
    }
}

export function putAccessToken(accessToken) {
    try {
        localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
        return true;
    } catch (error) {
        console.error(error);
        return false;
    }
}

export function removeAccessToken() {
    try {
        localStorage.removeItem(ACCESS_TOKEN_KEY);
        return true;
    } catch (error) {
        console.error(error);
        return false;
    }
}

const unauthenticatedRoutesOnly = [
    '/login',
    '/register',
];

export function checkAuthenticatedRouteOnly(page) {
    const url = getActiveRoute();
    const isLoggedIn = getAccessToken() !== null;

    if(unauthenticatedRoutesOnly.includes(url) && isLoggedIn) {
        location.hash = '/';
        return null;
    }

    return page;
}

export function checkAuthenticatedRoute(page) {
    const isLoggedIn = getAccessToken() !== null;
    console.log('isLoggedIn:', isLoggedIn);

    if(!isLoggedIn) {
        location.hash = '/login';
        return null;
    }

    return page;
}

export function getLogout() {
    removeAccessToken();
}