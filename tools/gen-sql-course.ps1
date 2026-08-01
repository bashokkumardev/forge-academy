# Generates js/data/course-sql.js - full SQL Mastery curriculum + 60Q assessment
$ErrorActionPreference = 'Stop'
$out = Join-Path (Split-Path $PSScriptRoot -Parent) 'js\data\course-sql.js'

function Esc([string]$s) {
  if ($null -eq $s) { return '' }
  return ($s -replace '\\', '\\' -replace '`', '\`' -replace '\$', '\$')
}

$topics = @(
  @{ n=1;  t='Introduction to Databases'; m='sql-m01'; d='25 min'; lvl='Beginner'
    o=@('Define what a database is','Contrast files vs databases','List common database types')
    body=@'
<p>A <strong>database</strong> is an organized collection of data that a computer program (the database engine) can store, find, update, and protect efficiently.</p>
<h2>Why not just use files?</h2>
<div class="table-wrap"><table>
<thead><tr><th>Files / folders</th><th>Database</th></tr></thead>
<tbody>
<tr><td>Hard to query across many files</td><td>Powerful query language (SQL)</td></tr>
<tr><td>Easy to corrupt with concurrent writes</td><td>Transactions & locking</td></tr>
<tr><td>Weak consistency rules</td><td>Constraints, keys, types</td></tr>
<tr><td>Security is ad-hoc</td><td>Users, roles, privileges</td></tr>
</tbody></table></div>
<h2>Common database types</h2>
<ul>
<li><strong>Relational (RDBMS)</strong> - tables with rows/columns (PostgreSQL, MySQL, SQL Server, Oracle, Db2, SQLite).</li>
<li><strong>Document</strong> - JSON-like documents (MongoDB).</li>
<li><strong>Key-value</strong> - fast lookups (Redis).</li>
<li><strong>Wide-column / graph</strong> - specialized models for scale or relationships.</li>
</ul>
<h2>Example mental model</h2>
<pre><code>Database: ashovix_shop
  |- Table: customers
        |- Row: id=1, name='Asha', city='Pune'
        |- Row: id=2, name='Dev',  city='Chennai'</code></pre>
<div class="callout"><strong>Key idea:</strong> Databases exist so many users and apps can share correct data safely - not just store bytes on disk.</div>
'@
    q='What is the main job of a database engine?'; opts=@('Only draw charts','Store, query, update, and protect data reliably','Compile Java code','Replace operating systems'); a=1 }

  @{ n=2;  t='What is SQL?'; m='sql-m01'; d='25 min'; lvl='Beginner'
    o=@('Define SQL','Explain declarative style','Name major statement families')
    body=@'
<p><strong>SQL</strong> (Structured Query Language) is the standard language for working with relational databases. You describe <em>what</em> you want; the engine decides <em>how</em>.</p>
<h2>SQL is declarative</h2>
<pre><code>-- You say WHAT: customers in Pune
SELECT name, email
FROM customers
WHERE city = 'Pune';

-- You do NOT write a loop over files</code></pre>
<h2>Statement families</h2>
<ul>
<li><strong>DDL</strong> - create/alter structure (<code>CREATE TABLE</code>)</li>
<li><strong>DML</strong> - change data (<code>INSERT</code>, <code>UPDATE</code>, <code>DELETE</code>)</li>
<li><strong>DQL</strong> - read data (<code>SELECT</code>)</li>
<li><strong>TCL</strong> - transactions (<code>COMMIT</code>, <code>ROLLBACK</code>)</li>
<li><strong>DCL</strong> - permissions (<code>GRANT</code>, <code>REVOKE</code>)</li>
</ul>
<h2>Hello, SQL</h2>
<pre><code>SELECT 'Ashovix Labs' AS academy, 2026 AS year;</code></pre>
<div class="callout"><strong>Portable rule:</strong> Learn ANSI SQL first. Dialects (Postgres, MySQL, SQL Server) differ at the edges.</div>
'@
    q='SQL is best described as:'; opts=@('A markup language like HTML','A declarative language for relational data','A CPU assembly language','A CSS framework'); a=1 }

  @{ n=3;  t='Database vs Spreadsheet'; m='sql-m01'; d='20 min'; lvl='Beginner'
    o=@('Compare spreadsheets and databases','Know when to choose each')
    body=@'
<p>Spreadsheets (Excel/Sheets) are great for personal analysis. Databases are built for shared, large, concurrent, structured work.</p>
<div class="table-wrap"><table>
<thead><tr><th>Spreadsheets</th><th>Databases</th></tr></thead>
<tbody>
<tr><td>One user edits easily</td><td>Many users/apps at once</td></tr>
<tr><td>Formulas in cells</td><td>SQL queries & constraints</td></tr>
<tr><td>Weak typing / mixed cells</td><td>Strict data types</td></tr>
<tr><td>Breaks at tens of thousands of rows</td><td>Handles millions+ with indexes</td></tr>
<tr><td>Hard to enforce relationships</td><td>Foreign keys & joins</td></tr>
</tbody></table></div>
<h2>Example</h2>
<pre><code>-- Spreadsheet: filter column City = Pune manually
-- Database: reusable, auditable query
SELECT * FROM customers WHERE city = 'Pune';</code></pre>
<div class="callout"><strong>Rule of thumb:</strong> If multiple systems must share correct data, use a database.</div>
'@
    q='Databases beat spreadsheets mainly when you need:'; opts=@('Fancier fonts','Multi-user integrity, scale, and relationships','More colors','Offline drawing tools'); a=1 }

  @{ n=4;  t='What is RDBMS?'; m='sql-m01'; d='25 min'; lvl='Beginner'
    o=@('Define RDBMS','List popular engines','Explain relational model basics')
    body=@'
<p>An <strong>RDBMS</strong> (Relational Database Management System) stores data in <strong>relations</strong> (tables) and manages access, recovery, concurrency, and security.</p>
<h2>Popular engines</h2>
<ul>
<li><strong>PostgreSQL</strong> - open source, advanced SQL</li>
<li><strong>MySQL / MariaDB</strong> - common in web apps</li>
<li><strong>SQLite</strong> - embedded file database</li>
<li><strong>SQL Server, Oracle, IBM Db2</strong> - enterprise</li>
</ul>
<h2>Relational idea</h2>
<pre><code>customers (id, name)
orders    (id, customer_id, total)
-- customer_id relates orders → customers</code></pre>
<pre><code>SELECT c.name, o.total
FROM customers c
JOIN orders o ON o.customer_id = c.id;</code></pre>
<div class="callout"><strong>Verify:</strong> You can name three RDBMS products and explain table + relationship.</div>
'@
    q='RDBMS stands for:'; opts=@('Random Data Binary Memory Store','Relational Database Management System','Remote Desktop Backup Main Server','Rapid Document Blob Media System'); a=1 }
)

