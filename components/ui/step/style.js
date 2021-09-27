import styled from 'styled-components';

export const StepContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  margin: 0 auto 50px auto;
  max-width: 800px;
`;

export const Step = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 65px;
  position: relative;

  ${({ isActive }) =>
    isActive &&
    `
    &:before {
      content: '';
      position: absolute;
      width: 65px;
      height: 65px;
      border-radius: 50%;
      background-color: #60bc9722;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      z-index: -1;
    }
  `};
`;

export const Number = styled.div`
  display: flex;
  width: 45px;
  height: 45px;
  justify-content: center;
  align-items: center;
  background-color: #f7fafc;
  border-radius: 50%;
  font-size: 22px;
  line-height: 26px;
  font-weight: 900;
  color: ${({ isActive }) => (isActive ? '#60bc97' : '#60bc9766')};
  z-index: 1;
`;

export const Text = styled.p`
  text-align: center;
  position: absolute;
  top: calc(100% + 15px);
  left: 50%;
  transform: translateX(-50%);
`;

export const Separator = styled.div`
  display: flex;
  height: 3px;
  flex: 1;
  background-color: ${({ isActive }) => (isActive ? '#60bc9766' : '#f7fafc')};
  margin: 0 10px;
  border-radius: 10px;
`;
