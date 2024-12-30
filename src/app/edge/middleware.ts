import { type NextRequest } from "next/server";
import { getAuth } from "./utils";

class TrieNode {
  isEnd: boolean;
  children: Map<string, TrieNode>;
  dynamicChild?: TrieNode;

  constructor() {
    this.isEnd = false;
    this.children = new Map();
  }
}

class Trie {
  private root: TrieNode;
  private memoize: Map<string, boolean> = new Map();

  constructor(paths: string[]) {
    this.root = new TrieNode();
    this.build(paths);
  }

  // Build the Trie from a list of paths
  private build(paths: string[]) {
    for (const path of paths) {
      let currentNode = this.root;
      const segments = path.split("/").filter(Boolean);

      for (let i = 0; i < segments.length; i++) {
        const segment = segments[i];
        const isDynamic = segment === ":path*";

        // Handle dynamic child separately
        if (isDynamic) {
          if (!currentNode.dynamicChild) {
            currentNode.dynamicChild = new TrieNode();
          }
          currentNode = currentNode.dynamicChild;

          // If this is the last segment, mark the dynamic child as an endpoint
          if (i === segments.length - 1) {
            currentNode.isEnd = true;
          }
        } else {
          if (!currentNode.children.has(segment)) {
            currentNode.children.set(segment, new TrieNode());
          }
          currentNode = currentNode.children.get(segment)!;
        }

        // Mark the end of a path
        if (i === segments.length - 1) {
          currentNode.isEnd = true;
        }
      }
    }
  }

  find(urlPath: string): boolean {
    if (this.memoize.has(urlPath)) {
      return this.memoize.get(urlPath)!;
    }

    const segments = urlPath.split("/").filter(Boolean);
    let currentNode = this.root;

    for (const segment of segments) {
      // Check for exact match in children
      if (currentNode.children.has(segment)) {
        currentNode = currentNode.children.get(segment)!;
      }
      // Check for dynamic child match
      else if (currentNode.dynamicChild) {
        currentNode = currentNode.dynamicChild;
      } else {
        this.memoize.set(urlPath, false);
        return false; // No match
      }
    }

    const result = currentNode.isEnd || !!currentNode.dynamicChild;
    this.memoize.set(urlPath, result);
    return result;
  }
}

export const getAuthMiddlware = (routes: string[]) => {
  const { find: isAuthRequired } = new Trie(routes);
  return async (request: NextRequest) => {
    const { pathname } = request.nextUrl ?? {};
    return isAuthRequired(pathname) && !!(await getAuth());
  };
};
