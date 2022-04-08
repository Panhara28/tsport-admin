import '../styles/assets/main.scss';
import '../styles/assets/scss/theme.scss';
import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import store from '../src/store';
import { TokenContainer } from '../src/components/Authentication/TokenContext';
import ApolloContext from '../src/components/Authentication/ApolloContext';
import Authentication from '../src/components/Authentication/Authentication';
import AppScreen from '../src/components/AppScreen';

function MyApp({ Component, pageProps }: any) {
  return (
    <Provider store={store}>
      <TokenContainer>
        <ApolloContext>
          <Authentication>
            <AppScreen>
              <Component {...pageProps} />
            </AppScreen>
          </Authentication>
        </ApolloContext>
      </TokenContainer>
    </Provider>
  );
}

export default MyApp;
