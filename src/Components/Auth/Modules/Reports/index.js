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
import { showAllEmployeesOperation } from '../../../../State/Employees/operations';
import { showAllOrdersOperation } from '../../../../State/Orders/operations';
import { monthDataFunction, monthIncomeFunction } from './reportDataGenerator';
import { map } from 'lodash';

const Report = ({ actions }) => {
  const colors = ['#8DD1E1', '#D0ED57', '#8784D8', '#81CA9C']
  const [barData, setBarData] = useState([]);
  const [pieData, setPieData] = useState([]);
  const [allCustomersState, setAllCustomersState] = useState([]);
  const [allOrdersState, setAllOrdersState] = useState([]);
  const [allEmployeesState, setAllEmployeesState] = useState([]);
  const [totalIncome, setTotalIncome] = useState([]);
  useEffect(() => {
    actions.showAllOrdersOperation({ admin: "admin" })
    .then(res => {
      setAllOrdersState(res);
      setBarData(monthDataFunction(res));
      setPieData(monthIncomeFunction(res));
      let inc = 0;
      map(res, data => {
        inc += parseInt(data.total, 10);
      });
      setTotalIncome(inc);
    })
    actions.showAllCustomersOperation()
    .then((res) => {
      setAllCustomersState(res);
    });
    actions.showAllEmployeesOperation()
    .then((res) => setAllEmployeesState(res));

  }, [])

  return (
    <>
      <h1 className="content-tile mb-0">Reports</h1>
      <h3 className="content-tile mb-0">General</h3>

      <div className="report-cards">
          <div className="report-card">
            <h4 className="content-tile">Total Customers</h4>
            <h4 className="card-val">{allCustomersState.length}</h4>
          </div>
          <div className="report-card">
            <h4 className="content-tile">Total Income</h4>
            <h4 className="card-val">${totalIncome}</h4>
          </div>
          <div className="report-card">
            <h4 className="content-tile">Total Employees</h4>
            <h4 className="card-val">{allEmployeesState.length}</h4>
          </div>
          <div className="report-card">
            <h4 className="content-tile">Total Orders</h4>
            <h4 className="card-val">{allOrdersState.length}</h4>
          </div>
        </div>
      <div>
        <h3 className="content-tile mb-0">Current Year</h3>
        <div className="chart-row">
          <div>
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
            <h6 className="chart-title">Total Orders</h6>
          </div>
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

const mapDispatchToProps = (disptach) => ({
  actions: bindActionCreators({
    showAllCustomersOperation,
    showAllOrdersOperation,
    showAllEmployeesOperation,
  }, disptach),
});

export default connect(null, mapDispatchToProps)(Report);
