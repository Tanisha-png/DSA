const fs=require('fs'),path=require('path');
const ROOT=path.join(__dirname,'..'),SRC=path.join(ROOT,'src');
const md=fs.readFileSync(path.join(ROOT,'2D_DP_Universe.md'),'utf8');
const CODE={};
for(const sec of md.split(/\n## (?=[A-F]\d\. )/).slice(1)){
  const id=sec.slice(0,2); CODE[id]=[];
  const re=/\*\*Level ([^*]+)\*\*([^\n]*)\n+```js\n([\s\S]*?)```/g; let m;
  while((m=re.exec(sec))){const lv=m[1].trim(), extra=m[2].trim().replace(/^\(|\)$/g,'');
    const label=lv==='1 + 2'?'Memo':lv==='3'?'Table':lv==='4'?'One row':lv==='3 + 4'?'Table (one row)':lv;
    CODE[id].push({label,code:m[3],note:extra?extra.charAt(0).toUpperCase()+extra.slice(1)+'.':''});}
}
const counts=Object.entries(CODE).map(([k,v])=>k+':'+v.length).join(' ');console.log(counts);
const safe=s=>s.replace(/<\/script/gi,'<\\/script');
let t=fs.readFileSync(path.join(SRC,'template.html'),'utf8');
const put=(k,v)=>{t=t.replace(k,()=>safe(v));};
put('/*@@CONTENT@@*/',fs.readFileSync(path.join(SRC,'content.js'),'utf8'));
put('/*@@VIZ@@*/',fs.readFileSync(path.join(SRC,'viz.js'),'utf8'));
put('/*@@DIAGRAMS@@*/',fs.readFileSync(path.join(SRC,'diagrams.js'),'utf8'));
put('/*@@CODE@@*/','const CODE = '+JSON.stringify(CODE)+';');
put('/*@@MAIN@@*/',fs.readFileSync(path.join(SRC,'main.js'),'utf8'));
fs.writeFileSync(path.join(ROOT,'2D_DP_Handbook.html'),t);
console.log('bytes',t.length);