# Continue topics 5-39 in second array merge
$topics += @(
  @{ n=5; t='Install PostgreSQL'; m='sql-m02'; d='40 min'; lvl='Beginner'
    o=@('Install PostgreSQL on Windows/Linux','Connect with psql','Run SELECT version()')
    body=@'
<p>PostgreSQL is a powerful open-source RDBMS - excellent for learning professional SQL.</p>
<h2>Windows</h2>
<ol>
<li>Download the installer from <code>postgresql.org</code>.</li>
<li>Set a strong superuser (<code>postgres</code>) password.</li>
<li>Keep default port <code>5432</code> unless you know you need another.</li>
<li>Open <strong>SQL Shell (psql)</strong> or pgAdmin.</li>
</ol>
<h2>Linux (Debian/Ubuntu)</h2>
<pre><code>sudo apt update
sudo apt install postgresql postgresql-contrib
sudo systemctl status postgresql
sudo -u postgres psql</code></pre>
<h2>Verify</h2>
<pre><code>SELECT version();
\conninfo</code></pre>
<div class="callout"><strong>Lab:</strong> Install Postgres, connect, run <code>SELECT version();</code>, create a note with your port and user.</div>
'@
    q='Default PostgreSQL port is usually:'; opts=@('3306','5432','1521','27017'); a=1 }

  @{ n=6; t='Install SQLite'; m='sql-m02'; d='30 min'; lvl='Beginner'
    o=@('Install sqlite3 CLI','Create a file database','Run a first query')
    body=@'
<p><strong>SQLite</strong> is a serverless database in a single file - perfect for labs and local apps.</p>
<h2>Windows</h2>
<ol>
<li>Download precompiled binaries from sqlite.org.</li>
<li>Add the folder to PATH.</li>
<li>Open PowerShell: <code>sqlite3 --version</code></li>
</ol>
<h2>Linux</h2>
<pre><code>sudo apt install sqlite3
sqlite3 --version</code></pre>
<h2>Create & query</h2>
<pre><code>sqlite3 ashovix.db
SQLite version ...
sqlite> CREATE TABLE hello(id INTEGER PRIMARY KEY, msg TEXT);
sqlite> INSERT INTO hello(msg) VALUES ('SQL Mastery');
sqlite> SELECT * FROM hello;
sqlite> .quit</code></pre>
<div class="callout"><strong>Tip:</strong> The database <em>is</em> the file <code>ashovix.db</code>. Back it up by copying the file.</div>
'@
    q='SQLite stores a database primarily as:'; opts=@('A remote cluster only','A single file on disk','Only RAM with no persistence','A spreadsheet workbook'); a=1 }

  @{ n=7; t='Install MySQL'; m='sql-m02'; d='35 min'; lvl='Beginner'
    o=@('Install MySQL Server','Connect with mysql client','Create a practice database')
    body=@'
<p>MySQL is widely used for web applications. MariaDB is a compatible alternative.</p>
<h2>Windows</h2>
<ol>
<li>Install MySQL Community Server.</li>
<li>Set root password; note port <code>3306</code>.</li>
<li>Open MySQL Command Line Client.</li>
</ol>
<h2>Linux</h2>
<pre><code>sudo apt install mysql-server
sudo mysql
CREATE DATABASE ashovix;
SHOW DATABASES;</code></pre>
<h2>Verify</h2>
<pre><code>SELECT VERSION();
CREATE DATABASE practice;
USE practice;</code></pre>
<div class="callout"><strong>Lab:</strong> Connect, create database <code>ashovix</code>, run <code>SELECT VERSION();</code>.</div>
'@
    q='MySQL default port is commonly:'; opts=@('5432','3306','6379','9200'); a=1 }

  @{ n=8; t='SQL Tools'; m='sql-m02'; d='30 min'; lvl='Beginner'
    o=@('Use CLI clients','Try a GUI tool','Run a script file')
    body=@'
<p>You will use both CLIs and GUIs professionally.</p>
<h2>CLI tools</h2>
<ul>
<li><code>psql</code> - PostgreSQL</li>
<li><code>sqlite3</code> - SQLite</li>
<li><code>mysql</code> - MySQL</li>
</ul>
<h2>GUI tools</h2>
<ul>
<li>DBeaver (multi-engine)</li>
<li>pgAdmin (PostgreSQL)</li>
<li>MySQL Workbench</li>
<li>VS Code SQL extensions</li>
</ul>
<h2>Run a script file</h2>
<pre><code>-- hello.sql
SELECT 1 AS ok, 'Ashovix' AS lab;

-- PostgreSQL
psql -U postgres -d ashovix -f hello.sql

-- SQLite
sqlite3 ashovix.db &lt; hello.sql</code></pre>
<div class="callout"><strong>Practice:</strong> Create <code>hello.sql</code>, execute it from CLI, confirm output.</div>
'@
    q='Which tool talks to many database engines from one GUI?'; opts=@('Only Notepad','DBeaver','CSS Grid','npm'); a=1 }
)

