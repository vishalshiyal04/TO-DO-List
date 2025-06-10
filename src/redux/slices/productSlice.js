import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchProducts = createAsyncThunk('products/fetchProducts', async () => {
  const response = await axios.get('https://dummyjson.com/products');
  return response.data.products;
});

export const addProduct = createAsyncThunk('products/addProduct', async (productData) => {
  const response = await axios.post('https://dummyjson.com/products/add', productData);
  return response.data;
});

export const deleteProduct = createAsyncThunk('products/deleteProduct', async (productId) => {
  await axios.delete(`https://dummyjson.com/products/${productId}`);
  return productId;
});

export const updateProduct = createAsyncThunk('products/updateProduct', async (productData, { rejectWithValue }) => {
  try {
    const { id, ...data } = productData;
    const response = await axios.put(`https://dummyjson.com/products/${id}`, data);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

const productSlice = createSlice({
  name: 'products',
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(addProduct.fulfilled, (state, action) => {
        state.items.unshift(action.payload);
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.items = state.items.filter((item) => item.id !== action.payload);
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        const index = state.items.findIndex((item) => item.id === action.payload.id);
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      });
  },
});

export default productSlice.reducer;

