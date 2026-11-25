// Text for the 2D DP page. Keep it short: bullets, no filler.
const FAMILIES = [
  {
    id: 'A', name: 'Grid paths',
    points: ['Move through a grid in fixed directions, never back.', 'Count the routes or find the cheapest one.'],
    state: '<code>dp(i, j)</code> = answer for the trip from the start to <code>(i, j)</code>. Triangle and Dungeon run the other way.',
    diagram: 'familyGrid'
  },
  {
    id: 'B', name: 'Squares in a grid',
    points: ['Find or count squares made only of 1s.', 'Describe a square by its bottom-right corner.'],
    state: '<code>dp(i, j)</code> = side of the biggest all-1 square ending at <code>(i, j)</code>.',
    diagram: 'squares'
  },
  {
    id: 'C', name: 'Two strings',
    points: ['One pointer per string.', 'Each step: compare the two current letters, then decide.'],
    state: '<code>dp(i, j)</code> = answer for the first <code>i</code> letters of <code>a</code> and the first <code>j</code> letters of <code>b</code>.',
    diagram: 'strings'
  },
  {
    id: 'D', name: 'Intervals',
    points: ['One string or array.', 'The answer for <code>[i..j]</code> is built from smaller ranges inside it.', 'Fill short ranges first.'],
    state: '<code>dp(i, j)</code> = answer for the slice from <code>i</code> to <code>j</code>.',
    diagram: 'interval'
  },
  {
    id: 'E', name: 'Knapsack',
    points: ['A list of items and a budget (sum, amount).', 'For each item: take it or leave it.'],
    state: '<code>dp(i, c)</code> = answer using the first <code>i</code> items with budget <code>c</code>.',
    diagram: 'knap'
  },
  {
    id: 'F', name: 'Index + state',
    points: ['Walk through the days in order.', 'Carry a small mode: holding a share or not.'],
    state: '<code>dp(day, mode)</code> = best profit at the end of that day in that mode.',
    diagram: 'machine'
  }
];

