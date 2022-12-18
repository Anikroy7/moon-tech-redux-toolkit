import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { deleteProduct, fetchProducts, postProduct } from "./productsApi";

const initialState = {
    products: [],
    isLoading: false,
    postSuccess: false,
    deleteSuccess: false,
    isError: false,
    error: ""
}


export const getProducts = createAsyncThunk("products/getProduct", async () => {
    const products = fetchProducts()
    return products;
})
export const addProduct = createAsyncThunk("products/addProduct", async (data) => {
    const product = postProduct(data);
    console.log(product, "inside add product");
    return product;
})
export const deleteProductById = createAsyncThunk("products/deleteProduct", async (id, thunkAPI) => {
    const product = await deleteProduct(id)
    thunkAPI.dispatch(deleteFromList(id))
    return product;
})


const productSlice = (createSlice({
    name: "products",
    initialState,
    reducers: {
        tooglePostSuccess: (state) => {
            state.postSuccess = false
        },
        toogleDeleteSuccess: (state) => {
            state.deleteSuccess = false
        },
        deleteFromList: (state, action) => {
            state.products = state.products.filter(product => product._id !== action.payload);
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getProducts.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getProducts.fulfilled, (state, action) => {
                state.isLoading = false;
                state.products = action.payload;
            })
            .addCase(getProducts.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.error = action.error.message;
            })
            .addCase(addProduct.pending, (state) => {
                state.isLoading = true;
                state.postSuccess = false;
                state.isError = false;
            })
            .addCase(addProduct.fulfilled, (state) => {
                state.isLoading = false;
                state.postSuccess = true;
                state.isError = false
            })
            .addCase(addProduct.rejected, (state, action) => {
                state.isLoading = false;
                state.postSuccess = false;
                state.isError = true;
                state.error = action.error.message;
            })
            .addCase(deleteProductById.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(deleteProductById.fulfilled, (state) => {
                state.isLoading = false;
                state.deleteSuccess = true;
                state.isError = false;
            })
            .addCase(deleteProductById.rejected, (state, action) => {
                state.isLoading = false;
                state.deleteSuccess = false;
                state.isError = true;
                state.error = action.error.message;
            })
    }

}))

export const { tooglePostSuccess, toogleDeleteSuccess, deleteFromList } = productSlice.actions;

export default productSlice.reducer;