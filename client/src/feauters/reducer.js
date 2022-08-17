import {createSlice} from '@reduxjs/toolkit';

export const allProduct = createSlice({
    name:"allProducts",
    initialState:{ value:
        []
    },
    reducers:{
        fetchProducts: (state,action) => {
            state.value = action.payload
        }
    }
})



export const {fetchProducts} = allProduct.actions;

export  default  allProduct.reducer ;
