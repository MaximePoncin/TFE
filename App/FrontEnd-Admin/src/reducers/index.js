import { LOG_IN, ADD_STAY, UPDATE_STAY, REMOVE_STAY } from '../constants/action-types';
import _ from 'lodash';

const initialState = {
  lang: 'en',
  loggedIn: false,
  stays: [{id: "Test"}, {id: "Testeuh !"}],
};

const rootReducer = (state = initialState, action) => {
  switch(action.type) {
    case LOG_IN:
      console.log(action.payload);
      return {
        ...state,
        loggedIn: true
      }
    case REMOVE_STAY:
      return {
        ...state,
        stays: _.filter(state.stays, stay => { return stay.id != action.id; })
      }
    default:
      return state;
  }
};

export default rootReducer;
