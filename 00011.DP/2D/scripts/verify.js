// Runs every solution (and the plain recursion made from each memo version) on LeetCode examples.
const path = require('path');
const S = require(path.join(__dirname, '..', 'src', 'solutions.js'));

const T = {
  A1: [[[3, 7], 28], [[3, 2], 3], [[3, 3], 6], [[1, 1], 1]],
  A2: [[[[[0, 0, 0], [0, 1, 0], [0, 0, 0]]], 2], [[[[0, 1], [0, 0]]], 1], [[[[1]]], 0], [[[[0, 0], [0, 1]]], 0], [[[[0, 0], [1, 0]]], 1]],
  A3: [[[[[1, 3, 1], [1, 5, 1], [4, 2, 1]]], 7], [[[[1, 2, 3], [4, 5, 6]]], 12], [[[[5]]], 5]],
  A4: [[[[[2], [3, 4], [6, 5, 7], [4, 1, 8, 3]]], 11], [[[[-10]]], -10]],
  A5: [[[[[2, 1, 3], [6, 5, 4], [7, 8, 9]]], 13], [[[[-19, 57], [-40, -5]]], -59], [[[[7]]], 7]],
  A6: [[[[[-2, -3, 3], [-5, -10, 1], [10, 30, -5]]], 7], [[[[0]]], 1], [[[[1, -3, 3], [0, -2, 0], [-3, -3, -3]]], 3]],
  B1: [[[[['1', '0', '1', '0', '0'], ['1', '0', '1', '1', '1'], ['1', '1', '1', '1', '1'], ['1', '0', '0', '1', '0']]], 4], [[[['0', '1'], ['1', '0']]], 1], [[[['0']]], 0]],
  B2: [[[[[0, 1, 1, 1], [1, 1, 1, 1], [0, 1, 1, 1]]], 15], [[[[1, 0, 1], [1, 1, 0], [1, 1, 0]]], 7]],
  C1: [[['abcde', 'ace'], 3], [['abc', 'abc'], 3], [['abc', 'def'], 0]],
  C2: [[['sea', 'eat'], 2], [['leetcode', 'etco'], 4], [['a', 'a'], 0]],
  C3: [[['horse', 'ros'], 3], [['intention', 'execution'], 5], [['', ''], 0], [['', 'ab'], 2]],
  C4: [[['rabbbit', 'rabbit'], 3], [['babgbag', 'bag'], 5], [['a', 'b'], 0]],
  C5: [[['aa', 'a'], false], [['aa', '*'], true], [['cb', '?a'], false], [['adceb', '*a*b'], true], [['acdcb', 'a*c?b'], false], [['', ''], true], [['', '***'], true], [['a', ''], false]],
  D1: [[['bbbab'], 4], [['cbbd'], 2]],
  D2: [[['abc'], 3], [['aaa'], 6], [['abba'], 6]],
  D3: [[[[3, 1, 5, 8]], 167], [[[1, 5]], 10]],
  E1: [[[[1, 5, 11, 5]], true], [[[1, 2, 3, 5]], false], [[[1, 2, 5]], false]],
  E2: [[[[1, 1, 1, 1, 1], 3], 5], [[[1], 1], 1], [[[0, 0, 1], 1], 4], [[[100], -200], 0], [[[1, 2], -3], 1]],
  E3: [[[5, [1, 2, 5]], 4], [[3, [2]], 0], [[10, [10]], 1], [[0, [7]], 1]],
  E4: [[[[1, 2, 5], 11], 3], [[[2], 3], -1], [[[1], 0], 0]],
  F1: [[[[1, 2, 3, 0, 2]], 3], [[[1]], 0], [[[2, 1]], 0]],
  F2: [[[[1, 3, 2, 8, 4, 9], 2], 8], [[[1, 3, 7, 5, 10, 3], 3], 6]]
};

const MARK = '// memo';
const toRecursion = (code) => code.split('\n').filter(l => !l.trimEnd().endsWith(MARK)).join('\n').replace(/memo(\[[^\]]+\])+ = /g, '');
let pass = 0, fail = 0;
function run(id, label, src) {
  const name = src.match(/^var (\w+) = function/m)[1];
  const fn = new Function(src + '\nreturn ' + name + ';')();
  for (const [args, exp] of T[id]) {
    const got = fn(...JSON.parse(JSON.stringify(args)));
    if (JSON.stringify(got) !== JSON.stringify(exp)) { fail++; console.log('FAIL', id, label, JSON.stringify(args), 'got', got, 'expected', exp); } else pass++;
  }
}
for (const [id, blocks] of Object.entries(S)) {
  if (!T[id]) { console.log('NO TESTS', id); fail++; continue; }
  for (const b of blocks) {
    run(id, b.label, b.code);
    if (b.code.includes(MARK)) {
      const rec = toRecursion(b.code);
      if (/memo/.test(rec)) { console.log('RECURSION STILL USES memo', id); fail++; }
      run(id, 'Recursion', rec);
    }
  }
}
console.log('pass', pass, 'fail', fail);
if (fail) process.exit(1);
