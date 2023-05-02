import * as React from 'react';
import { Snackbar, Alert } from '@mui/material';

interface ErrorSnackbarProps {
    open: boolean;
    errorMessage: string;
    handleCloseSnackbar: (event?: React.SyntheticEvent, reason?: string) => void;
}

const ErrorSnackbar: React.FC<ErrorSnackbarProps> = ({
    open,
    errorMessage,
    handleCloseSnackbar,
}) => {
    return (
        <Snackbar
            open={open}
            autoHideDuration={6000}
            onClose={handleCloseSnackbar}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        >
            <Alert onClose={handleCloseSnackbar} severity="error" sx={{ width: '100%' }}>
                Login failed. {errorMessage}
            </Alert>
        </Snackbar>
    );
};

export default ErrorSnackbar;
