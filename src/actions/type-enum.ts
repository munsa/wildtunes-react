export enum ActionAlertType {
  SET_ALERT = 'SET_ALERT',
  REMOVE_ALERT = 'REMOVE_ALERT'
}

export enum ActionAuthType {
  REGISTER_SUCCESS = 'REGISTER_SUCCESS',
  REGISTER_FAIL = 'REGISTER_FAIL',
  USER_LOADED = 'USER_LOADED',
  AUTH_ERROR = 'AUTH_ERROR',
  LOGIN_SUCCESS = 'LOGIN_SUCCESS',
  LOGIN_FAIL = 'LOGIN_FAIL',
  LOGOUT = 'LOGOUT',
  LOGOUT_FAIL = 'LOGOUT_FAIL'
}

export enum ActionRecordingType {
  SEND_RECORDING = 'SEND_RECORDING',
  GET_RECORDING = 'GET_RECORDING',
  GET_ALL_RECORDINGS = 'GET_ALL_RECORDING',
  SET_RECORDING_DATA = 'SET_RECORDING_DATA',
  STOP_PLAYER = 'STOP_PLAYER',
  CLOSE_RECORDING_RESULT_MODAL = 'CLOSE_RECORDING_RESULT_MODAL'
}

export enum ActionDevelopmentModeType {
  ENABLE_DEVELOPMENT_MODE = 'ENABLE_DEVELOPMENT_MODE',
  DISABLE_DEVELOPMENT_MODE = 'DISABLE_DEVELOPMENT_MODE'
}

export enum ActionProfileType {
  GET_PROFILE = 'GET_PROFILE',
  PROFILE_ERROR = 'PROFILE_ERROR'
}