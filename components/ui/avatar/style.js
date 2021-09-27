import styled from 'styled-components';

const getAvatarSize = (size) =>
  ({
    m: '32px',
    l: '64px',
    xxl: '220px',
  }[size]);

const getTextSize = (size) =>
  ({
    m: '14px',
    l: '22px',
    xxl: '46px',
  }[size]);

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  background-color: white;
  border: ${({ hasBorder, theme }) =>
    hasBorder ? `1px solid ${theme.color.primary}` : 'none'};
  width: ${({ size }) => getAvatarSize(size)};
  min-width: ${({ size }) => getAvatarSize(size)};
  height: ${({ size }) => getAvatarSize(size)};
  min-height: ${({ size }) => getAvatarSize(size)};
  overflow: hidden;
`;

export const Text = styled.p`
  font-size: ${({ size }) => getTextSize(size)};
  color: ${({ theme }) => theme.color.primary};
  font-weight: 600;
`;

export const Image = styled.img`
  width: 100ù;
  height: 100%;
  object-fit: cover;
`;
