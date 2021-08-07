import styled, { keyframes } from 'styled-components';

const bubble = keyframes`
   0% {
    transform: translateY(0%);
    opacity: 0.06;
  }
  100% {
    transform: translateY(-120vh);
  }
`;

const sideWays = keyframes`
  0% {
    margin-left: 0px;
  }
  100% {
    margin-left: 200px;
  }
`;

export const Bubble = styled.div`
  width: 30px;
  height: 30px;
  border-radius: 100%;
  position: absolute;
  background-color: white;
  bottom: -30px;
  opacity: 0.2;
  animation: ${bubble} 15s ease-in-out infinite,
    ${sideWays} 4s ease-in-out infinite alternate;
`;
