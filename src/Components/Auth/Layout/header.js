import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Button from 'react-bootstrap/Button';

import Logo from '../../../Assets/logo.png';
import { logoutAction } from '../../../State/Users/actions';

const Header = ({ actions, currentUser, type }) => {
  const logout = () => {
    actions.logoutAction();
  };

  return (
    <div className="auth-header">
      <img className="main-menu-logo" src={Logo} alt="logo" />
      <div className="entity-info">
        <h6 className="content-title mb-0 ml-10 round-border"> {type === 'manager' ? 'EMPLOYEE' :type.toUpperCase()} PANEL </h6>
        <div className="auth-header-right-menu">
          <img className="user-pic" src={currentUser.img} alt="user" />
          <h4>
            <Button variant="transparent" className="round-btn" onClick={logout}>
              Logout
            </Button>
          </h4>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  currentUser: state.Users.currentUser,
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({ logoutAction }, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);