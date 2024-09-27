declare global {
    // for @AutoCreate decorator
    interface Function {
      create<T>(this: new () => T, data: Partial<T>): T;
    }
  }
  
  export {};