import styled from 'styled-components';
import { primaryColor } from '../../config/colors';

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: stretch;

  label {
    padding: 0;
    margin: 0 0 10px 0;
  }

  input {
    width: 100%;
    height: 100%;
    padding: 10px 4px;
    border: 1px solid black;
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
export const Title = styled.h1`
  color: ${primaryColor};
  text-align: center;
  margin-bottom: 10px;
`;
