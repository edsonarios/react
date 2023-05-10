import { useState } from 'react';
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
    CircularProgress,
    IconButton,
    InputAdornment
} from '@mui/material';
import { AccessibilityNewOutlined, Visibility, VisibilityOff } from '@mui/icons-material';
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

    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState(false);

    const [password, setPassword] = useState('');
    const [passwordError, setPasswordError] = useState(false);

    const [confirmPassword, setConfirmPassword] = useState('');
    const [confirmPasswordError, setConfirmPasswordError] = useState(false);

    const [showPassword, setShowPassword] = useState(false);

    const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const emailValue = event.target.value;
        setEmail(emailValue);
        if (emailValue != '' && !validateEmail(emailValue)) {
            setEmailError(true);
        } else {
            setEmailError(false);
        }
    };

    const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const passwordValue = event.target.value;
        setPassword(passwordValue);
        checkPasswordsMatch(passwordValue, confirmPassword);
        if (passwordValue != '' && !validatePassword(passwordValue)) {
            setPasswordError(true);
        } else {
            setPasswordError(false);
        }
    };

    const handleConfirmPasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const confirmPasswordValue = event.target.value;
        setConfirmPassword(confirmPasswordValue);
        checkPasswordsMatch(password, confirmPasswordValue);
    };

    const checkPasswordsMatch = (password: string, confirmPassword: string) => {
        if (confirmPassword != '' && password !== confirmPassword) {
            setConfirmPasswordError(true);
        } else {
            setConfirmPasswordError(false);
        }
    };

    const validatePassword = (password: string) => {
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
            ;
        return passwordRegex.test(password);
    };

    const validateEmail = (email: string) => {
        const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
        return emailRegex.test(email);
    };

    const resetFields = () => {
        setEmail('');
        setPassword('');
        setConfirmPassword('');
    };

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
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main', background: '#1976d2' }}>
                        <AccessibilityNewOutlined />
                    </Avatar>
                    <Typography component="h2" variant="h5">
                        Register
                    </Typography>
                    <Box component="form"
                        onSubmit={(event) => {
                            event.preventDefault();
                            if (!confirmPasswordError) {
                                registerSubmit(event as React.FormEvent<HTMLFormElement>, resetFields);
                            }
                        }}
                        sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            autoFocus
                            value={email}
                            onChange={handleEmailChange}
                            error={emailError}
                            helperText={emailError ? "Please enter a valid email" : ""}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type={showPassword ? 'text' : 'password'}
                            id="password"
                            autoComplete="current-password"
                            value={password}
                            onChange={handlePasswordChange}
                            error={passwordError}
                            helperText={passwordError ? "Please enter a valid Password" : ""}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            onClick={() => setShowPassword(!showPassword)}
                                            onMouseDown={(event) => event.preventDefault()}
                                        >
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                        />
                        <div className='help-text-password'>
                            The password must be at least 8 characters long, one uppercase letter, one lowercase letter, one number, and one special character.
                        </div>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="repitPassword"
                            label="Repit Password"
                            type={showPassword ? 'text' : 'password'}
                            id="repitPassword"
                            autoComplete="current-password"
                            value={confirmPassword}
                            onChange={handleConfirmPasswordChange}
                            error={confirmPasswordError}
                            helperText={confirmPasswordError ? "Passwords do not match." : ""}
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                            disabled={confirmPasswordError || logging}
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
