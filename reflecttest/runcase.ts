declare function genOutput(input) : string

let rtObj = {
    num: 10,
    foo: function foo() {
        console.log(1)
    }
};

export function entryMain() : string {
  return genOutput(rtObj);
}

