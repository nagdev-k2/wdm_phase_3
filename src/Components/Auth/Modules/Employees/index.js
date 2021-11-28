import { isEqual, map } from 'lodash';
import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Edit from '../../../../Assets/edit.png';
import Delete from '../../../../Assets/delete.png';
import { showAllEmployeesOperation, addEmployeeOperation, updateEmployeeOperation, deleteEmployeeOperation } from '../../../../State/Employees/operations';
import '../style.css';
import FormModal from './formModal';

const tableHead = ['Emp. Id.', 'Date', 'Name', 'Email', 'Address', 'Mobile Number', 'Gender', 'Type', 'SSN (last 4 Digits)', 'Edit', 'Delete'];

const Employees = ({ actions, allEmps, currentUser }) => {
  const [showFormModal, setShowFormModal] = useState(false);
  const [selectedEmployee, setEmployee] = useState({
    name: '', gender: '', date: '', address: '', mobileNo: '', type: '', last4SSN: '',
  });
  const [allEmployeesState, setAllEmployees] = useState(allEmps);


  const editEmployee = (data) => {
    setEmployee(data)
    setShowFormModal(true);
  }

  const deleteEmployeeAlert = (data) => {
    if (window.confirm('Are you sure you want to delete this entry?')) {
      actions.deleteEmployeeOperation(data)
        .then(() => {
          actions.showAllEmployeesOperation({ customerId: currentUser.id })
            .then((res) => {
              setAllEmployees(res);
            })
        })

      // actions.deleteEmployee(data);
    }
  }

  useEffect(() => {
    actions.showAllEmployeesOperation({})
      .then(res => {
        setAllEmployees(res);
      })
  }, [])

  return (
    <>
      <div className="customer-header">
        <h4 className="content-title left mb-0">All Employees</h4>
        <Button
          variant="transparent"
          className="round-btn"
          onClick={() => setShowFormModal(true)}
        >Add New Employee</Button>
      </div>
      <table className="data-table" border="1">
        <tbody>
          <tr>
            {map(tableHead, (label, index) => (
              <th key={`${index}-head-customer`}>{label}</th>
            ))}
          </tr>
          {map(allEmployeesState, (data, index) => (
            <tr key={`${index}-table-entries-customer`}>
              <td>{data.id}</td>
              <td>{data.doj}</td>
              <td>{data.name}</td>
              <td>{data.email}</td>
              <td>{data.address}</td>
              <td>{data.mobile_no}</td>
              <td>{data.gender}</td>
              <td>{data.type}</td>
              <td>{data.ssn}</td>
              <td>
                <Button variant="transparent" onClick={() => editEmployee(data)}>
                  <img src={Edit} alt="edit-data" className="table-btn-icon" />
                </Button>
              </td>
              <td>
                <Button variant="transparent" onClick={() => deleteEmployeeAlert(data)}>
                  <img src={Delete} alt="delete-data" className="table-btn-icon" />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <FormModal
        show={showFormModal}
        handleClose={() => setShowFormModal(false)}
        employeeData={selectedEmployee}
        addEmployeeAction={actions.addEmployeeOperation}
        updateEmployeeAction={actions.updateEmployeeOperation}
        setEditEmployeeData={setEmployee}
        isAdmin={isEqual(currentUser.type, 'admin')}
        showAllEmployeesOperation={actions.showAllEmployeesOperation}
        setAllEmployees={setAllEmployees}
      />
    </>
  );
};

const mapStateToProps = (state) => ({
  allEmps: state.Employees.allEmps,
  currentUser: state.Users.currentUser,
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({ showAllEmployeesOperation, addEmployeeOperation, updateEmployeeOperation, deleteEmployeeOperation }, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Employees);
