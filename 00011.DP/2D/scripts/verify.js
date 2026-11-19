const fs=require('fs');
const md=fs.readFileSync(process.argv[2]||require('path').join(__dirname,'..','2D_DP_Universe.md'),'utf8');
const blocks=[...md.matchAll(/```js\n([\s\S]*?)```/g)].map(m=>m[1]);
const T={
 uniquePaths:[[[3,7],28],[[3,2],3],[[3,3],6],[[1,1],1]],
 uniquePathsWithObstacles:[[[[[0,0,0],[0,1,0],[0,0,0]]],2],[[[[0,1],[0,0]]],1],[[[[1]]],0],[[[[0,0],[0,1]]],0]],
 minPathSum:[[[[[1,3,1],[1,5,1],[4,2,1]]],7],[[[[1,2,3],[4,5,6]]],12]],
 minimumTotal:[[[[[2],[3,4],[6,5,7],[4,1,8,3]]],11],[[[[-10]]],-10]],
 minFallingPathSum:[[[[[2,1,3],[6,5,4],[7,8,9]]],13],[[[[-19,57],[-40,-5]]],-59]],
 calculateMinimumHP:[[[[[-2,-3,3],[-5,-10,1],[10,30,-5]]],7],[[[[0]]],1],[[[[1,-3,3],[0,-2,0],[-3,-3,-3]]],3]],
 maximalSquare:[[[[["1","0","1","0","0"],["1","0","1","1","1"],["1","1","1","1","1"],["1","0","0","1","0"]]],4],[[[[["0","1"],["1","0"]]][0]],1],[[[[["0"]]][0]],0]],
 countSquares:[[[[[0,1,1,1],[1,1,1,1],[0,1,1,1]]],15],[[[[[1,0,1],[1,1,0],[1,1,0]]][0]],7]],
 longestCommonSubsequence:[[["abcde","ace"],3],[["abc","abc"],3],[["abc","def"],0]],
 minDistance:null, // two different problems share name
 numDistinct:[[["rabbbit","rabbit"],3],[["babgbag","bag"],5]],
 isMatch:[[["aa","a"],false],[["aa","*"],true],[["cb","?a"],false],[["adceb","*a*b"],true],[["acdcb","a*c?b"],false],[["",""],true],[["","***"],true]],
 longestPalindromeSubseq:[[["bbbab"],4],[["cbbd"],2]],
 countSubstrings:[[["abc"],3],[["aaa"],6],[["abba"],6]],
 maxCoins:[[[[3,1,5,8]],167],[[[1,5]],10]],
 canPartition:[[[[1,5,11,5]],true],[[[1,2,3,5]],false],[[[1,2,5]],false]],
 findTargetSumWays:[[[[1,1,1,1,1],3],5],[[[1],1],1],[[[0,0,1],1],4],[[[100],-200],0]],
 change:[[[5,[1,2,5]],4],[[3,[2]],0],[[10,[10]],1]],
 coinChange:[[[[1,2,5],11],3],[[[2],3],-1],[[[1],0],0]],
 maxProfit:null,
};
const editT=[[["horse","ros"],3],[["intention","execution"],5],[["",""],0]];
const delT=[[["sea","eat"],2],[["leetcode","etco"],4]];
const coolT=[[[[1,2,3,0,2]],3],[[[1]],0]];
const feeT=[[[[1,3,2,8,4,9],2],8],[[[1,3,7,5,10,3],3],6]];
let pass=0,fail=0,ctx='';
function run(src,label,section){
  const name=(src.match(/^var (\w+) = function/m)||[])[1]; if(!name) return;
  let tests=T[name];
  if(name==='minDistance') tests=section.includes('C2.')?delT:editT;
  if(name==='maxProfit') tests=section.includes('F1.')?coolT:feeT;
  if(!tests){console.log('NO TESTS',name);fail++;return;}
  const fn=new Function(src+'\nreturn '+name+';')();
  for(const [args,exp] of tests){const a=JSON.parse(JSON.stringify(args));const got=fn(...a);
    if(JSON.stringify(got)!==JSON.stringify(exp)){fail++;console.log('FAIL',label,name,JSON.stringify(args),'got',got,'exp',exp);} else pass++;}
}
// map each block to its section heading
let idx=0;
const sections=md.split(/\n## /);
for(const sec of sections){
  for(const m of sec.matchAll(/```js\n([\s\S]*?)```/g)){
    const src=m[1]; idx++;
    run(src,'block'+idx,sec.slice(0,10));
    if(src.includes('// 🧠')){
      const brute=src.split('\n').filter(l=>!l.includes('// 🧠')).join('\n').replace(/memo(\[[^\]]+\])+ = /g,'');
      if(/memo/.test(brute)){console.log('BRUTE STILL HAS memo in block',idx);fail++;}
      run(brute,'brute'+idx,sec.slice(0,10));
    }
  }
}
console.log('blocks',idx,'pass',pass,'fail',fail);
// claims
{ // upward 0/1 bug with [1,2,5]
 const nums=[1,2,5],target=4,dp=Array(target+1).fill(false);dp[0]=true;for(const x of nums)for(let t=x;t<=target;t++)dp[t]=dp[t]||dp[t-x];console.log('upward partition [1,2,5] ->',dp[target]);}
{ const c=[1,2,5],A=5,dp=Array(A+1).fill(0);dp[0]=1;for(let a=1;a<=A;a++)for(const x of c)if(a>=x)dp[a]+=dp[a-x];console.log('perm count',dp[A]);}
{ // maximalSquare with number compare
 const M=[["1","0","1","0","0"],["1","0","1","1","1"],["1","1","1","1","1"],["1","0","0","1","0"]];const m=4,n=5;let best=0;const dp=Array.from({length:m+1},()=>Array(n+1).fill(0));for(let i=1;i<=m;i++)for(let j=1;j<=n;j++){if(M[i-1][j-1]!==0){dp[i][j]=1+Math.min(dp[i-1][j],dp[i][j-1],dp[i-1][j-1]);best=Math.max(best,dp[i][j]);}}console.log('string bug area',best*best);}
{ // dungeon forward greedy counterexample
 function greedy(d){const m=d.length,n=d[0].length;const S=Array.from({length:m},()=>Array(n));// [cur, minPrefix]
 for(let i=0;i<m;i++)for(let j=0;j<n;j++){let c=[];if(i===0&&j===0)c=[[0,0]];if(i>0)c.push(S[i-1][j]);if(j>0)c.push(S[i][j-1]);
  c=c.map(([cur,mn])=>{const nc=cur+d[i][j];return [nc,Math.min(mn,nc)]});c.sort((a,b)=>b[1]-a[1]||b[0]-a[0]);S[i][j]=c[0];}
 return Math.max(1,1-S[m-1][n-1][1]);}
 console.log('greedy dungeon',greedy([[1,-3,3],[0,-2,0],[-3,-3,-3]]),'true 3');
 console.log('greedy ex',greedy([[-2,-3,3],[-5,-10,1],[10,30,-5]]));}
{ // minPathSum with 0 outside
 const g=[[1,3,1],[1,5,1],[4,2,1]];const m=3,n=3;const memo={};function dp(i,j){if(i>=m||j>=n)return 0;if(i===m-1&&j===n-1)return g[i][j];return g[i][j]+Math.min(dp(i,j+1),dp(i+1,j));}console.log('minpath 0-bug',dp(0,0),'dp20',dp(2,0));}
