import styled from 'styled-components';

export const NavLink = styled.a`
  box-sizing: border-box;
  display: flex;
  align-items: center;
  height: 100%;
  color: black;
  text-decoration: none;
  padding: 8px 20px;
  font-size: 14px;
  line-height: 18px;
  font-weight: ${({ $isActive }) => ($isActive ? 'bold' : 'normal')};
  cursor: ${({ $isActive }) => ($isActive ? 'default' : 'pointer')};
  opacity: ${({ $isActive }) => ($isActive ? '1' : '0.5')};

  ${({ $isActive }) =>
    !$isActive &&
    `
      &:hover {
        background-color: rgba(0, 0, 0, 0.05);
      }
    `}
`;
