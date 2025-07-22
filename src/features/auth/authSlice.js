import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: "auth",
    initialState: {
        token: null, //access token
        name: null,
        email: null,
        birthdate: null,
        role: null,        
        isActive: null,
    },
    reducers: {
        setCredentials: (state, action) => {
            const {token, name, email, birthdate, role, isActive} = action.payload//access token
            state.token = token
            state.name = name
            state.email = email
            state.birthdate = birthdate
            state.role = role
            state.isActive = isActive
        },
        logout: (state, action) => {
            state.token = null
            state.name = null
            state.email = null
            state.birthdate = null
            state.role = null
            state.isActive = null
        }
    }

})

export const { setCredentials, logout } = authSlice.actions

export default authSlice.reducer //add to store

export const selectCurrToken = (state) => state.auth.token //use to get current access token
export const selectMyInfo = (state) => {
    const {token, ...rest} = state.auth
    return rest
}