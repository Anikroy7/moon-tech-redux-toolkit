import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    stock: false,
    brands: [],
    keyword: ""
}

const filterSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        toggle: (state) => {
            state.stock = !state.stock
        },
        toggleBrands: (state, action) => {
            console.log(action);
            if (!state.brands.includes(action.payload)) {
                console.log('nai');
                state.brands.push(action.payload)
            } else {
                console.log("ace");
                state.brands = state.brands.filter(brand => brand !== action.payload)
            }
        },
        removeFilters: (state) => {
            state.stock = false
            state.brands = []
        }
    }
})

export const { toggle, toggleBrands, removeFilters } = filterSlice.actions;

export default filterSlice.reducer;