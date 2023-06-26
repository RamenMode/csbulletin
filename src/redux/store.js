import { configureStore } from '@reduxjs/toolkit';
import userReducer from './counter.js'

export default configureStore({
    reducer: {
        user: userReducer
    }
})