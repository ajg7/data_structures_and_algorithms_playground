// ============================================================
// THIS IS YOUR FILE. Lab 01: Pokédex Registry (Hash Map).
// Replace every `throw new Error('TODO ...')` until the tests pass.
// Do not use Map, Set, or plain objects as dictionaries.
// ============================================================

export type HashMapOptions<K> = {
  /** Starting number of buckets. Default 8. */
  capacity?: number;
  /** Override the hash function (tests use this to force collisions). */
  hash?: (key: K) => number;
};

export class HashMap<K extends string | number, V> implements Iterable<[K, V]> {
  static readonly LOAD_FACTOR = 0.75;
  #buckets: Array<Array<[K, V]>>;
  #hash: (key: K) => number;
  #size: number;

  constructor(options: HashMapOptions<K> = {}) {
    this.#buckets = Array.from({ length: options.capacity ?? 8 }, () => []);
    this.#hash = options.hash ?? ((key) => this.hash(key));
    this.#size = 0;
  }

  /** Number of buckets currently allocated. */
  get capacity(): number {
    return this.#buckets.length;
  }

  /** Number of key/value pairs stored. */
  get size(): number {
    return this.#size;
  }

  /** Default hash: turn a string or number key into a non-negative integer. */
  hash(key: K): number {
    let total = 0;
    const precursor = String(key);
    for (const char of precursor) {
      const charRep = char.charCodeAt(0);
      total = (total * 31 + charRep) | 0;
    }
    return Math.abs(total);
  }

  set(key: K, value: V): this {
    const pair = this.#find(key);
    if (pair) {
      pair[1] = value;
      return this;
    }

    const bucketIdx = this.#hash(key) % this.#buckets.length;
    this.#buckets[bucketIdx].push([key, value]);
    this.#size++;
    if (this.#size / this.capacity > HashMap.LOAD_FACTOR) this.#resize();
    return this;
  }

  get(key: K): V | undefined {
    return this.#find(key)?.[1];
  }

  has(key: K): boolean {
    return !!this.#find(key);
  }

  delete(key: K): boolean {
    const bucketIdx = this.#hash(key) % this.#buckets.length;
    const bucket = this.#buckets[bucketIdx];
    for (let i = 0; i < bucket.length; i++) {
      if (bucket[i][0] === key) {
        bucket.splice(i, 1);
        this.#size--;
        return true;
      }
    }
    return false;
  }

  #find(key: K): [K, V] | undefined {
    const bucketIdx = this.#hash(key) % this.#buckets.length;
    for (const pair of this.#buckets[bucketIdx]) {
      if (pair[0] === key) return pair;
    }

    return undefined;
  }

  #resize() {
    const oldBuckets = this.#buckets;
    const newBuckets: Array<Array<[K, V]>> = Array.from(
      { length: this.capacity * 2 },
      () => [],
    );
    for (const bucket of oldBuckets) {
      for (const pair of bucket) {
        const bucketIdx = this.#hash(pair[0]) % newBuckets.length;
        newBuckets[bucketIdx].push(pair);
      }
    }
    this.#buckets = newBuckets;
  }

  *[Symbol.iterator](): Iterator<[K, V]> {
    for (const bucket of this.#buckets) {
      for (const pair of bucket) {
        yield [pair[0], pair[1]];
      }
    }
  }
}
