import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts, deleteProduct, updateProduct } from '../redux/slices/productSlice';

const ProductsPage = () => {
  const dispatch = useDispatch();
  const { items, loading, error } = useSelector((state) => state.products);
  const totalRecords = items.length;

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  if (loading) return <p>Loading products...</p>;
  if (error) return <p>Error fetching products: {error}</p>;

  const handleDelete = (productId) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      dispatch(deleteProduct(productId));
    }
  };

  const handleEdit = (product) => {
    const newTitle = prompt("Enter new title:", product.title);
    if (newTitle) {
      const updatedProductData = {
        ...product,
        title: newTitle,
      };
      dispatch(updateProduct(updatedProductData));
    }
  };

  return (
    <div>
      <h2>Products List</h2>
      <p>Total Records: {totalRecords}</p>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {items.map((product) => (
            <tr key={product.id}>
              <td>{product.id}</td>
              <td>{product.title}</td>
              <td>${product.price}</td>
              <td>
                <button onClick={() => handleEdit(product)}>Edit</button>
                <button onClick={() => handleDelete(product.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductsPage;