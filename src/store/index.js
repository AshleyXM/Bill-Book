// 组合子模块，导出store实例
import billReducer from "./modules/billReducer";
import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
  reducer: {
    bill: billReducer,
  },
});

export default store;
