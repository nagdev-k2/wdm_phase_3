import React, { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { isEmpty, isEqual } from 'lodash';
import { Button, Form, Col, Row } from 'react-bootstrap';

import Name from '../../../../Assets/name.png';
import Address from '../../../../Assets/address.png';
import Gender from '../../../../Assets/gender.png';
import Phone from '../../../../Assets/phone.png';
import Date from '../../../../Assets/calendar.png';
import Arroba from '../../../../Assets/arroba.png';

const FormModal = ({
  customerData,
  addCustomerAction,
  showAllCustomersOperation,
  updateCustomerAction,
  show,
  handleClose,
  setEditCustomerData,
  setAllCustomers
}) => {
  const isEdit = !isEmpty(customerData.name);
  const [customer, setCustomer] = useState({});
  const [responseError, setResponseErrorMsg] = useState('');

  useEffect(() => {
    if (isEdit) setCustomer(customerData);
  }, [customerData]);

  const setData = (e) => {
    const target = e.target.ariaLabel.charAt(0).toLowerCase() + e.target.ariaLabel.slice(1);
    if (isEqual(e.target.ariaLabel, 'Gender')) {
      setCustomer({
        ...customer,
        [target]: e.target.defaultValue,
      });
    } else {
      setCustomer({
        ...customer,
        [target]: e.target.value,
      });
    }
  }

  const submitForm = () => {
    if (isEdit) {
      updateCustomerAction(customer)
        .then((res) => {
          if (res === "true") {
            showAllCustomersOperation({})
              .then((resp) => {
                setAllCustomers(resp);
              })
            alert('Entry Updated Successfully.')
            closeModal();
          } else {
            showAllCustomersOperation({})
              .then((resp) => {
                setAllCustomers(resp);
              })
            setResponseErrorMsg(res);
            alert('Error creating entry');
          }
        })
    }
    else {
      addCustomerAction({ ...customer, type: 'visitor' })
        .then((res) => {
          if (res === "true") {
            showAllCustomersOperation({})
              .then((resp) => {
                setAllCustomers(resp);
              })
            alert('New entry created successfully.')
            closeModal();
          } else {
            showAllCustomersOperation({})
              .then((resp) => {
                setAllCustomers(resp);
              })
            setResponseErrorMsg(res);
            alert('error creating entry')

          }
        })
    }
  }

  const closeModal = () => {
    setCustomer({});
    setEditCustomerData({ name: '', gender: '', date: '', address: '', mobileNo: '' });
    setResponseErrorMsg("");
    handleClose();
  }

  return (
    <Modal show={show}>
      <Modal.Header>
        <Modal.Title>{isEdit ? 'Edit' : 'Add New'} Customer</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm="1" id="basic-addon1">
            <img src={Name} alt="Key" className="icon" />
          </Form.Label>
          <Col sm="10">
            <Form.Control
              placeholder="Vistor's Name"
              aria-label="name"
              aria-describedby="basic-addon1"
              value={customer.name}
              disabled={isEdit}
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm="1" id="basic-addon1">
            <img src={Arroba} alt="Key" className="icon" />
          </Form.Label>
          <Col sm="10">
            <Form.Control
              placeholder="Vistor's Email"
              aria-label="email"
              aria-describedby="basic-addon1"
              value={customer.email}
              disabled={isEdit}
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm="1" id="basic-addon1">
            <img src={Phone} alt="Key" className="icon" />
          </Form.Label>
          <Col sm="10">
            <Form.Control
              placeholder="Mobile No"
              aria-label="mobile_no"
              aria-describedby="basic-addon1"
              value={customer.mobile_no}
              onChange={setData}
              required
              type="number"
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm="1" id="basic-addon1">
            <img src={Address} alt="Key" className="icon" />
          </Form.Label>
          <Col sm="10">
            <Form.Control
              placeholder="Address"
              aria-label="address"
              aria-describedby="basic-addon1"
              value={customer.address}
              onChange={setData}
              required
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm="1" id="basic-addon1">
            <img src={Date} alt="Key" className="icon" />
          </Form.Label>
          <Col sm="10">
            <Form.Control
              placeholder="Date"
              aria-label="doj"
              aria-describedby="basic-addon1"
              value={customer.doj}
              onChange={setData}
              type="date"
              required
              disabled={isEdit}
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm="1" id="basic-addon1">
            <img src={Gender} alt="Key" className="icon" />
          </Form.Label>
          <Col sm="10" className="gender-row">
            <Form.Check
              aria-label="gender"
              type='radio'
              id='gender'
              label='Male'
              value="Male"
              checked={isEqual(customer.gender, 'Male')}
              onChange={setData}
              disabled={isEdit}
            />
            <Form.Check
              aria-label="gender"
              type='radio'
              id='gender'
              label='Female'
              value="Female"
              checked={isEqual(customer.gender, 'Female')}
              onChange={setData}
              disabled={isEdit}
            />
          </Col>
        </Form.Group>
        <span className="error-msg">{responseError}</span>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={closeModal}>Close</Button>
        <Button variant="success" onClick={submitForm}>Submit</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default FormModal;

