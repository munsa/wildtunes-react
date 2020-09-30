import api from '../shared/utils/api';
import { ActionAuthType } from './type-enum';
import { setAlert } from './alert';
import setAuthToken from '../shared/utils/setAuthToken';
import { AlertType } from '../shared/constants/constants';
import PubSub from 'pubsub-js';
import {EVENT_SHOW_REGISTER_ERRORS} from '../components/layout/appNavbar/AuthDropdown/AuthDropdownRegister/AuthDropdownRegister';

// Load User
export const loadUser = () => async dispatch => {
  if(localStorage.token) {
    setAuthToken(localStorage.token)
  }

  try {
    const res = await api.get('/auth/user');

    dispatch({
      type: ActionAuthType.USER_LOADED,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: ActionAuthType.AUTH_ERROR
    });
  }
};

// Register User
export const register = ({ username, email, password }) => async dispatch => {
  const body = JSON.stringify({ username, email, password });

  try {
    const res = await api.post('/auth/register', body);

    dispatch({
      type: ActionAuthType.REGISTER_SUCCESS,
      payload: res.data
    });

    dispatch(loadUser());
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      PubSub.publish(EVENT_SHOW_REGISTER_ERRORS, errors);
    }
    dispatch({ type: ActionAuthType.REGISTER_FAIL });
  }
};

// Login User
export const login = (email, password) => async dispatch => {
  const body = JSON.stringify({ email, password });

  try {
    const res = await api.post('/auth/login', body);

    dispatch({
      type: ActionAuthType.LOGIN_SUCCESS,
      payload: res.data
    });

    dispatch(loadUser());
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert({ type: AlertType.ERROR, msg: error.msg })));
    }
    dispatch({ type: ActionAuthType.LOGIN_FAIL });
  }
};

// Logout
export const logout = () => dispatch => {
  dispatch({ type: ActionAuthType.LOGOUT });
};
