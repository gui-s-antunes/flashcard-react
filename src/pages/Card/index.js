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
} from './styled';
import history from '../../services/history';
import { formatDateToBd } from '../../utils/format-date-to-bd';

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
      console.log(data);
      setCard(data);
      console.log(card);
      setIsLoading(false);
    }

    getCard();
  }, [id, deckId]);

  useEffect(() => {
    if (!deckId);
    async function getDecks() {
      setIsLoading(true);
      const { data } = await axios.get(`/decks/`);
      console.log(data);
      setDecks(data);
      console.log(decks);
      setIsLoading(false);
    }
    getDecks();
  }, [deckId]);

  useEffect(() => {
    console.log('decks', decks);
    if (isEmpty(decks)) return;
    setDeck(
      decks
        .filter((deckz) => {
          console.log(deckz.id);
          return deckz.id === Number(deckId);
        })
        .find((obj) => !isEmpty(obj))
    );
    setSelectOptions(configureSelectOptions(decks));
  }, [decks]);

  // useEffect(() => {
  //   if (isEmpty(chosedOption)) return;
  //   console.log('chosedOptions value', chosedOption.value);
  // }, [chosedOption]);

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

  // const handleSubmit = () => {
  //   //
  // };

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

    console.log('passou');
    console.log('front: ', front);
    console.log('back: ', back);

    console.log('data: ', formatDateToBd(new Date()));

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
        const studyDate = formatDateToBd(new Date());
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
      const data = get(err, 'response.data', {});
      const errors = get(data, 'errors', []);

      if (errors.length > 0) {
        errors.map((error) => toast.error(error));
      } else {
        toast.error('Erro desconhecido');
      }
    }
  };

  useEffect(() => {
    console.log('select options: ', selectOptions);
    console.log('deck: ', deck);
  }, [selectOptions, deck]);

  return (
    // Edit:
    // Alterar Deck, Deletar Card
    // Alterar Front e Back

    // Create:
    // Escolher Deck
    // Preencher Front e Back
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
            // defaultValue={chosedOption}
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
          <button type="button" onClick={handleSaveCard}>
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
    </Container>
  );
}

Card.propTypes = {
  match: PropTypes.shape({}).isRequired,
};
