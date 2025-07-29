import { apiSlice } from "../../app/apiSlice";

export const userApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getUserInfo: builder.query({
            query: () => "/users",
            providesTags: ["User"] // Result cached with the label User (Is retrieved again in cache only if subscribed)
            /*
                If a mutation endpoint is called and provides an `invalidateTags: ["User"]`,
                Any cached query providing tag of "User" will be invalidated and 
                will trigger a refetch
            */
        }),

        createUser: builder.mutation({
            query: (body) => ({
                url: "/users",
                method: "POST",
                body
            }),
            invalidatesTags: ["User"]
        }),

        updateUser: builder.mutation({
            query: ({id, ...body}) => ({
                url: `/users/${id}`,
                method: "PUT",
                body
            }),
            // async onQueryStarted(arg,{dispatch,queryFulfilled}) {
            //     try {
            //         await queryFulfilled
            //         console.log('updateUser succeeded → forcing getUserInfo refetch')
            //         // you can even manually dispatch a refetch if you like:
            //         dispatch(apiSlice.util.invalidateTags(['User']))
            //         } catch (err) {
            //         console.error('updateUser failed', err)
            //     }
            // },
            invalidatesTags: ["User"]
        }),

        deleteUser: builder.mutation({
            query: ({id}) => ({
                url: `/users/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["User"]
        }),

        

    })
})

export const {
    useGetUserInfoQuery,
    useCreateUserMutation,
    useUpdateUserMutation,
    useDeleteUserMutation
} = userApiSlice