$topics += @(
  @{ n=9; t='Create First Database'; m='sql-m03'; d='25 min'; lvl='Beginner'
    o=@('Create a database','Connect to it','List databases')
    body=@'
<h2>PostgreSQL</h2>
<pre><code>CREATE DATABASE ashovix;
\c ashovix
SELECT current_database();</code></pre>
<h2>MySQL</h2>
<pre><code>CREATE DATABASE ashovix;
USE ashovix;
SELECT DATABASE();</code></pre>
<h2>SQLite</h2>
<pre><code>sqlite3 ashovix.db
-- file created on open; no CREATE DATABASE needed</code></pre>
<div class="callout"><strong>Lab:</strong> Create <code>ashovix</code> (or a file DB) and confirm you are connected.</div>
'@
    q='In PostgreSQL, switch database in psql with:'; opts=@('\c dbname','USE ONLY','OPEN DATABASE','FLIP TO'); a=0 }

  @{ n=10; t='Tables'; m='sql-m03'; d='30 min'; lvl='Beginner'
    o=@('Create a table','Describe structure','Drop safely')
    body=@'
<p>A <strong>table</strong> is a named set of columns. Every row follows that structure.</p>
<pre><code>CREATE TABLE customers (
  id   INTEGER PRIMARY KEY,
  name TEXT NOT NULL,
  city TEXT
);

INSERT INTO customers (id, name, city) VALUES (1, 'Asha', 'Pune');
SELECT * FROM customers;</code></pre>
<h2>Inspect</h2>
<pre><code>-- PostgreSQL
\d customers
-- SQLite
.schema customers</code></pre>
<pre><code>DROP TABLE IF EXISTS customers;</code></pre>
'@
    q='A table is best described as:'; opts=@('A random JSON blob','A structured set of columns and rows','A CSS class','A Linux process'); a=1 }

  @{ n=11; t='Rows'; m='sql-m03'; d='20 min'; lvl='Beginner'
    o=@('Insert rows','Update a row','Delete a row')
    body=@'
<p>A <strong>row</strong> (record/tuple) is one instance - one customer, one order, one product.</p>
<pre><code>INSERT INTO customers (id, name, city) VALUES
  (1, 'Asha', 'Pune'),
  (2, 'Dev', 'Chennai');

UPDATE customers SET city = 'Mumbai' WHERE id = 1;
DELETE FROM customers WHERE id = 2;
SELECT * FROM customers;</code></pre>
<div class="callout"><strong>Safety:</strong> Always <code>SELECT</code> with the same <code>WHERE</code> before <code>UPDATE</code>/<code>DELETE</code>.</div>
'@
    q='Before DELETE, best practice is to:'; opts=@('Restart the server','SELECT the same WHERE first','Drop the database','Disable indexes forever'); a=1 }

  @{ n=12; t='Columns'; m='sql-m03'; d='20 min'; lvl='Beginner'
    o=@('Add a column','Rename carefully','Choose meaningful names')
    body=@'
<p>A <strong>column</strong> is a named attribute with a data type.</p>
<pre><code>ALTER TABLE customers ADD COLUMN email TEXT;
ALTER TABLE customers ADD COLUMN created_at TIMESTAMP;

SELECT id, name, email FROM customers;</code></pre>
<h2>Naming tips</h2>
<ul>
<li>Use clear names: <code>customer_id</code>, not <code>c1</code>.</li>
<li>Be consistent: <code>snake_case</code> is common in SQL.</li>
<li>Avoid spaces and reserved words.</li>
</ul>
'@
    q='A column represents:'; opts=@('An entire database backup','One named attribute/field for every row','Only the primary key','A network port'); a=1 }

  @{ n=13; t='Data Types'; m='sql-m03'; d='35 min'; lvl='Beginner'
    o=@('Pick types for text, numbers, dates','Avoid wrong types')
    body=@'
<div class="table-wrap"><table>
<thead><tr><th>Kind</th><th>Examples</th><th>Use for</th></tr></thead>
<tbody>
<tr><td>Integer</td><td><code>INT</code>, <code>INTEGER</code>, <code>BIGINT</code></td><td>IDs, counts</td></tr>
<tr><td>Decimal</td><td><code>NUMERIC(10,2)</code>, <code>DECIMAL</code></td><td>Money (prefer over float)</td></tr>
<tr><td>Text</td><td><code>TEXT</code>, <code>VARCHAR(n)</code></td><td>Names, emails</td></tr>
<tr><td>Date/time</td><td><code>DATE</code>, <code>TIMESTAMP</code></td><td>Events, audits</td></tr>
<tr><td>Boolean</td><td><code>BOOLEAN</code></td><td>Flags</td></tr>
</tbody></table></div>
<pre><code>CREATE TABLE products (
  id         INTEGER PRIMARY KEY,
  title      VARCHAR(120) NOT NULL,
  price      NUMERIC(10,2) NOT NULL,
  in_stock   BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);</code></pre>
<div class="callout"><strong>Tip:</strong> Do not store money in floating point (<code>REAL</code>/<code>FLOAT</code>) if you can use <code>NUMERIC</code>.</div>
'@
    q='Best type for currency amounts:'; opts=@('FLOAT only','NUMERIC/DECIMAL','BOOLEAN','BLOB of images'); a=1 }

  @{ n=14; t='Constraints'; m='sql-m03'; d='35 min'; lvl='Beginner'
    o=@('Apply NOT NULL, UNIQUE, CHECK','See constraint errors')
    body=@'
<p>Constraints protect data quality at the database level.</p>
<pre><code>CREATE TABLE users (
  id    INTEGER PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  age   INT CHECK (age >= 0),
  role  TEXT NOT NULL DEFAULT 'student'
);

-- Fails: duplicate email
INSERT INTO users(id,email,age) VALUES (1,'a@x.com',20);
INSERT INTO users(id,email,age) VALUES (2,'a@x.com',22);</code></pre>
<ul>
<li><strong>NOT NULL</strong> - required value</li>
<li><strong>UNIQUE</strong> - no duplicates</li>
<li><strong>CHECK</strong> - custom rule</li>
<li><strong>DEFAULT</strong> - fill when omitted</li>
</ul>
'@
    q='UNIQUE constraint means:'; opts=@('Column can be missing always','No two rows may share the same value','Table cannot be queried','Indexes are forbidden'); a=1 }

  @{ n=15; t='Primary Key'; m='sql-m03'; d='30 min'; lvl='Beginner'
    o=@('Define a primary key','Use surrogate vs natural keys')
    body=@'
<p>A <strong>primary key (PK)</strong> uniquely identifies each row. It is NOT NULL and UNIQUE.</p>
<pre><code>CREATE TABLE orders (
  order_id INTEGER PRIMARY KEY,           -- surrogate key
  order_no TEXT NOT NULL UNIQUE,          -- business number
  total    NUMERIC(10,2) NOT NULL
);</code></pre>
<pre><code>-- Composite primary key example
CREATE TABLE enrollment (
  student_id INT NOT NULL,
  course_id  INT NOT NULL,
  PRIMARY KEY (student_id, course_id)
);</code></pre>
<div class="callout"><strong>Practice:</strong> Prefer a simple integer/UUID PK for joins; keep business codes UNIQUE separately.</div>
'@
    q='A primary key must be:'; opts=@('Nullable and duplicated','Unique and not null','Always a float','Stored only in Redis'); a=1 }

  @{ n=16; t='Foreign Key'; m='sql-m03'; d='35 min'; lvl='Beginner'
    o=@('Create FK relationships','Understand referential integrity')
    body=@'
<p>A <strong>foreign key (FK)</strong> points to a primary (or unique) key in another table.</p>
<pre><code>CREATE TABLE customers (
  id INTEGER PRIMARY KEY,
  name TEXT NOT NULL
);

CREATE TABLE orders (
  id INTEGER PRIMARY KEY,
  customer_id INTEGER NOT NULL,
  total NUMERIC(10,2) NOT NULL,
  FOREIGN KEY (customer_id) REFERENCES customers(id)
);

INSERT INTO customers VALUES (1, 'Asha');
INSERT INTO orders VALUES (10, 1, 499.00);
-- Fails: no customer 99
INSERT INTO orders VALUES (11, 99, 10.00);</code></pre>
<div class="callout"><strong>Why it matters:</strong> FKs stop orphan orders that point to missing customers.</div>
'@
    q='A foreign key ensures:'; opts=@('Faster CSS','Referential integrity between tables','That backups never run','Only one column exists'); a=1 }

  @{ n=17; t='Normalization'; m='sql-m03'; d='40 min'; lvl='Intermediate'
    o=@('Explain 1NF, 2NF, 3NF','Refactor a denormalized table')
    body=@'
<p><strong>Normalization</strong> reduces duplication and update anomalies by designing related tables.</p>
<h2>Bad (denormalized)</h2>
<pre><code>-- phones packed in one cell; course names repeated
student_id | name | phones           | course1     | course2
1          | Asha | 98..,97..        | SQL         | Git</code></pre>
<h2>Better (3NF style)</h2>
<pre><code>students(id, name)
phones(student_id, phone)
enrollments(student_id, course_id)
courses(id, title)</code></pre>
<ul>
<li><strong>1NF</strong> - atomic values, no repeating groups</li>
<li><strong>2NF</strong> - no partial dependency on part of a composite key</li>
<li><strong>3NF</strong> - no transitive dependency on non-key attributes</li>
</ul>
'@
    q='Normalization mainly aims to:'; opts=@('Add random duplication','Reduce redundancy and anomalies','Delete all indexes','Ban SELECT'); a=1 }
)

