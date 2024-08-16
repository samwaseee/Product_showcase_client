import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const useProducts = (sort, keyword, category, brand, priceValue) => {

    const axiosInstence = axios.create({
        baseURL: 'http://localhost:5000'
    })

    const { data: products = [], isLoading: loading, refetch } = useQuery({
        queryKey: ['products', sort, keyword, category, brand, priceValue],
        queryFn: async () => {
            const res = await axiosInstence.get('/products', {
                params: { sort, keyword, category, brand, priceValue }
            });
            return res.data;
        }
    })

    return [products, loading, refetch]
};

export default useProducts;