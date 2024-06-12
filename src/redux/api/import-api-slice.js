import apiSlice from "./api.slice";
import { current } from "@reduxjs/toolkit";
const importApi = apiSlice.injectEndpoints({
    endpoints: builder => ({
        importProducts: builder.mutation({
            query: info => ({
                url: '/import',
                method: 'POST',
                body: info
            }),
            // async onQueryStarted(info, { dispatch, queryFulfilled }) {
            //     const action = apiSlice.util.updateQueryData('getProducts', undefined, draft => {
            //         for(let i = 0; i < productList.length; i += 1) {
            //             for(let j = 0; j <  draft.length; j += 1) {
            //                 if(draft[j].maHang === productList[i].maHang) {
            //                   draft[j].tonKho -= productList[i].quantity;
            //                   break;
            //                 }
            //             }
            //         }
            //     });
            //     const patchResult = dispatch(action);
            //     try {
            //         await queryFulfilled;
            //     } catch {
            //         patchResult.undo();
            //     }
            // }
        }), 
    })
});
export default importApi;