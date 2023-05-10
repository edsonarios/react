import React from 'react';
import { Button } from '@mui/material';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { useNavigate } from 'react-router-dom';
import { actionsAuth } from '@/sections/auth/auth-actions';

const LogoutButton: React.FC = () => {
    const navigate = useNavigate();
    const { logoutSubmit } = actionsAuth()

    return (
        <Button
            variant="contained"
            color="secondary"
            onClick={() => logoutSubmit(navigate)}
            startIcon={<ExitToAppIcon />}
            sx={{
                position: 'fixed',
                right: '16px',
                bottom: '16px',
                background: '#3d82eb',
                "&": 'hover{background:#0e4ca8}',
            }}
        >
            Logout
        </Button>
    );
};

export default LogoutButton;
