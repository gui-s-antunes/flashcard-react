import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaTrash, FaEdit } from 'react-icons/fa';

import { Container } from '../../styles/GlobalStyles';
import {} from './styled';
import Loading from '../../components/Loading';
import axios from '../../services/axios';

export default function Decks() {
  // Pegar decks do usuário antes
  const [decks, setDecks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function getData() {
      setIsLoading(true);
      const response = await axios.get('/decks');
      console.log(response.data);
      setDecks(response.data);
      setIsLoading(false);
    }
    getData();
  }, []);

  const handleDeckDelete = (e, deckId, deckName, index) => {
    if (!window.confirm(`Do you want to delete deck ${deckName}?`)) return;
    console.log('deletar', index);
  };
  return (
    <Container>
      {/*
      Exibe todos os decks criados pelo usuário logado
      Se não houver, mostre uma mensagem
      Se houver, colocar o nome do deck e junto opção de deletar, alterar e visualizar cards
      No início ou outro lugar, opção de inserir novo deck
      */}
      <Loading isLoading={isLoading} />
      <h1>Deck</h1>
      {decks
        ? decks.map((deck, index) => (
            <div key={deck.id}>
              <div>
                <span>{deck.name}</span>
                <FaTrash
                  size={36}
                  onClick={(e) =>
                    handleDeckDelete(e, deck.id, deck.name, index)
                  }
                  to={`/deck/${deck.id}/delete`}
                />

                <Link to={`/deck/${deck.id}/edit`}>
                  <FaEdit size={36} />
                </Link>
              </div>
            </div>
          ))
        : 'There is no decks yet, create a new one right up there!'}
    </Container>
  );
}
