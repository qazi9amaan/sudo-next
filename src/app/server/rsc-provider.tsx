import React, { PropsWithChildren } from "react";
import { AuthStore } from "../../core/store";
import { getAuth } from "./utils";

export const SudoAuthProvider = async ({ children }: PropsWithChildren) => {
  const data = await getAuth();
  return <AuthStore data={data}>{children}</AuthStore>;
};
