import { configureStore } from "@reduxjs/toolkit";
import LoginSlice from "./Slice/LoginSlice";

export default configureStore({
reducer:{
    Loginreducer:LoginSlice
}
})