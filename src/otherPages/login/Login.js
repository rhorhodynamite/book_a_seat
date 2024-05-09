import React, { useState, useContext, useRef } from 'react';
import AuthContext from '../../context/AuthProvider';
import supabase from '../../supabase';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';

const Login = () => {
    const { setToken } = useContext(AuthContext);
    const userRef = useRef(null);
    const [username, setUsername] = useState('');  // Renamed to username to avoid shadowing
    const [pwd, setPwd] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Renamed the destructured `user` variable to avoid conflict with the state `user`
        const { user: loginUser, session, error } = await supabase.auth.signIn({
            email: username,  // Now using the state 'username'
            password: pwd,
        });

        if (error) {
            setErrMsg('Login failed: ' + error.message);
            setSuccess(false);
        } else if (session) {
            setToken(session.access_token);  // Assuming you handle the session appropriately
            setUsername('');  // Clear the username state
            setPwd('');
            setSuccess(true);
            // Navigate to dashboard or wherever next in the app
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    id="username"
                    ref={userRef}
                    autoComplete="off"
                    onChange={(e) => setUsername(e.target.value)}  // Updated to setUsername
                    value={username}  // Updated to username
                    required
                />
                <input
                    type="password"
                    id="password"
                    onChange={(e) => setPwd(e.target.value)}
                    value={pwd}
                    required
                />
                <Button type="submit">Sign In</Button>
            </form>
            {errMsg && <Alert variant="danger">{errMsg}</Alert>}
        </div>
    );
};

export default Login;

