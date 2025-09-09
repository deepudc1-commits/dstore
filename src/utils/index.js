import axios from "axios";

const url = 'https://strapi-store-server.onrender.com/api'

export const customFetch = axios.create({
    baseURL: url
});

export const formatPrice = (price) => {
    const newPrice = Intl.NumberFormat('en-us', {
        style: 'currency',
        currency: 'USD'
    }).format(price/100);
    return newPrice
}