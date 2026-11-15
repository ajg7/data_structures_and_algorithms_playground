# Lab 01 — Pokédex Registry (Hash Map): Rubric

Used to grade explain-it answers, complexity analyses and mock-interview transcripts for
this lab. Each criterion scores 0–2. Every row traces to `concepts.md` or to something
built or broken in the lab.

| # | Criterion | 2 — strong | 1 — partial | 0 — missing | Source |
|---|---|---|---|---|---|
| 1 | ADT vs implementation | Separates the map contract from the hash table; names a second implementation and how its guarantees differ | Knows the interface exists but blurs it with the hashing details | Treats "map" and "hash table" as the same thing | §1, `MapLike` (2.1) |
| 2 | Hashing | Explains why the hash must be deterministic and well spread, and how the bucket index is computed | Mentions the hash but not why its properties matter | No account of how a key finds its bucket | §2, `hash()` (1.1) |
| 3 | Collisions | Explains separate chaining and that a collided bucket costs O(bucket length) | Knows collisions happen, vague on handling | Assumes keys never collide | §3, collision tests (1.1, 1.2) |
| 4 | Worst case | States O(n) per operation when all keys collide, and why | States O(n) without the reason | Claims O(1) always | §3, checkpoint 2.1 |
| 5 | Load factor and resize | Explains the load factor, why rehashing is required, and the doubling rule | Mentions resizing without rehash or the threshold | Doesn't address growth | §4, resize (1.3) |
| 6 | Amortized cost | Shows n inserts cost O(n) total via the geometric sum, and distinguishes amortized from average case | Says "amortized O(1)" without justification | Calls insert O(n) or O(1) with no qualification | §5 |
| 7 | Pattern choice | Names the hashing pattern the problem needs and why it beats sorting or nested loops | Uses a map but can't say what it buys | Reaches for nested loops or sorting without considering hashing | §6.1–§6.5, challenges 01–05 |
| 8 | Complexity of the solution | Gives time and space correctly, including the cost of building the key (e.g. sorting letters) | Gets time right, misses space or key cost | Wrong or missing complexity | §6, challenges 01–05 |
| 9 | Edge cases | Raises empty input, duplicates, self-pairing, negatives and order requirements unprompted | Handles some when asked | Misses them even when asked | Challenge specs and tests |
| 10 | Iteration order | Knows a hash map doesn't preserve insertion order and tracks order explicitly when needed | Notices the ordering issue only after a failing test | Assumes insertion order | §7, challenge 02 |

**Score:** sum ÷ 20. Record it with the confidence rating (1–5) in `attempts/`.
