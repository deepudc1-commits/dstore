import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const getUserLocalStorage = () => JSON.parse(localStorage.getItem("user")) || null

const defaultState = {
    user: getUserLocalStorage()
}

const userSlice = createSlice({
    name: 'user',
    initialState: defaultState,
    reducers: {
        loginUser: (state, {payload}) => {
            const jwtUser = {...payload.user , token: payload.jwt}
            state.user = jwtUser
            localStorage.setItem("user", JSON.stringify(jwtUser))
        },
        logoutUser: (state) => {
            console.log('Logout user');
            state.user = null
            localStorage.clear()
        }
    }
});

export const { loginUser, logoutUser } = userSlice.actions

export default userSlice.reducer