import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  transform: ${({ isVisible }) =>
    isVisible ? 'none' : 'translateX(-10000px)'};
  position: fixed;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 100;
`;

export const Overlay = styled.div`
  z-index: 3;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: auto;
  display: flex;
  justify-content: center;
  box-sizing: border-box;
  background-color: rgba(0, 0, 0, 0.4);
  cursor: pointer;
`;

export const BaseOuter = styled.div`
  display: flex;
  min-height: 100%;
  width: 100%;
`;

export const OuterDialog = styled(BaseOuter)`
  padding: 200px 0;
  position: absolute;
  justify-content: center;
  align-items: flex-start;
`;

export const OuterLargeDialog = styled(OuterDialog)`
  padding: 50px 0;
`;

export const OuterAsideDialog = styled(BaseOuter)`
  position: absolute;
  justify-content: flex-end;
`;

export const BaseDialog = styled.div`
  z-index: 3;
  background-color: white;
  box-shadow: 0 15px 45px 0 rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  cursor: default;
`;

export const DefaultDialog = styled(BaseDialog)`
  padding: 20px;
  width: 600px;
  border-radius: 15px;
  opacity: ${({ isVisible }) => (isVisible ? 1 : 0)};
  transform: ${({ isVisible }) =>
    isVisible ? 'translateX(0) scale(1)' : 'translateX(-10px) scale(0.9)'};
`;

export const LargeDialog = styled(DefaultDialog)`
  padding: 50px;
  width: 80vw;
  max-width: 998px;
`;

export const AsideDialog = styled(BaseDialog)`
  width: 70%;
  min-height: 100%;
  padding: 65px;
  opacity: ${({ isVisible }) => (isVisible ? 1 : 0)};
  overflow: auto;
  transform: ${({ isVisible }) =>
    isVisible ? 'translateX(0)' : 'translateX(100%)'};
`;
