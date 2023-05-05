import * as React from 'react';
import {
    TextField,
    Button,
    Grid,
    Box,
    Container,
    CssBaseline,
    Avatar,
    Typography,
    SnackbarCloseReason,
    CircularProgress
} from '@mui/material';
import AccessibilityNewOutlined from '@mui/icons-material/AccessibilityNewOutlined';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Link } from "react-router-dom";
import { actionsAuth } from '../auth-actions';
import ErrorSnackbar from '@/components/alert/error-snackbar';
import { useAppDispatch, useAppSelector } from '@/store/store';
import { errorAlert } from '@/slices/auth/authSlice';
const theme = createTheme();

const AuthRegisterPage = () => {
    const dispatch = useAppDispatch();
    const { logging, errorSnackbar, message, typeAlert } = useAppSelector(state => state.auth);
    const { registerSubmit } = actionsAuth()

    const handleCloseSnackbar = (event: React.SyntheticEvent | Event, reason: SnackbarCloseReason) => {
        dispatch(errorAlert(false));
    };

    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <AccessibilityNewOutlined />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Register
                    </Typography>
                    <Box component="form" onSubmit={(event) => registerSubmit(event as React.FormEvent<HTMLFormElement>)} noValidate sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            autoFocus
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                        />

                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                            disabled={logging}
                        >
                            {logging ? <CircularProgress size={24} /> : 'Register'}
                        </Button>
                        <ErrorSnackbar
                            open={errorSnackbar}
                            message={message}
                            handleCloseSnackbar={handleCloseSnackbar}
                            typeAlert={typeAlert}
                        />
                        <Grid container>
                            <Grid item>
                                <Link to="/auth/login">
                                    {"Login"}
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
}

export default AuthRegisterPage;
