import { AlertColor } from '@mui/material';
export type AlertProps = {
    errorSnackbar: boolean
    message: string
    typeAlert: AlertColor
}
export type AuthProps = {
    user: string
    token: string
    logging: boolean
    isLoggedIn: boolean
    alert: AlertProps
}

export const initialState: AuthProps = {
    user: '',
    token: '',
    logging: false,
    isLoggedIn: false,
    alert: {
        errorSnackbar: false,
        message: '',
        typeAlert: 'info'
    }
}
