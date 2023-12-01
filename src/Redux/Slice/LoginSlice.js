import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const signup = createAsyncThunk(
  "signup",  // Use a distinct action type
  async (body, { rejectWithValue }) => {
    // console.log("nbxjdx", body);
    try {
      const response = await axios.post(
        `http://localhost:5000/signup`,
        body,
      );
      return response;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const productdata = createAsyncThunk(
  "logindata",
  async (_, { rejectWithValue }) => {
    console.log("productdata updated",)
    try {
      const response = await axios.get(
        `http://localhost:5000/products`,  // Adjust the endpoint
      );   
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const getProductdata = createAsyncThunk(
  "getProductData",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/products/${id}`,  // Adjust the endpoint
      );   
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const productInCart = createAsyncThunk(
  "productInCart",
  async (body, { rejectWithValue }) => {
    // console.log("productInCart",body)
    try {
      const response = await axios.post(
        `http://localhost:5000/cardData`, 
        body 
      );   
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);
export const getProductInCart = createAsyncThunk(
  "getProductInCart",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/cardData`, 
         
      );   
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);
export const updateProductInCart = createAsyncThunk(
  "updateProductInCart",
  async ({ body, id }, { rejectWithValue }) => {
    console.log("updateProductInCart", body,"id",id);
    try {
      const response = await axios.put(
        `http://localhost:5000/products/${id}`,
        body
      );
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const LoginSlice = createSlice({
  name: "slice",
  initialState: {
    loginreducer: [],
    getproductdata: [], 
    getproductdataById:[],
    cardProductData:[],
    getcartItem:[],
    updateproduct:[],
    value:0,
    loading: false,
  },
  reducers: {
    increment: state => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.value += 1;
    },
    decrement: state => {
      state.value -= 1;
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signup.pending, (state) => {
        state.loading = true;
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.loading = false;
        state.loginreducer = action.payload;
      })
      .addCase(signup.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(productdata.pending, (state) => {
        state.loading = true;
      })
      .addCase(productdata.fulfilled, (state, action) => {
        state.loading = false;
        state.getproductdata = action.payload;
      })
      .addCase(productdata.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(getProductdata.pending, (state) => {
        state.loading = true;
      })
      .addCase(getProductdata.fulfilled, (state, action) => {
        state.loading = false;
        state.getproductdataById = action.payload;
      })
      .addCase(getProductdata.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      .addCase(productInCart.pending, (state) => {
        state.loading = true;
      })
      .addCase(productInCart.fulfilled, (state, action) => {
        state.loading = false;
        state.cardProductData = action.payload;
      })
      .addCase(productInCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(getProductInCart.pending, (state) => {
        state.loading = true;
      })
      .addCase(getProductInCart.fulfilled, (state, action) => {
        state.loading = false;
        state.getcartItem = action.payload;
      })
      .addCase(getProductInCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(updateProductInCart.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateProductInCart.fulfilled, (state, action) => {
        state.loading = false;
        // console.log("action.payload", action.payload);
        // console.log("state.getproductdata", state.getproductdata);
        // Assuming action.payload is the updated item
        state.getProductdata = state.getproductdata.map(item => (item.id === action.payload.id ? action.payload : item));
    })
      .addCase(updateProductInCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});
export const { increment, decrement, incrementByAmount } = LoginSlice.actions;
export const selectCount = state => state.Loginreducer.value;
export default LoginSlice.reducer;