// card: [state, choices, recurrence, base cases, answer, fill order]
const PROBLEMS = [
  // ===================== A =====================
  {
    id: 'A1', fam: 'A', lc: 62, title: 'Unique Paths', diff: 'Medium', url: 'https://leetcode.com/problems/unique-paths/', viz: 'uniquePaths',
    statement: 'Robot starts top-left of an <code>m × n</code> grid, moves only right or down. Count the routes to bottom-right.',
    example: 'm = 3, n = 7  →  28\nm = 3, n = 2  →  3',
    card: ['Ways to reach <code>(i, j)</code> from the start', 'Came from above or from the left', '<code>dp(i-1, j) + dp(i, j-1)</code>', 'Off the grid → <code>0</code>. Start → <code>1</code>', '<code>dp(m-1, n-1)</code>', 'Top-left → bottom-right'],
    moves: 'ul',
    notes: [
      'Every route into a cell arrives from above or from the left. The two groups never overlap, so add them.',
      'First row and first column are all 1: only one straight line reaches them.',
      'The padding row and column (dashed) are the "off the grid" zeros, so the loop needs no bounds check.'
    ],
    tries: [
      { q: 'Set m = 1, n = 5. What does the table look like?', a: 'One row of 1s. A corridor has one route.' },
      { q: 'Is there a formula?', a: 'C(m+n−2, m−1): choose which of the m+n−2 moves are "down". For 3 × 7 that is 28. The next problem breaks the formula, the DP does not.' }
    ],
    cx: 'Recursion O(2<sup>m+n</sup>). Memo / table O(m·n). One row: O(n) memory.'
  },
  {
    id: 'A2', fam: 'A', lc: 63, title: 'Unique Paths II', diff: 'Medium', url: 'https://leetcode.com/problems/unique-paths-ii/', viz: 'uniquePathsWithObstacles',
    statement: 'Same as A1, but some cells hold a rock (<code>1</code>) that the robot cannot enter.',
    example: '[[0,0,0],\n [0,1,0],\n [0,0,0]]  →  2',
    card: ['Ways to reach <code>(i, j)</code> avoiding rocks', 'From above or from the left', 'Same as A1', 'Off the grid → <code>0</code>. <b>Rock → <code>0</code></b>. Start → <code>1</code>', '<code>dp(m-1, n-1)</code>', 'Top-left → bottom-right'],
    moves: 'ul',
    notes: [
      'One extra base case: a rock contributes 0 routes.',
      'Check the rock before the start. A rock on the start means 0 routes, not 1.'
    ],
    tries: [
      { q: 'Put a rock on the start cell. What happens?', a: 'Every cell becomes 0. If the "is this the start?" check ran first, the start would return 1 and the answer would be wrong.' }
    ],
    cx: 'Same as A1.'
  },
  {
    id: 'A3', fam: 'A', lc: 64, title: 'Minimum Path Sum', diff: 'Medium', url: 'https://leetcode.com/problems/minimum-path-sum/', viz: 'minPathSum',
    statement: 'Each cell has a cost. Go from top-left to bottom-right moving right or down. Minimise the total.',
    example: '[[1,3,1],\n [1,5,1],\n [4,2,1]]  →  7   (1 → 3 → 1 → 1 → 1)',
    card: ['Cheapest cost to reach <code>(i, j)</code>, including it', 'From above or from the left', '<code>grid[i][j] + min(dp(i-1, j), dp(i, j-1))</code>', 'Off the grid → <code>Infinity</code>. Start → <code>grid[0][0]</code>', '<code>dp(m-1, n-1)</code>', 'Top-left → bottom-right'],
    moves: 'ul',
    notes: [
      'Counting → optimising, so <code>+</code> becomes <code>min</code>.',
      'Off the grid must be <code>Infinity</code>, not 0. <code>min</code> would happily pick a 0.',
      'To recover the path, start at the bottom-right and step back to the smaller of above / left.'
    ],
    tries: [
      { q: 'What goes wrong if off the grid returns 0?', a: 'Cells on the top row and left column pick the fake 0 instead of their real neighbour, so the answer comes out too small.' }
    ],
    cx: 'O(m·n) time. O(n) memory with one row.'
  },
  {
    id: 'A4', fam: 'A', lc: 120, title: 'Triangle', diff: 'Medium', url: 'https://leetcode.com/problems/triangle/', viz: 'minimumTotal',
    statement: 'From each number you may step to one of the two numbers directly below. Find the smallest top-to-bottom sum.',
    example: '      2\n     3 4\n    6 5 7\n   4 1 8 3     →  11   (2 + 3 + 5 + 1)',
    card: ['Cheapest sum from <code>(i, j)</code> down to the bottom', 'Down <code>(i+1, j)</code> or down-right <code>(i+1, j+1)</code>', '<code>t[i][j] + min(dp(i+1, j), dp(i+1, j+1))</code>', 'Bottom row → <code>t[i][j]</code>', '<code>dp(0, 0)</code>', '<b>Bottom → top</b>'],
    diagram: 'triangle',
    notes: [
      '<b>Why reverse:</b> the top has one cell, the bottom has many. Going bottom-up, the answer lands in one cell, <code>dp(0, 0)</code>, with no edge checks.',
      'Going top-down also works, but then you take the min over the whole last row.',
      'Stored left-aligned: "down" is the same column, "down-right" is the next one.'
    ],
    tries: [
      { q: 'The one-row version overwrites dp[j] left to right. Why is that safe?', a: 'Cell j reads only dp[j] and dp[j+1]. dp[j+1] is still the old row, and nothing later needs the old dp[j].' }
    ],
    cx: 'Memo / table O(n²). One row: O(n) memory.'
  },
  {
    id: 'A5', fam: 'A', lc: 931, title: 'Minimum Falling Path Sum', diff: 'Medium', url: 'https://leetcode.com/problems/minimum-falling-path-sum/', viz: 'minFallingPathSum',
    statement: 'Start on any cell of the top row. Each step falls down, down-left or down-right. Minimise the sum.',
    example: '[[2,1,3],\n [6,5,4],\n [7,8,9]]  →  13   (1 → 5 → 7)',
    card: ['Cheapest fall that lands on <code>(i, j)</code>', 'Came from up-left, up, or up-right', '<code>a[i][j] + min(of those three)</code>', 'Column off the edge → <code>Infinity</code>. Top row → <code>a[0][j]</code>', '<b>Smallest</b> value in the last row', 'Top row → bottom row'],
    moves: 'up3',
    notes: [
      'Two changes from A3: three choices, and any column can start or end.',
      'Any start: the whole top row is a base case.',
      'Any end: take the min over the last row.'
    ],
    tries: [
      { q: 'Why keep two rows instead of updating one array in place?', a: 'Cell j needs the old value at j−1. Updating left to right would already have overwritten it.' }
    ],
    cx: 'O(n²) time, O(n) memory.'
  },
  {
    id: 'A6', fam: 'A', lc: 174, title: 'Dungeon Game', diff: 'Hard', url: 'https://leetcode.com/problems/dungeon-game/', viz: 'calculateMinimumHP',
    statement: 'Knight goes from top-left to the princess at bottom-right, moving right or down. Rooms add or remove health. Health must stay ≥ 1. Find the lowest starting health.',
    example: '[[-2, -3,  3],\n [-5,-10,  1],\n [10, 30, -5]]  →  7',
    card: ['Health needed <b>on entering</b> <code>(i, j)</code>', 'Go right or down', '<code>max(1, min(dp(i, j+1), dp(i+1, j)) − d[i][j])</code>', 'Off the grid → <code>Infinity</code>. Princess → <code>max(1, 1 − d)</code>', '<code>dp(0, 0)</code>', '<b>Bottom-right → top-left</b>'],
    moves: 'rd',
    diagram: 'dungeon',
    notes: [
      '<b>Why reverse:</b> what you need at the start depends on the rooms still ahead.',
      'Forward, one number per cell is not enough: you would need current health <i>and</i> the lowest point so far (see the picture).',
      'Backward, one number is enough: "health needed when walking in here".',
      '<code>max(1, …)</code>: a healing room can push the need to 0 or below, but you must still be alive.'
    ],
    tries: [
      { q: 'The table sets dp[m][n-1] = 1 and dp[m-1][n] = 1. Why?', a: 'Those are the padding cells below and right of the princess. "After the last room you need 1 health." Then the princess uses the same formula as every other room.' }
    ],
    cx: 'O(m·n) time. O(n) memory with one row.'
  },

  // ===================== B =====================
  {
    id: 'B1', fam: 'B', lc: 221, title: 'Maximal Square', diff: 'Medium', url: 'https://leetcode.com/problems/maximal-square/', viz: 'maximalSquare',
    statement: 'Matrix of <b>strings</b> <code>"0"</code> / <code>"1"</code>. Return the area of the largest all-1 square.',
    example: '[["1","0","1","0","0"],\n ["1","0","1","1","1"],\n ["1","1","1","1","1"],\n ["1","0","0","1","0"]]  →  4',
    card: ['Side of the biggest square ending at <code>(i, j)</code>', 'Look up, left, and up-left', '<code>"1"</code> → <code>1 + min(top, left, diag)</code>. <code>"0"</code> → <code>0</code>', 'Outside → <code>0</code>', '<code>(largest value)²</code>', 'Top-left → bottom-right'],
    moves: 'tld',
    notes: [
      'The square can end anywhere: fill the whole table, track the max.',
      'Table version shifts indices by one: <code>dp[i][j]</code> is <code>matrix[i-1][j-1]</code>.',
      'Input is strings. Compare with <code>"1"</code>, not <code>1</code>.'
    ],
    tries: [
      { q: 'What if you compare with the number 0 instead of "0"?', a: '"0" === 0 is false, so every cell counts as 1. The 4 × 5 example returns 16.' }
    ],
    cx: 'O(m·n) time. O(n) memory with one row + a diagonal variable.'
  },
  {
    id: 'B2', fam: 'B', lc: 1277, title: 'Count Square Submatrices with All Ones', diff: 'Medium', url: 'https://leetcode.com/problems/count-square-submatrices-with-all-ones/', viz: 'countSquares',
    statement: 'Count every all-1 square of any size. The matrix holds numbers.',
    example: '[[0,1,1,1],\n [1,1,1,1],\n [0,1,1,1]]  →  15',
    card: ['Same as B1', 'Same as B1', 'Same as B1', 'Same as B1', '<b>Sum</b> of every cell', 'Top-left → bottom-right'],
    diagram: 'squareCount',
    notes: [
      'If the biggest square ending at a cell has side 3, exactly 3 squares end there (1×1, 2×2, 3×3).',
      'So add up every dp value.'
    ],
    tries: [
      { q: 'Which single line differs from B1?', a: '<code>best = Math.max(best, dp)</code> becomes <code>total += dp</code>.' }
    ],
    cx: 'O(m·n) time.'
  },

  // ===================== C =====================
  {
    id: 'C1', fam: 'C', lc: 1143, title: 'Longest Common Subsequence', diff: 'Medium', url: 'https://leetcode.com/problems/longest-common-subsequence/', viz: 'longestCommonSubsequence',
    statement: 'Length of the longest sequence of letters found in both strings in the same order (gaps allowed).',
    example: '"abcde", "ace"  →  3   ("ace")',
    card: ['LCS of <code>a[0..i)</code> and <code>b[0..j)</code>', 'Last letters match → use both. Else drop one', 'Match: <code>1 + dp(i-1, j-1)</code>. Else <code>max(dp(i-1, j), dp(i, j-1))</code>', 'Either prefix empty → <code>0</code>', '<code>dp(n, m)</code>', 'Top-left → bottom-right'],
    notes: [
      'Base for the whole family. C2–C5 are the same table with different rules.',
      'Row/column ∅ = empty prefix.',
      'Diagonal = use both letters. Up = drop a letter of <code>a</code>. Left = drop a letter of <code>b</code>.'
    ],
    tries: [
      { q: 'When the letters match, why not also try dropping one?', a: 'Pairing them is never worse. Any answer that skips one of them could pair them instead and be just as long.' }
    ],
    cx: 'O(n·m) time. O(m) memory with two rows.'
  },
  {
    id: 'C2', fam: 'C', lc: 583, title: 'Delete Operation for Two Strings', diff: 'Medium', url: 'https://leetcode.com/problems/delete-operation-for-two-strings/', viz: 'deleteOp',
    statement: 'Delete one letter at a time from either string. Fewest deletions to make them equal?',
    example: '"sea", "eat"  →  2   (delete "s" and "t", both become "ea")',
    card: ['Fewest deletions to make <code>a[0..i)</code> and <code>b[0..j)</code> equal', 'Match → keep both. Else delete from <code>a</code> or from <code>b</code>', 'Match: <code>dp(i-1, j-1)</code>. Else <code>1 + min(dp(i-1, j), dp(i, j-1))</code>', '<code>i = 0</code> → <code>j</code>. <code>j = 0</code> → <code>i</code>', '<code>dp(n, m)</code>', 'Top-left → bottom-right'],
    notes: [
      'Shortcut: <code>n + m − 2·LCS</code>.',
      'Worth writing directly once: the base case is not zero. An empty prefix means deleting everything in the other.',
      'Edit Distance uses the same base case.'
    ],
    tries: [],
    cx: 'O(n·m).'
  },
  {
    id: 'C3', fam: 'C', lc: 72, title: 'Edit Distance', diff: 'Medium', url: 'https://leetcode.com/problems/edit-distance/', viz: 'editDistance',
    statement: 'Turn <code>word1</code> into <code>word2</code> with insert, delete, replace. Fewest operations?',
    example: '"horse", "ros"  →  3\n  horse → rorse  (replace h with r)\n  rorse → rose   (delete r)\n  rose  → ros    (delete e)',
    card: ['Fewest operations to turn <code>a[0..i)</code> into <code>b[0..j)</code>', 'Match → free. Else insert, delete or replace', 'Match: <code>dp(i-1, j-1)</code>. Else <code>1 + min(left, up, diag)</code>', '<code>i = 0</code> → <code>j</code> inserts. <code>j = 0</code> → <code>i</code> deletes', '<code>dp(n, m)</code>', 'Top-left → bottom-right'],
    diagram: 'editOps',
    notes: [
      'Same as C2 plus one arrow: replace (diagonal, cost 1).',
      'Left = insert <code>b[j-1]</code>. Up = delete <code>a[i-1]</code>. Diagonal = replace.'
    ],
    tries: [
      { q: 'Try "intention" → "execution". What do you expect?', a: '5. The shared "tion" at the end costs nothing.' }
    ],
    cx: 'O(n·m) time. O(m) memory with two rows.'
  },
  {
    id: 'C4', fam: 'C', lc: 115, title: 'Distinct Subsequences', diff: 'Hard', url: 'https://leetcode.com/problems/distinct-subsequences/', viz: 'numDistinct',
    statement: 'Count the ways to delete letters from <code>s</code> so that what is left equals <code>t</code>.',
    example: '"rabbbit", "rabbit"  →  3   (drop any one of the three b\'s)',
    card: ['Ways <code>s[0..i)</code> can form <code>t[0..j)</code>', 'Always: skip <code>s[i-1]</code>. If it matches <code>t[j-1]</code>: also use it', '<code>dp(i-1, j) + (match ? dp(i-1, j-1) : 0)</code>', '<code>j = 0</code> → <code>1</code> (check first). <code>i = 0</code> → <code>0</code>', '<code>dp(n, m)</code>', 'Top-left → bottom-right'],
    notes: [
      'Check <code>j = 0</code> before <code>i = 0</code>: an empty <code>t</code> is one valid way, even when <code>s</code> is empty too.',
      'Column ∅ is all 1s.'
    ],
    tries: [
      { q: 'Try s = "babgbag", t = "bag".', a: '5.' }
    ],
    cx: 'O(n·m).'
  },
  {
    id: 'C5', fam: 'C', lc: 44, title: 'Wildcard Matching', diff: 'Hard', url: 'https://leetcode.com/problems/wildcard-matching/', viz: 'isMatch',
    statement: '<code>?</code> matches one letter, <code>*</code> matches any run (even empty). Does the pattern match the <b>whole</b> string?',
    example: '("aa", "a")        →  false\n("aa", "*")        →  true\n("cb", "?a")       →  false\n("adceb", "*a*b")  →  true',
    card: ['Do <code>s[0..i)</code> and <code>p[0..j)</code> match?', '<code>*</code>: match nothing, or eat one letter and stay on <code>*</code>. <code>?</code> / same letter: step both', 'OR of the choices', '<code>dp(0, 0)</code> = true. Empty pattern, letters left → false. Empty <code>s</code> → true only for a run of <code>*</code>', '<code>dp(n, m)</code>', 'Top-left → bottom-right'],
    notes: [
      '<code>*</code> matching nothing = look left. Eating a letter = look up, same column.',
      'That is why a column of T runs down under a <code>*</code>: one star swallows many letters.'
    ],
    tries: [],
    cx: 'O(n·m).'
  },

  // ===================== D =====================
  {
    id: 'D1', fam: 'D', lc: 516, title: 'Longest Palindromic Subsequence', diff: 'Medium', url: 'https://leetcode.com/problems/longest-palindromic-subsequence/', viz: 'longestPalindromeSubseq',
    statement: 'Length of the longest subsequence of <code>s</code> that reads the same both ways.',
    example: '"bbbab"  →  4   ("bbbb")',
    card: ['Longest palindromic subsequence in <code>s[i..j]</code>', 'Ends match → keep both. Else drop left or right end', 'Match: <code>2 + dp(i+1, j−1)</code>. Else <code>max(dp(i+1, j), dp(i, j−1))</code>', '<code>i > j</code> → <code>0</code>. <code>i = j</code> → <code>1</code>', '<code>dp(0, n−1)</code>', 'Short ranges → long (i from the end, j forward)'],
    notes: [
      'Only the upper half is used (<code>i ≤ j</code>).',
      'Same answer as <code>LCS(s, reverse(s))</code>.'
    ],
    tries: [],
    cx: 'O(n²).'
  },
  {
    id: 'D2', fam: 'D', lc: 647, title: 'Palindromic Substrings', diff: 'Medium', url: 'https://leetcode.com/problems/palindromic-substrings/', viz: 'countSubstrings',
    statement: 'Count the substrings (no gaps) that are palindromes.',
    example: '"abc"  →  3\n"aaa"  →  6',
    card: ['Is <code>s[i..j]</code> a palindrome?', 'None: check the ends and the inside', '<code>s[i] === s[j] && (len ≤ 2 || pal(i+1, j−1))</code>', 'Length 1 or 2 with equal ends → true', 'Count the true cells', 'Short ranges → long'],
    notes: [
      'D1 = subsequence (gaps allowed). D2 = substring (no gaps), so no choice and no <code>max</code>.',
      'Same table answers LC 5 (longest palindromic substring).',
      'Interview alternative: expand around each centre, O(1) memory.'
    ],
    tries: [],
    cx: 'O(n²).'
  },
  {
    id: 'D3', fam: 'D', lc: 312, title: 'Burst Balloons', diff: 'Hard', url: 'https://leetcode.com/problems/burst-balloons/', viz: 'maxCoins',
    statement: 'Bursting balloon <code>k</code> earns <code>left × nums[k] × right</code> (current neighbours; missing = 1). Maximise total coins.',
    example: '[3,1,5,8]  →  167\n  burst 1:  3·1·5 = 15\n  burst 5:  3·5·8 = 120\n  burst 3:  1·3·8 = 24\n  burst 8:  1·8·1 = 8',
    card: ['Most coins from everything <b>strictly between</b> <code>l</code> and <code>r</code> (array padded with 1s)', 'Which balloon <code>k</code> bursts <b>last</b>', '<code>max over k: a[l]·a[k]·a[r] + dp(l, k) + dp(k, r)</code>', '<code>r − l < 2</code> → <code>0</code>', '<code>dp(0, n+1)</code>', 'Short ranges → long'],
    diagram: 'balloons',
    notes: [
      'Pick the <b>last</b> balloon, not the first.',
      'First: its neighbours change and the two sides merge, so they depend on each other.',
      'Last: <code>k</code> sits between the sides the whole time, so they stay independent, and its final neighbours are exactly <code>l</code> and <code>r</code>.'
    ],
    tries: [],
    cx: 'O(n³) time, O(n²) memory.'
  },

  // ===================== E =====================
  {
    id: 'E1', fam: 'E', lc: 416, title: 'Partition Equal Subset Sum', diff: 'Medium', url: 'https://leetcode.com/problems/partition-equal-subset-sum/', viz: 'canPartition',
    statement: 'Can the array be split into two groups with equal sums?',
    example: '[1,5,11,5]  →  true   ([1,5,5] and [11])\n[1,2,3,5]   →  false',
    card: ['Can the first <code>i</code> numbers make exactly <code>t</code>?', 'Skip <code>(i-1, t)</code> or take <code>(i-1, t − x)</code>', '<code>skip || take</code>', '<code>t = 0</code> → true. No items left → false', '<code>dp(n, total / 2)</code>', 'First item → last item'],
    diagram: 'directionBug',
    notes: [
      'Rephrase: find numbers that add up to half the total. Odd total → false.',
      'Take reads the row above: each number used once.',
      'One-row version: loop <code>t</code> <b>downward</b>, or a number gets reused (picture).'
    ],
    tries: [
      { q: 'Run the one-row code with an upward loop on [1, 2, 5]. Result?', a: 'true, which is wrong. With x = 1, dp[1], dp[2], dp[3], dp[4] all turn true: the single 1 used four times.' }
    ],
    cx: 'O(n · target) time. O(target) memory.'
  },
  {
    id: 'E2', fam: 'E', lc: 494, title: 'Target Sum', diff: 'Medium', url: 'https://leetcode.com/problems/target-sum/', viz: 'findTargetSumWays',
    statement: 'Put <code>+</code> or <code>−</code> before every number. Count the ways to reach <code>target</code>.',
    example: '[1,1,1,1,1], target 3  →  5',
    card: ['Ways the first <code>i</code> numbers make subset sum <code>s</code>', 'Leave out or put in', '<code>skip + take</code>', 'No items: <code>s = 0</code> → 1, else 0', '<code>dp(n, P)</code>, <code>P = (total + target) / 2</code>', 'First item → last item'],
    notes: [
      'Memo version tracks the signed sum directly (index shifted by <code>total</code>).',
      'Table version: plus-numbers <code>P</code>, minus-numbers <code>N</code>. <code>P − N = target</code>, <code>P + N = total</code>, so <code>P = (total + target) / 2</code>.',
      'Now it is E1 with <code>+</code> instead of <code>||</code>.'
    ],
    tries: [
      { q: 'nums = [0,0,1], target = 1. How many ways?', a: '4. Each 0 can be +0 or −0, and those count separately.' }
    ],
    cx: 'O(n · P) time, O(P) memory.'
  },
  {
    id: 'E3', fam: 'E', lc: 518, title: 'Coin Change II', diff: 'Medium', url: 'https://leetcode.com/problems/coin-change-ii/', viz: 'change',
    statement: 'Unlimited coins of each kind. Count the combinations that make <code>amount</code>.',
    example: 'amount 5, coins [1,2,5]  →  4\n  5 | 2+2+1 | 2+1+1+1 | 1+1+1+1+1',
    card: ['Ways to make <code>a</code> with the first <code>i</code> coin types', 'Never use this coin <code>(i-1, a)</code>, or use it once more <code>(i, a − c)</code>', '<code>skip + use</code>', '<code>a = 0</code> → 1. No coins, <code>a > 0</code> → 0', '<code>dp(n, amount)</code>', 'First coin → last coin'],
    notes: [
      'Difference from E1: "use" stays on the <b>same row</b>, since a coin can be reused.',
      'One-row version: loop the amount <b>upward</b>.'
    ],
    tries: [
      { q: 'Swap the loops (amount outside, coins inside). What do you count?', a: 'Orderings: 1+2+2, 2+1+2, 2+2+1 count separately, so 9 instead of 4. That is LC 377.' }
    ],
    cx: 'O(n · amount) time. O(amount) memory.'
  },
  {
    id: 'E4', fam: 'E', lc: 322, title: 'Coin Change', diff: 'Medium', url: 'https://leetcode.com/problems/coin-change/', viz: 'coinChange',
    statement: 'Unlimited coins. Fewest coins to make <code>amount</code>, or <code>-1</code>.',
    example: 'coins [1,2,5], amount 11  →  3   (5 + 5 + 1)\ncoins [2], amount 3       →  -1',
    card: ['Fewest coins to make <code>a</code> with the first <code>i</code> coin types', 'Skip, or use and stay', '<code>min(dp(i-1, a), 1 + dp(i, a − c))</code>', '<code>a = 0</code> → 0. No coins, <code>a > 0</code> → Infinity', '<code>dp(n, amount)</code>, or −1', 'First coin → last coin'],
    notes: [
      'Same skeleton as E3: <code>+</code> → <code>min</code>, done = 0, impossible = Infinity, take adds 1.',
      'Use the table: amount up to 10,000 makes the recursion very deep.'
    ],
    tries: [],
    cx: 'O(n · amount).'
  },

  // ===================== F =====================
  {
    id: 'F1', fam: 'F', lc: 309, title: 'Best Time to Buy and Sell Stock with Cooldown', diff: 'Medium', url: 'https://leetcode.com/problems/best-time-to-buy-and-sell-stock-with-cooldown/', viz: 'stockCooldown',
    statement: 'Trade as often as you like, one share at a time. After selling, wait one day before buying.',
    example: '[1,2,3,0,2]  →  3   (buy 1, sell 2, rest, buy 0, sell 2)',
    card: ['Best profit at the end of day <code>i</code>, free or holding', 'Holding: keep or buy today. Free: rest or sell today', 'Hold: <code>max(hold(i-1), free(i-2) − p)</code>. Free: <code>max(free(i-1), hold(i-1) + p)</code>', 'Before day 0: free = 0, holding = −∞', '<code>free(n-1)</code>', 'Day 0 → last day'],
    diagram: 'machineCooldown',
    notes: [
      'Cooldown = buy reads "free" from <b>two</b> days back.',
      'Two padding rows at the top so <code>i − 2</code> always exists.',
      'Holding before day 0 is impossible, so −∞.'
    ],
    tries: [],
    cx: 'O(n) time. O(1) memory with three variables.'
  },
  {
    id: 'F2', fam: 'F', lc: 714, title: 'Best Time to Buy and Sell Stock with Transaction Fee', diff: 'Medium', url: 'https://leetcode.com/problems/best-time-to-buy-and-sell-stock-with-transaction-fee/', viz: 'stockFee',
    statement: 'Trade as often as you like. Each sale costs a fixed fee.',
    example: '[1,3,2,8,4,9], fee 2  →  8   ((8 − 1 − 2) + (9 − 4 − 2))',
    card: ['Same as F1', 'Same as F1', 'Hold: <code>max(hold(i-1), free(i-1) − p)</code>. Free: <code>max(free(i-1), hold(i-1) + p − fee)</code>', 'Before day 0: free = 0, holding = −∞', '<code>free(n-1)</code>', 'Day 0 → last day'],
    notes: [
      'Two changes from F1: sell earns <code>p − fee</code>, and buy reads yesterday (no cooldown).',
      'Each day reads only the day before, so two variables are enough.'
    ],
    tries: [],
    cx: 'O(n) time, O(1) memory.'
  }
];

