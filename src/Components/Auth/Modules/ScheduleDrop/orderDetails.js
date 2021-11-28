import React from 'react';
import { Form, Row, Col } from 'react-bootstrap';
import { isEqual, indexOf } from 'lodash';

import Name from '../../../../Assets/name.png';
import Calendar from '../../../../Assets/calendar.png';
import Clock from '../../../../Assets/clock.png';
import Payment from '../../../../Assets/mobile-payment.png';
import PaymentMethod from '../../../../Assets/payment-method.png';
import Money from '../../../../Assets/money.png';
import Service from '../../../../Assets/service.png';

const serviceTypes = ['All', 'Wash/Dry', 'Iron'];

const OrderDetails = ({ isManager, order, setData }) =>(
  <>
    <Form.Group as={Row} className="mb-3">
      <Form.Label column sm="1" id="basic-addon1">
        <img src={Calendar} alt="Key" className="icon" />
      </Form.Label>
      <Col sm="10">
        <Form.Control
          placeholder="Date"
          aria-label="date"
          aria-describedby="basic-addon1"
          value={order.date}
          onChange={setData}
          required
          type="date"
        />
      </Col>
    </Form.Group>
    <Form.Group as={Row} className="mb-3">
      <Form.Label column sm="1" id="basic-addon1">
        <img src={Clock} alt="Key" className="icon" />
      </Form.Label>
      <Col sm="5">
        <Form.Control
          placeholder="Pickup time"
          aria-label="pickupTime"
          aria-describedby="basic-addon1"
          value={order.pickupTime}
          onChange={setData}
          required
          type="time"
        />
      </Col>
    </Form.Group>
    <Form.Group as={Row} className="mb-3">
      <Form.Label column sm="1" id="basic-addon1">
        <img src={Service} alt="Key" className="icon" />
      </Form.Label>
      <select
        aria-label="type"
        className="form-select custom"
        value={indexOf(serviceTypes, order.type)}
        onChange={setData}
      >
        <option>Select Service Type</option>
        <option value="1">Wash/Dry/Iron</option>
        <option value="2">Wash/Dry</option>
        <option value="3">Iron</option>
      </select>
    </Form.Group>
    <Form.Group as={Row} className="mb-3">
      <Form.Label column sm="1" id="basic-addon1">
        <img src={PaymentMethod} alt="Key" className="icon" />
      </Form.Label>
      <Col sm="10" className="gender-row">
        <Form.Check
          aria-label="paymentMode"
          type='radio'
          id='paymentMode'
          label='Online'
          value="Online"
          checked={isEqual(order.paymentMode, 'Online')}
          onChange={setData}
        />
        <Form.Check
          aria-label="paymentMode"
          type='radio'
          id='paymentMode'
          label='Cash / Card'
          value="Cash/Card"
          checked={isEqual(order.paymentMode, 'Cash/Card')}
          onChange={setData}
        />
      </Col>
    </Form.Group>
    {isManager && (
      <>
        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm="1" id="basic-addon1">
            <img src={Name} alt="Key" className="icon" />
          </Form.Label>
          <Col sm="5">
            <Form.Control
              placeholder="Customer Id"
              aria-label="customerId"
              aria-describedby="basic-addon1"
              value={order.customerId}
              onChange={setData}
              required
            />
          </Col>
          <Col sm="5">
            <Form.Control
              placeholder="Employee Id"
              aria-label="employeeId"
              aria-describedby="basic-addon1"
              value={order.employeeId}
              onChange={setData}
              required
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm="1" id="basic-addon1">
            <img src={Clock} alt="Key" className="icon" />
          </Form.Label>
          <Col sm="5">
            <Form.Control
              placeholder="Expected Delivery time"
              aria-label="exDeliveryTime"
              aria-describedby="basic-addon1"
              value={order.exDeliveryTime}
              onChange={setData}
              required
              type="time"
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm="1" id="basic-addon1">
            <img src={Money} alt="Key" className="icon" />
          </Form.Label>
          <Col sm="4">
            <Form.Control
              placeholder="Sub Total"
              aria-label="subTotal"
              aria-describedby="basic-addon1"
              value={order.subTotal}
              onChange={setData}
              required
              type="number"
            />
          </Col>
          <Col sm="3">
            <Form.Control
              placeholder="Tax"
              aria-label="tax"
              aria-describedby="basic-addon1"
              value={order.tax}
              onChange={setData}
              required
              type="number"
            />
          </Col>
          <Col sm="3">
            <Form.Control
              placeholder="Amount"
              aria-label="amount"
              aria-describedby="basic-addon1"
              value={order.amount}
              onChange={setData}
              required
              type="number"
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm="1" id="basic-addon1">
            <img src={Payment} alt="Key" className="icon" />
          </Form.Label>
          <Col sm="10" className="gender-row">
            <Form.Check
              aria-label="paymentStatus"
              type='radio'
              id='paymentStatus'
              label='Pending'
              value="Pending"
              checked={isEqual(order.paymentStatus, 'Pending')}
              onChange={setData}
            />
            <Form.Check
              aria-label="paymentStatus"
              type='radio'
              id='paymentStatus'
              label='Complete'
              value="Complete"
              checked={isEqual(order.paymentStatus, 'Complete')}
              onChange={setData}
            />
          </Col>
        </Form.Group>
      </>
    )}
  </>
);


export default OrderDetails;