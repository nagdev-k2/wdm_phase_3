import React, { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { isEmpty, isEqual } from 'lodash';
import { Button, Form, Col, Row } from 'react-bootstrap';

import Name from '../../../../Assets/name.png';
import Address from '../../../../Assets/address.png';
import Gender from '../../../../Assets/gender.png';
import Phone from '../../../../Assets/phone.png';
import Profile from '../../../../Assets/user-profile.png';
import Card from '../../../../Assets/identity-card.png';
import Password from '../../../../Assets/lock.png';
import Arroba from '../../../../Assets/arroba.png';

const FormModal = ({
  employeeData,
  addEmployeeAction,
  updateEmployeeAction,
  show,
  handleClose,
  setEditEmployeeData,
  isAdmin,
  showAllEmployeesOperation,
  setAllEmployees,
}) => {
  const isEdit = !isEmpty(employeeData.name);
  const [employee, setEmployee] = useState({});
  const [responseError, setResponseErrorMsg] = useState('');

  useEffect(() => {
    if (isEdit) setEmployee(employeeData);
  }, [employeeData]);

  const setData = (e) => {
    const target = e.target.ariaLabel;
    if (isEqual(target, 'gender')) {
      setEmployee({
        ...employee,
        [target]: e.target.defaultValue,
      });
    } else if (isEqual(target, 'type')) {
      setEmployee({
        ...employee,
        [target]: e.target.value,
      });
    } else {
      setEmployee({
        ...employee,
        [target]: e.target.value,
      });
    }
  }

  const submitForm = () => {
    if (isEdit) {
      updateEmployeeAction(employee)
        .then((res) => {
          if (res) {
            showAllEmployeesOperation({})
              .then((resp) => {
                setAllEmployees(resp);
              })
            alert('Entry Updated Successfully.')
            closeModal();
          }
        })
    }
    else {
      addEmployeeAction(employee)
        .then((res) => {
          if (res === "true") {
            showAllEmployeesOperation({})
              .then((resp) => {
                setAllEmployees(resp);
              })
            alert('New entry created successfully.')
            closeModal();
          } else {
            showAllEmployeesOperation({})
              .then((resp) => {
                setAllEmployees(resp);
              })
            setResponseErrorMsg(res);
            alert('error creating record')
          }
        })
    }
  }

  const closeModal = () => {
    setEmployee({});
    setEditEmployeeData({ name: '', gender: '', date: '', address: '', mobileNo: '', type: '', last4SSN: '' });
    setResponseErrorMsg("");
    handleClose();
  }

  return (
    <Modal show={show}>
      <Modal.Header>
        <Modal.Title>{isEdit ? 'Edit' : 'Add New'} Employee</Modal.Title>
      </Modal.Header>
      <Modal.Body>

            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm="1" id="basic-addon1">
                <img src={Name} alt="Key" className="icon" />
              </Form.Label>
              <Col sm="10">
                <Form.Control
                  placeholder="Employee's Name"
                  aria-label="name"
                  aria-describedby="basic-addon1"
                  value={employee.name}
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
                  placeholder="Employee's Email"
                  aria-label="email"
                  aria-describedby="basic-addon1"
                  value={employee.email}
                  disabled={isEdit}
                />
              </Col>
            </Form.Group>
          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm="1" id="basic-addon1">
              <img src={Password} alt="Key" className="icon" />
            </Form.Label>
            <Col sm="10">
              <Form.Control
                placeholder="Employee Password"
                aria-label="password"
                aria-describedby="basic-addon1"
                value={employee.password}
                onChange={setData}
                type="password"
                required
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
              value={employee.mobile_no}
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
              value={employee.address}
              onChange={setData}
              required
            />
          </Col>
        </Form.Group>



        {isEdit ?
          (<>
            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm="1" id="basic-addon1">
                <img src={Gender} alt="Key" className="icon" />
              </Form.Label>
              <Form.Label column sm="1" id="basic-addon1">
                {employee.gender}
              </Form.Label>
              </Form.Group>
          </>)
          : <>

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
                  checked={isEqual(employee.gender, 'Male')}
                  onChange={setData}
                />
                <Form.Check
                  aria-label="gender"
                  type='radio'
                  id='gender'
                  label='Female'
                  value="Female"
                  checked={isEqual(employee.gender, 'Female')}
                  onChange={setData}
                />
              </Col>
            </Form.Group>
          </>
        }
        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm="1" id="basic-addon1">
            <img src={Profile} alt="Key" className="icon" />
          </Form.Label>
          <select
            aria-label="type"
            className="form-select custom"
            value={employee.type}
            onChange={setData}
          >
            <option>Select Employee Type</option>
            {isAdmin && <option value="manager">Manager</option>}
            <option value="Cashier">Cashier</option>
            <option value="LaundryMan">LaundryMan</option>
            <option value="Delivery/Pickup">Delivery/Pickup</option>
          </select>
        </Form.Group>
          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm="1" id="basic-addon1">
              <img src={Card} alt="Key" className="icon" />
            </Form.Label>
            <Col sm="10">
              <Form.Control
                placeholder="SSN (last 4 Digit)"
                aria-label="ssn"
                aria-describedby="basic-addon1"
                value={employee.ssn}
                onChange={setData}
                required
                type="number"
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

