import {mkdir,cp} from 'node:fs/promises';
await mkdir('dist',{recursive:true});
for(const file of ['index.html','styles.css','app.js','core.js','favicon.svg','data'])await cp(file,`dist/${file}`,{recursive:true});
console.log('Static site ready in dist/');
