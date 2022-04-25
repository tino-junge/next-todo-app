import Slide from '@mui/material/Slide';
import { SnackbarProvider } from 'notistack';

interface NotificationProviderProps {
  children?: React.ReactNode;
}

export const NotificationProvider = (props: NotificationProviderProps) => {
  return (
    <SnackbarProvider
      maxSnack={3}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      TransitionComponent={Slide as React.ComponentType}
    >
      {props.children}
    </SnackbarProvider>
  );
};
