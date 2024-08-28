// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';




import React, { useState } from 'react';
import axios from 'axios';
import { FaUser, FaLock } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login } from './pathToYourLoginAction';  // Update with the correct path to your login action

const Login = () => {
  const [loginRole, setLoginRole] = useState('');
  const [lusername, setLusername] = useState('');
  const [lpassword, setLpassword] = useState('');
  const [errors1, setErrors1] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', {
        loginRole,
        username: lusername,
        password: lpassword
      });
      console.log(response.data);
      if (response.data.errors) {
        setErrors1(response.data.errors);
        console.log(errors1);
      } else {
        toast.success(response.data.message);
        console.log(response.data.user);
        dispatch(
          login({
            username: response.data.user.username,
            employeeId: response.data.user.employeeId,
            docId: response.data.user._id,
            isAdmin: response.data.user.isAdmin,
            allowances: response.data.user.allowances,
          })
        );
        if (loginRole === 'admin') {
          navigate("/admin/homePage");
        } else {
          navigate("/user/homePage");
        }
      }
    } catch (error) {
      console.error("Error during login: ", error);
      toast.error(error.message);
    }
  };

  return (
    <>
      <div className="Login">
        <div className='wrapper'>
          <form onSubmit={handleSubmit}>
            <h1>Login</h1>

            {/* Login As */}
            <div className='form-group'>
              <label htmlFor='loginRole'>Login as:</label>
              <div className='input-box'>
                <select
                  id='loginRole'
                  className='dropdown'
                  value={loginRole}
                  onChange={(e) => setLoginRole(e.target.value)}
                  required>
                  <option value=''>Select your role</option>
                  <option value='admin'>Admin</option>
                  <option value='employee'>Employee</option>
                </select>
              </div>
            </div>

            {/* Username */}
            <div className='form-group'>
              <label htmlFor='username'>Username:</label>
              <div className='input-box'>
                <input
                  type='text'
                  id='username'
                  placeholder='Enter your username'
                  value={lusername}
                  onChange={(e) => setLusername(e.target.value)}
                  autoComplete="off"
                  required
                />
                <FaUser className='icon' />
              </div>
            </div>

            {/* Password */}
            <div className='form-group'>
              <label htmlFor='password'>Password:</label>
              <div className='input-box'>
                <input
                  type='password'
                  id='password'
                  value={lpassword}
                  onChange={(e) => setLpassword(e.target.value)}
                  placeholder='Enter your password'
                  required
                />
                <FaLock className='icon' />
              </div>
            </div>

            {/* Login Button */}
            <button type='submit'>Login</button>

            {/* Register Link */}
            <div className='register-link'>
              <p>
                Don't have an account? <a className="btn btn-outline-danger" onClick={() => settoggle(1)}>Register</a>
              </p>
            </div>
          </form>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default Login;
