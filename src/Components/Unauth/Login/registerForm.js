import React, { useRef, useState } from 'react';
import emailjs from 'emailjs-com';
import Alert from 'react-bootstrap/Alert';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { isEqual } from 'lodash';

import Key from '../../../Assets/padlock.png'
import User from '../../../Assets/arroba.png'
import Address from '../../../Assets/address.png'
import Phone from '../../../Assets/phone.png'
import Name from '../../../Assets/name.png'
import './style.css';


const RegisterForm = ({ onClick, handleClose, registerOperation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [address, setAddress] = useState('');
  const [mobileNo, setMobileNo] = useState('');
  const [name, setName] = useState('');
  const [emailError, setEmailError] = useState(false);
  const [passError, setPassError] = useState(false);
  const [nameError, setNameError] = useState(false);
  const [mobError, setMobError] = useState(false);
  const [addError, setAddError] = useState(false);
  const [emailErrorMsg, setEmailErrorMessage] = useState('');
  const [passErrorMsg, setPassErrorMessage] = useState('');
  const [nameErrorMsg, setNameErrorMessage] = useState('');
  const [mobErrorMsg, setMobErrorMessage] = useState('');
  const [addErrorMsg, setAddErrorMessage] = useState('');
  const [responseError, setResponseErrorMsg] = useState('');
  const form = useRef();
  const [alertMessage, setAlertMessage] = useState('');
  const [isErrorSendingEmail, setErrorSendingEmail] = useState(false);

  const checkExpression = () => {
    const emailRe = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const validEmail = emailRe.test(String(username).toLowerCase());
    let nameEr = false;
    let passEr = false;
    let userNameEr = false;
    let addEr = false;
    let phoneEr = false;
    if (!validEmail) {
      userNameEr = true;
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
      passEr = true;
      setPassError(true);
      setPassErrorMessage('Please enter valid password (must be between 8-14 characters)');
      if (password.length === 0)
        setPassErrorMessage('Password is required');
    } else {
      setPassError(false);
      setPassErrorMessage('');
    }
    if (isEqual(name.trim().length, 0)) {
      nameEr = true;
      setNameError(true);
      setNameErrorMessage('Name is required');
    } else {
      setNameError(false);
      setNameErrorMessage('');
    }
    if (isEqual(mobileNo.length, 0) || mobileNo.length < 10) {
      phoneEr = true;
      setMobError(true);
      setMobErrorMessage('Enter Valid Mobile Number');
    } else {
      setMobError(false);
      setMobErrorMessage('');
    }
    if (isEqual(address.trim().length, 0)) {
      addEr = true;
      setAddError(true);
      setAddErrorMessage('Address is required');
    } else {
      setAddError(false);
      setAddErrorMessage('');
    }
    if (nameEr || addEr || phoneEr || userNameEr || passEr)
      return false;
    else return true;
  }

  const setData = (e) => {
    const { ariaLabel, value } = e.target;
    if (isEqual(ariaLabel, 'Email')) setUsername(value);
    if (isEqual(ariaLabel, 'Password')) setPassword(value);
    if (isEqual(ariaLabel, 'Address')) setAddress(value);
    if (isEqual(ariaLabel, 'Name')) setName(value);
    if (isEqual(ariaLabel, 'Mobile No') && value.length <= 10) setMobileNo(value);
  }

  const submitForm = async (e) => {
    const isValid = checkExpression();
    if (isValid) {
      const response = await registerOperation({
        email: username, name, password, address, mobileNo, type: 'customer'
      });
      if (response && response.status !== "true") {// && response.errorMsg) {
        setResponseErrorMsg(response.msg);
      } else {

        emailjs.sendForm('service_end4pxm', 'template_0qq6na4', form.current, 'user_Lixv7nn8Am6BYI6aiQ1lz')
          .then((result) => {
            setAlertMessage('Registered Successfully');
            setTimeout(() => setAlertMessage(''), 5000);
            setErrorSendingEmail(false);
            handleClose();
          }, (error) => {
            setAlertMessage('Somthing went wrong');
            setTimeout(() => setAlertMessage(''), 5000);
            setErrorSendingEmail(true);
          });

        handleClose();
      }
    }
  }

  return (
    <>
      <form ref={form}>
        <input className="user-name" type="text" hidden="true" onChange={() => { }} name="UserName" value={name}></input>
        <input className="user-email" type="text" hidden="true" name="UserEmail" onChange={() => { }} value={username}></input>
      </form>
      <Form.Group as={Row} className="mb-3">
        <Form.Label column sm="1" id="basic-addon1">
          <img src={Name} alt="Key" className="icon" />
        </Form.Label>
        <Col sm="10">
          <Form.Control
            placeholder="Name"
            aria-label="Name"
            aria-describedby="basic-addon1"
            value={name}
            onChange={setData}
            className={nameError ? 'has-error' : ''}
            required
          />
          <span className="error-msg">{nameErrorMsg}</span>
        </Col>
      </Form.Group>
      <Form.Group as={Row} className="mb-3">
        <Form.Label column sm="1" id="basic-addon1">
          <img src={Phone} alt="Key" className="icon" />
        </Form.Label>
        <Col sm="10">
          <Form.Control
            placeholder="Mobile No"
            aria-label="Mobile No"
            aria-describedby="basic-addon1"
            value={mobileNo}
            onChange={setData}
            className={mobError ? 'has-error' : ''}
            required
            type="number"
          />
          <span className="error-msg">{mobErrorMsg}</span>
        </Col>
      </Form.Group>
      <Form.Group as={Row} className="mb-3">
        <Form.Label column sm="1" id="basic-addon1">
          <img src={Address} alt="Key" className="icon" />
        </Form.Label>
        <Col sm="10">
          <Form.Control
            placeholder="Address"
            aria-label="Address"
            aria-describedby="basic-addon1"
            value={address}
            onChange={setData}
            className={addError ? 'has-error' : ''}
            required
          />
          <span className="error-msg">{addErrorMsg}</span>
        </Col>
      </Form.Group>
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
            required
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
            required
          />
          <span className="error-msg">{passErrorMsg}</span>
        </Col>
      </Form.Group>
      <span className="error-msg">{responseError}</span>
      <div className="custom-modal-footer">
        <div>Already a member?
          <button onClick={() => onClick('register')} className="click-here">
            click here
          </button>
        </div>
        <div>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          {/* <Button variant="success" onClick={submitForm}> */}
          <Button variant="success" onClick={submitForm}>
            Register & Login
          </Button>
        </div>
      </div>
      {alertMessage.length > 0 && (<Alert variant={isErrorSendingEmail ? 'danger' : 'success'}>
        {alertMessage}            </Alert>)}
    </>
  );
}

export default RegisterForm;
