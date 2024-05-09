import React, { useState } from 'react';
import axios from 'axios';
import './RegistrationForm.css';

const RegistrationForm = () => {
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });

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
            const serverUrl = process.env.REACT_APP_SERVER_URL;  // Ensure this is set correctly
            const response = await axios.post(`${serverUrl}/register`, body, config);
            console.log(response.data); // Process the response data as needed
        } catch (err) {
            console.error(err.response ? err.response.data : err.message); // Improved error handling
        }
    };

    return (
        <form onSubmit={onSubmit}>
            <h2>Register</h2>
            <div>
                <label>Username</label>
                <input 
                    type="text" 
                    name="username" 
                    value={username} 
                    onChange={onChange} 
                    required 
                />
            </div>
            <div>
                <label>Password</label>
                <input 
                    type="password" 
                    name="password" 
                    value={password} 
                    onChange={onChange} 
                    required 
                />
            </div>
            <button type="submit">Register</button>
        </form>
    );
};

export default RegistrationForm;

