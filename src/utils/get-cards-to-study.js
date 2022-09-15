import { compareDateWithToday } from './compare-date-with-today';

export function getCardsToStudy(deck) {
  const cardsToStudy = deck.Cards.filter((card) =>
    compareDateWithToday(card.next_study)
  );
  console.log('cardsToStudy: ', cardsToStudy);
  return cardsToStudy;
}
