/* eslint-disable @next/next/no-img-element */
import React from 'react';
import { gql, useMutation } from '@apollo/client';
import Notiflix from 'notiflix';
import style from './login.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGlobeAsia } from '@fortawesome/free-solid-svg-icons';
import XForm from '../Form/XForm';
import Image from 'next/image';
import { useAuth } from '../../hook/auth';

const LOGIN_MUTATION = gql`
  mutation signIn($input: SignInInput) {
    signIn(input: $input) {
      token
    }
  }
`;

export function LoginScreen() {
  let usernameInput: any;
  let passwordInput: any;
  const { signIn } = useAuth();

  function onSubmit(e: any) {
    e.preventDefault();
    signIn({ username: usernameInput.value, password: passwordInput.value });
  }

  return (
    <>
      <div className={style.loginContainer}>
        <header className={style.loginHeader}>
          <img src="/cpp-no-text.png" width={50} height={50} alt="" />
          &nbsp; Cambodia People Party Ministry Of Commerce
        </header>
        <div className={style.loginCard}>
          <h5>Login to continue to: Moc hub</h5>
          <div className="mt-3"></div>
          <label>Username</label>
          <XForm.Text ref={node => (usernameInput = node)} />
          <div className="mt-3"></div>
          <label>Password</label>
          <XForm.Text ref={node => (passwordInput = node)} type="password" />
          <div className="mt-3"></div>
          <button className={style.loginButton} onClick={onSubmit}>
            Login
          </button>
        </div>
      </div>
    </>
  );
}
