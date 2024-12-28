import { getServerAuth } from "@/rsc";
import React, { PropsWithChildren } from "react";
import { AuthStore } from "@/_internal/store";

export const AuthProvider = async ({ children }: PropsWithChildren) => {
  const data = await getServerAuth();
  return <AuthStore data={data}>{children}</AuthStore>;
};
