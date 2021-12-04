import React, { useState, useEffect } from 'react';
import {
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Bar,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { showAllCustomersOperation } from '../../../../State/Customers/operations';
import { showAllOrdersOperation } from '../../../../State/Orders/operations';
import { monthDataFunction, monthIncomeFunction } from './reportDataGenerator';

const Report = ({ allOrders, actions }) => {
  const colors = ['#8DD1E1', '#D0ED57', '#8784D8', '#81CA9C']
  const [barData, setBarData] = useState(monthDataFunction(allOrders));
  const [pieData, setPieData] = useState([])
  useEffect(() => {
    actions.showAllOrdersOperation({ admin: "admin" })
    .then(res => {
      setBarData(monthDataFunction(res));
      setPieData(monthIncomeFunction(res));
    })
  }, [])
  return (
    <>
      <h1 className="content-tile mb-0">Reports</h1>
      <div>
        <h3 className="content-tile mb-0">Current Month States</h3>
        <div className="chart-row">
          <BarChart width={500} height={250} data={barData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="orders" fill="#8884d8">
            {
                barData.map((entry, index) => (
                  <Cell key={`bar-${index}`} fill={colors[index]}/>
                ))
              }
            </Bar>
          </BarChart>
          <div>
            <PieChart width={300} height={250}>
              <Legend />
              <Tooltip />
              <Pie data={pieData} dataKey="value" nameKey="name" cx="50%" cy="50%" fill="#82ca9d" outerRadius={80}>
              {
                pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={colors[index]}/>
                ))
              }
              </Pie>
            </PieChart>
            <h6 className="chart-title">Total Income</h6>
          </div>
        </div>
      </div>
    </>
  );
};

const mapStateToProps = (state) => ({
  allCustomers: state.Customers.allCustomers,
  allOrders: state.Orders.allOrders,
});

const mapDispatchToProps = (disptach) => ({
  actions: bindActionCreators({ showAllCustomersOperation, showAllOrdersOperation }, disptach),
});

export default connect(mapStateToProps, mapDispatchToProps)(Report);
