import styled from 'styled-components';
import { primaryColor, primaryDarkColor } from '../../config/colors';

export const Title = styled.h1`
  text-align: center;
  color: ${primaryColor};
  margin: 0 0 10px 0;
`;

export const StudyCardContainer = styled.div`
  button {
    width: 100%;
  }

  p.noCardsPhrase {
    text-align: center;
  }
`;

// export const StudyCardFront = styled.div``;

export const CardShowStyle = styled.div`
  margin-bottom: 15px;

  p {
    text-align: center;
    background-color: ${primaryColor};
    color: white;
    padding: 5px 0 5px 0;
    border-top-left-radius: 7px;
    border-top-right-radius: 7px;
  }

  div {
    color: white;
    background-color: ${primaryDarkColor};
    padding: 10px;
    border-bottom-left-radius: 0px;
    border-bottom-right-radius: 0px;
    border: 1px solid ${primaryColor};
  }
`;

export const CardButtonsOption = styled.div`
  display: flex;
  justify-content: center;
  gap: 5px;
`;
