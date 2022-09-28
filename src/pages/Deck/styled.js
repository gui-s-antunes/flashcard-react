import styled from 'styled-components';
import { primaryColor, primaryDarkColor } from '../../config/colors';

export const Paragrafo = styled.p``;

export const DeckBackgroud = styled.div``;

export const LocalContainer = styled.section`
  max-width: 360px;
  max-height: 70vh;
  background-color: ${primaryDarkColor};
  margin: 15px auto;
  padding: 30px;
  border-radius: 4px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);

  h1 {
    color: ${primaryColor};
    text-align: center;
    margin-bottom: 15px;
    /* text-transform: capitalize; */
  }

  overflow-y: auto;
`;

export const DeckNameEditStyle = styled.div`
  display: flex;
  justify-content: space-between;

  label {
    width: 100%;
    flex-grow: 1;
  }

  input {
    padding: 10px;
    width: 100%;
    border: 1px solid ${primaryDarkColor};
    border-radius: 7px;
  }

  button {
    margin-left: 5px;
    flex-shrink: 1;
  }
`;

export const CardListStyle = styled.div`
  margin: 20px 0 0 0;
  display: flex;
  flex-direction: column;
`;

export const CardStyle = styled.div`
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

export const CardShowContainer = styled.div`
  max-width: 360px;
  background-color: ${primaryDarkColor};
  margin: 30px auto;
  padding: 30px;
  border-radius: 4px;
  border: 1px solid ${primaryColor};
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);

  h1 {
    margin-bottom: 15px;
    text-align: center;
    color: ${primaryColor};
  }

  button {
    width: 100%;
  }
`;

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
