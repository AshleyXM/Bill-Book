import "./index.scss";
import Icon from "@/components/Icon";
import { billListData } from "@/constants";

import { Button, DatePicker, Input, NavBar, Toast } from "antd-mobile";
import classNames from "classnames";

import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import { addBillList } from "@/store/modules/billReducer";
import { useDispatch } from "react-redux";

import dayjs from "dayjs";

const New = () => {
  const navigate = useNavigate();

  const [billType, setBillType] = useState("pay");

  const [money, setMoney] = useState("");

  const [date, setDate] = useState(new Date());

  // 收集账单类型
  const [useFor, setUseFor] = useState("food");

  const dispatch = useDispatch();

  // 控制时间选择器的打开和关闭
  const [dateVisible, setDateVisible] = useState(false);

  // 保存账单
  const saveBill = () => {
    if (money === "") {
      Toast.show({
        content: "Please enter the amount!",
      });
      return;
    }
    // 收集表单数据
    const data = {
      type: billType,
      money: billType === "pay" ? -money : +money, // 这里必须加上+和-将字符串类型转换成数值类型
      date: date,
      useFor: useFor,
    };
    dispatch(addBillList(data));
    navigate("/");
  };

  const handleDateConfirm = (date) => {
    setDate(date);
    setDateVisible(false);
  };

  // 设置默认选中用途
  useEffect(() => {
    if (billType === "pay") {
      setUseFor("food");
    } else {
      setUseFor("salary");
    }
  }, [billType]);

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
            <div className="date" onClick={() => setDateVisible(true)}>
              <Icon type="calendar" className="icon" />
              <span className="text">{dayjs(date).format("YYYY-MM-DD")}</span>
              {/* 时间选择器 */}
              <DatePicker
                className="kaDate"
                title="Bill Date"
                confirmText="Confirm"
                cancelText="Cancel"
                onConfirm={handleDateConfirm}
                max={new Date()}
                visible={dateVisible}
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
                      className={classNames(
                        "item",
                        useFor === item.type && "selected"
                      )}
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
