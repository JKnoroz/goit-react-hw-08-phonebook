import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { setCredentials } from '../../redux/auth/authSlice';
import {
  useRegisterUserMutation,
  useLoginUserMutation,
} from '../../redux/phonebook';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import s from './AuthForm.module.css';

function AuthForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nameError, setNameError] = useState(null);
  const [emailError, setEmailError] = useState(null);
  const [passwordError, setPasswordError] = useState(null);

  const [registerUser] = useRegisterUserMutation();
  const [loginUser, { error }] = useLoginUserMutation();

  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    reset();
  }, [location]);

  const validateUser = () => {
    const validationEmailExp =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    const emailChek = validationEmailExp.test(String(email).toLowerCase());

    let passedValidation = true;

    if (email === '') {
      toast('Enter email');
      passedValidation = false;
    } else if (!emailChek) {
      toast(
        'Invalid email address. Valid e-mail can contain only latin letters, numbers, @ and .',
      );
      passedValidation = false;
      // setEmail('');
    }

    if (password === '') {
      toast('Enter password');
      passedValidation = false;
    } else if (password.length < 7) {
      toast('Password too short');
      passedValidation = false;
      // setPassword('');
    }

    if (location.pathname === '/login') {
      return passedValidation;
    }

    if (name === '') {
      toast('Enter name');
      passedValidation = false;
    }

    return passedValidation;
  };

  function reset() {
    setName('');
    setEmail('');
    setPassword('');
    setEmailError(null);
    setPasswordError(null);
  }

  function handleSubmitReg(e) {
    e.preventDefault();

    const validationResult = validateUser();

    if (validationResult === false) {
      return;
    } else {
      registerUser({ email, password, name })
        .then(({ data }) => dispatch(setCredentials(data)))
        .catch(r => console.log(r));

      reset();
    }
  }

  function handleSubmitSignin(e) {
    e.preventDefault();

    const validationResult = validateUser();

    if (validationResult === false) {
      return;
    } else {
      loginUser({ email, password });
      reset();
    }
  }

  return (
    <div className={s.formContainer}>
      <h2>{location.pathname === '/login' ? 'Sign in' : 'Registration'}</h2>
      <form
        onSubmit={
          location.pathname === '/login' ? handleSubmitSignin : handleSubmitReg
        }
      >
        {location.pathname === '/registration' && (
          <label className={s.label}>
            Name:
            <input
              type="text"
              name="name"
              className={s.input}
              pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
              title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
              required
              value={name}
              onChange={({ target }) => {
                setName(target.value);
                setNameError(null);
              }}
              // error={nameError && true}
              // helperText={nameError}
            ></input>
          </label>
        )}
        <label className={s.label}>
          E-mail:
          <input
            type="tel"
            name="number"
            className={s.input}
            // pattern="/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/</>"
            title="E-mail"
            required
            value={email}
            onChange={({ target }) => {
              setEmail(target.value);
              setEmailError(null);
            }}
            // error={emailError && true}
            // helperText={emailError}
          ></input>
        </label>
        <label className={s.label}>
          Password:
          <input
            type="text"
            name="password"
            className={s.input}
            title="Password must be of at least 7 symbols"
            required
            value={password}
            onChange={({ target }) => {
              setPassword(target.value);
              setPasswordError(null);
            }}
            // error={passwordError && true}
            // helperText={passwordError}
          ></input>
        </label>
        <button type="submit" className={s.button}>
          {location.pathname === '/login' ? 'Sign in' : 'Submit'}
        </button>
      </form>
      <div className={s.errorContainer}>
        {error?.status === 400 && 'User not found or password incorrect'}
      </div>
      <ToastContainer />
    </div>
  );
}

export default AuthForm;
