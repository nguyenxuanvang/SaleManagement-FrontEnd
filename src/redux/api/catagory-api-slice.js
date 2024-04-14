import apiSlice from "./api.slice";
const catagoryApi = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getCategories: builder.query({
            query: () => '/category'
        })
    })
});
export default catagoryApi;