import axios from 'axios';
import React from 'react';
import useAuth from './useAuth';
import { getIdToken } from 'firebase/auth';


const axiosSecure = axios.create({
    baseURL: `https://collab-study-platform-a12-server.vercel.app`
});

const useAxiosSecure = () => {
    const { user } = useAuth();

    axiosSecure.interceptors.request.use(async config => {
        if (user) {
            const token = await getIdToken(user);
            config.headers.authorization = `Bearer ${token}`;
        } return config;
    }, error => {
        return Promise.reject(error);
    });
    return axiosSecure;
};

export default useAxiosSecure;