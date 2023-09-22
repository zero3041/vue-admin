import bearer from 'vue-auth';
import axios from 'axios';
import router from '../router/index';

const config = {
    auth: bearer,
    http: axios,
    router: router,
    tokenDefaultName: 'auth-token',
    tokenStore: ['cookie'],
    notFoundRedirect: {
        path: '/home'
    },
    registerData: {
        url: '/api/auth/register',
        method: 'POST',
        redirect: null,
    },
    loginData: {
        url: '/api/auth/login',
        method: 'POST',
        redirect: '/home',
        fetchUser: true,
    },
    logoutData: {
        url: '/api/auth/logout',
        method: 'POST',
        redirect: '/login',
        makeRequest: true
    },
    fetchData: {
        url: '/api/auth/user',  
        method: 'GET',
        enabled: true
    },
    parseUserData (data) {
        return data || {}
    },
};

export default config;
