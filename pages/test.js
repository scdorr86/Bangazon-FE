// import { Button } from 'react-bootstrap';
// import { signOut } from '../utils/auth';
// import { useAuth } from '../utils/context/authContext';

import { useEffect, useState } from 'react';
import ProductCard from '../components/ProductCard';
import { getAllProducts } from '../api/productData';

function Test() {
  const [products, setProducts] = useState([]);

  const getProducts = () => {
    getAllProducts().then(setProducts);
  };

  useEffect(() => {
    getProducts();
  }, []);

  console.log('these are products:', products);
  return (
    <>
      <div
        className="text-center d-flex flex-column justify-content-center align-content-center"
        style={{
          height: '45vh',
          padding: '15px',
          maxWidth: '200px',
          margin: '0 auto',
        }}
      >
        <h1>Hello!</h1>
      </div>
      {products?.map((product) => (
        <ProductCard prodObj={product} />))};
    </>
  );
}

export default Test;
