import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AuthResponse, User } from "../../types";

type UserState = {
    user: User | null
}

const getUserLocalStorage = (): User | null => JSON.parse(localStorage.getItem("user") ?? "null") || null

const defaultState: UserState = {
    user: getUserLocalStorage()
}

const userSlice = createSlice({
    name: 'user',
    initialState: defaultState,
    reducers: {
        loginUser: (state, {payload}: PayloadAction<AuthResponse>) => {
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
