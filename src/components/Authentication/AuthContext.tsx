import React from "react";

const AuthContext = React.createContext<{
  me?: any;
}>({});

export default AuthContext;
