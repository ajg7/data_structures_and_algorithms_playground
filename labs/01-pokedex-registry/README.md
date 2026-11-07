# Lab 01 — Pokédex Registry (Hash Map)

Professor Oak's Pokédex has outgrown a flat list: looking up "Pikachu" by scanning 1,000+
entries is O(n). Build the registry as a **hash map** so lookup, insert and delete are
O(1) on average.

You build `HashMap<K, V>` from scratch with **separate chaining**: an array of buckets,
where each bucket holds every entry whose key hashed there. No `Map`, no `Object` as a
dictionary. Arrays for the buckets are fine.

**Your file:** `src/hash-map.ts`
**Run the tests:** `npx vitest labs/01-pokedex-registry`, or one milestone with
`npx vitest labs/01-pokedex-registry -t "\[1.1\]"`

## Milestones

### [1.1] Register and look up
Implement `hash`, `set`, `get` and `has`. `set` on an existing key overwrites the value.
Use the injected `hash` option when provided (tests use it to force collisions).

### [1.2] Release and count
Implement `delete` (returns whether something was removed) and `size`.

### [1.3] Grow the Pokédex
When `size / capacity` would exceed the load factor (0.75), double the capacity and
rehash every entry. Expose `capacity` so the tests can see it happen.

### [1.4] Walk the registry
Make the map iterable: `for (const [name, entry] of dex)` yields every key/value pair.

## Linked LeetCode problems
Added in a later phase of the build plan: 217, 242, 1, 49, 347, 238, 36, 128.
