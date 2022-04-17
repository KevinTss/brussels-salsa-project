import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

import {
  Container,
  Overlay,
  DefaultDialog,
  AsideDialog,
  OuterDialog,
  OuterLargeDialog,
  OuterAsideDialog,
  LargeDialog,
} from './style';

const dialogComponents = {
  aside: AsideDialog,
  default: DefaultDialog,
  large: LargeDialog,
};
const outerDialogComponents = {
  aside: OuterAsideDialog,
  default: OuterDialog,
  large: OuterLargeDialog,
};
const getDialog = (type, mode) =>
  mode === 'inner' ? dialogComponents[type] : outerDialogComponents[type];

const DialogEl = ({ type, children, isOpen, onClose }) => {
  const [isMounted, setIsMounted] = useState(false);
  const Dialog = getDialog(type, 'inner');
  const OuterDialog = getDialog(type, 'outer');

  const onOverlayClicked = (e) => {
    if (e.target.dataset.el === 'closable' && onClose) {
      onClose();
    }
  };

  useEffect(() => {
    setIsMounted(true);

    return () => setIsMounted(false);
  }, []);

  if (!isMounted) return null;

  return createPortal(
    <Container isVisible={isOpen}>
      <Overlay onClick={onOverlayClicked} data-el='closable'>
        <OuterDialog $type={type} data-el='closable'>
          <Dialog isVisible={isOpen}>{children}</Dialog>
        </OuterDialog>
      </Overlay>
    </Container>,
    document.getElementById('dialog-root')
  );
};

DialogEl.defaultProps = {
  type: 'default',
};

export default DialogEl;
