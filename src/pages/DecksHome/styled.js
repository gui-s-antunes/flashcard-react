import styled from 'styled-components';
import { primaryColor, primaryDarkColor } from '../../config/colors';

export const Title = styled.h1`
  text-align: center;
  color: ${primaryColor};
`;

export const DecksStyle = styled.div`
  margin: 20px 0 0 0;
  display: flex;
  flex-direction: column;
`;

export const UserDeck = styled.div`
  display: flex;
  align-items: center;
  margin-top: 5px;
  background: #efefef;
  padding: 10px 15px;
  border-radius: 10px;

  span {
    /* margin-right: 20px; */
    flex-grow: 1;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    /* width: 100px; */
  }

  a {
    margin: 0;
    padding: 0;
    border: 0;
    cursor: pointer;
  }

  svg {
    margin: 0;
    padding: 0;
    border: 0;
    cursor: pointer;
    /* height: 100%; */
    flex-shrink: 0;
    color: ${primaryDarkColor};
    transition: color 300ms;
  }

  svg:hover {
    color: ${primaryColor};
  }

  svg + a {
    margin-left: 15px;
  }

  .cardsNumber {
    margin: 0 0 0 10px;
    flex-grow: 0;
  }
`;
