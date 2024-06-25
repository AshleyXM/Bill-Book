export const billListData = {
  pay: [
    {
      type: "foods",
      name: "Dining",
      list: [
        { type: "food", name: "Foods" },
        { type: "drinks", name: "Drinks" },
        { type: "dessert", name: "Desserts" },
      ],
    },
    {
      type: "taxi",
      name: "Transportation",
      list: [
        { type: "taxi", name: "Taxi" },
        { type: "longdistance", name: "Tickets" },
      ],
    },
    {
      type: "recreation",
      name: "Recreation",
      list: [
        { type: "bodybuilding", name: "Sports" },
        { type: "game", name: "Leisure" },
        { type: "audio", name: "Multimedia" },
        { type: "travel", name: "Travel" },
      ],
    },
    {
      type: "daily",
      name: "Daily Cost",
      list: [
        { type: "clothes", name: "Clothing" },
        { type: "bag", name: "Accessories" },
        { type: "book", name: "Education" },
        { type: "promote", name: "Improve- ments" },
        { type: "home", name: "Furniture" },
      ],
    },
    {
      type: "other",
      name: "Other Expenses",
      list: [{ type: "community", name: "Property Fee" }],
    },
  ],
  income: [
    {
      type: "professional",
      name: "Compensation",
      list: [
        { type: "salary", name: "Salary" },
        { type: "overtimepay", name: "Overtime Pay" },
        { type: "bonus", name: "Bonus" },
      ],
    },
    {
      type: "other",
      name: "Other Income",
      list: [
        { type: "financial", name: "Financial Income" },
        { type: "cashgift", name: "Gift Income" },
      ],
    },
  ],
};

export const billTypeToName = Object.keys(billListData).reduce((prev, key) => {
  billListData[key].forEach((bill) => {
    bill.list.forEach((item) => {
      prev[item.type] = item.name;
    });
  });
  return prev;
}, {});
