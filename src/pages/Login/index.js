import React, { useState } from 'react';
import { isEmail } from 'validator';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { get } from 'lodash';

import * as actions from '../../store/modules/auth/actions';
import { Container } from '../../styles/GlobalStyles';
import { Form, Title } from './styled';

import Loading from '../../components/Loading';

export default function Login(props) {
  const isLoading = useSelector((state) => state.auth.isLoading);
  const prevPath = get(props, 'location.state.prevPath', '/');
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();

    const formErrors = [];

    if (!isEmail(email)) formErrors.push('Insert a valid email');
    if (password.length < 6 || password.length > 50)
      formErrors.push('Password must be on a range of 6 to 50');
    if (formErrors.length > 0) {
      formErrors.map((error) => toast.error(error));
      return;
    }

    dispatch(actions.loginRequest({ email, password, prevPath }));
  }
  return (
    <Container>
      <Loading isLoading={isLoading} />
      <Title>Log into your account</Title>
      <Form onSubmit={handleSubmit}>
        <label htmlFor="email">
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Insert you email..."
          />
        </label>
        <label htmlFor="password">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Insert your password..."
          />
        </label>
        <button type="submit">Login</button>
      </Form>
    </Container>
  );
}
