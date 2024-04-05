import apiSlice from "./api.slice";
const loginRegistrationApi = apiSlice.injectEndpoints({
    endpoints: builder => ({
        registration: builder.mutation({
            query: user => ({
                url: '/registration',
                method: 'POST',
                body: user
            })
        }),
        login: builder.mutation({
            query: user => ({
                url: '/login',
                method: 'POST',
                body: user
            })
        })
    })
});
export default loginRegistrationApi;