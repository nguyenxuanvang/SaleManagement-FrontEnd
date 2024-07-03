import apiSlice from "./api.slice";
import { current } from "@reduxjs/toolkit";
const saleApi = apiSlice.injectEndpoints({
    endpoints: builder => ({
        saleProducts: builder.mutation({
            query: info => ({
                url: '/sale',
                method: 'POST',
                body: info
            }),
            async onQueryStarted(info, { dispatch, queryFulfilled }) {
                const action = apiSlice.util.updateQueryData('getProducts', undefined, draft => {
                    for(let i = 0; i < info.cart.length; i += 1) {
                       let findProduct = draft.data.find(item => item._id === info.cart[i]._id);
                       findProduct.quantity -= info.cart[i].quantityP;
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
    })
});
export default saleApi;