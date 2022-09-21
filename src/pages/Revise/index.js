import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { get, isEmpty } from 'lodash';
import { toast } from 'react-toastify';

import { Container } from '../../styles/GlobalStyles';
import {
  Title,
  StudyCardContainer,
  CardShowStyle,
  CardButtonsOption,
} from './styled';

import Loading from '../../components/Loading';
import axios from '../../services/axios';
import { getCardsToStudy } from '../../utils/get-cards-to-study';
// import { formatDateToBd } from '../../utils/format-date-to-bd';
import { setNextStudy } from '../../utils/set-next-study';
import { addDaysToDate } from '../../utils/add-days-to-date';

export default function Revise() {
  const { id } = useParams();
  const studyPosition = 0;
  const [isLoading, setIsLoading] = useState(false);

  const [deck, setDeck] = useState([]);

  const [cardsToStudy, setCardsToStudy] = useState([]);
  // const [studyPosition, setStudyPosition] = useState(0);
  const [isBackShowing, setIsBackShowing] = useState(false);

  // gets a deck
  useEffect(() => {
    if (!id) return;

    async function getDeck() {
      setIsLoading(true);
      const { data } = await axios.get(`/decks/${id}`);
      setDeck(data);
      setIsLoading(false);
    }

    getDeck();
  }, [id]);

  // sets an array of card to study
  useEffect(() => {
    if (isEmpty(deck)) return;

    setCardsToStudy(getCardsToStudy(deck));
  }, [deck]);

  // verifies whether is needed hidden Card's back side
  useEffect(() => {
    if (isEmpty(cardsToStudy)) return;
    setIsBackShowing(false);
  }, [cardsToStudy]);

  // shows Card's back side
  const handleShowBackCard = () => {
    setIsBackShowing(true);
  };

  // updates study count and next study date, remove card from study array
  const handleCardCorrectAnswer = async () => {
    const newCardToStudy = [...cardsToStudy];
    const cardNextStudy = new Date();

    newCardToStudy[studyPosition].current_count_study =
      setNextStudy[newCardToStudy[studyPosition].current_count_study];

    newCardToStudy[studyPosition].next_study = addDaysToDate(
      cardNextStudy,
      newCardToStudy[studyPosition].current_count_study
    );

    try {
      setIsLoading(true);
      await axios.put(`/cards/${newCardToStudy[studyPosition].id}/${id}`, {
        current_count_study: newCardToStudy[studyPosition].current_count_study,
        next_study: newCardToStudy[studyPosition].next_study,
      });
      setIsLoading(false);
      newCardToStudy.shift();
      setCardsToStudy(newCardToStudy);
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

  // Resets study days count to 0, next study is today and move card to last array pos
  const handleCardWrongAnswer = async () => {
    const newCardToStudy = [...cardsToStudy];
    newCardToStudy[studyPosition].current_count_study = 0;
    newCardToStudy[studyPosition].next_study = new Date();

    try {
      setIsLoading(true);
      await axios.put(`/cards/${newCardToStudy[studyPosition].id}/${id}`, {
        current_count_study: newCardToStudy[studyPosition].current_count_study,
        next_study: newCardToStudy[studyPosition].next_study,
      });
      setIsLoading(false);
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

    newCardToStudy.push(newCardToStudy.splice(0, 1)[0]);
    setCardsToStudy(newCardToStudy);
  };

  return (
    <Container>
      <Loading isLoading={isLoading} />
      <Title>Studying Cards...</Title>
      <StudyCardContainer>
        {!isEmpty(cardsToStudy) ? (
          <CardShowStyle>
            <p>Front</p>
            <div>
              {!isEmpty(cardsToStudy) ? cardsToStudy[studyPosition].front : ''}
            </div>
          </CardShowStyle>
        ) : null}
        {!isEmpty(cardsToStudy) && isBackShowing ? (
          <>
            <CardShowStyle>
              <p>Back</p>
              <div>
                {!isEmpty(cardsToStudy) ? cardsToStudy[studyPosition].back : ''}
              </div>
            </CardShowStyle>
            <CardButtonsOption>
              <button
                type="button"
                onClick={(event) => handleCardCorrectAnswer(event)}
              >
                I am correct!
              </button>
              <button
                type="button"
                onClick={(event) => handleCardWrongAnswer(event)}
              >
                I am wrong!
              </button>
            </CardButtonsOption>
          </>
        ) : null}
        {!isBackShowing && !isEmpty(cardsToStudy) ? (
          <button type="button" onClick={(event) => handleShowBackCard(event)}>
            Show Answer
          </button>
        ) : null}
        {isEmpty(cardsToStudy) ? (
          <p className="noCardsPhrase">There is no card to study...</p>
        ) : null}
      </StudyCardContainer>
    </Container>
  );
}
