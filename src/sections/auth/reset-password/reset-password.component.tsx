import {
    TextField,
    Button,
    Grid,
    Box,
    Container,
    CssBaseline,
    Avatar,
    Typography
} from '@mui/material';
import CachedOutlinedIcon from '@mui/icons-material/CachedOutlined';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Link } from "react-router-dom";
import { actionsAuth } from '../auth-actions';
const theme = createTheme();

const AuthResetPasswordPage = () => {
    const { resetPasswordSubmit } = actionsAuth()

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
                        <CachedOutlinedIcon />
                    </Avatar>
                    <Typography component="h2" variant="h5">
                        Reset Password
                    </Typography>
                    <Box component="form" onSubmit={(event) => resetPasswordSubmit(event as React.FormEvent<HTMLFormElement>)} sx={{ mt: 1 }}>
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
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Reset Password
                        </Button>
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

export default AuthResetPasswordPage;
