import {createSlice} from '@reduxjs/toolkit';

export const allProduct = createSlice({
    name:"allProducts",
    initialState:{ value:
        [{
            id:1,
            title:'MackBook',
            price:"$10000",
            category:'Laptop',
            description:'This is mackbook pro',
            image:''
        }]
    },
    reducers:{
        fetchProducts: (state,action) => {
            state.value = action.payload
        }
    }
})



export const {fetchProducts} = allProduct.actions;

export  default  allProduct.reducer ;
