const acorn = require('acorn');
const walk = require('acorn-walk');
const esgenerate = require('escodegen');
const foo = require('./code/code').foo;
const fs = require('fs');

// get string from obj.toString()
let str = foo.toString();

let res = acorn.parse(str);

// get original string code
let code = fs.readFileSync('./code/code.js').toString();
let ast = acorn.parse(code);

// get start and end position by lastIndexOf\acorn.getLineInfo
let sI = code.lastIndexOf(str);
let eI = sI + str.length;

console.log(sI);

let sPos = acorn.getLineInfo(code, sI);
let ePos = acorn.getLineInfo(code, eI);

console.log(sPos, ePos);

// write string slice to a new code file
// walk.full(ast, (node) => {
//     if (node.start == sI) {
//         console.log(node);
//         return;
//     }
//     // console.log(node.start);
// });
let fRes = walk.findNodeAt(ast, sI, eI, 'FunctionDeclaration');



console.log(fRes);

let newStr = esgenerate.generate(fRes.node);
console.log(newStr);
fs.writeFileSync('./code/newCode.js', newStr);

