import React from 'react';
import { isEqual } from 'lodash';

import Customers from '../Modules/Customers';
import Report from '../Modules/Reports';
import Equipments from '../Modules/Equipments';
import Employees from '../Modules/Employees';
import Orders from '../Modules/Orders';
import Profile from '../Modules/Profile';

const AdminPanel = ({ selectedMenu }) => (
  <>
    {isEqual(selectedMenu, 'manage-orders') && <Orders isManager={true} />}
    {isEqual(selectedMenu, 'manage-customers') && <Customers />}
    {isEqual(selectedMenu, 'manage-employees') && <Employees />}
    {isEqual(selectedMenu, 'manage-equipments') && <Equipments />}
    {isEqual(selectedMenu, 'manage-report') && <Report />}
    {isEqual(selectedMenu, 'profile') && <Profile isManager={true} />}
  </>
);

export default AdminPanel;