$topics += @(
  @{ n=18; t='DDL'; m='sql-m04'; d='35 min'; lvl='Beginner'
    o=@('Use CREATE/ALTER/DROP','Change structure safely')
    body=@'
<p><strong>DDL</strong> (Data Definition Language) defines structure.</p>
<pre><code>CREATE TABLE products (
  id INT PRIMARY KEY,
  title TEXT NOT NULL
);

ALTER TABLE products ADD COLUMN price NUMERIC(10,2);
ALTER TABLE products RENAME TO catalog_products;
DROP TABLE IF EXISTS catalog_products;</code></pre>
<div class="callout"><strong>Caution:</strong> <code>DROP</code>/<code>ALTER</code> can destroy or lock production data - practice on labs first.</div>
'@
    q='Which is DDL?'; opts=@('SELECT * FROM t','CREATE TABLE t (...)','COMMIT','GRANT SELECT'); a=1 }

  @{ n=19; t='DML'; m='sql-m04'; d='35 min'; lvl='Beginner'
    o=@('INSERT, UPDATE, DELETE with WHERE','Use transactions for safety')
    body=@'
<p><strong>DML</strong> changes data rows.</p>
<pre><code>INSERT INTO products(id, title, price) VALUES (1, 'SQL Book', 499);

UPDATE products SET price = 449 WHERE id = 1;

DELETE FROM products WHERE id = 1;</code></pre>
<pre><code>BEGIN;
UPDATE accounts SET balance = balance - 100 WHERE id = 1;
UPDATE accounts SET balance = balance + 100 WHERE id = 2;
COMMIT;  -- or ROLLBACK;</code></pre>
'@
    q='Which statement is DML?'; opts=@('CREATE INDEX','UPDATE students SET grade=A WHERE id=5','GRANT ALL','ALTER TABLE'); a=1 }

  @{ n=20; t='DQL'; m='sql-m04'; d='35 min'; lvl='Beginner'
    o=@('Write SELECT queries','Project columns and filter rows')
    body=@'
<p><strong>DQL</strong> is primarily <code>SELECT</code> - reading data without changing it.</p>
<pre><code>SELECT name, city
FROM customers
WHERE city = 'Pune'
ORDER BY name;</code></pre>
<pre><code>SELECT COUNT(*) AS total_customers FROM customers;
SELECT DISTINCT city FROM customers;</code></pre>
<div class="callout"><strong>Tip:</strong> Master <code>SELECT</code> deeply - most SQL work is reading and shaping data.</div>
'@
    q='DQL is mainly associated with:'; opts=@('DROP DATABASE','SELECT','GRANT','SAVEPOINT'); a=1 }

  @{ n=21; t='TCL'; m='sql-m04'; d='35 min'; lvl='Intermediate'
    o=@('COMMIT and ROLLBACK','Use SAVEPOINT')
    body=@'
<p><strong>TCL</strong> (Transaction Control Language) groups statements into atomic units.</p>
<pre><code>BEGIN;
UPDATE accounts SET balance = balance - 500 WHERE id = 1;
SAVEPOINT after_debit;
UPDATE accounts SET balance = balance + 500 WHERE id = 2;
-- oops?
ROLLBACK TO after_debit;
ROLLBACK;  -- cancel all
-- or COMMIT; to save</code></pre>
<ul>
<li><strong>COMMIT</strong> - make permanent</li>
<li><strong>ROLLBACK</strong> - undo</li>
<li><strong>SAVEPOINT</strong> - partial undo point</li>
</ul>
'@
    q='ROLLBACK does what?'; opts=@('Creates a new table','Undoes uncommitted work in the transaction','Grants admin rights','Builds an index'); a=1 }

  @{ n=22; t='DCL'; m='sql-m04'; d='30 min'; lvl='Intermediate'
    o=@('GRANT and REVOKE privileges','Think least privilege')
    body=@'
<p><strong>DCL</strong> controls who can do what.</p>
<pre><code>-- PostgreSQL-style examples
CREATE ROLE analyst LOGIN PASSWORD 'change-me';
GRANT SELECT ON ALL TABLES IN SCHEMA public TO analyst;
REVOKE SELECT ON payroll FROM analyst;</code></pre>
<div class="callout"><strong>Security:</strong> Give the minimum privileges required (least privilege).</div>
'@
    q='GRANT is part of:'; opts=@('DQL','DCL','HTML','CSS'); a=1 }
)

