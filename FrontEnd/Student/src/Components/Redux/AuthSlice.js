import { createSlice } from "@reduxjs/toolkit";

// Safe layout parsing of local state session snapshots
const savedUser = JSON.parse(localStorage.getItem('loggedUser'));

const initialState = {
  user: savedUser || null, // Will contain properties like { email, name, role }
  isAuthenticated: savedUser ? true : false
};

const AuthSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // ✅ Sets the session using the profile object returned by your database API
    loginSuccess: (state, action) => {
      state.user = action.payload; // Payload should look like: { email: "...", role: "Teacher" }
      state.isAuthenticated = true;
      localStorage.setItem("loggedUser", JSON.stringify(action.payload));
    },
    // ✅ Clears global state tracking structures cleanly upon session exit
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      localStorage.removeItem("loggedUser");
    }
  }
});

export const { loginSuccess, logout } = AuthSlice.actions;
export default AuthSlice.reducer;
