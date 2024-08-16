import { useState } from "react";
import useProducts from "../hooks/useProducts";
import ProductCard from "../components/ProductCard";

const Home = () => {
    const [sort, setSort] = useState("");
    const [keyword, setKeyword] = useState("");
    const [category, setCategory] = useState("");
    const [products, loading, refetch] = useProducts(sort, keyword, category);

    return (
        <>
          {
            products.map(product => 
                <ProductCard
                key={product._id}
                product={product}/>
            )
          }
        </>
    );
};

export default Home;