$topics += @(
  @{ n=23; t='Operators'; m='sql-m05'; d='30 min'; lvl='Beginner'
    o=@('Use comparison and logical operators','Use IN, BETWEEN, LIKE')
    body=@'
<pre><code>SELECT * FROM products WHERE price &gt;= 500;
SELECT * FROM products WHERE price BETWEEN 100 AND 500;
SELECT * FROM customers WHERE city IN ('Pune','Mumbai');
SELECT * FROM customers WHERE name LIKE 'A%';
SELECT * FROM products WHERE price &gt; 100 AND in_stock = TRUE;
SELECT * FROM products WHERE category IS NULL;</code></pre>
<div class="table-wrap"><table>
<thead><tr><th>Operator</th><th>Meaning</th></tr></thead>
<tbody>
<tr><td><code>= &lt;&gt; &lt; &gt; &lt;= &gt;=</code></td><td>Compare values</td></tr>
<tr><td><code>AND OR NOT</code></td><td>Combine predicates</td></tr>
<tr><td><code>LIKE</code></td><td>Pattern match</td></tr>
<tr><td><code>IS NULL</code></td><td>Null test (not <code>= NULL</code>)</td></tr>
</tbody></table></div>
'@
    q='To test NULL correctly use:'; opts=@('= NULL','IS NULL','== null','EQUALS NONE'); a=1 }

  @{ n=24; t='WHERE'; m='sql-m05'; d='30 min'; lvl='Beginner'
    o=@('Filter rows with WHERE','Combine conditions safely')
    body=@'
<p><code>WHERE</code> filters rows <em>before</em> grouping.</p>
<pre><code>SELECT id, name, city
FROM customers
WHERE city = 'Pune' AND name LIKE 'A%';</code></pre>
<pre><code>-- Dangerous: missing WHERE updates ALL rows
UPDATE products SET price = 0;  -- DON''T</code></pre>
<div class="callout"><strong>Order reminder:</strong> FROM → WHERE → GROUP BY → HAVING → SELECT → ORDER BY</div>
'@
    q='WHERE filters:'; opts=@('Columns only after SELECT list formatting','Rows based on conditions','Indexes exclusively','Users in Linux'); a=1 }

  @{ n=25; t='ORDER BY'; m='sql-m05'; d='25 min'; lvl='Beginner'
    o=@('Sort ascending/descending','Sort by multiple columns')
    body=@'
<pre><code>SELECT title, price FROM products
ORDER BY price DESC, title ASC;</code></pre>
<pre><code>SELECT name, city FROM customers
ORDER BY city, name;</code></pre>
<div class="callout"><strong>Note:</strong> Without ORDER BY, row order is not guaranteed.</div>
'@
    q='ORDER BY price DESC means:'; opts=@('Cheapest first','Highest price first','Delete prices','Group prices'); a=1 }

  @{ n=26; t='GROUP BY'; m='sql-m05'; d='35 min'; lvl='Intermediate'
    o=@('Aggregate with COUNT/SUM/AVG','Group rows')
    body=@'
<pre><code>SELECT city, COUNT(*) AS customers
FROM customers
GROUP BY city
ORDER BY customers DESC;</code></pre>
<pre><code>SELECT customer_id, SUM(total) AS revenue
FROM orders
GROUP BY customer_id;</code></pre>
<div class="callout"><strong>Rule:</strong> Non-aggregated SELECT columns must appear in GROUP BY.</div>
'@
    q='GROUP BY is used with:'; opts=@('Only DROP TABLE','Aggregate functions like COUNT/SUM','CSS Grid','SSH keys'); a=1 }

  @{ n=27; t='HAVING'; m='sql-m05'; d='30 min'; lvl='Intermediate'
    o=@('Filter groups with HAVING','Contrast WHERE vs HAVING')
    body=@'
<pre><code>SELECT city, COUNT(*) AS n
FROM customers
GROUP BY city
HAVING COUNT(*) &gt;= 2;</code></pre>
<div class="table-wrap"><table>
<thead><tr><th>WHERE</th><th>HAVING</th></tr></thead>
<tbody>
<tr><td>Filters rows</td><td>Filters groups</td></tr>
<tr><td>Before GROUP BY</td><td>After GROUP BY</td></tr>
<tr><td>Cannot use aggregate results easily</td><td>Can use COUNT/SUM…</td></tr>
</tbody></table></div>
'@
    q='HAVING filters:'; opts=@('Files on disk','Grouped results after aggregation','Only primary keys','TCP packets'); a=1 }
)

