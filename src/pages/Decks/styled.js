import styled from 'styled-components';
import { primaryColor, primaryDarkColor } from '../../config/colors';

export const Paragrafo = styled.p``;

export const DeckBackgroud = styled.div``;

export const Title = styled.h1`
  text-align: center;
  color: ${primaryColor};
`;

export const AddDeck = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;

  label {
    flex-grow: 2;
    margin: 0 10px 0 0;
    padding: 0;
  }

  input {
    /* width: 100%; */
    height: 100%;
    width: 100%;
    margin: 0;
    padding: 10px 4px;
    border: 1px solid ${primaryDarkColor};
    border-radius: 5px;
    transition: 0.3s;
  }

  input:focus {
    border: 1px solid ${primaryColor};
  }

  button {
    background-color: ${primaryColor};
    transition: 0.3s;
  }

  button:hover {
    filter: brightness(70%);
  }
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
    margin-right: 20px;
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
`;
