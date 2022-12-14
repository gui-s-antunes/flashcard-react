import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { FaReply, FaEye } from 'react-icons/fa';
import { get, isEmpty } from 'lodash';
import { toast } from 'react-toastify';

// import { Container } from '../../styles/GlobalStyles';
import {
  LocalContainer,
  CardShowStyle,
  CardShowContainer,
  DeckNameEditStyle,
  CardListStyle,
  CardStyle,
} from './styled';
import Loading from '../../components/Loading';
import axios from '../../services/axios';

export default function Deck() {
  const { id } = useParams();
  const [deck, setDeck] = useState([]);
  const [name, setName] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  // const [cards, setCards] = useState([]);

  const [cardShow, setCardShow] = useState({});

  useEffect(() => {
    if (!id) return;

    async function getDeck() {
      // fazer try catch
      setIsLoading(true);
      const { data } = await axios.get(`/decks/${id}`);
      setDeck(data);
      setName(data.name);
      setIsLoading(false);
    }

    getDeck();
  }, [id]);

  const handleEditDeckName = async () => {
    if (name.length < 1) return;
    if (!window.confirm(`Do you want to rename this deck as '${name}?'`))
      return;

    try {
      setIsLoading(true);
      await axios.put(`/decks/${id}`, { name });
      setIsLoading(false);
      toast.success('Deck has been renamed successfully!');
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

  const handleShowCard = (e, card) => {
    const reg = /(\d{4})-(\d{2})-(\d{2})/;
    const newCardShow = { ...card };
    const nextStudy = newCardShow.next_study;
    newCardShow.next_study = nextStudy.replace(reg, '$3/$2/$1');
    setCardShow(newCardShow);
  };

  return (
    <>
      <LocalContainer>
        <Loading isLoading={isLoading} />
        <h1>Edit your deck here</h1>
        {deck ? (
          <DeckNameEditStyle>
            <label htmlFor="name">
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Edit Deck Name"
              />
            </label>
            <button type="button" onClick={handleEditDeckName}>
              <FaReply size={16} />
            </button>
          </DeckNameEditStyle>
        ) : null}

        <CardListStyle>
          {deck && deck.Cards
            ? deck.Cards.map((card) => (
                <div key={card.id}>
                  <CardStyle>
                    <span>{card.front}</span>
                    <FaEye onClick={(e) => handleShowCard(e, card)} />
                  </CardStyle>
                </div>
              ))
            : null}
        </CardListStyle>
      </LocalContainer>
      <CardShowContainer>
        <h1>Card Info</h1>
        {!isEmpty(cardShow) ? (
          <div>
            <CardShowStyle>
              <p>Front</p>
              <div>{cardShow.front}</div>
            </CardShowStyle>
            <CardShowStyle>
              <p>Back</p>
              <div>{cardShow.back}</div>
            </CardShowStyle>
            <CardShowStyle>
              <p>Next Study (dd/mm/yyyy)</p>
              <div>{cardShow.next_study}</div>
            </CardShowStyle>
            <Link to={`/card/${cardShow.id}/${deck.id}/edit`}>
              <button type="button">Edit Card</button>
            </Link>
          </div>
        ) : null}
      </CardShowContainer>
      {/* <Container>fsdkajfh</Container> */}
    </>
  );
}