$topics += @(
  @{ n=28; t='Joins'; m='sql-m06'; d='45 min'; lvl='Intermediate'
    o=@('Write INNER and LEFT joins','Join three tables')
    body=@'
<pre><code>SELECT c.name, o.id AS order_id, o.total
FROM customers c
INNER JOIN orders o ON o.customer_id = c.id;</code></pre>
<pre><code>-- Customers even without orders
SELECT c.name, o.id AS order_id
FROM customers c
LEFT JOIN orders o ON o.customer_id = c.id;</code></pre>
<pre><code>SELECT c.name, p.title, oi.qty
FROM orders o
JOIN customers c ON c.id = o.customer_id
JOIN order_items oi ON oi.order_id = o.id
JOIN products p ON p.id = oi.product_id;</code></pre>
<div class="callout"><strong>INNER</strong> keeps matches only. <strong>LEFT</strong> keeps all left rows.</div>
'@
    q='LEFT JOIN returns:'; opts=@('Only matching right rows alone','All left rows, matched right data or NULL','Only duplicate keys','No rows ever'); a=1 }

  @{ n=29; t='Subqueries'; m='sql-m06'; d='40 min'; lvl='Intermediate'
    o=@('Use scalar and IN subqueries','Compare to joins')
    body=@'
<pre><code>-- Products above average price
SELECT title, price
FROM products
WHERE price &gt; (SELECT AVG(price) FROM products);</code></pre>
<pre><code>-- Customers who placed orders
SELECT name FROM customers
WHERE id IN (SELECT customer_id FROM orders);</code></pre>
<pre><code>SELECT c.name,
  (SELECT COUNT(*) FROM orders o WHERE o.customer_id = c.id) AS order_count
FROM customers c;</code></pre>
'@
    q='A subquery is:'; opts=@('A query nested inside another SQL statement','A Linux daemon','A CSS selector','A Git branch'); a=0 }

  @{ n=30; t='Views'; m='sql-m06'; d='30 min'; lvl='Intermediate'
    o=@('Create a view','Query through a view')
    body=@'
<p>A <strong>view</strong> is a saved query that looks like a table.</p>
<pre><code>CREATE VIEW v_customer_revenue AS
SELECT c.id, c.name, COALESCE(SUM(o.total),0) AS revenue
FROM customers c
LEFT JOIN orders o ON o.customer_id = c.id
GROUP BY c.id, c.name;

SELECT * FROM v_customer_revenue WHERE revenue &gt; 1000;</code></pre>
<div class="callout"><strong>Use views</strong> for reuse, security (hide columns), and simplifying reports.</div>
'@
    q='A view is best described as:'; opts=@('A physical backup file','A stored query presented like a table','A primary key only','A Redis list'); a=1 }

  @{ n=31; t='Indexes'; m='sql-m06'; d='40 min'; lvl='Intermediate'
    o=@('Create indexes','Know when indexes help')
    body=@'
<pre><code>CREATE INDEX ix_orders_customer ON orders(customer_id);
CREATE INDEX ix_products_title ON products(title);

SELECT * FROM orders WHERE customer_id = 42;</code></pre>
<ul>
<li>Speed up WHERE/JOIN lookups on selective columns</li>
<li>Slow down heavy INSERT/UPDATE/DELETE slightly</li>
<li>Do not index everything blindly</li>
</ul>
<pre><code>-- PostgreSQL
EXPLAIN ANALYZE SELECT * FROM orders WHERE customer_id = 42;</code></pre>
'@
    q='Indexes are primarily used to:'; opts=@('Make UI colors prettier','Speed up lookups/filters/joins','Delete foreign keys','Replace backups'); a=1 }

  @{ n=32; t='Stored Procedures'; m='sql-m06'; d='40 min'; lvl='Advanced'
    o=@('Understand procedures','See a portable pattern')
    body=@'
<p>A <strong>stored procedure</strong> is server-side procedural code invoked on demand (syntax varies by vendor).</p>
<pre><code>-- PostgreSQL function used like a procedure
CREATE OR REPLACE FUNCTION add_customer(p_name TEXT, p_city TEXT)
RETURNS INT AS $$
DECLARE new_id INT;
BEGIN
  INSERT INTO customers(name, city) VALUES (p_name, p_city)
  RETURNING id INTO new_id;
  RETURN new_id;
END;
$$ LANGUAGE plpgsql;

SELECT add_customer('Kai', 'Delhi');</code></pre>
<div class="callout"><strong>Note:</strong> Prefer set-based SQL; use procedures for controlled multi-step business logic.</div>
'@
    q='Stored procedures run:'; opts=@('Only in the browser CSS engine','On the database server','Inside Photoshop','On DNS servers only'); a=1 }

  @{ n=33; t='Functions'; m='sql-m06'; d='35 min'; lvl='Advanced'
    o=@('Use built-in SQL functions','Contrast with procedures')
    body=@'
<pre><code>SELECT UPPER(name), LENGTH(name), COALESCE(city, 'Unknown')
FROM customers;

SELECT ROUND(AVG(price), 2) FROM products;
SELECT DATE_TRUNC('month', created_at) FROM orders; -- Postgres</code></pre>
<ul>
<li><strong>Scalar functions</strong> return one value</li>
<li><strong>Aggregate functions</strong> summarize many rows</li>
<li>User-defined functions encapsulate reusable logic</li>
</ul>
'@
    q='COALESCE(a,b) returns:'; opts=@('Always null','First non-null among args','Only b','A new table'); a=1 }

  @{ n=34; t='Triggers'; m='sql-m06'; d='40 min'; lvl='Advanced'
    o=@('Explain trigger use cases','See an audit example')
    body=@'
<p>A <strong>trigger</strong> runs automatically on INSERT/UPDATE/DELETE.</p>
<pre><code>-- Concept: audit price changes (Postgres-style sketch)
CREATE TABLE product_audit (
  product_id INT,
  old_price NUMERIC,
  new_price NUMERIC,
  changed_at TIMESTAMP DEFAULT NOW()
);

-- Trigger function would INSERT into product_audit
-- WHEN products.price is updated</code></pre>
<ul>
<li>Auditing / history</li>
<li>Derived values</li>
<li>Enforcing complex rules</li>
</ul>
<div class="callout"><strong>Caution:</strong> Hidden trigger logic can surprise app developers - document it.</div>
'@
    q='Triggers execute:'; opts=@('Only when you open Excel','Automatically on table events','Never on UPDATE','On DNS resolve'); a=1 }

  @{ n=35; t='Transactions'; m='sql-m06'; d='40 min'; lvl='Intermediate'
    o=@('Apply ACID','Transfer funds safely')
    body=@'
<p>Transactions give <strong>ACID</strong>: Atomicity, Consistency, Isolation, Durability.</p>
<pre><code>BEGIN;
UPDATE accounts SET balance = balance - 1000 WHERE id = 1;
UPDATE accounts SET balance = balance + 1000 WHERE id = 2;
COMMIT;</code></pre>
<pre><code>BEGIN;
UPDATE accounts SET balance = balance - 1000 WHERE id = 1;
-- error / doubt
ROLLBACK;</code></pre>
<div class="callout"><strong>Lab:</strong> Implement a money transfer that either fully succeeds or fully rolls back.</div>
'@
    q='Atomicity means:'; opts=@('Partially commit forever','All steps succeed or none do','Ignore constraints','Drop indexes'); a=1 }
)

$topics += @(
  @{ n=36; t='Performance Tuning'; m='sql-m07'; d='45 min'; lvl='Advanced'
    o=@('Use EXPLAIN','Fix common anti-patterns')
    body=@'
<pre><code>EXPLAIN ANALYZE
SELECT * FROM orders WHERE customer_id = 42;</code></pre>
<h2>Common fixes</h2>
<ul>
<li>Index join/filter columns</li>
<li>Avoid <code>SELECT *</code> in hot paths</li>
<li>Don't wrap indexed columns in functions in WHERE</li>
<li>Update statistics (<code>ANALYZE</code> in Postgres)</li>
<li>Rewrite correlated subqueries as joins when needed</li>
</ul>
<pre><code>-- Anti-pattern
WHERE YEAR(created_at) = 2026
-- Better (Postgres)
WHERE created_at &gt;= DATE '2026-01-01'
  AND created_at &lt;  DATE '2027-01-01';</code></pre>
'@
    q='EXPLAIN ANALYZE helps you:'; opts=@('Design logos','See the real query plan and timings','Send email','Compile C++'); a=1 }

  @{ n=37; t='Database Design'; m='sql-m07'; d='45 min'; lvl='Advanced'
    o=@('Model entities and relationships','Choose keys and constraints')
    body=@'
<h2>Design steps</h2>
<ol>
<li>List entities (Customer, Order, Product).</li>
<li>Define attributes and types.</li>
<li>Identify PKs and relationships (1:N, N:M).</li>
<li>Add FKs, UNIQUE, CHECK.</li>
<li>Normalize to 3NF, then denormalize only with reason.</li>
</ol>
<pre><code>customers(id PK, email UNIQUE, name)
products(id PK, title, price)
orders(id PK, customer_id FK, ordered_at)
order_items(order_id FK, product_id FK, qty, PRIMARY KEY(order_id, product_id))</code></pre>
'@
    q='N:M relationships usually need:'; opts=@('A junction/bridge table','No tables','Only CSS','A single flat cell'); a=0 }

  @{ n=38; t='Interview Questions'; m='sql-m07'; d='40 min'; lvl='Advanced'
    o=@('Answer common SQL interview prompts','Practice aloud')
    body=@'
<h2>High-frequency questions</h2>
<ol>
<li>WHERE vs HAVING?</li>
<li>INNER vs LEFT JOIN?</li>
<li>What is a primary key vs unique key?</li>
<li>What is normalization? Give 1NF/2NF/3NF.</li>
<li>What is an index? Pros/cons?</li>
<li>Explain ACID.</li>
<li>DELETE vs TRUNCATE vs DROP?</li>
<li>Find duplicates with SQL.</li>
<li>Second highest salary query.</li>
<li>Correlated subquery vs join?</li>
</ol>
<pre><code>-- Duplicates
SELECT email, COUNT(*)
FROM users
GROUP BY email
HAVING COUNT(*) &gt; 1;

-- Second highest salary (portable idea)
SELECT MAX(salary) FROM employees
WHERE salary &lt; (SELECT MAX(salary) FROM employees);</code></pre>
<div class="callout"><strong>Practice:</strong> Explain each answer with a tiny example sketch.</div>
'@
    q='WHERE vs HAVING: HAVING filters:'; opts=@('Rows before grouping','Groups after aggregation','Only file names','OS users'); a=1 }

  @{ n=39; t='Final Assessment'; m='sql-m08'; d='90 min'; lvl='Assessment'
    o=@('Complete 60 questions in 90 minutes','Review your score card')
    body=@'
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
'@
    q=$null; opts=$null; a=$null }
)