const QUIZ = [
  { q: 'Grid of costs. Start anywhere in the first column, end anywhere in the last. Steps go right, up-right or down-right. Minimise cost.', a: 0, why: 'Grid paths: A5 turned on its side.' },
  { q: 'Shortest string that has both s1 and s2 as subsequences.', a: 2, why: 'Two strings (LC 1092). Length n + m − LCS; build it by walking back through the LCS table.' },
  { q: 'Binary strings. Pick the largest group using at most m zeros and n ones.', a: 4, why: 'Knapsack with two budgets (LC 474).' },
  { q: 'Cut a string so every piece is a palindrome. Fewest cuts.', a: 3, why: 'Intervals (LC 132): palindrome table from D2, then one 1D pass.' },
  { q: 'Stock prices, at most k transactions.', a: 5, why: 'Index + state with a third number (LC 188): dp(day, holding, transactions left).' },
  { q: 'Longest unbroken run that appears in two arrays.', a: 2, why: 'Two strings (LC 718). No skipping allowed; take the max over all cells.' },
  { q: 'Can s3 be formed by interleaving s1 and s2, keeping their orders?', a: 2, why: 'Two strings (LC 97). dp(i, j) = can the first i of s1 and j of s2 form the first i + j of s3?' },
  { q: 'Merge neighbouring stone piles; each merge costs the two piles\' total. Minimise cost.', a: 3, why: 'Intervals. Try every split point, like D3.' },
  { q: 'Count right/down grid paths whose sum is divisible by k.', a: 0, why: 'Grid paths with an extra number (LC 2435): dp(i, j, remainder).' },
  { q: 'Two robots start at the top corners and move down one row at a time collecting cherries.', a: 0, why: 'Grid paths in 3D (LC 1463): dp(row, col1, col2).' }
];
const QUIZ_OPTIONS = ['Grid paths', 'Squares', 'Two strings', 'Intervals', 'Knapsack', 'Index + state'];

