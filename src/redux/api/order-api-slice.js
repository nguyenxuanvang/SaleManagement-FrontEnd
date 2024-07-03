import apiSlice from "./api.slice";
import { current } from "@reduxjs/toolkit";
const orderApi = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getOrders: builder.query({
            serializeQueryArgs: () => {
                return undefined;
            },
            query: (filter) => ({
                url: '/order',
                params: filter
            })
        }),
        getOrderDetails: builder.query({
            serializeQueryArgs: () => {
                return undefined;
            },
            query: (id) => ({
                url: `/order/${id}`
            })
        }),
        deleteOrder: builder.mutation({
            query: (args) => ({
                url: `/order`,
                method: 'DELETE',
                body: args
            }),
            async onQueryStarted(id, { dispatch, queryFulfilled }) {
                try {
                    const response = await queryFulfilled;
                    if(response.data) {
                        const action = apiSlice.util.updateQueryData('getOrders', undefined, draft => {
                           draft.data = response.data.data;
                        });
                        dispatch(action);
                    }
                } catch(e) {
                    console.log(e);
                }  
            }
        })
    })
});
export default orderApi;