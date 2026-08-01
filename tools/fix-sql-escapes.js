const fs = require("fs");
const p = "c:/Users/ashok/Desktop/Project/js/data/course-sql.js";
let t = fs.readFileSync(p, "utf8");
// Escape backslashes that are NOT valid JS escapes
const fixed = t.replace(
  /\\(?!\\|n|r|t|v|b|f|0|u[0-9a-fA-F]{4}|u\{[0-9a-fA-F]+\}|x[0-9a-fA-F]{2}|['"`])/g,
  "\\\\"
);
fs.writeFileSync(p, fixed);
console.log("rewrote", p, "changed", t !== fixed);
