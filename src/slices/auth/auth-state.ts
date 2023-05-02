import ErrorSnackbar from "@/sections/auth/login/error-snackbar";

export type AuthProps = {
    user: string;
    token: string
    logging: boolean
    isLoggedIn: boolean
    errorSnackbar: boolean
    errorMessage: string
}

export const initialState: AuthProps = {
    user: '',
    token: '',
    logging: false,
    isLoggedIn: false,
    errorSnackbar: false,
    errorMessage: ''
};
