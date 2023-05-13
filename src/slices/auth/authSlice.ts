import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { authApi } from "@/api/auth-api";
import { RegisterProps, LoginProps, loginResponseProps, registerResponseProps } from "@/types/auth";
import { AlertProps, initialState } from "./auth-state";
import { extractErrorMessage } from "@/utils/utils";


export const postRegister = createAsyncThunk(
    'auth/registerProcess',
    async (params: RegisterProps, thunkApi) => {
        const response = await thunkApi.dispatch(authApi.endpoints.register.initiate(params));
        const responseData = response as { data: RegisterProps };
        return responseData;
    });

export const login = createAsyncThunk(
    'auth/loginProcess',
    async (params: LoginProps, thunkApi) => {
        thunkApi.dispatch(authActions.logging(true));
        const response = await thunkApi.dispatch(authApi.endpoints.login.initiate(params));
        const responseData = response as loginResponseProps;

        if (responseData.error?.status === 400) {
            const errorMessage = responseData.error?.data && extractErrorMessage(responseData.error.data);
            thunkApi.dispatch(authActions.alert({
                errorSnackbar: true,
                message: 'Login failed: ' + errorMessage,
                typeAlert: 'error'
            }));
        }
        return responseData;
    });

export const register = createAsyncThunk(
    'auth/registerProcess',
    async (params: LoginProps, thunkApi) => {
        thunkApi.dispatch(authActions.logging(true));
        const response = await thunkApi.dispatch(authApi.endpoints.register.initiate(params));

        const responseData = response as registerResponseProps;

        if (responseData.data) {
            thunkApi.dispatch(authActions.alert({
                errorSnackbar: true,
                message: 'Register successfull: ' + responseData.data.email,
                typeAlert: 'success'
            }));
        } else {
            if (responseData.error) {
                thunkApi.dispatch(authActions.alert({
                    errorSnackbar: true,
                    message: 'Register failed: ' + responseData.error.data.message,
                    typeAlert: 'error'
                }));
            }
        }
        return responseData
    });

export const me = createAsyncThunk(
    'auth/meProcess',
    async (params: any, thunkApi) => {
        const response = await thunkApi.dispatch(authApi.endpoints.me.initiate(params));
        return response
    });

export const errorAlert = createAsyncThunk(
    'auth/errorAlert',
    async (params: boolean, thunkApi) => {
        thunkApi.dispatch(authActions.errorSnackbar(params));
        return null;
    });

const authSlice = createSlice({
    name: 'auth',
    initialState: initialState,
    reducers: {
        logging: (state, action: PayloadAction<boolean>) => {
            state.logging = action.payload
        },
        setUser: (state, action: PayloadAction<string>) => {
            state.user = action.payload
        },
        alert: (state, action: PayloadAction<AlertProps>) => {
            state.alert = action.payload
        },
        errorSnackbar: (state, action: PayloadAction<boolean>) => {
            state.alert.errorSnackbar = action.payload
        },
    },
    extraReducers: (builder) => {
        builder.addCase(login.fulfilled, (state, action) => {
            state.logging = false;
        });
        builder.addCase(register.fulfilled, (state, action) => {
            state.logging = false;
        });
    }
});

// export reducer
export default authSlice.reducer;

// export actions
export const authActions = authSlice.actions
