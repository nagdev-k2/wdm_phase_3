import { SHOW_ALL_EMPLOYEES, ADD_EMPLOYEE, UPDATE_EMPLOYEE, DELETE_EMPLOYEE } from './types';

export const showAllEmployees = () => ({
  type: SHOW_ALL_EMPLOYEES,
});

export const addEmployee = (data) => ({
  type: ADD_EMPLOYEE,
  data
});

export const updateEmployee = (data) => ({
  type: UPDATE_EMPLOYEE,
  data
});

export const deleteEmployee = (data) => ({
  type: DELETE_EMPLOYEE,
  data
});