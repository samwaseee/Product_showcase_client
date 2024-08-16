import { useState } from "react";
import useProducts from "../hooks/useProducts";
import ProductCard from "../components/ProductCard";
import { CiFilter } from "react-icons/ci";
import { Box, Button, Drawer, Slider, Typography } from "@mui/material";

const Home = () => {
  const [sort, setSort] = useState("");
  const [keyword, setKeyword] = useState("");
  const [category, setCategory] = useState("");
  const [brand, setBrand] = useState("");
  const [priceValue, setPriceValue] = useState([100, 1500]);
  const [products, loading, refetch] = useProducts(sort, keyword, category, brand, priceValue);

  const [open, setOpen] = useState(false);

  const handleSort = (e) => {
    setSort(e.target.value);
    refetch();
  }

  const handleBrand = (e) => {
    setBrand(e.target.value);
    refetch();
  }

  const handleCategory = (e) => {
    setCategory(e.target.value);
    refetch();
  }

  const handleSearch = (e) => {
    e.preventDefault();
    const form = e.target;
    const searchInput = form.search.value;

    setKeyword(searchInput)
    refetch();
  }

  const handleChange = (event, newValue) => {
    setPriceValue(newValue);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <form onSubmit={handleSearch} className="flex flex-1 m-3">
        <input type="text" name="search" placeholder="Search" className="input input-bordered w-full max-w-xl" />
        <button className="btn btn-ghost">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
        </button>
      </form>
      <div className="m-3 flex justify-between">
        <div>
          <Button variant="contained" onClick={handleOpen}>
            <CiFilter size={30} />
          </Button>
          <Drawer anchor="left" open={open} onClose={handleClose}>
            {/* Your form content goes here */}
            <div className="grid p-2">
              {/* Add your form fields (Brand Name, Category Name, Price Range) */}
              <Box sx={{ width: 200 }}>
                <div className="text-xl font-medium text-black flex items-center"> Cost Range Filter </div>
                <Slider
                  value={priceValue}
                  onChange={handleChange}
                  valueLabelDisplay="auto"
                  getAriaLabel={() => 'Price range'}
                  min={100}
                  max={1500}
                  sx={{ color: '#B99D75' }}
                />
                <div> ${priceValue[0]} - ${priceValue[1]}</div>
              </Box>

              <select className="select select-bordered"
                value={brand}
                onChange={handleBrand}>
                <option value="" disabled>Brand</option>
                <option value="Apple">Apple</option>
                <option value="Samsung">Samsung</option>
                <option value="Oppo">Oppo</option>
              </select>

              <select className="select select-bordered max-w-xs"
                value={category}
                onChange={handleCategory}>
                <option value="" disabled>Type</option>
                <option value="Smartphone">Smartphone</option>
                <option value="Smartwatch">SmartWatch</option>
              </select>
            </div>
          </Drawer>
        </div>

        <select className="select select-bordered max-w-xs"
          value={sort}
          onChange={handleSort}>
          <option value="" disabled>Sort</option>
          <option value="highToLow">Price: High to Low</option>
          <option value="lowToHigh">Price: Low to High</option>
          <option value="newestFirst">Newest First</option>
        </select>
      </div>
      <div className="flex flex-wrap gap-3 mb-10">
        {
          products.map(product =>
            <ProductCard
              key={product._id}
              product={product} />
          )
        }
      </div>
    </>
  );
};

export default Home;