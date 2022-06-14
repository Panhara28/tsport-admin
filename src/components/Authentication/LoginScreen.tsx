/* eslint-disable @next/next/no-img-element */
import React from 'react';
import { gql, useMutation } from '@apollo/client';
import style from './login.module.scss';
import XForm from '../Form/XForm';
import { useAuth } from '../../hook/auth';
import { setting } from '../../libs/settings';

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
          <div className={style.adminLogoContainer}>
            <img className={style.adminLogo} src={setting.logo ? setting.logo : '/logo/logo-placeholder.png'} alt="" />
          </div>
          <h3>{setting.title}</h3>
        </header>
        <div className={style.loginCard}>
          <h5>Login to continue to: {setting.title}</h5>
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
