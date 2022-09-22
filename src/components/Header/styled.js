import styled from 'styled-components';

import { primaryColor, primaryDarkColor } from '../../config/colors';

export const Nav = styled.nav`
  background-color: ${primaryColor};
  padding: 5px 20px;
  display: flex;
  align-items: center;
  justify-content: center;

  a {
    color: #fff;
    margin: 0 7px;
    font-weight: bold;
    text-align: center;
    padding: 3px;
    transition: all 300ms;
  }

  a:hover {
    color: ${primaryDarkColor};
    border-radius: 7px;
  }

  a:hover svg {
    animation-name: icon-shake-animation;
    animation-duration: 1000ms;
  }

  @keyframes icon-shake-animation {
    0%,
    100% {
      transform: rotate(0);
    }
    25% {
      transform: rotate(25deg);
    }
    75% {
      transform: rotate(-25deg);
    }
  }
`;

// export
