import styled from 'styled-components';

import { MEDIA_QUERY } from '../../../../../utils';

export const EventContainer = styled.div`
  display: flex;
  padding: 10px;
  border-top: 1px solid rgba(0, 0, 0, 0.04);

  &:not(:last-child) {
    margin-bottom: 20px;
  }

  &:hover {
    border-radius: 14px;
    border-top: 1px solid rgba(0, 0, 0, 0);
    background-color: rgba(0, 0, 0, 0.04);
  }

  ${MEDIA_QUERY.MOBILE_AND_DOWN} {
    flex-direction: column;
  }
`;

export const EventPrimariesInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  flex: 1;

  ${MEDIA_QUERY.MOBILE_AND_DOWN} {
    margin-bottom: 20px;
  }
`;

export const DancersContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 2;

  span {
    font-weight: ${({ theme }) => theme.fontWeight.thin};
    font-size: ${({ theme }) => theme.fontSize.s};
    margin-left: 10px;
  }

  ${MEDIA_QUERY.MOBILE_AND_DOWN} {
    margin-bottom: 20px;
  }
`;

export const MalesContainer = styled.div`
  display: flex;
  flex-direction: column;

  &:last-child {
    margin-top: 20px;
  }

  > div {
    display: flex;
  }
`;
export const FemalesContainer = styled(MalesContainer)``;

export const CallToActions = styled.div`
  display: flex;
  width: 100px;
  justify-content: flex-end;
  align-content: flex-end;
  height: 100%;

  ${MEDIA_QUERY.MOBILE_AND_DOWN} {
    width: 100%;
    justify-content: flex-start;
  }
`;
