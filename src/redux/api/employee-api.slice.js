import apiSlice from "./api.slice";
const employeeApi = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getEmployees: builder.query({
            serializeQueryArgs: () => {
                return undefined;
            },
            query: (args) => ({
                url: '/employees',
                params: args
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
                            if(draft.length < 5) {
                                draft.push(response.data);
                            }
                        });
                        dispatch(action);
                    }
                } catch {

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
                const action = apiSlice.util.updateQueryData('getEmployees', undefined, draft => {
                    for (let i = 0; i < draft.length; i += 1) {
                        if (draft[i].id === employee.id) {
                            draft[i] = employee;
                            break;
                        }
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
        deleteEmployee: builder.mutation({
            query: id => ({
                url: '/employee',
                method: 'DELETE',
                body: { id }
            }),
            async onQueryStarted(id, { dispatch, queryFulfilled }) {
                const action = apiSlice.util.updateQueryData('getEmployees', undefined, draft => {
                    let index = 0;
                    for (let i = 0; i < draft.length; i += 1) {
                        if (draft[i].id === id) {
                            index = i;
                            break;
                        }
                    }
                    draft.splice(index, 1);
                    for (let i = index; i < draft.length; i += 1) {
                        draft[i].id -= 1;
                    }
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