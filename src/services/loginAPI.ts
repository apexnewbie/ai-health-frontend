import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080';

export const register = async (userData: { username: string; password: string; email: string }) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/auth/register`, userData);
        return response.data;
    } catch (error) {
        console.error('Error during registration:', error);
        throw error;
    }
};

export const login = async (credentials: { username: string; password: string }) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/auth/login`, credentials);
        return response.data;
    } catch (error) {
        console.error('Error during login:', error);
        throw error;
    }
};