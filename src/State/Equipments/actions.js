import { SHOW_ALL_EQUIPMENTS, ADD_EQUIPMENT, UPDATE_EQUIPMENT, DELETE_EQUIPMENT } from './types';

export const showAllEquipments = () => ({
  type: SHOW_ALL_EQUIPMENTS,
});

export const addEquipment = (data) => ({
  type: ADD_EQUIPMENT,
  data
});

export const updateEquipment = (data) => ({
  type: UPDATE_EQUIPMENT,
  data
});

export const deleteEquipment = (data) => ({
  type: DELETE_EQUIPMENT,
  data
});