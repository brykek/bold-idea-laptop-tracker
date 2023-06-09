import Cookies from 'js-cookie';

export function convertOptionstoListHelper(data) {
    const options = data.map(item => item.options);
    return options;
}

export function formatHeader(str) {
    return str.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
}

export function loggedIn() {
    if (sessionStorage.getItem('user')) {
        return true;
    }
    return false;
}

export const ProtectedComponent = ({ children }) => {
    if (!loggedIn()) {
        return <></>
    }
    return children;
}

export const bearerTokenConfig = {
    headers: { Authorization: `Bearer ${Cookies.get('token')}` }
}
