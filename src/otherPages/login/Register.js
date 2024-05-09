// src/components/Register.js
import React, { useState } from 'react';
import supabase from '../supabase';

function Register() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async (event) => {
    event.preventDefault();
    setLoading(true);
    const { user, error } = await supabase.auth.signUp({
      email,
      password,
    });
    if (error) console.error('Error registering:', error.message);
    else console.log('User registered:', user);
    setLoading(false);
  };

  return (
    <form onSubmit={handleRegister}>
      <h2>Register</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit" disabled={loading}>
        {loading ? 'Loading...' : 'Register'}
      </button>
    </form>
  );
}

export default Register;
