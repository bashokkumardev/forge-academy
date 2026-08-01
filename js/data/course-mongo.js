/* ASHOVIX LABS — Complete MongoDB Curriculum */
(function () {
  const lessons = {};
  const L = (id, data) => { lessons[id] = { id, ...data }; };

  const paths = [
    { id: "foundation", name: "Foundations", level: "Beginner", blurb: "NoSQL concepts, install MongoDB & mongosh on Windows/Linux, connect with Compass.", color: "#5dde8a" },
    { id: "crud", name: "CRUD", level: "Beginner", blurb: "Insert, find, update, delete, replace, and upsert documents.", color: "#6aa8ff" },
    { id: "query", name: "Query Power", level: "Intermediate", blurb: "Projection, sorting, operators, arrays, and text search.", color: "#f0b429" },
    { id: "aggregation", name: "Aggregation", level: "Intermediate → Advanced", blurb: "Pipeline stages: $match, $group, $lookup, $unwind, and patterns.", color: "#ff8f70" },
    { id: "design", name: "Design & Ops", level: "Advanced", blurb: "Modeling, indexes, auth, backup, and replica sets.", color: "#7dd3c0" }
  ];

  const modules = [
    { id: "mod01", path: "foundation", title: "Foundations", lessonIds: ["m01", "m02", "m03", "m04"] },
    { id: "mod02", path: "crud", title: "CRUD Operations", lessonIds: ["m05", "m06", "m07", "m08", "m09"] },
    { id: "mod03", path: "query", title: "Query Power", lessonIds: ["m10", "m11", "m12", "m13"] },
    { id: "mod04", path: "aggregation", title: "Aggregation", lessonIds: ["m14", "m15", "m16"] },
    { id: "mod05", path: "design", title: "Design & Operations", lessonIds: ["m17", "m18", "m19", "m20"] }
  ];

  /* ========== FOUNDATIONS ========== */
  L("m01", {
    path: "foundation", module: "mod01", title: "What Is MongoDB? NoSQL vs SQL",
    level: "Beginner", duration: "30 min",
    objectives: ["Contrast relational and document models", "Explain when MongoDB fits", "Name core BSON types and use cases"],
    content: `
<p><strong>MongoDB</strong> is a document-oriented database. Data lives in <strong>documents</strong> (JSON-like objects stored as BSON) grouped in <strong>collections</strong> inside <strong>databases</strong>. There is no fixed table schema—each document in a collection can have different fields.</p>
<h2>SQL vs document mental model</h2>
<div class="table-wrap"><table>
  <thead><tr><th>Relational (SQL)</th><th>MongoDB</th></tr></thead>
  <tbody>
    <tr><td>Database</td><td>Database</td></tr>
    <tr><td>Table</td><td>Collection</td></tr>
    <tr><td>Row</td><td>Document</td></tr>
    <tr><td>Column</td><td>Field</td></tr>
    <tr><td>Primary key</td><td><code>_id</code> (auto-generated ObjectId if omitted)</td></tr>
    <tr><td>JOIN</td><td>Embedded docs, <code>$lookup</code>, or app-side merge</td></tr>
  </tbody>
</table></div>
<h2>Why teams choose MongoDB</h2>
<ul>
  <li><strong>Flexible schema</strong> — evolve product features without ALTER TABLE migrations for every field.</li>
  <li><strong>Document shape matches objects</strong> — APIs and mobile apps map naturally to nested JSON.</li>
  <li><strong>Horizontal scale</strong> — sharded clusters for high write/read throughput (replica sets for HA).</li>
  <li><strong>Rich query & aggregation</strong> — not “dumb key-value”; full secondary indexes, text search, geo, aggregation framework.</li>
</ul>
<h2>When SQL may still win</h2>
<ul>
  <li>Heavy multi-table transactional constraints with strict ACID across many entities.</li>
  <li>Reporting that depends on normalized star schemas and mature SQL tooling.</li>
  <li>Regulatory requirements mandating specific relational patterns.</li>
</ul>
<div class="callout"><strong>ASHOVIX LABS note:</strong> MongoDB 4.0+ supports multi-document transactions on replica sets. Use them when needed, but design for document locality first.</div>
<h2>Hands-on: compare shapes (conceptual)</h2>
<p>In SQL you might store an order header and line items in two tables. In MongoDB you often embed line items:</p>
<pre><code>// One document — natural for read-by-order-id
{
  "_id": ObjectId("..."),
  "customer": "Ashok",
  "items": [
    { "sku": "BOOK-1", "qty": 2, "price": 19.99 },
    { "sku": "PEN-9", "qty": 1, "price": 4.50 }
  ],
  "total": 44.48
}</code></pre>
<h2>Verify checklist</h2>
<ul>
  <li>☐ I can name the SQL equivalent of collection, document, and field.</li>
  <li>☐ I understand that <code>_id</code> is required on every document.</li>
  <li>☐ I can explain one use case where embedding beats normalization.</li>
</ul>
`,
    quiz: {
      q: "In MongoDB, a group of documents is called a:",
      options: ["Table", "Collection", "Shard", "Replica"],
      answer: 1
    }
  });

  L("m02", {
    path: "foundation", module: "mod01", title: "Install MongoDB Community Edition",
    level: "Beginner", duration: "50 min",
    objectives: ["Install MongoDB on Windows and Ubuntu", "Configure data directory and service", "Verify with mongosh ping"],
    content: `
<p>This lesson installs <strong>MongoDB Community Edition</strong> locally. You need a running <code>mongod</code> on port <strong>27017</strong> before later labs.</p>
<h2>Windows — full install steps</h2>
<ol>
  <li>Open <a href="https://www.mongodb.com/try/download/community" target="_blank" rel="noopener">MongoDB Community Download</a>.</li>
  <li>Select <strong>Version</strong> (e.g. 7.0), <strong>Platform: Windows</strong>, <strong>Package: msi</strong>. Download.</li>
  <li>Run the MSI installer.</li>
  <li>Choose <strong>Complete</strong> installation.</li>
  <li>On <strong>Service Configuration</strong>, check <strong>Install MongoDB as a Service</strong>:
    <ul>
      <li>Service Name: <code>MongoDB</code></li>
      <li>Data Directory: <code>C:\\Program Files\\MongoDB\\Server\\7.0\\data</code> (default) — or use <code>C:\\data\\db</code> for learning (create folder first).</li>
      <li>Log Directory: default or <code>C:\\data\\log</code></li>
    </ul>
  </li>
  <li>Optionally install <strong>MongoDB Compass</strong> when prompted.</li>
  <li>Finish installer. Service should start automatically.</li>
</ol>
<h3>Windows — manual data directory (learning layout)</h3>
<pre><code># PowerShell (Admin) — create paths
New-Item -ItemType Directory -Force -Path C:\\data\\db
New-Item -ItemType Directory -Force -Path C:\\data\\log</code></pre>
<p>Edit config file (if using custom paths). Default config path:</p>
<pre><code>C:\\Program Files\\MongoDB\\Server\\7.0\\bin\\mongod.cfg</code></pre>
<p>Example <code>mongod.cfg</code> snippet:</p>
<pre><code>storage:
  dbPath: C:\\data\\db
systemLog:
  destination: file
  path: C:\\data\\log\\mongod.log
net:
  port: 27017
  bindIp: 127.0.0.1</code></pre>
<h3>Windows — PATH</h3>
<ol>
  <li>Open <strong>Environment Variables</strong> → System → <strong>Path</strong> → Edit.</li>
  <li>Add: <code>C:\\Program Files\\MongoDB\\Server\\7.0\\bin</code></li>
  <li>Open a <strong>new</strong> PowerShell window and run:</li>
</ol>
<pre><code>mongod --version</code></pre>
<p><strong>Expected output:</strong> version string, e.g. <code>db version v7.0.x</code>.</p>
<h3>Windows — start / verify service</h3>
<pre><code># PowerShell (Admin)
Get-Service MongoDB
Start-Service MongoDB
Get-Service MongoDB</code></pre>
<p><strong>Expected:</strong> Status <code>Running</code>.</p>
<h2>Linux (Ubuntu) — apt install steps</h2>
<ol>
  <li>Import MongoDB public GPG key and add repo (Ubuntu 22.04 example):</li>
</ol>
<pre><code>curl -fsSL https://www.mongodb.org/static/pgp/server-7.0.asc | \\
  sudo gpg -o /usr/share/keyrings/mongodb-server-7.0.gpg --dearmor

echo "deb [ arch=amd64,arm64 signed-by=/usr/share/keyrings/mongodb-server-7.0.gpg ] \\
  https://repo.mongodb.org/apt/ubuntu jammy/mongodb-org/7.0 multiverse" | \\
  sudo tee /etc/apt/sources.list.d/mongodb-org-7.0.list

sudo apt-get update</code></pre>
<ol start="2">
  <li>Install packages:</li>
</ol>
<pre><code>sudo apt-get install -y mongodb-org</code></pre>
<ol start="3">
  <li>Create data and log directories:</li>
</ol>
<pre><code>sudo mkdir -p /var/lib/mongodb /var/log/mongodb
sudo chown -R mongodb:mongodb /var/lib/mongodb /var/log/mongodb</code></pre>
<ol start="4">
  <li>Start and enable the service:</li>
</ol>
<pre><code>sudo systemctl start mongod
sudo systemctl enable mongod
sudo systemctl status mongod</code></pre>
<p><strong>Expected:</strong> <code>active (running)</code> in green.</p>
<h3>Linux — config file</h3>
<pre><code>sudo nano /etc/mongod.conf</code></pre>
<p>Confirm:</p>
<pre><code>storage:
  dbPath: /var/lib/mongodb
systemLog:
  path: /var/log/mongodb/mongod.log
net:
  port: 27017
  bindIp: 127.0.0.1</code></pre>
<pre><code>sudo systemctl restart mongod</code></pre>
<h2>Verify with mongosh (after m03 if needed)</h2>
<pre><code>mongosh
db.runCommand({ ping: 1 })</code></pre>
<p><strong>Expected output:</strong></p>
<pre><code>{ ok: 1 }</code></pre>
<h2>Troubleshooting port 27017</h2>
<ol>
  <li><strong>Port already in use</strong> — Windows: <code>netstat -ano | findstr 27017</code>; Linux: <code>ss -tlnp | grep 27017</code>. Stop conflicting process or change port in config.</li>
  <li><strong>Permission denied on data path</strong> — ensure OS user (Windows service account / Linux <code>mongodb</code> user) owns the data directory.</li>
  <li><strong>Service won't start</strong> — read log: Windows <code>C:\\data\\log\\mongod.log</code> or Linux <code>/var/log/mongodb/mongod.log</code>.</li>
  <li><strong>Connection refused</strong> — confirm <code>bindIp</code> includes your client address; for local dev use <code>127.0.0.1</code>.</li>
</ol>
<h2>Verify checklist</h2>
<ul>
  <li>☐ <code>mongod --version</code> prints a version.</li>
  <li>☐ MongoDB service is <code>Running</code> / <code>active (running)</code>.</li>
  <li>☐ <code>db.runCommand({ ping: 1 })</code> returns <code>{ ok: 1 }</code>.</li>
  <li>☐ I know where my data directory and log file live.</li>
</ul>
`,
    quiz: {
      q: "Default MongoDB wire protocol port is:",
      options: ["3306", "5432", "27017", "8080"],
      answer: 2
    }
  });

  L("m03", {
    path: "foundation", module: "mod01", title: "Install mongosh & Compass, Connect Locally",
    level: "Beginner", duration: "35 min",
    objectives: ["Install MongoDB Shell and Compass", "Connect to local mongod", "Run first commands"],
    content: `
<p><strong>mongosh</strong> is the modern MongoDB Shell (replaces legacy <code>mongo</code>). <strong>Compass</strong> is the GUI for browsing data, indexes, and performance.</p>
<h2>Install mongosh — Windows</h2>
<ol>
  <li>Download from <a href="https://www.mongodb.com/try/download/shell" target="_blank" rel="noopener">MongoDB Shell Download</a> (Windows zip or MSI).</li>
  <li>If zip: extract to <code>C:\\Program Files\\mongosh</code>.</li>
  <li>Add to PATH: <code>C:\\Program Files\\mongosh\\bin</code> (or MSI may do this).</li>
  <li>Open new PowerShell:</li>
</ol>
<pre><code>mongosh --version</code></pre>
<p><strong>Expected:</strong> <code>2.x.x</code> shell version.</p>
<h2>Install mongosh — Linux (Ubuntu)</h2>
<pre><code>wget https://downloads.mongodb.com/compass/mongosh-2.3.1-linux-x64.tgz
tar -zxvf mongosh-2.3.1-linux-x64.tgz
sudo cp mongosh-2.3.1-linux-x64/bin/mongosh /usr/local/bin/
mongosh --version</code></pre>
<p>(Use latest version from MongoDB download page; adjust filename accordingly.)</p>
<h2>Install Compass — Windows / Linux</h2>
<ol>
  <li>Download from <a href="https://www.mongodb.com/try/download/compass" target="_blank" rel="noopener">Compass Download</a>.</li>
  <li>Windows: run installer. Linux: install .deb or AppImage per download page.</li>
  <li>Launch Compass.</li>
</ol>
<h2>Connect locally — mongosh step by step</h2>
<ol>
  <li>Ensure <code>mongod</code> is running (see m02).</li>
  <li>Open terminal and connect to default local instance:</li>
</ol>
<pre><code>mongosh "mongodb://127.0.0.1:27017"</code></pre>
<p><strong>Expected:</strong> prompt like <code>test&gt;</code> and connection message with server version.</p>
<ol start="3">
  <li>Ping the server:</li>
</ol>
<pre><code>db.runCommand({ ping: 1 })</code></pre>
<p><strong>Expected:</strong> <code>{ ok: 1 }</code></p>
<ol start="4">
  <li>Show databases:</li>
</ol>
<pre><code>show dbs</code></pre>
<p><strong>Expected:</strong> at least <code>admin</code>, <code>config</code> (if replica set), <code>local</code>.</p>
<ol start="5">
  <li>Create/use a practice database (MongoDB creates DB on first write):</li>
</ol>
<pre><code>use forge_lab
db.getName()</code></pre>
<p><strong>Expected:</strong> <code>forge_lab</code></p>
<ol start="6">
  <li>Insert one document and read it back:</li>
</ol>
<pre><code>db.hello.insertOne({ msg: "ASHOVIX LABS connected", at: new Date() })
db.hello.find()</code></pre>
<p><strong>Expected:</strong> one document with <code>_id</code> ObjectId and your fields.</p>
<h2>Connect locally — Compass step by step</h2>
<ol>
  <li>Open Compass → <strong>New Connection</strong>.</li>
  <li>URI: <code>mongodb://127.0.0.1:27017</code></li>
  <li>Click <strong>Connect</strong> (no auth for default local install).</li>
  <li>Expand <code>forge_lab</code> → <code>hello</code> collection → see your document.</li>
  <li>Use <strong>Filter</strong> bar: <code>{ msg: "ASHOVIX LABS connected" }</code> → documents match.</li>
</ol>
<h2>Connection string reference</h2>
<pre><code>mongodb://127.0.0.1:27017/forge_lab   # database in path
mongodb://127.0.0.1:27017/?directConnection=true  # single node</code></pre>
<h2>Verify checklist</h2>
<ul>
  <li>☐ <code>mongosh --version</code> works.</li>
  <li>☐ Compass connects to <code>127.0.0.1:27017</code>.</li>
  <li>☐ <code>db.runCommand({ ping: 1 })</code> returns <code>ok: 1</code>.</li>
  <li>☐ I inserted and found a document in <code>forge_lab.hello</code>.</li>
</ul>
`,
    quiz: {
      q: "Which command pings the MongoDB server from mongosh?",
      options: ["db.status()", "db.runCommand({ ping: 1 })", "ping mongod", "db.ping()"],
      answer: 1
    }
  });

  L("m04", {
    path: "foundation", module: "mod01", title: "Databases, Collections, Documents & BSON",
    level: "Beginner", duration: "35 min",
    objectives: ["Navigate hierarchy", "Understand BSON types", "Create collections and inspect documents"],
    content: `
<p>MongoDB organizes data in a hierarchy: <strong>server → database → collection → document</strong>. Documents are BSON (Binary JSON)—JSON plus extra types like <code>Date</code>, <code>ObjectId</code>, <code>Decimal128</code>.</p>
<h2>Step-by-step exploration</h2>
<ol>
  <li>Connect:</li>
</ol>
<pre><code>mongosh "mongodb://127.0.0.1:27017"</code></pre>
<ol start="2">
  <li>List databases:</li>
</ol>
<pre><code>show dbs</code></pre>
<ol start="3">
  <li>Switch database (creates on first write):</li>
</ol>
<pre><code>use bookstore</code></pre>
<ol start="4">
  <li>Create collection explicitly (optional—insert also creates):</li>
</ol>
<pre><code>db.createCollection("books")</code></pre>
<p><strong>Expected:</strong> <code>{ ok: 1 }</code></p>
<ol start="5">
  <li>List collections:</li>
</ol>
<pre><code>show collections</code></pre>
<ol start="6">
  <li>Insert a document with varied BSON types:</li>
</ol>
<pre><code>db.books.insertOne({
  title: "MongoDB Complete",
  author: "ASHOVIX LABS",
  published: new Date("2024-01-15"),
  pages: 420,
  price: Decimal128("29.99"),
  tags: ["database", "nosql"],
  meta: { edition: 1, lang: "en" },
  inStock: true
})</code></pre>
<ol start="7">
  <li>Find with pretty print:</li>
</ol>
<pre><code>db.books.findOne()</code></pre>
<p><strong>Expected:</strong> document with <code>_id</code> ObjectId, nested <code>meta</code>, array <code>tags</code>.</p>
<h2>BSON types you will use daily</h2>
<div class="table-wrap"><table>
  <thead><tr><th>Type</th><th>Example in mongosh</th></tr></thead>
  <tbody>
    <tr><td>String</td><td><code>"hello"</code></td></tr>
    <tr><td>Int / Double</td><td><code>42</code>, <code>3.14</code></td></tr>
    <tr><td>Boolean</td><td><code>true</code></td></tr>
    <tr><td>Date</td><td><code>new Date()</code></td></tr>
    <tr><td>ObjectId</td><td><code>ObjectId()</code></td></tr>
    <tr><td>Array</td><td><code>["a", "b"]</code></td></tr>
    <tr><td>Object</td><td><code>{ k: "v" }</code></td></tr>
    <tr><td>Null</td><td><code>null</code></td></tr>
    <tr><td>Decimal128</td><td><code>Decimal128("19.99")</code></td></tr>
  </tbody>
</table></div>
<h2>Document rules</h2>
<ul>
  <li>Every document must have <code>_id</code> (unique per collection).</li>
  <li>Field names cannot contain <code>.</code> or start with <code>$</code> (reserved).</li>
  <li>Max document size: 16 MB.</li>
</ul>
<h2>Drop practice data (optional)</h2>
<pre><code>db.books.drop()
db.dropDatabase()</code></pre>
<h2>Verify checklist</h2>
<ul>
  <li>☐ I created <code>bookstore.books</code> and inserted a document.</li>
  <li>☐ I can explain database vs collection vs document.</li>
  <li>☐ I recognize ObjectId, Date, and nested objects in output.</li>
</ul>
`,
    quiz: {
      q: "Maximum document size in MongoDB is:",
      options: ["1 MB", "16 MB", "64 MB", "Unlimited"],
      answer: 1
    }
  });

  /* ========== CRUD ========== */
  L("m05", {
    path: "crud", module: "mod02", title: "insertOne & insertMany",
    level: "Beginner", duration: "30 min",
    objectives: ["Insert single and multiple documents", "Read insert results", "Handle duplicate _id errors"],
    content: `
<p>All writes target a <strong>collection</strong>. Use <code>insertOne</code> for one document and <code>insertMany</code> for batches.</p>
<h2>Setup</h2>
<pre><code>mongosh
use forge_lab
db.products.drop()</code></pre>
<h2>Step-by-step — insertOne</h2>
<ol>
  <li>Insert one product:</li>
</ol>
<pre><code>db.products.insertOne({
  sku: "SKU-100",
  name: "Wireless Mouse",
  price: 24.99,
  stock: 50,
  tags: ["electronics", "peripherals"]
})</code></pre>
<p><strong>Expected output:</strong></p>
<pre><code>{
  acknowledged: true,
  insertedId: ObjectId('...')
}</code></pre>
<ol start="2">
  <li>Verify:</li>
</ol>
<pre><code>db.products.findOne({ sku: "SKU-100" })</code></pre>
<h2>Step-by-step — insertMany</h2>
<pre><code>db.products.insertMany([
  { sku: "SKU-101", name: "Keyboard", price: 59.99, stock: 30, tags: ["electronics"] },
  { sku: "SKU-102", name: "USB Hub", price: 19.99, stock: 100, tags: ["electronics", "accessories"] },
  { sku: "SKU-103", name: "Monitor Stand", price: 39.99, stock: 15, tags: ["furniture"] }
])</code></pre>
<p><strong>Expected:</strong> <code>insertedIds</code> object with indexes 0, 1, 2.</p>
<pre><code>db.products.countDocuments()</code></pre>
<p><strong>Expected:</strong> <code>4</code></p>
<h2>Custom _id</h2>
<pre><code>db.products.insertOne({ _id: "SKU-999", name: "Legacy Item", price: 9.99, stock: 1 })
db.products.findOne({ _id: "SKU-999" })</code></pre>
<h2>Ordered vs unordered insertMany</h2>
<pre><code>db.products.insertMany(
  [{ _id: "dup-test", sku: "A" }, { _id: "dup-test", sku: "B" }],
  { ordered: true }
)</code></pre>
<p><strong>Expected:</strong> error on duplicate <code>_id</code>; second doc not inserted if ordered.</p>
<h2>Verify checklist</h2>
<ul>
  <li>☐ <code>insertOne</code> returned <code>acknowledged: true</code> and <code>insertedId</code>.</li>
  <li>☐ <code>insertMany</code> inserted 3 documents; count is 4+.</li>
  <li>☐ I understand duplicate <code>_id</code> causes write error.</li>
</ul>
`,
    quiz: {
      q: "insertMany with ordered: true stops on first error.",
      options: ["True — remaining docs are not inserted", "False — all docs are attempted", "Only applies to updateMany", "Only applies to deleteMany"],
      answer: 0
    }
  });

  L("m06", {
    path: "crud", module: "mod02", title: "find — Equality & Query Operators",
    level: "Beginner", duration: "40 min",
    objectives: ["Query by field equality", "Use $gt, $in, $ne, $and, $or", "Combine filters"],
    content: `
<p><code>find()</code> returns a cursor; <code>findOne()</code> returns the first match or null. Filters are JSON documents.</p>
<h2>Setup seed (if needed)</h2>
<pre><code>use forge_lab
db.products.drop()
db.products.insertMany([
  { sku: "A1", name: "Mouse", price: 25, stock: 50, tags: ["electronics"] },
  { sku: "A2", name: "Keyboard", price: 60, stock: 30, tags: ["electronics"] },
  { sku: "B1", name: "Desk Lamp", price: 35, stock: 20, tags: ["furniture"] },
  { sku: "B2", name: "Chair", price: 120, stock: 5, tags: ["furniture"] }
])</code></pre>
<h2>Equality</h2>
<pre><code>db.products.find({ sku: "A1" })
db.products.findOne({ name: "Chair" })</code></pre>
<h2>Comparison operators</h2>
<pre><code>db.products.find({ price: { $gt: 30 } })
db.products.find({ price: { $gte: 35, $lte: 70 } })
db.products.find({ stock: { $lt: 25 } })</code></pre>
<p><strong>Expected:</strong> Mouse+Keyboard for $gt 30; Desk Lamp+Keyboard for range; Desk Lamp+Chair for stock &lt; 25.</p>
<h2>Element & equality operators</h2>
<pre><code>db.products.find({ tags: "electronics" })
db.products.find({ tags: { $in: ["furniture", "accessories"] } })
db.products.find({ sku: { $ne: "A1" } })
db.products.find({ discontinued: { $exists: false } })</code></pre>
<h2>Logical operators</h2>
<pre><code>db.products.find({
  $and: [
    { price: { $gte: 30 } },
    { stock: { $gte: 20 } }
  ]
})

db.products.find({
  $or: [
    { price: { $lt: 30 } },
    { stock: { $lt: 10 } }
  ]
})</code></pre>
<h2>Verify checklist</h2>
<ul>
  <li>☐ Equality filter returns expected single SKU.</li>
  <li>☐ <code>$gt</code> / <code>$in</code> / <code>$ne</code> behave as expected.</li>
  <li>☐ <code>$and</code> and <code>$or</code> combine conditions correctly.</li>
</ul>
`,
    quiz: {
      q: "Which operator finds documents where field value is in a list?",
      options: ["$gt", "$in", "$exists", "$type"],
      answer: 1
    }
  });

  L("m07", {
    path: "crud", module: "mod02", title: "updateOne, updateMany & Update Operators",
    level: "Beginner", duration: "40 min",
    objectives: ["Use $set, $inc, $push, $pull", "Understand updateOne vs updateMany", "Read update results"],
    content: `
<p>Updates use <code>updateOne</code>, <code>updateMany</code>, or <code>replaceOne</code>. Always use <strong>update operators</strong> unless replacing the whole document.</p>
<h2>updateOne with $set</h2>
<pre><code>use forge_lab
db.products.updateOne(
  { sku: "A1" },
  { $set: { price: 27.99, lastUpdated: new Date() } }
)</code></pre>
<p><strong>Expected:</strong> <code>matchedCount: 1</code>, <code>modifiedCount: 1</code>.</p>
<pre><code>db.products.findOne({ sku: "A1" }, { price: 1, lastUpdated: 1 })</code></pre>
<h2>$inc — increment numeric field</h2>
<pre><code>db.products.updateOne(
  { sku: "A1" },
  { $inc: { stock: -5 } }
)</code></pre>
<p><strong>Expected:</strong> stock decreased by 5.</p>
<h2>$push — add to array</h2>
<pre><code>db.products.updateOne(
  { sku: "A2" },
  { $push: { tags: "wireless" } }
)</code></pre>
<pre><code>db.products.findOne({ sku: "A2" }, { tags: 1 })</code></pre>
<h2>$push with $each</h2>
<pre><code>db.products.updateOne(
  { sku: "B1" },
  { $push: { tags: { $each: ["led", "adjustable"] } } }
)</code></pre>
<h2>updateMany</h2>
<pre><code>db.products.updateMany(
  { tags: "furniture" },
  { $inc: { stock: 10 } }
)</code></pre>
<p><strong>Expected:</strong> <code>modifiedCount</code> matches furniture items.</p>
<h2>$pull — remove from array</h2>
<pre><code>db.products.updateOne(
  { sku: "A2" },
  { $pull: { tags: "wireless" } }
)</code></pre>
<h2>Verify checklist</h2>
<ul>
  <li>☐ <code>$set</code> changed price without replacing whole doc.</li>
  <li>☐ <code>$inc</code> adjusted stock numerically.</li>
  <li>☐ <code>$push</code> / <code>$pull</code> modified arrays.</li>
  <li>☐ <code>updateMany</code> modified multiple documents.</li>
</ul>
`,
    quiz: {
      q: "Which operator increments a numeric field?",
      options: ["$set", "$inc", "$push", "$rename"],
      answer: 1
    }
  });

  L("m08", {
    path: "crud", module: "mod02", title: "deleteOne & deleteMany",
    level: "Beginner", duration: "25 min",
    objectives: ["Delete by filter", "Interpret deletedCount", "Avoid accidental mass delete"],
    content: `
<p>Deletes are permanent unless using time-series/expired data patterns or backups. Always filter carefully.</p>
<h2>deleteOne</h2>
<pre><code>use forge_lab
db.products.deleteOne({ sku: "B2" })</code></pre>
<p><strong>Expected:</strong> <code>deletedCount: 1</code></p>
<pre><code>db.products.findOne({ sku: "B2" })</code></pre>
<p><strong>Expected:</strong> <code>null</code></p>
<h2>deleteMany</h2>
<pre><code>db.products.deleteMany({ stock: { $lt: 25 } })</code></pre>
<p><strong>Expected:</strong> <code>deletedCount</code> reflects low-stock items.</p>
<pre><code>db.products.find()</code></pre>
<h2>Dangerous empty filter</h2>
<pre><code>// NEVER on production without intent:
// db.products.deleteMany({})  // deletes ALL documents in collection</code></pre>
<div class="callout warning"><strong>Safety:</strong> In mongosh, confirm destructive ops. Use <code>find()</code> first with same filter to preview matches.</div>
<h2>Drop collection vs deleteMany</h2>
<pre><code>db.products.deleteMany({})
db.products.countDocuments()</code></pre>
<p><strong>Expected:</strong> count <code>0</code> but collection metadata remains.</p>
<pre><code>db.products.drop()</code></pre>
<p><strong>Expected:</strong> collection removed entirely.</p>
<h2>Verify checklist</h2>
<ul>
  <li>☐ <code>deleteOne</code> removed exactly one document.</li>
  <li>☐ <code>deleteMany</code> with filter removed multiple docs.</li>
  <li>☐ I know <code>deleteMany({})</code> wipes the collection.</li>
</ul>
`,
    quiz: {
      q: "deleteOne removes at most how many documents?",
      options: ["0", "1", "All matching", "Entire database"],
      answer: 1
    }
  });

  L("m09", {
    path: "crud", module: "mod02", title: "replaceOne & Upsert",
    level: "Beginner", duration: "30 min",
    objectives: ["Replace entire documents", "Use upsert to insert-or-update", "Choose replace vs update"],
    content: `
<p><code>replaceOne</code> swaps the entire document (except <code>_id</code>) when you don't use update operators. <strong>Upsert</strong> inserts if no match exists.</p>
<h2>Setup</h2>
<pre><code>use forge_lab
db.inventory.drop()
db.inventory.insertOne({ sku: "X1", name: "Widget", qty: 10, warehouse: "A" })</code></pre>
<h2>replaceOne</h2>
<pre><code>db.inventory.replaceOne(
  { sku: "X1" },
  { sku: "X1", name: "Widget Pro", qty: 10, warehouse: "B", upgraded: true }
)</code></pre>
<pre><code>db.inventory.findOne({ sku: "X1" })</code></pre>
<p><strong>Expected:</strong> <code>warehouse: "B"</code>, <code>upgraded: true</code>; old fields not in replacement are gone.</p>
<h2>Upsert — insert when missing</h2>
<pre><code>db.inventory.updateOne(
  { sku: "X9" },
  { $set: { name: "New Part", qty: 5 }, $setOnInsert: { createdAt: new Date() } },
  { upsert: true }
)</code></pre>
<p><strong>Expected:</strong> <code>upsertedId</code> present; new document created.</p>
<pre><code>db.inventory.find({ sku: "X9" })</code></pre>
<h2>Upsert — update when exists</h2>
<pre><code>db.inventory.updateOne(
  { sku: "X9" },
  { $inc: { qty: 3 } },
  { upsert: true }
)</code></pre>
<p><strong>Expected:</strong> <code>modifiedCount: 1</code>, qty now 8.</p>
<h2>replaceOne with upsert</h2>
<pre><code>db.inventory.replaceOne(
  { sku: "Y1" },
  { sku: "Y1", name: "Bolt", qty: 100 },
  { upsert: true }
)</code></pre>
<h2>Verify checklist</h2>
<ul>
  <li>☐ <code>replaceOne</code> replaced full document shape.</li>
  <li>☐ Upsert created <code>X9</code> when missing.</li>
  <li>☐ Upsert updated <code>X9</code> when present.</li>
  <li>☐ I know when to use <code>updateOne</code> vs <code>replaceOne</code>.</li>
</ul>
`,
    quiz: {
      q: "Upsert means:",
      options: ["Delete then insert", "Update if match, insert if no match", "Only insert", "Only update"],
      answer: 1
    }
  });

  /* ========== QUERY POWER ========== */
  L("m10", {
    path: "query", module: "mod03", title: "Projection, Sort, Limit & Skip",
    level: "Intermediate", duration: "35 min",
    objectives: ["Return selected fields", "Sort results", "Paginate with limit and skip"],
    content: `
<p>Control <strong>what</strong> comes back (projection), <strong>order</strong> (sort), and <strong>page size</strong> (limit/skip).</p>
<h2>Setup</h2>
<pre><code>use forge_lab
db.orders.drop()
db.orders.insertMany([
  { orderId: 1, customer: "Alice", total: 50, status: "open", created: new Date("2024-03-01") },
  { orderId: 2, customer: "Bob", total: 120, status: "shipped", created: new Date("2024-03-02") },
  { orderId: 3, customer: "Carol", total: 75, status: "open", created: new Date("2024-03-03") },
  { orderId: 4, customer: "Dan", total: 200, status: "shipped", created: new Date("2024-03-04") },
  { orderId: 5, customer: "Eve", total: 30, status: "cancelled", created: new Date("2024-03-05") }
])</code></pre>
<h2>Projection — include fields</h2>
<pre><code>db.orders.find({ status: "open" }, { orderId: 1, customer: 1, total: 1 })</code></pre>
<p><strong>Expected:</strong> only listed fields + <code>_id</code> (unless <code>_id: 0</code>).</p>
<pre><code>db.orders.find({ status: "open" }, { orderId: 1, customer: 1, _id: 0 })</code></pre>
<h2>Projection — exclude fields</h2>
<pre><code>db.orders.find({}, { created: 0 })</code></pre>
<h2>Sort</h2>
<pre><code>db.orders.find().sort({ total: -1 })
db.orders.find({ status: "shipped" }).sort({ created: 1 })</code></pre>
<p><strong>Expected:</strong> first query highest total first; second oldest shipped first.</p>
<h2>Limit</h2>
<pre><code>db.orders.find().sort({ total: -1 }).limit(3)</code></pre>
<p><strong>Expected:</strong> top 3 orders by total.</p>
<h2>Skip (pagination)</h2>
<pre><code>// Page 1 (page size 2)
db.orders.find().sort({ orderId: 1 }).limit(2).skip(0)
// Page 2
db.orders.find().sort({ orderId: 1 }).limit(2).skip(2)
// Page 3
db.orders.find().sort({ orderId: 1 }).limit(2).skip(4)</code></pre>
<h2>Chained cursor methods</h2>
<pre><code>db.orders.find({ total: { $gte: 50 } })
  .sort({ total: -1 })
  .limit(2)
  .project({ customer: 1, total: 1, _id: 0 })</code></pre>
<h2>Verify checklist</h2>
<ul>
  <li>☐ Projection limits returned fields.</li>
  <li>☐ <code>sort({ field: -1 })</code> orders descending.</li>
  <li>☐ <code>limit(2).skip(2)</code> returns page 2 with size 2.</li>
</ul>
`,
    quiz: {
      q: "To hide _id in projection, use:",
      options: ["_id: 1", "_id: 0", "hideId: true", "noId: true"],
      answer: 1
    }
  });

  L("m11", {
    path: "query", module: "mod03", title: "Comparison, Logical & Element Operators",
    level: "Intermediate", duration: "35 min",
    objectives: ["Master $eq, $lt, $lte, $nin", "Use $and, $or, $not", "Query with $exists and $type"],
    content: `
<h2>Setup</h2>
<pre><code>use forge_lab
db.metrics.drop()
db.metrics.insertMany([
  { sensor: "temp", value: 22.5, unit: "C", calibrated: true },
  { sensor: "temp", value: 18.0, unit: "C" },
  { sensor: "humidity", value: 55, unit: "%", note: "ok" },
  { sensor: "pressure", value: 1012, unit: "hPa", flagged: false },
  { sensor: "temp", value: null, unit: "C", error: "read fail" }
])</code></pre>
<h2>Explicit comparison</h2>
<pre><code>db.metrics.find({ value: { $eq: 55 } })
db.metrics.find({ value: { $gt: 20, $lt: 100 } })
db.metrics.find({ sensor: { $nin: ["pressure", "humidity"] } })</code></pre>
<h2>Logical</h2>
<pre><code>db.metrics.find({
  $or: [
    { sensor: "temp", value: { $gte: 22 } },
    { sensor: "humidity" }
  ]
})

db.metrics.find({
  $and: [
    { sensor: "temp" },
    { value: { $ne: null } }
  ]
})</code></pre>
<h2>$not</h2>
<pre><code>db.metrics.find({ value: { $not: { $gt: 50 } } })</code></pre>
<h2>$exists</h2>
<pre><code>db.metrics.find({ calibrated: { $exists: true } })
db.metrics.find({ calibrated: { $exists: false } })</code></pre>
<h2>$type</h2>
<pre><code>db.metrics.find({ value: { $type: "double" } })
db.metrics.find({ value: { $type: "null" } })</code></pre>
<h2>Verify checklist</h2>
<ul>
  <li>☐ <code>$nin</code> excludes listed values.</li>
  <li>☐ <code>$exists: false</code> finds docs without field.</li>
  <li>☐ <code>$type</code> filters by BSON type.</li>
</ul>
`,
    quiz: {
      q: "$exists: false matches documents where the field:",
      options: ["Is null only", "Is missing or null", "Is missing", "Equals false"],
      answer: 2
    }
  });

  L("m12", {
    path: "query", module: "mod03", title: "Array Query Operators",
    level: "Intermediate", duration: "40 min",
    objectives: ["Query arrays with $all, $size, $elemMatch", "Match array elements precisely"],
    content: `
<h2>Setup</h2>
<pre><code>use forge_lab
db.articles.drop()
db.articles.insertMany([
  { title: "Intro Mongo", tags: ["mongo", "database", "nosql"], ratings: [4, 5, 5] },
  { title: "SQL Basics", tags: ["sql", "database"], ratings: [3, 4] },
  { title: "Atlas Guide", tags: ["mongo", "cloud", "atlas"], ratings: [5, 5, 4, 5] },
  { title: "NoSQL Patterns", tags: ["nosql", "design"], ratings: [4] },
  { title: "Sharding", tags: ["mongo", "scale"], comments: [{ user: "a", score: 9 }, { user: "b", score: 7 }] }
])</code></pre>
<h2>Match array contains value</h2>
<pre><code>db.articles.find({ tags: "mongo" })</code></pre>
<p><strong>Expected:</strong> any doc where <code>tags</code> includes <code>mongo</code>.</p>
<h2>$all — must contain all values</h2>
<pre><code>db.articles.find({ tags: { $all: ["mongo", "database"] } })</code></pre>
<h2>$size — exact array length</h2>
<pre><code>db.articles.find({ ratings: { $size: 3 } })</code></pre>
<h2>$elemMatch — match elements satisfying conditions</h2>
<pre><code>db.articles.find({
  ratings: { $elemMatch: { $gte: 5 } }
})

db.articles.find({
  comments: { $elemMatch: { user: "a", score: { $gte: 8 } } }
})</code></pre>
<h2>Multiple array criteria on same field</h2>
<pre><code>db.articles.find({ tags: { $all: ["mongo", "cloud"] } })</code></pre>
<h2>Verify checklist</h2>
<ul>
  <li>☐ <code>tags: "mongo"</code> matches array membership.</li>
  <li>☐ <code>$all</code> requires every listed value present.</li>
  <li>☐ <code>$elemMatch</code> matches compound conditions on array elements.</li>
</ul>
`,
    quiz: {
      q: "Which operator requires every listed value in an array field?",
      options: ["$in", "$all", "$size", "$or"],
      answer: 1
    }
  });

  L("m13", {
    path: "query", module: "mod03", title: "Text Indexes & Text Search",
    level: "Intermediate", duration: "40 min",
    objectives: ["Create text index", "Run $text search", "Combine text with other filters"],
    content: `
<p>Text indexes support language-aware search on string fields. One text index per collection (compound text index allowed).</p>
<h2>Setup</h2>
<pre><code>use forge_lab
db.blog.drop()
db.blog.insertMany([
  { title: "Learning MongoDB aggregation", body: "Pipeline stages include match and group", lang: "en" },
  { title: "SQL joins explained", body: "Inner join vs left join in relational databases", lang: "en" },
  { title: "MongoDB indexing tips", body: "Create indexes to speed up queries and sorting", lang: "en" },
  { title: "Recetas de cocina", body: "Sopa y ensalada", lang: "es" }
])</code></pre>
<h2>Create text index</h2>
<pre><code>db.blog.createIndex({ title: "text", body: "text" })</code></pre>
<p><strong>Expected:</strong> <code>title_text_body_text</code> or similar index name.</p>
<pre><code>db.blog.getIndexes()</code></pre>
<h2>$text search</h2>
<pre><code>db.blog.find({ $text: { $search: "MongoDB indexing" } })</code></pre>
<p><strong>Expected:</strong> docs mentioning MongoDB and/or indexing (stemmed).</p>
<h2>Score metadata</h2>
<pre><code>db.blog.find(
  { $text: { $search: "join relational" } },
  { score: { $meta: "textScore" }, title: 1 }
).sort({ score: { $meta: "textScore" } })</code></pre>
<h2>Phrase search</h2>
<pre><code>db.blog.find({ $text: { $search: "\\"inner join\\"" } })</code></pre>
<h2>Exclude terms</h2>
<pre><code>db.blog.find({ $text: { $search: "MongoDB -aggregation" } })</code></pre>
<h2>Combine with filter</h2>
<pre><code>db.blog.find({
  lang: "en",
  $text: { $search: "query" }
})</code></pre>
<div class="callout"><strong>Note:</strong> Case-insensitive for single terms; language stemming depends on index default (english).</div>
<h2>Verify checklist</h2>
<ul>
  <li>☐ Text index created on title and body.</li>
  <li>☐ <code>$text</code> search returns relevant documents.</li>
  <li>☐ <code>textScore</code> sort ranks matches.</li>
</ul>
`,
    quiz: {
      q: "How many text indexes per collection (typical rule)?",
      options: ["Unlimited", "One compound text index", "Three", "None allowed"],
      answer: 1
    }
  });

  /* ========== AGGREGATION ========== */
  L("m14", {
    path: "aggregation", module: "mod04", title: "Aggregation Pipeline — $match, $project, $group, $sort",
    level: "Intermediate", duration: "45 min",
    objectives: ["Build basic pipelines", "Filter with $match", "Aggregate with $group", "Shape output with $project"],
    content: `
<p>The aggregation framework processes documents through a <strong>pipeline</strong> of stages. Each stage transforms the stream.</p>
<h2>Setup</h2>
<pre><code>use forge_lab
db.sales.drop()
db.sales.insertMany([
  { item: "mouse", category: "electronics", price: 25, qty: 4, region: "US", date: new Date("2024-01-10") },
  { item: "keyboard", category: "electronics", price: 60, qty: 2, region: "US", date: new Date("2024-01-11") },
  { item: "lamp", category: "furniture", price: 35, qty: 3, region: "EU", date: new Date("2024-01-12") },
  { item: "chair", category: "furniture", price: 120, qty: 1, region: "EU", date: new Date("2024-01-13") },
  { item: "mouse", category: "electronics", price: 25, qty: 5, region: "EU", date: new Date("2024-01-14") }
])</code></pre>
<h2>Simple $match</h2>
<pre><code>db.sales.aggregate([
  { $match: { category: "electronics" } }
])</code></pre>
<h2>$project — computed fields</h2>
<pre><code>db.sales.aggregate([
  { $match: { region: "US" } },
  { $project: { item: 1, revenue: { $multiply: ["$price", "$qty"] }, _id: 0 } }
])</code></pre>
<p><strong>Expected:</strong> US rows with <code>revenue</code> = price × qty.</p>
<h2>$group — totals by category</h2>
<pre><code>db.sales.aggregate([
  {
    $group: {
      _id: "$category",
      totalQty: { $sum: "$qty" },
      totalRevenue: { $sum: { $multiply: ["$price", "$qty"] } },
      avgPrice: { $avg: "$price" }
    }
  }
])</code></pre>
<p><strong>Expected:</strong> two groups: electronics and furniture with sums.</p>
<h2>$sort</h2>
<pre><code>db.sales.aggregate([
  { $group: { _id: "$region", revenue: { $sum: { $multiply: ["$price", "$qty"] } } } },
  { $sort: { revenue: -1 } }
])</code></pre>
<h2>Full pipeline example</h2>
<pre><code>db.sales.aggregate([
  { $match: { qty: { $gte: 2 } } },
  { $project: { item: 1, region: 1, lineTotal: { $multiply: ["$price", "$qty"] } } },
  { $group: { _id: "$item", units: { $sum: "$qty" }, revenue: { $sum: "$lineTotal" } } },
  { $sort: { revenue: -1 } },
  { $limit: 3 }
])</code></pre>
<h2>Verify checklist</h2>
<ul>
  <li>☐ <code>$match</code> filters before grouping (efficient pattern).</li>
  <li>☐ <code>$group</code> requires <code>_id</code> (group key).</li>
  <li>☐ <code>$sum</code> / <code>$avg</code> aggregate numeric fields.</li>
  <li>☐ Pipeline order matters.</li>
</ul>
`,
    quiz: {
      q: "In $group, _id field represents:",
      options: ["Document id", "Group key", "Index name", "Sort order"],
      answer: 1
    }
  });

  L("m15", {
    path: "aggregation", module: "mod04", title: "$lookup, $unwind & $addFields",
    level: "Advanced", duration: "45 min",
    objectives: ["Join collections with $lookup", "Flatten arrays with $unwind", "Add computed fields mid-pipeline"],
    content: `
<h2>Setup — normalized collections</h2>
<pre><code>use forge_lab
db.customers.drop()
db.orders_agg.drop()
db.customers.insertMany([
  { _id: 1, name: "Alice", tier: "gold" },
  { _id: 2, name: "Bob", tier: "silver" }
])
db.orders_agg.insertMany([
  { orderId: 101, customerId: 1, amount: 50, items: ["mouse", "cable"] },
  { orderId: 102, customerId: 1, amount: 120, items: ["keyboard"] },
  { orderId: 103, customerId: 2, amount: 75, items: ["lamp", "bulb"] }
])</code></pre>
<h2>$lookup — left outer join</h2>
<pre><code>db.orders_agg.aggregate([
  {
    $lookup: {
      from: "customers",
      localField: "customerId",
      foreignField: "_id",
      as: "customer"
    }
  },
  { $project: { orderId: 1, amount: 1, customerName: { $arrayElemAt: ["$customer.name", 0] } } }
])</code></pre>
<p><strong>Expected:</strong> each order with customer name joined.</p>
<h2>$unwind — expand array</h2>
<pre><code>db.orders_agg.aggregate([
  { $unwind: "$items" },
  { $group: { _id: "$items", count: { $sum: 1 } } },
  { $sort: { count: -1 } }
])</code></pre>
<p><strong>Expected:</strong> per-item counts across orders.</p>
<h2>$unwind preserveNullAndEmptyArrays</h2>
<pre><code>db.orders_agg.aggregate([
  { $unwind: { path: "$items", preserveNullAndEmptyArrays: true } }
])</code></pre>
<h2>$addFields</h2>
<pre><code>db.orders_agg.aggregate([
  { $addFields: { amountWithTax: { $multiply: ["$amount", 1.1] } } },
  { $project: { orderId: 1, amount: 1, amountWithTax: 1 } }
])</code></pre>
<h2>Combined pipeline</h2>
<pre><code>db.orders_agg.aggregate([
  { $lookup: { from: "customers", localField: "customerId", foreignField: "_id", as: "cust" } },
  { $addFields: { tier: { $arrayElemAt: ["$cust.tier", 0] } } },
  { $group: { _id: "$tier", total: { $sum: "$amount" }, orders: { $sum: 1 } } }
])</code></pre>
<h2>Verify checklist</h2>
<ul>
  <li>☐ <code>$lookup</code> joined orders to customers.</li>
  <li>☐ <code>$unwind</code> produced one doc per array element.</li>
  <li>☐ <code>$addFields</code> added computed tax field.</li>
</ul>
`,
    quiz: {
      q: "$lookup performs a:",
      options: ["Delete", "Left outer join", "Full backup", "Text search"],
      answer: 1
    }
  });

  L("m16", {
    path: "aggregation", module: "mod04", title: "Aggregation Practice Patterns",
    level: "Advanced", duration: "50 min",
    objectives: ["Bucket by date", "Top-N per group", "Running patterns for analytics"],
    content: `
<h2>Pattern 1 — Revenue by month</h2>
<pre><code>use forge_lab
db.sales.aggregate([
  {
    $group: {
      _id: { year: { $year: "$date" }, month: { $month: "$date" } },
      revenue: { $sum: { $multiply: ["$price", "$qty"] } }
    }
  },
  { $sort: { "_id.year": 1, "_id.month": 1 } }
])</code></pre>
<h2>Pattern 2 — Top item per region ($sort + $group trick)</h2>
<pre><code>db.sales.aggregate([
  {
    $group: {
      _id: "$region",
      topSale: {
        $top: {
          output: { item: "$item", revenue: { $multiply: ["$price", "$qty"] } },
          sortBy: { revenue: -1 }
        }
      }
    }
  }
])</code></pre>
<p>(MongoDB 5.2+ <code>$top</code>; older versions use <code>$sort</code> then <code>$group</code> with <code>$first</code>.)</p>
<h2>Pattern 3 — $setWindowFields (moving average, 5.0+)</h2>
<pre><code>db.sales.aggregate([
  { $sort: { date: 1 } },
  {
    $setWindowFields: {
      sortBy: { date: 1 },
      output: {
        runningRevenue: {
          $sum: { $multiply: ["$price", "$qty"] },
          window: { documents: ["unbounded", "current"] }
        }
      }
    }
  },
  { $project: { item: 1, date: 1, runningRevenue: 1 } }
])</code></pre>
<h2>Pattern 4 — Facet — multiple reports in one query</h2>
<pre><code>db.sales.aggregate([
  {
    $facet: {
      byCategory: [
        { $group: { _id: "$category", total: { $sum: "$qty" } } }
      ],
      byRegion: [
        { $group: { _id: "$region", total: { $sum: { $multiply: ["$price", "$qty"] } } } }
      ],
      topItems: [
        { $group: { _id: "$item", qty: { $sum: "$qty" } } },
        { $sort: { qty: -1 } },
        { $limit: 3 }
      ]
    }
  }
])</code></pre>
<h2>Pattern 5 — $bucket</h2>
<pre><code>db.sales.aggregate([
  {
    $bucket: {
      groupBy: "$price",
      boundaries: [0, 30, 60, 100, 200],
      default: "200+",
      output: { count: { $sum: 1 }, items: { $push: "$item" } }
    }
  }
])</code></pre>
<h2>Verify checklist</h2>
<ul>
  <li>☐ Monthly revenue grouped by year/month.</li>
  <li>☐ <code>$facet</code> returned multiple sub-pipelines in one result.</li>
  <li>☐ <code>$bucket</code> grouped prices into ranges.</li>
</ul>
`,
    quiz: {
      q: "$facet allows:",
      options: ["One sub-pipeline only", "Multiple parallel sub-pipelines", "Deleting collections", "Creating indexes"],
      answer: 1
    }
  });

  /* ========== DESIGN & OPS ========== */
  L("m17", {
    path: "design", module: "mod05", title: "Data Modeling — Embed vs Reference",
    level: "Advanced", duration: "40 min",
    objectives: ["Choose embedding vs referencing", "Model one-to-many relationships", "Avoid unbounded arrays"],
    content: `
<p>Schema design in MongoDB is a trade-off between <strong>read locality</strong> (embed) and <strong>write isolation</strong> (reference).</p>
<h2>Embed — when reads are together</h2>
<pre><code>use forge_lab
db.users_embed.drop()
db.users_embed.insertOne({
  _id: 1,
  name: "Alice",
  addresses: [
    { type: "home", city: "Austin", zip: "78701" },
    { type: "work", city: "Dallas", zip: "75201" }
  ]
})
db.users_embed.findOne({ _id: 1 })</code></pre>
<p><strong>Good for:</strong> few sub-documents, read together, rarely queried independently.</p>
<h2>Reference — when entities grow separately</h2>
<pre><code>db.authors.drop()
db.books_ref.drop()
db.authors.insertOne({ _id: 10, name: "Jane Doe" })
db.books_ref.insertMany([
  { title: "Mongo Patterns", authorId: 10, year: 2023 },
  { title: "Scale Out", authorId: 10, year: 2024 }
])</code></pre>
<h2>Resolve reference with $lookup</h2>
<pre><code>db.books_ref.aggregate([
  { $lookup: { from: "authors", localField: "authorId", foreignField: "_id", as: "author" } },
  { $project: { title: 1, author: { $arrayElemAt: ["$author.name", 0] } } }
])</code></pre>
<h2>Hybrid — bounded embed + reference</h2>
<pre><code>db.orders_model.drop()
db.orders_model.insertOne({
  orderId: 500,
  customerId: 1,
  lines: [
    { sku: "A1", qty: 2, price: 25 },
    { sku: "B2", qty: 1, price: 60 }
  ],
  status: "open"
})</code></pre>
<h2>Anti-patterns to avoid</h2>
<ul>
  <li><strong>Massive arrays</strong> — comments with millions of entries; use separate collection.</li>
  <li><strong>Deep nesting</strong> — hard to query and update; flatten or reference.</li>
  <li><strong>Duplicate mutable data</strong> — product name copied everywhere; reference + cache strategy.</li>
</ul>
<h2>Decision checklist</h2>
<div class="table-wrap"><table>
  <thead><tr><th>Question</th><th>Embed</th><th>Reference</th></tr></thead>
  <tbody>
    <tr><td>Always read together?</td><td>Yes</td><td>No</td></tr>
    <tr><td>Sub-doc count bounded?</td><td>Yes</td><td>No</td></tr>
    <tr><td>Update sub-docs independently?</td><td>No</td><td>Yes</td></tr>
  </tbody>
</table></div>
<h2>Verify checklist</h2>
<ul>
  <li>☐ I embedded addresses under a user document.</li>
  <li>☐ I referenced authorId in books and joined with $lookup.</li>
  <li>☐ I can name one anti-pattern (unbounded array).</li>
</ul>
`,
    quiz: {
      q: "Embedding is best when:",
      options: ["Sub-documents are unbounded", "Data is always read together and bounded", "Updates are independent", "You need SQL JOINs"],
      answer: 1
    }
  });

  L("m18", {
    path: "design", module: "mod05", title: "Indexes & explain()",
    level: "Advanced", duration: "45 min",
    objectives: ["Create single and compound indexes", "Use explain for plan analysis", "Know index types"],
    content: `
<h2>Setup</h2>
<pre><code>use forge_lab
db.products_idx.drop()
db.products_idx.insertMany([
  { sku: "P1", category: "electronics", price: 25, stock: 50 },
  { sku: "P2", category: "electronics", price: 60, stock: 30 },
  { sku: "P3", category: "furniture", price: 35, stock: 20 },
  { sku: "P4", category: "furniture", price: 120, stock: 5 }
])</code></pre>
<h2>Single field index</h2>
<pre><code>db.products_idx.createIndex({ sku: 1 })
db.products_idx.getIndexes()</code></pre>
<h2>Compound index</h2>
<pre><code>db.products_idx.createIndex({ category: 1, price: -1 })</code></pre>
<h2>Unique index</h2>
<pre><code>db.products_idx.createIndex({ sku: 1 }, { unique: true })</code></pre>
<p><strong>Expected:</strong> error if duplicate sku insert attempted.</p>
<h2>explain — COLLSCAN vs IXSCAN</h2>
<pre><code>db.products_idx.find({ category: "electronics", price: { $gte: 50 } }).explain("executionStats")</code></pre>
<p>Look for <code>stage: "IXSCAN"</code> vs <code>"COLLSCAN"</code> in winning plan. Check <code>totalDocsExamined</code> vs <code>nReturned</code>.</p>
<h2>Index types overview</h2>
<ul>
  <li><strong>Single / compound</strong> — equality and sort support (ESR rule: Equality, Sort, Range).</li>
  <li><strong>Multikey</strong> — indexes on arrays.</li>
  <li><strong>Text</strong> — full-text search (m13).</li>
  <li><strong>Wildcard</strong> — <code>{ "meta.$**": 1 }</code> for dynamic fields.</li>
  <li><strong>Partial</strong> — index subset matching filter.</li>
</ul>
<h2>Drop index</h2>
<pre><code>db.products_idx.dropIndex("category_1_price_-1")</code></pre>
<h2>Verify checklist</h2>
<ul>
  <li>☐ Created single and compound indexes.</li>
  <li>☐ <code>explain("executionStats")</code> shows query plan.</li>
  <li>☐ I know COLLSCAN scans whole collection.</li>
</ul>
`,
    quiz: {
      q: "IXSCAN in explain means:",
      options: ["Collection scan", "Index scan", "Text search", "Shard scan"],
      answer: 1
    }
  });

  L("m19", {
    path: "design", module: "mod05", title: "Users, Roles & Enabling Auth",
    level: "Advanced", duration: "45 min",
    objectives: ["Enable authorization", "Create users and roles", "Test least-privilege access"],
    content: `
<p>Production MongoDB should run with <strong>authorization enabled</strong>. Users authenticate; roles grant privileges on resources.</p>
<h2>Enable auth — config</h2>
<p>Edit <code>mongod.cfg</code> (Windows or Linux):</p>
<pre><code>security:
  authorization: enabled</code></pre>
<pre><code># Linux
sudo systemctl restart mongod
# Windows (Admin PowerShell)
Restart-Service MongoDB</code></pre>
<h2>Create admin user (first time — localhost exception)</h2>
<pre><code>mongosh
use admin
db.createUser({
  user: "forgeAdmin",
  pwd: "ChangeMe_Strong!",
  roles: [ { role: "userAdminAnyDatabase", db: "admin" }, { role: "readWriteAnyDatabase", db: "admin" } ]
})</code></pre>
<p>Restart mongod after creating first user if prompted by version; reconnect with auth:</p>
<pre><code>mongosh -u forgeAdmin -p --authenticationDatabase admin</code></pre>
<h2>Application-scoped user</h2>
<pre><code>use forge_lab
db.createUser({
  user: "appReader",
  pwd: "ReaderPass!",
  roles: [ { role: "read", db: "forge_lab" } ]
})</code></pre>
<h2>Custom role — read specific collection</h2>
<pre><code>use forge_lab
db.createRole({
  role: "readOrdersOnly",
  privileges: [
    { resource: { db: "forge_lab", collection: "orders" }, actions: ["find"] }
  ],
  roles: []
})
db.createUser({
  user: "orderViewer",
  pwd: "ViewerPass!",
  roles: [ { role: "readOrdersOnly", db: "forge_lab" } ]
})</code></pre>
<h2>Test access</h2>
<pre><code>mongosh -u orderViewer -p --authenticationDatabase forge_lab
use forge_lab
db.orders.find()
db.products.find()</code></pre>
<p><strong>Expected:</strong> orders OK; products fail with unauthorized.</p>
<h2>Built-in roles (common)</h2>
<ul>
  <li><code>read</code>, <code>readWrite</code> — database level</li>
  <li><code>dbAdmin</code> — indexes, stats</li>
  <li><code>userAdmin</code> — manage users on one DB</li>
  <li><code>clusterAdmin</code> — replica set / sharding ops</li>
</ul>
<div class="callout warning"><strong>Security:</strong> Never use admin creds in app code. Rotate passwords; use secrets manager in production.</div>
<h2>Verify checklist</h2>
<ul>
  <li>☐ Authorization enabled in config.</li>
  <li>☐ Admin user created and login works.</li>
  <li>☐ Scoped user cannot read unauthorized collection.</li>
</ul>
`,
    quiz: {
      q: "To require login, enable:",
      options: ["storage.authorization", "security.authorization", "net.auth", "system.login"],
      answer: 1
    }
  });

  L("m20", {
    path: "design", module: "mod05", title: "Backup, mongodump/mongorestore & Replica Sets",
    level: "Advanced", duration: "50 min",
    objectives: ["Logical backup with mongodump", "Restore with mongorestore", "Understand replica set basics"],
    content: `
<h2>mongodump — logical backup</h2>
<pre><code>use forge_lab
db.backup_demo.drop()
db.backup_demo.insertMany([{ n: 1 }, { n: 2 }, { n: 3 }])</code></pre>
<pre><code># Shell (not mongosh) — adjust path to mongod bin
mongodump --uri="mongodb://127.0.0.1:27017" --db=forge_lab --collection=backup_demo --out=C:\\data\\backup
# Linux
mongodump --uri="mongodb://127.0.0.1:27017" --db=forge_lab --out=/tmp/mongo_backup</code></pre>
<p><strong>Expected:</strong> BSON + metadata JSON under output directory.</p>
<h2>mongorestore</h2>
<pre><code>db.backup_demo.drop()
mongorestore --uri="mongodb://127.0.0.1:27017" --db=forge_lab C:\\data\\backup\\forge_lab
# Linux
mongorestore --uri="mongodb://127.0.0.1:27017" --db=forge_lab /tmp/mongo_backup/forge_lab</code></pre>
<pre><code>mongosh
use forge_lab
db.backup_demo.countDocuments()</code></pre>
<p><strong>Expected:</strong> <code>3</code></p>
<h2>Backup whole database</h2>
<pre><code>mongodump --uri="mongodb://127.0.0.1:27017" --db=forge_lab --gzip --out=/tmp/forge_lab_gz</code></pre>
<h2>Replica set concept</h2>
<p>A <strong>replica set</strong> is a group of mongod processes maintaining the same data set for HA:</p>
<ul>
  <li><strong>Primary</strong> — receives all writes (default).</li>
  <li><strong>Secondaries</strong> — replicate oplog; can serve reads if configured.</li>
  <li><strong>Arbiter</strong> (optional) — vote only, no data.</li>
  <li><strong>Automatic failover</strong> — elect new primary if primary dies (needs majority).</li>
</ul>
<h2>Minimal local replica set (learning — 3 nodes or 1-node dev)</h2>
<pre><code># Stop standalone mongod; start with replSet name (example ports)
mongod --replSet rs0 --port 27017 --dbpath C:\\data\\rs0-0 --bind_ip 127.0.0.1</code></pre>
<pre><code>mongosh
rs.initiate({
  _id: "rs0",
  members: [ { _id: 0, host: "127.0.0.1:27017" } ]
})
rs.status()</code></pre>
<p><strong>Expected:</strong> <code>stateStr: "PRIMARY"</code> after initiation.</p>
<h2>Read preference (app concept)</h2>
<pre><code>mongodb://127.0.0.1:27017/forge_lab?replicaSet=rs0&readPreference=secondaryPreferred</code></pre>
<h2>Backup on replica set</h2>
<p>Take backups from a <strong>secondary</strong> to reduce primary load; ensure oplog capture for point-in-time needs. For production, combine mongodump schedules with filesystem snapshots or Atlas continuous backup.</p>
<h2>Verify checklist</h2>
<ul>
  <li>☐ <code>mongodump</code> created BSON files.</li>
  <li>☐ <code>mongorestore</code> recovered documents after drop.</li>
  <li>☐ I can explain primary vs secondary in a replica set.</li>
  <li>☐ I know port 27017 troubleshooting from m02.</li>
</ul>
`,
    quiz: {
      q: "In a replica set, writes go to the:",
      options: ["Arbiter only", "Primary (by default)", "Any secondary", "mongodump"],
      answer: 1
    }
  });

  /* Labs */
  const labs = [
    { id: "mlab1", title: "Install & ping MongoDB", path: "foundation", lesson: "m02", steps: "Install MongoDB on Windows or Ubuntu, start service, PATH verify, mongosh db.runCommand({ ping: 1 }) → { ok: 1 }. Troubleshoot 27017 if needed." },
    { id: "mlab2", title: "mongosh & Compass first connection", path: "foundation", lesson: "m03", steps: "Install mongosh and Compass, connect to 127.0.0.1:27017, create forge_lab.hello doc, find in Compass." },
    { id: "mlab3", title: "CRUD product catalog", path: "crud", lesson: "m05", steps: "Create products collection: insertOne + insertMany (5 SKUs), find all, countDocuments." },
    { id: "mlab4", title: "Query operators drill", path: "crud", lesson: "m06", steps: "Seed products; run $gt, $in, $and, $or queries; document expected counts." },
    { id: "mlab5", title: "Update operators workshop", path: "crud", lesson: "m07", steps: "$set price, $inc stock, $push tags, updateMany on category filter." },
    { id: "mlab6", title: "Projection & pagination", path: "query", lesson: "m10", steps: "Seed orders; sort by total, limit 3, skip 2 for page 2; project customer+total only." },
    { id: "mlab7", title: "Aggregation revenue report", path: "aggregation", lesson: "m14", steps: "Seed sales; pipeline: $match region, $group by category revenue, $sort descending." },
    { id: "mlab8", title: "$lookup customer orders", path: "aggregation", lesson: "m15", steps: "Create customers + orders; $lookup join; $unwind items; group item counts." },
    { id: "mlab9", title: "Indexes & explain", path: "design", lesson: "m18", steps: "Create compound index; run explain before/after; compare COLLSCAN vs IXSCAN." },
    { id: "mlab10", title: "Auth users & roles", path: "design", lesson: "m19", steps: "Enable auth, create admin, create read-only app user, prove write denied." },
    { id: "mlab11", title: "mongodump & mongorestore", path: "design", lesson: "m20", steps: "Dump forge_lab collection, drop it, restore, verify count." }
  ];

  const reference = {
    commands: [
      { cmd: "mongosh <uri>", use: "Connect to MongoDB" },
      { cmd: "db.runCommand({ ping: 1 })", use: "Health check" },
      { cmd: "show dbs / show collections", use: "List databases/collections" },
      { cmd: "insertOne / insertMany", use: "Create documents" },
      { cmd: "find / findOne", use: "Read documents" },
      { cmd: "updateOne / updateMany", use: "Modify with operators" },
      { cmd: "deleteOne / deleteMany", use: "Remove documents" },
      { cmd: "replaceOne (upsert)", use: "Replace or insert" },
      { cmd: "aggregate([...])", use: "Pipeline queries" },
      { cmd: "createIndex / getIndexes", use: "Index management" },
      { cmd: "explain('executionStats')", use: "Query plan analysis" },
      { cmd: "mongodump / mongorestore", use: "Logical backup/restore" },
      { cmd: "rs.initiate() / rs.status()", use: "Replica set setup" }
    ],
    operators: [
      "$eq", "$gt", "$gte", "$lt", "$lte", "$ne", "$in", "$nin",
      "$and", "$or", "$not", "$exists", "$type", "$all", "$size", "$elemMatch",
      "$set", "$inc", "$push", "$pull", "$each",
      "$match", "$project", "$group", "$sort", "$limit", "$skip",
      "$lookup", "$unwind", "$addFields", "$facet", "$bucket"
    ]
  };

  const cert = {
    intro: "Map MongoDB ASHOVIX LABS progress to MongoDB Associate Developer / Database Administrator exam themes.",
    tracks: [
      { name: "Developer foundations", topics: ["CRUD", "queries", "aggregation basics"], lessons: ["m01", "m04", "m05", "m06", "m07", "m14"] },
      { name: "Advanced developer", topics: ["arrays", "text", "$lookup", "modeling"], lessons: ["m12", "m13", "m15", "m16", "m17"] },
      { name: "Administrator", topics: ["install", "indexes", "auth", "backup", "replica sets"], lessons: ["m02", "m03", "m18", "m19", "m20"] }
    ]
  };

  window.FORGE.register({
    id: "mongo",
    order: 2,
    title: "MongoDB Complete",
    shortTitle: "MongoDB",
    tagline: "NoSQL documents — install to replica sets",
    level: "Beginner → Advanced",
    accent: "#5dde8a",
    description: "Complete MongoDB: install on Windows/Linux, mongosh & Compass, CRUD, queries, aggregation, modeling, indexes, auth, backup.",
    audience: "Developers, full-stack engineers, aspiring DBAs",
    paths,
    modules,
    lessons,
    labs,
    reference,
    cert
  });
})();
