import styled from 'styled-components';

export const TitleContainer = styled.div`
  margin-bottom: 20px;
`;

export const DancersContainer = styled.div`
  display: flex;
`;

export const MalesContainer = styled(DancersContainer)`
  flex: 1;
  flex-direction: column;
  list-style: none;
  margin: 20px 0 40px 0;
`;

export const FemalesContainer = styled(MalesContainer)``;

export const FullNameContainer = styled.li`
  margin: 2px 0;
`;
