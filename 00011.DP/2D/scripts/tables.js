const pr=(name,rows,rl,cl)=>{console.log('\n##',name);console.log('      '+cl.map(c=>String(c).padStart(4)).join(''));rows.forEach((r,i)=>console.log(String(rl[i]).padEnd(6)+r.map(v=>String(v===Infinity?'∞':v===true?'T':v===false?'F':v).padStart(4)).join('')));};
// edit distance suffix
function ed(a,b){const n=a.length,m=b.length,dp=Array.from({length:n+1},()=>Array(m+1).fill(0));
for(let i=n;i>=0;i--)for(let j=m;j>=0;j--){if(i===n)dp[i][j]=m-j;else if(j===m)dp[i][j]=n-i;else if(a[i]===b[j])dp[i][j]=dp[i+1][j+1];else dp[i][j]=1+Math.min(dp[i][j+1],dp[i+1][j],dp[i+1][j+1]);}
pr('edit '+a+' '+b,dp,[...a,'∅'],[...b,'∅']);}
ed('horse','ros');
function del(a,b){const n=a.length,m=b.length,dp=Array.from({length:n+1},()=>Array(m+1).fill(0));
for(let i=n;i>=0;i--)for(let j=m;j>=0;j--){if(i===n)dp[i][j]=m-j;else if(j===m)dp[i][j]=n-i;else if(a[i]===b[j])dp[i][j]=dp[i+1][j+1];else dp[i][j]=1+Math.min(dp[i][j+1],dp[i+1][j]);}
pr('del '+a+' '+b,dp,[...a,'∅'],[...b,'∅']);}
del('sea','eat');
function lcs(a,b){const n=a.length,m=b.length,dp=Array.from({length:n+1},()=>Array(m+1).fill(0));
for(let i=n-1;i>=0;i--)for(let j=m-1;j>=0;j--)dp[i][j]=a[i]===b[j]?1+dp[i+1][j+1]:Math.max(dp[i+1][j],dp[i][j+1]);pr('lcs',dp,[...a,'∅'],[...b,'∅']);}
lcs('abcde','ace');
function ds(s,t){const n=s.length,m=t.length,dp=Array.from({length:n+1},()=>Array(m+1).fill(0));
for(let i=n;i>=0;i--)for(let j=m;j>=0;j--){if(j===m)dp[i][j]=1;else if(i===n)dp[i][j]=0;else dp[i][j]=dp[i+1][j]+(s[i]===t[j]?dp[i+1][j+1]:0);}
pr('distinct',dp,[...s,'∅'],[...t,'∅']);}
ds('rabbbit','rabbit');
function wc(s,p){const n=s.length,m=p.length,dp=Array.from({length:n+1},()=>Array(m+1).fill(false));dp[n][m]=true;
for(let j=m-1;j>=0;j--)dp[n][j]=p[j]==='*'&&dp[n][j+1];
for(let i=n-1;i>=0;i--)for(let j=m-1;j>=0;j--){if(p[j]==='*')dp[i][j]=dp[i][j+1]||dp[i+1][j];else if(p[j]==='?'||p[j]===s[i])dp[i][j]=dp[i+1][j+1];}
pr('wild',dp,[...s,'∅'],[...p,'∅']);}
wc('adceb','*a*b');
function lps(s){const n=s.length,dp=Array.from({length:n},()=>Array(n).fill(0));
for(let i=n-1;i>=0;i--){dp[i][i]=1;for(let j=i+1;j<n;j++)dp[i][j]=s[i]===s[j]?2+dp[i+1][j-1]:Math.max(dp[i+1][j],dp[i][j-1]);}
pr('lps',dp.map((r,i)=>r.map((v,j)=>j<i?'·':v)),[...s].map((c,i)=>i+c),[...s].map((c,i)=>i+c));}
lps('bbbab');
function pal(s){const n=s.length,dp=Array.from({length:n},()=>Array(n).fill(false));let c=0;
for(let i=n-1;i>=0;i--)for(let j=i;j<n;j++){dp[i][j]=s[i]===s[j]&&(j-i<2||dp[i+1][j-1]);if(dp[i][j])c++;}
pr('pal '+c,dp.map((r,i)=>r.map((v,j)=>j<i?'·':v)),[...s].map((c,i)=>i+c),[...s].map((c,i)=>i+c));}
pal('aaa');pal('abba');
function bb(nums){const a=[1,...nums,1],n=a.length,dp=Array.from({length:n},()=>Array(n).fill(0));
for(let len=2;len<n;len++)for(let l=0;l+len<n;l++){const r=l+len;for(let k=l+1;k<r;k++)dp[l][r]=Math.max(dp[l][r],a[l]*a[k]*a[r]+dp[l][k]+dp[k][r]);}
pr('burst',dp.map((r,i)=>r.map((v,j)=>j<=i?'·':v)),a.map((v,i)=>i+':'+v),a.map((v,i)=>i+':'+v));}
bb([3,1,5,8]);
function part(nums){const T=nums.reduce((a,b)=>a+b)/2,n=nums.length,dp=Array.from({length:n+1},()=>Array(T+1).fill(false));dp[n][0]=true;
for(let i=n-1;i>=0;i--)for(let t=0;t<=T;t++)dp[i][t]=dp[i+1][t]||(t>=nums[i]&&dp[i+1][t-nums[i]]);
pr('part',dp,[...nums.map((v,i)=>'i'+i+'='+v),'∅'],[...Array(T+1).keys()]);}
part([1,5,11,5]);
function cc2(coins,A){const n=coins.length,dp=Array.from({length:n+1},()=>Array(A+1).fill(0));dp[n][0]=1;
for(let i=n-1;i>=0;i--)for(let a=0;a<=A;a++)dp[i][a]=dp[i+1][a]+(a>=coins[i]?dp[i][a-coins[i]]:0);
pr('cc2',dp,[...coins.map(c=>'c'+c),'∅'],[...Array(A+1).keys()]);}
cc2([1,2,5],5);
function cc(coins,A){const n=coins.length,dp=Array.from({length:n+1},()=>Array(A+1).fill(Infinity));dp[n][0]=0;
for(let i=n-1;i>=0;i--)for(let a=0;a<=A;a++)dp[i][a]=Math.min(dp[i+1][a],a>=coins[i]?1+dp[i][a-coins[i]]:Infinity);
pr('cc',dp,[...coins.map(c=>'c'+c),'∅'],[...Array(A+1).keys()]);}
cc([1,2,5],11);
function ts(nums,target){const tot=nums.reduce((a,b)=>a+b),P=(tot+target)/2,n=nums.length,dp=Array.from({length:n+1},()=>Array(P+1).fill(0));dp[n][0]=1;
for(let i=n-1;i>=0;i--)for(let s=0;s<=P;s++)dp[i][s]=dp[i+1][s]+(s>=nums[i]?dp[i+1][s-nums[i]]:0);pr('ts P='+P,dp,[...nums.map((v,i)=>'i'+i),'∅'],[...Array(P+1).keys()]);}
ts([1,1,1,1,1],3);
function cd(p){const n=p.length,dp=Array.from({length:n+2},()=>[0,0]);
for(let i=n-1;i>=0;i--){dp[i][1]=Math.max(dp[i+1][1],p[i]+dp[i+2][0]);dp[i][0]=Math.max(dp[i+1][0],-p[i]+dp[i+1][1]);}
pr('cool',dp.slice(0,n+1),[...p.map((v,i)=>i+':'+v),'end'],['free','hold']);}
cd([1,2,3,0,2]);
function fee(p,f){const n=p.length,dp=Array.from({length:n+1},()=>[0,0]);
for(let i=n-1;i>=0;i--){dp[i][1]=Math.max(dp[i+1][1],p[i]-f+dp[i+1][0]);dp[i][0]=Math.max(dp[i+1][0],-p[i]+dp[i+1][1]);}
pr('fee',dp,[...p.map((v,i)=>i+':'+v),'end'],['free','hold']);}
fee([1,3,2,8,4,9],2);
// brute call counts for unique paths
for (const [m,n] of [[3,3],[5,5],[10,10],[15,15]]){let c=0;const memo=new Map();function f(i,j){c++;if(i>=m||j>=n)return 0;if(i===m-1&&j===n-1)return 1;return f(i,j+1)+f(i+1,j);} if(m<=15){f(0,0);} let c2=0;const mm={};function g(i,j){c2++;if(i>=m||j>=n)return 0;if(i===m-1&&j===n-1)return 1;const k=i+','+j;if(k in mm)return mm[k];return mm[k]=g(i,j+1)+g(i+1,j);}g(0,0);console.log(m,n,'brute',c,'memo',c2);}
