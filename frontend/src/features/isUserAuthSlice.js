import { createSlice } from '@reduxjs/toolkit';

export const isUserAuthSlice = createSlice({
  name: 'isUserAuth',
  initialState: {
    value: {
      user: null,
    }
  },
  reducers: {
    loginStatus: ( state, action ) => {
      state.value = action.payload;
    },
    setUser: ( state, action ) => {
      state.value.user = action.payload
    }
  }
});

// Actions
export const { loginStatus, setUser } = isUserAuthSlice.actions;

// State selectors
export const selectUser = ( state ) => state.IsAuth.value.user;

// Export default the reducer
export default isUserAuthSlice.reducer;