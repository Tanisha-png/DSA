const FAMILIES = [
  {
    id: 'A', name: 'Grid paths',
    lead: 'You stand on a grid and can only move in a few fixed directions, never backwards. You either count the routes or look for the cheapest one.',
    state: '<code>dp(i, j)</code> = the answer for the trip <b>from</b> cell <code>(i, j)</code> to the finish.',
    diagram: 'familyGrid'
  },
  {
    id: 'B', name: 'Squares in a grid',
    lead: 'Find or count squares made only of 1s. Here it is easier to describe a square by the cell where it <b>ends</b>, its bottom-right corner.',
    state: '<code>dp(i, j)</code> = side of the biggest all-1 square whose bottom-right corner is <code>(i, j)</code>.',
    diagram: 'squares'
  },
  {
    id: 'C', name: 'Two strings',
    lead: 'Two strings, two pointers. At every step you look at one letter from each string and decide what to do with them.',
    state: '<code>dp(i, j)</code> = the answer for what is left: <code>s1[i..]</code> and <code>s2[j..]</code>.',
    diagram: 'strings'
  },
  {
    id: 'D', name: 'Intervals',
    lead: 'One string or array, but the answer for a range <code>[i..j]</code> is built from smaller ranges inside it. Short ranges get solved first.',
    state: '<code>dp(i, j)</code> = the answer for the slice from index <code>i</code> to index <code>j</code>.',
    diagram: 'interval'
  },
  {
    id: 'E', name: 'Knapsack',
    lead: 'A list of items and a budget (capacity, target sum, amount). For every item you decide: take it or leave it.',
    state: '<code>dp(i, c)</code> = the answer using items from <code>i</code> onward with <code>c</code> left to fill.',
    diagram: 'knap'
  },
  {
    id: 'F', name: 'Index + state',
    lead: 'You walk through a list one step at a time, but you also carry a small "mode" with you: holding a stock or not, cooling down or not.',
    state: '<code>dp(i, mode)</code>. The second number is tiny (2 or 3 values), but it is still 2D DP.',
    diagram: 'machine'
  }
];

