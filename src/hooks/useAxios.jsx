import React from 'react';
import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: `https://collab-study-platform-a12-server.vercel.app`
})

const useAxios = () => {
    return axiosInstance;
};

export default useAxios;