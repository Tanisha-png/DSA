const fs=require('fs'),path=require('path');const ROOT=path.join(__dirname,'..');const V=require(path.join(ROOT,'src','viz.js'));
const md=fs.readFileSync(path.join(ROOT,'2D_DP_Universe.md'),'utf8');
const secs=md.split(/\n## (?=[A-F]\d\. )/).slice(1);
const sol={};for(const s of secs){const id=s.slice(0,2);const b=s.match(/```js\n([\s\S]*?)```/)[1];const name=b.match(/^var (\w+)/m)[1];sol[id]=new Function(b+';return '+name)();}
const map={uniquePaths:['A1',p=>[+p.m,+p.n]],uniquePathsWithObstacles:['A2',p=>[JSON.parse(p.g)]],minPathSum:['A3',p=>[JSON.parse(p.g)]],minimumTotal:['A4',p=>[JSON.parse(p.t)]],minFallingPathSum:['A5',p=>[JSON.parse(p.g)]],calculateMinimumHP:['A6',p=>[JSON.parse(p.g)]],maximalSquare:['B1',p=>[JSON.parse(p.g)]],countSquares:['B2',p=>[JSON.parse(p.g)]],longestCommonSubsequence:['C1',p=>[p.a,p.b]],deleteOp:['C2',p=>[p.a,p.b]],editDistance:['C3',p=>[p.a,p.b]],numDistinct:['C4',p=>[p.a,p.b]],isMatch:['C5',p=>[p.a,p.b]],longestPalindromeSubseq:['D1',p=>[p.s]],countSubstrings:['D2',p=>[p.s]],maxCoins:['D3',p=>[JSON.parse(p.a)]],canPartition:['E1',p=>[JSON.parse(p.a)]],findTargetSumWays:['E2',p=>[JSON.parse(p.a),+p.t]],change:['E3',p=>[+p.a,JSON.parse(p.c)]],coinChange:['E4',p=>[JSON.parse(p.c),+p.a]],stockCooldown:['F1',p=>[JSON.parse(p.a)]],stockFee:['F2',p=>[JSON.parse(p.a),+p.f]]};
const R=n=>Math.floor(Math.random()*n);const str=(k,al)=>Array.from({length:1+R(k)},()=>al[R(al.length)]).join('');
const rnd={uniquePaths:()=>({m:''+(1+R(7)),n:''+(1+R(7))}),uniquePathsWithObstacles:()=>{const m=1+R(5),n=1+R(5);return{g:JSON.stringify(Array.from({length:m},()=>Array.from({length:n},()=>R(4)===0?1:0)))}},
minPathSum:()=>({g:JSON.stringify(Array.from({length:1+R(5)},(_,i,a)=>0).map(()=>0)&&(()=>{const m=1+R(5),n=1+R(5);return Array.from({length:m},()=>Array.from({length:n},()=>R(9)))})())}),
minimumTotal:()=>({t:JSON.stringify(Array.from({length:1+R(6)},(_,i)=>Array.from({length:i+1},()=>R(19)-9)))}),
minFallingPathSum:()=>{const n=1+R(6);return{g:JSON.stringify(Array.from({length:n},()=>Array.from({length:n},()=>R(19)-9)))}},
calculateMinimumHP:()=>{const m=1+R(5),n=1+R(5);return{g:JSON.stringify(Array.from({length:m},()=>Array.from({length:n},()=>R(21)-12)))}},
maximalSquare:()=>{const m=1+R(6),n=1+R(6);return{g:JSON.stringify(Array.from({length:m},()=>Array.from({length:n},()=>R(4)?'1':'0')))}},
countSquares:()=>{const m=1+R(6),n=1+R(6);return{g:JSON.stringify(Array.from({length:m},()=>Array.from({length:n},()=>R(4)?1:0)))}},
longestCommonSubsequence:()=>({a:str(8,'abc'),b:str(8,'abc')}),deleteOp:()=>({a:str(8,'abc'),b:str(8,'abc')}),editDistance:()=>({a:str(8,'abc'),b:str(8,'abc')}),numDistinct:()=>({a:str(9,'ab'),b:str(3,'ab')}),
isMatch:()=>({a:str(6,'ab'),b:str(5,'ab?*')}),longestPalindromeSubseq:()=>({s:str(9,'abc')}),countSubstrings:()=>({s:str(9,'ab')}),maxCoins:()=>({a:JSON.stringify(Array.from({length:1+R(6)},()=>R(10)))}),
canPartition:()=>({a:JSON.stringify(Array.from({length:1+R(6)},()=>1+R(9)))}),findTargetSumWays:()=>({a:JSON.stringify(Array.from({length:1+R(6)},()=>R(5))),t:''+(R(9)-4)}),
change:()=>({c:JSON.stringify([...new Set(Array.from({length:1+R(4)},()=>1+R(7)))]),a:''+R(20)}),coinChange:()=>({c:JSON.stringify([...new Set(Array.from({length:1+R(4)},()=>1+R(7)))]),a:''+R(20)}),
stockCooldown:()=>({a:JSON.stringify(Array.from({length:1+R(9)},()=>R(10)))}),stockFee:()=>({a:JSON.stringify(Array.from({length:1+R(9)},()=>R(10))),f:''+R(4)})};
let ok=0,bad=0;
for(const [k,[id,args]] of Object.entries(map)){const spec=V.B[k];const def=Object.fromEntries(spec.inputs.map(x=>[x.k,x.v]));
 const cases=[def,...Array.from({length:200},()=>rnd[k]())];
 for(const p of cases){const r=spec.build(p);if(r.result===null)continue;const e=sol[id](...args(p));if(JSON.stringify(r.result)!==JSON.stringify(e)){bad++;if(bad<10)console.log('MISMATCH',k,JSON.stringify(p),r.result,e);}else ok++;
  // sanity: deps in range and steps fill reveal before use
  const seen=new Set(); for(let i=0;i<r.cells.length;i++)for(let j=0;j<r.cells[i].length;j++)if(r.cells[i][j].v!==undefined)seen.add(i+','+j);
  for(const s of r.steps){for(const [a,b] of s.deps){if(!seen.has(a+','+b)){bad++;console.log('DEP NOT READY',k,a,b,JSON.stringify(p));break;}}seen.add(s.i+','+s.j);}
 }}
console.log('ok',ok,'bad',bad);
