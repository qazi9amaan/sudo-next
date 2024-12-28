import { Adapter } from "@/_internal/adapter";
import { Auth } from "@/_internal/auth";

export const setUpAuth = (auth = new Auth()) => {
  return auth;
};

export const setUpAdapter = (adapter = new Adapter()) => {
  return adapter;
};

export * from "@/client";
export * from "@/types";
export * from "@/rsc";
