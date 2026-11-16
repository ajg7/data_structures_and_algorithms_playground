# Curriculum Roadmap

The full topic map. Every lab here is in the MVP and is planned as a milestone in
`build-plan.md`. Topic coverage follows the roadmap.sh Computer Science roadmap (see the
coverage table at the bottom), plus the interview patterns that roadmap leaves out
(dynamic programming, intervals, union-find, range-query trees).
Every lab is Pokémon themed and keeps the canonical topic name next to the themed one.
Assessments are original: each lab ends in themed challenges solved with the structure
you built, plus quizzes, explain-its and mock interviews. No LeetCode.

Status: `MVP` = in build plan · `later` = parked · `done`

Lab numbers are the build order. A lab only depends on labs with a lower number.

## Foundations
| # | Topic | Themed lab | Builds | Status |
|---|---|---|---|---|
| 00 | Asymptotic notation: Big-O, Big-Theta, Big-Omega, common runtimes (constant, logarithmic, linear, polynomial, exponential, factorial), time/space, amortized analysis | Speed Stat Check (quiz only) | — | MVP |
| 05 | Recursion and the call stack, tail vs non-tail recursion, memoization | Mt. Moon Descent | recursive helpers, tail-recursive rewrites, memo table | MVP |
| 30 | Complexity classes: P, NP, co-NP, NP-hard, NP-complete, P = NP, with TSP, knapsack and longest path | Elite Four Gauntlet (quiz only) | — | MVP |

