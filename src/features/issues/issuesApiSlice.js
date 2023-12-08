import { createSelector, createEntityAdapter } from '@reduxjs/toolkit';
import { apiSlice } from '../../app/api/apiSlice';

const issuesAdapter = createEntityAdapter({
    sortComparer: (a, b) => (a.completed === b.completed) ? 0 : a.completed ? 1 : -1
});

const initialState = issuesAdapter.getInitialState();

export const issuesApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getIssues: builder.query({
            query: () => ({
                url: '/issues',
                validateStatus: (response, result) => {
                    return response.status === 200 && !result.isError;
                },
            }),
            transformResponse: responseData => {
                const loadedIssues = responseData.map(issue => {
                    issue.id = issue._id;
                    return issue;
                });
                return issuesAdapter.setAll(initialState, loadedIssues);
            },
            providesTags: (result, error, arg) => {
                if (result?.ids) {
                    return [
                        { type: 'Issue', id: 'LIST' },
                        ...result.ids.map(id => ({ type: 'Issue', id }))
                    ]
                } else return [{ type: 'Issue', id: 'LIST'}]
            }
        }),
        addNewIssue: builder.mutation({
            query: initialIssue => ({
                url: '/issues',
                method: 'POST',
                body: {
                    ...initialIssue,
                }
            }),
            invalidatesTags: [
                { type: 'Issue', id: "LIST" }
            ]
        }),
        updateIssue: builder.mutation({
            query: initialIssue => ({
                url: '/issues',
                method: 'PATCH',
                body: {
                    ...initialIssue,
                }
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'Issue', id: arg.id }
            ]
        }),
        deleteIssue: builder.mutation({
            query: ({ id }) => ({
                url: '/issues',
                method: 'DELETE',
                body: { id }
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'Issue', id: arg.id }
            ]
        })
    })
})

export const {
    useGetIssuesQuery,
    useAddNewIssueMutation,
    useUpdateIssueMutation,
    useDeleteIssueMutation
} = issuesApiSlice;

export const selectIssuesResult = issuesApiSlice.endpoints.getIssues.select();

const selectIssuesData = createSelector(
    selectIssuesResult,
    issuesResult => issuesResult.data
)

export const {
    selectAll: selectAllIssues,
    selectById: selectIssueById,
    selectIds: selectIssueIds
} = issuesAdapter.getSelectors(state => selectIssuesData(state) ?? initialState);