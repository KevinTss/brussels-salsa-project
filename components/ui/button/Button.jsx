import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { ButtonDefault, ButtonMinimal, ButtonPrimary } from './style';
import Icon from '../icon';

const Buttons = {
  default: ButtonDefault,
  minimal: ButtonMinimal,
  primary: ButtonPrimary,
};

const getButtonComponent = (appearance) => Buttons[appearance];

const ButtonEl = ({
  appearance,
  children,
  iconLeft,
  iconRight,
  isDisabled,
  isLoading,
  isIconReverse,
  ...props
}) => {
  const [isHovering, setIsHovering] = useState(false);
  const Button = getButtonComponent(appearance);
  const iconColor = appearance === 'primary' ? 'white' : undefined;
  const iconColorHover = appearance === 'primary' ? 'white' : undefined;

  return (
    <Button
      {...props}
      $hasMarginRight={!!children}
      $isDisabled={isDisabled || isLoading}
      $isLoading={isLoading}
      $isIconReverse={isIconReverse}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {iconLeft && !isLoading && (
        <Icon name={iconLeft} color={isHovering ? iconColorHover : iconColor} />
      )}
      {isLoading && <Icon name='loading' />}
      {children}
      {iconRight && !isLoading && (
        <Icon
          name={iconRight}
          color={isHovering ? iconColorHover : iconColor}
          data-position='right'
        />
      )}
    </Button>
  );
};

ButtonEl.propTypes = {
  appearance: PropTypes.oneOf(Object.keys(Buttons)),
  isDisabled: PropTypes.bool,
  isLoading: PropTypes.bool,
};

ButtonEl.defaultProps = {
  appearance: 'default',
  isDisabled: false,
  isLoading: false,
};

export default ButtonEl;
