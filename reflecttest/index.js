const sourcemap = require('source-map');
const fs = require('fs');
const acorn = require('acorn');

const rawSourceMapFile = fs.readFileSync('./runcase.js.map');

const rawSourceMap = JSON.parse(rawSourceMapFile);

async function foo() {
    const consumer = await new sourcemap.SourceMapConsumer(rawSourceMap);
    let out = consumer.allGeneratedPositionsFor({line: 1, source: "runcase.ts"});
    console.log(out);
    // let out2 = consumer.sourceContentFor
    // consumer.eachMapping((item)=>{
    //     console.log(item)
    // })
    rewrap = function (f) {
        console.log("this from consumer1");
        return f;
    }
    Object.assign(globalThis, {genOutput: rewrap(genOutputCore)});
    let app1 = require('./runcase');
    let content = app1.entryMain();
    consumer.destroy();
}

foo();


function genOutputCore(a) {
    if (!a) {
        return;
    }
    console.log(a.foo.toString());
    let str = a.foo.toString();
    let saved = acorn.parse(str);
    console.log(saved);
    return a.foo.toString();
}

// let app = require('./runcase');
// Object.assign(globalThis, {genOutput: rewrap(genOutputCore)});
// app.entryMain()
// console.log(app)