import { createSlice } from "@reduxjs/toolkit";

const initialState: GlobalState = {
  token: "",
  userdata:{
    id: 0,
    first_name: "",
    last_name: "",
    email: "",
    profile_picture: "",
  }
};

const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload as string;
    },
    setUserData: (state, action) => {
      state.userdata = action.payload as Userdata;
    },
  },
});

export const { setToken, setUserData } = globalSlice.actions;
export default globalSlice.reducer;
