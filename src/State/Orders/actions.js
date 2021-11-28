import { SHOW_ALL_ORDERS, ADD_ORDER, UPDATE_ORDER, DELETE_ORDER } from './types';

export const showAllOrders = (data) => ({
  type: SHOW_ALL_ORDERS,
  data,
});

export const addOrder = (data) => ({
  type: ADD_ORDER,
  data
});

export const updateOrder = (data) => ({
  type: UPDATE_ORDER,
  data
});

export const deleteOrder = (data) => ({
  type: DELETE_ORDER,
  data
});