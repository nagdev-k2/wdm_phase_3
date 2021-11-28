import React from 'react';
import { Form, Row, Col } from 'react-bootstrap';

import Money from '../../../../Assets/money.png';

const PaymentDetails = ({payment, setData}) => {
  return (
    <>
      <Form.Group as={Row} className="mb-3">
        <Form.Label column sm="1" id="basic-addon1">
          <img src={Money} alt="Key" className="icon" />
        </Form.Label>
        <Col sm="10">
          <Form.Control
            placeholder="Card Number"
            aria-label="subTotal"
            aria-describedby="basic-addon1"
            value={payment.cardNumber}
            onChange={setData}
            required
            type="number"
            maxLength={16}
            minLength={16}
          />
        </Col>
      </Form.Group>
      <Form.Group as={Row} className="mb-3">
        <Col sm="5">
          <Form.Control
            placeholder="Expiry Date"
            aria-label="expDate"
            aria-describedby="basic-addon1"
            value={payment.expDate}
            onChange={setData}
            required
            type="number"
            maxLength={4}
            minLength={4}
          />
        </Col>
        <Col sm="5">
          <Form.Control
            placeholder="CVV"
            aria-label="cvv"
            aria-describedby="basic-addon1"
            value={payment.cvv}
            onChange={setData}
            required
            type="password"
            maxLength={3}
            minLength={3}
          />
        </Col>
      </Form.Group>
    </>
  );
};

export default PaymentDetails;