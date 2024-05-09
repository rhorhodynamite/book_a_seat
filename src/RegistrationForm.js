import React, { useState } from 'react';
import axios from 'axios';
import './RegistrationForm.css';

const RegistrationForm = () => {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        email: ''
    });

    const { username, password, email } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async e => {
        e.preventDefault();
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json'
                }
            };
            const body = JSON.stringify({ username, password, email });
            const response = await axios.post('http://localhost:3000/register', body, config);
            console.log(response.data); // Process the response data as needed
        } catch (err) {
            console.error(err.response.data); // Handle errors
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
                <label>Email</label>
                <input 
                    type="email" 
                    name="email" 
                    value={email} 
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
