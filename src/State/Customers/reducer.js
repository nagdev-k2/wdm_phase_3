import { SHOW_ALL_CUSTOMERS } from './types';

const initialState = {
  allCustomers: [],
};

const CustomerReducer = (state = initialState, action) => {
  switch (action.type) {
    case SHOW_ALL_CUSTOMERS:
      return {
        ...state,
        allCustomers: state.allCustomers,
      }
    default:
      return state;
  }
};

export default CustomerReducer;