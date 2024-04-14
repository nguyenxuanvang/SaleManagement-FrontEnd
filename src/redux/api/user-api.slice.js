import apiSlice from "./api.slice";
const userApi = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getUserInfor: builder.query({
            query: () => ({
                url: '/personal',
                method: 'GET',
                
            })
        }),
        logout: builder.mutation({
            query: () => ({
                url: '/auth/logout',
                method: 'POST',
            })
        })
    })
});
export default userApi;