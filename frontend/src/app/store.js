import { configureStore } from '@reduxjs/toolkit';
import IsUserAuthReducer from '../features/isUserAuthSlice';

export default configureStore({
  reducer: {
    IsAuth: IsUserAuthReducer,
  }
});