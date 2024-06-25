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
    // 同步添加账单方法
    addBill(state, action) {
      state.billList.push(action.payload);
    },
  },
});

// 解构出actionCreator函数
const { setBillList, addBill } = billSlice.actions;

// 编写异步获取账单数据的actionCreator
const getBillList = () => {
  return async (dispatch) => {
    // 编写异步请求
    const res = await axios.get("http://localhost:8888/ka");
    // 触发同步reducer
    dispatch(setBillList(res.data));
  };
};

// 编写异步添加账单的actionCreator
const addBillList = (data) => {
  return async (dispatch) => {
    // 编写异步请求
    const res = await axios.post("http://localhost:8888/ka", data);
    // 触发同步reducer
    dispatch(addBill(res.data));
  };
};

export { getBillList, addBillList };

// 导出reducer
export default billSlice.reducer;
