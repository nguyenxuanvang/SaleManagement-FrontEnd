import apiSlice from "./api.slice";
import { current } from "@reduxjs/toolkit";
const productApi = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getProducts: builder.query({
            serializeQueryArgs: () => {
                return undefined;
            },
            query: (args) => ({
                url: `/product/`,
                params: args
            }),
        }),
        addProduct: builder.mutation({
            query: product => ({
                url: '/product',
                method: 'POST',
                body: product
            }),
            async onQueryStarted(product, { dispatch, queryFulfilled }) {
                try {
                    const response = await queryFulfilled;
                    if(response.data) {
                        const action = apiSlice.util.updateQueryData('getProducts', undefined, draft => {
                            console.log(response.data.data)
                            if(draft.data.length < 5) {
                                draft.data.push(response.data.data);
                            }  
                        });
                        dispatch(action);
                    }
                } catch {

                }  
            }
        }),
        updateProduct: builder.mutation({
            query: formData => ({
                url: '/product',
                method: 'PATCH',
                body: formData
            }),
            async onQueryStarted(formData, { dispatch, queryFulfilled }) {
                try {
                    const response = await queryFulfilled;
                    if(response.data) {
                        const action = apiSlice.util.updateQueryData('getProducts', undefined, draft => {
                            const product = response.data.data;
                            let findProduct = draft.data.find(item=>item._id===product._id);
                            findProduct.category = product.category;
                            findProduct.cost_price = product.cost_price;
                            findProduct.image_url = product.image_url;
                            findProduct.owner = product.owner;
                            findProduct.product_name = product.product_name;
                            findProduct.quantity = product.quantity;
                            findProduct.sale_price = product.sale_price;
                            findProduct.unit = product.unit;
                            findProduct.updatedAt = product.updatedAt;
                        });
                        dispatch(action);
                    }
                } catch(e) {
                    console.log(e);
                }  
            }
        }),
        updateProducts: builder.mutation({
            query: productList => ({
                url: '/products',
                method: 'PATCH',
                body: productList
            }),
            async onQueryStarted(productList, { dispatch, queryFulfilled }) {
                const action = apiSlice.util.updateQueryData('getProducts', undefined, draft => {
                    for(let i = 0; i < productList.length; i += 1) {
                        for(let j = 0; j <  draft.length; j += 1) {
                            if(draft[j].maHang === productList[i].maHang) {
                              draft[j].tonKho -= productList[i].quantity;
                              break;
                            }
                        }
                    }
                });
                const patchResult = dispatch(action);
                try {
                    await queryFulfilled;
                } catch {
                    patchResult.undo();
                }
            }
        }),
        // orderProducts: builder.mutation({
        //     query: cart => ({
        //         url: '/orderProducts',
        //         method: 'PATCH',
        //         body: cart
        //     })
        // }),
        deleteProduct: builder.mutation({
            query: id => ({
                url: '/product',
                method: 'DELETE',
                body: {id}
            }),
            async onQueryStarted(id, { dispatch, queryFulfilled }) {
                const action = apiSlice.util.updateQueryData('getProducts', undefined, draft => {
                    const index = draft.data.findIndex(item=>item._id===id);
                    draft.data.splice(index,1);
                });
                const patchResult = dispatch(action);
                try {
                    await queryFulfilled;
                } catch {
                    patchResult.undo();
                }
            }
        })
    })
});
export default productApi;