import axios from 'axios';
import config from '../config';
import * as types from './actionTypes';

export const fetchRooms = (date, rooms) => ({
  type: types.FETCH_ROOMS,
  rooms,
  date,
});

const updateRoomsFetchingStatus = areRoomsFetching => ({
  type: types.UPDATE_ROOMS_FETCHING_STATUS,
  areRoomsFetching,
});

export const selectDate = selectedDate => ({
  type: types.SELECT_DATE,
  selectedDate,
});

export const selectRoom = selectedRoom => ({
  type: types.SELECT_ROOM,
  selectedRoom,
});

export const fetchRoomsError = fetchError => ({
  type: types.FETCH_ROOMS_ERROR,
  fetchError,
});

export const changeDate = date => (dispatch) => {
  dispatch(selectDate(date));
  dispatch(updateRoomsFetchingStatus(true));
  dispatch(fetchRoomsError(null));
  axios.post(config.fetchrooms, { date }).then((response) => {
    dispatch(fetchRooms(date, response.data));
    dispatch(updateRoomsFetchingStatus(false));
  }).catch((error) => {
    dispatch(fetchRoomsError(error.message));
    dispatch(updateRoomsFetchingStatus(false));
  });
};

