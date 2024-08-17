import * as React from 'react';
import { useState } from "react";
import useProducts from "../hooks/useProducts";
import ProductCard from "../components/ProductCard";
import { CiFilter } from "react-icons/ci";
import { Box, Button, Drawer, Slider, TablePagination } from "@mui/material";
import Footer from '../components/Footer';

const Home = () => {
  const [sort, setSort] = useState("");
  const [keyword, setKeyword] = useState("");
  const [category, setCategory] = useState("");
  const [brand, setBrand] = useState("");
  const [priceValue, setPriceValue] = useState([100, 1500]);
  const [open, setOpen] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const [products, totalCount, loading, refetch] = useProducts(sort, keyword, category, brand, priceValue, page, rowsPerPage);


  const SkeletonComponent = () => (
    <div className="flex w-52 flex-col gap-4">
      <div className="skeleton h-32 w-full"></div>
      <div className="skeleton h-4 w-28"></div>
      <div className="skeleton h-4 w-full"></div>
      <div className="skeleton h-4 w-full"></div>
    </div>
  );

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  React.useEffect(() => {
    refetch();
  }, [page, rowsPerPage, sort, keyword, category, brand, priceValue, refetch]);

  const handleSort = (e) => {
    setSort(e.target.value);
  }

  const handleBrand = (e) => {
    setBrand(e.target.value);
  }

  const handleCategory = (e) => {
    setCategory(e.target.value);
  }

  const handleSearch = (e) => {
    e.preventDefault();
    const form = e.target;
    const searchInput = form.search.value;

    setKeyword(searchInput)
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
            <Box sx={{ width: 250, padding: "20px", display: "grid" ,margin: "auto", gap: "30px"}}>
              <div>
                <div className="text-xl font-medium text-black flex items-center">Cost Range Filter</div>
                <Slider
                  value={priceValue}
                  onChange={handleChange}
                  valueLabelDisplay="auto"
                  getAriaLabel={() => 'Price range'}
                  min={100}
                  max={1500}
                />
                <div> ${priceValue[0]} - ${priceValue[1]}</div>
              </div>

              <p style={{fontWeight: "600"}}>Other filters</p>

              <select className="select select-bordered" style={{backgroundColor: "white", border: "2px solid black"}} value={brand} onChange={handleBrand}>
                <option value="" disabled>Brand</option>
                <option value="Apple">Apple</option>
                <option value="Samsung">Samsung</option>
                <option value="Oppo">Oppo</option>
              </select>

              <select className="select select-bordered max-w-xs" style={{backgroundColor: "white", border: "2px solid black"}} value={category} onChange={handleCategory}>
                <option value="" disabled>Product Type</option>
                <option value="Smartphone">Smartphone</option>
                <option value="Smartwatch">SmartWatch</option>
              </select>
            </Box>
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
      <div className="flex flex-wrap justify-center gap-3 mb-10">
        {loading ? (
          Array.from({ length: 10 }, (_, index) => (
            <SkeletonComponent key={index} />
          ))
        ) : (
          products.map(product => (
            <ProductCard
              key={product._id}
              product={product}
            />
          ))
        )}
      </div>

      <TablePagination
        component="div"
        count={totalCount}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        sx={{ color: "white", textAlign: "center" }}
      />
      <Footer />
    </>
  );
};

export default Home;