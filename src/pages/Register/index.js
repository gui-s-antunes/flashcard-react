import React, { useState, useEffect } from 'react';
import { isEmail } from 'validator';
import { toast } from 'react-toastify';
import { get } from 'lodash';
import { useSelector, useDispatch } from 'react-redux';

import { Container } from '../../styles/GlobalStyles';
import { Form, Title } from './styled';

import Loading from '../../components/Loading';
import * as actions from '../../store/modules/auth/actions';

import axios from '../../services/axios';
import history from '../../services/history';

export default function Register() {
  const id = useSelector((state) => state.auth.user.id);
  const emailStored = useSelector((state) => state.auth.user.email);
  const nameStored = useSelector((state) => state.auth.user.name);
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    if (!id) return;

    setName(nameStored);
    setEmail(emailStored);
  }, [id, nameStored, emailStored]);

  async function handleSubmit(e) {
    e.preventDefault();

    const formErrors = [];

    if (name.length < 3 || name.length > 255)
      formErrors.push('Username must be on a range of 3 to 255 characters!');

    if (!isEmail(email)) formErrors.push('Invalid email!');

    if (!id && (password.length < 6 || password.length > 50))
      formErrors.push('Password must be on a range of 6 to 50 characters!');

    if (formErrors.length) {
      formErrors.forEach((error) => toast.error(error));
      return;
    }

    dispatch(actions.registerRequest({ name, email, password, id }));

    try {
      setIsLoading(true);
      await axios.post('/users/', {
        name,
        password,
        email,
      });

      toast.success('User has been registered!');
      history.push('/login');
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      const errors = get(err, 'response.data.errors', []);
      errors.map((error) => toast.error(error));
    }
  }

  return (
    <Container>
      <Loading isLoading={isLoading} />
      <Title>{id ? 'Edit your account' : 'Register a new account'}</Title>
      <Form onSubmit={handleSubmit}>
        <label htmlFor="name">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Insert a username..."
          />
        </label>
        <label htmlFor="email">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Insert a valid email..."
          />
        </label>
        <label htmlFor="password">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Insert a password..."
          />
        </label>
        <button type="submit">
          {id ? 'Edit account' : 'Register a new user!'}
        </button>
      </Form>
    </Container>
  );
}
