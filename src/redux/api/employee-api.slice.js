import { current } from "@reduxjs/toolkit";
import apiSlice from "./api.slice";
const employeeApi = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getEmployees: builder.query({
            serializeQueryArgs: () => {
                return undefined;
            },
            query: (args) => ({
                url: '/employee',
                params: args
            })
        }),
        getRoles: builder.query({
            serializeQueryArgs: () => {
                return undefined;
            },
            query: () => ({
                url: '/employee/role',
            })
        }),
        addEmployee: builder.mutation({
            query: employee => ({
                url: '/employee',
                method: 'POST',
                body: employee
            }),
            async onQueryStarted(employee, { dispatch, queryFulfilled }) {
                try {
                    const response = await queryFulfilled;
                    if(response.data) {
                        const action = apiSlice.util.updateQueryData('getEmployees', undefined, draft => {
                            if(draft.data.length === 5) {
                                draft.data.length -= 1;
                            }
                            for(let i = draft.data.length; i > 0; i--) {
                                draft.data[i] = draft.data[i-1];
                            }
                            draft.data[0] = response.data.data;
                        });
                        dispatch(action);
                    }
                } catch(e) {
                    console.log(e);
                }  
            }
        }),
        updateEmployee: builder.mutation({
            query: employee => ({
                url: '/employee',
                method: 'PATCH',
                body: employee
            }),
            async onQueryStarted(employee, { dispatch, queryFulfilled }) {
                try {
                    const response = await queryFulfilled;
                    if(response.data) {
                        const action = apiSlice.util.updateQueryData('getEmployees', undefined, draft => {
                            let findEmployeeIndex = draft.data.findIndex(item => item._id === response.data.data._id);
                            draft.data[findEmployeeIndex] = response.data.data;
                        });
                        dispatch(action);
                    }
                } catch(e) {
                    console.log(e);
                }  
            }
        }),
        deleteEmployee: builder.mutation({
            query: id => ({
                url: `/employee/${id}`,
                method: 'DELETE',
            }),
            async onQueryStarted(id, { dispatch, queryFulfilled }) {
                const action = apiSlice.util.updateQueryData('getEmployees', undefined, draft => {
                    const index = draft.data.findIndex(item => item._id === id);
                    draft.data.splice(index, 1);
                    
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
export default employeeApi;