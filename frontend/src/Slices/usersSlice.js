import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const fetchUserData = createAsyncThunk(
  "users/fetchUserData",
  async (user_id, thunkAPI) => {
    const response = await axios.get(
      `http://localhost:4000/users/profile/${user_id}`
    );
    return response.data;
  }
);

const resetAuth = createAction('users/resetAuth');

const userDataSlice = createSlice({
  name: "userData",
  initialState: {
    data: [],
    auth: null,
    status: "idle",
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserData.pending, (state) => {
        state.status = "Loading";
      })
      .addCase(fetchUserData.fulfilled, (state, action) => {
        state.status = "completed";
        state.auth = 'authorized';
        state.data = action.payload;
      })
      .addCase(fetchUserData.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.error.message;
      })
      .addCase(resetAuth, (state) => {
        state.auth = null;
      })
  },
});

export { fetchUserData, resetAuth };

export default userDataSlice.reducer;

export const selectUser = (state) => state.users;
