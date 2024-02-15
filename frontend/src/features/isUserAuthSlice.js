import { createSlice } from '@reduxjs/toolkit';

export const isUserAuthSlice = createSlice({
  name: 'isUserAuth',
  initialState: {
    value: {
      user: null,
    }
  },
  reducers: {
    setUser: ( state, action ) => {
      state.value.user = action.payload
    },
    reset: ( state ) => {
      state.value.user = null
    }
  }
});

// Actions
export const { setUser, reset } = isUserAuthSlice.actions;

// State selectors
export const selectUser = ( state ) => state.IsAuth.value.user;

// Export default the reducer
export default isUserAuthSlice.reducer;