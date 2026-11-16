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

### [2.1] The map ADT and the challenges
Read `concepts.md` first (§1–§7). Then, in this order:

1. **`src/map-like.ts`**: write the `MapLike<K, V>` interface, then make your `HashMap`
   declare `implements MapLike<K, V>` (§1). Check with `npx tsc --noEmit` and
   `tests/map-like.test.ts`.
2. **`challenges/01` → `05`**: each file's header comment is the spec. Every one imports
   your `HashMap`; built-in `Map`/`Set` are blocked by a test.

   | # | Challenge | Pattern | § |
   |---|---|---|---|
   | 01 | Shiny Duplicates | Seen-set | §6.1 |
   | 02 | Unown Anagram Groups | Canonical key grouping | §6.2, §7 |
   | 03 | Trade Pair Finder | Complement lookup | §6.3 |
   | 04 | Most-Caught Species | Frequency counting (top-k) | §6.4 |
   | 05 | Longest Pokédex-Number Streak | Membership for runs | §6.5 |

3. **Checkpoint (break it deliberately):** make `hash()` return a constant. Before
   running anything, write down which tests you expect to still pass and what happens
   to the time complexity. Run the timing test once *before* the change too, so you
   have a baseline. Run only these two files:
   `npx vitest run labs/01-pokedex-registry/tests/hash-map.test.ts labs/01-pokedex-registry/tests/timing.test.ts --reporter=verbose`
   and compare. Put `hash()` back afterwards.

Run one challenge: `npx vitest labs/01-pokedex-registry/tests/challenges/01`
