import { map } from 'lodash';
import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Edit from '../../../../Assets/edit.png';
import Delete from '../../../../Assets/delete.png';
import { showAllOrders, deleteOrder, addOrder, updateOrder } from '../../../../State/Orders/actions';
import '../style.css';
import FormModal from './formModal';


const DropOff = ({ actions, allOrders, isManager }) => {
  const [showFormModal, setShowFormModal] = useState(false);
  const extraOptions = isManager ? ['Expected Delivery Time', 'Employee ID', 'Customer ID', 'Payment Status'] : [];
  const tableHead = ['ID', 'Date', 'Service Type', 'Pickup Time','Sub-Total', 'Tax', 'Total', 'Payment Mode', ...extraOptions, 'Edit', 'Delete'];
  const [selectedOrder, setOrder] = useState({date: '', customerId: '', employeeId: '', serviceType: '', pickupTime:'', deliveryTime:'', paymentStatus:'', paymentMode: ''});

  const editOrder = (data) => {
    setOrder(data)
    setShowFormModal(true);
  }
  
  const deleteOrderAlert = (data) => {
    if (window.confirm('Are you sure you want to delete this entry?')) {
      actions.deleteOrder(data);
    }
  }

  return (
    <>
      <div className="customer-header">
        <h4 className="content-title left mb-0">All Drop-Offs</h4>
        <Button
          variant="transparent"
          className="round-btn"
          onClick={() => setShowFormModal(true)}
        >Add New Order</Button>
      </div>
      <table className="data-table" border="1">
        <tbody>
          <tr>
            {map(tableHead, (label, index) => (
              <th key={`${index}-head-customer`}>{label}</th>
            ))}
          </tr>
          {map(allOrders, (data, index) => (
            <tr key={`${index}-table-entries-customer`}>
              <td>{index+1}</td>
              <td>{data.date}</td>
              
              <td>{data.type}</td>
              <td>{data.pickupTime}</td>
              <td>{data.subTotal}</td>
              <td>{data.tax}</td>
              <td>{data.amount}</td>
              <td>{data.paymentMode}</td>
              {isManager && (
              <>
                <td>{data.customerId}</td>
                <td>{data.employeeId}</td>
                <td>{data.exDeliveryTime}</td>
                
                <td>{data.paymentStatus}</td>
                </>
              )}
              <td>
                <Button variant="transparent" onClick={() => editOrder(data)}>
                  <img src={Edit} alt="edit-data" className="table-btn-icon" />
                </Button>
              </td>
              <td>
                <Button variant="transparent" onClick={() => deleteOrderAlert(data)}>
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
        orderData={selectedOrder}
        addOrderAction={actions.addOrder}
        updateOrderAction={actions.updateOrder}
        setEditOrderData={setOrder}
        isManager={isManager}
      />
    </>
  );
};

const mapStateToProps = (state) => ({
  allOrders: state.Orders.allOrders,
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({ showAllOrders, addOrder, updateOrder, deleteOrder }, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(DropOff);
