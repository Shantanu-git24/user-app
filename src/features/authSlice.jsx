import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';


const BASE_URL = 'https://ottadmin.imboxocinema.com/api';


// Async Thunk for signing up user
export const signupUser = createAsyncThunk('auth/signup', async (userData) => {
  const response = await axios.post(`${BASE_URL}/signup`, userData);
  return response.data;
});

// Async Thunk for logging in user
export const loginUser = createAsyncThunk('auth/login', async (loginData, { rejectWithValue }) => {
  try {
    const response = await axios.post(`${BASE_URL}/login`, loginData);
    return response.data;  // Return the response data on success
  } catch (error) {
    if (error.response && error.response.data) {
      return rejectWithValue(error.response.data);  // Return the error response for debugging
    } else {
      return rejectWithValue(error.message);  // Return a general error message
    }
  }
});

// Async Thunk for verifying email with OTP
export const verifyEmail = createAsyncThunk('auth/verifyEmail', async (otpData) => {
  const response = await axios.post(`${BASE_URL}/email-verify`, otpData);
  return response.data;
});


export const getUserDetails = createAsyncThunk('auth/getUserDetails', async (userId, { rejectWithValue }) => {
  try {
    const response = await axios.get(`${BASE_URL}/user-details/${userId}`);
    return response.data;
  } catch (error) {
    if (error.response && error.response.data) {
      return rejectWithValue(error.response.data);
    } else {
      return rejectWithValue(error.message);
    }
  }
});


// Thunk to fetch full user details after login
export const fetchUserDetails = createAsyncThunk('auth/fetchUserDetails', async (userId, { rejectWithValue }) => {
  try {
    const response = await axios.get(`${BASE_URL}/user-details/${userId}`);
    return response.data;  // Return the full user details
  } catch (error) {
    if (error.response && error.response.data) {
      return rejectWithValue(error.response.data.errors || error.response.data.message || error.response.data);
    } else {
      return rejectWithValue(error.message);  // Return generic error
    }
  }
});

// Async Thunk for updating user details
export const updateUser = createAsyncThunk('auth/updateUser', async (userData, { rejectWithValue }) => {
  try {
    const response = await axios.post(`${BASE_URL}/user-update`, userData, {
      headers: {
        'Content-Type': 'multipart/form-data',  // For handling file uploads (images)
      },
    });
    return response.data;
  } catch (error) {
    if (error.response && error.response.data) {
      return rejectWithValue(error.response.data);
    } else {
      return rejectWithValue(error.message);
    }
  }
});

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    token: null,
    loading: false,
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.userDetails = null;
    },
  },

  extraReducers: (builder) => {
    // Signup user
    builder
      .addCase(signupUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(signupUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });

    // Login user
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Login failed';
      });


    // Email Verification (OTP)
    builder
      .addCase(verifyEmail.pending, (state) => {
        state.loading = true;
      })
      .addCase(verifyEmail.fulfilled, (state, action) => {
        state.loading = false;
        state.emailVerified = true;  // Mark email as verified
      })
      .addCase(verifyEmail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });

    // Handle fetching user details after login
    builder
      .addCase(getUserDetails.pending, (state) => {
        state.loading = true;
      })
      .addCase(getUserDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.userDetails = action.payload;  // Store fetched user details
      })
      .addCase(getUserDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to fetch user details';
      });


    // Update user details
    builder
      .addCase(updateUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.loading = false;
        state.userDetails = action.payload;  // Update the user details with new data
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to update user details';
      })


      // Handle fetching user details after login
      .addCase(fetchUserDetails.pending, (state) => {
        state.loading = true;
        state.error = null;  // Clear previous errors
      })
      .addCase(fetchUserDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;  // Store the full user details
      })
      .addCase(fetchUserDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to fetch user details';
      });
  },
});




export const { logout } = authSlice.actions;

export default authSlice.reducer;
