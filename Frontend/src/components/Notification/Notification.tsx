import React from 'react';
import { Alert, AlertTitle, Snackbar } from '@mui/material';
import { TypeT, VariantT, IOrientation } from '../../types/notification';
import Slide, { SlideProps } from '@mui/material/Slide';
import Grow, { GrowProps } from '@mui/material/Grow';

function SlideTransition(props: SlideProps) {
  return <Slide {...props} direction="left" />;
}

function GrowTransition(props: GrowProps) {
  return <Grow {...props} />;
}

interface NotificationT {
  type?: TypeT;
  variant?: VariantT;
  orientation?: IOrientation;
  isOpen: boolean;
  message: string;
  titleText?: string;
  hideDuration?: number | null;
  slide?: boolean;
  onClose: (event: React.SyntheticEvent | Event, reason?: string) => void;
}

const Notification: React.FC<NotificationT> = ({
  isOpen,
  type,
  variant,
  message,
  titleText,
  onClose,
  orientation,
  hideDuration,
  slide,
}) => {
  return message ? (
    <Snackbar
      open={isOpen}
      onClose={onClose}
      autoHideDuration={hideDuration}
      anchorOrigin={orientation}
      TransitionComponent={slide ? SlideTransition : GrowTransition}
    >
      <Alert severity={type} variant={variant} onClose={onClose}>
        {!!titleText && <AlertTitle>{titleText}</AlertTitle>}
        {message}
      </Alert>
    </Snackbar>
  ) : null;
};

export default Notification;

Notification.defaultProps = {
  type: 'error',
  variant: 'standard',
  message: '',
  titleText: '',
  orientation: {
    vertical: 'bottom',
    horizontal: 'right',
  },
  hideDuration: 5000,
  slide: false,
};
