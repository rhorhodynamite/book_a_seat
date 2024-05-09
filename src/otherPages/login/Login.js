// components/Login.js
import React, { useState, useContext, useRef } from 'react';
import AuthContext from '../../context/AuthProvider';
import supabase from '../src/supabase';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';

const Login = () => {
    const { setToken } = useContext(AuthContext);
    const userRef = useRef(null);
    const [user, setUser] = useState('');
    const [pwd, setPwd] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        let { data: { session }, error } = await supabase.auth.signIn({
            email: user,  // Assuming 'user' field is used as email
            password: pwd,
        });

        if (error) {
            setErrMsg('Login failed: ' + error.message);
            setSuccess(false);
        } else if (session) {
            setToken(session.access_token);
            setUser('');
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
                    onChange={(e) => setUser(e.target.value)}
                    value={user}
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
