import apiSlice from "./api.slice";
const loginRegistrationApi = apiSlice.injectEndpoints({
    endpoints: builder => ({
        registration: builder.mutation({
            query: user => ({
                url: '/auth/register',
                method: 'POST',
                body: user
            })
        }),
        login: builder.mutation({
            query: user => ({
                url: '/auth/login',
                method: 'POST',
                body: user
            })
        })
    })
});
export default loginRegistrationApi;