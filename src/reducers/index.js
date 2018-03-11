import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import {
  rooms, areRoomsFetching, selectedDate, selectedRoom, fetchError,
} from './roomReducers';

// Rooms reducers will be imported here
// By default, the library expects to find the history state at state.routing
export default combineReducers({
  routing,
  rooms,
  areRoomsFetching,
  selectedDate,
  selectedRoom,
  fetchError,
});

