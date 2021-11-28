import { cloneDeep, findIndex } from "lodash";

import { SHOW_ALL_EQUIPMENTS, ADD_EQUIPMENT, UPDATE_EQUIPMENT, DELETE_EQUIPMENT } from './types';

const initialState = {
  allEquipments: [],
};

const EquipmentReducer = (state = initialState, action) => {
  let tempEquipList = cloneDeep(state.allEquipments);
  switch (action.type) {
    case SHOW_ALL_EQUIPMENTS:
      return {
        ...state,
        allEquipments: state.allEquipments,
      }
    case ADD_EQUIPMENT:
      tempEquipList.push({ ...action.data, id: tempEquipList.length + 1 });
      return {
        ...state,
        allEquipments: tempEquipList,
      };
    case DELETE_EQUIPMENT:
      const i = findIndex(tempEquipList, action.data);
      tempEquipList.splice(i, 1);
      return {
        ...state,
        allEquipments: tempEquipList,
      };
    case UPDATE_EQUIPMENT:
      let index = findIndex(tempEquipList, { id: action.data.id });
      tempEquipList[index] = action.data;
      return {
        ...state,
        allEquipments: tempEquipList,
      };
    default:
      return state;
  }
};

export default EquipmentReducer;