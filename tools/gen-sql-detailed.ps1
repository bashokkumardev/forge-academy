# Generate detailed SQL Mastery course (ASCII only, no JS backtick conflicts)
$ErrorActionPreference = 'Stop'
$out = 'c:\Users\ashok\Desktop\Project\js\data\course-sql.js'

function Lesson($n, $title, $mod, $dur, $lvl, $objs, $body, $q, $opts, $a) {
  [pscustomobject]@{
    n=$n; title=$title; mod=$mod; dur=$dur; lvl=$lvl; objs=$objs; body=$body; q=$q; opts=$opts; a=$a
  }
}

$lessons = @()

$lessons += Lesson 1 'Introduction to Databases' 'sql-m01' '35 min' 'Beginner' @(
  'Define database, DBMS, and data in plain language',
  'Explain why apps use databases instead of plain files',
  'Recognize relational vs other database types'
) @'
<p>A <strong>database</strong> is an organized collection of related data. A <strong>DBMS</strong> (Database Management System) is the software that stores that data, answers questions about it, updates it safely, and controls who can access it.</p>

<h2>Why databases exist</h2>
<p>Imagine an online shop. You need customers, products, orders, payments, and inventory. Many users hit the site at once. If you stored everything in spreadsheets or text files:</p>
<ul>
  <li>Two cashiers could overwrite each other&apos;s stock numbers.</li>
  <li>Finding &quot;all unpaid orders for Pune customers last month&quot; would be painful.</li>
  <li>You could accidentally delete a product that still has open orders.</li>
</ul>
<p>A database engine solves this with <strong>structure</strong>, <strong>queries</strong>, <strong>transactions</strong>, and <strong>security</strong>.</p>

<h2>Files vs database (worked comparison)</h2>
<div class="table-wrap"><table>
<thead><tr><th>Need</th><th>Plain files</th><th>Database</th></tr></thead>
<tbody>
<tr><td>Find matching records</td><td>Write custom loops</td><td>SQL SELECT with WHERE</td></tr>
<tr><td>Many users writing</td><td>Easy corruption</td><td>Locks + transactions</td></tr>
<tr><td>Rules (email unique)</td><td>App must remember</td><td>UNIQUE / PRIMARY KEY</td></tr>
<tr><td>Relationships</td><td>Manual IDs in files</td><td>Foreign keys + joins</td></tr>
<tr><td>Backup / recovery</td><td>Copy folders carefully</td><td>Engine backup tools</td></tr>
</tbody></table></div>

<h2>Mental model example: Ashovix shop</h2>
<pre><code>Database: ashovix_shop
  Table: customers
    Row 1: id=1, name='Asha', city='Pune', email='asha@example.com'
    Row 2: id=2, name='Dev',  city='Chennai', email='dev@example.com'
  Table: orders
    Row 1: id=101, customer_id=1, total=1499.00
    Row 2: id=102, customer_id=1, total=299.00</code></pre>
<p>Notice <code>orders.customer_id</code> points to <code>customers.id</code>. That relationship is the heart of relational databases.</p>

<h2>Main database families (know the map)</h2>
<ul>
  <li><strong>Relational (RDBMS)</strong> - tables/rows/columns + SQL (PostgreSQL, MySQL, SQLite, SQL Server, Oracle, Db2).</li>
  <li><strong>Document</strong> - JSON-like documents (MongoDB).</li>
  <li><strong>Key-value</strong> - ultra-fast lookups (Redis).</li>
  <li><strong>Wide-column / graph</strong> - specialized scale or relationship models.</li>
</ul>
<p>This course focuses on <strong>relational SQL</strong> because it is the foundation for backend, data, and analytics careers.</p>

<h2>Try it (concept check)</h2>
<ol>
  <li>Write three pieces of data a hospital app must store.</li>
  <li>For each, say whether it is an entity (table) or an attribute (column).</li>
  <li>Name one rule that must never be broken (example: patient_id unique).</li>
</ol>