# --- 60 assessment questions ---
$AQ = @()
function AddQ($q, $opts, $a) { $script:AQ += @{ q=$q; options=$opts; answer=$a } }

AddQ 'SQL stands for?' @('Structured Query Language','Simple Query List','Server Queue Logic','Sequential Queue Language') 0
AddQ 'Which engine is embedded as a file DB?' @('Oracle RAC only','SQLite','Only Redis Cluster','Photoshop') 1
AddQ 'Default PostgreSQL port?' @('3306','5432','1521','27017') 1
AddQ 'Default MySQL port?' @('5432','3306','6379','1433') 1
AddQ 'Which is DDL?' @('SELECT','CREATE TABLE','COMMIT','GRANT') 1
AddQ 'Which is DML?' @('ALTER TABLE','INSERT INTO','REVOKE','CREATE INDEX') 1
AddQ 'Which is mainly DQL?' @('DROP','SELECT','GRANT','ROLLBACK') 1
AddQ 'COMMIT belongs to?' @('DQL','TCL','HTML','CSS') 1
AddQ 'GRANT belongs to?' @('DML','DCL','DQL','TCL') 1
AddQ 'A primary key must be?' @('Null and duplicate OK','Unique and NOT NULL','Float only','Unindexed always') 1
AddQ 'Foreign keys enforce?' @('UI themes','Referential integrity','DNS only','CPU affinity') 1
AddQ 'NOT NULL means?' @('Value optional','Value required','Always zero','Always unique') 1
AddQ 'Best type for money?' @('FLOAT','NUMERIC/DECIMAL','BOOLEAN','CLOB of HTML') 1
AddQ 'WHERE filters?' @('Groups after aggregation','Rows','Only indexes','Linux users') 1
AddQ 'HAVING filters?' @('Rows before GROUP BY','Groups after aggregation','CSS classes','Files') 1
AddQ 'ORDER BY price DESC sorts?' @('Low to high','High to low','Random','By name only') 1
AddQ 'INNER JOIN returns?' @('All left rows always','Matching rows only','All right rows always','No matches ever') 1
AddQ 'LEFT JOIN returns?' @('Matching only','All left + match or NULL','All right only','Cartesian only') 1
AddQ 'COUNT(*) counts?' @('Only nulls','Rows in the group/result','Columns only','Indexes only') 1
AddQ 'To test NULL use?' @('= NULL','IS NULL','== NULL','EQUALS NULL') 1
AddQ 'LIKE ''A%'' matches?' @('Ends with A','Starts with A','Equals A only','Never matches') 1
AddQ 'BETWEEN 10 AND 20 is?' @('Exclusive ends always','Inclusive range typically','Only strings','Invalid SQL') 1
AddQ 'A view is?' @('A backup tape','Saved query as a table-like object','A PK constraint','A Redis stream') 1
AddQ 'Indexes help?' @('Lookups and joins','Only fonts','Deleting FK rules','HTTPS certs') 1
AddQ 'EXPLAIN ANALYZE?' @('Draws ERD art','Shows plan + actual timings','Sends email','Creates users') 1
AddQ 'Atomicity means?' @('Partial commits OK','All-or-nothing transaction','Ignore FKs','Drop schema') 1
AddQ 'ROLLBACK does?' @('Creates DB','Undoes uncommitted work','Grants root','Builds UI') 1
AddQ 'Normalization reduces?' @('Network cables','Redundancy/anomalies','Need for backups forever','SQL itself') 1
AddQ '1NF requires?' @('Atomic values / no repeating groups','Only MongoDB','No primary keys','Only floats') 0
AddQ 'Junction table used for?' @('1:1 only','Many-to-many (N:M)','No relations','CSS layout') 1
AddQ 'DELETE vs DROP TABLE?' @('Same thing','DELETE removes rows; DROP removes table','DROP removes one row only','DELETE drops schema') 1
AddQ 'TRUNCATE typically?' @('Removes all rows quickly','Creates index','Grants role','Renames column') 0
AddQ 'Subquery is?' @('Nested query','OS thread','Git tag','K8s pod') 0
AddQ 'COALESCE(a,b) returns?' @('Always a','First non-null','Always null','Sum only') 1
AddQ 'UNIQUE allows?' @('Duplicate values freely','No duplicate non-null values','Only nulls','No SELECT') 1
AddQ 'CHECK constraint?' @('Validates a condition on values','Creates a user','Opens firewall','Sorts rows') 0
AddQ 'psql is CLI for?' @('MongoDB','PostgreSQL','Redis only','Photoshop') 1
AddQ 'sqlite3 ashovix.db creates?' @('A Postgres cluster','A SQLite DB file','An S3 bucket','A Docker swarm') 1
AddQ 'SELECT DISTINCT removes?' @('All rows','Duplicate result rows','Primary keys','Databases') 1
AddQ 'GROUP BY used with?' @('Aggregates','Only DROP','Only GRANT','SSH') 0
AddQ 'Correlated subquery?' @('Refs outer query per row','Never uses SQL','Only runs offline','Creates CSS') 0
AddQ 'Second highest salary approach?' @('MAX of values below MAX','DELETE MAX','DROP TABLE','GRANT ALL') 0
AddQ 'ACID Isolation means?' @('Transactions do not step on each other incorrectly','No durability','No consistency','No atomicity') 0
AddQ 'Trigger fires?' @('On table events automatically','Only on Mondays','Never on INSERT','In the browser only') 0
AddQ 'Stored procedure runs?' @('On DB server','In CSS','In DNS','In Excel chart') 0
AddQ 'Avoid for money?' @('NUMERIC','FLOAT/REAL for exact currency','DECIMAL','INTEGER cents') 1
AddQ 'FK child row pointing missing parent?' @('Allowed always','Blocked if FK enforced','Required by SQL','Creates view') 1
AddQ 'CREATE INDEX on customer_id helps?' @('JOIN/WHERE on customer_id','Only CHANGE COLUMN colors','Dropping DB','SMTP') 0
AddQ 'SELECT * in hot path?' @('Always best','Often wasteful; prefer needed columns','Required by law','Disables indexes') 1
AddQ 'WHERE YEAR(col)=2026 downside?' @('May prevent index use','Always faster','Required syntax','Drops table') 0
AddQ 'SAVEPOINT allows?' @('Partial rollback inside transaction','Creating OS users','Dropping cluster','CSS animation') 0
AddQ 'DCL example?' @('SELECT 1','GRANT SELECT ON t TO u','INSERT INTO t','COMMIT') 1
AddQ 'Relational data stored mainly as?' @('Tables of rows/columns','Only graphs','Only raw photos','Only CSS') 0
AddQ 'Spreadsheet vs DB: DBs better for?' @('Fonts','Concurrent integrity & scale','Clipart','Animations') 1
AddQ 'INNER JOIN ON condition missing?' @('May produce Cartesian product','Always errors in all engines','Deletes data','Creates PK') 0
AddQ 'HAVING COUNT(*) > 1 finds?' @('Groups with more than one row','Only empty tables','Primary keys','Linux processes') 0
AddQ 'View benefits include?' @('Reuse and simplifying queries','Replacing need for backups forever','Disabling SQL','Removing ACID') 0
AddQ 'Transaction COMMIT?' @('Makes changes permanent','Undoes all','Drops DB','Creates role') 0
AddQ 'Interview: UNIQUE vs PK?' @('PK identifies row & is unique/not null; UNIQUE can allow one NULL depending on engine','They are identical always','UNIQUE is DDL only for views','PK cannot be integer') 0
AddQ 'Final goal of SQL Mastery labs?' @('Write correct, safe, efficient SQL with understanding','Memorize only GUI clicks','Avoid SELECT forever','Replace networking') 0

