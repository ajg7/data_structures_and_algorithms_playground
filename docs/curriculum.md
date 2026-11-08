# Curriculum Roadmap

The full topic map. Concept order follows the roadmap.sh DSA roadmap, and problem lists
follow the NeetCode 150 pattern buckets. The MVP (marked **MVP**) is planned in detail in
`build-plan.md`. Everything else gets planned in batches once the lab format is proven.
Every lab keeps the canonical topic name next to the themed one. LeetCode problems are
linked by number and slug only: no copied statements, and local tests are our own.

Status: `MVP` = in build plan · `next` = candidate for the next batch · `later` = parked · `done`

## Foundations
| Topic | Themed lab | Builds | Status |
|---|---|---|---|
| Big-O, time/space, amortized analysis | 00 Speedrun Splits (quiz only) | — | MVP |
| Recursion and the call stack | Dungeon descent | recursive helpers, memo table | next |

## Data structures
| Topic | Themed lab | Builds | NeetCode bucket | Status |
|---|---|---|---|---|
| Arrays & hashing | 01 Pokédex Registry | `HashMap<K,V>` (chaining, resize) | Arrays & Hashing | MVP |
| Deque / ring buffer | 02 Combo Meter | `Deque<T>` | Two Pointers, Sliding Window | MVP |
| Stack, queue, linked lists | 03 Quest Log | `Stack<T>`, `Queue<T>`, `SinglyLinkedList<T>`, DLL for LRU | Stack, Linked List | MVP |
| Binary trees, BST | 04 Skill Tree | `BinaryTree<T>`, `BST<T>`, `TreeMap` | Trees | MVP |
| Trie | Pokédex autocomplete | `Trie` | Tries | next |
| Heap / priority queue | Raid boss threat table | `BinaryHeap<T>` with comparator | Heap / Priority Queue | next |
| Graphs (adjacency list/matrix) | Overworld map | `Graph<T>` | Graphs | next |
| Union-find (disjoint set) | Guild alliances | `DisjointSet` | Graphs / Advanced Graphs | later |
| Balanced trees (AVL / red-black) | Leaderboard index | `AVLTree<T>` | — | later |
| Segment tree / Fenwick | Damage log range queries | `SegmentTree`, `FenwickTree` | — | later |

## Algorithms and patterns
| Topic | Themed lab | NeetCode bucket | Status |
|---|---|---|---|
| Two pointers | 02 Combo Meter | Two Pointers | MVP |
| Sliding window | 02 Combo Meter | Sliding Window | MVP |
| Binary search | Loot table lookup | Binary Search | next |
| Sorting (merge, quick, heap, counting) | Card collection sorter (visualizer-heavy) | — | next |
| Backtracking | Team-builder permutations | Backtracking | next |
| BFS / DFS, topological sort | Overworld map, tech-tree unlock order | Graphs | next |
| Shortest paths (Dijkstra, Bellman-Ford), MST | Fast-travel network | Advanced Graphs | later |
| 1-D dynamic programming | Speedrun route optimizer | 1-D DP | next |
| 2-D dynamic programming | Grid dungeon paths | 2-D DP | later |
| Greedy | Inventory packing | Greedy | later |
| Intervals | Raid schedule merges | Intervals | later |
| Math & geometry | Hitbox math | Math & Geometry | later |
| Bit manipulation | Status-effect flags | Bit Manipulation | later |

## Interview practice (app features)
| Feature | Status |
|---|---|
| Timed AI mock interview on any linked problem | MVP |
| Explain-it rubric grading | MVP |
| Per-pattern mastery + calibration dashboard | MVP |
| Problem-variant generator | later |
| Spaced-repetition review queue | later |
| In-browser timed drill editor | later |
