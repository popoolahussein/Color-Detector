declare module 'fuse.js' {
    interface FuseOptions<T> {
      includeScore?: boolean;
      threshold?: number;
      keys?: (keyof T)[];
    }
  
    interface FuseResult<T> {
      item: T;
      score?: number;
    }
  
    export default class Fuse<T> {
      constructor(list: T[], options?: FuseOptions<T>);
      search(query: string): FuseResult<T>[];
    }
  }
  