import { NavBar, DatePicker } from "antd-mobile";
import "./index.scss";

import { useEffect, useMemo, useState } from "react";
import classNames from "classnames";
import dayjs from "dayjs";
import { useSelector } from "react-redux";
import _ from "lodash";
import DailyBill from "./components/DayBill";

const Month = () => {
  // 按月做数据的分组
  const billList = useSelector((state) => state.bill.billList);
  const monthGroup = useMemo(() => {
    // 返回计算得到的结果
    return _.groupBy(billList, (item) => dayjs(item.date).format("YYYY-MM"));
  }, [billList]);

  // 控制弹框的打开和关闭
  const [dateVisible, setDateVisible] = useState(false);

  // 控制时间的显示
  const [currentDate, setCurrentDate] = useState(() =>
    dayjs(new Date()).format("YYYY-MM")
  );

  const [currentMonthList, setCurrentMonthList] = useState([]);

  // 初始化时显示当前月的统计数据
  useEffect(() => {
    const newDate = dayjs().format("YYYY-MM");
    if (monthGroup[newDate]) {
      setCurrentMonthList(monthGroup[newDate]);
    }
  }, [monthGroup]);

  const monthResult = useMemo(() => {
    const pay = currentMonthList
      .filter((item) => item.type === "pay")
      .reduce((a, c) => a + c.money, 0);

    const income = currentMonthList
      .filter((item) => item.type === "income")
      .reduce((a, c) => a + c.money, 0);

    return {
      pay,
      income,
      total: income + pay,
    };
  }, [currentMonthList]);

  const handleDateConfirm = (date) => {
    setDateVisible(false);
    // 其他处理逻辑
    const formatDate = dayjs(date).format("YYYY-MM");
    setCurrentDate(formatDate);
    setCurrentMonthList(monthGroup[formatDate] ?? []);
  };

  // 当前月按日来分组
  const dayGroup = useMemo(() => {
    // 返回计算得到的结果
    const groupData = _.groupBy(currentMonthList, (item) =>
      dayjs(item.date).format("YYYY-MM-DD")
    );
    const keys = Object.keys(groupData);
    return {
      groupData,
      keys,
    };
  }, [currentMonthList]);

  return (
    <div className="monthlyBill">
      <NavBar className="nav" backArrow={false}>
        Monthly Statement
      </NavBar>
      <div className="content">
        <div className="header">
          {/* 时间切换区域 */}
          <div className="date" onClick={() => setDateVisible(true)}>
            <span className="text">{currentDate}</span>
            {/* 根据当前弹框的打开状态控制expand类名的存在与否 */}
            <span
              className={classNames("arrow", dateVisible && "expand")}
            ></span>
          </div>
          {/* 统计区域 */}
          <div className="twoLineOverview">
            <div className="item">
              <span className="money">{monthResult.pay.toFixed(2)}</span>
              <span className="type">Cost</span>
            </div>
            <div className="item">
              <span className="money">{monthResult.income.toFixed(2)}</span>
              <span className="type">Income</span>
            </div>
            <div className="item">
              <span className="money">{monthResult.total.toFixed(2)}</span>
              <span className="type">Total</span>
            </div>
          </div>
          {/* 时间选择器 */}
          <DatePicker
            className="kaDate"
            title="记账日期"
            precision="month"
            visible={dateVisible}
            onCancel={() => setDateVisible(false)}
            onConfirm={handleDateConfirm}
            onClose={() => setDateVisible(false)}
            max={new Date()}
          />
        </div>
        {/* 单日列表统计 */}
        {dayGroup.keys.map((key) => {
          return (
            <DailyBill
              key={key}
              date={key}
              billList={dayGroup.groupData[key]}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Month;
