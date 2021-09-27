import styled from 'styled-components';

import { Tag } from '../tag/style';

export const TagsGroup = styled.div`
  display: flex;
  width: 100%;
  flex-wrap: wrap;

  > ${Tag}:not(:last-child) {
    margin-right: 5px;
  }
`;
