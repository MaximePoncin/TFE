import { ADD_STAY, UPDATE_STAY, REMOVE_STAY } from '../constants/action-types';
import _ from 'lodash';

const initialState = {
  loggedIn: false,
  stays: [{id: "Test"}, {id: "Testeuh !"}],
};

const rootReducer = (state = initialState, action) => {
  switch(action.type) {
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