<div class="callout"><strong>Summary:</strong> A database is shared, structured, protected data. The DBMS is the engine that makes multi-user apps reliable.</div>
'@ 'What is the main job of a database engine?' @('Only draw charts','Store, query, update, and protect data reliably','Compile Java code','Replace operating systems') 1

# Continue with remaining lessons - file will be large; append in second write via script continuation
$script:lessons = $lessons
# Save partial and continue in same script below

$lessons += Lesson 2 'What is SQL?' 'sql-m01' '35 min' 'Beginner' @(
  'Define SQL and declarative style',
  'List DDL, DML, DQL, TCL, DCL with examples',
  'Run a first SELECT mentally and on paper'
) @'
<p><strong>SQL</strong> means <strong>Structured Query Language</strong>. It is the standard language for talking to relational databases.</p>

<h2>Declarative vs imperative</h2>
<p>In programming languages you often write <em>how</em> to loop. In SQL you write <em>what result you want</em>.</p>
<pre><code>-- Declarative SQL: "give me Pune customers"
SELECT name, email
FROM customers
WHERE city = 'Pune'
ORDER BY name;

-- You do NOT write:
-- open file
-- for each line parse CSV
-- if city == Pune then print</code></pre>

<h2>SQL statement families (with examples)</h2>
<div class="table-wrap"><table>
<thead><tr><th>Family</th><th>Purpose</th><th>Examples</th></tr></thead>
<tbody>
<tr><td><strong>DDL</strong></td><td>Define structure</td><td><code>CREATE TABLE</code>, <code>ALTER TABLE</code>, <code>DROP TABLE</code></td></tr>
<tr><td><strong>DML</strong></td><td>Change data</td><td><code>INSERT</code>, <code>UPDATE</code>, <code>DELETE</code></td></tr>
<tr><td><strong>DQL</strong></td><td>Read data</td><td><code>SELECT</code></td></tr>
<tr><td><strong>TCL</strong></td><td>Transactions</td><td><code>BEGIN</code>, <code>COMMIT</code>, <code>ROLLBACK</code></td></tr>
<tr><td><strong>DCL</strong></td><td>Permissions</td><td><code>GRANT</code>, <code>REVOKE</code></td></tr>
</tbody></table></div>

<h2>Worked mini-story</h2>
<pre><code>-- 1) DDL: create structure
CREATE TABLE products (
  id INTEGER PRIMARY KEY,
  title TEXT NOT NULL,
  price NUMERIC(10,2) NOT NULL
);

-- 2) DML: add data
INSERT INTO products (id, title, price)
VALUES (1, 'SQL Mastery Notes', 499.00);

-- 3) DQL: read data
SELECT title, price FROM products WHERE price &gt;= 400;

-- 4) TCL: wrap risky changes
BEGIN;
UPDATE products SET price = 449.00 WHERE id = 1;
COMMIT;</code></pre>

<h2>Portability tip</h2>
<p>Learn <strong>ANSI-style SQL</strong> first. Engines differ in extras (auto-increment syntax, LIMIT vs FETCH, UPSERT). Core SELECT/JOIN/WHERE skills transfer everywhere.</p>

<div class="callout"><strong>Practice:</strong> Label each statement you see this week as DDL/DML/DQL/TCL/DCL. Accuracy here makes later modules easy.</div>
'@ 'SQL is best described as:' @('A markup language like HTML','A declarative language for relational data','A CPU assembly language','A CSS framework') 1

$lessons += Lesson 3 'Database vs Spreadsheet' 'sql-m01' '30 min' 'Beginner' @(
  'Compare spreadsheets and databases honestly',
  'Choose the right tool for a scenario'
) @'
<p>Spreadsheets are excellent for personal analysis and quick charts. Databases are built for <strong>shared systems of record</strong>.</p>

