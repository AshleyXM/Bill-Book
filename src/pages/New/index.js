import "./index.scss";
import Icon from "@/components/Icon";
import { billListData } from "@/constants";

import { Button, DatePicker, Input, NavBar } from "antd-mobile";
import classNames from "classnames";

import { useNavigate } from "react-router-dom";
import { useState } from "react";

import { addBillList } from "@/store/modules/billReducer";
import { useDispatch } from "react-redux";

const New = () => {
  const navigate = useNavigate();

  const [billType, setBillType] = useState("pay");

  const [money, setMoney] = useState("");

  // 收集账单类型
  const [useFor, setUseFor] = useState("");

  const dispatch = useDispatch();

  // 保存账单
  const saveBill = () => {
    // 收集表单数据
    const data = {
      type: billType,
      money: billType === "pay" ? -money : +money, // 这里必须加上+和-将字符串类型转换成数值类型
      date: new Date(),
      useFor: useFor,
    };
    dispatch(addBillList(data));
  };
  return (
    <div className="keepAccounts">
      <NavBar className="nav" onBack={() => navigate(-1)}>
        Add a Bill
      </NavBar>

      <div className="header">
        <div className="kaType">
          <Button
            shape="rounded"
            className={classNames(billType === "pay" && "selected")}
            onClick={() => setBillType("pay")}
          >
            Cost
          </Button>
          <Button
            shape="rounded"
            className={classNames(billType === "income" && "selected")}
            onClick={() => setBillType("income")}
          >
            Income
          </Button>
        </div>

        <div className="kaFormWrapper">
          <div className="kaForm">
            <div className="date">
              <Icon type="calendar" className="icon" />
              <span className="text">{"Today"}</span>
              <DatePicker
                className="kaDate"
                title="Bill Date"
                max={new Date()}
              />
            </div>
            <div className="kaInput">
              <Input
                className="input"
                placeholder="0.00"
                type="number"
                value={money}
                onChange={(value) => setMoney(value)}
              />
              <span className="iconYuan">$</span>
            </div>
          </div>
        </div>
      </div>

      <div className="kaTypeList">
        {billListData[billType].map((item) => {
          return (
            <div className="kaType" key={item.type}>
              <div className="title">{item.name}</div>
              <div className="list">
                {item.list.map((item) => {
                  return (
                    <div
                      className={classNames("item", "")}
                      key={item.type}
                      onClick={() => setUseFor(item.type)}
                    >
                      <div className="icon">
                        <Icon type={item.type} />
                      </div>
                      <div className="text">{item.name}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      <div className="btns">
        <Button className="btn save" onClick={saveBill}>
          Save
        </Button>
      </div>
    </div>
  );
};

export default New;