const PLAN = [
  ['1', 'Basics, A1, A2', 'LC 1289'],
  ['2', 'A3, A4', 'LC 2304'],
  ['3', 'A5, A6', 'LC 741'],
  ['4', 'B1, B2', 'LC 85'],
  ['5', 'C1, C2', 'LC 1092, LC 718'],
  ['6', 'C3', 'LC 712'],
  ['7', 'C4, C5', 'LC 10, LC 97'],
  ['8', 'Redo A3, B1, C3 from a blank file', 'Quiz 1–5'],
  ['9', 'D1, D2', 'LC 5, LC 132'],
  ['10', 'D3', 'LC 1039, LC 1547'],
  ['11', 'E1, E2', 'LC 474, LC 1049'],
  ['12', 'E3, E4', 'LC 377'],
  ['13', 'F1, F2', 'LC 123, LC 188'],
  ['14', 'Whole quiz, then D3 and C5 from a blank file', '']
];

// 1D DP page: planned list (not written yet).
const DP1D = [
  ['Climbing Stairs', 70], ['House Robber', 198], ['House Robber II', 213], ['Decode Ways', 91],
  ['Word Break', 139], ['Longest Increasing Subsequence', 300], ['Maximum Product Subarray', 152], ['Jump Game', 55]
];

// Home page topics. `href` only for topics that have content.
const TOPICS = [
  { name: 'Arrays & Hashing' }, { name: 'Two Pointers' }, { name: 'Sliding Window' }, { name: 'Stack' },
  { name: 'Binary Search' }, { name: 'Linked List' }, { name: 'Trees' }, { name: 'Tries' },
  { name: 'Heap / Priority Queue' }, { name: 'Backtracking' }, { name: 'Graphs' },
  { name: 'Dynamic Programming', href: 'dp/2d.html', sub: '1D DP · 2D DP' },
  { name: 'Greedy' }, { name: 'Intervals' }, { name: 'Bit Manipulation' }, { name: 'Math & Geometry' }
];
