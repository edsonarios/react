import { AlertColor } from '@mui/material';

export type AuthProps = {
    user: string;
    token: string
    logging: boolean
    isLoggedIn: boolean
    errorSnackbar: boolean
    message: string
    typeAlert: AlertColor
}

export const initialState: AuthProps = {
    user: '',
    token: '',
    logging: false,
    isLoggedIn: false,
    errorSnackbar: false,
    message: '',
    typeAlert: "info"
};
