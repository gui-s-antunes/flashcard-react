import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  FaHome,
  FaUserAlt,
  FaSignInAlt,
  FaPowerOff,
  FaClipboardList,
  FaBookOpen,
} from 'react-icons/fa';

import { Nav } from './styled';
import history from '../../services/history';
import * as actions from '../../store/modules/auth/actions';

export default function Header() {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  const dispatch = useDispatch();

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(actions.loginFailure());
    history.push('/');
  };

  return (
    <Nav>
      <Link to="/">
        <FaHome size={24} />
      </Link>
      {isLoggedIn ? (
        <>
          <Link to="/decks">
            <FaClipboardList size={24} />
          </Link>
          <Link to="/card">
            <FaBookOpen size={24} />
          </Link>
          <Link onClick={handleLogout} to="/logout">
            <FaPowerOff size={24} />
          </Link>
        </>
      ) : (
        <Link to="/login">
          <FaUserAlt size={24} />
        </Link>
      )}
      <Link to="/register">
        <FaSignInAlt size={24} />
      </Link>
    </Nav>
  );
}
