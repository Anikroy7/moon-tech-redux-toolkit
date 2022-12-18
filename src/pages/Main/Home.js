import React from "react";
import { useEffect } from "react";
import ProductCard from "../../components/ProductCard";
import { useDispatch, useSelector } from 'react-redux'
import { removeFilters, toggle, toggleBrands } from "../../features/filter/filterSlice";
import { getProducts } from "../../features/products/productSlice";


const Home = () => {
  const dispatch = useDispatch();

  const { brands, stock } = useSelector((state) => state.filter);
  console.log(stock, brands);
  const { products, isLoading } = useSelector(state => state.products);
  console.log(products);

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch])


  let content;


  if (isLoading) {
    content = <div>
      <span class="">Loading...</span>
    </div>
  }

  if (products.length) {
    content = products.map(product => <ProductCard
      key={product._id}
      product={product}
    ></ProductCard>);
  }



  if (products?.length && (stock || brands.length)) {
    content = products
      .filter((product) => {
        if (stock) {
          return product.status === true;
        }
        return product;
      })
      .filter((product) => {
        if (brands.length) {
          return brands.includes(product.brand)
        }
        return product;
      })
      .map((product) => (
        <ProductCard key={product._id} product={product} />
      ))
  }


  const activeclassName = "text-white bg-indigo-500 border-white";

  return (
    <div className='max-w-7xl gap-14 mx-auto my-10'>
      <div className='mb-10 flex justify-end gap-5'>
        <button
          onClick={() => dispatch(removeFilters())}
          className="border px-3 py-2 rounded-full font-semibold">Cleart all filters</button>
        <button
          className={`border px-3 py-2 rounded-full font-semibold ${stock ? activeclassName : null}`}
          onClick={() => dispatch(toggle())}
        >
          In Stock
        </button>
        <button
          className={`border px-3 py-2 rounded-full font-semibold ${brands.includes("amd") ? activeclassName : null}`}
          onClick={() => dispatch(toggleBrands('amd'))}
        >
          AMD
        </button>
        <button
          onClick={() => dispatch(toggleBrands('intel'))}
          className={`border px-3 py-2 rounded-full font-semibold ${brands.includes("intel") ? activeclassName : null}`}
        >
          Intel
        </button>
      </div>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-14'>

        {
          content
        }
      </div>
    </div>
  );
};

export default Home;
