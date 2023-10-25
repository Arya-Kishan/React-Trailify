import { configureStore } from "@reduxjs/toolkit";
import HomeSlice from "./HomeSlice";
import UserSlice from "./UserSlice";

const store = configureStore({
  reducer: {
    home : HomeSlice,
    user : UserSlice,
  },
});

export default store;