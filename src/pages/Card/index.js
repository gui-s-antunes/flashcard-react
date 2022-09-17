import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { get, isEmpty } from 'lodash';
import Select from 'react-select';
import { toast } from 'react-toastify';

import axios from '../../services/axios';
import Loading from '../../components/Loading';
import { configureSelectOptions } from '../../utils/configure-select-options';

import { Container } from '../../styles/GlobalStyles';
import {
  Title,
  CardCreationContainer,
  CardContainer,
  CardStyle,
  NoDecksContainer,
  DeleteBtn,
} from './styled';
import history from '../../services/history';
// import { formatDateToBd } from '../../utils/format-date-to-bd';

export default function Card({ match }) {
  const id = get(match, 'params.id', '');
  const deckId = get(match, 'params.deck_id', '');
  const [isLoading, setIsLoading] = useState(false);

  const [card, setCard] = useState({});
  const [deck, setDeck] = useState({});
  const [decks, setDecks] = useState({});
  const [selectOptions, setSelectOptions] = useState([]);
  const [chosedOption, setChosedOptions] = useState({});

  const [front, setFront] = useState('');
  const [back, setBack] = useState('');

  useEffect(() => {
    if (!id || !deckId) return;

    async function getCard() {
      setIsLoading(true);
      const { data } = await axios.get(`/cards/${id}/${deckId}`);
      setCard(data);
      setIsLoading(false);
    }

    getCard();
  }, [id, deckId]);

  useEffect(() => {
    if (!deckId);
    async function getDecks() {
      setIsLoading(true);
      const { data } = await axios.get(`/decks/`);
      setDecks(data);
      setIsLoading(false);
    }
    getDecks();
  }, [deckId]);

  useEffect(() => {
    if (isEmpty(decks)) return;
    setDeck(
      decks
        .filter((deckz) => {
          return deckz.id === Number(deckId);
        })
        .find((obj) => !isEmpty(obj))
    );
    setSelectOptions(configureSelectOptions(decks));
  }, [decks, deckId]);

  useEffect(() => {
    setFront(card.front);
    setBack(card.back);
  }, [card]);

  useEffect(() => {
    if (isEmpty(deck)) return;
    setChosedOptions({
      value: deck.id,
      label: deck.name,
    });
  }, [deck]);

  const handleChoseOption = (option) => {
    setChosedOptions(option);
  };

  const handleSaveCard = async () => {
    if (!window.confirm(`Do you want to confirm all changes?`)) return;

    const formErrors = [];

    if (isEmpty(chosedOption)) {
      formErrors.push(
        'You must select a Deck. If there is no options, create one first!'
      );
    }

    if (front.length === 0) {
      formErrors.push("Type at least 1 character in Card's front side!");
    }

    if (back.length === 0) {
      formErrors.push("Type at least 1 character in Card's back side!");
    }

    if (formErrors.length > 0) {
      formErrors.forEach((errorMsg) => toast.error(errorMsg));
      return;
    }

    try {
      if (id && deckId) {
        setIsLoading(true);
        await axios.put(`/cards/${id}/${deckId}`, {
          front,
          back,
          deck_id: chosedOption.value,
        });
        setIsLoading(false);
        toast.success('Card has been edited successfully!');
        history.push(`/card/${id}/${chosedOption.value}/edit`);
      } else {
        setIsLoading(true);
        const studyDate = new Date();
        const { data } = await axios.post(`/cards/${chosedOption.value}`, {
          front,
          back,
          study_date: studyDate,
          current_count_study: 0,
          next_study: studyDate,
        });
        setIsLoading(false);
        toast.success('Card has been created successfully!');
        history.push(`/card/${data.id}/${chosedOption.value}/edit`);
      }
    } catch (err) {
      setIsLoading(false);
      const data = get(err, 'response.data', {});
      const errors = get(data, 'errors', []);

      if (errors.length > 0) {
        errors.map((error) => toast.error(error));
      } else {
        toast.error('Erro desconhecido');
      }
    }
  };

  const handleDeleteCard = async () => {
    if (!id || !deckId) return;
    if (!window.confirm(`Do you want to delete this card for good?`)) return;

    try {
      setIsLoading(true);
      await axios.delete(`/cards/${id}/${deckId}`);
      setIsLoading(false);
      toast.success('Card has been deleted. Returned to deck page');
      history.push(`/deck/${deckId}/edit`);
    } catch (err) {
      setIsLoading(false);
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
      <Loading isLoading={isLoading} />
      <Title>
        {id && deckId ? 'Edit your Card here!' : 'Create a new Card!'}
      </Title>
      {selectOptions.length > 0 ? (
        <CardCreationContainer>
          <Select
            defaultValue={
              !isEmpty(deck)
                ? {
                    value: deck.id,
                    label: deck.name,
                  }
                : null
            }
            options={selectOptions}
            onChange={(option) => handleChoseOption(option)}
            noOptionsMessage="You need to create a Deck yet!"
          />
          <CardContainer>
            <CardStyle>
              <p>Front Side</p>
              <textarea
                value={front}
                onChange={(e) => setFront(e.target.value)}
                placeholder="Type Card's front side here..."
              />
            </CardStyle>
            <CardStyle>
              <p>Back Side</p>
              <textarea
                value={back}
                onChange={(e) => setBack(e.target.value)}
                placeholder="Type Card's back side here..."
              />
            </CardStyle>
          </CardContainer>
          <button type="button" onClick={() => handleSaveCard()}>
            {id && deckId ? 'Edit' : 'Create'}
          </button>
        </CardCreationContainer>
      ) : (
        <NoDecksContainer>
          <p>You need to create a Deck before starting your Card Creation!</p>
          <Link to="/decks">
            <button type="button">Create a Deck!</button>
          </Link>
        </NoDecksContainer>
      )}
      {id && deckId ? (
        <DeleteBtn>
          <button type="button" onClick={() => handleDeleteCard()}>
            Delete this Card
          </button>
        </DeleteBtn>
      ) : null}
    </Container>
  );
}

Card.propTypes = {
  match: PropTypes.shape({}).isRequired,
};
