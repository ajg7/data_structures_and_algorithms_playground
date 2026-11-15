# Lab 01 — Pokédex Registry (Hash Map): Concepts

Milestones, challenges, the quiz and the rubric cite these sections by number.

## §1 The map ADT vs its implementation

An **abstract data type (ADT)** says *what* operations exist and what they mean, with no
word about how. The **map ADT** is: associate keys with values, then `set`, `get`, `has`,
`delete`, count them (`size`), and walk every pair.

An **implementation** is one concrete way to deliver that contract. Your `HashMap` is one.
Lab 04's `TreeMap` (a binary search tree) is another. Same ADT, no shared code, and
different guarantees:

| Operation | HashMap (average) | HashMap (worst) | TreeMap (balanced) |
|---|---|---|---|
| get / set / has / delete | O(1) | O(n) | O(log n) |
| iterate in key order | not supported | — | O(n) |

In TypeScript the ADT is an `interface` (`MapLike<K, V>`), and an implementation says
`implements MapLike<K, V>`. Code written against the interface works with either one.
When an interviewer says "use a hash map", they mean the ADT plus the O(1)-average
promise. Being able to say which promise you're relying on is the point of this section.

## §2 Hashing

A **hash function** turns a key into an integer. A bucket index is then
`hash(key) % capacity`. A good hash function for a map must be:

- **Deterministic**: the same key always gives the same number. If it didn't, `get` would
  look in a different bucket than `set` used.
- **Fast**: it runs on every operation, so it should be O(length of the key).
- **Well spread**: different keys should land in different buckets as often as possible.
  The polynomial hash `h = h * 31 + charCode` mixes every character in and its position,
  so "ab" and "ba" hash differently.

Equal keys must hash equally; unequal keys *may* collide. The map stays correct with any
deterministic hash, even a terrible one. Only speed depends on spread.

## §3 Collisions and separate chaining

Two keys that map to the same bucket **collide**. Collisions are unavoidable: there are
more possible keys than buckets (pigeonhole principle).

**Separate chaining** makes each bucket a list. `set` scans the bucket for the key, then
overwrites or appends. `get`, `has` and `delete` scan the bucket too. Each operation costs
O(1 + length of that bucket).

If the hash function sends every key to one bucket, that bucket holds all n entries, and
every operation is O(n): the hash map has degraded into the flat list it replaced.

## §4 Load factor and resizing

The **load factor** is `size / capacity`, the average entries per bucket. With a
well-spread hash, the expected bucket length is about the load factor, so keeping it
below a constant (0.75 here) keeps operations O(1) on average.

When an insert would push the load factor over the limit, **resize**: allocate double the
buckets and **rehash** every entry, because `hash % capacity` changes when capacity
changes. Copying the old buckets over as-is would put keys where `get` can't find them.

## §5 Amortized analysis of doubling

A single resize costs O(n): every entry is rehashed. That sounds bad, but it's rare.
Starting from 8 buckets and doubling, inserting n entries triggers resizes that copy about
6, 12, 24, …, up to n entries in total. That geometric series sums to less than 2n.

So n inserts cost O(n) total, and the **amortized** cost per insert is O(1). Amortized
means averaged over a sequence of operations, guaranteed. It's not the same as average
case (§3), which depends on how keys happen to hash.

Growing by a *constant* (say +8 buckets) instead of doubling breaks this: resizes come
every 8 inserts and each copies everything, giving O(n²) total.

## §6 Hashing patterns for problems

A hash map turns "have I seen this?" from an O(n) scan into an O(1) lookup. Most
array-and-hashing problems are one of these shapes.

### §6.1 Seen-set
Walk the input once and record each item as seen. The first time you meet an item that's
already recorded, you've found a duplicate. O(n) time, O(n) space, versus O(n²) for
comparing every pair or O(n log n) for sorting first.

### §6.2 Canonical key grouping
To group items that are "the same" under some equivalence, compute a **canonical key**
that's identical for equivalent items (for anagrams, the sorted letters), and map
key → list of items. The equivalence becomes plain key equality.

### §6.3 Complement lookup
To find two items that combine to a target (`a + b = target`), walk once and, for each
item, ask the map whether its **complement** (`target - a`) was already seen. Store
value → index. One pass, O(n).

### §6.4 Frequency counting
Map item → count in one pass. Then answer questions about counts: the most common, the
top k (sort the distinct items by count, O(d log d) for d distinct items), or whether
two collections have the same counts.

### §6.5 Membership for runs
Put every number in a map used as a set. A number `x` starts a run only if `x - 1` is
absent. From each start, count upward while `x + 1` is present. Each number is visited
by at most one run, so the whole thing is O(n), with no sorting.

## §7 Iteration order

A hash map iterates in **bucket order**, which depends on hash values and capacity, not
on insertion order, and it can change after a resize. JavaScript's built-in `Map` happens
to keep insertion order, but that's an extra feature, not part of the map ADT. If a
problem needs "in order of first appearance", keep that order yourself, for example in
an array alongside the map.
