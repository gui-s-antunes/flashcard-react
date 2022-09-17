import styled from 'styled-components';
import { primaryColor, primaryDarkColor } from '../../config/colors';

export const Title = styled.h1`
  color: ${primaryColor};
  text-align: center;
  margin-bottom: 15px;
`;

export const CardCreationContainer = styled.div`
  button {
    width: 100%;
    transition: filter 300ms;
  }

  button:hover {
    filter: brightness(70%);
  }
`;

export const NoDecksContainer = styled.div`
  p {
    margin-bottom: 10px;
    text-align: center;
  }

  button {
    width: 100%;
    transition: filter 300ms;
  }

  button:hover {
    filter: brightness(70%);
  }
`;

export const CardContainer = styled.div`
  /* max-width: 360px;
  background-color: #fff; */
  /* margin: 30px auto; */
  /* padding: 30px; */
  /* border-radius: 4px; */
  /* box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); */
  margin: 20px 0 15px;

  h1 {
    margin-bottom: 15px;
    text-align: center;
    color: ${primaryColor};
  }
`;

export const CardStyle = styled.div`
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
    border-bottom-left-radius: 7px;
    border-bottom-right-radius: 7px;
  }

  textarea {
    resize: none;
    border: none;
    background-color: ${primaryDarkColor};
    color: #efefef;
    padding: 10px;
    width: 100%;
  }
`;

export const DeleteBtn = styled.div`
  button {
    margin-top: 5px;
    width: 100%;
    transition: filter 300ms;
  }

  button:hover {
    filter: brightness(70%);
  }
`;
