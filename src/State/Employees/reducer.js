import { cloneDeep, findIndex } from "lodash";

import { SHOW_ALL_EMPLOYEES, ADD_EMPLOYEE, UPDATE_EMPLOYEE, DELETE_EMPLOYEE } from './types';

const initialState = {
  allEmps: [],
};

const EmployeeReducer = (state = initialState, action) => {
  let tempEmpList = cloneDeep(state.allEmps);
  switch (action.type) {
    case SHOW_ALL_EMPLOYEES:
      return {
        ...state,
        allEmps: state.allEmps,
      }
    case ADD_EMPLOYEE:
      tempEmpList.push({ ...action.data, id: tempEmpList.length + 1 });
      return {
        ...state,
        allEmps: tempEmpList,
      };
    case DELETE_EMPLOYEE:
      const i = findIndex(tempEmpList, action.data);
      tempEmpList.splice(i, 1);
      return {
        ...state,
        allEmps: tempEmpList,
      };
    case UPDATE_EMPLOYEE:
      let index = findIndex(tempEmpList, { id: action.data.id });
      tempEmpList[index] = action.data;
      return {
        ...state,
        allEmps: tempEmpList,
      };
    default:
      return state;
  }
};

export default EmployeeReducer;