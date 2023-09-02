// import { Nav } from 'react-bootstrap';
// import { signOut } from '../utils/auth';
// import { useAuth } from '../utils/context/authContext';

import { useEffect, useState } from 'react';
// import Link from 'next/link';
import ProductCard from '../components/ProductCard';
import { getAllProducts } from '../api/productData';
import AddProductForm from '../components/AddProductForm';

function Test() {
  const [products, setProducts] = useState([]);

  const getProducts = () => {
    getAllProducts().then(setProducts);
  };

  useEffect(() => {
    getProducts();
  }, []);

  // console.log('these are products:', products);
  return (
    <>
      <AddProductForm />
      <div
        className="text-center d-flex flex-column justify-content-center align-content-center"
        style={{
          height: '22vh',
          padding: '7px',
          maxWidth: '100px',
          margin: '0 auto',
        }}
      >
        <h1>Products!</h1>

      </div>
      <div className="d-flex justify-content-between">
        {products?.map((product) => (
          <ProductCard prodObj={product} />))}
      </div>
    </>
  );
}

export default Test;
