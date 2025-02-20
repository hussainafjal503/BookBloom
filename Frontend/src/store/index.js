import {configureStore} from '@reduxjs/toolkit';
import userSlice from '../slices/auth.slice'


const store=configureStore({
	reducer:{
		auth:userSlice

	}
})

export default store;