import React, { FC } from "react";
import Amplify from "aws-amplify";

import awsConfig from "../aws-exports";

const AmplifyClient: FC = ({ children }) => {
  Amplify.configure(awsConfig);

  return <>{children}</>;
};

export default AmplifyClient;
