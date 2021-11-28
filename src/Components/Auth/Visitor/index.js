import React from 'react';
import { isEqual } from 'lodash';

import ScheduleDrop from '../Modules/ScheduleDrop';
import Incidents from '../Modules/Incidents'
import Chats from '../Modules/Chats';
import Profile from '../Modules/Profile';

const EmployeePanel = ({ selectedMenu }) => (
  <>
    {isEqual(selectedMenu, 'manage-orders') && <ScheduleDrop isManager={false} />}
    {isEqual(selectedMenu, 'chat-user') && <Chats isManager={false} />}
    {isEqual(selectedMenu, 'manage-incidents') && <Incidents isManager={false} />}
    {isEqual(selectedMenu, 'profile') && <Profile />}
  </>
);

export default EmployeePanel;
