import { compareDateWithToday } from './compare-date-with-today';

export function getDecksWithStudy(decks) {
  const todayStudy = decks
    .map((deck) => {
      return {
        ...deck,
        cardsToStudy: deck.Cards.filter((card) =>
          compareDateWithToday(card.next_study)
        ),
      };
    })
    .filter((deck) => deck.cardsToStudy.length > 0);
  return todayStudy;
}
