import React from 'react';
import { Form, Row, Col } from 'react-bootstrap';
import { filter, isEqual, map } from 'lodash';

import Name from '../../../../Assets/name.png';
import Calendar from '../../../../Assets/calendar.png';
import Clock from '../../../../Assets/clock.png';
import Payment from '../../../../Assets/mobile-payment.png';
import PaymentMethod from '../../../../Assets/payment-method.png';
import Money from '../../../../Assets/money.png';
import Service from '../../../../Assets/service.png';
import weight from '../../../../Assets/weight.png';

const OrderDetails = ({ isManager, order, setData, isEdit, serviceTypes }) => {
  const date = new Date();
  let minDate = `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`;
  const selectedService = filter(serviceTypes, {service_type: order.service_type});
  let amount =
    (selectedService.length > 0 && selectedService[0].rate_per_pound ? selectedService[0].rate_per_pound : '') * order.weight;
  let tax = amount * 6.25 / 100;
  let total = amount + tax;
  return (
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
          min={minDate}
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
          aria-label="pickup_time"
          aria-describedby="basic-addon1"
          value={order.pickup_time}
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
        aria-label="service_type"
        className="form-select custom"
        value={order.service_type}
        onChange={setData}
      >
        <option>Select Service Type</option>
        {map(serviceTypes, (data, index) => (
          <option key={`${data.id}-${index}`} value={data.service_type}>{data.service_type}</option>
        ))}
      </select>
    </Form.Group>

    <Form.Group as={Row} className="mb-3">
      <Form.Label column sm="1" id="basic-addon1">
        <img src={weight} alt="Key" className="icon" />
      </Form.Label>
      <Col sm="10">
        <Form.Control
          placeholder="weight"
          aria-label="weight"
          aria-describedby="basic-addon1"
          value={order.weight}
          onChange={setData}
          required
          type="number"
        />
      </Col>
    </Form.Group>


    {isEdit ?
      (<> </>)
      : (
        <>
          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm="1" id="basic-addon1">
              <img src={weight} alt="Key" className="icon" />
            </Form.Label>
            <Col sm="10">
              <Form.Control
                placeholder="PickUp Address"
                aria-label="pickup_address"
                aria-describedby="basic-addon1"
                value={order.pickup_address}
                onChange={setData}
                required
                type="text"
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm="1" id="basic-addon1">
              <img src={PaymentMethod} alt="Key" className="icon" />
            </Form.Label>
            <Col sm="10" className="gender-row">
              <Form.Check
                aria-label="payment_type"
                type='radio'
                id='paymentMode'
                label='Online'
                value="Online"
                checked={isEqual(order.payment_type, 'Online')}
                onChange={setData}
              />
              <Form.Check
                aria-label="payment_type"
                type='radio'
                id='paymentMode'
                label='Cash'
                value="Cash"
                checked={isEqual(order.payment_type, 'Cash')}
                onChange={setData}
              />
            </Col>
          </Form.Group>
        </>
      )}

    {
      isManager && (
        <>
          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm="1" id="basic-addon1">
              <img src={Name} alt="Key" className="icon" />
            </Form.Label>
            <Col sm="5">
              <Form.Control
                placeholder="Customer Id"
                aria-label="customer_id"
                aria-describedby="basic-addon1"
                value={order.customer_id}
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
                aria-label="customer_pickup_time"
                aria-describedby="basic-addon1"
                value={order.customer_pickup_time}
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
                aria-label="amount"
                aria-describedby="basic-addon1"
                value={amount}
                onChange={setData}
                disabled
                type="number"
              />
            </Col>
            <Col sm="3">
              <Form.Control
                placeholder="Tax"
                aria-label="tax"
                aria-describedby="basic-addon1"
                value={tax}
                onChange={setData}
                disabled
                type="number"
              />
            </Col>
            <Col sm="3">
              <Form.Control
                placeholder="Total"
                aria-label="total"
                aria-describedby="basic-addon1"
                value={total}
                onChange={setData}
                disabled
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
                aria-label="payment_status"
                type='radio'
                id='paymentStatus'
                label='Pending'
                value="Pending"
                checked={isEqual(order.payment_status, 'Pending')}
                onChange={setData}
              />
              <Form.Check
                aria-label="payment_status"
                type='radio'
                id='paymentStatus'
                label='Complete'
                value="Complete"
                checked={isEqual(order.payment_status, 'Complete')}
                onChange={setData}
              />
            </Col>
          </Form.Group>
        </>
      )
    }
  </>
);}


export default OrderDetails;