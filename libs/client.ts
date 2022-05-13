import { ApolloClient, InMemoryCache, ApolloLink } from '@apollo/client';
import { BatchHttpLink } from '@apollo/client/link/batch-http';
import { createUploadLink } from 'apollo-upload-client';

export default function createApolloClient(token = '') {
  const uri = process.env.NEXT_PUBLIC_API_URL + '?token=' + token;
  const uploadLink = createUploadLink({ uri });
  const batch = new BatchHttpLink({ uri });
  const link = ApolloLink.split(op => op.operationName === 'singleUpload', uploadLink, batch);

  return new ApolloClient({
    uri,
    link,
    cache: new InMemoryCache(),
    defaultOptions: {
      query: {
        fetchPolicy: 'no-cache',
      },
      watchQuery: {
        fetchPolicy: 'no-cache',
      },
    },
  });
}