<h2>Side-by-side</h2>
<div class="table-wrap"><table>
<thead><tr><th>Topic</th><th>Spreadsheet</th><th>Database</th></tr></thead>
<tbody>
<tr><td>Users</td><td>Usually one active editor</td><td>Many apps/users concurrently</td></tr>
<tr><td>Structure</td><td>Free-form cells</td><td>Typed columns + constraints</td></tr>
<tr><td>Relationships</td><td>VLOOKUP / manual</td><td>Keys + joins</td></tr>
<tr><td>Scale</td><td>Tens of thousands of rows get painful</td><td>Millions with indexes</td></tr>
<tr><td>Audit</td><td>Hard to prove who changed what</td><td>Transactions, logs, roles</td></tr>
</tbody></table></div>

<h2>Same question, two tools</h2>
<pre><code>-- Business question: customers in Pune
-- Spreadsheet: filter City column = Pune (manual, not reusable by API)
-- Database:
SELECT id, name, email
FROM customers
WHERE city = 'Pune'
ORDER BY name;</code></pre>

<h2>When spreadsheet is fine</h2>
<ul>
  <li>One analyst exploring a CSV export.</li>
  <li>Budget planning with lots of ad-hoc formulas.</li>
  <li>Short-lived lists that never become an application backend.</li>
</ul>

<h2>When you need a database</h2>
<ul>
  <li>Web/mobile apps reading and writing the same data.</li>
  <li>Rules like &quot;order must reference a real customer&quot;.</li>
  <li>Reporting that must stay correct as data grows.</li>
</ul>

<div class="callout"><strong>Rule:</strong> If multiple programs must trust the same data, store it in a database.</div>
'@ 'Databases beat spreadsheets mainly when you need:' @('Fancier fonts','Multi-user integrity, scale, and relationships','More colors','Offline drawing tools') 1

$lessons += Lesson 4 'What is RDBMS?' 'sql-m01' '35 min' 'Beginner' @(
  'Define RDBMS and the relational model',
  'Name popular engines and their roles',
  'Explain tables, keys, and relationships'
) @'
<p>An <strong>RDBMS</strong> (Relational Database Management System) stores data as <strong>relations</strong> (tables) and provides SQL, transactions, recovery, and security.</p>

<h2>Relational model in one picture</h2>
<pre><code>customers                 orders
---------                 ------
id (PK) &lt;--------------- customer_id (FK)
name                      id (PK)
city                      total
email                     ordered_at</code></pre>
<p><strong>PK</strong> = primary key (unique identity). <strong>FK</strong> = foreign key (reference to another table).</p>

<h2>Popular engines (what you will meet)</h2>
<div class="table-wrap"><table>
<thead><tr><th>Engine</th><th>Style</th><th>Great for</th></tr></thead>
<tbody>
<tr><td>SQLite</td><td>Embedded file</td><td>Learning, mobile, local apps</td></tr>
<tr><td>PostgreSQL</td><td>Open-source server</td><td>Apps, analytics, advanced SQL</td></tr>
<tr><td>MySQL / MariaDB</td><td>Open-source server</td><td>Web applications</td></tr>
<tr><td>SQL Server / Oracle / Db2</td><td>Enterprise</td><td>Large company systems</td></tr>
</tbody></table></div>

<h2>Example query across related tables</h2>
<pre><code>SELECT c.name, o.id AS order_id, o.total
FROM customers c
JOIN orders o ON o.customer_id = c.id
WHERE c.city = 'Pune';</code></pre>

<h2>What the RDBMS guarantees (high level)</h2>
<ul>
  <li>Data is stored in typed structures.</li>
  <li>Constraints reject bad writes.</li>
  <li>Transactions can commit or roll back as a unit.</li>
  <li>Multiple clients can connect with permissions.</li>
</ul>

<div class="callout"><strong>Remember:</strong> SQL is the language; RDBMS is the engine that runs it.</div>
'@ 'RDBMS stands for:' @('Random Data Binary Memory Store','Relational Database Management System','Remote Desktop Backup Main Server','Rapid Document Blob Media System') 1

Write-Output "Lessons so far: $($lessons.Count)"
# Persist lessons array by continuing to build in this same process file - rewrite whole generator as complete file instead
