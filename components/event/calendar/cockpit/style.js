import styled from 'styled-components';

import { MEDIA_QUERY } from '../../../../utils';

export const CockpitContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 30px;

  ${MEDIA_QUERY.MOBILE_AND_DOWN} {
    flex-direction: column;
  }
`;

export const DayDateContainer = styled.div`
  display: flex;
  height: 100%;
  flex: 1;

  ${MEDIA_QUERY.MOBILE_AND_DOWN} {
    margin: 20px 0;
  }
`;

export const CTAs = styled.div`
  display: flex;
  justify-content: flex-start;

  ${MEDIA_QUERY.MOBILE_AND_DOWN} {
    display: none;
  }

  > button:not(:last-child) {
    margin-right: 10px;
  }
`;

export const CTAsMobile = styled.div`
  display: none;
  justify-content: flex-start;

  ${MEDIA_QUERY.MOBILE_AND_DOWN} {
    display: flex;
  }

  > button:not(:last-child) {
    margin-right: 10px;
  }
`;
