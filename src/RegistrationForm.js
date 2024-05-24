import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Typography, Box, Alert } from '@mui/material';
import './styles.css'; // Import the CSS file

const RegistrationForm = () => {
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });
    const [message, setMessage] = useState(null);
    const navigate = useNavigate();

    const { username, password } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async e => {
        e.preventDefault();
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json'
                }
            };
            const body = JSON.stringify({ username, password });
            const serverUrl = process.env.REACT_APP_SERVER_URL;
            const response = await axios.post(`${serverUrl}api/register`, body, config);

            setMessage({ type: 'success', text: 'Registration successful! Redirecting to login...' });
            setTimeout(() => {
                navigate('/login'); // Redirect to login page
            }, 3000); // Wait for 3 seconds before redirecting
        } catch (err) {
            setMessage({ type: 'error', text: err.response ? err.response.data.error : err.message });
        }
    };

    return (
        <div className="centered-container">
            <div className="art-nouveau-center"></div>
            <Box
                component="form"
                onSubmit={onSubmit}
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    padding: 4,
                    backgroundColor: 'white',
                    borderRadius: 2,
                    boxShadow: 3,
                    zIndex: 1, // Ensure the form is above the background image
                    marginLeft: 115, // Add some margin to the left to move it to the right
                }}
            >
                <Typography component="h2" variant="h5">
                    Register
                </Typography>
                {message && (
                    <Alert severity={message.type} sx={{ mt: 2, mb: 2, width: '100%' }}>
                        {message.text}
                    </Alert>
                )}
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="username"
                    label="Username"
                    name="username"
                    autoComplete="username"
                    autoFocus
                    value={username}
                    onChange={onChange}
                />
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    value={password}
                    onChange={onChange}
                />
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    sx={{ mt: 3, mb: 2 }}
                >
                    Register
                </Button>
            </Box>
        </div>
    );
};

export default RegistrationForm;
