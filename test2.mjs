// import { setObjVal, getObjVal } from "./objectFromPathString.mjs";

import { get, set } from "./lodashVersion.mjs";


const setObjVal = set
const getObjVal = get


const vals = [
    {
        path: "first!@#$%^&*()_+-=\n\\[\\]\\.\\;',/<>?:\"{}|Name",
        value: "Zach",
    },
    { path: "lastName", value: "Lankton" },
    { path: "roles[0]", value: "admin" },
    { path: "roles[1]", value: "user" },
    { path: "roles[3]", value: "public" },
    { path: "cart[0].item", value: "pizza" },
    { path: "cart[0].price", value: "10" },
    { path: "cart[1].item", value: "pop" },
    { path: "cart[1].price", value: "5" },
    { path: "cart[2].item", value: "chips" },
    { path: "cart[2].price", value: "2" },
    {
        path: "deeply.nested[9][1][asdf].asdf.0.1.and.even.escaping\\[brackets\\]and\\.periods\\.",
        value: "complex",
    },
    {
        path: "some.deeply[0].nested[1][9].complex[2].pathObject",
        value: "test1",
    },
    {
        path: "some.deeply[0].nested[1][9].complex[2].pathArray[3]",
        value: "test2",
    },
];

const test = {};

vals.forEach((val) => console.log(getObjVal(test, val.path)));
const start = performance.now();
vals.forEach((val) => setObjVal(test, val.path, val.value));
const end = performance.now();
console.log(test);
vals.forEach((val) => console.log(getObjVal(test, val.path)));

console.log(test.some.deeply[0].nested[1][9].complex[2]);
console.log(test.deeply.nested[9][1].asdf.asdf[0][1].and.even);

console.log(end, start, end - start);
