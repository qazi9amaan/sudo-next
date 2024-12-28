import { type NextRequest } from "next/server";

import auth from "@/_internal/auth";
import { Trie } from "@/_internal/trie";
import { getSession } from "@/rsc/egde";

const authTrie = new Trie().buildTrie(auth.getAuthRoutes());

export const redirectIfNoAuth = async (request: NextRequest) => {
  // if auth is needed for this page
  if (authTrie.matchPathInTrie(request.nextUrl?.pathname)) {
    // if session is invalid or missing
    if (!(await getSession())) {
      // redirect to login page with next url
      return auth.onRedirectToLogin(request);
    }
    // continue to page if auth is valid
    return null;
  }
};
