import React from 'react';
import { isEqual } from 'lodash';

import Customers from '../Modules/Customers';
import Equipments from '../Modules/Equipments';
import Employees from '../Modules/Employees';
import Orders from '../Modules/Orders';
import Incidents from '../Modules/Incidents'
import Chats from '../Modules/Chats';
import Profile from '../Modules/Profile';

const EmployeePanel = ({ selectedMenu }) => (
  <>
    {isEqual(selectedMenu, 'manage-orders') && <Orders isManager={true} />}
    {isEqual(selectedMenu, 'manage-customers') && <Customers />}
    {isEqual(selectedMenu, 'manage-employees') && <Employees />}
    {isEqual(selectedMenu, 'manage-equipments') && <Equipments />}
    {isEqual(selectedMenu, 'chat-employee') && <Chats isManager={true} />}
    {isEqual(selectedMenu, 'manage-incidents') && <Incidents isManager={true} />}
    {isEqual(selectedMenu, 'profile') && <Profile isManager={true} />}
  </>
);

export default EmployeePanel;
