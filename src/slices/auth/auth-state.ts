import { AlertColor } from '@mui/material';
export type AlertProps = {
    errorSnackbar: boolean
    message: string
    typeAlert: AlertColor
}
export type AuthProps = {
    user: string
    logging: boolean
    alert: AlertProps
}

export const initialState: AuthProps = {
    user: '',
    logging: false,
    alert: {
        errorSnackbar: false,
        message: '',
        typeAlert: 'info'
    }
}