## Data structures
| # | Topic | Themed lab | Builds | Patterns applied | Status |
|---|---|---|---|---|---|
| 01 | Arrays & hashing | Pokédex Registry | `HashMap<K,V>` (chaining, resize) | Arrays & Hashing | MVP |
| 02 | Deque / ring buffer | Fury Cutter Chain | `Deque<T>` | Two Pointers, Sliding Window | MVP |
| 03 | Stack, queue, linked lists, LRU cache | Bill's PC | `Stack<T>`, `Queue<T>`, `SinglyLinkedList<T>`, DLL, `LRUCache` | Stack, Linked List | MVP |
| 04 | Binary trees, BST; full, complete, balanced and unbalanced trees | Evolution Tree | `BinaryTree<T>`, `BST<T>`, `TreeMap` | Trees | MVP |
| 07 | Heap / priority queue | Turn Order | `BinaryHeap<T>` with comparator, `PriorityQueue<T>` | Heap / Priority Queue | MVP |
| 09 | Trie | Pokédex Search | `Trie` | Tries | MVP |
| 10 | Cache eviction: LFU, MFU (alongside Lab 03's LRU) | Poké Mart Stockroom | `LFUCache`, `MFUCache` behind a `Cache<K,V>` interface | Caches | MVP |
| 11 | Skip list | Magnet Train | `SkipList<K,V>` | — | MVP |
| 12 | Balanced search trees: AVL | Battle Tower Rankings | `AVLTree<T>` (rotations, height balance) | Balanced Trees | MVP |
| 13 | B-trees: 2-3, 2-3-4, k-ary / m-ary nodes | PC Storage Index | `BTree<K>` with configurable order | Balanced Trees | MVP |
| 14 | Red-black trees | Hall of Fame Ledger | `RedBlackTree<T>` | Balanced Trees | MVP |
| 15 | K-d trees | Nearest Pokémon Center | `KdTree` (build, nearest neighbor, range search) | — | MVP |
| 16 | Segment tree / Fenwick tree | Damage Log | `SegmentTree`, `FenwickTree` | Range Queries | MVP |
| 17 | Graphs: directed, undirected, adjacency list, adjacency matrix | Kanto Route Map | `Graph<T>` (list and matrix representations) | Graphs | MVP |
| 18 | Union-find (disjoint set) | Link Cable Groups | `DisjointSet` (union by rank, path compression) | Advanced Graphs | MVP |

## Algorithms and patterns
| # | Topic | Themed lab | Patterns applied | Status |
|---|---|---|---|---|
| 02 | Two pointers, sliding window | Fury Cutter Chain | Two Pointers, Sliding Window | MVP |
| 04 | Tree traversals: pre-order, in-order, post-order, BFS, DFS | Evolution Tree | Trees | MVP |
| 06 | Searching: linear search, binary search | TM Case Lookup | Binary Search | MVP |
| 08 | Sorting: bubble, selection, insertion, merge, quick, heap, counting | Box Sorter (visualizer-heavy) | Sorting | MVP |
| 17 | Graph BFS / DFS, topological sort | Kanto Route Map | Graphs | MVP |
| 19 | Shortest paths: Dijkstra, Bellman-Ford, A* | Fly Network | Advanced Graphs | MVP |
| 20 | Spanning trees, minimum spanning tree: Kruskal's algorithm, Prim's algorithm | Power Plant Grid | Advanced Graphs | MVP |
| 21 | Network flow: Ford-Fulkerson | Silph Co. Supply Lines | Advanced Graphs | MVP |
| 22 | Backtracking: N-Queens, Knight's Tour, Hamiltonian paths and cycles, maze solving, permutations | Safari Zone Paths | Backtracking | MVP |
| 23 | Greedy, Huffman coding | Bag Space | Greedy | MVP |
| 24 | Intervals | Gym Schedule | Intervals | MVP |
| 25 | 1-D dynamic programming | EV Training Planner | 1-D DP | MVP |
| 26 | 2-D dynamic programming, 0/1 knapsack | Rock Tunnel Grid | 2-D DP | MVP |
| 27 | String search: brute force, Rabin-Karp, Knuth-Morris-Pratt, Boyer-Moore, suffix arrays | Unown Decoder | String Search | MVP |
| 28 | Bitwise operators, bit manipulation | Status Condition Flags | Bit Manipulation | MVP |
| 29 | Math & geometry, probability, combinatorics | Catch Rate Calculator | Math & Geometry | MVP |

## Interview practice (app features)
| Feature | Status |
|---|---|
| Timed AI mock interview on any lab challenge | MVP |
| Explain-it rubric grading | MVP |
| Per-pattern mastery + calibration dashboard | MVP |
| Challenge-variant generator | later |
| Spaced-repetition review queue | later |
| In-browser timed drill editor | later |

## Roadmap coverage
Every node of the roadmap.sh Computer Science roadmap that is in scope, and the lab that
covers it. Check this table when a lab's `concepts.md` is written: each node listed
against a lab needs a § there.

| Roadmap section | Node | Lab |
|---|---|---|
| Data Structures | Array, Hash Table | 01 |
| | Linked List, Stack, Queue | 03 |
| | Tree, Binary Tree, Binary Search Tree | 04 |
| | Full, Complete, Balanced, Unbalanced Tree | 04 |
| | Heap | 07 |
| | Graph, Directed, Undirected, Adjacency Matrix, Adjacency List | 17 |
| | Spanning Tree | 20 |
| Asymptotic Notation | Big O, Big-Theta, Big Omega | 00 |
| | Constant, Logarithmic, Linear, Polynomial, Exponential, Factorial | 00 |
| Recursion | Tail Recursion, Non-Tail Recursion | 05 |
| Caches | LRU Cache | 03 |
| | LFU Cache, MFU Cache | 10 |
| Searching | Linear Search, Binary Search | 06 |
| Sorting | Bubble, Selection, Insertion, Merge, Quick | 08 |
| | Heap Sort | 08 (on Lab 07's heap) |
| Tree algorithms | Pre-Order, In-Order, Post-Order, BFS, DFS | 04 |
| Graph algorithms | Breadth First Search, Depth First Search | 17 |
| | Dijkstra's, Bellman-Ford's, A* | 19 |
| Back Tracking | N Queen, Knight's Tour, Hamiltonian Paths (and cycles), Maze Solving | 22 |
| Greedy Algorithms | Dijkstra's | 19 |
| | Kruskal's, Prim's | 20 |
| | Ford-Fulkerson | 21 |
| | Huffman Coding | 23 |
| String Search & Manipulations | Brute Force, Rabin-Karp, Knuth-Morris-Pratt, Boyer-Moore | 27 |
| | Search Pattern in Text, Suffix Arrays | 27 |
| Bitwise Operators | — | 28 |
| Basic Math Skills | Probability, Combinatorics | 29 |
| Complexity Classes | P, NP, Co-NP, NP Hard, NP Complete, P = NP | 30 |
| | Travelling Salesman, Knapsack, Longest Path | 30 (knapsack built in 26, Hamiltonian search in 22) |
| Tries | — | 09 |
| Balanced Search Trees | AVL Trees | 12 |
| | 2-3 Search Trees, 2-3-4 Trees, B-Tree, K-ary / M-ary Tree | 13 |
| | Red / Black Trees | 14 |
| K-D Trees | — | 15 |
| Skip Lists | — | 11 |

**Out of scope** (AJ's call): Pick a Language, Design Patterns, Common UML Diagrams,
System Design, Databases, Security, Networking, How Computers Work, Processes and Threads,
Endianness, Floating Point Math, Character Encodings. This playground is DSA only.
