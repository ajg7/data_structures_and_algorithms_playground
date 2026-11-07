// ============================================================
// THIS IS YOUR FILE. Lab 01: Pokédex Registry (Hash Map).
// Replace every `throw new Error('TODO ...')` until the tests pass.
// Do not use Map, Set, or plain objects as dictionaries.
// ============================================================

export type HashMapOptions<K> = {
  /** Starting number of buckets. Default 8. */
  capacity?: number
  /** Override the hash function (tests use this to force collisions). */
  hash?: (key: K) => number
}

export class HashMap<K extends string | number, V> implements Iterable<[K, V]> {
  static readonly LOAD_FACTOR = 0.75

  constructor(options: HashMapOptions<K> = {}) {
    void options
    throw new Error('TODO [1.1]: set up the buckets')
  }

  /** Number of buckets currently allocated. */
  get capacity(): number {
    throw new Error('TODO [1.3]')
  }

  /** Number of key/value pairs stored. */
  get size(): number {
    throw new Error('TODO [1.2]')
  }

  /** Default hash: turn a string or number key into a non-negative integer. */
  hash(key: K): number {
    void key
    throw new Error('TODO [1.1]')
  }

  set(key: K, value: V): this {
    void key
    void value
    throw new Error('TODO [1.1]')
  }

  get(key: K): V | undefined {
    void key
    throw new Error('TODO [1.1]')
  }

  has(key: K): boolean {
    void key
    throw new Error('TODO [1.1]')
  }

  delete(key: K): boolean {
    void key
    throw new Error('TODO [1.2]')
  }

  [Symbol.iterator](): Iterator<[K, V]> {
    throw new Error('TODO [1.4]')
  }
}
