import { combineReducers } from 'redux';

import Users from './Users/reducer';
import Customers from './Customers/reducer';
import Equipments from './Equipments/reducer';
import Employees from './Employees/reducer';
import Orders from './Orders/reducer';
import Incidents from './Incidents/reducer';

const rootReducer = combineReducers({
  Users,
  Customers,
  Equipments,
  Employees,
  Orders,
  Incidents,
});

export default rootReducer;