const PROBLEMS = [
  // ===================== A =====================
  {
    id: 'A1', fam: 'A', lc: 62, title: 'Unique Paths', diff: 'Medium', url: 'https://leetcode.com/problems/unique-paths/', viz: 'uniquePaths',
    statement: 'A robot starts in the top-left corner of an <code>m × n</code> grid. It can only move right or down. How many different routes reach the bottom-right corner?',
    example: 'm = 3, n = 7  →  28\nm = 3, n = 2  →  3',
    card: ['Number of routes from <code>(i, j)</code> to the finish', 'Right <code>(i, j+1)</code> or down <code>(i+1, j)</code>', '<code>dp(i, j) = dp(i, j+1) + dp(i+1, j)</code>', 'Off the grid → <code>0</code>. On the finish → <code>1</code>', '<code>dp(0, 0)</code>'],
    moves: 'rd',
    notes: '<p>Every route from here starts with either a step right or a step down. Those two groups never overlap, so you add them.</p><p>Watch the table fill up in the stepper below. The grey row and column on the edge are the "off the grid" cells. They are already 0 before we start, which is why the loop never needs an <code>if (outside)</code> check.</p>',
    tries: [
      { q: 'Before you press Play: what will the whole last row and last column be?', a: 'All 1s. From any cell on the bottom edge there is only one way to the finish: keep going right. Same for the right edge going down.' },
      { q: 'Set m = 1 and n = 5. What does the table look like?', a: 'One row of 1s. A single corridor has exactly one route.' },
      { q: 'Is there a formula without DP?', a: 'Yes. You make (m−1) down moves and (n−1) right moves in some order, so the answer is C(m+n−2, m−1). For 3 × 7 that is C(8, 2) = 28. The DP is still worth learning because the next problem breaks the formula.' }
    ],
    cx: 'Plain recursion O(2<sup>m+n</sup>). Memo and table O(m·n) time. One row: O(n) memory.'
  },
  {
    id: 'A2', fam: 'A', lc: 63, title: 'Unique Paths II', diff: 'Medium', url: 'https://leetcode.com/problems/unique-paths-ii/', viz: 'uniquePathsWithObstacles',
    statement: 'Same robot, same moves. Now some cells hold a rock (<code>1</code>) and the robot cannot step on them.',
    example: '[[0,0,0],\n [0,1,0],\n [0,0,0]]  →  2',
    card: ['Routes from <code>(i, j)</code> to the finish, avoiding rocks', 'Right or down', 'Same as A1', 'Off the grid → <code>0</code>. <b>Rock → <code>0</code>.</b> Finish → <code>1</code>', '<code>dp(0, 0)</code>'],
    moves: 'rd',
    notes: '<p>The only change from A1 is one extra base case. A rock is a dead end, so it contributes 0 routes to its neighbours.</p><p>Try putting a rock on the start or the finish cell in the stepper and see what happens to the whole table.</p>',
    tries: [
      { q: 'What happens if the finish cell itself is a rock?', a: 'Every cell becomes 0. In the code we check for a rock <b>before</b> we check "is this the finish?". If you swap those two lines, the finish returns 1 and the answer is wrong. The order of base cases matters.' }
    ],
    cx: 'Same as A1.'
  },
  {
    id: 'A3', fam: 'A', lc: 64, title: 'Minimum Path Sum', diff: 'Medium', url: 'https://leetcode.com/problems/minimum-path-sum/', viz: 'minPathSum',
    statement: 'Each cell has a cost. Move right or down from the top-left to the bottom-right and make the total as small as possible.',
    example: '[[1,3,1],\n [1,5,1],\n [4,2,1]]  →  7   (1 → 3 → 1 → 1 → 1)',
    card: ['Cheapest total from <code>(i, j)</code> to the finish, counting this cell', 'Right or down', '<code>grid[i][j] + min(dp(i, j+1), dp(i+1, j))</code>', 'Off the grid → <code>Infinity</code>. Finish → <code>grid[i][j]</code>', '<code>dp(0, 0)</code>'],
    moves: 'rd',
    notes: '<p>Compare this with A1. Counting became optimising, so <code>+</code> became <code>min</code>. The "off the grid" value also changed from 0 to <code>Infinity</code>. With <code>min</code>, a 0 would look like the best choice, so we use a value that <code>min</code> will never pick.</p><p>To get the actual path, start at <code>(0,0)</code> and keep stepping to whichever neighbour has the smaller dp value.</p>',
    tries: [
      { q: 'What goes wrong if "off the grid" returns 0 instead of Infinity?', a: 'On the bottom row, <code>min(right, down)</code> picks the off-grid 0 and "finishes" without reaching the target. <code>dp[2][0]</code> becomes 4 instead of 7, and the final answer is 5 instead of 7.' }
    ],
    cx: 'O(m·n) time. O(n) memory with one row.'
  },
  {
    id: 'A4', fam: 'A', lc: 120, title: 'Triangle', diff: 'Medium', url: 'https://leetcode.com/problems/triangle/', viz: 'minimumTotal',
    statement: 'Numbers are stacked in a triangle. From each number you can step to one of the two numbers right below it. Find the smallest sum from top to bottom.',
    example: '      2\n     3 4\n    6 5 7\n   4 1 8 3     →  11   (2 + 3 + 5 + 1)',
    card: ['Cheapest sum from <code>(i, j)</code> down to the bottom row', 'Down <code>(i+1, j)</code> or down-right <code>(i+1, j+1)</code>', '<code>t[i][j] + min(dp(i+1, j), dp(i+1, j+1))</code>', 'Bottom row → <code>t[i][j]</code>', '<code>dp(0, 0)</code>'],
    diagram: 'triangle',
    notes: '<p>In code, the triangle is stored left-aligned: row <code>i</code> has <code>i + 1</code> numbers. "Down" is the same column and "down-right" is the next column.</p><p>There is no "off the grid" case here. Every number always has two numbers below it, so the bottom row is the only base case.</p>',
    tries: [
      { q: 'In the one-row version we overwrite dp[j] from left to right. Why are we not destroying values we still need?', a: 'Cell <code>j</code> only reads <code>dp[j]</code> and <code>dp[j+1]</code>. When we overwrite <code>dp[j]</code>, the old <code>dp[j+1]</code> is still untouched, and nothing later needs the old <code>dp[j]</code>. In A5 this is no longer true.' }
    ],
    cx: 'Plain recursion O(2<sup>n</sup>). Memo and table O(n²). One row: O(n) memory.'
  },
  {
    id: 'A5', fam: 'A', lc: 931, title: 'Minimum Falling Path Sum', diff: 'Medium', url: 'https://leetcode.com/problems/minimum-falling-path-sum/', viz: 'minFallingPathSum',
    statement: 'Start on <b>any</b> cell of the first row of a square matrix. Each step goes down, down-left or down-right. Reach any cell in the last row with the smallest sum.',
    example: '[[2,1,3],\n [6,5,4],\n [7,8,9]]  →  13   (1 → 5 → 7)',
    card: ['Cheapest falling sum from <code>(i, j)</code> to the last row', 'Three cells below: <code>j-1</code>, <code>j</code>, <code>j+1</code>', '<code>a[i][j] + min(of those three)</code>', 'Column off the edge → <code>Infinity</code>. Last row → <code>a[i][j]</code>', 'The <b>smallest</b> value in row 0 (any start is allowed)'],
    moves: 'fall',
    notes: '<p>Two new things compared with A3: three choices instead of two, and many possible starting cells. The second one only changes the last line of the code, where we take the minimum over the whole first row.</p>',
    tries: [
      { q: 'Why can\'t we update a single array in place like in Triangle?', a: 'Cell <code>j</code> needs <code>below[j-1]</code>. If we already overwrote position <code>j-1</code> with this row\'s value, we read the wrong number. Triangle only looks right, so in-place is safe there. Here we look both ways, so we keep a second array.' }
    ],
    cx: 'O(n²) time, O(n) memory.'
  },
  {
    id: 'A6', fam: 'A', lc: 174, title: 'Dungeon Game', diff: 'Hard', url: 'https://leetcode.com/problems/dungeon-game/', viz: 'calculateMinimumHP', isNew: true,
    statement: 'A knight walks from the top-left room to the princess in the bottom-right room, moving right or down. Each room takes or gives health. His health must never drop below 1. What is the lowest starting health that works?',
    example: '[[-2, -3,  3],\n [-5,-10,  1],\n [10, 30, -5]]  →  7',
    card: ['Health needed <b>when entering</b> <code>(i, j)</code> to survive the rest', 'Right or down', '<code>max(1, min(dp(i, j+1), dp(i+1, j)) − d[i][j])</code>', 'Off the grid → <code>Infinity</code>. Princess room → <code>max(1, 1 − d)</code>', '<code>dp(0, 0)</code>'],
    moves: 'rd',
    diagram: 'dungeon',
    notes: '<p>This is the one grid problem where the direction really matters. If you go forward from the start, one number per cell is not enough. You would need the current health <b>and</b> the lowest point so far, and neither one alone tells you which path is better (see the picture).</p><p>Going backward from the princess, one number is enough: "how much health do I need when I walk into this room?"</p><p>The <code>max(1, …)</code> is there because a big healing room can make the need 0 or negative, but you still have to be alive to walk in.</p>',
    tries: [
      { q: 'In the table version we set dp[m][n-1] = 1 and dp[m-1][n] = 1. Why?', a: 'Those are the two padding cells right below and right of the princess. Setting them to 1 means "after the last room you need to be alive". Then the princess room uses the same formula as every other room and needs no special case.' }
    ],
    cx: 'O(m·n) time. O(n) memory with one row.'
  },

  // ===================== B =====================
  {
    id: 'B1', fam: 'B', lc: 221, title: 'Maximal Square', diff: 'Medium', url: 'https://leetcode.com/problems/maximal-square/', viz: 'maximalSquare',
    statement: 'A matrix holds the <b>strings</b> <code>"0"</code> and <code>"1"</code>. Return the area of the largest square that contains only 1s.',
    example: '[["1","0","1","0","0"],\n ["1","0","1","1","1"],\n ["1","1","1","1","1"],\n ["1","0","0","1","0"]]  →  4',
    card: ['Side of the biggest square whose bottom-right corner is <code>(i, j)</code>', 'Look up, left and diagonally up-left', '<code>"1"</code> → <code>1 + min(top, left, diag)</code>. <code>"0"</code> → <code>0</code>', 'Outside → <code>0</code>', '<code>(largest value anywhere)²</code>'],
    moves: 'tld',
    notes: '<p>The square can end anywhere, so we fill the whole table and remember the biggest value we saw.</p><p>In the table version the indices are shifted by one. Row 0 and column 0 become padding (always 0), so <code>dp[i][j]</code> describes <code>matrix[i-1][j-1]</code>.</p>',
    tries: [
      { q: 'What does the code return if you compare with the number 0 instead of the string "0"?', a: '<code>"0" === 0</code> is false, so every cell looks like a 1. The whole 4 × 5 matrix gives side 4 and area 16. Always check the input type. B2 uses real numbers.' }
    ],
    cx: 'O(m·n) time. O(n) memory with one row plus a variable for the diagonal.'
  },
  {
    id: 'B2', fam: 'B', lc: 1277, title: 'Count Square Submatrices with All Ones', diff: 'Medium', url: 'https://leetcode.com/problems/count-square-submatrices-with-all-ones/', viz: 'countSquares',
    statement: 'Count every square (any size) that contains only 1s. This time the matrix holds numbers.',
    example: '[[0,1,1,1],\n [1,1,1,1],\n [0,1,1,1]]  →  15',
    card: ['Same as B1', 'Same as B1', 'Same as B1', 'Same as B1', '<b>Sum</b> of every cell'],
    diagram: 'squareCount',
    notes: '<p>If the biggest square ending at a cell has side 3, then exactly 3 squares end there: the 1 × 1, the 2 × 2 and the 3 × 3. So the dp value is also the count of squares ending at that cell. Add them all up and you are done.</p>',
    tries: [
      { q: 'Same recurrence as B1, different answer line. Can you name the one line that changes?', a: '<code>best = Math.max(best, dp)</code> becomes <code>total += dp</code>. That is the entire difference.' }
    ],
    cx: 'O(m·n) time.'
  },

  // ===================== C =====================
  {
    id: 'C1', fam: 'C', lc: 1143, title: 'Longest Common Subsequence', diff: 'Medium', url: 'https://leetcode.com/problems/longest-common-subsequence/', viz: 'longestCommonSubsequence',
    statement: 'Find the length of the longest sequence of letters that appears in both strings in the same order. The letters do not have to be next to each other.',
    example: '"abcde", "ace"  →  3   ("ace")',
    card: ['LCS of <code>a[i..]</code> and <code>b[j..]</code>', 'Letters match → use both. Otherwise skip one letter from either string', 'Match: <code>1 + dp(i+1, j+1)</code>. Else <code>max(dp(i+1, j), dp(i, j+1))</code>', 'Either string used up → <code>0</code>', '<code>dp(0, 0)</code>'],
    notes: '<p>This is the parent of the whole family. Once this table makes sense, C2 to C5 are the same table with different rules.</p>',
    tries: [
      { q: 'When the letters match, why don\'t we also try skipping one of them?', a: 'Taking a matching pair is never worse. Any common subsequence that skips <code>a[i]</code> could swap in <code>a[i]</code> paired with <code>b[j]</code> and stay just as long. So <code>1 + dp(i+1, j+1)</code> is always at least as good.' }
    ],
    cx: 'O(n·m) time. O(m) memory with two rows.'
  },
  {
    id: 'C2', fam: 'C', lc: 583, title: 'Delete Operation for Two Strings', diff: 'Medium', url: 'https://leetcode.com/problems/delete-operation-for-two-strings/', viz: 'deleteOp',
    statement: 'You may delete one letter at a time from either string. What is the fewest number of deletions to make both strings equal?',
    example: '"sea", "eat"  →  2   (delete "s", delete "t", both become "ea")',
    card: ['Fewest deletions to make <code>a[i..]</code> and <code>b[j..]</code> equal', 'Match → keep both. Else delete <code>a[i]</code> or delete <code>b[j]</code>', 'Match: <code>dp(i+1, j+1)</code>. Else <code>1 + min(dp(i+1, j), dp(i, j+1))</code>', '<code>i === n</code> → <code>m − j</code>. <code>j === m</code> → <code>n − i</code>', '<code>dp(0, 0)</code>'],
    notes: '<p>Shortcut: keep the LCS and delete everything else, which gives <code>n + m − 2·LCS</code>. The direct DP is still worth writing once, because it shows a base case that is <b>not</b> zero. When one word is used up, you must delete everything left in the other. Edit Distance needs exactly this idea.</p>',
    tries: [],
    cx: 'O(n·m).'
  },
  {
    id: 'C3', fam: 'C', lc: 72, title: 'Edit Distance', diff: 'Medium', url: 'https://leetcode.com/problems/edit-distance/', viz: 'editDistance',
    statement: 'Turn <code>word1</code> into <code>word2</code> using insert, delete and replace (one letter each). What is the fewest number of operations?',
    example: '"horse", "ros"  →  3\n  horse → rorse  (replace h with r)\n  rorse → rose   (delete r)\n  rose  → ros    (delete e)',
    card: ['Fewest operations to turn <code>a[i..]</code> into <code>b[j..]</code>', 'Match → free. Else insert, delete or replace', 'Match: <code>dp(i+1, j+1)</code>. Else <code>1 + min(insert, delete, replace)</code>', '<code>i === n</code> → insert the rest: <code>m − j</code>. <code>j === m</code> → delete the rest: <code>n − i</code>', '<code>dp(0, 0)</code>'],
    diagram: 'editOps',
    notes: '<p>Put C2 and C3 side by side. C3 has one more arrow: replace, which moves diagonally for a cost of 1. Without it you get C2 back. Spotting "same table, one more arrow" is the main skill this family teaches.</p>',
    tries: [
      { q: 'Try word1 = "intention", word2 = "execution" in the stepper. What do you expect?', a: '5. You can watch the diagonal of matches ("tion" at the end) carry the cost through for free.' }
    ],
    cx: 'O(n·m) time. O(m) memory with two rows.'
  },
  {
    id: 'C4', fam: 'C', lc: 115, title: 'Distinct Subsequences', diff: 'Hard', url: 'https://leetcode.com/problems/distinct-subsequences/', viz: 'numDistinct',
    statement: 'Count how many different ways you can delete letters from <code>s</code> so that what is left equals <code>t</code>.',
    example: '"rabbbit", "rabbit"  →  3   (drop any one of the three b\'s)',
    card: ['Ways <code>s[i..]</code> can form <code>t[j..]</code>', 'Always: skip <code>s[i]</code>. If letters match: also use it', '<code>dp(i+1, j) + (match ? dp(i+1, j+1) : 0)</code>', '<code>j === m</code> → <code>1</code> (check this first). <code>i === n</code> → <code>0</code>', '<code>dp(0, 0)</code>'],
    notes: '<p>The order of the two base cases matters. If <code>t</code> is fully built, that is one valid way, even if <code>s</code> also ran out at the same moment.</p>',
    tries: [
      { q: 'Try s = "babgbag", t = "bag". How many?', a: '5.' }
    ],
    cx: 'O(n·m).'
  },
  {
    id: 'C5', fam: 'C', lc: 44, title: 'Wildcard Matching', diff: 'Hard', url: 'https://leetcode.com/problems/wildcard-matching/', viz: 'isMatch',
    statement: 'In the pattern, <code>?</code> matches any one letter and <code>*</code> matches any run of letters, including none. Does the pattern match the <b>whole</b> string?',
    example: '("aa", "a")        →  false\n("aa", "*")        →  true\n("cb", "?a")       →  false\n("adceb", "*a*b")  →  true',
    card: ['Does <code>s[i..]</code> match <code>p[j..]</code>?', '<code>*</code>: match nothing, or eat one letter and stay on the <code>*</code>. <code>?</code> or same letter: move both', 'Boolean OR of the choices', '<code>j === m</code> → <code>i === n</code>. <code>i === n</code> → rest of <code>p</code> must be all <code>*</code>', '<code>dp(0, 0)</code>'],
    notes: '<p>The <code>*</code> rule is the interesting one. "Eat one letter and stay on the <code>*</code>" moves down a row in the same column, so a single <code>*</code> can swallow a long run of letters one step at a time. In the example you can see a column of T running down under the second <code>*</code>.</p><p>The memo needs <code>n + 1</code> rows, because <code>i</code> can be at the end of <code>s</code> while there is still pattern left.</p>',
    tries: [],
    cx: 'O(n·m).'
  },

  // ===================== D =====================
  {
    id: 'D1', fam: 'D', lc: 516, title: 'Longest Palindromic Subsequence', diff: 'Medium', url: 'https://leetcode.com/problems/longest-palindromic-subsequence/', viz: 'longestPalindromeSubseq',
    statement: 'Find the length of the longest subsequence of <code>s</code> that reads the same forwards and backwards.',
    example: '"bbbab"  →  4   ("bbbb")',
    card: ['Longest palindromic subsequence inside <code>s[i..j]</code>', 'Ends match → keep both. Else drop the left end or the right end', 'Match: <code>2 + dp(i+1, j−1)</code>. Else <code>max(dp(i+1, j), dp(i, j−1))</code>', '<code>i > j</code> → <code>0</code>. <code>i === j</code> → <code>1</code>', '<code>dp(0, n−1)</code>'],
    notes: '<p>Only the upper half of the table is used, because a range needs <code>i ≤ j</code>. A neat link: this answer equals <code>LCS(s, reverse(s))</code>.</p>',
    tries: [],
    cx: 'O(n²).'
  },
  {
    id: 'D2', fam: 'D', lc: 647, title: 'Palindromic Substrings', diff: 'Medium', url: 'https://leetcode.com/problems/palindromic-substrings/', viz: 'countSubstrings',
    statement: 'Count the substrings (no gaps) that are palindromes.',
    example: '"abc"  →  3\n"aaa"  →  6',
    card: ['Is <code>s[i..j]</code> a palindrome?', 'None. Just check the ends and the inside', '<code>s[i] === s[j] && (length ≤ 2 || pal(i+1, j−1))</code>', 'Empty or single letter → true', 'Count the true cells'],
    notes: '<p>D1 is about subsequences (gaps allowed), D2 about substrings (no gaps). Without gaps there is nothing to choose, so there is no <code>max</code>. A range is a palindrome when its ends match and the inside is a palindrome.</p><p>In an interview, "expand around the centre" also works in O(n²) time with O(1) memory. The table is still useful: it answers LC 5 (longest palindromic substring) as well.</p>',
    tries: [],
    cx: 'O(n²).'
  },
  {
    id: 'D3', fam: 'D', lc: 312, title: 'Burst Balloons', diff: 'Hard', url: 'https://leetcode.com/problems/burst-balloons/', viz: 'maxCoins',
    statement: 'Bursting balloon <code>k</code> earns <code>left × nums[k] × right</code>, using its neighbours at that moment (missing neighbours count as 1). Burst them all and collect as many coins as possible.',
    example: '[3,1,5,8]  →  167\n  burst 1:  3·1·5 = 15\n  burst 5:  3·5·8 = 120\n  burst 3:  1·3·8 = 24\n  burst 8:  1·8·1 = 8',
    card: ['Most coins from bursting everything <b>strictly between</b> <code>l</code> and <code>r</code> (pad the array with a 1 on both ends)', 'Which balloon <code>k</code> goes <b>last</b>', '<code>max over k: a[l]·a[k]·a[r] + dp(l, k) + dp(k, r)</code>', 'Nothing between (<code>r − l < 2</code>) → <code>0</code>', '<code>dp(0, n+1)</code>'],
    diagram: 'balloons',
    notes: '<p>The trick is to think about which balloon is burst <b>last</b>, not first. If you pick the first one, its neighbours change and the two sides get glued together, so the sub-problems depend on each other. If <code>k</code> goes last, it stands between the two sides the whole time, so they never touch. And when <code>k</code> finally bursts, its neighbours are exactly the walls <code>l</code> and <code>r</code>.</p>',
    tries: [],
    cx: 'O(n³) time (n² ranges × n choices of k). O(n²) memory.'
  },

  // ===================== E =====================
  {
    id: 'E1', fam: 'E', lc: 416, title: 'Partition Equal Subset Sum', diff: 'Medium', url: 'https://leetcode.com/problems/partition-equal-subset-sum/', viz: 'canPartition',
    statement: 'Can the array be split into two groups with the same sum?',
    example: '[1,5,11,5]  →  true   ([1,5,5] and [11])\n[1,2,3,5]   →  false',
    card: ['Can items <code>i..</code> make exactly <code>t</code>?', 'Skip <code>(i+1, t)</code> or take <code>(i+1, t − nums[i])</code>', '<code>skip || take</code>', '<code>t === 0</code> → true. Out of items or <code>t &lt; 0</code> → false', '<code>dp(0, total / 2)</code>'],
    diagram: 'directionBug',
    notes: '<p>Say it differently: the total is 22, so we need some items that add up to 11. If the total is odd, stop right away.</p><p>In the one-row version the inner loop runs <b>downward</b>. The picture shows why: going upward lets the same item be used again in the same round.</p>',
    tries: [
      { q: 'Run the 1D code with an upward loop on [1, 2, 5]. What do you get?', a: '<code>true</code>, which is wrong. With <code>x = 1</code>, the upward loop sets dp[1], then dp[2] from dp[1], then dp[3], then dp[4]: that is 1 + 1 + 1 + 1, using the single 1 four times. Downward = each item once. Upward = unlimited.' }
    ],
    cx: 'O(n · target) time. O(target) memory.'
  },
  {
    id: 'E2', fam: 'E', lc: 494, title: 'Target Sum', diff: 'Medium', url: 'https://leetcode.com/problems/target-sum/', viz: 'findTargetSumWays',
    statement: 'Put a <code>+</code> or <code>−</code> in front of every number. Count the ways to reach <code>target</code>.',
    example: '[1,1,1,1,1], target 3  →  5',
    card: ['(after the rewrite) Ways items <code>i..</code> can make sum <code>s</code>', 'Leave out or put in', '<code>skip + take</code>', 'End: <code>s === 0</code> → 1, else 0', '<code>dp(0, P)</code> with <code>P = (total + target) / 2</code>'],
    notes: '<p>The memo version tracks the running sum directly. Since the sum can be negative, the memo index is shifted by <code>total</code>.</p><p>The smarter way is a little algebra. Let <code>P</code> be the sum of the plus-numbers and <code>N</code> the sum of the minus-numbers:</p><pre class="mini">P − N = target\nP + N = total\n─────────────\nP = (target + total) / 2</pre><p>Now it is "count subsets that sum to P", which is E1 with <code>+</code> instead of <code>||</code>. With five 1s, the table turns into Pascal\'s triangle.</p>',
    tries: [
      { q: 'nums = [0,0,1], target = 1. How many ways?', a: '4. Each 0 can be +0 or −0, and those count as different ways. The downward loop handles this: for x = 0 it doubles dp[s].' }
    ],
    cx: 'Direct: O(n · total). Subset version: O(n · P) time, O(P) memory.'
  },
  {
    id: 'E3', fam: 'E', lc: 518, title: 'Coin Change II', diff: 'Medium', url: 'https://leetcode.com/problems/coin-change-ii/', viz: 'change',
    statement: 'You have an unlimited supply of each coin. Count the combinations that make <code>amount</code>.',
    example: 'amount 5, coins [1,2,5]  →  4\n  5 | 2+2+1 | 2+1+1+1 | 1+1+1+1+1',
    card: ['Ways to make <code>a</code> using coins <code>i..</code>', 'Never use this coin <code>(i+1, a)</code>, or use it once more and <b>stay</b> <code>(i, a − c)</code>', '<code>skip + use</code>', '<code>a === 0</code> → 1. Out of coins or <code>a &lt; 0</code> → 0', '<code>dp(0, amount)</code>'],
    notes: '<p>Compare with E1. The "take" arrow now stays on the same row, because a coin can be used again. In the 1D version, that is why the inner loop goes <b>upward</b>.</p>',
    tries: [
      { q: 'Swap the loops in the 1D version (amount outside, coins inside). What do you count now?', a: 'Ordered sequences. 1+2+2, 2+1+2 and 2+2+1 all count separately, so amount 5 gives 9 instead of 4. That is LC 377, Combination Sum IV.' }
    ],
    cx: 'O(n · amount) time. O(amount) memory.'
  },
  {
    id: 'E4', fam: 'E', lc: 322, title: 'Coin Change', diff: 'Medium', url: 'https://leetcode.com/problems/coin-change/', viz: 'coinChange',
    statement: 'Unlimited coins again. What is the fewest number of coins that make <code>amount</code>? Return <code>-1</code> if it cannot be done.',
    example: 'coins [1,2,5], amount 11  →  3   (5 + 5 + 1)\ncoins [2], amount 3       →  -1',
    card: ['Fewest coins to make <code>a</code> with coins <code>i..</code>', 'Skip or use (and stay)', '<code>min(dp(i+1, a), 1 + dp(i, a − c))</code>', '<code>a === 0</code> → 0. Out of coins or <code>a &lt; 0</code> → Infinity', '<code>dp(0, amount)</code>, or −1 if Infinity'],
    notes: '<p>Same skeleton as E3: <code>+</code> became <code>min</code>, the "done" value went from 1 to 0, the "impossible" value went from 0 to Infinity, and the take branch adds 1 coin.</p><p>Prefer the table version here. With amount up to 10,000 and a coin of 1, the recursion can go 10,000 calls deep.</p>',
    tries: [],
    cx: 'O(n · amount).'
  },

  // ===================== F =====================
  {
    id: 'F1', fam: 'F', lc: 309, title: 'Best Time to Buy and Sell Stock with Cooldown', diff: 'Medium', url: 'https://leetcode.com/problems/best-time-to-buy-and-sell-stock-with-cooldown/', viz: 'stockCooldown',
    statement: 'Buy and sell as often as you like, holding at most one share. After you sell, you must wait one day before buying again.',
    example: '[1,2,3,0,2]  →  3   (buy 1, sell 2, rest, buy 0, sell 2)',
    card: ['Best profit from day <code>i</code> on, given whether you hold a share', 'Holding: keep it or sell (then skip a day). Free: wait or buy', 'Holding: <code>max(dp(i+1, 1), price + dp(i+2, 0))</code>. Free: <code>max(dp(i+1, 0), −price + dp(i+1, 1))</code>', 'Past the last day → 0', '<code>dp(0, free)</code>'],
    diagram: 'machineCooldown',
    notes: '<p>The cooldown is just the <code>i + 2</code> after a sale. The table has two extra rows at the bottom so <code>i + 2</code> never goes out of range.</p>',
    tries: [],
    cx: 'O(n) time. O(1) memory if you keep only the last few rows.'
  },
  {
    id: 'F2', fam: 'F', lc: 714, title: 'Best Time to Buy and Sell Stock with Transaction Fee', diff: 'Medium', url: 'https://leetcode.com/problems/best-time-to-buy-and-sell-stock-with-transaction-fee/', viz: 'stockFee',
    statement: 'Buy and sell as often as you like, but every sale costs a fixed fee.',
    example: '[1,3,2,8,4,9], fee 2  →  8   ((8 − 1 − 2) + (9 − 4 − 2))',
    card: ['Same as F1', 'Same as F1', 'Holding: <code>max(dp(i+1, 1), price − fee + dp(i+1, 0))</code>. Free: same as F1', 'Past the last day → 0', '<code>dp(0, free)</code>'],
    notes: '<p>Two small changes from F1: a sale earns <code>price − fee</code>, and there is no cooldown, so it is <code>i + 1</code> again. Because each day only looks at the next day, two variables are enough.</p>',
    tries: [],
    cx: 'O(n) time, O(1) memory.'
  }
];

