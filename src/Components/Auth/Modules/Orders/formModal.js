import React, { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { isEmpty, isEqual } from 'lodash';
import { Button } from 'react-bootstrap';

import OrderDetails from './orderDetails';
import PaymentDetails from './paymentDetails';

const FormModal = ({
  orderData,
  addOrderAction,
  updateOrderAction,
  show,
  handleClose,
  setEditOrderData,
  isManager,
  userId,
  showAllOrdersOperation,
  setAllOrders,
  serviceTypes,
}) => {
  const isEdit = !isEmpty(orderData.date);
  const [order, setOrder] = useState({});
  const [payment, setPayment] = useState({ cvv: '', expDate: '', cardNumber: '' });
  const [showOrderDetails, setShowOrderDetails] = useState(true);

  useEffect(() => {
    if (isEdit) setOrder(orderData);
  }, [orderData]);

  const setPaymentData = (e) => {
    const target = e.target.ariaLabel;
    setPayment({
      ...order,
      [target]: e.target.value,
    });
  }

  const setData = (e) => {
    const target = e.target.ariaLabel.charAt(0).toLowerCase() + e.target.ariaLabel.slice(1);
    if (isEqual(target, 'payment_type') || isEqual(target, 'payment_status')) {
      setOrder({
        ...order,
        [target]: e.target.defaultValue,
      });
    } else if (isEqual(target, 'type')) {
      setOrder({
        ...order,
        [target]: e.target.value,
      });
    } else {
      setOrder({
        ...order,
        [target]: e.target.value,
      });
    }
  }

  const submitForm = () => {
    if (isEdit) {
      updateOrderAction(order)
        .then((res) => {
          if (res) {
            let param = {customerId: userId};
            if (isManager) 
              param = {admin: "admin"};
            showAllOrdersOperation(param)
              .then((resp) => {
                setAllOrders(resp);
              })
            alert('Entry Updated Successfully.')
          }
        })
    }
    else {
      addOrderAction({ ...order, customerId: userId })
        .then((res) => {
          if (res) {
            let param = {customerId: userId};
            if (isManager) 
              param = {admin: "admin"};
            showAllOrdersOperation(param)
              .then((resp) => {
                setAllOrders(resp);
              })
            alert('New entry created successfully.')
          }
        })
    }
    setShowOrderDetails(true);
    closeModal();
  }

  const closeModal = () => {
    setOrder({});
    setShowOrderDetails(true);
    setPayment({});
    setEditOrderData({ date: '', customerId: '', employeeId: '', serviceType: '', orderTime: '', pickupTime: '', deliveryTime: '', paymentStatus: '', paymentMode: '' });
    handleClose();
  }

  const createOrder = () => {
    if (isManager || !showOrderDetails || isEdit) submitForm()
    else setShowOrderDetails(false);
  }

  return (
    <Modal show={show}>
      <Modal.Header>
        <Modal.Title>{isEdit ? 'Edit' : 'Add New'} Order</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {showOrderDetails
          ? <OrderDetails serviceTypes={serviceTypes} order={order} setData={setData} isManager={isManager} isEdit={isEdit} />
          : <PaymentDetails payment={payment} setData={setPaymentData} />
        }
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={closeModal}>Close</Button>
        <Button variant="success" onClick={createOrder}>{(isManager || isEdit) ? 'Submit' : 'Pay'}</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default FormModal;

