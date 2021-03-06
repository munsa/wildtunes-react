import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import {useHistory} from 'react-router-dom';
import './AuthDropdown.css';
import AuthDropdownRegister from './AuthDropdownRegister/AuthDropdownRegister';
import {Dropdown} from 'react-bootstrap';
import {login, register} from '../../../../actions/auth';
import PubSub from 'pubsub-js';
import AuthDropdownLogin from './AuthDropdownLogin/AuthDropdownLogin';
import Loader from '../../../../shared/lib/Loaders/Loader/Loader';

export const MODE_LOGIN = 'mode_login';
export const MODE_REGISTER = 'mode_register';

export const EVENT_SHOW_AUTH_DROPDOWN = 'EVENT_SHOW_AUTH_DROPDOWN';

const AuthDropdown = ({authLoading, login, register}) => {
  const history = useHistory();
  const [mode, setMode] = useState(MODE_LOGIN);
  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    let token = PubSub.subscribe(EVENT_SHOW_AUTH_DROPDOWN, showAuthDropdown);
    return () => {
      PubSub.unsubscribe(token);
    }
  }, []);

  const onToggle = (show, event, metadata) => {
    setIsOpen(show);
  }

  const showAuthDropdown = (msg, data) => {
    setIsOpen(true);
    setMode(MODE_REGISTER);
  };

  const onModeChange = (e) => {
    if (mode === MODE_LOGIN) {
      setMode(MODE_REGISTER);
    } else if (mode === MODE_REGISTER) {
      setMode(MODE_LOGIN);
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (mode === MODE_LOGIN) {
      login(e.target.username.value, e.target.password.value);
    } else if (mode === MODE_REGISTER) {
      register({
        username: e.target.username.value,
        email: e.target.email.value,
        password: e.target.password.value,
        history
      })
    }
  }

  return (
    <Dropdown show={isOpen}
              onToggle={onToggle}>
      <Dropdown.Toggle id="dropdown-custom-components" className='login-button'>
        Log in
      </Dropdown.Toggle>

      <Dropdown.Menu>
        {mode === MODE_LOGIN &&
        <AuthDropdownLogin handleModeChange={onModeChange}
                           handleSubmit={handleSubmit}/>
        }
        {mode === MODE_REGISTER &&
        <AuthDropdownRegister handleModeChange={onModeChange}
                              handleSubmit={handleSubmit}/>
        }
        {authLoading && <Loader/>}
      </Dropdown.Menu>
    </Dropdown>
  );
};

const mapStateToProps = state => ({
  authLoading: state.auth.loading
});

export default connect(mapStateToProps, {login, register})(AuthDropdown);