import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import './style.css';
import LoginForm from './loginForm'
import RegisterForm from './registerForm'
import { loginOperation, registerOperation } from '../../../State/Users/operations';

const AuthModal = ({ show, handleClose, actions, currentUser }) => {
  const [isLoginForm, setLoginForm] = useState(true);

  const closeModal = () => {
    setLoginForm(true);
    handleClose();
  };

  return (
    <Modal show={show}>
      <Modal.Header>
        <Modal.Title>{isLoginForm ? 'Login' : 'Register'}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {isLoginForm
          ? (
            <LoginForm
              handleClose={closeModal}
              onClick={() => setLoginForm(false)}
              loginOperation={actions.loginOperation}
            />
          )
          : (
            <RegisterForm
              handleClose={closeModal}
              onClick={() => setLoginForm(true)}
              registerOperation={actions.registerOperation}
            />
          )
        }
      </Modal.Body>
    </Modal>
  );
}

const mapStateToProps = (state) => ({
  currentUser: state.Users.currentUser,
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({ loginOperation, registerOperation }, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(AuthModal);

