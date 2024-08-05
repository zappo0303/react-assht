import React from 'react';
import useFetchProducts from './useFetchProducts';

const ProductList = () => {
  const { products, isLoading, isError, error, refetch } = useFetchProducts();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <h1>Product List</h1>
      <button onClick={refetch}>Refetch Products</button>
      <ul>
        {products.map(product => (
          <li key={product.id}>{product.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default ProductList;
