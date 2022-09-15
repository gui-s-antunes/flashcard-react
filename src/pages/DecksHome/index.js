import React, { useState, useEffect } from 'react';
import { isEmpty } from 'lodash';
import { FaBook } from 'react-icons/fa';
import { Link } from 'react-router-dom';

import Loading from '../../components/Loading';
import axios from '../../services/axios';
import { getDecksWithStudy } from '../../utils/get-decks-with-study';

import { Container } from '../../styles/GlobalStyles';
import { Title, DecksStyle, UserDeck } from './styled';

export default function DecksHome() {
  const [decks, setDecks] = useState([]);
  const [decksWithStudy, setDecksWithStudy] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    console.log(decks.length);
    if (decks.length > 0) return;

    async function getDecks() {
      setIsLoading(true);
      const { data } = await axios.get('/decks');
      console.log(data);
      setDecks(data);
      console.log(decks);
      setIsLoading(false);
    }

    getDecks();
  }, [decks]);

  useEffect(() => {
    if (isEmpty(decks)) return;

    setDecksWithStudy(getDecksWithStudy(decks));
  }, [decks]);

  useEffect(() => {
    console.log(decksWithStudy.length);
    console.log(decksWithStudy);
  }, [decksWithStudy]);

  return (
    <Container>
      <Loading isLoading={isLoading} />
      <Title>Cards to study today</Title>
      <DecksStyle>
        {decksWithStudy.length > 0
          ? decksWithStudy.map((deck) => (
              <div key={deck.id}>
                <UserDeck>
                  <span>{deck.name}</span>

                  <Link to={`/revise/${deck.id}`}>
                    <FaBook size={16} />
                  </Link>
                  <span className="cardsNumber">
                    {deck.cardsToStudy.length}
                  </span>
                </UserDeck>
              </div>
            ))
          : 'There is no cards to study today. Have a nice day!'}
      </DecksStyle>
    </Container>
  );
}
