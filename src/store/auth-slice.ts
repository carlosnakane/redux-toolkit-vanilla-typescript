import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./root-reducer";
import auth from "../api/auth";

interface AuthState {
  loginInprogress: boolean;
  isLoggedIn: boolean;
  userName: string | null;
  accessToken: string | null;
}

const initialState: AuthState = {
  loginInprogress: false,
  isLoggedIn: false,
  userName: null,
  accessToken: null
};

const loginAsync = createAsyncThunk("auth/startLogin", async () => {
  await auth.login();
  if (auth.isLoggedIn()) {
    return auth.getUserData();
  }

  throw new Error("Could not finish loggin process");
});

const todoSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: {
    [loginAsync.pending.type]: (state) => {
      state.loginInprogress = true;
    },
    [loginAsync.fulfilled.type]: (
      state,
      { payload }: PayloadAction<string>
    ) => {
      state.loginInprogress = false;
      state.userName = payload;
      state.isLoggedIn = true;
    },
    [loginAsync.rejected.type]: (state) => {
      state.isLoggedIn = false;
      state.userName = "";
      state.loginInprogress = false;
    }
  }
});

const selectAuth = (state: RootState) => state.auth;

export { AuthState, selectAuth, loginAsync };

export default todoSlice.reducer;
