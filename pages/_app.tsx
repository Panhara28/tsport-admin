import '../styles/assets/main.scss';
import '../styles/assets/scss/theme.scss';
import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import store from '../src/store';
import { TokenContainer } from '../src/components/Authentication/TokenContext';
import ApolloContext from '../src/components/Authentication/ApolloContext';
import LoginVerification from '../src/components/Authentication/LoginVerification';
import AppScreen from '../src/components/AppScreen';
import { ApolloProvider } from '@apollo/client';
import { useMemo } from 'react';
import createApolloClient, { myClient } from '../libs/client';
import { AuthProvider } from '../src/hook/auth';

function MyApp({ Component, pageProps }: any) {
  return (
    // <Provider store={store}>
    //   <TokenContainer>
    //     <ApolloContext>
    //       <Authentication>
    //         <AppScreen>
    //           <Component {...pageProps} />
    //         </AppScreen>
    //       </Authentication>
    //     </ApolloContext>
    //   </TokenContainer>
    // </Provider>
    <TokenContainer>
      <AuthProvider>
        <LoginVerification>
          <AppScreen>
            <Component {...pageProps} />
          </AppScreen>
        </LoginVerification>
      </AuthProvider>
    </TokenContainer>

  );
}

export default MyApp;

