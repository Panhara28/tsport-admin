import { ApolloClient, InMemoryCache, ApolloLink } from '@apollo/client';
import { BatchHttpLink } from '@apollo/client/link/batch-http';
import { createUploadLink } from 'apollo-upload-client';
import { setting } from '../src/libs/settings';

export default function createApolloClient(token = '') {
  const uri = setting.api + '?token=' + token;
  const uploadLink: any = createUploadLink({
    uri,
  });
  const batch = new BatchHttpLink({ uri });
  const link = ApolloLink.split(
    op => {
      if (op.operationName !== 'singleUpload') {
        return true;
      }
      return op.operationName === 'singleUpload';
    },
    uploadLink,
    batch,
  );

  return new ApolloClient({
    link,
    uri,
    cache: new InMemoryCache(),
    defaultOptions: {
      query: {
        fetchPolicy: 'network-only',
      },
      watchQuery: {
        fetchPolicy: 'network-only',
      },
    },
  });
}
