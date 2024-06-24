import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// 账单列表
const billSlice = createSlice({
  name: "bill",
  initialState: {
    billList: [],
  },
  reducers: {
    // 同步修改方法
    setBillList(state, action) {
      state.billList = action.payload;
    },
  },
});

// 解构出actionCreator函数
const { setBillList } = billSlice.actions;

// 编写异步
const getBillList = () => {
  return async (dispatch) => {
    // 编写异步请求
    const res = await axios.get("http://localhost:8888/ka");
    // 触发同步reducer
    dispatch(setBillList(res.data));
  };
};

export { getBillList };

// 导出reducer
export default billSlice.reducer;
