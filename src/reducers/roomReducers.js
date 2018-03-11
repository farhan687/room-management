import * as types from '../actions/actionTypes';
import initialState from '../store/initialState';

export const rooms = (state = initialState.rooms, action) => {
  switch (action.type) {
    case types.FETCH_ROOMS:
      return {
        ...state,
        [action.date]: action.rooms,
      };
    default:
      return state;
  }
};

export const areRoomsFetching = (state = initialState.areRoomsFetching, action) => {
  switch (action.type) {
    case types.UPDATE_ROOMS_FETCHING_STATUS:
      return action.areRoomsFetching;
    default:
      return state;
  }
};

export const fetchError = (state = initialState.fetchError, action) => {
  switch (action.type) {
    case types.FETCH_ROOMS_ERROR:
      return action.fetchError;
    default:
      return state;
  }
};

export const selectedDate = (state = initialState.selectedDate, action) => {
  switch (action.type) {
    case types.SELECT_DATE:
      return action.selectedDate;
    default:
      return state;
  }
};

export const selectedRoom = (state = initialState.selectedRoom, action) => {
  switch (action.type) {
    case types.SELECT_ROOM:
      return action.selectedRoom;
    default:
      return state;
  }
};
