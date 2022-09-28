import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaTrashAlt, FaPencilAlt, FaPlus } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { get } from 'lodash';

import { Container } from '../../styles/GlobalStyles';
import { AddDeck, Title, DecksStyle, UserDeck } from './styled';
import Loading from '../../components/Loading';
import axios from '../../services/axios';

export default function Decks() {
  // Pegar decks do usuário antes
  const [decks, setDecks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState('');

  useEffect(() => {
    async function getData() {
      setIsLoading(true);
      const response = await axios.get('/decks');
      setDecks(response.data);
      setIsLoading(false);
    }
    getData();
  }, []);

  const handleDeckDelete = async (e, deckId, deckName, index) => {
    if (
      !window.confirm(
        `Do you want to delete deck '${deckName}'? All its cards are to be deleted too, are you sure?`
      )
    )
      return;

    try {
      setIsLoading(true);
      await axios.delete(`/decks/${deckId}`);
      toast.success(`Deck '${deckName}' has been delete for good!`);
      setIsLoading(false);
      const newDecks = [...decks];
      newDecks.splice(index, 1);
      setDecks(newDecks);
    } catch (err) {
      setIsLoading(false);
      // const status = get(err, 'response.status', 0);
      const data = get(err, 'response.data', {});
      const errors = get(data, 'errors', []);

      if (errors.length > 0) {
        errors.map((error) => toast.error(error));
      } else {
        toast.error('Erro desconhecido');
      }
    }

    // if (decks[deckId].Cards.length > 0) {
    //   toast.error('O Deck possui Cards. Mova ou exclua as Cards antes!');
    // }
  };

  const handleCreateDeck = async () => {
    const formErrors = [];

    if (name.length < 1 || name.length > 100)
      formErrors.push('Create a new deck with a range of 1 to 100 characters!');

    if (formErrors.length) {
      formErrors.forEach((error) => toast.error(error));
      return;
    }

    if (!window.confirm(`Do you want to create deck '${name}?'`)) return;

    try {
      setIsLoading(true);
      const { data } = await axios.post('/decks/', { name });
      toast.success(`Deck '${name}' criado!`);
      setIsLoading(false);

      const newDecks = [...decks];
      newDecks.unshift(data);
      setDecks(newDecks);
    } catch (err) {
      setIsLoading(false);
      // const status = get(err, 'response.status', 0);
      const data = get(err, 'response.data', {});
      const errors = get(data, 'errors', []);

      if (errors.length > 0) {
        errors.map((error) => toast.error(error));
      } else {
        toast.error('Erro desconhecido');
      }
    }
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
      <Title>Decks Management</Title>
      <AddDeck>
        <label htmlFor="name">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Create a new Deck here..."
          />
        </label>
        <button type="button" onClick={handleCreateDeck}>
          <FaPlus size={16} />
        </button>
      </AddDeck>
      <DecksStyle>
        {decks
          ? decks.map((deck, index) => (
              <div key={deck.id}>
                <UserDeck>
                  <span>{deck.name}</span>
                  <FaTrashAlt
                    size={16}
                    onClick={(e) =>
                      handleDeckDelete(e, deck.id, deck.name, index)
                    }
                    to={`/deck/${deck.id}/delete`}
                  />

                  <Link to={`/deck/${deck.id}/edit`}>
                    <FaPencilAlt size={16} />
                  </Link>
                </UserDeck>
              </div>
            ))
          : 'There is no decks yet, create a new one right up there!'}
      </DecksStyle>
    </Container>
  );
}
