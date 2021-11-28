import { cloneDeep } from 'lodash';

import { users } from '../staticData';
import { LOGIN, LOGOUT, REGISTER } from './types';

const initialState = {
  allUsers: users,
  currentUser: {},  
};

const UsersReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        currentUser: action.data,
      };
    case REGISTER:
      const allNewUsers = cloneDeep(state.allUsers);
      allNewUsers[action.data.custType].push(action.data);
      return {
        ...state,
        currentUser: action.data,
        allUsers: allNewUsers,
      };
    case LOGOUT:
      return initialState;
    default:
      return state;
  }
};

export default UsersReducer;