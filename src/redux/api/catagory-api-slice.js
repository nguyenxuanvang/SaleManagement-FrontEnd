import apiSlice from "./api.slice";
const catagoryApi = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getCategories: builder.query({
            query: () => '/category'
        }),
        createCategory: builder.query({
            query: category_name => ({
                url: '/category',
                method: 'POST',
                body: category_name
            }),
            async onQueryStarted(category_name, { dispatch, queryFulfilled }) {
                try {
                    const response = await queryFulfilled;
                    if(response.data) {
                        const action = apiSlice.util.updateQueryData('getCategories', undefined, draft => {
                            draft.data.push(response.data.data);
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
export default catagoryApi;