const QUIZ = [
  { q: 'A grid of costs. Start anywhere in the first column, end anywhere in the last column. Each step goes right, up-right or down-right. Minimise the cost.', a: 0, why: 'Grid paths. It is A5 turned on its side. dp(i, j) = cheapest cost from (i, j) to the last column, and the answer is the minimum over column 0.' },
  { q: 'Find the shortest string that contains both s1 and s2 as subsequences.', a: 2, why: 'Two strings (LC 1092). Its length is n + m − LCS, and you build it by walking back through the LCS table.' },
  { q: 'You have binary strings. Pick the largest group that uses at most m zeros and n ones in total.', a: 4, why: 'Knapsack with two budgets (LC 474). dp over (zeros left, ones left), with downward loops because each string is used once.' },
  { q: 'Cut a string into pieces so that every piece is a palindrome. Use as few cuts as possible.', a: 3, why: 'Intervals (LC 132). Build the palindrome table from D2, then a 1D pass: cuts(i) = min over j with pal(i, j) of 1 + cuts(j + 1).' },
  { q: 'Stock prices, but you may complete at most k transactions.', a: 5, why: 'Index + state with a third number (LC 188): dp(day, holding, transactions left).' },
  { q: 'Length of the longest run that appears, unbroken, in two arrays.', a: 2, why: 'Two strings (LC 718). dp(i, j) = length of the common run starting at i and j. No skipping, because it must be unbroken. Take the max over all cells, like B1.' },
  { q: 'Can s3 be formed by interleaving the letters of s1 and s2 (keeping each one\'s order)?', a: 2, why: 'Two strings (LC 97). dp(i, j) = can s1[i..] and s2[j..] form s3[i+j..]? Take from s1 or from s2, combine with OR.' },
  { q: 'Merge neighbouring piles of stones. Each merge costs the total weight of the two piles. Minimise the total cost.', a: 3, why: 'Intervals. dp(l, r) = cheapest way to merge that range. Try every split point, like D3.' },
  { q: 'Count right/down paths in a grid whose sum of cells is divisible by k.', a: 0, why: 'Grid paths with an extra number (LC 2435): dp(i, j, remainder). When a rule depends on the path so far, add that to the state.' },
  { q: 'Two robots start at the top corners of a grid and move down one row at a time, collecting cherries.', a: 0, why: 'Grid paths in 3D (LC 1463). Both robots are always on the same row, so the state is dp(row, col1, col2).' }
];
const QUIZ_OPTIONS = ['Grid paths', 'Squares', 'Two strings', 'Intervals', 'Knapsack', 'Index + state'];

