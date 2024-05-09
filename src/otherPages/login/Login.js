import React, { useState, useContext, useRef } from 'react';
import AuthContext from '../../context/AuthProvider';
import supabase from '../../supabase';  // Ensure this path is correct
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';

const Login = () => {
    const { setToken } = useContext(AuthContext);
    const userRef = useRef(null);
    const [username, setUsername] = useState('');
    const [pwd, setPwd] = useState('');
    const [errMsg, setErrMsg] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(supabase.auth);  // Check if auth object is correct
        const { user, error } = await supabase.auth.signIn({
            email: username,
            password: pwd,
        });

        if (error) {
            setErrMsg('Login failed: ' + error.message);
        } else if (user) {
            setToken(user.access_token);  // Ensure token management logic is correct
            setUsername('');  // Clear the username state
            setPwd('');
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
                    onChange={(e) => setUsername(e.target.value)}
                    value={username}
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


