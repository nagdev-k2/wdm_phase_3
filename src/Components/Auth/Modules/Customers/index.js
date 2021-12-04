import { map } from 'lodash';
import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Edit from '../../../../Assets/edit.png';
import Delete from '../../../../Assets/delete.png';
import { showAllCustomersOperation, addCustomerOperation, deleteCustomerOperation, updateCustomerOperation } from '../../../../State/Customers/operations';

import '../style.css';
import FormModal from './formModal';

const tableHead = ['Cust. Id.', 'Date', 'Name', 'Email', 'Address', 'Mobile Number', 'Gender', 'Edit', 'Delete'];

const Customers = ({ actions, allCustomers }) => {
  const [showFormModal, setShowFormModal] = useState(false);
  const [selectedCustomer, setCustomer] = useState({ name: '', gender: '', date: '', address: '', mobileNo: '' });
  const [allCustomersState, setAllCustomers] = useState(allCustomers);


  const editCustomer = (data) => {
    setCustomer(data)
    setShowFormModal(true);
  }

  const deleteCustomerAlert = (data) => {
    if (window.confirm('Are you sure you want to delete this entry?')) {
      actions.deleteCustomerOperation(data)
        .then(() => {
          actions.showAllCustomersOperation()
            .then(res => {
              setAllCustomers(res);
            })
        })
    }
  }

  useEffect(() => {
    actions.showAllCustomersOperation()
      .then(res => {
        setAllCustomers(res);
      })
  }, [])

  return (
    <>
      <div className="customer-header">
        <h4 className="content-title left mb-0">All Customers</h4>
        <Button
          variant="transparent"
          className="round-btn"
          onClick={() => setShowFormModal(true)}
        >Add New Customer</Button>
      </div>
      <table className="data-table" border="1">
        <tbody>
          <tr>
            {map(tableHead, (label, index) => (
              <th key={`${index}-head-customer`}>{label}</th>
            ))}
          </tr>
          {map(allCustomersState, (data, index) => (
            <tr key={`${index}-table-entries-customer`}>
              <td>{data.id}</td>
              <td>{data.doj}</td>
              <td>{data.name}</td>
              <td>{data.email}</td>
              <td>{data.address}</td>
              <td>{data.mobile_no}</td>
              <td>{data.gender}</td>
              <td>
                <Button variant="transparent" onClick={() => editCustomer(data)}>
                  <img src={Edit} alt="edit-data" className="table-btn-icon" />
                </Button>
              </td>
              <td>
                <Button variant="transparent" onClick={() => deleteCustomerAlert(data)}>
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
        customerData={selectedCustomer}
        addCustomerAction={actions.addCustomerOperation}
        updateCustomerAction={actions.updateCustomerOperation}
        setEditCustomerData={setCustomer}
        showAllCustomersOperation={actions.showAllCustomersOperation}
        setAllCustomers={setAllCustomers}
      />
    </>
  );
};

const mapStateToProps = (state) => ({
  allCustomers: state.Customers.allCustomers,
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({ showAllCustomersOperation, addCustomerOperation, updateCustomerOperation, deleteCustomerOperation }, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Customers);
