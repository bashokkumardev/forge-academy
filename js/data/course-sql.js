/* Ashovix Labs - SQL Mastery (39 topics + Final Assessment) */
(function () {
  const lessons = {};
  function L(id, d) { lessons[id] = { id, ...d }; }

  L("sql01", {
    module: "sql-m01",
    title: "01 Introduction to Databases",
    level: "Beginner",
    duration: "30 min",
    objectives: [
      "Define what a database is and why it exists",
      "Contrast flat files with database engines",
      "List common database types and when to use each",
      "Describe a simple mental model of database, table, and row"
    ],
    content: `
<p>A <strong>database</strong> is an organized collection of data that a computer program (the database engine) can store, find, update, and protect efficiently. Almost every modern app - banking, shopping, social media, school portals - relies on one.</p>
<p><strong>Why this matters:</strong> Without a database, apps would dump data into loose files. That works for a shopping list on one laptop; it fails when thousands of users read and write at the same time and must never see half-updated money transfers.</p>

<h2>What a database engine actually does</h2>
<ul>
<li><strong>Store</strong> - persist data on disk so it survives restarts.</li>
<li><strong>Query</strong> - find matching rows quickly with a language like SQL.</li>
<li><strong>Update</strong> - change data safely under concurrency.</li>
<li><strong>Protect</strong> - enforce types, keys, permissions, and recovery after crashes.</li>
</ul>

<h2>Files vs databases</h2>
<div class="table-wrap"><table>
<thead><tr><th>Files / folders</th><th>Database</th></tr></thead>
<tbody>
<tr><td>Hard to query across many files</td><td>Powerful query language (SQL)</td></tr>
<tr><td>Easy to corrupt with concurrent writes</td><td>Transactions and locking</td></tr>
<tr><td>Weak consistency rules</td><td>Constraints, keys, data types</td></tr>
<tr><td>Security is ad-hoc</td><td>Users, roles, privileges</td></tr>
<tr><td>Backup means copy folders carefully</td><td>Built-in backup and restore tools</td></tr>
</tbody></table></div>

<h2>Common database types</h2>
<ul>
<li><strong>Relational (RDBMS)</strong> - tables with rows and columns (PostgreSQL, MySQL, SQL Server, Oracle, SQLite). This course focuses here.</li>
<li><strong>Document</strong> - JSON-like documents (MongoDB).</li>
<li><strong>Key-value</strong> - fast lookups by key (Redis).</li>
<li><strong>Wide-column / graph</strong> - specialized models for massive scale or relationship-heavy graphs.</li>
</ul>

<h2>Worked examples (mental model in SQL shape)</h2>
<pre><code>-- Think of a shop database as nested containers
-- Database: ashovix_shop
--   Table: customers
--     Row: id=1, name='Asha', city='Pune'
--     Row: id=2, name='Dev',  city='Chennai'

SELECT id, name, city
FROM customers
ORDER BY id;</code></pre>
<pre><code>-- Even a tiny query shows why engines beat files:
-- "Show customers in Pune" is one statement, not a custom script.
SELECT name, email
FROM customers
WHERE city = 'Pune';</code></pre>
<pre><code>-- Counting is also a first-class operation
SELECT city, COUNT(*) AS customer_count
FROM customers
GROUP BY city;</code></pre>

<h2>Try it</h2>
<ol>
<li>Write (on paper or in notes) three apps you use that must store shared data.</li>
<li>For each, list one risk if two users edited a plain CSV at the same time.</li>
<li>Sketch a tiny database with one table <code>students</code> and two example rows.</li>
<li>Explain in one sentence why a bank cannot rely on spreadsheets alone.</li>
</ol>

<h2>Common mistakes</h2>
<ul>
<li>Thinking a database is "just Excel on a server" - engines add concurrency, integrity, and recovery.</li>
<li>Confusing the <em>database</em> (data store) with the <em>database engine</em> (software managing it).</li>
<li>Assuming every problem needs a relational DB - document or key-value stores fit some cases better.</li>
</ul>

<div class="callout"><strong>Summary:</strong> Databases exist so many users and apps can share correct data safely - not just store bytes on disk. This course teaches relational databases and SQL.</div>
`,
    quiz: {
      q: "What is the main job of a database engine?",
      options: [
        "Only draw charts",
        "Store, query, update, and protect data reliably",
        "Compile Java code",
        "Replace operating systems"
      ],
      answer: 1
    }
  });

  L("sql02", {
    module: "sql-m01",
    title: "02 What is SQL?",
    level: "Beginner",
    duration: "30 min",
    objectives: [
      "Define SQL and its role with relational databases",
      "Explain why SQL is declarative",
      "Name the major statement families (DDL, DML, DQL, TCL, DCL)",
      "Write a trivial SELECT and understand portability"
    ],
    content: `
<p><strong>SQL</strong> (Structured Query Language) is the standard language for working with relational databases. You describe <em>what</em> result you want; the engine decides <em>how</em> to fetch it.</p>
<p><strong>Why learn SQL?</strong> It is the shared skill across PostgreSQL, MySQL, SQLite, SQL Server, and Oracle. Job interviews, analytics, and backend work all expect it.</p>

<h2>SQL is declarative</h2>
<p>In a programming loop you say <em>how</em> to walk rows. In SQL you say the filter and columns; the planner chooses indexes and join order.</p>

<h2>Statement families (preview)</h2>
<ul>
<li><strong>DDL</strong> - define structure: <code>CREATE</code>, <code>ALTER</code>, <code>DROP</code></li>
<li><strong>DML</strong> - change rows: <code>INSERT</code>, <code>UPDATE</code>, <code>DELETE</code></li>
<li><strong>DQL</strong> - read data: <code>SELECT</code></li>
<li><strong>TCL</strong> - transactions: <code>COMMIT</code>, <code>ROLLBACK</code>, <code>SAVEPOINT</code></li>
<li><strong>DCL</strong> - permissions: <code>GRANT</code>, <code>REVOKE</code></li>
</ul>

<h2>Worked examples</h2>
<pre><code>-- Hello SQL: compute a constant row (works in most engines)
SELECT 'Ashovix Labs' AS academy, 2026 AS year;</code></pre>
<pre><code>-- Declarative read: WHAT you want, not a file loop
SELECT name, email
FROM customers
WHERE city = 'Pune';</code></pre>
<pre><code>-- Same idea with sorting and a limit pattern
SELECT name, city
FROM customers
WHERE city IS NOT NULL
ORDER BY name;</code></pre>

<h2>Portability tip</h2>
<p>Learn <strong>ANSI SQL</strong> first. Dialects differ at the edges (string concat, dates, <code>LIMIT</code> vs <code>TOP</code>, identity columns). Core <code>SELECT</code>/<code>JOIN</code>/<code>GROUP BY</code> ideas transfer.</p>

<h2>Try it</h2>
<ol>
<li>Rewrite this English request as SQL: "List product names priced under 500."</li>
<li>Label each of these as DDL/DML/DQL/TCL/DCL: <code>CREATE TABLE</code>, <code>INSERT</code>, <code>SELECT</code>, <code>COMMIT</code>, <code>GRANT</code>.</li>
<li>Explain in one line why SQL is called declarative.</li>
<li>Run (or write) a constant <code>SELECT</code> that returns your name and today's year.</li>
</ol>

<h2>Common mistakes</h2>
<ul>
<li>Thinking SQL is a full general-purpose language like Python - it is data-focused.</li>
<li>Memorizing one GUI wizard instead of reading/writing statements.</li>
<li>Assuming every vendor keyword works everywhere without checking docs.</li>
</ul>

<div class="callout"><strong>Summary:</strong> SQL lets you declare the data you need. Master the five statement families and prefer portable ANSI patterns first.</div>
`,
    quiz: {
      q: "SQL is best described as:",
      options: [
        "A markup language like HTML",
        "A declarative language for relational data",
        "A CPU assembly language",
        "A CSS framework"
      ],
      answer: 1
    }
  });

  L("sql03", {
    module: "sql-m01",
    title: "03 Database vs Spreadsheet",
    level: "Beginner",
    duration: "25 min",
    objectives: [
      "Compare spreadsheets and databases fairly",
      "Know when a spreadsheet is enough",
      "Know when you must move to a database",
      "Translate a sheet filter into a WHERE clause"
    ],
    content: `
<p>Spreadsheets (Excel/Google Sheets) are excellent for personal analysis and quick charts. Databases are built for shared, large, concurrent, structured work with strict rules.</p>
<p><strong>Why compare?</strong> Beginners often start in Sheets, then wonder when to "graduate." The answer is about concurrency, integrity, and scale - not about which UI looks nicer.</p>

<h2>Side-by-side</h2>
<div class="table-wrap"><table>
<thead><tr><th>Spreadsheets</th><th>Databases</th></tr></thead>
<tbody>
<tr><td>One user edits easily</td><td>Many users and apps at once</td></tr>
<tr><td>Formulas live in cells</td><td>SQL queries and server-side constraints</td></tr>
<tr><td>Weak typing / mixed cells</td><td>Strict data types per column</td></tr>
<tr><td>Struggles at very large row counts</td><td>Handles millions+ with indexes</td></tr>
<tr><td>Hard to enforce relationships</td><td>Foreign keys and joins</td></tr>
<tr><td>Access control is coarse</td><td>Roles and privileges per object</td></tr>
</tbody></table></div>

<h2>Worked examples</h2>
<pre><code>-- Spreadsheet: filter column City = Pune manually
-- Database: reusable, auditable query
SELECT id, name, email
FROM customers
WHERE city = 'Pune';</code></pre>
<pre><code>-- Spreadsheet: SUMIF on Amount where Status = Paid
-- Database:
SELECT SUM(amount) AS paid_total
FROM invoices
WHERE status = 'Paid';</code></pre>
<pre><code>-- Spreadsheet: VLOOKUP customer name onto orders sheet
-- Database: join on key
SELECT o.id, c.name, o.total
FROM orders o
JOIN customers c ON c.id = o.customer_id;</code></pre>

<h2>Try it</h2>
<ol>
<li>List two tasks you would keep in a spreadsheet this week.</li>
<li>List two tasks that should be a database (multi-user, money, inventory).</li>
<li>Convert this sheet filter to SQL: Status = Open AND Priority = High.</li>
<li>Explain why two people editing the same shared CSV is risky.</li>
</ol>

<h2>Common mistakes</h2>
<ul>
<li>Using a spreadsheet as the system of record for orders or payroll.</li>
<li>Assuming "we only have 5,000 rows" forever - growth and concurrency sneak up.</li>
<li>Duplicating the same customer name across sheets with no single source of truth.</li>
</ul>

<div class="callout"><strong>Summary:</strong> Use spreadsheets for analysis and drafts. Use a database when multiple systems must share correct, related data at scale.</div>
`,
    quiz: {
      q: "Databases beat spreadsheets mainly when you need:",
      options: [
        "Fancier fonts",
        "Multi-user integrity, scale, and relationships",
        "More colors",
        "Offline drawing tools"
      ],
      answer: 1
    }
  });

  L("sql04", {
    module: "sql-m01",
    title: "04 What is RDBMS?",
    level: "Beginner",
    duration: "30 min",
    objectives: [
      "Define RDBMS and the relational model",
      "Name popular relational engines",
      "Explain tables, keys, and relationships at a high level",
      "Read a simple two-table JOIN"
    ],
    content: `
<p>An <strong>RDBMS</strong> (Relational Database Management System) stores data in <strong>relations</strong> (tables) and manages access, recovery, concurrency, and security. SQL is the usual language you speak to an RDBMS.</p>
<p><strong>Why it matters:</strong> "Relational" is not marketing fluff - it means data is organized so relationships between entities (customers and orders) are explicit and enforceable.</p>

<h2>Popular engines</h2>
<ul>
<li><strong>PostgreSQL</strong> - open source, advanced SQL, great for learning and production.</li>
<li><strong>MySQL / MariaDB</strong> - very common in web apps.</li>
<li><strong>SQLite</strong> - embedded file database (mobile, desktop, tests).</li>
<li><strong>SQL Server, Oracle, IBM Db2</strong> - enterprise platforms.</li>
</ul>

<h2>Core ideas</h2>
<ul>
<li><strong>Table</strong> - a relation with a fixed set of columns.</li>
<li><strong>Row</strong> - one record (tuple).</li>
<li><strong>Primary key</strong> - uniquely identifies a row.</li>
<li><strong>Foreign key</strong> - points to a primary key in another table.</li>
</ul>

<h2>Worked examples</h2>
<pre><code>-- Two related tables (conceptual schema)
-- customers (id, name)
-- orders    (id, customer_id, total)

CREATE TABLE customers (
  id   INT PRIMARY KEY,
  name VARCHAR(100) NOT NULL
);

CREATE TABLE orders (
  id          INT PRIMARY KEY,
  customer_id INT NOT NULL,
  total       DECIMAL(10,2) NOT NULL,
  FOREIGN KEY (customer_id) REFERENCES customers(id)
);</code></pre>
<pre><code>-- Relate rows with a JOIN
SELECT c.name, o.total
FROM customers c
JOIN orders o ON o.customer_id = c.id;</code></pre>
<pre><code>-- Engine services beyond "storage"
-- concurrency, constraints, recovery, users
SELECT current_user;  -- who am I? (syntax varies by engine)</code></pre>

<h2>Try it</h2>
<ol>
<li>Name three RDBMS products from memory.</li>
<li>Draw customers and orders boxes and the line for <code>customer_id</code>.</li>
<li>Write a SELECT that lists customer names with order totals (use the JOIN above).</li>
<li>Explain one job the "management system" does besides storing bytes.</li>
</ol>

<h2>Common mistakes</h2>
<ul>
<li>Confusing RDBMS (the product) with SQL (the language).</li>
<li>Storing the same entity in many unrelated tables with no keys.</li>
<li>Thinking SQLite is "not a real database" - it is a real RDBMS, just embedded.</li>
</ul>

<div class="callout"><strong>Summary:</strong> An RDBMS manages relational tables with keys, SQL, concurrency, and recovery. Learn one engine deeply; the model transfers.</div>
`,
    quiz: {
      q: "RDBMS stands for:",
      options: [
        "Random Data Binary Memory Store",
        "Relational Database Management System",
        "Remote Desktop Backup Main Server",
        "Rapid Document Blob Media System"
      ],
      answer: 1
    }
  });

  L("sql05", {
    module: "sql-m02",
    title: "05 Install PostgreSQL",
    level: "Beginner",
    duration: "45 min",
    objectives: [
      "Install PostgreSQL on Windows or Linux",
      "Connect with psql or pgAdmin",
      "Run SELECT version() and confirm the service",
      "Know the default port 5432"
    ],
    content: `
<p><strong>PostgreSQL</strong> is a powerful open-source RDBMS - excellent for learning professional SQL and for production systems. This lesson gets a local server running.</p>
<p><strong>Why PostgreSQL first?</strong> Strong standards compliance, free tooling, and skills that transfer to other engines.</p>

<h2>Windows install (overview)</h2>
<ol>
<li>Download the installer from <code>postgresql.org</code>.</li>
<li>Set a strong password for the <code>postgres</code> superuser.</li>
<li>Keep default port <code>5432</code> unless you know you need another.</li>
<li>Optionally install Command Line Tools and pgAdmin.</li>
<li>Open <strong>SQL Shell (psql)</strong> or pgAdmin and connect.</li>
</ol>

<h2>Linux (Debian/Ubuntu)</h2>
<pre><code>sudo apt update
sudo apt install postgresql postgresql-contrib
sudo systemctl status postgresql
sudo -u postgres psql</code></pre>

<h2>Worked examples</h2>
<pre><code>-- Inside psql: confirm the server
SELECT version();</code></pre>
<pre><code>-- Show connection info (psql meta-command)
-- \\conninfo

-- List databases (psql)
-- \\l

-- Create a practice database
CREATE DATABASE ashovix_lab;</code></pre>
<pre><code>-- Connect to it (psql): \\c ashovix_lab
SELECT current_database() AS db, current_user AS who;</code></pre>

<h2>Try it</h2>
<ol>
<li>Install PostgreSQL and note the port (default 5432).</li>
<li>Connect as <code>postgres</code> (or your admin user) and run <code>SELECT version();</code>.</li>
<li>Create database <code>ashovix_lab</code> and reconnect to it.</li>
<li>Write down your password storage plan (password manager - never commit it to git).</li>
</ol>

<h2>Common mistakes</h2>
<ul>
<li>Forgetting the superuser password set during install.</li>
<li>Firewall or another app already using port 5432.</li>
<li>Editing <code>pg_hba.conf</code> carelessly and locking yourself out.</li>
<li>Assuming the service is running when Windows Services shows Stopped.</li>
</ul>

<div class="callout"><strong>Summary:</strong> Install PostgreSQL, verify with <code>SELECT version()</code>, and create a practice database. Port 5432 is the usual local endpoint.</div>
`,
    quiz: {
      q: "What is PostgreSQL's default port?",
      options: ["3306", "5432", "1521", "27017"],
      answer: 1
    }
  });

  L("sql06", {
    module: "sql-m02",
    title: "06 Install SQLite",
    level: "Beginner",
    duration: "35 min",
    objectives: [
      "Explain what SQLite is and when to use it",
      "Install or use the sqlite3 CLI",
      "Create a .db file and run CREATE/INSERT/SELECT",
      "Contrast SQLite with client-server engines"
    ],
    content: `
<p><strong>SQLite</strong> is an embedded relational database: your app links a library and the whole database lives in one file (often <code>.db</code>). There is no separate server process to administer for basic use.</p>
<p><strong>Why learn it?</strong> Ideal for local tools, mobile apps, tests, and learning SQL without installing a heavy server. Syntax is still real SQL.</p>

<h2>Install / get the CLI</h2>
<ul>
<li><strong>Windows:</strong> download precompiled binaries from <code>sqlite.org</code>, unzip, add folder to PATH.</li>
<li><strong>Linux:</strong> <code>sudo apt install sqlite3</code> (package name may vary).</li>
<li><strong>macOS:</strong> often preinstalled as <code>sqlite3</code>.</li>
</ul>

<h2>Worked examples</h2>
<pre><code>-- Shell: create/open a file database
-- sqlite3 ashovix.db

CREATE TABLE customers (
  id    INTEGER PRIMARY KEY,
  name  TEXT NOT NULL,
  city  TEXT
);

INSERT INTO customers (name, city) VALUES ('Asha', 'Pune');
INSERT INTO customers (name, city) VALUES ('Dev', 'Chennai');

SELECT id, name, city FROM customers;</code></pre>
<pre><code>-- Useful sqlite3 meta-commands (CLI, not SQL)
-- .tables
-- .schema customers
-- .mode column
-- .headers on
-- .quit</code></pre>
<pre><code>-- File-based backup is often a file copy when no writers are active
-- Or use the CLI:
-- .backup ashovix_copy.db</code></pre>

<h2>SQLite vs PostgreSQL/MySQL</h2>
<div class="table-wrap"><table>
<thead><tr><th>SQLite</th><th>Client-server RDBMS</th></tr></thead>
<tbody>
<tr><td>One file, embedded</td><td>Network server process</td></tr>
<tr><td>Great for local/single-writer patterns</td><td>Many concurrent clients</td></tr>
<tr><td>Types are flexible/affinity-based</td><td>Stricter typed columns typically</td></tr>
<tr><td>Zero admin for starters</td><td>Users, roles, replication options</td></tr>
</tbody></table></div>

<h2>Try it</h2>
<ol>
<li>Create <code>ashovix.db</code> and a <code>customers</code> table.</li>
<li>Insert three rows and <code>SELECT</code> them.</li>
<li>Run <code>.schema customers</code> in the CLI and read the output.</li>
<li>Note one app scenario where SQLite fits and one where Postgres fits better.</li>
</ol>

<h2>Common mistakes</h2>
<ul>
<li>Putting the <code>.db</code> file on a network share with many writers - corruption risk.</li>
<li>Expecting full PostgreSQL privilege model inside SQLite.</li>
<li>Forgetting that type affinity can accept surprising values unless you add CHECK constraints.</li>
</ul>

<div class="callout"><strong>Summary:</strong> SQLite gives you a real SQL database in a single file - perfect for practice and embedded apps. Use a server RDBMS for multi-user network workloads.</div>
`,
    quiz: {
      q: "SQLite stores a database primarily as:",
      options: [
        "A mandatory remote cluster only",
        "A local file managed by an embedded engine",
        "Only in GPU memory",
        "A CSS stylesheet"
      ],
      answer: 1
    }
  });

  L("sql07", {
    module: "sql-m02",
    title: "07 Install MySQL",
    level: "Beginner",
    duration: "45 min",
    objectives: [
      "Install MySQL Server locally",
      "Connect with mysql CLI or MySQL Workbench",
      "Create a database and a simple table",
      "Know default port 3306"
    ],
    content: `
<p><strong>MySQL</strong> is one of the most widely deployed open-source relational databases, especially for web applications. MariaDB is a compatible fork you may also meet.</p>
<p><strong>Why install it?</strong> Many tutorials, hosts, and job descriptions assume MySQL familiarity. Learning it alongside PostgreSQL makes you dialect-aware.</p>

<h2>Install overview</h2>
<ol>
<li>Download MySQL Installer (Windows) or use packages (<code>apt install mysql-server</code> on Ubuntu).</li>
<li>Set a root password (or auth plugin as prompted).</li>
<li>Default port is <code>3306</code>.</li>
<li>Optional: install MySQL Workbench for a GUI.</li>
</ol>

<h2>Worked examples</h2>
<pre><code>-- Connect (shell examples vary by OS)
-- mysql -u root -p

CREATE DATABASE ashovix;
USE ashovix;

CREATE TABLE customers (
  id    INT PRIMARY KEY AUTO_INCREMENT,
  name  VARCHAR(100) NOT NULL,
  email VARCHAR(150) UNIQUE
);

INSERT INTO customers (name, email)
VALUES ('Asha', 'asha@example.com');

SELECT id, name, email FROM customers;</code></pre>
<pre><code>-- Verify server
SELECT VERSION();
SELECT DATABASE();</code></pre>
<pre><code>-- Create a limited practice user (adjust host as needed)
CREATE USER 'ashovix'@'localhost' IDENTIFIED BY 'change_me_now';
GRANT SELECT, INSERT, UPDATE, DELETE ON ashovix.* TO 'ashovix'@'localhost';
FLUSH PRIVILEGES;</code></pre>

<h2>Try it</h2>
<ol>
<li>Install MySQL and confirm port 3306.</li>
<li>Create database <code>ashovix</code> and table <code>customers</code>.</li>
<li>Insert two rows and select them.</li>
<li>Run <code>SELECT VERSION();</code> and record the version string.</li>
</ol>

<h2>Common mistakes</h2>
<ul>
<li>Confusing MySQL port 3306 with PostgreSQL 5432.</li>
<li>Using root for application connections in production.</li>
<li>Forgetting <code>USE dbname;</code> and creating tables in the wrong database.</li>
<li>Auth plugin mismatches on older clients (<code>caching_sha2_password</code> issues).</li>
</ul>

<div class="callout"><strong>Summary:</strong> MySQL is a client-server RDBMS on port 3306. Create a practice database, verify with <code>SELECT VERSION()</code>, and prefer least-privilege users for apps.</div>
`,
    quiz: {
      q: "Default MySQL port is:",
      options: ["5432", "3306", "6379", "1433"],
      answer: 1
    }
  });

  L("sql08", {
    module: "sql-m02",
    title: "08 SQL Tools",
    level: "Beginner",
    duration: "30 min",
    objectives: [
      "List CLI and GUI tools for major engines",
      "Know when to use CLI vs GUI",
      "Run a query in at least one tool",
      "Adopt safe habits (transactions, backups, no secrets in scripts)"
    ],
    content: `
<p>SQL tools are how humans talk to engines: command-line clients, GUIs, and IDE plugins. The language is SQL; the tool is just the messenger.</p>
<p><strong>Why care?</strong> Pros switch tools constantly. If you only memorize one GUI button, you are stuck when SSH access is all you have.</p>

<h2>Common tools</h2>
<div class="table-wrap"><table>
<thead><tr><th>Engine</th><th>CLI</th><th>GUI examples</th></tr></thead>
<tbody>
<tr><td>PostgreSQL</td><td>psql</td><td>pgAdmin, DBeaver, DataGrip</td></tr>
<tr><td>MySQL</td><td>mysql</td><td>MySQL Workbench, DBeaver</td></tr>
<tr><td>SQLite</td><td>sqlite3</td><td>DB Browser for SQLite, DBeaver</td></tr>
<tr><td>SQL Server</td><td>sqlcmd</td><td>SSMS, Azure Data Studio</td></tr>
</tbody></table></div>

<h2>CLI strengths</h2>
<ul>
<li>Works over SSH on remote servers.</li>
<li>Easy to script and reproduce.</li>
<li>Forces you to read real SQL.</li>
</ul>

<h2>GUI strengths</h2>
<ul>
<li>Browse schemas visually.</li>
<li>Explain plans and result grids.</li>
<li>Helpful for designing tables early on.</li>
</ul>

<h2>Worked examples</h2>
<pre><code>-- Same query in any decent tool
SELECT id, name
FROM customers
WHERE city = 'Pune'
ORDER BY name;</code></pre>
<pre><code>-- psql: useful meta-commands
-- \\dt          list tables
-- \\d customers describe table
-- \\x           expanded display
-- \timing      show execution time</code></pre>
<pre><code>-- Safety habit: preview before mass update
SELECT COUNT(*) AS will_touch
FROM orders
WHERE status = 'DRAFT';

-- Then, inside a transaction:
BEGIN;
UPDATE orders SET status = 'CANCELLED' WHERE status = 'DRAFT';
-- SELECT and verify, then COMMIT or ROLLBACK;</code></pre>

<h2>Try it</h2>
<ol>
<li>Open your engine's CLI and list tables.</li>
<li>Open a GUI (pgAdmin, Workbench, or DBeaver) and run the same SELECT.</li>
<li>Time a query in CLI if available (<code>\timing</code> in psql).</li>
<li>Write a personal rule: never store DB passwords in project source files.</li>
</ol>

<h2>Common mistakes</h2>
<ul>
<li>Running UPDATE/DELETE without a WHERE preview.</li>
<li>Auto-commit habit with no transaction for multi-step changes.</li>
<li>Exporting production data to random laptops without policy.</li>
</ul>

<div class="callout"><strong>Summary:</strong> Learn both CLI and one GUI. Tools change; SQL and safe habits stay.</div>
`,
    quiz: {
      q: "psql is primarily:",
      options: [
        "A CSS linter",
        "The PostgreSQL interactive terminal",
        "A MongoDB shell only",
        "An OS kernel"
      ],
      answer: 1
    }
  });

  L("sql09", {
    module: "sql-m03",
    title: "09 Create First Database",
    level: "Beginner",
    duration: "35 min",
    objectives: [
      "Create and select/connect to a database",
      "Create a first table and insert rows",
      "List databases and tables in your tool",
      "Drop objects carefully in a lab only"
    ],
    content: `
<p>A <strong>database</strong> (sometimes called a schema catalog depending on the engine) is a named container for tables and other objects. Your first milestone is: create DB, create table, insert, select.</p>
<p><strong>Why start here?</strong> Everything later - joins, indexes, transactions - assumes you can create a playground and reset it.</p>

<h2>Create database patterns</h2>
<pre><code>-- PostgreSQL / MySQL style
CREATE DATABASE ashovix_shop;

-- PostgreSQL connect: \\c ashovix_shop
-- MySQL:
-- USE ashovix_shop;

-- SQLite: opening a file creates the DB
-- sqlite3 ashovix_shop.db</code></pre>

<h2>Worked examples</h2>
<pre><code>CREATE TABLE products (
  id    INT PRIMARY KEY,
  name  VARCHAR(100) NOT NULL,
  price DECIMAL(10,2) NOT NULL
);

INSERT INTO products (id, name, price) VALUES
  (1, 'Notebook', 12.50),
  (2, 'Pen Set', 4.99),
  (3, 'USB Cable', 8.00);

SELECT id, name, price
FROM products
ORDER BY price DESC;</code></pre>
<pre><code>-- Inspect what you created (engine-specific helpers also exist)
SELECT table_name
FROM information_schema.tables
WHERE table_schema NOT IN ('pg_catalog', 'information_schema')
  AND table_type = 'BASE TABLE';</code></pre>
<pre><code>-- Lab cleanup only - NEVER on production casually
-- DROP TABLE products;
-- DROP DATABASE ashovix_shop;  -- syntax/privileges vary</code></pre>

<h2>Try it</h2>
<ol>
<li>Create database <code>ashovix_shop</code> (or a SQLite file).</li>
<li>Create <code>products</code> with id, name, price.</li>
<li>Insert at least three products and select them ordered by price.</li>
<li>List tables and confirm <code>products</code> appears.</li>
</ol>

<h2>Common mistakes</h2>
<ul>
<li>Creating tables while connected to the wrong database.</li>
<li>Omitting NOT NULL on columns that must always have values.</li>
<li>Using DROP DATABASE on a shared server without double-checking the name.</li>
</ul>

<div class="callout"><strong>Summary:</strong> Create a named database, add a table, insert sample rows, and verify with SELECT. That loop is the foundation of every lab in this course.</div>
`,
    quiz: {
      q: "After CREATE DATABASE, your next typical step is:",
      options: [
        "Delete the operating system",
        "Connect/use that database and create tables",
        "Disable SQL forever",
        "Format the GPU"
      ],
      answer: 1
    }
  });

  L("sql10", {
    module: "sql-m03",
    title: "10 Tables",
    level: "Beginner",
    duration: "35 min",
    objectives: [
      "Define a table as a relation with columns",
      "Create, alter, and drop tables safely",
      "Choose sensible column names and nullability",
      "Read a table definition critically"
    ],
    content: `
<p>A <strong>table</strong> stores rows that share the same columns. In relational theory it is a relation; in practice it is your main unit of design.</p>
<p><strong>Why tables matter:</strong> Good table design makes queries simple. Bad design forces painful joins, duplicates, and bugs.</p>

<h2>Anatomy of a table</h2>
<ul>
<li><strong>Name</strong> - usually plural nouns: <code>customers</code>, <code>orders</code>.</li>
<li><strong>Columns</strong> - attributes with types and constraints.</li>
<li><strong>Rows</strong> - individual records.</li>
<li><strong>Constraints</strong> - PK, FK, UNIQUE, CHECK, NOT NULL.</li>
</ul>

<h2>Worked examples</h2>
<pre><code>CREATE TABLE customers (
  id         INT PRIMARY KEY,
  full_name  VARCHAR(120) NOT NULL,
  email      VARCHAR(150) NOT NULL UNIQUE,
  city       VARCHAR(80),
  created_at TIMESTAMP NOT NULL
);</code></pre>
<pre><code>-- Evolve structure carefully
ALTER TABLE customers
  ADD COLUMN phone VARCHAR(30);

ALTER TABLE customers
  ALTER COLUMN city SET NOT NULL;  -- syntax varies by engine</code></pre>
<pre><code>-- Rename clarity beats clever abbreviations
-- Prefer order_date over od, customer_id over cid in public schemas
SELECT id, full_name, email
FROM customers;</code></pre>

<h2>Try it</h2>
<ol>
<li>Design a <code>books</code> table with id, title, author, price, in_stock.</li>
<li>Create it and insert two rows.</li>
<li>Alter the table to add <code>isbn</code>.</li>
<li>Write why you made <code>title</code> NOT NULL.</li>
</ol>

<h2>Common mistakes</h2>
<ul>
<li>Tables named after UI screens instead of business entities.</li>
<li>God-tables with dozens of unrelated columns.</li>
<li>Changing types in production without a migration plan.</li>
</ul>

<div class="callout"><strong>Summary:</strong> Tables are typed, named structures for rows. Create them deliberately, name columns clearly, and alter them with care.</div>
`,
    quiz: {
      q: "A relational table is best described as:",
      options: [
        "A random folder of images",
        "A named structure of rows sharing the same columns",
        "A CSS grid only",
        "A CPU register"
      ],
      answer: 1
    }
  });

  L("sql11", {
    module: "sql-m03",
    title: "11 Rows",
    level: "Beginner",
    duration: "30 min",
    objectives: [
      "Define a row as one record in a table",
      "Insert single and multi-row values",
      "Update and delete rows safely with WHERE",
      "Understand that row order is not guaranteed without ORDER BY"
    ],
    content: `
<p>A <strong>row</strong> (record) is one instance of the entity your table models - one customer, one order, one product. Columns describe attributes; the row holds the values.</p>
<p><strong>Why focus on rows?</strong> Almost every bug beginners hit is inserting wrong values, updating too many rows, or assuming a physical order that does not exist.</p>

<h2>Key ideas</h2>
<ul>
<li>Insert adds rows; update changes values; delete removes rows.</li>
<li>Without <code>ORDER BY</code>, SELECT order is undefined.</li>
<li>Always preview with SELECT before mass UPDATE/DELETE.</li>
</ul>

<h2>Worked examples</h2>
<pre><code>INSERT INTO customers (id, full_name, email, city)
VALUES (10, 'Riya Sharma', 'riya@example.com', 'Pune');

INSERT INTO customers (id, full_name, email, city) VALUES
  (11, 'Omar Khan', 'omar@example.com', 'Delhi'),
  (12, 'Lee Park', 'lee@example.com', 'Mumbai');</code></pre>
<pre><code>-- Change one row
UPDATE customers
SET city = 'Bengaluru'
WHERE id = 10;

-- Verify
SELECT id, full_name, city
FROM customers
WHERE id = 10;</code></pre>
<pre><code>-- Delete carefully
DELETE FROM customers
WHERE id = 12;

-- Dangerous pattern (lab only): DELETE FROM customers;  -- all rows</code></pre>

<h2>Try it</h2>
<ol>
<li>Insert three customer rows with different cities.</li>
<li>Update one customer's email and re-select that id.</li>
<li>Delete one row by primary key.</li>
<li>Run the same SELECT twice without ORDER BY and note that order may vary by engine/plan.</li>
</ol>

<h2>Common mistakes</h2>
<ul>
<li><code>UPDATE</code>/<code>DELETE</code> without WHERE on a large table.</li>
<li>Assuming the "first row" is special without ORDER BY.</li>
<li>Inserting duplicate primary keys and ignoring the error.</li>
</ul>

<div class="callout"><strong>Summary:</strong> Rows are the records you insert, update, and delete. Target them with keys and WHERE clauses; never trust unordered results.</div>
`,
    quiz: {
      q: "Without ORDER BY, the order of rows returned by SELECT is:",
      options: [
        "Always insertion order in every engine",
        "Not guaranteed",
        "Always alphabetical",
        "Always reverse primary key"
      ],
      answer: 1
    }
  });

  L("sql12", {
    module: "sql-m03",
    title: "12 Columns",
    level: "Beginner",
    duration: "30 min",
    objectives: [
      "Explain columns as typed attributes",
      "Project columns with SELECT lists",
      "Add and rename columns via ALTER",
      "Avoid SELECT * in application hot paths"
    ],
    content: `
<p>A <strong>column</strong> is a named attribute shared by every row in a table: <code>email</code>, <code>price</code>, <code>created_at</code>. Each column has a data type and optional constraints.</p>
<p><strong>Why columns matter:</strong> Choosing the right columns (and only those columns) keeps storage clean and queries fast.</p>

<h2>Projection</h2>
<p>The SELECT list is called a projection - you choose which columns appear in the result.</p>

<h2>Worked examples</h2>
<pre><code>-- Project only what you need
SELECT full_name, email
FROM customers;</code></pre>
<pre><code>-- Column aliases for readable output
SELECT
  full_name AS customer_name,
  city AS home_city
FROM customers;</code></pre>
<pre><code>-- Add a column later
ALTER TABLE customers
  ADD COLUMN loyalty_points INT NOT NULL DEFAULT 0;

SELECT id, full_name, loyalty_points
FROM customers;</code></pre>

<h2>Naming tips</h2>
<ul>
<li>Use snake_case or the style your team standardizes.</li>
<li>Avoid spaces and reserved words as names.</li>
<li>Prefer <code>is_active</code> over vague <code>flag</code>.</li>
</ul>

<h2>Try it</h2>
<ol>
<li>Select only <code>id</code> and <code>full_name</code> from customers.</li>
<li>Alias <code>full_name</code> as <code>customer_name</code>.</li>
<li>Add a nullable <code>notes</code> column.</li>
<li>Explain one reason <code>SELECT *</code> is risky in APIs.</li>
</ol>

<h2>Common mistakes</h2>
<ul>
<li>Wide tables with unused columns that confuse every query.</li>
<li>Storing two facts in one column (e.g. "Pune|411001").</li>
<li>Renaming columns in production without updating all clients.</li>
</ul>

<div class="callout"><strong>Summary:</strong> Columns define the shape of your data. Project explicitly, name clearly, and evolve with ALTER plus migrations.</div>
`,
    quiz: {
      q: "Selecting specific columns in SELECT is called:",
      options: [
        "Projection",
        "Replication",
        "Fragmentation only",
        "Compilation"
      ],
      answer: 0
    }
  });

  L("sql13", {
    module: "sql-m03",
    title: "13 Data Types",
    level: "Beginner",
    duration: "40 min",
    objectives: [
      "Choose common scalar types (INT, DECIMAL, VARCHAR, DATE, BOOLEAN)",
      "Explain why types protect data quality",
      "Avoid float for money",
      "Pick text length and nullability thoughtfully"
    ],
    content: `
<p><strong>Data types</strong> tell the engine how to store and compare values. Good types catch errors early and enable efficient indexes.</p>
<p><strong>Why it matters:</strong> Storing money in floating point, or dates as free text, creates silent bugs that show up in finance and reports.</p>

<h2>Common type families</h2>
<div class="table-wrap"><table>
<thead><tr><th>Family</th><th>Examples</th><th>Use for</th></tr></thead>
<tbody>
<tr><td>Integer</td><td>INT, BIGINT</td><td>Counts, ids</td></tr>
<tr><td>Exact numeric</td><td>DECIMAL/NUMERIC</td><td>Money, precise quantities</td></tr>
<tr><td>Approximate</td><td>REAL/FLOAT/DOUBLE</td><td>Scientific measures (not money)</td></tr>
<tr><td>Character</td><td>CHAR, VARCHAR, TEXT</td><td>Names, codes, notes</td></tr>
<tr><td>Temporal</td><td>DATE, TIME, TIMESTAMP</td><td>Calendars and events</td></tr>
<tr><td>Boolean</td><td>BOOLEAN / TINYINT(1)</td><td>Flags (engine-dependent)</td></tr>
</tbody></table></div>

<h2>Worked examples</h2>
<pre><code>CREATE TABLE products (
  id         INT PRIMARY KEY,
  name       VARCHAR(100) NOT NULL,
  price      DECIMAL(10,2) NOT NULL,
  in_stock   BOOLEAN NOT NULL DEFAULT TRUE,
  launched   DATE
);

INSERT INTO products (id, name, price, in_stock, launched)
VALUES (1, 'Notebook', 12.50, TRUE, '2026-01-15');</code></pre>
<pre><code>-- Bad: money as approximate float (rounding surprises)
-- price FLOAT

-- Better:
-- price DECIMAL(10,2)

SELECT name, price, price * 1.18 AS price_with_tax
FROM products;</code></pre>
<pre><code>-- Cast when needed (syntax varies slightly)
SELECT
  id,
  CAST(price AS VARCHAR(20)) AS price_text
FROM products;</code></pre>

<h2>Try it</h2>
<ol>
<li>Design an <code>employees</code> table with hire_date, salary, and is_active types.</li>
<li>Insert one row and select it.</li>
<li>Attempt to insert a non-numeric salary and observe the error.</li>
<li>Rewrite a FLOAT money column plan to DECIMAL.</li>
</ol>

<h2>Common mistakes</h2>
<ul>
<li>Using FLOAT/DOUBLE for currency.</li>
<li>VARCHAR without thinking about realistic max length.</li>
<li>Storing timestamps as strings like '01/08/26' with ambiguous formats.</li>
</ul>

<div class="callout"><strong>Summary:</strong> Types are contracts. Prefer DECIMAL for money, proper date types for time, and integers for ids and counts.</div>
`,
    quiz: {
      q: "For currency amounts you should usually prefer:",
      options: [
        "FLOAT",
        "DECIMAL/NUMERIC",
        "Only BOOLEAN",
        "CLOB of images"
      ],
      answer: 1
    }
  });

  L("sql14", {
    module: "sql-m03",
    title: "14 Constraints",
    level: "Beginner",
    duration: "40 min",
    objectives: [
      "List common constraints: NOT NULL, UNIQUE, CHECK, DEFAULT, PK, FK",
      "Add constraints at CREATE and ALTER time",
      "Explain how constraints protect data quality",
      "Read constraint violation errors calmly"
    ],
    content: `
<p><strong>Constraints</strong> are rules the engine enforces on columns or tables. They are your first line of defense against bad data.</p>
<p><strong>Why use them?</strong> Application validation can be bypassed or buggy. Constraints apply to every client that talks to the database.</p>

<h2>Common constraints</h2>
<ul>
<li><strong>NOT NULL</strong> - value required.</li>
<li><strong>UNIQUE</strong> - no duplicates (NULL handling varies).</li>
<li><strong>CHECK</strong> - expression must be true.</li>
<li><strong>DEFAULT</strong> - value when omitted on INSERT.</li>
<li><strong>PRIMARY KEY</strong> - unique identifier (implies NOT NULL + UNIQUE).</li>
<li><strong>FOREIGN KEY</strong> - referential integrity to another table.</li>
</ul>

<h2>Worked examples</h2>
<pre><code>CREATE TABLE products (
  id      INT PRIMARY KEY,
  sku     VARCHAR(40) NOT NULL UNIQUE,
  name    VARCHAR(100) NOT NULL,
  price   DECIMAL(10,2) NOT NULL CHECK (price >= 0),
  status  VARCHAR(20) NOT NULL DEFAULT 'ACTIVE'
);</code></pre>
<pre><code>-- These should fail:
-- INSERT INTO products (id, sku, name, price) VALUES (1, 'A', 'X', -5);
-- INSERT INTO products (id, sku, name, price) VALUES (2, 'A', 'Y', 10);
-- (duplicate sku if 'A' already exists)</code></pre>
<pre><code>ALTER TABLE products
  ADD CONSTRAINT chk_status
  CHECK (status IN ('ACTIVE', 'DISCONTINUED'));</code></pre>

<h2>Try it</h2>
<ol>
<li>Create a table with NOT NULL, UNIQUE, CHECK, and DEFAULT.</li>
<li>Prove CHECK by attempting an invalid INSERT.</li>
<li>Prove UNIQUE with a duplicate key insert.</li>
<li>Add a CHECK via ALTER and test it.</li>
</ol>

<h2>Common mistakes</h2>
<ul>
<li>Relying only on the UI for validation.</li>
<li>CHECK constraints that contradict business rules silently unused.</li>
<li>Forgetting DEFAULT means the column can still be set to NULL if nullable.</li>
</ul>

<div class="callout"><strong>Summary:</strong> Constraints keep impossible data out of the database. Prefer declarative rules over hoping every app remembers them.</div>
`,
    quiz: {
      q: "NOT NULL on a column means:",
      options: [
        "Value is optional",
        "Value is required",
        "Value must be zero",
        "Value must be unique always"
      ],
      answer: 1
    }
  });

  L("sql15", {
    module: "sql-m03",
    title: "15 Primary Key",
    level: "Beginner",
    duration: "35 min",
    objectives: [
      "Define primary key uniqueness and NOT NULL",
      "Choose surrogate vs natural keys thoughtfully",
      "Create single-column and composite PKs",
      "Explain why every table should have a clear identity"
    ],
    content: `
<p>A <strong>primary key (PK)</strong> uniquely identifies each row in a table. It cannot be NULL, and no two rows share the same PK value.</p>
<p><strong>Why it matters:</strong> Updates, deletes, foreign keys, and ORMs all depend on stable identity.</p>

<h2>Surrogate vs natural</h2>
<ul>
<li><strong>Surrogate</strong> - system-generated (<code>id INT</code>, UUID). Stable even if business fields change.</li>
<li><strong>Natural</strong> - real-world unique attribute (ISBN, national id). Can change or be sensitive - use carefully.</li>
</ul>

<h2>Worked examples</h2>
<pre><code>CREATE TABLE customers (
  id    INT PRIMARY KEY,
  email VARCHAR(150) NOT NULL UNIQUE,
  name  VARCHAR(120) NOT NULL
);

INSERT INTO customers (id, email, name)
VALUES (1, 'asha@example.com', 'Asha');</code></pre>
<pre><code>-- Composite primary key example (enrollment)
CREATE TABLE enrollments (
  student_id INT NOT NULL,
  course_id  INT NOT NULL,
  enrolled_on DATE NOT NULL,
  PRIMARY KEY (student_id, course_id)
);</code></pre>
<pre><code>-- Identity/serial patterns (dialect examples)
-- PostgreSQL: id SERIAL PRIMARY KEY
-- MySQL: id INT PRIMARY KEY AUTO_INCREMENT
-- SQL Server: id INT IDENTITY(1,1) PRIMARY KEY</code></pre>

<h2>Try it</h2>
<ol>
<li>Create <code>customers</code> with an integer PK and unique email.</li>
<li>Attempt a duplicate PK insert and read the error.</li>
<li>Design a composite PK for a junction table of your choice.</li>
<li>Argue for or against using email as the primary key.</li>
</ol>

<h2>Common mistakes</h2>
<ul>
<li>Tables with no primary key ("I'll just use SELECT *").</li>
<li>Mutable natural keys that force cascading updates everywhere.</li>
<li>Wide composite keys used as foreign keys in many child tables.</li>
</ul>

<div class="callout"><strong>Summary:</strong> Every table needs a clear primary key. Prefer stable surrogate keys unless a natural key is truly immutable and appropriate.</div>
`,
    quiz: {
      q: "A primary key must be:",
      options: [
        "Nullable and duplicate OK",
        "Unique and NOT NULL",
        "Float only",
        "Unindexed always"
      ],
      answer: 1
    }
  });

  L("sql16", {
    module: "sql-m03",
    title: "16 Foreign Key",
    level: "Beginner",
    duration: "40 min",
    objectives: [
      "Define foreign keys and referential integrity",
      "Create FK relationships between parent and child tables",
      "Predict reject behavior on invalid child inserts",
      "Know ON DELETE/UPDATE action options at a high level"
    ],
    content: `
<p>A <strong>foreign key (FK)</strong> is a column (or set of columns) that references a primary key (or unique key) in another table. It enforces <strong>referential integrity</strong>: child rows cannot point to missing parents.</p>
<p><strong>Why FKs matter:</strong> Without them, orders can reference customers that never existed - reports and billing break quietly.</p>

<h2>Worked examples</h2>
<pre><code>CREATE TABLE customers (
  id   INT PRIMARY KEY,
  name VARCHAR(100) NOT NULL
);

CREATE TABLE orders (
  id          INT PRIMARY KEY,
  customer_id INT NOT NULL,
  total       DECIMAL(10,2) NOT NULL,
  CONSTRAINT fk_orders_customer
    FOREIGN KEY (customer_id) REFERENCES customers(id)
);

INSERT INTO customers (id, name) VALUES (1, 'Asha');
INSERT INTO orders (id, customer_id, total) VALUES (100, 1, 49.99);</code></pre>
<pre><code>-- This should fail: no customer 999
-- INSERT INTO orders (id, customer_id, total) VALUES (101, 999, 10.00);</code></pre>
<pre><code>-- Optional actions (engine support varies)
-- ON DELETE CASCADE  - delete children when parent deletes
-- ON DELETE RESTRICT - block parent delete if children exist
-- ON UPDATE CASCADE  - update child keys when parent key changes

CREATE TABLE order_items (
  id       INT PRIMARY KEY,
  order_id INT NOT NULL,
  sku      VARCHAR(40) NOT NULL,
  FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE
);</code></pre>

<h2>Try it</h2>
<ol>
<li>Build customers and orders with an FK.</li>
<li>Insert a valid order and an invalid order; confirm rejection.</li>
<li>Attempt to delete a customer that still has orders (note the behavior).</li>
<li>Write one sentence on when CASCADE is helpful vs dangerous.</li>
</ol>

<h2>Common mistakes</h2>
<ul>
<li>Skipping FKs "for performance" without measuring - integrity bugs are costlier.</li>
<li>Using CASCADE everywhere and deleting more data than intended.</li>
<li>Type mismatch between FK column and referenced PK column.</li>
</ul>

<div class="callout"><strong>Summary:</strong> Foreign keys keep relationships honest. Parent rows must exist before children reference them, unless you consciously allow NULLs for optional links.</div>
`,
    quiz: {
      q: "Foreign keys primarily enforce:",
      options: [
        "UI color themes",
        "Referential integrity",
        "DNS resolution",
        "CPU affinity"
      ],
      answer: 1
    }
  });

  L("sql17", {
    module: "sql-m03",
    title: "17 Normalization",
    level: "Intermediate",
    duration: "45 min",
    objectives: [
      "Explain why normalization reduces duplication",
      "Apply 1NF, 2NF, and 3NF at a practical level",
      "Spot update anomalies in denormalized tables",
      "Know when controlled denormalization is intentional"
    ],
    content: `
<p><strong>Normalization</strong> organizes tables to reduce redundant data and update anomalies. You split repeating groups and partial dependencies into related tables linked by keys.</p>
<p><strong>Why learn it?</strong> Interviews ask it, and bad designs haunt every query you write afterward.</p>

<h2>Quick forms (practical view)</h2>
<ul>
<li><strong>1NF</strong> - atomic values; no repeating groups in a cell/list-as-column chaos.</li>
<li><strong>2NF</strong> - 1NF + no partial dependency on part of a composite key.</li>
<li><strong>3NF</strong> - 2NF + no transitive dependency of non-key on non-key.</li>
</ul>

<h2>Worked examples</h2>
<pre><code>-- BAD: repeating group and duplicated customer data
-- order_id | customer_name | products_csv
-- 1        | Asha          | Pen,Notebook,Cable

-- BETTER shape:
-- customers(id, name)
-- orders(id, customer_id)
-- products(id, name)
-- order_items(order_id, product_id, qty)</code></pre>
<pre><code>CREATE TABLE customers (
  id   INT PRIMARY KEY,
  name VARCHAR(100) NOT NULL
);

CREATE TABLE orders (
  id          INT PRIMARY KEY,
  customer_id INT NOT NULL REFERENCES customers(id)
);

CREATE TABLE order_items (
  order_id   INT NOT NULL REFERENCES orders(id),
  product_id INT NOT NULL,
  qty        INT NOT NULL CHECK (qty > 0),
  PRIMARY KEY (order_id, product_id)
);</code></pre>
<pre><code>-- Anomaly example: customer phone stored on every order row
-- UPDATE must touch many rows or some stay stale
-- Store phone on customers instead, join when needed
SELECT o.id, c.name, c.phone
FROM orders o
JOIN customers c ON c.id = o.customer_id;</code></pre>

<h2>Try it</h2>
<ol>
<li>Take a spreadsheet with customer name repeated on every order and split it into two tables.</li>
<li>Identify a 1NF violation in a design that stores comma-separated tags in one cell.</li>
<li>Explain a transitive dependency: ZIP determines city stored beside customer id.</li>
<li>Name one reporting case where a denormalized summary table might be OK.</li>
</ol>

<h2>Common mistakes</h2>
<ul>
<li>Over-normalizing into tiny tables that make every screen need 12 joins.</li>
<li>Under-normalizing and copying addresses onto every invoice with no history strategy.</li>
<li>Treating normalization as dogma instead of a design tool.</li>
</ul>

<div class="callout"><strong>Summary:</strong> Normalize to control redundancy and anomalies. Denormalize deliberately for performance or history - with eyes open.</div>
`,
    quiz: {
      q: "Normalization mainly aims to:",
      options: [
        "Increase duplicate customer phones everywhere",
        "Reduce redundancy and update anomalies",
        "Replace SQL with CSS",
        "Disable primary keys"
      ],
      answer: 1
    }
  });

  L("sql18", {
    module: "sql-m04",
    title: "18 DDL",
    level: "Beginner",
    duration: "35 min",
    objectives: [
      "Define DDL as data definition language",
      "Use CREATE, ALTER, DROP, TRUNCATE (and know TRUNCATE risks)",
      "Differentiate DDL from DML",
      "Practice a small migration-style change"
    ],
    content: `
<p><strong>DDL</strong> (Data Definition Language) statements define and change database structure: databases, tables, indexes, views, and constraints.</p>
<p><strong>Why separate DDL?</strong> Structure changes are high impact. Teams version them as migrations and review them carefully.</p>

<h2>Core DDL verbs</h2>
<ul>
<li><code>CREATE</code> - make objects</li>
<li><code>ALTER</code> - change objects</li>
<li><code>DROP</code> - remove objects</li>
<li><code>TRUNCATE</code> - empty a table quickly (behavior/logging varies; still destructive)</li>
</ul>

<h2>Worked examples</h2>
<pre><code>CREATE TABLE employees (
  id         INT PRIMARY KEY,
  full_name  VARCHAR(120) NOT NULL,
  hire_date  DATE NOT NULL
);

ALTER TABLE employees
  ADD COLUMN department VARCHAR(80);

CREATE INDEX idx_employees_department
  ON employees (department);</code></pre>
<pre><code>-- Rename / modify examples (dialect-specific forms exist)
ALTER TABLE employees
  RENAME COLUMN full_name TO name;  -- supported in many modern engines</code></pre>
<pre><code>-- Destructive DDL - lab only
-- TRUNCATE TABLE employees;
-- DROP TABLE employees;</code></pre>

<h2>Try it</h2>
<ol>
<li>CREATE a table, ALTER add a column, CREATE an index.</li>
<li>Write the difference between DELETE all rows and TRUNCATE in your own words (check your engine docs).</li>
<li>Draft a two-step migration: add nullable column, then backfill, then set NOT NULL.</li>
<li>Label five statements as DDL or DML from a mixed list you invent.</li>
</ol>

<h2>Common mistakes</h2>
<ul>
<li>Running DROP/TRUNCATE on production without backups and a change ticket.</li>
<li>Mixing huge data backfills into the same careless session as DDL.</li>
<li>Assuming DDL always auto-commits the same way on every engine.</li>
</ul>

<div class="callout"><strong>Summary:</strong> DDL shapes the schema. Treat CREATE/ALTER/DROP as deliberate migrations, not casual experiments on shared data.</div>
`,
    quiz: {
      q: "Which statement is DDL?",
      options: ["SELECT", "CREATE TABLE", "COMMIT", "GRANT"],
      answer: 1
    }
  });

  L("sql19", {
    module: "sql-m04",
    title: "19 DML",
    level: "Beginner",
    duration: "35 min",
    objectives: [
      "Define DML as data manipulation language",
      "Write INSERT, UPDATE, DELETE confidently",
      "Use transactions around multi-step DML",
      "Preview affected rows before changing them"
    ],
    content: `
<p><strong>DML</strong> (Data Manipulation Language) changes data inside existing tables: <code>INSERT</code>, <code>UPDATE</code>, <code>DELETE</code> (and sometimes <code>MERGE</code>/<code>UPSERT</code> variants).</p>
<p><strong>Why it matters:</strong> Most application writes are DML. Mistakes here lose or corrupt business data.</p>

<h2>Worked examples</h2>
<pre><code>INSERT INTO products (id, name, price)
VALUES (10, 'Desk Lamp', 29.99);

UPDATE products
SET price = 24.99
WHERE id = 10;

DELETE FROM products
WHERE id = 10;</code></pre>
<pre><code>-- Multi-row insert
INSERT INTO products (id, name, price) VALUES
  (11, 'Stapler', 6.50),
  (12, 'Tape', 2.25);

-- Conditional update
UPDATE products
SET price = price * 0.90
WHERE price > 20;</code></pre>
<pre><code>BEGIN;
UPDATE accounts SET balance = balance - 100 WHERE id = 1;
UPDATE accounts SET balance = balance + 100 WHERE id = 2;
-- verify both sides, then:
COMMIT;
-- or ROLLBACK;</code></pre>

<h2>Try it</h2>
<ol>
<li>Insert two products, update one price, delete one row.</li>
<li>Before a bulk UPDATE, run a SELECT with the same WHERE.</li>
<li>Wrap a two-step transfer in BEGIN/COMMIT.</li>
<li>Write an UPDATE that would be wrong without WHERE - then do not run it.</li>
</ol>

<h2>Common mistakes</h2>
<ul>
<li>UPDATE/DELETE without WHERE.</li>
<li>Assuming INSERT always succeeds when UNIQUE/FK constraints exist.</li>
<li>Committing before verifying multi-table changes.</li>
</ul>

<div class="callout"><strong>Summary:</strong> DML changes rows. Preview, constrain with WHERE, and use transactions for multi-step business operations.</div>
`,
    quiz: {
      q: "Which statement is DML?",
      options: ["ALTER TABLE", "INSERT INTO", "REVOKE", "CREATE INDEX"],
      answer: 1
    }
  });

  L("sql20", {
    module: "sql-m04",
    title: "20 DQL",
    level: "Beginner",
    duration: "40 min",
    objectives: [
      "Define DQL around SELECT",
      "Build queries with FROM, WHERE, ORDER BY",
      "Use column aliases and expressions",
      "Read results critically (duplicates, NULL)"
    ],
    content: `
<p><strong>DQL</strong> (Data Query Language) is the read side of SQL. In practice that means <code>SELECT</code> - the statement you will write most often.</p>
<p><strong>Why emphasize SELECT?</strong> Analytics, APIs, reports, and debugging all start by asking precise questions of the data.</p>

<h2>SELECT building blocks</h2>
<ul>
<li><code>SELECT</code> - columns/expressions</li>
<li><code>FROM</code> - source tables</li>
<li><code>WHERE</code> - row filter</li>
<li><code>GROUP BY</code> / <code>HAVING</code> - aggregation</li>
<li><code>ORDER BY</code> - sort</li>
</ul>

<h2>Worked examples</h2>
<pre><code>SELECT id, name, price
FROM products
WHERE price >= 10
ORDER BY price DESC;</code></pre>
<pre><code>SELECT
  city,
  COUNT(*) AS customer_count
FROM customers
GROUP BY city
ORDER BY customer_count DESC;</code></pre>
<pre><code>SELECT
  name,
  price,
  ROUND(price * 1.18, 2) AS price_with_tax
FROM products
WHERE name LIKE '%Note%';</code></pre>

<h2>Try it</h2>
<ol>
<li>Select all columns from a table, then rewrite with an explicit column list.</li>
<li>Filter with WHERE and sort with ORDER BY.</li>
<li>Write a COUNT(*) grouped by city.</li>
<li>Find rows where a column IS NULL.</li>
</ol>

<h2>Common mistakes</h2>
<ul>
<li>Using <code>= NULL</code> instead of <code>IS NULL</code>.</li>
<li>Forgetting DISTINCT when duplicates confuse a report (and knowing when DISTINCT hides a join bug).</li>
<li>Selecting huge result sets into GUIs without LIMIT/TOP.</li>
</ul>

<div class="callout"><strong>Summary:</strong> DQL is how you ask questions. Master SELECT layers - filter, project, aggregate, sort - before optimizing.</div>
`,
    quiz: {
      q: "Which is mainly DQL?",
      options: ["DROP", "SELECT", "GRANT", "ROLLBACK"],
      answer: 1
    }
  });

  L("sql21", {
    module: "sql-m04",
    title: "21 TCL",
    level: "Intermediate",
    duration: "40 min",
    objectives: [
      "Define TCL and transaction boundaries",
      "Use BEGIN/COMMIT/ROLLBACK (and SAVEPOINT)",
      "Explain why multi-step business ops need transactions",
      "Relate TCL to ACID at a practical level"
    ],
    content: `
<p><strong>TCL</strong> (Transaction Control Language) manages transactions: atomic units of work that commit together or roll back together.</p>
<p><strong>Why TCL?</strong> Transferring money, placing an order with inventory decrement, or enrolling a student across tables must not leave half-finished states.</p>

<h2>Core statements</h2>
<ul>
<li><code>BEGIN</code> / <code>START TRANSACTION</code> - start</li>
<li><code>COMMIT</code> - make changes permanent</li>
<li><code>ROLLBACK</code> - undo uncommitted work</li>
<li><code>SAVEPOINT</code> - named partial rollback point</li>
</ul>

<h2>Worked examples</h2>
<pre><code>BEGIN;
UPDATE accounts SET balance = balance - 50 WHERE id = 1;
UPDATE accounts SET balance = balance + 50 WHERE id = 2;
COMMIT;</code></pre>
<pre><code>BEGIN;
UPDATE accounts SET balance = balance - 50 WHERE id = 1;
-- oops, wrong target account detected during checks
ROLLBACK;</code></pre>
<pre><code>BEGIN;
UPDATE products SET stock = stock - 1 WHERE id = 10;
SAVEPOINT after_stock;
INSERT INTO orders (id, product_id, qty) VALUES (500, 10, 1);
-- if insert fails validation in app logic:
ROLLBACK TO SAVEPOINT after_stock;
ROLLBACK;  -- or COMMIT remaining intentional work carefully</code></pre>

<h2>Try it</h2>
<ol>
<li>Run a two-update transfer and COMMIT.</li>
<li>Repeat with ROLLBACK and confirm balances unchanged.</li>
<li>Use a SAVEPOINT and roll back to it.</li>
<li>Explain atomicity in one sentence using the transfer example.</li>
</ol>

<h2>Common mistakes</h2>
<ul>
<li>Leaving transactions open (long locks, connection pool pain).</li>
<li>Assuming every engine auto-starts transactions the same way.</li>
<li>Catching errors in app code but forgetting to ROLLBACK.</li>
</ul>

<div class="callout"><strong>Summary:</strong> TCL makes multi-statement work atomic. Commit only after verifying; roll back on failure.</div>
`,
    quiz: {
      q: "COMMIT belongs to:",
      options: ["DQL", "TCL", "HTML", "CSS"],
      answer: 1
    }
  });

  L("sql22", {
    module: "sql-m04",
    title: "22 DCL",
    level: "Intermediate",
    duration: "35 min",
    objectives: [
      "Define DCL as permission control",
      "Use GRANT and REVOKE",
      "Apply least privilege for app users",
      "Distinguish users/roles at a high level"
    ],
    content: `
<p><strong>DCL</strong> (Data Control Language) manages who can do what: <code>GRANT</code> and <code>REVOKE</code> privileges on databases, tables, and other objects.</p>
<p><strong>Why DCL?</strong> A web app should not connect as a superuser. Least privilege limits damage from bugs and breaches.</p>

<h2>Worked examples</h2>
<pre><code>-- Create a login/user (syntax varies widely by engine)
-- PostgreSQL example shape:
CREATE ROLE app_readonly LOGIN PASSWORD 'change_me_now';

GRANT CONNECT ON DATABASE ashovix_shop TO app_readonly;
GRANT USAGE ON SCHEMA public TO app_readonly;
GRANT SELECT ON ALL TABLES IN SCHEMA public TO app_readonly;</code></pre>
<pre><code>-- MySQL-shaped example
CREATE USER 'app_rw'@'localhost' IDENTIFIED BY 'change_me_now';
GRANT SELECT, INSERT, UPDATE, DELETE ON ashovix.* TO 'app_rw'@'localhost';
FLUSH PRIVILEGES;</code></pre>
<pre><code>REVOKE DELETE ON ashovix.customers FROM 'app_rw'@'localhost';
-- PostgreSQL analog: REVOKE DELETE ON customers FROM app_rw;</code></pre>

<h2>Least privilege checklist</h2>
<ul>
<li>App user: only needed tables and verbs.</li>
<li>Reporting user: often SELECT only.</li>
<li>Migrations: separate privileged account, not the runtime user.</li>
</ul>

<h2>Try it</h2>
<ol>
<li>Create a read-only user/role in your engine.</li>
<li>GRANT SELECT and prove INSERT fails.</li>
<li>REVOKE a privilege and retest.</li>
<li>List privileges your imaginary checkout API actually needs.</li>
</ol>

<h2>Common mistakes</h2>
<ul>
<li>Sharing the superuser password with every developer laptop.</li>
<li>GRANT ALL on *.* for convenience.</li>
<li>Forgetting to revoke when people leave a project.</li>
</ul>

<div class="callout"><strong>Summary:</strong> DCL enforces access policy in the database. Grant the minimum privileges each role needs - nothing more.</div>
`,
    quiz: {
      q: "GRANT belongs to:",
      options: ["DML", "DCL", "DQL", "TCL"],
      answer: 1
    }
  });

  L("sql23", {
    module: "sql-m05",
    title: "23 Operators",
    level: "Beginner",
    duration: "35 min",
    objectives: [
      "Use comparison and logical operators in WHERE",
      "Apply IN, BETWEEN, LIKE, and IS NULL",
      "Combine predicates with AND/OR carefully",
      "Avoid NULL comparison pitfalls"
    ],
    content: `
<p><strong>Operators</strong> build expressions and filters: comparisons (<code>=</code>, <code>&lt;</code>, <code>&gt;=</code>), logic (<code>AND</code>, <code>OR</code>, <code>NOT</code>), and SQL predicates (<code>IN</code>, <code>BETWEEN</code>, <code>LIKE</code>, <code>IS NULL</code>).</p>
<p><strong>Why practice operators?</strong> Most incorrect reports are wrong filters, not wrong tables.</p>

<h2>Worked examples</h2>
<pre><code>SELECT id, name, price
FROM products
WHERE price >= 10
  AND price &lt; 50
  AND name LIKE 'N%';</code></pre>
<pre><code>SELECT id, name, city
FROM customers
WHERE city IN ('Pune', 'Mumbai', 'Delhi')
   OR email LIKE '%@example.com';</code></pre>
<pre><code>SELECT id, name, launched
FROM products
WHERE launched BETWEEN '2026-01-01' AND '2026-12-31'
  AND discontinued_at IS NULL;</code></pre>

<h2>NULL rules (critical)</h2>
<ul>
<li><code>WHERE col = NULL</code> never finds NULLs - use <code>IS NULL</code>.</li>
<li><code>NOT IN (...)</code> with NULLs in the list can surprise you - prefer careful patterns.</li>
<li>Unknown logic: comparisons with NULL yield UNKNOWN, filtered out by WHERE.</li>
</ul>

<h2>Try it</h2>
<ol>
<li>Filter products with price BETWEEN 5 and 25.</li>
<li>Find names starting with 'A' using LIKE.</li>
<li>Find rows where phone IS NULL.</li>
<li>Write a WHERE with AND/OR and add parentheses to make intent obvious.</li>
</ol>

<h2>Common mistakes</h2>
<ul>
<li><code>= NULL</code> instead of <code>IS NULL</code>.</li>
<li>OR precedence bugs: <code>a AND b OR c</code> without parentheses.</li>
<li>Using LIKE '%term%' on huge tables without considering indexes.</li>
</ul>

<div class="callout"><strong>Summary:</strong> Operators express filters precisely. Master NULL behavior and parenthesize mixed AND/OR logic.</div>
`,
    quiz: {
      q: "To find NULL values in a column use:",
      options: [
        "WHERE col = NULL",
        "WHERE col IS NULL",
        "WHERE col == NONE",
        "WHERE col EQUALS EMPTY"
      ],
      answer: 1
    }
  });

  L("sql24", {
    module: "sql-m05",
    title: "24 WHERE",
    level: "Beginner",
    duration: "35 min",
    objectives: [
      "Filter rows with WHERE before grouping/projection mentally",
      "Combine multiple predicates safely",
      "Use WHERE with UPDATE and DELETE",
      "Contrast WHERE vs HAVING"
    ],
    content: `
<p>The <strong>WHERE</strong> clause filters rows. Only rows that make the predicate true (not false/unknown) continue in the query.</p>
<p><strong>Why WHERE is central:</strong> Correct filters define correct business answers. Wrong filters look confident and ship bugs.</p>

<h2>Mental order (simplified)</h2>
<p>FROM (and JOINs) produce a row set - WHERE filters those rows - later GROUP BY/HAVING/SELECT/ORDER BY shape the answer.</p>

<h2>Worked examples</h2>
<pre><code>SELECT id, name, city
FROM customers
WHERE city = 'Pune'
  AND email IS NOT NULL;</code></pre>
<pre><code>UPDATE orders
SET status = 'CANCELLED'
WHERE status = 'DRAFT'
  AND created_at &lt; '2026-01-01';</code></pre>
<pre><code>-- WHERE filters rows; HAVING filters groups
SELECT customer_id, COUNT(*) AS order_count
FROM orders
WHERE status = 'PAID'
GROUP BY customer_id
HAVING COUNT(*) >= 3;</code></pre>

<h2>Try it</h2>
<ol>
<li>Write three WHERE filters on your sample data (equality, range, NULL).</li>
<li>UPDATE one row using WHERE on the primary key.</li>
<li>Explain why WHERE status = 'PAID' differs from HAVING COUNT(*) &gt; 1.</li>
<li>Convert an English rule into a WHERE clause for your domain.</li>
</ol>

<h2>Common mistakes</h2>
<ul>
<li>Putting aggregate conditions in WHERE instead of HAVING.</li>
<li>Filtering on transformed columns in ways that disable indexes (engine-dependent).</li>
<li>Forgetting parentheses with OR.</li>
</ul>

<div class="callout"><strong>Summary:</strong> WHERE picks which rows participate. Keep predicates precise, test with SELECT first, then reuse the same filter for writes.</div>
`,
    quiz: {
      q: "WHERE filters:",
      options: [
        "Only indexes",
        "Rows (before group filters with HAVING)",
        "Only users in DCL",
        "Only file names on disk"
      ],
      answer: 1
    }
  });

  L("sql25", {
    module: "sql-m05",
    title: "25 ORDER BY",
    level: "Beginner",
    duration: "30 min",
    objectives: [
      "Sort results with ORDER BY ASC/DESC",
      "Sort by multiple columns",
      "Know that order is undefined without ORDER BY",
      "Combine ORDER BY with LIMIT/TOP patterns carefully"
    ],
    content: `
<p><strong>ORDER BY</strong> sorts the final result set. Ascending (<code>ASC</code>) is usually default; <code>DESC</code> reverses.</p>
<p><strong>Why it matters:</strong> Users expect ranked lists - newest orders, top spenders, alphabetical directories. Without ORDER BY, any order you "usually see" can change.</p>

<h2>Worked examples</h2>
<pre><code>SELECT id, name, price
FROM products
ORDER BY price DESC, name ASC;</code></pre>
<pre><code>SELECT id, full_name, created_at
FROM customers
ORDER BY created_at DESC;</code></pre>
<pre><code>-- Top-N pattern (dialect forms differ)
-- PostgreSQL/MySQL/SQLite:
SELECT id, name, price
FROM products
ORDER BY price DESC
LIMIT 5;

-- SQL Server often uses TOP or OFFSET/FETCH</code></pre>

<h2>NULL sorting</h2>
<p>Engines differ on whether NULLs sort first or last. Check docs or use <code>NULLS FIRST/LAST</code> where supported (PostgreSQL).</p>

<h2>Try it</h2>
<ol>
<li>Sort customers by name ascending.</li>
<li>Sort products by price descending, then name.</li>
<li>Return the 5 most expensive products (LIMIT/TOP).</li>
<li>Run a SELECT twice without ORDER BY and discuss stability.</li>
</ol>

<h2>Common mistakes</h2>
<ul>
<li>Assuming insertion order is preserved.</li>
<li>Ordering by a column not in SELECT without realizing it is allowed (and useful).</li>
<li>Paging with LIMIT without a deterministic ORDER BY (duplicate/missing rows across pages).</li>
</ul>

<div class="callout"><strong>Summary:</strong> If order matters to humans, write ORDER BY. For Top-N and paging, pair it with a deterministic sort key.</div>
`,
    quiz: {
      q: "To sort prices high to low:",
      options: [
        "ORDER BY price ASC",
        "ORDER BY price DESC",
        "GROUP BY price ONLY",
        "GRANT price"
      ],
      answer: 1
    }
  });

  L("sql26", {
    module: "sql-m05",
    title: "26 GROUP BY",
    level: "Intermediate",
    duration: "40 min",
    objectives: [
      "Aggregate with COUNT, SUM, AVG, MIN, MAX",
      "Group rows with GROUP BY",
      "Follow the select-list rule for grouped queries",
      "Build simple category reports"
    ],
    content: `
<p><strong>GROUP BY</strong> collapses rows that share the same group key and lets aggregate functions compute per-group values.</p>
<p><strong>Why learn grouping?</strong> Dashboards and interviews love "total sales by city" questions.</p>

<h2>Rules of thumb</h2>
<ul>
<li>Non-aggregated SELECT columns must appear in GROUP BY (strict engines enforce this).</li>
<li>Filter rows with WHERE before grouping; filter groups with HAVING after.</li>
</ul>

<h2>Worked examples</h2>
<pre><code>SELECT city, COUNT(*) AS customers
FROM customers
GROUP BY city
ORDER BY customers DESC;</code></pre>
<pre><code>SELECT customer_id, SUM(total) AS revenue
FROM orders
WHERE status = 'PAID'
GROUP BY customer_id;</code></pre>
<pre><code>SELECT
  DATE_TRUNC('month', order_date) AS month,  -- Postgres example
  COUNT(*) AS orders,
  SUM(total) AS revenue
FROM orders
GROUP BY DATE_TRUNC('month', order_date)
ORDER BY month;</code></pre>

<h2>Try it</h2>
<ol>
<li>COUNT customers per city.</li>
<li>SUM order totals per customer_id.</li>
<li>AVG price per product category (add a category column if needed).</li>
<li>Explain an error you get if you SELECT name while grouping only by city.</li>
</ol>

<h2>Common mistakes</h2>
<ul>
<li>Selecting unaggregated non-grouped columns.</li>
<li>Using WHERE COUNT(*) &gt; 1 instead of HAVING.</li>
<li>Grouping by a timestamp when you meant to group by date/month.</li>
</ul>

<div class="callout"><strong>Summary:</strong> GROUP BY turns detailed rows into summaries. Pair it with aggregates and keep the select list legal for your engine.</div>
`,
    quiz: {
      q: "COUNT(*) with GROUP BY city returns:",
      options: [
        "One total only, always",
        "A count per city group",
        "Only primary keys",
        "Grants for users"
      ],
      answer: 1
    }
  });

  L("sql27", {
    module: "sql-m05",
    title: "27 HAVING",
    level: "Intermediate",
    duration: "35 min",
    objectives: [
      "Filter groups with HAVING",
      "Contrast HAVING vs WHERE clearly",
      "Combine WHERE + GROUP BY + HAVING",
      "Write reports like 'customers with 3+ orders'"
    ],
    content: `
<p><strong>HAVING</strong> filters groups after aggregation. Use it for conditions on <code>COUNT</code>, <code>SUM</code>, and other aggregates.</p>
<p><strong>Memory hook:</strong> WHERE filters rows; HAVING filters groups.</p>

<h2>Worked examples</h2>
<pre><code>SELECT customer_id, COUNT(*) AS order_count
FROM orders
GROUP BY customer_id
HAVING COUNT(*) >= 3;</code></pre>
<pre><code>SELECT city, COUNT(*) AS customers
FROM customers
WHERE city IS NOT NULL
GROUP BY city
HAVING COUNT(*) > 1
ORDER BY customers DESC;</code></pre>
<pre><code>SELECT product_id, SUM(qty) AS units
FROM order_items
GROUP BY product_id
HAVING SUM(qty) >= 100;</code></pre>

<h2>Try it</h2>
<ol>
<li>Find cities with more than one customer.</li>
<li>Find customers with at least two PAID orders (WHERE + HAVING).</li>
<li>Rewrite a wrong query that put COUNT in WHERE and fix it.</li>
<li>Explain why HAVING can reference aggregate expressions.</li>
</ol>

<h2>Common mistakes</h2>
<ul>
<li>Using HAVING for simple row filters that belong in WHERE (works sometimes, worse plans).</li>
<li>Forgetting GROUP BY when HAVING is present.</li>
<li>Comparing averages without considering NULL inputs to AVG.</li>
</ul>

<div class="callout"><strong>Summary:</strong> HAVING keeps only groups that meet aggregate conditions. Combine with WHERE to filter rows first for clearer, faster queries.</div>
`,
    quiz: {
      q: "HAVING COUNT(*) > 1 finds:",
      options: [
        "Groups with more than one row",
        "Only empty tables",
        "Primary keys",
        "Linux processes"
      ],
      answer: 0
    }
  });

  L("sql28", {
    module: "sql-m06",
    title: "28 Joins",
    level: "Intermediate",
    duration: "50 min",
    objectives: [
      "Explain INNER, LEFT, RIGHT, and FULL joins conceptually",
      "Write JOIN ... ON conditions correctly",
      "Avoid accidental Cartesian products",
      "Build a two-table customer/order report"
    ],
    content: `
<p><strong>Joins</strong> combine rows from two or more tables based on related columns - usually primary key to foreign key.</p>
<p><strong>Why joins matter:</strong> Normalized data lives in multiple tables; useful answers almost always need joins.</p>

<h2>Join types (practical)</h2>
<ul>
<li><strong>INNER JOIN</strong> - only matching pairs.</li>
<li><strong>LEFT JOIN</strong> - all left rows, matching right rows or NULLs.</li>
<li><strong>RIGHT JOIN</strong> - mirror of left (less common in style guides).</li>
<li><strong>FULL OUTER JOIN</strong> - all from both sides (engine support varies).</li>
<li><strong>CROSS JOIN</strong> - every combination (use deliberately).</li>
</ul>

<h2>Worked examples</h2>
<pre><code>SELECT c.name, o.id AS order_id, o.total
FROM customers c
INNER JOIN orders o ON o.customer_id = c.id;</code></pre>
<pre><code>SELECT c.name, o.id AS order_id, o.total
FROM customers c
LEFT JOIN orders o ON o.customer_id = c.id
ORDER BY c.name;</code></pre>
<pre><code>-- Three-table pattern
SELECT c.name, o.id AS order_id, p.name AS product, oi.qty
FROM customers c
JOIN orders o ON o.customer_id = c.id
JOIN order_items oi ON oi.order_id = o.id
JOIN products p ON p.id = oi.product_id;</code></pre>

<h2>Try it</h2>
<ol>
<li>Write an INNER JOIN report of customers and orders.</li>
<li>Write a LEFT JOIN that still shows customers with no orders.</li>
<li>Intentionally omit ON (or use CROSS JOIN) in a lab and observe row explosion - then fix it.</li>
<li>Add a third table into a join chain.</li>
</ol>

<h2>Common mistakes</h2>
<ul>
<li>Missing join condition producing a Cartesian product.</li>
<li>Filtering a LEFT JOIN's right table in WHERE so it secretly becomes INNER.</li>
<li>Joining on names instead of keys.</li>
</ul>

<div class="callout"><strong>Summary:</strong> Joins reconnect related tables. Prefer explicit JOIN ... ON, choose INNER vs LEFT by whether unmatched rows should appear, and always verify grain (row counts).</div>
`,
    quiz: {
      q: "INNER JOIN returns:",
      options: [
        "Only matching rows from both sides",
        "All rows from left only, always",
        "Only schema definitions",
        "Only GRANT results"
      ],
      answer: 0
    }
  });

  L("sql29", {
    module: "sql-m06",
    title: "29 Subqueries",
    level: "Intermediate",
    duration: "45 min",
    objectives: [
      "Write scalar, IN, and correlated subqueries",
      "Know when a JOIN is clearer than a subquery",
      "Use subqueries in WHERE and FROM (derived tables)",
      "Avoid correlated subquery performance traps"
    ],
    content: `
<p>A <strong>subquery</strong> is a query nested inside another statement. It can return a scalar, a list, or a table used in FROM.</p>
<p><strong>Why learn both joins and subqueries?</strong> Some filters read naturally as "where total &gt; average"; others read better as joins.</p>

<h2>Worked examples</h2>
<pre><code>-- Scalar subquery
SELECT id, name, price
FROM products
WHERE price > (SELECT AVG(price) FROM products);</code></pre>
<pre><code>-- IN subquery
SELECT id, name
FROM customers
WHERE id IN (
  SELECT customer_id
  FROM orders
  WHERE total > 100
);</code></pre>
<pre><code>-- Derived table in FROM
SELECT city, AVG(order_count) AS avg_orders
FROM (
  SELECT c.city, c.id, COUNT(o.id) AS order_count
  FROM customers c
  LEFT JOIN orders o ON o.customer_id = c.id
  GROUP BY c.city, c.id
) per_customer
GROUP BY city;</code></pre>

<h2>Try it</h2>
<ol>
<li>Select products priced above the average price.</li>
<li>Select customers who appear in orders via IN.</li>
<li>Rewrite an IN subquery as a JOIN and compare results.</li>
<li>Write a FROM subquery (derived table) that aggregates once, then filters.</li>
</ol>

<h2>Common mistakes</h2>
<ul>
<li>Subquery returns more than one row where a scalar is required.</li>
<li>Correlated subqueries that re-run per row on large sets.</li>
<li>NOT IN with NULLs producing empty results unexpectedly.</li>
</ul>

<div class="callout"><strong>Summary:</strong> Subqueries nest logic cleanly for filters and derived tables. Prefer readability, verify cardinality, and watch correlation costs.</div>
`,
    quiz: {
      q: "A scalar subquery in WHERE price > (...) should return:",
      options: [
        "Exactly one value (one row, one column)",
        "Any number of rows always",
        "Only DDL text",
        "A Linux process id"
      ],
      answer: 0
    }
  });

  L("sql30", {
    module: "sql-m06",
    title: "30 Views",
    level: "Intermediate",
    duration: "40 min",
    objectives: [
      "Create and query views",
      "Explain views as saved SELECT definitions",
      "Use views to simplify and secure column access",
      "Know updatable-view limitations vary by engine"
    ],
    content: `
<p>A <strong>view</strong> is a named stored query. You SELECT from it like a table; the engine runs the underlying SQL (or uses a materialized variant where supported).</p>
<p><strong>Why views?</strong> Reuse complex joins, present a stable API to reports, and hide columns from less privileged users.</p>

<h2>Worked examples</h2>
<pre><code>CREATE VIEW v_customer_orders AS
SELECT c.id AS customer_id, c.name, o.id AS order_id, o.total, o.status
FROM customers c
JOIN orders o ON o.customer_id = c.id;

SELECT name, order_id, total
FROM v_customer_orders
WHERE status = 'PAID';</code></pre>
<pre><code>CREATE VIEW v_paid_revenue_by_customer AS
SELECT customer_id, SUM(total) AS revenue
FROM orders
WHERE status = 'PAID'
GROUP BY customer_id;</code></pre>
<pre><code>-- Replace definition when logic changes (syntax varies)
-- CREATE OR REPLACE VIEW v_customer_orders AS ...
DROP VIEW v_customer_orders;  -- when retiring</code></pre>

<h2>Try it</h2>
<ol>
<li>Create a view joining customers and orders.</li>
<li>Query the view with a WHERE on status.</li>
<li>Create an aggregate view of revenue by customer.</li>
<li>Grant SELECT on a view to a read-only role (if your engine setup allows).</li>
</ol>

<h2>Common mistakes</h2>
<ul>
<li>Stacking views on views until nobody can tune the query.</li>
<li>Assuming every view is updatable.</li>
<li>Forgetting that a non-materialized view still costs the underlying work each time.</li>
</ul>

<div class="callout"><strong>Summary:</strong> Views package SELECT logic for reuse and clarity. Keep them thin enough to understand and tune.</div>
`,
    quiz: {
      q: "A view is best described as:",
      options: [
        "A saved SELECT definition queried like a table",
        "A mandatory physical copy of all disks",
        "A replacement for backups forever",
        "A CSS animation"
      ],
      answer: 0
    }
  });

  L("sql31", {
    module: "sql-m06",
    title: "31 Indexes",
    level: "Intermediate",
    duration: "45 min",
    objectives: [
      "Explain what an index is and why it speeds lookups",
      "Create indexes on filter/join columns",
      "Recognize tradeoffs: faster reads, slower writes, storage",
      "Avoid low-value indexes and over-indexing"
    ],
    content: `
<p>An <strong>index</strong> is a side structure that helps the engine find rows without scanning the whole table - similar to a book index.</p>
<p><strong>Why indexes matter:</strong> The difference between 5 ms and 5 seconds on a hot query is often an index (or a missing one).</p>

<h2>When indexes help</h2>
<ul>
<li>WHERE equality/range on selective columns</li>
<li>JOIN keys (FK columns)</li>
<li>ORDER BY that can be satisfied by an index (sometimes)</li>
<li>UNIQUE constraints (implemented via unique indexes)</li>
</ul>

<h2>Worked examples</h2>
<pre><code>CREATE INDEX idx_orders_customer_id
  ON orders (customer_id);

CREATE INDEX idx_customers_city
  ON customers (city);

SELECT id, total
FROM orders
WHERE customer_id = 42;</code></pre>
<pre><code>-- Composite index: useful when filters share a left prefix
CREATE INDEX idx_orders_status_created
  ON orders (status, created_at);

SELECT id, total
FROM orders
WHERE status = 'PAID'
  AND created_at >= '2026-01-01';</code></pre>
<pre><code>-- Unique index / constraint
CREATE UNIQUE INDEX uq_customers_email
  ON customers (email);</code></pre>

<h2>Tradeoffs</h2>
<ul>
<li>Writes (INSERT/UPDATE/DELETE) maintain indexes - more indexes can slow writes.</li>
<li>Indexes use disk and memory.</li>
<li>Unused indexes still cost maintenance.</li>
</ul>

<h2>Try it</h2>
<ol>
<li>Create an index on a foreign key column.</li>
<li>Run a selective WHERE before and after (use EXPLAIN if available).</li>
<li>Create a composite index and query using the leading column.</li>
<li>List indexes you would NOT add on a tiny lookup table.</li>
</ol>

<h2>Common mistakes</h2>
<ul>
<li>Indexing every column "just in case."</li>
<li>Functions on columns in WHERE that prevent index use (<code>WHERE YEAR(col)=2026</code>).</li>
<li>Expecting indexes to help <code>LIKE '%term'</code> leading-wildcard searches.</li>
</ul>

<div class="callout"><strong>Summary:</strong> Indexes accelerate targeted reads and joins at the cost of write overhead. Index proven hot paths - measure with EXPLAIN.</div>
`,
    quiz: {
      q: "CREATE INDEX on customer_id mainly helps:",
      options: [
        "JOIN/WHERE on customer_id",
        "Only changing column colors",
        "Dropping the database",
        "Sending SMTP mail"
      ],
      answer: 0
    }
  });

  L("sql32", {
    module: "sql-m06",
    title: "32 Stored Procedures",
    level: "Intermediate",
    duration: "45 min",
    objectives: [
      "Explain stored procedures as server-side routines",
      "Create and call a simple procedure (dialect-aware)",
      "List pros/cons vs application code",
      "Keep business logic placement intentional"
    ],
    content: `
<p>A <strong>stored procedure</strong> is a named routine stored in the database that can run multiple SQL statements, accept parameters, and optionally return results.</p>
<p><strong>Why they exist:</strong> encapsulate multi-step operations close to the data, reduce round-trips, and centralize some logic - with tradeoffs for portability and versioning.</p>

<h2>Portability warning</h2>
<p>Procedure syntax differs sharply across PostgreSQL, MySQL, and SQL Server. Learn concepts here; check your engine docs for exact CREATE PROCEDURE syntax.</p>

<h2>Worked examples</h2>
<pre><code>-- MySQL-shaped illustration
DELIMITER //
CREATE PROCEDURE add_product(IN p_name VARCHAR(100), IN p_price DECIMAL(10,2))
BEGIN
  INSERT INTO products (name, price) VALUES (p_name, p_price);
END //
DELIMITER ;

CALL add_product('Marker', 1.50);</code></pre>
<pre><code>-- PostgreSQL function-as-routine style is common; procedures exist too
-- Conceptual multi-step body:
-- BEGIN
--   UPDATE inventory ...
--   INSERT INTO orders ...
-- COMMIT handled by caller or procedure depending on design
SELECT 'Use engine docs for CREATE PROCEDURE details' AS note;</code></pre>
<pre><code>-- Call pattern (varies)
-- CALL transfer_funds(1, 2, 50.00);</code></pre>

<h2>Pros and cons</h2>
<ul>
<li><strong>Pros:</strong> fewer round-trips, centralized rules, can tighten permissions (EXECUTE only).</li>
<li><strong>Cons:</strong> harder CI/testing for some teams, vendor lock-in, logic hidden from app repos if mismanaged.</li>
</ul>

<h2>Try it</h2>
<ol>
<li>Read your engine's CREATE PROCEDURE (or equivalent) docs for 10 minutes.</li>
<li>Write a procedure that inserts a product (or a PostgreSQL function doing the same).</li>
<li>Call it twice with different parameters.</li>
<li>Argue where checkout logic should live for your team: app vs DB.</li>
</ol>

<h2>Common mistakes</h2>
<ul>
<li>Copy-pasting MySQL procedure syntax into PostgreSQL unchanged.</li>
<li>Putting all business logic in procedures with no source control.</li>
<li>Huge procedures that nobody can test.</li>
</ul>

<div class="callout"><strong>Summary:</strong> Stored procedures package multi-statement server logic. Use them when the benefits outweigh dialect and workflow costs.</div>
`,
    quiz: {
      q: "Stored procedures are:",
      options: [
        "Named routines stored in the database",
        "Only CSS files",
        "Operating system kernels",
        "Mandatory replacements for SELECT"
      ],
      answer: 0
    }
  });

  L("sql33", {
    module: "sql-m06",
    title: "33 Functions",
    level: "Intermediate",
    duration: "40 min",
    objectives: [
      "Use built-in scalar functions (string, date, math)",
      "Contrast functions with procedures at a high level",
      "Write expressions in SELECT and WHERE carefully",
      "Know deterministic vs non-deterministic impacts on indexes"
    ],
    content: `
<p>SQL <strong>functions</strong> transform values: uppercasing text, computing lengths, extracting years, rounding numbers. Engines also allow user-defined functions (UDFs).</p>
<p><strong>Why practice them?</strong> Reports and ETL use functions constantly - but wrapping indexed columns in functions can disable index use.</p>

<h2>Worked examples</h2>
<pre><code>SELECT
  id,
  UPPER(name) AS name_upper,
  LENGTH(name) AS name_len,
  ROUND(price, 1) AS price_1dp
FROM products;</code></pre>
<pre><code>SELECT id, name, launched
FROM products
WHERE launched >= DATE '2026-01-01'
  AND launched &lt; DATE '2027-01-01';</code></pre>
<pre><code>-- Prefer range on bare columns over wrapping in YEAR(col) when indexing matters
-- Weaker for indexes in many engines:
-- WHERE YEAR(launched) = 2026

SELECT COALESCE(phone, 'N/A') AS phone_display
FROM customers;</code></pre>

<h2>Procedures vs functions (typical distinction)</h2>
<ul>
<li><strong>Functions</strong> - often return a value; usable in expressions.</li>
<li><strong>Procedures</strong> - run a process; invoked with CALL; side effects common.</li>
</ul>
<p>Exact rules differ by engine (PostgreSQL especially blurs lines with powerful functions).</p>

<h2>Try it</h2>
<ol>
<li>Select UPPER/LOWER of customer names.</li>
<li>Use COALESCE to replace NULL phones.</li>
<li>Filter a date range without YEAR(column) wrapping.</li>
<li>Look up one string function unique to your engine.</li>
</ol>

<h2>Common mistakes</h2>
<ul>
<li>Applying functions to indexed columns in WHERE unnecessarily.</li>
<li>Assuming function names are identical across dialects (<code>LENGTH</code> vs <code>LEN</code>).</li>
<li>Hidden non-deterministic functions in unexpected places.</li>
</ul>

<div class="callout"><strong>Summary:</strong> Functions reshape values in queries. Learn portable favorites (COALESCE, UPPER, ROUND) and keep index-friendly predicates when performance matters.</div>
`,
    quiz: {
      q: "COALESCE(phone, 'N/A') returns:",
      options: [
        "phone if not NULL, otherwise 'N/A'",
        "Always NULL",
        "Always drops the table",
        "Only primary keys"
      ],
      answer: 0
    }
  });

  L("sql34", {
    module: "sql-m06",
    title: "34 Triggers",
    level: "Advanced",
    duration: "45 min",
    objectives: [
      "Define triggers as automatic reactions to table events",
      "Describe BEFORE/AFTER INSERT/UPDATE/DELETE",
      "Write a simple auditing trigger pattern (dialect-aware)",
      "Use triggers sparingly and document them"
    ],
    content: `
<p>A <strong>trigger</strong> is procedural code that runs automatically when a specified table event occurs (INSERT, UPDATE, DELETE) - BEFORE or AFTER the event, depending on the engine.</p>
<p><strong>Why triggers?</strong> Auditing, derived column maintenance, enforcing complex rules - but hidden logic can surprise developers.</p>

<h2>Worked examples</h2>
<pre><code>-- Conceptual audit table
CREATE TABLE products_audit (
  audit_id   INT PRIMARY KEY,
  product_id INT NOT NULL,
  action     VARCHAR(10) NOT NULL,
  changed_at TIMESTAMP NOT NULL
);</code></pre>
<pre><code>-- MySQL-shaped illustration
DELIMITER //
CREATE TRIGGER trg_products_ai
AFTER INSERT ON products
FOR EACH ROW
BEGIN
  INSERT INTO products_audit (product_id, action, changed_at)
  VALUES (NEW.id, 'INSERT', NOW());
END //
DELIMITER ;</code></pre>
<pre><code>-- PostgreSQL uses CREATE FUNCTION + CREATE TRIGGER
-- Keep logic tiny: prefer app transactions for complex workflows
SELECT 'Document every trigger in your schema README' AS advice;</code></pre>

<h2>Try it</h2>
<ol>
<li>Create an audit table for a base table you care about.</li>
<li>Add an AFTER INSERT trigger (per your engine docs).</li>
<li>Insert a row and confirm the audit row appears.</li>
<li>List one rule you would NOT enforce with a trigger (and why).</li>
</ol>

<h2>Common mistakes</h2>
<ul>
<li>Silent triggers that modify data developers did not expect.</li>
<li>Trigger chains that cascade into hard-to-debug loops.</li>
<li>Putting heavy network calls inside triggers.</li>
</ul>

<div class="callout"><strong>Summary:</strong> Triggers automate reactions to data changes. Keep them small, documented, and reserved for cross-cutting concerns like audit trails.</div>
`,
    quiz: {
      q: "A trigger typically runs:",
      options: [
        "Automatically on specified table events",
        "Only when the OS reboots",
        "Instead of having tables",
        "Only during CSS paint"
      ],
      answer: 0
    }
  });

  L("sql35", {
    module: "sql-m06",
    title: "35 Transactions",
    level: "Intermediate",
    duration: "50 min",
    objectives: [
      "Explain ACID properties in plain language",
      "Apply BEGIN/COMMIT/ROLLBACK to real multi-step work",
      "Understand isolation at a beginner-friendly level",
      "Avoid long transactions that hold locks"
    ],
    content: `
<p>A <strong>transaction</strong> groups SQL statements into one atomic unit: all commit or all roll back. This lesson deepens TCL with ACID and practical patterns.</p>
<p><strong>ACID (practical):</strong></p>
<ul>
<li><strong>Atomicity</strong> - all or nothing.</li>
<li><strong>Consistency</strong> - constraints remain satisfied after commit.</li>
<li><strong>Isolation</strong> - concurrent transactions do not trample each other (levels vary).</li>
<li><strong>Durability</strong> - committed data survives crashes (within engine guarantees).</li>
</ul>

<h2>Worked examples</h2>
<pre><code>BEGIN;
UPDATE accounts SET balance = balance - 100 WHERE id = 1 AND balance >= 100;
UPDATE accounts SET balance = balance + 100 WHERE id = 2;
-- Application should check row counts / constraints
COMMIT;</code></pre>
<pre><code>BEGIN;
UPDATE inventory SET qty = qty - 1 WHERE product_id = 10 AND qty > 0;
INSERT INTO orders (id, product_id, qty) VALUES (9001, 10, 1);
-- If inventory update affected 0 rows:
ROLLBACK;</code></pre>
<pre><code>BEGIN;
UPDATE accounts SET balance = balance - 20 WHERE id = 1;
SAVEPOINT sp1;
UPDATE accounts SET balance = balance - 20 WHERE id = 1;
ROLLBACK TO SAVEPOINT sp1;
COMMIT;</code></pre>

<h2>Try it</h2>
<ol>
<li>Implement a funds transfer with COMMIT.</li>
<li>Force a failure path and ROLLBACK; verify balances.</li>
<li>Use SAVEPOINT in a three-step script.</li>
<li>Time how long your transaction stays open - keep it short.</li>
</ol>

<h2>Common mistakes</h2>
<ul>
<li>Reading user input / calling external APIs while holding open transactions.</li>
<li>Ignoring isolation anomalies (dirty reads, etc.) on busy systems.</li>
<li>Autocommit single statements when a business operation needs multiple.</li>
</ul>

<div class="callout"><strong>Summary:</strong> Transactions protect multi-step correctness. Keep them short, verify outcomes, and commit or roll back deliberately.</div>
`,
    quiz: {
      q: "Transaction COMMIT:",
      options: [
        "Makes changes permanent",
        "Undoes all work always",
        "Drops the database",
        "Creates an OS user"
      ],
      answer: 0
    }
  });

  L("sql36", {
    module: "sql-m07",
    title: "36 Performance Tuning",
    level: "Advanced",
    duration: "50 min",
    objectives: [
      "Read a basic EXPLAIN/plan idea",
      "Apply index and SELECT-list improvements",
      "Avoid common anti-patterns that kill performance",
      "Measure before/after changes"
    ],
    content: `
<p><strong>Performance tuning</strong> makes correct queries fast enough under real data volumes. Start with measurement, not guesswork.</p>
<p><strong>Workflow:</strong> reproduce slowness - capture plan (EXPLAIN) - fix the biggest cost - remeasure.</p>

<h2>High-impact basics</h2>
<ul>
<li>Index join/filter columns that are selective.</li>
<li>Select only needed columns (avoid SELECT * on wide tables in hot paths).</li>
<li>Filter early; reduce rows before expensive joins when possible.</li>
<li>Prefer sargable predicates (bare columns vs wrapped functions).</li>
</ul>

<h2>Worked examples</h2>
<pre><code>-- Before: potential sequential scan on huge orders
EXPLAIN
SELECT id, total
FROM orders
WHERE customer_id = 42;

CREATE INDEX idx_orders_customer_id ON orders (customer_id);

EXPLAIN
SELECT id, total
FROM orders
WHERE customer_id = 42;</code></pre>
<pre><code>-- Prefer needed columns
SELECT id, total, status
FROM orders
WHERE status = 'PAID';

-- Instead of:
-- SELECT * FROM orders WHERE status = 'PAID';</code></pre>
<pre><code>-- Sargable range instead of wrapping
SELECT id, order_date, total
FROM orders
WHERE order_date >= '2026-01-01'
  AND order_date &lt;  '2027-01-01';

-- Often worse for indexes:
-- WHERE YEAR(order_date) = 2026</code></pre>

<h2>Try it</h2>
<ol>
<li>Run EXPLAIN (or EXPLAIN ANALYZE where available) on a slow-ish query.</li>
<li>Add an index and compare plans.</li>
<li>Rewrite a SELECT * hot query to an explicit list.</li>
<li>Rewrite a YEAR(col) filter as a range predicate.</li>
</ol>

<h2>Common mistakes</h2>
<ul>
<li>Adding 20 indexes after one slow query without measuring writes.</li>
<li>Tuning on tiny toy data that hides real plans.</li>
<li>Caching incorrect results instead of fixing the query.</li>
</ul>

<div class="callout"><strong>Summary:</strong> Tune with evidence. Indexes, lean projections, and sargable filters fix most beginner-to-intermediate performance issues.</div>
`,
    quiz: {
      q: "SELECT * in a hot API path is often:",
      options: [
        "Always best",
        "Wasteful; prefer needed columns",
        "Required by law",
        "The only way to use indexes"
      ],
      answer: 1
    }
  });

  L("sql37", {
    module: "sql-m07",
    title: "37 Database Design",
    level: "Advanced",
    duration: "50 min",
    objectives: [
      "Gather entities, attributes, and relationships",
      "Produce a simple logical then physical schema",
      "Choose keys, types, and constraints deliberately",
      "Plan for migrations and evolution"
    ],
    content: `
<p><strong>Database design</strong> turns a business problem into tables, keys, and constraints that stay understandable as the product grows.</p>
<p><strong>Process sketch:</strong> understand use cases - list entities - relate them - normalize - choose types/constraints - index for access paths - document.</p>

<h2>Design checklist</h2>
<ul>
<li>What questions must the DB answer quickly?</li>
<li>What must never be duplicated incorrectly?</li>
<li>What history must we keep (prices, addresses)?</li>
<li>Who can read/write each table?</li>
</ul>

<h2>Worked examples</h2>
<pre><code>-- Mini shop logical model
-- customers(id, name, email)
-- products(id, sku, name, price)
-- orders(id, customer_id, ordered_at, status)
-- order_items(order_id, product_id, qty, unit_price)

CREATE TABLE customers (
  id    INT PRIMARY KEY,
  name  VARCHAR(120) NOT NULL,
  email VARCHAR(150) NOT NULL UNIQUE
);

CREATE TABLE products (
  id    INT PRIMARY KEY,
  sku   VARCHAR(40) NOT NULL UNIQUE,
  name  VARCHAR(120) NOT NULL,
  price DECIMAL(10,2) NOT NULL CHECK (price >= 0)
);</code></pre>
<pre><code>CREATE TABLE orders (
  id          INT PRIMARY KEY,
  customer_id INT NOT NULL REFERENCES customers(id),
  ordered_at  TIMESTAMP NOT NULL,
  status      VARCHAR(20) NOT NULL
);

CREATE TABLE order_items (
  order_id    INT NOT NULL REFERENCES orders(id),
  product_id  INT NOT NULL REFERENCES products(id),
  qty         INT NOT NULL CHECK (qty > 0),
  unit_price  DECIMAL(10,2) NOT NULL,
  PRIMARY KEY (order_id, product_id)
);</code></pre>
<pre><code>-- Access-path indexes from expected queries
CREATE INDEX idx_orders_customer_id ON orders (customer_id);
CREATE INDEX idx_orders_ordered_at ON orders (ordered_at);</code></pre>

<h2>Try it</h2>
<ol>
<li>Design tables for a library (members, books, loans).</li>
<li>Mark PKs and FKs on your diagram.</li>
<li>Write CREATE TABLE statements for two entities.</li>
<li>List three queries the design must support and indexes they need.</li>
</ol>

<h2>Common mistakes</h2>
<ul>
<li>Designing only screens, not entities.</li>
<li>No history strategy when prices or addresses change.</li>
<li>Skipping constraints because "the app will handle it."</li>
</ul>

<div class="callout"><strong>Summary:</strong> Good design starts from business questions and relationships, then encodes them with keys, types, constraints, and indexes you can evolve.</div>
`,
    quiz: {
      q: "A solid design process usually starts with:",
      options: [
        "Random columns with no keys",
        "Understanding entities, relationships, and questions to answer",
        "Only picking GUI themes",
        "Disabling constraints forever"
      ],
      answer: 1
    }
  });

  L("sql39", {
    module: "sql-m08",
    title: "39 Final Assessment",
    level: "Assessment",
    duration: "90 min",
    objectives: [
      "Complete 60 questions in 90 minutes",
      "Review your score card",
      "Identify weak topics for review"
    ],
    content: `
<p>This is your <strong>SQL Mastery Final Assessment</strong>.</p>
<ul>
<li><strong>60 questions</strong> covering lessons 01-38</li>
<li><strong>90 minutes</strong> timed</li>
<li>Multiple choice</li>
<li>Score card at the end (score, %, pass/fail, review)</li>
</ul>
<p>Passing score: <strong>70%</strong> (42/60 or higher).</p>
<p><a class="btn btn-primary" href="#/course/sql/assessment" data-nav>Start Final Assessment</a></p>
<div class="callout"><strong>Rules:</strong> Timer auto-submits at 0:00. You can submit early. Results save in this browser.</div>
`,
    quiz: null
  });

  const assessmentQuestions = [
    { q: "SQL stands for?", options: ["Structured Query Language", "Simple Query List", "Server Queue Logic", "Sequential Queue Language"], answer: 0 },
    { q: "Which engine is embedded as a file DB?", options: ["Oracle RAC only", "SQLite", "Only Redis Cluster", "Photoshop"], answer: 1 },
    { q: "Default PostgreSQL port?", options: ["3306", "5432", "1521", "27017"], answer: 1 },
    { q: "Default MySQL port?", options: ["5432", "3306", "6379", "1433"], answer: 1 },
    { q: "Which is DDL?", options: ["SELECT", "CREATE TABLE", "COMMIT", "GRANT"], answer: 1 },
    { q: "Which is DML?", options: ["ALTER TABLE", "INSERT INTO", "REVOKE", "CREATE INDEX"], answer: 1 },
    { q: "Which is mainly DQL?", options: ["DROP", "SELECT", "GRANT", "ROLLBACK"], answer: 1 },
    { q: "COMMIT belongs to?", options: ["DQL", "TCL", "HTML", "CSS"], answer: 1 },
    { q: "GRANT belongs to?", options: ["DML", "DCL", "DQL", "TCL"], answer: 1 },
    { q: "A primary key must be?", options: ["Null and duplicate OK", "Unique and NOT NULL", "Float only", "Unindexed always"], answer: 1 },
    { q: "Foreign keys enforce?", options: ["UI themes", "Referential integrity", "DNS only", "CPU affinity"], answer: 1 },
    { q: "NOT NULL means?", options: ["Value optional", "Value required", "Always zero", "Always unique"], answer: 1 },
    { q: "Best type for money?", options: ["FLOAT", "DECIMAL/NUMERIC", "BOOLEAN", "BLOB of images"], answer: 1 },
    { q: "Find NULL values with?", options: ["WHERE col = NULL", "WHERE col IS NULL", "WHERE col == NONE", "WHERE col EQUALS EMPTY"], answer: 1 },
    { q: "ORDER BY price DESC sorts?", options: ["Low to high", "High to low", "Random only", "By table name"], answer: 1 },
    { q: "GROUP BY city with COUNT(*) returns?", options: ["One number only always", "A count per city", "Only PKs", "Grants"], answer: 1 },
    { q: "HAVING filters?", options: ["Rows before join only", "Groups after aggregation", "Only indexes", "OS users"], answer: 1 },
    { q: "INNER JOIN returns?", options: ["Only matching rows from both sides", "All left rows always", "Schema only", "GRANT results"], answer: 0 },
    { q: "LEFT JOIN keeps?", options: ["All left rows, matches or NULL on right", "Only right matches", "No rows ever", "Only views"], answer: 0 },
    { q: "A view is?", options: ["A saved SELECT queried like a table", "A disk partition always", "A backup replacement forever", "A CSS rule"], answer: 0 },
    { q: "An index mainly helps?", options: ["Faster targeted lookups/joins", "Slower SELECT always", "Deleting the OS", "SMTP"], answer: 0 },
    { q: "Normalization aims to?", options: ["Increase redundancy", "Reduce redundancy and anomalies", "Replace SQL with CSS", "Disable keys"], answer: 1 },
    { q: "TRUNCATE is closest to?", options: ["DDL-ish emptying of a table (destructive)", "SELECT only", "GRANT only", "A GUI theme"], answer: 0 },
    { q: "RDBMS stands for?", options: ["Random Data Binary Memory Store", "Relational Database Management System", "Remote Desktop Backup Main Server", "Rapid Document Blob Media System"], answer: 1 },
    { q: "SQL is best described as?", options: ["Markup like HTML", "Declarative language for relational data", "CPU assembly", "CSS framework"], answer: 1 },
    { q: "Without ORDER BY, row order is?", options: ["Always insertion order", "Not guaranteed", "Always A-Z", "Always reverse PK"], answer: 1 },
    { q: "SELECT specific columns is called?", options: ["Projection", "Replication", "Fragmentation only", "Compilation"], answer: 0 },
    { q: "psql is?", options: ["A CSS linter", "PostgreSQL interactive terminal", "MongoDB shell only", "An OS kernel"], answer: 1 },
    { q: "CREATE INDEX on customer_id helps?", options: ["JOIN/WHERE on customer_id", "Only CHANGE COLUMN colors", "Dropping DB", "SMTP"], answer: 0 },
    { q: "SELECT * in hot path?", options: ["Always best", "Often wasteful; prefer needed columns", "Required by law", "Disables indexes"], answer: 1 },
    { q: "WHERE YEAR(col)=2026 downside?", options: ["May prevent index use", "Always faster", "Required syntax", "Drops table"], answer: 0 },
    { q: "SAVEPOINT allows?", options: ["Partial rollback inside transaction", "Creating OS users", "Dropping cluster", "CSS animation"], answer: 0 },
    { q: "DCL example?", options: ["SELECT 1", "GRANT SELECT ON t TO u", "INSERT INTO t", "COMMIT"], answer: 1 },
    { q: "Relational data stored mainly as?", options: ["Tables of rows/columns", "Only graphs", "Only raw photos", "Only CSS"], answer: 0 },
    { q: "Spreadsheet vs DB: DBs better for?", options: ["Fonts", "Concurrent integrity and scale", "Clipart", "Animations"], answer: 1 },
    { q: "INNER JOIN ON condition missing?", options: ["May produce Cartesian product", "Always errors in all engines", "Deletes data", "Creates PK"], answer: 0 },
    { q: "HAVING COUNT(*) > 1 finds?", options: ["Groups with more than one row", "Only empty tables", "Primary keys", "Linux processes"], answer: 0 },
    { q: "View benefits include?", options: ["Reuse and simplifying queries", "Replacing need for backups forever", "Disabling SQL", "Removing ACID"], answer: 0 },
    { q: "Transaction COMMIT?", options: ["Makes changes permanent", "Undoes all", "Drops DB", "Creates role"], answer: 0 },
    { q: "Interview: UNIQUE vs PK?", options: ["PK identifies row and is unique/NOT NULL; UNIQUE rules differ (NULLs/count)", "They are identical always", "UNIQUE is DDL only for views", "PK cannot be integer"], answer: 0 },
    { q: "Final goal of SQL Mastery labs?", options: ["Write correct, safe, efficient SQL with understanding", "Memorize only GUI clicks", "Avoid SELECT forever", "Replace networking"], answer: 0 },
    { q: "CHECK (price >= 0) is a?", options: ["Constraint", "DCL role", "GUI theme", "Network protocol"], answer: 0 },
    { q: "DELETE without WHERE typically?", options: ["Removes all rows in the table", "Removes one random index only", "Creates a database", "Grants privileges"], answer: 0 },
    { q: "FOREIGN KEY child insert to missing parent?", options: ["Should be rejected", "Always succeeds silently", "Formats the disk", "Creates CSS"], answer: 0 },
    { q: "COALESCE(a, b) returns?", options: ["First non-NULL among args", "Always NULL", "Always drops table", "Only the second arg"], answer: 0 },
    { q: "Stored procedure is?", options: ["Named routine stored in the database", "A mandatory spreadsheet", "An OS kernel module", "A CSS file"], answer: 0 },
    { q: "Trigger typically runs?", options: ["Automatically on table events", "Only on reboot", "Instead of tables", "Only during paint"], answer: 0 },
    { q: "ACID Atomicity means?", options: ["All statements commit or none do", "Rows are colorful", "Indexes are optional forever", "SQL is HTML"], answer: 0 },
    { q: "EXPLAIN is used to?", options: ["Inspect a query plan", "Drop all indexes always", "Send email", "Compile Java"], answer: 0 },
    { q: "1NF requires?", options: ["Atomic values / no repeating groups in cells", "Mandatory MongoDB", "No primary keys", "Only FLOAT money"], answer: 0 },
    { q: "LIMIT 5 after ORDER BY typically returns?", options: ["Top 5 rows of that ordered set", "Five random databases", "Five grants", "Five triggers only"], answer: 0 },
    { q: "WHERE filters which stage?", options: ["Rows (before HAVING on groups)", "Only after ORDER BY always", "Only DDL", "Only users"], answer: 0 },
    { q: "Composite primary key means?", options: ["PK made of multiple columns", "Two databases merged", "Only UNIQUE emails", "A GUI layout"], answer: 0 },
    { q: "Least privilege means?", options: ["Grant only needed permissions", "Grant ALL always", "Disable logins", "Drop schemas weekly"], answer: 0 },
    { q: "Scalar subquery should return?", options: ["One value (one row, one column)", "Unlimited rows always", "Only DDL text", "A process id"], answer: 0 },
    { q: "Anti-join pattern customers with no orders?", options: ["LEFT JOIN ... WHERE right key IS NULL", "INNER JOIN only", "GRANT only", "TRUNCATE only"], answer: 0 },
    { q: "UNIQUE constraint prevents?", options: ["Duplicate values (NULL rules vary)", "All SELECTs", "All indexes", "Transactions"], answer: 0 },
    { q: "Denormalization is?", options: ["Intentional redundancy for speed/simplicity sometimes", "Always a bug", "Only for spreadsheets", "Disabling SQL"], answer: 0 },
    { q: "Migration-friendly ALTER often?", options: ["Add nullable column, backfill, then tighten", "DROP DATABASE first always", "Skip constraints forever", "Use SELECT * only"], answer: 0 },
    { q: "Cartesian product risk comes from?", options: ["Join without proper condition / CROSS JOIN", "Using PRIMARY KEY", "Using COMMIT", "Using VARCHAR"], answer: 0 }
  ];

  window.FORGE.register({
    id: "sql",
    order: 1,
    title: "SQL Mastery",
    shortTitle: "SQL",
    tagline: "39 clear topics with examples - from databases to final assessment",
    level: "Beginner to Advanced",
    accent: "#6aa8ff",
    duration: "20+ hrs",
    description: "Complete SQL Mastery: databases, SQL basics, installs (PostgreSQL, SQLite, MySQL), tables/rows/columns/types/constraints/keys, normalization, DDL/DML/DQL/TCL/DCL, querying, joins, views, indexes, routines, transactions, tuning, design, interviews, and a timed final assessment.",
    audience: "Beginners to job-ready SQL practitioners",
    modules: [
      { id: "sql-m01", title: "Foundations", lessonIds: ["sql01","sql02","sql03","sql04"] },
      { id: "sql-m02", title: "Install & Tools", lessonIds: ["sql05","sql06","sql07","sql08"] },
      { id: "sql-m03", title: "Data Model Basics", lessonIds: ["sql09","sql10","sql11","sql12","sql13","sql14","sql15","sql16","sql17"] },
      { id: "sql-m04", title: "SQL Language Families", lessonIds: ["sql18","sql19","sql20","sql21","sql22"] },
      { id: "sql-m05", title: "Query Essentials", lessonIds: ["sql23","sql24","sql25","sql26","sql27"] },
      { id: "sql-m06", title: "Joins & Database Objects", lessonIds: ["sql28","sql29","sql30","sql31","sql32","sql33","sql34","sql35"] },
      { id: "sql-m07", title: "Professional Skills", lessonIds: ["sql36","sql37"] },
      { id: "sql-m08", title: "Capstone", lessonIds: ["sql39"] }
    ],
    lessons,
    labs: [
      { id: "sql-lab01", title: "Install PostgreSQL & verify", lesson: "sql05", steps: "Install Postgres, connect with psql, run SELECT version();" },
      { id: "sql-lab02", title: "SQLite first database", lesson: "sql06", steps: "Create ashovix.db, CREATE TABLE, INSERT, SELECT." },
      { id: "sql-lab03", title: "MySQL practice schema", lesson: "sql07", steps: "Create database ashovix and a customers table." },
      { id: "sql-lab04", title: "Keys & constraints", lesson: "sql15", steps: "Build customers/orders with PK/FK and prove FK rejection." },
      { id: "sql-lab05", title: "Joins report", lesson: "sql28", steps: "Write INNER and LEFT join reports across customers and orders." },
      { id: "sql-lab06", title: "Transaction transfer", lesson: "sql35", steps: "Transfer funds with BEGIN/COMMIT and demonstrate ROLLBACK." },
      { id: "sql-lab07", title: "EXPLAIN before/after index", lesson: "sql36", steps: "Capture EXPLAIN, add index, compare plan." }
    ],
    assessment: {
      id: "sql-final",
      title: "SQL Mastery Final Assessment",
      durationMinutes: 90,
      passPercent: 70,
      questionCount: 60,
      questions: assessmentQuestions
    }
  });
})();
