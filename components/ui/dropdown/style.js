import styled from 'styled-components';

export const Dropdown = styled.div`
  position: relative;
`;

export const Drawer = styled.div`
  display: flex;
  position: absolute;
  min-width: 100%;
  width: auto;
  width: max-content;
  height: auto;
  top: calc(100% + 10px);
  right: 0;
  transition: all 0.2s ease;
  transform-origin: top;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 15px 45px 0 rgba(0, 0, 0, 0.1);
  z-index: 1;
  ${({ isOpen }) => {
    if (isOpen) {
      return `
        visibility: visible;
        transform: scale(1);
        opacity: 1;
      `;
    }
    return `
      visibility: hidden;
      transform: scale(0.8);
      opacity: 0;
    `;
  }}

  &::after {
    content: '';
    position: absolute;
    background-color: transparent;
    width: 100%;
    height: 10px;
    top: -10px;
    left: 0;
  }
`;
