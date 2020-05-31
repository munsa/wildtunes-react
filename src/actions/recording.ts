import axios from 'axios';
import {RecordingType} from './type-enum';

export const sendRecording = (audioBlob) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  };

  try {
    dispatch({
      type: RecordingType.SEND_RECORDING
    });

    const res = await axios.post('/api/recording', audioBlob, config);

    dispatch({
      type: RecordingType.RECORDING_RESULT_SUCCESS,
      payload: res.data
    });
  } catch (err) {
    const errors = err.response.data.errors;
    dispatch({
      type: RecordingType.RECORDING_RESULT_FAIL,
      payload: {msg: err.response.statusText, status: err.response.status }
    });
    console.log(errors);
  }
};