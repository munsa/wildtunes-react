import {ActionProfileType, ActionRecordingType} from './type-enum';
import api from '../shared/utils/api';
import {v4 as uuidv4} from 'uuid';
import PubSub from 'pubsub-js';
import {EVENT_SHOW_RESULT_NOT_FOUND_MODAL} from '../components/Recorder/ResultModals/RecordingNotFoundModal/RecordingNotFoundModal';
import {EVENT_SHOW_RESULT_SUCCESS_MODAL} from '../components/Recorder/ResultModals/RecordingResultSuccessModal/RecordingResultSuccessModal';

export const startRecording = () => async (dispatch) => {
  const id = uuidv4();
  dispatch({
    type: ActionRecordingType.START_RECORDING,
    payload: id
  });
}

export const sendSample = (audioChunks, geolocation, isLastTry) => async (dispatch, getState) => {
  try {
    if (isLastTry) {
      dispatch({
        type: ActionRecordingType.STOP_PLAYER
      });
    }

    // Send data
    const formData = new FormData();
    const audioBlob = new Blob(audioChunks, {type: 'audio/x-wav'});
    formData.append('audio', audioBlob, 'blob');
    formData.append('geolocation', JSON.stringify(geolocation));
    formData.append('transientId', getState().recording.current.transientId);

    const config = {headers: {'Content-Type': 'multipart/form-data'}};
    const res = await api.post('/recording/identify', formData, config);

    if (res.data) {
      // Result success
      dispatch({
        type: ActionRecordingType.GET_RECORDING_RESULT_SUCCESS,
        payload: res.data
      });
      PubSub.publish(EVENT_SHOW_RESULT_SUCCESS_MODAL);

      // Add recording to Profile if the logged user Profile is open
      if (getState().profile.currentProfile.isLoggedUser) {
        dispatch({
          type: ActionProfileType.ADD_NEW_RECORDING_TO_PROFILE,
          payload: res.data
        });
      }
    } else {
      //Result not found
      if (isLastTry) {
        PubSub.publish(EVENT_SHOW_RESULT_NOT_FOUND_MODAL);
      }
    }
  } catch (err) {
  }
};

export const getAllRecordingGeolocations = () => async dispatch => {
  const res = await api.get('/recording/allGeolocations');
  dispatch({
    type: ActionRecordingType.GET_ALL_RECORDINGS,
    payload: res.data
  });
}

export const getTrendingTunes = () => async dispatch => {
  const genreList = [
    {genreName: 'Alternative', genreAttributeName: 'alternative'},
    {genreName: 'Hip Hop', genreAttributeName: 'hipHop'},
    {genreName: 'Indie Rock', genreAttributeName: 'indieRock'},
    {genreName: 'Electro', genreAttributeName: 'electronic'},
  ];

  for (const genre of genreList) {
    const res = await api.get(`/recording/genre/${genre.genreName}?limit=10`);
    dispatch({
      type: ActionRecordingType.GET_TRENDING_LIST,
      payload: {
        genreName: genre.genreAttributeName,
        data: res.data
      }
    });
  }
}