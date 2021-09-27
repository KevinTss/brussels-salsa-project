import styled from 'styled-components';

export const Tooltip = styled.div`
  display: inline-block;
  position: relative;
`;

export const LabelContent = styled.span`
  display: ${({ isVisible }) => (isVisible ? 'block' : 'none')};
  position: absolute;
  width: auto;
  min-width: ${({ size }) =>
    ({
      default: '80px',
      l: '180px',
    }[size || 'default'])};
  background-color: #1e264e;
  padding: 4px 10px 6px 10px;
  border-radius: 4px;
  bottom: calc(100% + 10px);
  left: 50%;
  transform: translateX(-50%);
  color: white;
  font-size: 12px;
  font-weight: 300;
  text-align: center;
`;
