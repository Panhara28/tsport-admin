import '../styles/assets/main.scss';
import '../styles/assets/scss/theme.scss';
import { Provider } from 'react-redux';
import store from '../src/store';
import { TokenContainer } from '../src/components/Authentication/TokenContext';
import LoginVerification from '../src/components/Authentication/LoginVerification';
import AppScreen from '../src/components/AppScreen';
import { AuthProvider } from '../src/hook/auth';

function MyApp({ Component, pageProps }: any) {
  return (
    <Provider store={store}>
      <TokenContainer>
        <AuthProvider>
          <LoginVerification>
            <AppScreen>
              <Component {...pageProps} />
            </AppScreen>
          </LoginVerification>
        </AuthProvider>
      </TokenContainer>
    </Provider>
  );
}

export default MyApp;
