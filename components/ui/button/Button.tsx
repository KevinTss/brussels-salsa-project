import { useState, MouseEventHandler } from 'react';

import { ButtonDefault, ButtonMinimal, ButtonPrimary } from './style';
import Icon from '../icon';
import { Children } from '../../../types';

type ButtonAppearance = 'default' | 'minimal' | 'primary';

const Buttons = {
  default: ButtonDefault,
  minimal: ButtonMinimal,
  primary: ButtonPrimary,
};

const getButtonComponent = (appearance: ButtonAppearance) =>
  Buttons[appearance];

type Props = {
  appearance?: ButtonAppearance;
  children?: Children;
  iconLeft?: string;
  iconRight?: string;
  isDisabled?: boolean;
  isLoading?: boolean;
  isIconReverse?: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  type?: string;
};

const ButtonEl = ({
  appearance = 'default',
  children,
  iconLeft,
  iconRight,
  isDisabled = false,
  isLoading = false,
  isIconReverse = false,
  ...props
}: Props) => {
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

export default ButtonEl;
