import styled from 'styled-components';

import { MEDIA_QUERY } from '../../../utils';

export const CalendarContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 40px 0 100px 0;
`;

export const WeekContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

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
  margin: 0 20px;

  ${MEDIA_QUERY.MOBILE_AND_DOWN} {
    margin: 20px 0;
  }
`;
