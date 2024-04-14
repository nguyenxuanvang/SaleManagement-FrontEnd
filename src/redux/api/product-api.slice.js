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
            query: product => ({
                url: '/product',
                method: 'PATCH',
                body: product
            }),
            async onQueryStarted(product, { dispatch, queryFulfilled }) {
                const action = apiSlice.util.updateQueryData('getProducts', undefined, draft => {
                    for(let i = 0; i < draft.length; i += 1) {
                        if(draft[i].maHang === Number(product.maHang)) {
                            draft[i] = product;
                            break;
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
        orderProducts: builder.mutation({
            query: cart => ({
                url: '/orderProducts',
                method: 'PATCH',
                body: cart
            })
        }),
        deleteProduct: builder.mutation({
            query: maHang => ({
                url: '/product',
                method: 'DELETE',
                body: {maHang}
            }),
            async onQueryStarted(maHang, { dispatch, queryFulfilled }) {
                const action = apiSlice.util.updateQueryData('getProducts', undefined, draft => {
                    let index = 0;
                    for(let i = 0; i < draft.length; i += 1) {
                        if(draft[i].maHang === Number(maHang)) {
                            index = i;
                            break;
                        }
                    }
                    draft.splice(index,1);
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