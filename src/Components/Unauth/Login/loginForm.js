import React, { useState } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { isEqual } from 'lodash';

import Key from '../../../Assets/password.png'
import User from '../../../Assets/arroba.png'
import './style.css';


const LoginForm = ({ onClick, handleClose, loginOperation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState(false);
  const [passError, setPassError] = useState(false);
  const [emailErrorMsg, setEmailErrorMessage] = useState('');
  const [passErrorMsg, setPassErrorMessage] = useState('');
  const [loginError, setLoginErrorMessage] = useState('');

  const checkExpression = () => {
    const emailRe = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const validEmail = emailRe.test(String(username).toLowerCase());
    if (!validEmail) {
      setEmailError(true);
      setEmailErrorMessage('Please enter valid email address');
      if (username.length === 0)
        setEmailErrorMessage('Email is required');
    } else {
      setEmailError(false);
      setEmailErrorMessage('');
    }
    const passRe = /^[A-Za-z]\w{7,14}$/;
    const validPass = passRe.test(String(password).toLowerCase());
    if (!validPass) {
      setPassError(true);
      setPassErrorMessage('Please enter valid password of 8-14 characters.');
      if (password.length === 0)
        setPassErrorMessage('Password is required');
    } else {
      setPassError(false);
      setPassErrorMessage('');
    }
  }

  const setData = (e) => {
    const { ariaLabel, value } = e.target;
    if (isEqual(ariaLabel, 'Password')) {
      setPassword(value);
    }
    else {
      setUsername(value);
    }
  }

  const submitForm = () => {
    checkExpression();
    if (!emailError && !passError) {
      loginOperation({ username, password })
        .then((res) => {
          if (res.errMsg)
            setLoginErrorMessage(res.errMsg);
          else handleClose();
        })
    }
  }

  return (
    <>
      <Form.Group as={Row} className="mb-3">
        <Form.Label column sm="1" id="basic-addon1">
          <img src={User} alt="Key" className="icon" />
        </Form.Label>
        <Col sm="10">
          <Form.Control
            placeholder="Email"
            aria-label="Email"
            aria-describedby="basic-addon1"
            value={username}
            onChange={setData}
            className={emailError ? 'has-error' : ''}
          />
          <span className="error-msg">{emailErrorMsg}</span>
        </Col>
      </Form.Group>
      <Form.Group as={Row} className="mb-3">
        <Form.Label column sm="1" id="basic-addon1">
          <img src={Key} alt="Key" className="icon" />
        </Form.Label>
        <Col sm="10">
          <Form.Control
            placeholder="Password"
            aria-label="Password"
            aria-describedby="basic-addon1"
            type="password"
            value={password}
            onChange={setData}
            className={passError ? 'has-error' : ''}
          />
          <span className="error-msg">{passErrorMsg}</span>
        </Col>
      </Form.Group>
      <span className="error-msg">{loginError}</span>

      <div className="custom-modal-footer">
        <div>Want to join us?
          <button onClick={() => onClick('register')} className="click-here">
            click here.
          </button>
        </div>
        <div>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="success" onClick={submitForm}>
            Login
          </Button>
        </div>
      </div>
    </>
  );
}

export default LoginForm;
