import { cloneDeep, findIndex } from "lodash";

import { SHOW_ALL_ORDERS, ADD_ORDER, UPDATE_ORDER, DELETE_ORDER } from './types';

const initialState = {
  allOrders: [],
};

const OrderReducer = (state = initialState, action) => {
  let tempOrderList = cloneDeep(state.allOrders);
  switch (action.type) {
    case SHOW_ALL_ORDERS:
      return {
        ...state,
        allOrders: action.orders,
      }
    case ADD_ORDER:
      tempOrderList.push({ ...action.data, id: tempOrderList.length + 1 });
      return {
        ...state,
        allOrders: tempOrderList,
      };
    case DELETE_ORDER:
      const i = findIndex(tempOrderList, action.data.id);
      tempOrderList.splice(i, 1);
      return {
        ...state,
        allOrders: tempOrderList,
      };
    case UPDATE_ORDER:
      let index = findIndex(tempOrderList, { id: action.data.id });
      tempOrderList[index] = action.data;
      return {
        ...state,
        allOrders: tempOrderList,
      };
    default:
      return state;
  }
};

export default OrderReducer;