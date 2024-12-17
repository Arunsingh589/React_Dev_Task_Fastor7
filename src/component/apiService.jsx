import axios from 'axios';
import api from './api';

export const registerUser = async (phone, dialCode) => {
    try {
        const response = await api.post('/pwa/user/register', {
            phone: phone,
            dial_code: dialCode,
        });
        console.log('Registration Response:', response.data);
    } catch (error) {
        console.error('Error during registration:', error.response?.data || error.message);
        throw error;
    }
};


export const loginUser = async (phone, otp, dialCode) => {
    try {
        const response = await api.post('/pwa/user/login', {
            phone,
            otp,
            dial_code: dialCode,
        });
        const token = response.data?.data?.token;
        console.log(response.data);
        console.log('Extracted Token:', token);

        return { userData: response.data.data, token };

    } catch (error) {
        console.error('Error during login:', error.response?.data || error.message);
        throw error;
    }
};


export const fetchRestaurants = async (cityId, token) => {
    try {
        const response = await axios.get(
            `https://staging.fastor.ai/v1/m/restaurant?city_id=${cityId}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        console.log('Fetched Restaurants:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error fetching restaurants:', error.response?.data || error.message);
        alert('Error fetching restaurants. Please try again later.');
        return [];
    }
};