if ($AQ.Count -lt 60) { throw "Need 60 questions, got $($AQ.Count)" }

# Build JS
$sb = New-Object System.Text.StringBuilder
[void]$sb.AppendLine('/* Ashovix Labs - SQL Mastery (39 topics + Final Assessment) */')
[void]$sb.AppendLine('(function () {')
[void]$sb.AppendLine('  const lessons = {};')
[void]$sb.AppendLine('  function L(id, d) { lessons[id] = { id, ...d }; }')
[void]$sb.AppendLine('')

foreach ($t in $topics) {
  $id = 'sql{0:D2}' -f $t.n
  $title = '{0:D2} {1}' -f $t.n, $t.t
  [void]$sb.AppendLine("  L(`"$id`", {")
  [void]$sb.AppendLine("    module: `"$($t.m)`",")
  [void]$sb.AppendLine("    title: `"$title`",")
  [void]$sb.AppendLine("    level: `"$($t.lvl)`",")
  [void]$sb.AppendLine("    duration: `"$($t.d)`",")
  [void]$sb.AppendLine('    objectives: [')
  foreach ($o in $t.o) {
    $oe = $o -replace '\\','\\' -replace '"','\"'
    [void]$sb.AppendLine("      `"$oe`",")
  }
  [void]$sb.AppendLine('    ],')
  [void]$sb.AppendLine('    content: `')
  [void]$sb.AppendLine($t.body.Trim())
  [void]$sb.AppendLine('`,')
  if ($null -ne $t.q) {
    [void]$sb.AppendLine('    quiz: {')
    $qe = $t.q -replace '\\','\\' -replace '"','\"'
    [void]$sb.AppendLine("      q: `"$qe`",")
    [void]$sb.AppendLine('      options: [')
    foreach ($opt in $t.opts) {
      $opte = $opt -replace '\\','\\' -replace '"','\"'
      [void]$sb.AppendLine("        `"$opte`",")
    }
    [void]$sb.AppendLine('      ],')
    [void]$sb.AppendLine("      answer: $($t.a)")
    [void]$sb.AppendLine('    }')
  } else {
    [void]$sb.AppendLine('    quiz: null')
  }
  [void]$sb.AppendLine('  });')
  [void]$sb.AppendLine('')
}

# Assessment JSON-ish
[void]$sb.AppendLine('  const assessmentQuestions = [')
foreach ($q in $AQ) {
  $qe = $q.q -replace '\\','\\' -replace '"','\"'
  [void]$sb.AppendLine('    {')
  [void]$sb.AppendLine("      q: `"$qe`",")
  [void]$sb.AppendLine('      options: [')
  foreach ($opt in $q.options) {
    $opte = $opt -replace '\\','\\' -replace '"','\"'
    [void]$sb.AppendLine("        `"$opte`",")
  }
  [void]$sb.AppendLine('      ],')
  [void]$sb.AppendLine("      answer: $($q.answer)")
  [void]$sb.AppendLine('    },')
}
[void]$sb.AppendLine('  ];')
[void]$sb.AppendLine('')

[void]$sb.AppendLine(@'
  window.FORGE.register({
    id: "sql",
    order: 1,
    title: "SQL Mastery",
    shortTitle: "SQL",
    tagline: "39 clear topics with examples - from databases to final assessment",
    level: "Beginner → Advanced",
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
      { id: "sql-m07", title: "Professional Skills", lessonIds: ["sql36","sql37","sql38"] },
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
'@)

[System.IO.File]::WriteAllText($out, $sb.ToString(), [System.Text.UTF8Encoding]::new($false))
Write-Output "Wrote $out ($((Get-Item $out).Length) bytes) topics=$($topics.Count) questions=$($AQ.Count)"
