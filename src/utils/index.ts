import axios from "axios";

const url = 'https://strapi-store-server.onrender.com/api'

export const customFetch = axios.create({
    baseURL: url
});

export const formatPrice = (price: number | string) => {
    const newPrice = Intl.NumberFormat('en-us', {
        style: 'currency',
        currency: 'USD'
    }).format(Number(price)/100);
    return newPrice
}