const PLAN = [
  ['1', 'Start here, A1, A2', 'LC 1289 Minimum Falling Path Sum II'],
  ['2', 'A3, A4', 'LC 2304 Minimum Path Cost in a Grid'],
  ['3', 'A5, A6', 'LC 741 Cherry Pickup (hard, a first look at 3D)'],
  ['4', 'B1, B2', 'LC 85 Maximal Rectangle'],
  ['5', 'C1, C2', 'LC 1092 Shortest Common Supersequence, LC 718'],
  ['6', 'C3', 'LC 712 Minimum ASCII Delete Sum'],
  ['7', 'C4, C5', 'LC 10 Regular Expression Matching, LC 97 Interleaving String'],
  ['8', 'Revision: A3, B1 and C3 from a blank file', 'Quiz questions 1 to 5'],
  ['9', 'D1, D2', 'LC 5 Longest Palindromic Substring, LC 132'],
  ['10', 'D3', 'LC 1039 Minimum Score Triangulation, LC 1547 Minimum Cost to Cut a Stick'],
  ['11', 'E1, E2', 'LC 474 Ones and Zeroes, LC 1049 Last Stone Weight II'],
  ['12', 'E3, E4', 'LC 377 Combination Sum IV (compare it with E3)'],
  ['13', 'F1, F2', 'LC 123 and LC 188 (add a transaction count)'],
  ['14', 'Final: the whole quiz, then D3 and C5 from a blank file', '']
];
