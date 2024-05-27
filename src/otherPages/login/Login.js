import { useRef, useState, useEffect, useContext } from 'react';
import AuthContext from '../../context/AuthProvider';
import styled from 'styled-components';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import axios from '../../api/axios';
import '../../styles.css'; // Ensure this imports your stylesheet

const SERVER_URL = process.env.REACT_APP_SERVER_URL;
const LOGIN_URL = SERVER_URL + 'api/login';

const ElementStyle = styled.div`
  {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    background: #E7EAD4; /* Updated background color */
    text-align: center;
  }

  section {
    width: 100%;
    max-width: 400px;
    padding: 2rem;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    background: white;
  }

  h1 {
    margin-bottom: 1.5rem;
    color: #333;
  }

  form {
    display: flex;
    flex-direction: column;
    align-items: stretch;
  }

  label {
    margin-bottom: 0.5rem;
    font-weight: bold;
    color: #555;
  }

  input {
    padding: 0.75rem;
    margin-bottom: 1rem;
    border: 1px solid #ddd;
    border-radius: 5px;
    font-size: 1rem;
  }

  .btn {
    padding: 0.75rem;
    font-size: 1rem;
    border-radius: 5px;
    background-color: #007bff;
    border: none;
  }

  .btn:hover {
    background-color: #0056b3;
  }

  .alert {
    margin-bottom: 1rem;
  }

  p {
    margin-top: 1rem;
    color: #555;
  }

  .line {
    display: block;
    margin-top: 0.5rem;
  }

  .line a {
    color: #007bff;
    text-decoration: none;
  }

  .line a:hover {
    text-decoration: underline;
  }
`;


const Login = () => {
  const { setToken } = useContext(AuthContext);
  const userRef = useRef();
  const errRef = useRef();

  const [user, setUser] = useState('user1');
  const [pwd, setPwd] = useState('');
  const [errMsg, setErrMsg] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg('');
  }, [user, pwd]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        LOGIN_URL,
        JSON.stringify({ user, pwd }),
        {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        }
      );
      const accessToken = response?.data?.token;
      if (!accessToken) {
        setErrMsg('Login or password wrong...');
        setSuccess(false);
      } else {
        const role = response?.data?.role;
        setToken({ user, role, accessToken });
        setUser('');
        setPwd('');
        setSuccess(true);
      }
    } catch (err) {
      if (!err?.response) {
        setErrMsg('No Server Response');
      } else if (err.response?.status === 400) {
        setErrMsg('Missing Username or Password');
      } else if (err.response?.status === 401) {
        setErrMsg('Unauthorized');
      } else {
        setErrMsg('Login Failed');
      }
      errRef.current.focus();
    }
  };

  return (
    <>
      <div className="art-nouveau-center2"></div>
   
      <ElementStyle>
        <section>
          {errMsg && (
            <Alert key="danger" variant="danger" ref={errRef} className={errMsg ? 'alert' : 'offscreen'}>
              {errMsg}
            </Alert>
          )}
          <h1>Sign In</h1>
          <form onSubmit={handleSubmit} className="form-group">
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              ref={userRef}
              autoComplete="off"
              onChange={(e) => setUser(e.target.value)}
              value={user}
              required
              className="form-control"
            />

            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              onChange={(e) => setPwd(e.target.value)}
              value={pwd}
              className="form-control"
            />
            <Button type="submit" className="btn">Sign In</Button>
          </form>
          <p>
            Need an Account?
            <br />
            <span className="line">
              <a href="/register">Sign Up</a>
            </span>
          </p>
        </section>
      </ElementStyle>
    </>
  );
};

export default Login;

