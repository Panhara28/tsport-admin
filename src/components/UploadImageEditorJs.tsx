import { createUploadLink } from "apollo-upload-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { ApolloClient } from "apollo-client";
import { gql } from "apollo-boost";

const UPLOAD = gql`
  mutation singleUpload($file: Upload!) {
    singleUpload(file: $file) {
      filename
      url
    }
  }
`;

function createApolloClient() {
  let url = process.env.NEXT_PUBLIC_API_URL;

  const uri = `${url}?token=` + localStorage.getItem("token");
  const client = new ApolloClient({
    link: createUploadLink({ uri }),
    cache: new InMemoryCache(),
  });

  return client;
}

export const UploadImageEditorJs = async (file: any) => {
  const { data } = await createApolloClient().mutate({
    mutation: UPLOAD,
    variables: {
      file,
    },
  });

  return data;
};
