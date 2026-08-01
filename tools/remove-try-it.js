const fs = require("fs");
const files = [
  "c:/Users/ashok/Desktop/Project/js/data/course-sql.js",
  "c:/Users/ashok/Desktop/Project/js/data/course-mongo.js",
  "c:/Users/ashok/Desktop/Project/js/data/course-git.js",
  "c:/Users/ashok/Desktop/Project/js/data/curriculum.js",
  "c:/Users/ashok/Desktop/Project/js/data/course-catalog.js"
];

const re = /<h2>\s*Try it\s*<\/h2>\s*<ol>[\s\S]*?<\/ol>\s*/gi;

for (const p of files) {
  if (!fs.existsSync(p)) continue;
  let t = fs.readFileSync(p, "utf8");
  const before = (t.match(/<h2>\s*Try it\s*<\/h2>/gi) || []).length;
  t = t.replace(re, "");
  const after = (t.match(/<h2>\s*Try it\s*<\/h2>/gi) || []).length;
  fs.writeFileSync(p, t);
  console.log(p.split("/").pop(), { before, after });
}
