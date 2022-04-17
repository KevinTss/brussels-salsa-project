import React from 'react';

import { Icon } from './style';
import {
  IconAngleRight,
  IconArrowLeft,
  IconCancel,
  IconCheck,
  IconComment,
  IconCommentReversed,
  IconInfo,
  IconLoading,
  IconMenu,
  IconPencil,
  IconPlus,
  IconSearch,
  IconShipping,
  IconTrash,
} from './icons';

const icons = {
  'angle-right': <IconAngleRight />,
  'arrow-left': <IconArrowLeft />,
  'comment-reversed': <IconCommentReversed />,
  cancel: <IconCancel />,
  check: <IconCheck />,
  comment: <IconComment />,
  info: <IconInfo />,
  loading: <IconLoading />,
  menu: <IconMenu />,
  pencil: <IconPencil />,
  plus: <IconPlus />,
  search: <IconSearch />,
  shipping: <IconShipping />,
  trash: <IconTrash />,
};

const IconEl = ({ name, ...props }) => <Icon {...props}>{icons[name]}</Icon>;

IconEl.defaultProps = {
  color: undefined,
};

export default IconEl;
