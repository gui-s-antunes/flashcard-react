import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaTrash, FaEdit } from 'react-icons/fa';

import { Container } from '../../styles/GlobalStyles';
import {} from './styled';
import Loading from '../../components/Loading';
import axios from '../../services/axios';

export default function Deck() {
  return (
    <Container>
      <h1>Olá deck</h1>
    </Container>
  );
}
