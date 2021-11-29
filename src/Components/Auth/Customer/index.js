import React, { useEffect, useState } from 'react';
import { isEqual, map } from 'lodash';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Orders from '../Modules/Orders';
import Incidents from '../Modules/Incidents'
import Chats from '../Modules/Chats';
import Profile from '../Modules/Profile';
import { showAllEmployeesOperation } from '../../../State/Employees/operations';

const CustomerPanel = ({ selectedMenu, actions }) => {
  const [receiver, setReceiver] = useState({});
  useEffect(() => {
    actions.showAllEmployeesOperation()
    .then((res) => {
      map(res, usr => {
        if (isEqual(usr.type, 'manager')) {
          setReceiver(usr);
        }
      })
    });
  }, []);
  return (
    <>
      {isEqual(selectedMenu, 'manage-orders') && <Orders isManager={false} />}
      {isEqual(selectedMenu, 'chat-user') && <Chats isManager={false} manager={receiver} />}
      {isEqual(selectedMenu, 'manage-incidents') && <Incidents isManager={false} />}
      {isEqual(selectedMenu, 'profile') && <Profile />}
    </>
  );
}

const mapStateToProps = (state) => ({
  showAllEmployees: state.Employees.showAllEmployees,
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({ showAllEmployeesOperation }, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(CustomerPanel);
