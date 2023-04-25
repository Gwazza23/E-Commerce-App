import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const fetchAllProducts = createAsyncThunk(
  "products/fetchAllProducts",
  async (thunkAPI) => {
    const response = await axios.get(`http://localhost:4000/products`);
    return response.data;
  }
);

const fetchSingleProduct = createAsyncThunk(
  "products/fetchSingleProduct",
  async (id) => {
    const response = await axios.get(
      `http://localhost:4000/products/item/${id}`
    );
    return response.data;
  }
);

const fetchAllCategories = createAsyncThunk(
  "products/fetchAllCategories",
  async (thunkAPI) => {
    const response = await axios.get(`http://localhost:4000/products/category`);
    return response.data;
  }
);

const fetchCategory = createAsyncThunk("prodcuts/fetchCategory", async (id) => {
  const response = await axios.get(
    `http://localhost:4000/products/category/${id}`
  );
  return response.data;
});

const productsSlice = createSlice({
  name: "products",
  initialState: {
    productData: [],
    categoriesData: [],
    itemData: [],
    categoryData: [],
    status: "idle",
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllProducts.pending, (state) => {
        state.status = "Loading";
      })
      .addCase(fetchAllProducts.fulfilled, (state, action) => {
        state.status = "completed";
        state.productData = action.payload;
      })
      .addCase(fetchAllProducts.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.error.message;
      })
      .addCase(fetchAllCategories.pending, (state) => {
        state.status = "Loading";
      })
      .addCase(fetchAllCategories.fulfilled, (state, action) => {
        state.status = "completed";
        state.categoriesData = action.payload;
      })
      .addCase(fetchAllCategories.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.error.message;
      })
      .addCase(fetchSingleProduct.pending, (state) => {
        state.status = "Loading";
      })
      .addCase(fetchSingleProduct.fulfilled, (state, action) => {
        state.status = "completed";
        state.itemData = action.payload;
      })
      .addCase(fetchSingleProduct.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.error.message;
      })
      .addCase(fetchCategory.pending, (state) => {
        state.status = "Loading";
      })
      .addCase(fetchCategory.fulfilled, (state, action) => {
        state.status = "completed";
        state.categoryData = action.payload;
      })
      .addCase(fetchCategory.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.error.message;
      })
  },
});

export { fetchAllProducts, fetchAllCategories, fetchSingleProduct, fetchCategory };

export default productsSlice.reducer;

export const selectProducts = (state) => state.products;
