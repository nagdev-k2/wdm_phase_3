import React from 'react';
import { isEmpty } from 'lodash';
import { connect } from 'react-redux';

import Home from './Components/Unauth/Home';
import AuthHome from './Components/Auth/Layout';

const Entry = ({ currentUser }) => {
  const isAuthenticated = !isEmpty(currentUser);

  return isAuthenticated ? <AuthHome type={currentUser.type} /> : <Home />;
}

const mapStateToProps = (state) => ({
  currentUser: state.Users.currentUser,
});

export default connect(mapStateToProps)(Entry);
