// ============================================================
// THIS IS YOUR FILE. Lab 01, milestone 2.1: the map ADT (concepts.md §1).
//
// Write the MapLike<K, V> interface: the map contract with no implementation.
// It must describe everything your HashMap already offers to callers:
//   - set, get, has, delete (same signatures as your HashMap)
//   - size (read-only number)
//   - iteration over [key, value] pairs
// Leave out anything that's specific to hashing (capacity, hash, LOAD_FACTOR):
// Lab 04's TreeMap will implement this same interface with no buckets at all.
//
// Then make your HashMap declare `implements MapLike<K, V>`.
// Checked by: tests/map-like.test.ts, and `npx tsc --noEmit` (the type check is
// the real test here, since an interface doesn't exist at runtime).
// ============================================================

// TODO(AJ): fill in the members.
export interface MapLike<K, V> {}
