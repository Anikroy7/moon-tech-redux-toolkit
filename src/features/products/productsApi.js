import axios from "../../utils/axios.config"

export const fetchProducts = async () => {
    const data = await axios.get('/products');
    return data.data.data
}


export const postProduct = async (product) => {
    const result = await axios.post('/product', product);
    return result;
}

export const deleteProduct = async (id) => {
    const result = await axios.delete(`/product/${id}`);
    return result;
}