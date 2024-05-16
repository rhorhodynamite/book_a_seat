import { useRef, useState, useEffect, useContext } from 'react';
import AuthContext from '../../context/AuthProvider';
import styled from 'styled-components';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import Form from 'react-bootstrap/Form';
import axios from '../../api/axios';

const SERVER_URL = process.env.REACT_APP_SERVER_URL;
const LOGIN_URL = SERVER_URL + 'api/login';

const ElementStyle = styled.div`
  {
    margin-top: 2rem;
    text-align: center;
  }

  section {
    width: 100%;
    max-width: 400px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    padding: 2rem;
    border: 1px solid rgba(0, 0, 0, 0.1);
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    background-color: #fff;
  }

  h1 {
    margin-bottom: 1rem;
    font-size: 2rem;
    color: #333;
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .form-group {
    display: flex;
    flex-direction: column;
  }

  label {
    margin-bottom: 0.5rem;
    font-weight: bold;
    color: #555;
  }

  input {
    padding: 0.5rem;
    border: 1px solid rgba(0, 0, 0, 0.2);
    border-radius: 4px;
  }

  .form-control {
    margin-bottom: 1rem;
  }

  .btn {
    padding: 0.75rem;
    border: none;
    border-radius: 4px;
    background-color: #007bff;
    color: #fff;
    font-size: 1rem;
    cursor: pointer;
    transition: background-color 0.3s;
  }

  .btn:hover {
    background-color: #0056b3;
  }

  .line {
    display: inline-block;
    margin-top: 1rem;
  }

  .line a {
    color: #007bff;
    text-decoration: none;
  }

  .line a:hover {
    text-decoration: underline;
  }

  .wrapper_gif {
    margin-top: 2rem;
    border: 1px solid rgba(0, 0, 0, 0.1);
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    max-width: 100%;
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
        // console.log({ user, role, accessToken });
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
    <ElementStyle>
      <section>
        {errMsg && (
          <Alert key="danger" variant="danger"
            ref={errRef}
            className={errMsg ? 'errmsg' : 'offscreen'}
          >
            {errMsg}
          </Alert>
        )}
        <h1>Sign In</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
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
          </div>

          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              onChange={(e) => setPwd(e.target.value)}
              value={pwd}
              required
              className="form-control"
            />
          </div>
          <Button type="submit" className="btn">Sign In</Button>
        </form>
        <p className="line">
          Need an Account? <a href="/register">Sign Up</a>
        </p>
      </section>

      <img className="wrapper_gif" src={require('./img2_readme.gif')} alt="Prototype video" />
    </ElementStyle>
  );
};

export default Login;
