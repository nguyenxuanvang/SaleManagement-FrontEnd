import apiSlice from "./api.slice";
const userApi = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getUserInfor: builder.query({
            query: () => '/user'
        })
    })
});
export default userApi;