import * as React from 'react';
import { Snackbar, Alert, AlertColor, SnackbarCloseReason } from '@mui/material';

interface ErrorSnackbarProps {
    open: boolean;
    message: string;
    typeAlert: AlertColor;
    handleCloseSnackbar: (event: React.SyntheticEvent | Event, reason: SnackbarCloseReason) => void;
}

const ErrorSnackbar: React.FC<ErrorSnackbarProps> = ({
    open,
    message,
    handleCloseSnackbar,
    typeAlert
}) => {
    const handleAlertClose = (event: React.SyntheticEvent<Element, Event>) => {
        handleCloseSnackbar(event, 'clickaway');
    };

    return (
        <Snackbar
            open={open}
            autoHideDuration={6000}
            onClose={handleCloseSnackbar}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        >
            <Alert onClose={handleAlertClose} severity={typeAlert} sx={{ width: '100%' }}>
                {message}
            </Alert>
        </Snackbar>
    );
};

export default ErrorSnackbar;
