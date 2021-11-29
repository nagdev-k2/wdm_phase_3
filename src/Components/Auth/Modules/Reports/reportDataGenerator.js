import { map } from 'lodash';

export const monthDataFunction = (data) => {
  const monthData = [
    { "name": "First Quater", "orders": 0 },
    { "name": "Second Quater", "orders": 0 },
    { "name": "Third Quater", "orders": 0 },
    { "name": "Forth Quater", "orders": 0 }
  ];
  map(data, innerData => {
    const orderDate = new Date(innerData.date);
    const orderMonth = orderDate.getMonth();
    if (orderMonth < 3) monthData[0]["orders"] += 1;
    if (orderMonth >= 3 && orderMonth < 6) monthData[1]["orders"] += 1;
    if (orderMonth >= 6 && orderMonth < 9) monthData[2]["orders"] += 1;
    if (orderMonth >= 9) monthData[3]["orders"] += 1;
  })
  return monthData;
};

export const monthIncomeFunction = (data) => {
  const monthData = [
    { "name": "First Quater", "value": 0 },
    { "name": "Second Quater", "value": 0 },
    { "name": "Third Quater", "value": 0 },
    { "name": "Forth Quater", "value": 0 }
  ];
  map(data, innerData => {
    const orderDate = new Date(innerData.date);
    const orderMonth = orderDate.getMonth();
    if (orderMonth < 3) monthData[0]["value"] += parseInt(innerData.total);
    if (orderMonth >= 6 && orderMonth < 9) monthData[2]["value"] += parseInt(innerData.total);
    if (orderMonth >= 3 && orderMonth < 6) monthData[1]["value"] += parseInt(innerData.total);
    if (orderMonth >= 9) monthData[3]["value"] += parseInt(innerData.total);
  });
  return monthData;
};