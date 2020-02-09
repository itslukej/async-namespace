declare module 'async-namespace' {
  export class Namespace<K = any, V = any> {
    constructor(name?: string);
    name: string;
    maps: Map<number, Map<K, V>>;
    hook: import("async_hooks").AsyncHook;
  
    get map(): Map<K, V> | undefined;
    get(key: K): V | undefined;
    set(key: K, value: V): V;
    keys(): IterableIterator<K>;
    values(): IterableIterator<V>;
    entries(): IterableIterator<[K, V]>;
    clear(): void;
    delete(key: K): boolean;
    destroy(): void;
    static for<K = any, V = any>(name: string): Namespace<K, V>;
  }
}