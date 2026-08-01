/* Ashovix Labs - SQL Mastery (39 topics + Final Assessment) */
(function () {
  const lessons = {};
  function L(id, d) { lessons[id] = { id, ...d }; }

  L("sql01", {
    module: "sql-m01",
    title: "01 Introduction to Databases",
    level: "Beginner",
    duration: "25 min",
    objectives: [
      "Define what a database is",
      "Contrast files vs databases",
      "List common database types",
    ],
    content: `
<p>A <strong>database</strong> is an organized collection of data that a computer program (the database engine) can store, find, update, and protect efficiently.</p>
<h2>Why not just use files?</h2>
<div class="table- wrap"><table>
<thead><tr><th>Files / folders</th><th>Database</th></tr></thead>
<tbody>
<tr><td>Hard to query across many files</td><td>Powerful query language (SQL)</td></tr>
<tr><td>Easy to corrupt with concurrent writes</td><td>Transactions & locking</td></tr>
<tr><td>Weak consistency rules</td><td>Constraints, keys, types</td></tr>
<tr><td>Security is ad- hoc</td><td>Users, roles, privileges</td></tr>
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
`,
    quiz: {
      q: "What is the main job of a database engine?",
      options: [
        "Only draw charts",
        "Store, query, update, and protect data reliably",
        "Compile Java code",
        "Replace operating systems",
      ],
      answer: 1
    }
  });

  L("sql02", {
    module: "sql-m01",
    title: "02 What is SQL?",
    level: "Beginner",
    duration: "25 min",
    objectives: [
      "Define SQL",
      "Explain declarative style",
      "Name major statement families",
    ],
    content: `
<p><strong>SQL</strong> (Structured Query Language) is the standard language for working with relational databases. You describe <em>what</em> you want; the engine decides <em>how</em>.</p>
<h2>SQL is declarative</h2>
<pre><code>|- You say WHAT: customers in Pune
SELECT name, email
FROM customers
WHERE city = 'Pune';

|- You do NOT write a loop over files</code></pre>
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
`,
    quiz: {
      q: "SQL is best described as:",
      options: [
        "A markup language like HTML",
        "A declarative language for relational data",
        "A CPU assembly language",
        "A CSS framework",
      ],
      answer: 1
    }
  });

  L("sql03", {
    module: "sql-m01",
    title: "03 Database vs Spreadsheet",
    level: "Beginner",
    duration: "20 min",
    objectives: [
      "Compare spreadsheets and databases",
      "Know when to choose each",
    ],
    content: `
<p>Spreadsheets (Excel/Sheets) are great for personal analysis. Databases are built for shared, large, concurrent, structured work.</p>
<div class="table- wrap"><table>
<thead><tr><th>Spreadsheets</th><th>Databases</th></tr></thead>
<tbody>
<tr><td>One user edits easily</td><td>Many users/apps at once</td></tr>
<tr><td>Formulas in cells</td><td>SQL queries & constraints</td></tr>
<tr><td>Weak typing / mixed cells</td><td>Strict data types</td></tr>
<tr><td>Breaks at tens of thousands of rows</td><td>Handles millions+ with indexes</td></tr>
<tr><td>Hard to enforce relationships</td><td>Foreign keys & joins</td></tr>
</tbody></table></div>
<h2>Example</h2>
<pre><code>|- Spreadsheet: filter column City = Pune manually
|- Database: reusable, auditable query
SELECT * FROM customers WHERE city = 'Pune';</code></pre>
<div class="callout"><strong>Rule of thumb:</strong> If multiple systems must share correct data, use a database.</div>
`,
    quiz: {
      q: "Databases beat spreadsheets mainly when you need:",
      options: [
        "Fancier fonts",
        "Multi- user integrity, scale, and relationships",
        "More colors",
        "Offline drawing tools",
      ],
      answer: 1
    }
  });

  L("sql04", {
    module: "sql-m01",
    title: "04 What is RDBMS?",
    level: "Beginner",
    duration: "25 min",
    objectives: [
      "Define RDBMS",
      "List popular engines",
      "Explain relational model basics",
    ],
    content: `
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
|- customer_id relates orders - customers</code></pre>
<pre><code>SELECT c.name, o.total
FROM customers c
JOIN orders o ON o.customer_id = c.id;</code></pre>
<div class="callout"><strong>Verify:</strong> You can name three RDBMS products and explain table + relationship.</div>
`,
    quiz: {
      q: "RDBMS stands for:",
      options: [
        "Random Data Binary Memory Store",
        "Relational Database Management System",
        "Remote Desktop Backup Main Server",
        "Rapid Document Blob Media System",
      ],
      answer: 1
    }
  });

  L("sql05", {
    module: "sql-m02",
    title: "05 Install PostgreSQL",
    level: "Beginner",
    duration: "40 min",
    objectives: [
      "Install PostgreSQL on Windows/Linux",
      "Connect with psql",
      "Run SELECT version()",
    ],
    content: `
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
sudo apt install postgresql postgresql- contrib
sudo systemctl status postgresql
sudo - u postgres psql</code></pre>
<h2>Verify</h2>
<pre><code>SELECT version();
\conninfo</code></pre>
<div class="callout"><strong>Lab:</strong> Install Postgres, connect, run <code>SELECT version();</code>, create a note with your port and user.</div>
`,
    quiz: {
      q: "Default PostgreSQL port is usually:",
      options: [
        "3306",
        "5432",
        "1521",
        "27017",
      ],
      answer: 1
    }
  });

  L("sql06", {
    module: "sql-m02",
    title: "06 Install SQLite",
    level: "Beginner",
    duration: "30 min",
    objectives: [
      "Install sqlite3 CLI",
      "Create a file database",
      "Run a first query",
    ],
    content: `
<p><strong>SQLite</strong> is a serverless database in a single file - perfect for labs and local apps.</p>
<h2>Windows</h2>
<ol>
<li>Download precompiled binaries from sqlite.org.</li>
<li>Add the folder to PATH.</li>
<li>Open PowerShell: <code>sqlite3 |- version</code></li>
</ol>
<h2>Linux</h2>
<pre><code>sudo apt install sqlite3
sqlite3 |- version</code></pre>
<h2>Create & query</h2>
<pre><code>sqlite3 ashovix.db
SQLite version ...
sqlite> CREATE TABLE hello(id INTEGER PRIMARY KEY, msg TEXT);
sqlite> INSERT INTO hello(msg) VALUES ('SQL Mastery');
sqlite> SELECT * FROM hello;
sqlite> .quit</code></pre>
<div class="callout"><strong>Tip:</strong> The database <em>is</em> the file <code>ashovix.db</code>. Back it up by copying the file.</div>
`,
    quiz: {
      q: "SQLite stores a database primarily as:",
      options: [
        "A remote cluster only",
        "A single file on disk",
        "Only RAM with no persistence",
        "A spreadsheet workbook",
      ],
      answer: 1
    }
  });

  L("sql07", {
    module: "sql-m02",
    title: "07 Install MySQL",
    level: "Beginner",
    duration: "35 min",
    objectives: [
      "Install MySQL Server",
      "Connect with mysql client",
      "Create a practice database",
    ],
    content: `
<p>MySQL is widely used for web applications. MariaDB is a compatible alternative.</p>
<h2>Windows</h2>
<ol>
<li>Install MySQL Community Server.</li>
<li>Set root password; note port <code>3306</code>.</li>
<li>Open MySQL Command Line Client.</li>
</ol>
<h2>Linux</h2>
<pre><code>sudo apt install mysql- server
sudo mysql
CREATE DATABASE ashovix;
SHOW DATABASES;</code></pre>
<h2>Verify</h2>
<pre><code>SELECT VERSION();
CREATE DATABASE practice;
USE practice;</code></pre>
<div class="callout"><strong>Lab:</strong> Connect, create database <code>ashovix</code>, run <code>SELECT VERSION();</code>.</div>
`,
    quiz: {
      q: "MySQL default port is commonly:",
      options: [
        "5432",
        "3306",
        "6379",
        "9200",
      ],
      answer: 1
    }
  });

  L("sql08", {
    module: "sql-m02",
    title: "08 SQL Tools",
    level: "Beginner",
    duration: "30 min",
    objectives: [
      "Use CLI clients",
      "Try a GUI tool",
      "Run a script file",
    ],
    content: `
<p>You will use both CLIs and GUIs professionally.</p>
<h2>CLI tools</h2>
<ul>
<li><code>psql</code> - PostgreSQL</li>
<li><code>sqlite3</code> - SQLite</li>
<li><code>mysql</code> - MySQL</li>
</ul>
<h2>GUI tools</h2>
<ul>
<li>DBeaver (multi- engine)</li>
<li>pgAdmin (PostgreSQL)</li>
<li>MySQL Workbench</li>
<li>VS Code SQL extensions</li>
</ul>
<h2>Run a script file</h2>
<pre><code>|- hello.sql
SELECT 1 AS ok, 'Ashovix' AS lab;

|- PostgreSQL
psql - U postgres - d ashovix - f hello.sql

|- SQLite
sqlite3 ashovix.db &lt; hello.sql</code></pre>
<div class="callout"><strong>Practice:</strong> Create <code>hello.sql</code>, execute it from CLI, confirm output.</div>
`,
    quiz: {
      q: "Which tool talks to many database engines from one GUI?",
      options: [
        "Only Notepad",
        "DBeaver",
        "CSS Grid",
        "npm",
      ],
      answer: 1
    }
  });

  L("sql09", {
    module: "sql-m03",
    title: "09 Create First Database",
    level: "Beginner",
    duration: "25 min",
    objectives: [
      "Create a database",
      "Connect to it",
      "List databases",
    ],
    content: `
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
|- file created on open; no CREATE DATABASE needed</code></pre>
<div class="callout"><strong>Lab:</strong> Create <code>ashovix</code> (or a file DB) and confirm you are connected.</div>
`,
    quiz: {
      q: "In PostgreSQL, switch database in psql with:",
      options: [
        "\\c dbname",
        "USE ONLY",
        "OPEN DATABASE",
        "FLIP TO",
      ],
      answer: 0
    }
  });

  L("sql10", {
    module: "sql-m03",
    title: "10 Tables",
    level: "Beginner",
    duration: "30 min",
    objectives: [
      "Create a table",
      "Describe structure",
      "Drop safely",
    ],
    content: `
<p>A <strong>table</strong> is a named set of columns. Every row follows that structure.</p>
<pre><code>CREATE TABLE customers (
  id   INTEGER PRIMARY KEY,
  name TEXT NOT NULL,
  city TEXT
);

INSERT INTO customers (id, name, city) VALUES (1, 'Asha', 'Pune');
SELECT * FROM customers;</code></pre>
<h2>Inspect</h2>
<pre><code>|- PostgreSQL
\d customers
|- SQLite
.schema customers</code></pre>
<pre><code>DROP TABLE IF EXISTS customers;</code></pre>
`,
    quiz: {
      q: "A table is best described as:",
      options: [
        "A random JSON blob",
        "A structured set of columns and rows",
        "A CSS class",
        "A Linux process",
      ],
      answer: 1
    }
  });

  L("sql11", {
    module: "sql-m03",
    title: "11 Rows",
    level: "Beginner",
    duration: "20 min",
    objectives: [
      "Insert rows",
      "Update a row",
      "Delete a row",
    ],
    content: `
<p>A <strong>row</strong> (record/tuple) is one instance - one customer, one order, one product.</p>
<pre><code>INSERT INTO customers (id, name, city) VALUES
  (1, 'Asha', 'Pune'),
  (2, 'Dev', 'Chennai');

UPDATE customers SET city = 'Mumbai' WHERE id = 1;
DELETE FROM customers WHERE id = 2;
SELECT * FROM customers;</code></pre>
<div class="callout"><strong>Safety:</strong> Always <code>SELECT</code> with the same <code>WHERE</code> before <code>UPDATE</code>/<code>DELETE</code>.</div>
`,
    quiz: {
      q: "Before DELETE, best practice is to:",
      options: [
        "Restart the server",
        "SELECT the same WHERE first",
        "Drop the database",
        "Disable indexes forever",
      ],
      answer: 1
    }
  });

  L("sql12", {
    module: "sql-m03",
    title: "12 Columns",
    level: "Beginner",
    duration: "20 min",
    objectives: [
      "Add a column",
      "Rename carefully",
      "Choose meaningful names",
    ],
    content: `
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
`,
    quiz: {
      q: "A column represents:",
      options: [
        "An entire database backup",
        "One named attribute/field for every row",
        "Only the primary key",
        "A network port",
      ],
      answer: 1
    }
  });

  L("sql13", {
    module: "sql-m03",
    title: "13 Data Types",
    level: "Beginner",
    duration: "35 min",
    objectives: [
      "Pick types for text, numbers, dates",
      "Avoid wrong types",
    ],
    content: `
<div class="table- wrap"><table>
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
`,
    quiz: {
      q: "Best type for currency amounts:",
      options: [
        "FLOAT only",
        "NUMERIC/DECIMAL",
        "BOOLEAN",
        "BLOB of images",
      ],
      answer: 1
    }
  });

  L("sql14", {
    module: "sql-m03",
    title: "14 Constraints",
    level: "Beginner",
    duration: "35 min",
    objectives: [
      "Apply NOT NULL, UNIQUE, CHECK",
      "See constraint errors",
    ],
    content: `
<p>Constraints protect data quality at the database level.</p>
<pre><code>CREATE TABLE users (
  id    INTEGER PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  age   INT CHECK (age >= 0),
  role  TEXT NOT NULL DEFAULT 'student'
);

|- Fails: duplicate email
INSERT INTO users(id,email,age) VALUES (1,'a@x.com',20);
INSERT INTO users(id,email,age) VALUES (2,'a@x.com',22);</code></pre>
<ul>
<li><strong>NOT NULL</strong> - required value</li>
<li><strong>UNIQUE</strong> - no duplicates</li>
<li><strong>CHECK</strong> - custom rule</li>
<li><strong>DEFAULT</strong> - fill when omitted</li>
</ul>
`,
    quiz: {
      q: "UNIQUE constraint means:",
      options: [
        "Column can be missing always",
        "No two rows may share the same value",
        "Table cannot be queried",
        "Indexes are forbidden",
      ],
      answer: 1
    }
  });

  L("sql15", {
    module: "sql-m03",
    title: "15 Primary Key",
    level: "Beginner",
    duration: "30 min",
    objectives: [
      "Define a primary key",
      "Use surrogate vs natural keys",
    ],
    content: `
<p>A <strong>primary key (PK)</strong> uniquely identifies each row. It is NOT NULL and UNIQUE.</p>
<pre><code>CREATE TABLE orders (
  order_id INTEGER PRIMARY KEY,           |- surrogate key
  order_no TEXT NOT NULL UNIQUE,          |- business number
  total    NUMERIC(10,2) NOT NULL
);</code></pre>
<pre><code>|- Composite primary key example
CREATE TABLE enrollment (
  student_id INT NOT NULL,
  course_id  INT NOT NULL,
  PRIMARY KEY (student_id, course_id)
);</code></pre>
<div class="callout"><strong>Practice:</strong> Prefer a simple integer/UUID PK for joins; keep business codes UNIQUE separately.</div>
`,
    quiz: {
      q: "A primary key must be:",
      options: [
        "Nullable and duplicated",
        "Unique and not null",
        "Always a float",
        "Stored only in Redis",
      ],
      answer: 1
    }
  });

  L("sql16", {
    module: "sql-m03",
    title: "16 Foreign Key",
    level: "Beginner",
    duration: "35 min",
    objectives: [
      "Create FK relationships",
      "Understand referential integrity",
    ],
    content: `
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
|- Fails: no customer 99
INSERT INTO orders VALUES (11, 99, 10.00);</code></pre>
<div class="callout"><strong>Why it matters:</strong> FKs stop orphan orders that point to missing customers.</div>
`,
    quiz: {
      q: "A foreign key ensures:",
      options: [
        "Faster CSS",
        "Referential integrity between tables",
        "That backups never run",
        "Only one column exists",
      ],
      answer: 1
    }
  });

  L("sql17", {
    module: "sql-m03",
    title: "17 Normalization",
    level: "Intermediate",
    duration: "40 min",
    objectives: [
      "Explain 1NF, 2NF, 3NF",
      "Refactor a denormalized table",
    ],
    content: `
<p><strong>Normalization</strong> reduces duplication and update anomalies by designing related tables.</p>
<h2>Bad (denormalized)</h2>
<pre><code>|- phones packed in one cell; course names repeated
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
`,
    quiz: {
      q: "Normalization mainly aims to:",
      options: [
        "Add random duplication",
        "Reduce redundancy and anomalies",
        "Delete all indexes",
        "Ban SELECT",
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
      "Use CREATE/ALTER/DROP",
      "Change structure safely",
    ],
    content: `
<p><strong>DDL</strong> (Data Definition Language) defines structure.</p>
<pre><code>CREATE TABLE products (
  id INT PRIMARY KEY,
  title TEXT NOT NULL
);

ALTER TABLE products ADD COLUMN price NUMERIC(10,2);
ALTER TABLE products RENAME TO catalog_products;
DROP TABLE IF EXISTS catalog_products;</code></pre>
<div class="callout"><strong>Caution:</strong> <code>DROP</code>/<code>ALTER</code> can destroy or lock production data - practice on labs first.</div>
`,
    quiz: {
      q: "Which is DDL?",
      options: [
        "SELECT * FROM t",
        "CREATE TABLE t (...)",
        "COMMIT",
        "GRANT SELECT",
      ],
      answer: 1
    }
  });

  L("sql19", {
    module: "sql-m04",
    title: "19 DML",
    level: "Beginner",
    duration: "35 min",
    objectives: [
      "INSERT, UPDATE, DELETE with WHERE",
      "Use transactions for safety",
    ],
    content: `
<p><strong>DML</strong> changes data rows.</p>
<pre><code>INSERT INTO products(id, title, price) VALUES (1, 'SQL Book', 499);

UPDATE products SET price = 449 WHERE id = 1;

DELETE FROM products WHERE id = 1;</code></pre>
<pre><code>BEGIN;
UPDATE accounts SET balance = balance - 100 WHERE id = 1;
UPDATE accounts SET balance = balance + 100 WHERE id = 2;
COMMIT;  |- or ROLLBACK;</code></pre>
`,
    quiz: {
      q: "Which statement is DML?",
      options: [
        "CREATE INDEX",
        "UPDATE students SET grade=A WHERE id=5",
        "GRANT ALL",
        "ALTER TABLE",
      ],
      answer: 1
    }
  });

  L("sql20", {
    module: "sql-m04",
    title: "20 DQL",
    level: "Beginner",
    duration: "35 min",
    objectives: [
      "Write SELECT queries",
      "Project columns and filter rows",
    ],
    content: `
<p><strong>DQL</strong> is primarily <code>SELECT</code> - reading data without changing it.</p>
<pre><code>SELECT name, city
FROM customers
WHERE city = 'Pune'
ORDER BY name;</code></pre>
<pre><code>SELECT COUNT(*) AS total_customers FROM customers;
SELECT DISTINCT city FROM customers;</code></pre>
<div class="callout"><strong>Tip:</strong> Master <code>SELECT</code> deeply - most SQL work is reading and shaping data.</div>
`,
    quiz: {
      q: "DQL is mainly associated with:",
      options: [
        "DROP DATABASE",
        "SELECT",
        "GRANT",
        "SAVEPOINT",
      ],
      answer: 1
    }
  });

  L("sql21", {
    module: "sql-m04",
    title: "21 TCL",
    level: "Intermediate",
    duration: "35 min",
    objectives: [
      "COMMIT and ROLLBACK",
      "Use SAVEPOINT",
    ],
    content: `
<p><strong>TCL</strong> (Transaction Control Language) groups statements into atomic units.</p>
<pre><code>BEGIN;
UPDATE accounts SET balance = balance - 500 WHERE id = 1;
SAVEPOINT after_debit;
UPDATE accounts SET balance = balance + 500 WHERE id = 2;
|- oops?
ROLLBACK TO after_debit;
ROLLBACK;  |- cancel all
|- or COMMIT; to save</code></pre>
<ul>
<li><strong>COMMIT</strong> - make permanent</li>
<li><strong>ROLLBACK</strong> - undo</li>
<li><strong>SAVEPOINT</strong> - partial undo point</li>
</ul>
`,
    quiz: {
      q: "ROLLBACK does what?",
      options: [
        "Creates a new table",
        "Undoes uncommitted work in the transaction",
        "Grants admin rights",
        "Builds an index",
      ],
      answer: 1
    }
  });

  L("sql22", {
    module: "sql-m04",
    title: "22 DCL",
    level: "Intermediate",
    duration: "30 min",
    objectives: [
      "GRANT and REVOKE privileges",
      "Think least privilege",
    ],
    content: `
<p><strong>DCL</strong> controls who can do what.</p>
<pre><code>|- PostgreSQL- style examples
CREATE ROLE analyst LOGIN PASSWORD 'change- me';
GRANT SELECT ON ALL TABLES IN SCHEMA public TO analyst;
REVOKE SELECT ON payroll FROM analyst;</code></pre>
<div class="callout"><strong>Security:</strong> Give the minimum privileges required (least privilege).</div>
`,
    quiz: {
      q: "GRANT is part of:",
      options: [
        "DQL",
        "DCL",
        "HTML",
        "CSS",
      ],
      answer: 1
    }
  });

  L("sql23", {
    module: "sql-m05",
    title: "23 Operators",
    level: "Beginner",
    duration: "30 min",
    objectives: [
      "Use comparison and logical operators",
      "Use IN, BETWEEN, LIKE",
    ],
    content: `
<pre><code>SELECT * FROM products WHERE price &gt;= 500;
SELECT * FROM products WHERE price BETWEEN 100 AND 500;
SELECT * FROM customers WHERE city IN ('Pune','Mumbai');
SELECT * FROM customers WHERE name LIKE 'A%';
SELECT * FROM products WHERE price &gt; 100 AND in_stock = TRUE;
SELECT * FROM products WHERE category IS NULL;</code></pre>
<div class="table- wrap"><table>
<thead><tr><th>Operator</th><th>Meaning</th></tr></thead>
<tbody>
<tr><td><code>= &lt;&gt; &lt; &gt; &lt;= &gt;=</code></td><td>Compare values</td></tr>
<tr><td><code>AND OR NOT</code></td><td>Combine predicates</td></tr>
<tr><td><code>LIKE</code></td><td>Pattern match</td></tr>
<tr><td><code>IS NULL</code></td><td>Null test (not <code>= NULL</code>)</td></tr>
</tbody></table></div>
`,
    quiz: {
      q: "To test NULL correctly use:",
      options: [
        "= NULL",
        "IS NULL",
        "== null",
        "EQUALS NONE",
      ],
      answer: 1
    }
  });

  L("sql24", {
    module: "sql-m05",
    title: "24 WHERE",
    level: "Beginner",
    duration: "30 min",
    objectives: [
      "Filter rows with WHERE",
      "Combine conditions safely",
    ],
    content: `
<p><code>WHERE</code> filters rows <em>before</em> grouping.</p>
<pre><code>SELECT id, name, city
FROM customers
WHERE city = 'Pune' AND name LIKE 'A%';</code></pre>
<pre><code>|- Dangerous: missing WHERE updates ALL rows
UPDATE products SET price = 0;  |- DON''T</code></pre>
<div class="callout"><strong>Order reminder:</strong> FROM - WHERE - GROUP BY - HAVING - SELECT - ORDER BY</div>
`,
    quiz: {
      q: "WHERE filters:",
      options: [
        "Columns only after SELECT list formatting",
        "Rows based on conditions",
        "Indexes exclusively",
        "Users in Linux",
      ],
      answer: 1
    }
  });

  L("sql25", {
    module: "sql-m05",
    title: "25 ORDER BY",
    level: "Beginner",
    duration: "25 min",
    objectives: [
      "Sort ascending/descending",
      "Sort by multiple columns",
    ],
    content: `
<pre><code>SELECT title, price FROM products
ORDER BY price DESC, title ASC;</code></pre>
<pre><code>SELECT name, city FROM customers
ORDER BY city, name;</code></pre>
<div class="callout"><strong>Note:</strong> Without ORDER BY, row order is not guaranteed.</div>
`,
    quiz: {
      q: "ORDER BY price DESC means:",
      options: [
        "Cheapest first",
        "Highest price first",
        "Delete prices",
        "Group prices",
      ],
      answer: 1
    }
  });

  L("sql26", {
    module: "sql-m05",
    title: "26 GROUP BY",
    level: "Intermediate",
    duration: "35 min",
    objectives: [
      "Aggregate with COUNT/SUM/AVG",
      "Group rows",
    ],
    content: `
<pre><code>SELECT city, COUNT(*) AS customers
FROM customers
GROUP BY city
ORDER BY customers DESC;</code></pre>
<pre><code>SELECT customer_id, SUM(total) AS revenue
FROM orders
GROUP BY customer_id;</code></pre>
<div class="callout"><strong>Rule:</strong> Non- aggregated SELECT columns must appear in GROUP BY.</div>
`,
    quiz: {
      q: "GROUP BY is used with:",
      options: [
        "Only DROP TABLE",
        "Aggregate functions like COUNT/SUM",
        "CSS Grid",
        "SSH keys",
      ],
      answer: 1
    }
  });

  L("sql27", {
    module: "sql-m05",
    title: "27 HAVING",
    level: "Intermediate",
    duration: "30 min",
    objectives: [
      "Filter groups with HAVING",
      "Contrast WHERE vs HAVING",
    ],
    content: `
<pre><code>SELECT city, COUNT(*) AS n
FROM customers
GROUP BY city
HAVING COUNT(*) &gt;= 2;</code></pre>
<div class="table- wrap"><table>
<thead><tr><th>WHERE</th><th>HAVING</th></tr></thead>
<tbody>
<tr><td>Filters rows</td><td>Filters groups</td></tr>
<tr><td>Before GROUP BY</td><td>After GROUP BY</td></tr>
<tr><td>Cannot use aggregate results easily</td><td>Can use COUNT/SUM-/td></tr>
</tbody></table></div>
`,
    quiz: {
      q: "HAVING filters:",
      options: [
        "Files on disk",
        "Grouped results after aggregation",
        "Only primary keys",
        "TCP packets",
      ],
      answer: 1
    }
  });

  L("sql28", {
    module: "sql-m06",
    title: "28 Joins",
    level: "Intermediate",
    duration: "45 min",
    objectives: [
      "Write INNER and LEFT joins",
      "Join three tables",
    ],
    content: `
<pre><code>SELECT c.name, o.id AS order_id, o.total
FROM customers c
INNER JOIN orders o ON o.customer_id = c.id;</code></pre>
<pre><code>|- Customers even without orders
SELECT c.name, o.id AS order_id
FROM customers c
LEFT JOIN orders o ON o.customer_id = c.id;</code></pre>
<pre><code>SELECT c.name, p.title, oi.qty
FROM orders o
JOIN customers c ON c.id = o.customer_id
JOIN order_items oi ON oi.order_id = o.id
JOIN products p ON p.id = oi.product_id;</code></pre>
<div class="callout"><strong>INNER</strong> keeps matches only. <strong>LEFT</strong> keeps all left rows.</div>
`,
    quiz: {
      q: "LEFT JOIN returns:",
      options: [
        "Only matching right rows alone",
        "All left rows, matched right data or NULL",
        "Only duplicate keys",
        "No rows ever",
      ],
      answer: 1
    }
  });

  L("sql29", {
    module: "sql-m06",
    title: "29 Subqueries",
    level: "Intermediate",
    duration: "40 min",
    objectives: [
      "Use scalar and IN subqueries",
      "Compare to joins",
    ],
    content: `
<pre><code>|- Products above average price
SELECT title, price
FROM products
WHERE price &gt; (SELECT AVG(price) FROM products);</code></pre>
<pre><code>|- Customers who placed orders
SELECT name FROM customers
WHERE id IN (SELECT customer_id FROM orders);</code></pre>
<pre><code>SELECT c.name,
  (SELECT COUNT(*) FROM orders o WHERE o.customer_id = c.id) AS order_count
FROM customers c;</code></pre>
`,
    quiz: {
      q: "A subquery is:",
      options: [
        "A query nested inside another SQL statement",
        "A Linux daemon",
        "A CSS selector",
        "A Git branch",
      ],
      answer: 0
    }
  });

  L("sql30", {
    module: "sql-m06",
    title: "30 Views",
    level: "Intermediate",
    duration: "30 min",
    objectives: [
      "Create a view",
      "Query through a view",
    ],
    content: `
<p>A <strong>view</strong> is a saved query that looks like a table.</p>
<pre><code>CREATE VIEW v_customer_revenue AS
SELECT c.id, c.name, COALESCE(SUM(o.total),0) AS revenue
FROM customers c
LEFT JOIN orders o ON o.customer_id = c.id
GROUP BY c.id, c.name;

SELECT * FROM v_customer_revenue WHERE revenue &gt; 1000;</code></pre>
<div class="callout"><strong>Use views</strong> for reuse, security (hide columns), and simplifying reports.</div>
`,
    quiz: {
      q: "A view is best described as:",
      options: [
        "A physical backup file",
        "A stored query presented like a table",
        "A primary key only",
        "A Redis list",
      ],
      answer: 1
    }
  });

  L("sql31", {
    module: "sql-m06",
    title: "31 Indexes",
    level: "Intermediate",
    duration: "40 min",
    objectives: [
      "Create indexes",
      "Know when indexes help",
    ],
    content: `
<pre><code>CREATE INDEX ix_orders_customer ON orders(customer_id);
CREATE INDEX ix_products_title ON products(title);

SELECT * FROM orders WHERE customer_id = 42;</code></pre>
<ul>
<li>Speed up WHERE/JOIN lookups on selective columns</li>
<li>Slow down heavy INSERT/UPDATE/DELETE slightly</li>
<li>Do not index everything blindly</li>
</ul>
<pre><code>|- PostgreSQL
EXPLAIN ANALYZE SELECT * FROM orders WHERE customer_id = 42;</code></pre>
`,
    quiz: {
      q: "Indexes are primarily used to:",
      options: [
        "Make UI colors prettier",
        "Speed up lookups/filters/joins",
        "Delete foreign keys",
        "Replace backups",
      ],
      answer: 1
    }
  });

  L("sql32", {
    module: "sql-m06",
    title: "32 Stored Procedures",
    level: "Advanced",
    duration: "40 min",
    objectives: [
      "Understand procedures",
      "See a portable pattern",
    ],
    content: `
<p>A <strong>stored procedure</strong> is server-side procedural code invoked on demand (syntax varies by vendor).</p>
<pre><code>|- PostgreSQL function used like a procedure
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
`,
    quiz: {
      q: "Stored procedures run:",
      options: [
        "Only in the browser CSS engine",
        "On the database server",
        "Inside Photoshop",
        "On DNS servers only",
      ],
      answer: 1
    }
  });

  L("sql33", {
    module: "sql-m06",
    title: "33 Functions",
    level: "Advanced",
    duration: "35 min",
    objectives: [
      "Use built-in SQL functions",
      "Contrast with procedures",
    ],
    content: `
<pre><code>SELECT UPPER(name), LENGTH(name), COALESCE(city, 'Unknown')
FROM customers;

SELECT ROUND(AVG(price), 2) FROM products;
SELECT DATE_TRUNC('month', created_at) FROM orders; |- Postgres</code></pre>
<ul>
<li><strong>Scalar functions</strong> return one value</li>
<li><strong>Aggregate functions</strong> summarize many rows</li>
<li>User- defined functions encapsulate reusable logic</li>
</ul>
`,
    quiz: {
      q: "COALESCE(a,b) returns:",
      options: [
        "Always null",
        "First non- null among args",
        "Only b",
        "A new table",
      ],
      answer: 1
    }
  });

  L("sql34", {
    module: "sql-m06",
    title: "34 Triggers",
    level: "Advanced",
    duration: "40 min",
    objectives: [
      "Explain trigger use cases",
      "See an audit example",
    ],
    content: `
<p>A <strong>trigger</strong> runs automatically on INSERT/UPDATE/DELETE.</p>
<pre><code>|- Concept: audit price changes (Postgres-style sketch)
CREATE TABLE product_audit (
  product_id INT,
  old_price NUMERIC,
  new_price NUMERIC,
  changed_at TIMESTAMP DEFAULT NOW()
);

|- Trigger function would INSERT into product_audit
|- WHEN products.price is updated</code></pre>
<ul>
<li>Auditing / history</li>
<li>Derived values</li>
<li>Enforcing complex rules</li>
</ul>
<div class="callout"><strong>Caution:</strong> Hidden trigger logic can surprise app developers - document it.</div>
`,
    quiz: {
      q: "Triggers execute:",
      options: [
        "Only when you open Excel",
        "Automatically on table events",
        "Never on UPDATE",
        "On DNS resolve",
      ],
      answer: 1
    }
  });

  L("sql35", {
    module: "sql-m06",
    title: "35 Transactions",
    level: "Intermediate",
    duration: "40 min",
    objectives: [
      "Apply ACID",
      "Transfer funds safely",
    ],
    content: `
<p>Transactions give <strong>ACID</strong>: Atomicity, Consistency, Isolation, Durability.</p>
<pre><code>BEGIN;
UPDATE accounts SET balance = balance - 1000 WHERE id = 1;
UPDATE accounts SET balance = balance + 1000 WHERE id = 2;
COMMIT;</code></pre>
<pre><code>BEGIN;
UPDATE accounts SET balance = balance - 1000 WHERE id = 1;
|- error / doubt
ROLLBACK;</code></pre>
<div class="callout"><strong>Lab:</strong> Implement a money transfer that either fully succeeds or fully rolls back.</div>
`,
    quiz: {
      q: "Atomicity means:",
      options: [
        "Partially commit forever",
        "All steps succeed or none do",
        "Ignore constraints",
        "Drop indexes",
      ],
      answer: 1
    }
  });

  L("sql36", {
    module: "sql-m07",
    title: "36 Performance Tuning",
    level: "Advanced",
    duration: "45 min",
    objectives: [
      "Use EXPLAIN",
      "Fix common anti-patterns",
    ],
    content: `
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
<pre><code>|- Anti- pattern
WHERE YEAR(created_at) = 2026
|- Better (Postgres)
WHERE created_at &gt;= DATE '2026-01-01'
  AND created_at &lt;  DATE '2027-01-01';</code></pre>
`,
    quiz: {
      q: "EXPLAIN ANALYZE helps you:",
      options: [
        "Design logos",
        "See the real query plan and timings",
        "Send email",
        "Compile C++",
      ],
      answer: 1
    }
  });

  L("sql37", {
    module: "sql-m07",
    title: "37 Database Design",
    level: "Advanced",
    duration: "45 min",
    objectives: [
      "Model entities and relationships",
      "Choose keys and constraints",
    ],
    content: `
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
`,
    quiz: {
      q: "N:M relationships usually need:",
      options: [
        "A junction/bridge table",
        "No tables",
        "Only CSS",
        "A single flat cell",
      ],
      answer: 0
    }
  });

  L("sql38", {
    module: "sql-m07",
    title: "38 Interview Questions",
    level: "Advanced",
    duration: "40 min",
    objectives: [
      "Answer common SQL interview prompts",
      "Practice aloud",
    ],
    content: `
<h2>High- frequency questions</h2>
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
<pre><code>|- Duplicates
SELECT email, COUNT(*)
FROM users
GROUP BY email
HAVING COUNT(*) &gt; 1;

|- Second highest salary (portable idea)
SELECT MAX(salary) FROM employees
WHERE salary &lt; (SELECT MAX(salary) FROM employees);</code></pre>
<div class="callout"><strong>Practice:</strong> Explain each answer with a tiny example sketch.</div>
`,
    quiz: {
      q: "WHERE vs HAVING: HAVING filters:",
      options: [
        "Rows before grouping",
        "Groups after aggregation",
        "Only file names",
        "OS users",
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
    ],
    content: `
<p>This is your <strong>SQL Mastery Final Assessment</strong>.</p>
<ul>
<li><strong>60 questions</strong> covering lessons 01-8</li>
<li><strong>90 minutes</strong> timed</li>
<li>Multiple choice</li>
<li>Score card at the end (score, %, pass/fail, review)</li>
</ul>
<p>Passing score: <strong>70%</strong> (42/60 or higher).</p>
<p><a class="btn btn- primary" href="#/course/sql/assessment" data- nav>Start Final Assessment</a></p>
<div class="callout"><strong>Rules:</strong> Timer auto- submits at 0:00. You can submit early. Results save in this browser.</div>
`,
    quiz: null
  });

  const assessmentQuestions = [
    {
      q: "SQL stands for?",
      options: [
        "Structured Query Language",
        "Simple Query List",
        "Server Queue Logic",
        "Sequential Queue Language",
      ],
      answer: 0
    },
    {
      q: "Which engine is embedded as a file DB?",
      options: [
        "Oracle RAC only",
        "SQLite",
        "Only Redis Cluster",
        "Photoshop",
      ],
      answer: 1
    },
    {
      q: "Default PostgreSQL port?",
      options: [
        "3306",
        "5432",
        "1521",
        "27017",
      ],
      answer: 1
    },
    {
      q: "Default MySQL port?",
      options: [
        "5432",
        "3306",
        "6379",
        "1433",
      ],
      answer: 1
    },
    {
      q: "Which is DDL?",
      options: [
        "SELECT",
        "CREATE TABLE",
        "COMMIT",
        "GRANT",
      ],
      answer: 1
    },
    {
      q: "Which is DML?",
      options: [
        "ALTER TABLE",
        "INSERT INTO",
        "REVOKE",
        "CREATE INDEX",
      ],
      answer: 1
    },
    {
      q: "Which is mainly DQL?",
      options: [
        "DROP",
        "SELECT",
        "GRANT",
        "ROLLBACK",
      ],
      answer: 1
    },
    {
      q: "COMMIT belongs to?",
      options: [
        "DQL",
        "TCL",
        "HTML",
        "CSS",
      ],
      answer: 1
    },
    {
      q: "GRANT belongs to?",
      options: [
        "DML",
        "DCL",
        "DQL",
        "TCL",
      ],
      answer: 1
    },
    {
      q: "A primary key must be?",
      options: [
        "Null and duplicate OK",
        "Unique and NOT NULL",
        "Float only",
        "Unindexed always",
      ],
      answer: 1
    },
    {
      q: "Foreign keys enforce?",
      options: [
        "UI themes",
        "Referential integrity",
        "DNS only",
        "CPU affinity",
      ],
      answer: 1
    },
    {
      q: "NOT NULL means?",
      options: [
        "Value optional",
        "Value required",
        "Always zero",
        "Always unique",
      ],
      answer: 1
    },
    {
      q: "Best type for money?",
      options: [
        "FLOAT",
        "NUMERIC/DECIMAL",
        "BOOLEAN",
        "CLOB of HTML",
      ],
      answer: 1
    },
    {
      q: "WHERE filters?",
      options: [
        "Groups after aggregation",
        "Rows",
        "Only indexes",
        "Linux users",
      ],
      answer: 1
    },
    {
      q: "HAVING filters?",
      options: [
        "Rows before GROUP BY",
        "Groups after aggregation",
        "CSS classes",
        "Files",
      ],
      answer: 1
    },
    {
      q: "ORDER BY price DESC sorts?",
      options: [
        "Low to high",
        "High to low",
        "Random",
        "By name only",
      ],
      answer: 1
    },
    {
      q: "INNER JOIN returns?",
      options: [
        "All left rows always",
        "Matching rows only",
        "All right rows always",
        "No matches ever",
      ],
      answer: 1
    },
    {
      q: "LEFT JOIN returns?",
      options: [
        "Matching only",
        "All left + match or NULL",
        "All right only",
        "Cartesian only",
      ],
      answer: 1
    },
    {
      q: "COUNT(*) counts?",
      options: [
        "Only nulls",
        "Rows in the group/result",
        "Columns only",
        "Indexes only",
      ],
      answer: 1
    },
    {
      q: "To test NULL use?",
      options: [
        "= NULL",
        "IS NULL",
        "== NULL",
        "EQUALS NULL",
      ],
      answer: 1
    },
    {
      q: "LIKE 'A%' matches?",
      options: [
        "Ends with A",
        "Starts with A",
        "Equals A only",
        "Never matches",
      ],
      answer: 1
    },
    {
      q: "BETWEEN 10 AND 20 is?",
      options: [
        "Exclusive ends always",
        "Inclusive range typically",
        "Only strings",
        "Invalid SQL",
      ],
      answer: 1
    },
    {
      q: "A view is?",
      options: [
        "A backup tape",
        "Saved query as a table-like object",
        "A PK constraint",
        "A Redis stream",
      ],
      answer: 1
    },
    {
      q: "Indexes help?",
      options: [
        "Lookups and joins",
        "Only fonts",
        "Deleting FK rules",
        "HTTPS certs",
      ],
      answer: 1
    },
    {
      q: "EXPLAIN ANALYZE?",
      options: [
        "Draws ERD art",
        "Shows plan + actual timings",
        "Sends email",
        "Creates users",
      ],
      answer: 1
    },
    {
      q: "Atomicity means?",
      options: [
        "Partial commits OK",
        "All- or- nothing transaction",
        "Ignore FKs",
        "Drop schema",
      ],
      answer: 1
    },
    {
      q: "ROLLBACK does?",
      options: [
        "Creates DB",
        "Undoes uncommitted work",
        "Grants root",
        "Builds UI",
      ],
      answer: 1
    },
    {
      q: "Normalization reduces?",
      options: [
        "Network cables",
        "Redundancy/anomalies",
        "Need for backups forever",
        "SQL itself",
      ],
      answer: 1
    },
    {
      q: "1NF requires?",
      options: [
        "Atomic values / no repeating groups",
        "Only MongoDB",
        "No primary keys",
        "Only floats",
      ],
      answer: 0
    },
    {
      q: "Junction table used for?",
      options: [
        "1:1 only",
        "Many- to- many (N:M)",
        "No relations",
        "CSS layout",
      ],
      answer: 1
    },
    {
      q: "DELETE vs DROP TABLE?",
      options: [
        "Same thing",
        "DELETE removes rows; DROP removes table",
        "DROP removes one row only",
        "DELETE drops schema",
      ],
      answer: 1
    },
    {
      q: "TRUNCATE typically?",
      options: [
        "Removes all rows quickly",
        "Creates index",
        "Grants role",
        "Renames column",
      ],
      answer: 0
    },
    {
      q: "Subquery is?",
      options: [
        "Nested query",
        "OS thread",
        "Git tag",
        "K8s pod",
      ],
      answer: 0
    },
    {
      q: "COALESCE(a,b) returns?",
      options: [
        "Always a",
        "First non- null",
        "Always null",
        "Sum only",
      ],
      answer: 1
    },
    {
      q: "UNIQUE allows?",
      options: [
        "Duplicate values freely",
        "No duplicate non- null values",
        "Only nulls",
        "No SELECT",
      ],
      answer: 1
    },
    {
      q: "CHECK constraint?",
      options: [
        "Validates a condition on values",
        "Creates a user",
        "Opens firewall",
        "Sorts rows",
      ],
      answer: 0
    },
    {
      q: "psql is CLI for?",
      options: [
        "MongoDB",
        "PostgreSQL",
        "Redis only",
        "Photoshop",
      ],
      answer: 1
    },
    {
      q: "sqlite3 ashovix.db creates?",
      options: [
        "A Postgres cluster",
        "A SQLite DB file",
        "An S3 bucket",
        "A Docker swarm",
      ],
      answer: 1
    },
    {
      q: "SELECT DISTINCT removes?",
      options: [
        "All rows",
        "Duplicate result rows",
        "Primary keys",
        "Databases",
      ],
      answer: 1
    },
    {
      q: "GROUP BY used with?",
      options: [
        "Aggregates",
        "Only DROP",
        "Only GRANT",
        "SSH",
      ],
      answer: 0
    },
    {
      q: "Correlated subquery?",
      options: [
        "Refs outer query per row",
        "Never uses SQL",
        "Only runs offline",
        "Creates CSS",
      ],
      answer: 0
    },
    {
      q: "Second highest salary approach?",
      options: [
        "MAX of values below MAX",
        "DELETE MAX",
        "DROP TABLE",
        "GRANT ALL",
      ],
      answer: 0
    },
    {
      q: "ACID Isolation means?",
      options: [
        "Transactions do not step on each other incorrectly",
        "No durability",
        "No consistency",
        "No atomicity",
      ],
      answer: 0
    },
    {
      q: "Trigger fires?",
      options: [
        "On table events automatically",
        "Only on Mondays",
        "Never on INSERT",
        "In the browser only",
      ],
      answer: 0
    },
    {
      q: "Stored procedure runs?",
      options: [
        "On DB server",
        "In CSS",
        "In DNS",
        "In Excel chart",
      ],
      answer: 0
    },
    {
      q: "Avoid for money?",
      options: [
        "NUMERIC",
        "FLOAT/REAL for exact currency",
        "DECIMAL",
        "INTEGER cents",
      ],
      answer: 1
    },
    {
      q: "FK child row pointing missing parent?",
      options: [
        "Allowed always",
        "Blocked if FK enforced",
        "Required by SQL",
        "Creates view",
      ],
      answer: 1
    },
    {
      q: "CREATE INDEX on customer_id helps?",
      options: [
        "JOIN/WHERE on customer_id",
        "Only CHANGE COLUMN colors",
        "Dropping DB",
        "SMTP",
      ],
      answer: 0
    },
    {
      q: "SELECT * in hot path?",
      options: [
        "Always best",
        "Often wasteful; prefer needed columns",
        "Required by law",
        "Disables indexes",
      ],
      answer: 1
    },
    {
      q: "WHERE YEAR(col)=2026 downside?",
      options: [
        "May prevent index use",
        "Always faster",
        "Required syntax",
        "Drops table",
      ],
      answer: 0
    },
    {
      q: "SAVEPOINT allows?",
      options: [
        "Partial rollback inside transaction",
        "Creating OS users",
        "Dropping cluster",
        "CSS animation",
      ],
      answer: 0
    },
    {
      q: "DCL example?",
      options: [
        "SELECT 1",
        "GRANT SELECT ON t TO u",
        "INSERT INTO t",
        "COMMIT",
      ],
      answer: 1
    },
    {
      q: "Relational data stored mainly as?",
      options: [
        "Tables of rows/columns",
        "Only graphs",
        "Only raw photos",
        "Only CSS",
      ],
      answer: 0
    },
    {
      q: "Spreadsheet vs DB: DBs better for?",
      options: [
        "Fonts",
        "Concurrent integrity & scale",
        "Clipart",
        "Animations",
      ],
      answer: 1
    },
    {
      q: "INNER JOIN ON condition missing?",
      options: [
        "May produce Cartesian product",
        "Always errors in all engines",
        "Deletes data",
        "Creates PK",
      ],
      answer: 0
    },
    {
      q: "HAVING COUNT(*) > 1 finds?",
      options: [
        "Groups with more than one row",
        "Only empty tables",
        "Primary keys",
        "Linux processes",
      ],
      answer: 0
    },
    {
      q: "View benefits include?",
      options: [
        "Reuse and simplifying queries",
        "Replacing need for backups forever",
        "Disabling SQL",
        "Removing ACID",
      ],
      answer: 0
    },
    {
      q: "Transaction COMMIT?",
      options: [
        "Makes changes permanent",
        "Undoes all",
        "Drops DB",
        "Creates role",
      ],
      answer: 0
    },
    {
      q: "Interview: UNIQUE vs PK?",
      options: [
        "PK identifies row & is unique/not null; UNIQUE can allow one NULL depending on engine",
        "They are identical always",
        "UNIQUE is DDL only for views",
        "PK cannot be integer",
      ],
      answer: 0
    },
    {
      q: "Final goal of SQL Mastery labs?",
      options: [
        "Write correct, safe, efficient SQL with understanding",
        "Memorize only GUI clicks",
        "Avoid SELECT forever",
        "Replace networking",
      ],
      answer: 0
    },
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
      { id: "sql-m07", title: "Professional Skills", lessonIds: ["sql36","sql37","sql38"] },
      { id: "sql-m08", title: "Capstone", lessonIds: ["sql39"] }
    ],
    lessons,
    labs: [
      { id: "sql- lab01", title: "Install PostgreSQL & verify", lesson: "sql05", steps: "Install Postgres, connect with psql, run SELECT version();" },
      { id: "sql- lab02", title: "SQLite first database", lesson: "sql06", steps: "Create ashovix.db, CREATE TABLE, INSERT, SELECT." },
      { id: "sql- lab03", title: "MySQL practice schema", lesson: "sql07", steps: "Create database ashovix and a customers table." },
      { id: "sql- lab04", title: "Keys & constraints", lesson: "sql15", steps: "Build customers/orders with PK/FK and prove FK rejection." },
      { id: "sql- lab05", title: "Joins report", lesson: "sql28", steps: "Write INNER and LEFT join reports across customers and orders." },
      { id: "sql- lab06", title: "Transaction transfer", lesson: "sql35", steps: "Transfer funds with BEGIN/COMMIT and demonstrate ROLLBACK." },
      { id: "sql- lab07", title: "EXPLAIN before/after index", lesson: "sql36", steps: "Capture EXPLAIN, add index, compare plan." }
    ],
    assessment: {
      id: "sql- final",
      title: "SQL Mastery Final Assessment",
      durationMinutes: 90,
      passPercent: 70,
      questionCount: 60,
      questions: assessmentQuestions
    }
  });
})();
