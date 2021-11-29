import React, { useState } from 'react';
import  { connect } from 'react-redux';
import { isEqual } from 'lodash';

import Header from './header';
import SidePanel from './sidePanel';
import './style.css';
import MenuOptions from './sideMenu';
import Admin from '../Admin';
import Employee from '../Employee';
import Customer from '../Customer';
import Visitor from '../Visitor';

const Layout = ({ currentUser }) => {
  let { type } = currentUser;
  if (isEqual(type, 'Cashier') || isEqual(type, 'LaundryMan'))
    type="manager"
  const [selectedMenu, setMenu] = useState(MenuOptions[type][0].id);
  
  const selectMenu = (id) => {
    setMenu(id);
  };
  return (
    <div className="auth-content">
      <Header type={type} />
      <div className="auth-container">
        <SidePanel availableMenu={MenuOptions[type]} selectMenu={selectMenu} selectedMenu={selectedMenu} />
        <div className="sidemenu-content" id="sidemenu-content">
          {isEqual(currentUser.type, 'admin') && <Admin selectedMenu={selectedMenu} />}
          {isEqual(currentUser.type, 'manager') && <Employee selectedMenu={selectedMenu} />}
          {isEqual(currentUser.type, 'customer') && <Customer selectedMenu={selectedMenu} />}
          {isEqual(currentUser.type, 'visitor') && <Visitor selectedMenu={selectedMenu} />}
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = (state) => ({
  currentUser: state.Users.currentUser,
});

export default connect(mapStateToProps)(Layout);
