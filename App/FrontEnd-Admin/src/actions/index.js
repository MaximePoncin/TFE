import { LOG_IN, ADD_STAY, UPDATE_STAY, REMOVE_STAY } from '../constants/action-types';

export const logIn = values => ({
  type: LOG_IN,
  payload: values
});

export const addStay = stay => ({
  type: ADD_STAY,
  payload: stay
});

export const updateStay = (id, stay) => ({
  type: UPDATE_STAY,
  id: id,
  payload: stay
});

export const removeStay = id => ({
  type: REMOVE_STAY,
  id: id
});
