import { SHOW_ALL_INCIDENTS } from './types';

const initialState = {
  allIncidents: [],
};

const IncidentReducer = (state = initialState, action) => {
  switch (action.type) {
    case SHOW_ALL_INCIDENTS:
      return {
        ...state,
        allIncidents: action.data,
      }
    default:
      return state;
  }
};

export default IncidentReducer;