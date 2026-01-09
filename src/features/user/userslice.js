import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  usersList: [],
};
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setUsersList: (state, action) => {
        state.usersList = action.payload;
    }
  },
});
const { reducer, actions } = userSlice;
export const { setUser, setUsersList } = actions;
export default reducer;
