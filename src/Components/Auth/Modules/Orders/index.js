import { isEqual, map } from 'lodash';
import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Edit from '../../../../Assets/edit.png';
import Delete from '../../../../Assets/delete.png';
import {
  showAllOrdersOperation,
  deleteOrderOperation,
  addOrderOperation,
  updateOrderOperation,
  getServiceTypes,
} from '../../../../State/Orders/operations';
import '../style.css';
import FormModal from './formModal';


const Orders = ({ actions, allOrders, isManager, currentUser }) => {
  const [showFormModal, setShowFormModal] = useState(false);
  const extraOptions = isManager ? ['Expected Delivery Time',  'Customer ID', 'Payment Status'] : [];
  const tableHead = ['ID', 'Date', 'Service Type', 'Pickup Time', 'Sub-Total', 'Tax', 'Total', 'Payment Mode', 'Status', ...extraOptions, 'Edit', 'Delete'];
  const [selectedOrder, setOrder] = useState({ date: '', customerId: '', serviceType: '', pickupTime: '', deliveryTime: '', paymentStatus: '', paymentMode: '' });
  const [allOrdersState, setAllOrders] = useState(allOrders);
  const [serviceTypes, setServiceTypes] = useState([]);

  useEffect(() => {
    actions.getServiceTypes()
    .then((res) => {
      setServiceTypes(res);
    })
  }, []);

  const editOrder = (data) => {
    setOrder(data)
    setShowFormModal(true);
  }

  const deleteOrderAlert = (data) => {
    if (window.confirm('Are you sure you want to delete this entry?')) {
      actions.deleteOrderOperation(data)
        .then(() => {
          actions.showAllOrdersOperation({ customerId: currentUser.id })
            .then((res) => {
              setAllOrders(res);
            })
        })
    }
  }

  useEffect(() => {
    if (isManager) {
      actions.showAllOrdersOperation({ admin: "admin" })
        .then(res => {
          setAllOrders(res);
        })
    } else {
      actions.showAllOrdersOperation({ customerId: currentUser.id })
        .then(res => {
          setAllOrders(res);
        })
    }
  }, [])

  const orderStatusUpdate = (order, status) => {
    actions.updateOrderOperation({...order, status})
      .then((res) => {
        if (res) {
          actions.showAllOrdersOperation({ admin: 'admin' })
            .then((resp) => {
              setAllOrders(resp);
            })
          alert('Entry Updated Successfully.')
        }
      })
  }

  return (
    <>
      <div className="customer-header">
        <h4 className="content-title left mb-0">All Orders</h4>
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
          {map(allOrdersState, (data, index) => {
            if (isEqual(currentUser.id, data.customer_id) || isManager){
              return (
                <tr key={`${index}-table-entries-customer`}>
                  <td>{data.id}</td>
                  <td>{data.date}</td>

                  <td>{data.service_type}</td>
                  <td>{data.pickup_time}</td>
                  <td>{data.amount}</td>
                  <td>{data.tax}</td>
                  <td>{data.total}</td>
                  <td>{data.payment_type}</td>
                  <td>{isManager && isEqual(data.status, 'NEW') ?
                    <div>
                      <Button
                        variant="success"
                        onClick={() => orderStatusUpdate(data, 'Accept')}>Accept</Button>
                      <Button
                        variant="danger"
                        onClick={() => orderStatusUpdate(data, 'Reject')}>Reject</Button>
                    </div>
                  : data.status}</td>
                  <td>{data.delivery_time}</td>
                  {isManager && (
                    <>
                      <td>{data.customer_id}</td>
                      <td>{data.payment_status}</td>
                    </>
                  )}
                  {data.status === "NEW" ? (
                    <>
                      <td>
                        <Button variant="transparent" onClick={() => editOrder(data)}>
                          <img src={Edit} alt="edit-data" className="table-btn-icon" />
                        </Button>
                      </td>
                      <td>
                        <Button disabled variant="transparent" onClick={() => deleteOrderAlert(data)}>
                          <img src={Delete} alt="delete-data" className="table-btn-icon" />
                        </Button>
                      </td>
                    </>)
                    : (
                      <>
                        <td></td>
                        <td></td>

                      </>)
                  }
                </tr>
              )
            }}
          )}
        </tbody>
      </table>
      <FormModal
        show={showFormModal}
        handleClose={() => setShowFormModal(false)}
        orderData={selectedOrder}
        addOrderAction={actions.addOrderOperation}
        updateOrderAction={actions.updateOrderOperation}
        setEditOrderData={setOrder}
        isManager={isManager}
        userId={currentUser.id}
        showAllOrdersOperation={actions.showAllOrdersOperation}
        setAllOrders={setAllOrders}
        serviceTypes={serviceTypes}
      />
    </>
  );
};

const mapStateToProps = (state) => ({
  allOrders: state.Orders.allOrders,
  currentUser: state.Users.currentUser,
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({
    showAllOrdersOperation,
    addOrderOperation,
    updateOrderOperation,
    deleteOrderOperation,
    getServiceTypes
  }, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Orders);
