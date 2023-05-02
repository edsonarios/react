import * as React from 'react';
import {
    TextField,
    FormControlLabel,
    Checkbox,
    Button,
    Grid,
    Box,
    Container,
    CssBaseline,
    Avatar,
    Typography,
    CircularProgress,
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/store/store';
const theme = createTheme();
import { errorAlert, postLogin } from '@/slices/auth/authSlice';
import ErrorSnackbar from './error-snackbar'

const AuthLoginPage = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { logging, errorSnackbar, errorMessage } = useSelector((state: RootState) => state.auth);

    const navigate = useNavigate();

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        try {
            const login = await dispatch(postLogin(
                {
                    email: 'edson@mail',
                    password: '123456',
                }
                // {
                //     email: data.get('email') as string,
                //     password: data.get('password') as string,
                // }
            ));
            if (login.payload.error.originalStatus === 201) {
                navigate('/todos');
            }
        } catch (error: any) {
            if (error instanceof Error) {
                console.log(error.message);
            }
        }
    };

    const handleCloseSnackbar = (event?: React.SyntheticEvent, reason?: string) => {
        if (reason === 'clickaway') return
        dispatch(errorAlert(false))
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
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Login
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
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
                        <FormControlLabel
                            control={<Checkbox value="remember" color="primary" />}
                            label="Remember me"
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                            disabled={logging}
                        >
                            {logging ? <CircularProgress size={24} /> : 'Login'}
                        </Button>
                        <ErrorSnackbar
                            open={errorSnackbar}
                            errorMessage={errorMessage}
                            handleCloseSnackbar={handleCloseSnackbar}
                        />
                        <Grid container>
                            <Grid item xs>
                                <Link to="/auth/resetPassword">
                                    Forgot password?
                                </Link>
                            </Grid>
                            <Grid item>
                                <Link to="/auth/register">
                                    Don't have an account? Register
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    )
};

export default AuthLoginPage;
