import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const useProducts = (sort, keyword, category, brand, priceValue, page, rowsPerPage) => {

    const axiosInstance = axios.create({
        baseURL: 'https://scic-job-task-backend.vercel.app'
    });

    const { data: products = { products: [], totalCount: 0 }, isLoading: loading, refetch } = useQuery({
        queryKey: ['products', sort, keyword, category, brand, priceValue, page, rowsPerPage],
        queryFn: async () => {
            const res = await axiosInstance.get('/products', {
                params: { sort, keyword, category, brand, priceValue, page, rowsPerPage }
            });
            return res.data;
        },
        keepPreviousData: true, 
    });

    return [products.products, products.totalCount, loading, refetch];
};

export default useProducts;
