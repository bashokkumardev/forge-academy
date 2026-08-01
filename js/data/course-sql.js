/* Ashovix Labs — SQL Mastery (complete portable SQL course) */
(function () {
  const lessons = {};
  function L(id, d) { lessons[id] = { id, ...d }; }

  /* ========== MODULE 1: GETTING STARTED ========== */

  L("sql01", {
    module: "sql-m01",
    title: "What Is SQL & RDBMS?",
    level: "Beginner",
    duration: "30 min",
    objectives: [
      "Define SQL and relational databases",
      "Name tables, rows, columns, keys, and schemas",
      "Distinguish DDL, DML, and DQL",
      "Explain why SQL skills transfer across vendors"
    ],
    content: `
<p><strong>SQL</strong> (Structured Query Language) is the standard language for talking to <strong>relational database management systems (RDBMS)</strong>. You describe <em>what</em> data you want; the engine figures out <em>how</em> to fetch or change it.</p>
<h2>Core vocabulary</h2>
<div class="table-wrap"><table>
  <thead><tr><th>Term</th><th>Meaning</th><th>Example</th></tr></thead>
  <tbody>
    <tr><td>Database</td><td>Container for schemas and objects</td><td><code>ashovix</code></td></tr>
    <tr><td>Schema</td><td>Namespace grouping related tables</td><td><code>shop</code></td></tr>
    <tr><td>Table</td><td>Rows sharing the same columns</td><td><code>customers</code></td></tr>
    <tr><td>Row (record)</td><td>One entity instance</td><td>customer #42</td></tr>
    <tr><td>Column (field)</td><td>Named attribute with a type</td><td><code>email VARCHAR(255)</code></td></tr>
    <tr><td>Primary key</td><td>Unique row identifier</td><td><code>customer_id</code></td></tr>
    <tr><td>Foreign key</td><td>Reference to another table's key</td><td><code>order.customer_id → customers.id</code></td></tr>
  </tbody>
</table></div>
<h2>SQL statement families</h2>
<ol>
  <li><strong>DDL</strong> (Data Definition Language) — <code>CREATE</code>, <code>ALTER</code>, <code>DROP</code> — shapes structure.</li>
  <li><strong>DML</strong> (Data Manipulation Language) — <code>INSERT</code>, <code>UPDATE</code>, <code>DELETE</code>, <code>MERGE</code> — changes data.</li>
  <li><strong>DQL</strong> (Data Query Language) — <code>SELECT</code> — reads data (often grouped with DML).</li>
  <li><strong>DCL</strong> — <code>GRANT</code>, <code>REVOKE</code> — permissions.</li>
  <li><strong>TCL</strong> — <code>COMMIT</code>, <code>ROLLBACK</code>, <code>SAVEPOINT</code> — transaction control.</li>
</ol>
<h2>How a query runs (mental model)</h2>
<ol>
  <li>You send SQL text from a client (CLI, app, GUI).</li>
  <li>The <strong>parser</strong> checks syntax and builds a logical plan.</li>
  <li>The <strong>optimizer</strong> chooses indexes, join order, and access paths.</li>
  <li>The <strong>executor</strong> reads/writes pages and returns a result set or status.</li>
</ol>
<h2>Popular RDBMS engines you will meet</h2>
<ul>
  <li><strong>SQLite</strong> — embedded, single file, perfect for learning and local apps.</li>
  <li><strong>PostgreSQL</strong> — open-source server, rich SQL, extensions, production-grade.</li>
  <li><strong>MySQL / MariaDB</strong> — ubiquitous web stacks.</li>
  <li><strong>SQL Server, Oracle, Db2</strong> — enterprise deployments with dialect extensions.</li>
</ul>
<div class="callout"><strong>Portable rule:</strong> Learn ANSI SQL first. Vendor docs explain the 10–20% that differs (auto-increment syntax, limit clauses, upsert flavors).</div>
<div class="callout"><strong>Verify:</strong>
  <ul>
    <li>You can explain table vs row vs column in your own words.</li>
    <li>You can name the three families DDL, DML, and DQL with one example each.</li>
    <li>You know that SQL is declarative — you state the result, not the loop.</li>
  </ul>
</div>
`,
    quiz: {
      q: "Which SQL family creates and alters tables?",
      options: ["DML", "DDL", "DCL", "TCL"],
      answer: 1
    }
  });

  L("sql02", {
    module: "sql-m01",
    title: "Choose & Install a Practice Database",
    level: "Beginner",
    duration: "50 min",
    objectives: [
      "Install SQLite on Windows and Linux",
      "Install PostgreSQL on Windows and Linux",
      "Create a practice workspace folder",
      "Verify both engines respond to commands"
    ],
    content: `
<p>This course uses <strong>SQLite</strong> (zero-config, file-based) and <strong>PostgreSQL</strong> (full client/server). Install both so examples work everywhere.</p>
<h2>Step 0 — Create a workspace (all platforms)</h2>
<ol>
  <li>Create a folder for SQL practice, e.g. <code>C:\\Users\\YourName\\sql-lab</code> on Windows or <code>~/sql-lab</code> on Linux.</li>
  <li>Inside it, create subfolders: <code>sqlite</code>, <code>postgres</code>, <code>scripts</code>.</li>
  <li><strong>Expected:</strong> empty folders ready for <code>.db</code> files and <code>.sql</code> scripts.</li>
</ol>

<h2>Part A — SQLite on Windows</h2>
<ol>
  <li>Open <strong>PowerShell</strong> (not CMD unless you prefer it).</li>
  <li>Check if SQLite is already installed:
    <pre><code>sqlite3 --version</code></pre>
    <strong>Expected:</strong> <code>3.xx.x</code> version string. If you see an error, continue.</li>
  <li>Install via <strong>winget</strong> (recommended):
    <pre><code>winget install SQLite.SQLite</code></pre>
    <strong>Expected:</strong> <code>Successfully installed</code>.</li>
  <li>Close and reopen PowerShell, then verify again:
    <pre><code>sqlite3 --version</code></pre></li>
  <li>Create your first database file:
    <pre><code>cd C:\\Users\\YourName\\sql-lab\\sqlite
sqlite3 ashovix.db "SELECT 'SQLite on Windows works' AS message;"</code></pre>
    <strong>Expected:</strong> one row: <code>SQLite on Windows works</code>.</li>
</ol>

<h2>Part B — SQLite on Linux (Ubuntu/Debian)</h2>
<ol>
  <li>Update package index:
    <pre><code>sudo apt update</code></pre></li>
  <li>Install SQLite:
    <pre><code>sudo apt install -y sqlite3</code></pre>
    <strong>Expected:</strong> package installs without errors.</li>
  <li>Verify:
    <pre><code>sqlite3 --version</code></pre></li>
  <li>Create practice database:
    <pre><code>mkdir -p ~/sql-lab/sqlite
cd ~/sql-lab/sqlite
sqlite3 ashovix.db "SELECT 'SQLite on Linux works' AS message;"</code></pre>
    <strong>Expected:</strong> <code>SQLite on Linux works</code>.</li>
</ol>

<h2>Part C — SQLite on Linux (RHEL/Rocky/Alma)</h2>
<ol>
  <li>Install:
    <pre><code>sudo dnf install -y sqlite</code></pre></li>
  <li>Verify and test exactly as in Ubuntu step 4 above.</li>
</ol>

<h2>Part D — PostgreSQL on Windows</h2>
<ol>
  <li>Download the installer from <a href="https://www.postgresql.org/download/windows/" target="_blank" rel="noopener">postgresql.org/download/windows</a> (EDB installer) or use winget:
    <pre><code>winget install PostgreSQL.PostgreSQL</code></pre></li>
  <li>Run the installer. Note these choices:
    <ul>
      <li>Port: <code>5432</code> (default)</li>
      <li>Superuser password: choose a strong password and write it down</li>
      <li>Locale: default is fine for learning</li>
      <li>Install Stack Builder components: optional; skip for now</li>
    </ul>
  </li>
  <li>Open <strong>SQL Shell (psql)</strong> from the Start menu, press Enter for defaults until password prompt, enter your postgres password.</li>
  <li>At <code>postgres=#</code>, run:
    <pre><code>SELECT version();
\\q</code></pre>
    <strong>Expected:</strong> a line containing <code>PostgreSQL</code> and a version number.</li>
  <li>From PowerShell (add PostgreSQL <code>bin</code> to PATH if needed):
    <pre><code>psql -U postgres -c "SELECT 'PostgreSQL on Windows works' AS message;"</code></pre></li>
</ol>

<h2>Part E — PostgreSQL on Linux (Ubuntu/Debian)</h2>
<ol>
  <li>Install server and client:
    <pre><code>sudo apt update
sudo apt install -y postgresql postgresql-contrib</code></pre></li>
  <li>Start and enable the service:
    <pre><code>sudo systemctl start postgresql
sudo systemctl enable postgresql
sudo systemctl status postgresql</code></pre>
    <strong>Expected:</strong> <code>active (running)</code>.</li>
  <li>Switch to the <code>postgres</code> OS user and open psql:
    <pre><code>sudo -u postgres psql -c "SELECT version();"</code></pre></li>
  <li>Set a password for local connections (learning only):
    <pre><code>sudo -u postgres psql -c "ALTER USER postgres PASSWORD 'YourStrongPassword';"</code></pre></li>
  <li>Test as yourself:
    <pre><code>psql -U postgres -h localhost -c "SELECT 'PostgreSQL on Linux works' AS message;"</code></pre></li>
</ol>

<h2>Part F — PostgreSQL on Linux (RHEL/Rocky/Alma)</h2>
<ol>
  <li>Enable PostgreSQL module and install:
    <pre><code>sudo dnf module enable -y postgresql:16
sudo dnf install -y postgresql-server postgresql-contrib</code></pre>
    <em>(Use the module version available on your distro.)</em></li>
  <li>Initialize and start:
    <pre><code>sudo postgresql-setup --initdb
sudo systemctl enable --now postgresql</code></pre></li>
  <li>Verify:
    <pre><code>sudo -u postgres psql -c "SELECT version();"</code></pre></li>
</ol>

<h2>Verification checklist (run on your OS)</h2>
<ol>
  <li><code>sqlite3 --version</code> prints a 3.x version.</li>
  <li><code>sqlite3 ashovix.db ".tables"</code> runs without error (empty list is OK).</li>
  <li><code>psql --version</code> prints PostgreSQL client version.</li>
  <li><code>psql -U postgres -c "SELECT 1;"</code> returns one row with value <code>1</code>.</li>
</ol>

<h2>Common errors &amp; fixes</h2>
<div class="table-wrap"><table>
  <thead><tr><th>Error</th><th>Cause</th><th>Fix</th></tr></thead>
  <tbody>
    <tr><td><code>sqlite3: command not found</code></td><td>Not installed or PATH missing</td><td>Reinstall; reopen terminal; on Windows add install dir to PATH</td></tr>
    <tr><td><code>psql: command not found</code></td><td>Client not on PATH</td><td>Add PostgreSQL <code>bin</code> folder to PATH; reopen shell</td></tr>
    <tr><td><code>connection refused</code> (PostgreSQL)</td><td>Service not running</td><td><code>sudo systemctl start postgresql</code> (Linux) or start Windows service</td></tr>
    <tr><td><code>password authentication failed</code></td><td>Wrong password</td><td>Reset with <code>ALTER USER</code> as superuser via <code>sudo -u postgres psql</code></td></tr>
    <tr><td><code>could not connect to server: No such file</code></td><td>Wrong host/socket</td><td>Use <code>-h localhost</code> on Linux; check <code>pg_hba.conf</code> for local auth</td></tr>
    <tr><td>winget install fails</td><td>Old winget or policy block</td><td>Download SQLite zip or PostgreSQL installer manually</td></tr>
  </tbody>
</table></div>

<div class="callout"><strong>Verify:</strong>
  <ul>
    <li>Both <code>sqlite3 --version</code> and <code>psql --version</code> succeed.</li>
    <li>You have a <code>ashovix.db</code> file in your sqlite folder.</li>
    <li>You can run <code>SELECT 1;</code> in both engines.</li>
    <li>You saved your PostgreSQL postgres-user password somewhere safe.</li>
  </ul>
</div>
`,
    quiz: {
      q: "Which database needs a running server process before you connect?",
      options: ["SQLite only", "PostgreSQL", "Both always", "Neither"],
      answer: 1
    }
  });

  L("sql03", {
    module: "sql-m01",
    title: "First Connection & Tools",
    level: "Beginner",
    duration: "40 min",
    objectives: [
      "Open interactive sqlite3 and psql sessions",
      "Run meta-commands and basic SQL",
      "Understand DBeaver as a GUI option",
      "Save and replay script files"
    ],
    content: `
<p>CLI tools build muscle memory. GUI tools (DBeaver) help exploration. Learn both.</p>

<h2>Part A — sqlite3 interactive session</h2>
<ol>
  <li>Open terminal and start SQLite on your practice DB:
    <pre><code>cd ~/sql-lab/sqlite    # or C:\\Users\\You\\sql-lab\\sqlite
sqlite3 ashovix.db</code></pre>
    <strong>Expected:</strong> prompt changes to <code>sqlite&gt;</code>.</li>
  <li>Turn on readable output:
    <pre><code>.headers on
.mode column
.width 20</code></pre></li>
  <li>Run your first query:
    <pre><code>SELECT datetime('now') AS now_utc, 'Ashovix Labs' AS course;</code></pre>
    <strong>Expected:</strong> two columns with current timestamp and <code>Ashovix Labs</code>.</li>
  <li>List meta-commands:
    <pre><code>.help</code></pre></li>
  <li>Exit cleanly:
    <pre><code>.quit</code></pre></li>
</ol>

<h2>Part B — psql interactive session</h2>
<ol>
  <li>Connect (Linux often uses peer auth without password when using <code>sudo -u postgres psql</code>):
    <pre><code>psql -U postgres -h localhost</code></pre>
    <strong>Expected:</strong> prompt <code>postgres=#</code> (hash means superuser/owner).</li>
  <li>Enable expanded display for wide results (optional):
    <pre><code>\\x auto</code></pre></li>
  <li>Run a query:
    <pre><code>SELECT now() AS now_local, current_user AS whoami;</code></pre>
    <strong>Expected:</strong> timestamp and <code>postgres</code> (or your user).</li>
  <li>List databases:
    <pre><code>\\l</code></pre></li>
  <li>Quit:
    <pre><code>\\q</code></pre></li>
</ol>

<h2>Part C — Run a script file (both engines)</h2>
<ol>
  <li>Create <code>scripts/hello.sql</code> with:
    <pre><code>-- hello.sql
SELECT 'Script execution works' AS status;</code></pre></li>
  <li>SQLite:
    <pre><code>sqlite3 ashovix.db &lt; scripts/hello.sql</code></pre>
    <strong>Expected:</strong> <code>Script execution works</code>.</li>
  <li>PostgreSQL:
    <pre><code>psql -U postgres -h localhost -f scripts/hello.sql</code></pre>
    <strong>Expected:</strong> same message in a formatted table.</li>
</ol>

<h2>Part D — DBeaver overview (GUI)</h2>
<ol>
  <li>Download <a href="https://dbeaver.io/download/" target="_blank" rel="noopener">DBeaver Community</a> and install.</li>
  <li>Launch DBeaver → <strong>Database</strong> → <strong>New Database Connection</strong>.</li>
  <li><strong>SQLite:</strong> choose SQLite → Browse to <code>ashovix.db</code> → Test Connection → Finish.</li>
  <li><strong>PostgreSQL:</strong> choose PostgreSQL → Host <code>localhost</code>, Port <code>5432</code>, Database <code>postgres</code>, user/password → Test → Finish.</li>
  <li>Open SQL Editor (<kbd>Ctrl</kbd>+<kbd>]</kbd>), paste <code>SELECT 42 AS answer;</code>, click Execute (orange play).</li>
  <li><strong>Expected:</strong> result grid shows <code>42</code>.</li>
</ol>

<h2>Essential meta-commands cheat sheet</h2>
<div class="table-wrap"><table>
  <thead><tr><th>sqlite3</th><th>psql</th><th>Purpose</th></tr></thead>
  <tbody>
    <tr><td><code>.tables</code></td><td><code>\\dt</code></td><td>List tables</td></tr>
    <tr><td><code>.schema name</code></td><td><code>\\d name</code></td><td>Show DDL</td></tr>
    <tr><td><code>.read file.sql</code></td><td><code>\\i file.sql</code></td><td>Run script</td></tr>
    <tr><td><code>.quit</code></td><td><code>\\q</code></td><td>Exit</td></tr>
  </tbody>
</table></div>

<div class="callout"><strong>Verify:</strong>
  <ul>
    <li>You opened sqlite3 and psql interactively and ran <code>SELECT</code>.</li>
    <li>You executed <code>hello.sql</code> from the shell in both engines.</li>
    <li>You connected DBeaver to at least one database (optional but recommended).</li>
    <li>You know <code>.quit</code> vs <code>\\q</code>.</li>
  </ul>
</div>
`,
    quiz: {
      q: "In psql, which command lists tables?",
      options: [".tables", "\\dt", "\\l", ".schema"],
      answer: 1
    }
  });

  /* ========== MODULE 2: DDL ========== */

  L("sql04", {
    module: "sql-m02",
    title: "CREATE DATABASE & SCHEMA",
    level: "Beginner",
    duration: "35 min",
    objectives: [
      "Create databases in PostgreSQL",
      "Understand SQLite's single-file model",
      "Create and use schemas",
      "Set search_path / default schema"
    ],
    content: `
<p><strong>PostgreSQL</strong> separates <em>clusters</em> (server instance) into multiple <em>databases</em>. <strong>SQLite</strong> uses one database per file — there is no <code>CREATE DATABASE</code> inside SQLite.</p>

<h2>PostgreSQL — create a learning database</h2>
<ol>
  <li>Connect as superuser:
    <pre><code>psql -U postgres -h localhost</code></pre></li>
  <li>Create database with UTF-8 encoding:
    <pre><code>CREATE DATABASE ashovix
  ENCODING 'UTF8'
  LC_COLLATE 'en_US.UTF-8'
  LC_CTYPE 'en_US.UTF-8'
  TEMPLATE template0;</code></pre>
    <strong>Expected:</strong> <code>CREATE DATABASE</code>.</li>
  <li>Connect to the new database:
    <pre><code>\\c ashovix</code></pre>
    <strong>Expected:</strong> prompt becomes <code>ashovix=#</code>.</li>
  <li>Create a schema (namespace):
    <pre><code>CREATE SCHEMA shop AUTHORIZATION CURRENT_USER;</code></pre>
    <strong>Expected:</strong> <code>CREATE SCHEMA</code>.</li>
  <li>List schemas:
    <pre><code>\\dn</code></pre>
    <strong>Expected:</strong> <code>shop</code> and <code>public</code> appear.</li>
  <li>Set default schema for this session:
    <pre><code>SET search_path TO shop, public;</code></pre></li>
  <li>Verify current path:
    <pre><code>SHOW search_path;</code></pre>
    <strong>Expected:</strong> <code>shop, public</code>.</li>
</ol>

<h2>SQLite — new database file</h2>
<ol>
  <li>Create a fresh file (creates DB if missing):
    <pre><code>sqlite3 ~/sql-lab/sqlite/shop.db</code></pre></li>
  <li>SQLite has no <code>CREATE SCHEMA</code> — use table name prefixes or attach files:
    <pre><code>ATTACH DATABASE 'archive.db' AS archive;
SELECT name FROM pragma_database_list();</code></pre>
    <strong>Expected:</strong> <code>main</code> and <code>archive</code> databases listed.</li>
  <li>Detach when done:
    <pre><code>DETACH DATABASE archive;</code></pre></li>
</ol>

<h2>Drop safely (never on production without backup)</h2>
<ol>
  <li>PostgreSQL — drop schema only if empty, or use CASCADE consciously:
    <pre><code>DROP SCHEMA IF EXISTS shop CASCADE;</code></pre></li>
  <li>PostgreSQL — drop database (disconnect all sessions first):
    <pre><code>-- from postgres database, not inside ashovix
\\c postgres
DROP DATABASE IF EXISTS ashovix;</code></pre></li>
  <li>SQLite — delete the <code>.db</code> file from the filesystem when no connections are open.</li>
</ol>

<div class="callout"><strong>Verify:</strong>
  <ul>
    <li>PostgreSQL: <code>\\l</code> shows <code>ashovix</code> database.</li>
    <li>PostgreSQL: <code>\\dn</code> shows <code>shop</code> schema.</li>
    <li><code>SHOW search_path;</code> returns your intended order.</li>
    <li>SQLite: you can attach and detach a second file.</li>
  </ul>
</div>
`,
    quiz: {
      q: "In PostgreSQL, what does SET search_path control?",
      options: ["Disk quota", "Which schemas are searched for unqualified object names", "Network port", "Backup schedule"],
      answer: 1
    }
  });

  L("sql05", {
    module: "sql-m02",
    title: "CREATE TABLE — Types & Constraints",
    level: "Beginner",
    duration: "55 min",
    objectives: [
      "Choose appropriate column data types",
      "Apply PRIMARY KEY, FOREIGN KEY, UNIQUE, CHECK, NOT NULL",
      "Use DEFAULT and auto-generated keys",
      "Create a realistic shop schema"
    ],
    content: `
<p>Tables are contracts. Types and constraints protect data quality for every client — apps, reports, and ad-hoc SQL.</p>

<h2>Common data types</h2>
<div class="table-wrap"><table>
  <thead><tr><th>Category</th><th>PostgreSQL</th><th>SQLite</th><th>Use when</th></tr></thead>
  <tbody>
    <tr><td>Integer</td><td><code>INTEGER</code>, <code>BIGINT</code>, <code>SMALLINT</code></td><td><code>INTEGER</code></td><td>IDs, counts (no fractions)</td></tr>
    <tr><td>Decimal money</td><td><code>NUMERIC(p,s)</code></td><td><code>NUMERIC</code></td><td>Money — never use FLOAT for currency</td></tr>
    <tr><td>Float</td><td><code>REAL</code>, <code>DOUBLE PRECISION</code></td><td><code>REAL</code></td><td>Science metrics where exact cents don't matter</td></tr>
    <tr><td>Text</td><td><code>VARCHAR(n)</code>, <code>TEXT</code></td><td><code>TEXT</code></td><td>Names, descriptions</td></tr>
    <tr><td>Fixed char</td><td><code>CHAR(n)</code></td><td><code>TEXT</code></td><td>Fixed codes (e.g. country ISO)</td></tr>
    <tr><td>Boolean</td><td><code>BOOLEAN</code></td><td><code>INTEGER 0/1</code></td><td>Flags</td></tr>
    <tr><td>Date/time</td><td><code>DATE</code>, <code>TIME</code>, <code>TIMESTAMP</code>, <code>TIMESTAMPTZ</code></td><td><code>TEXT/INTEGER</code> (affinity)</td><td>Events, scheduling</td></tr>
    <tr><td>Binary</td><td><code>BYTEA</code></td><td><code>BLOB</code></td><td>Files, hashes</td></tr>
    <tr><td>JSON</td><td><code>JSON</code>, <code>JSONB</code></td><td><code>TEXT</code> + JSON functions</td><td>Semi-structured attributes</td></tr>
    <tr><td>UUID</td><td><code>UUID</code></td><td><code>TEXT</code></td><td>Distributed IDs</td></tr>
  </tbody>
</table></div>

<h2>Step-by-step — build shop.customers and shop.products (PostgreSQL)</h2>
<ol>
  <li>Connect and set schema:
    <pre><code>psql -U postgres -d ashovix
SET search_path TO shop, public;</code></pre></li>
  <li>Create customers table:
    <pre><code>CREATE TABLE customers (
  customer_id   INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  email         VARCHAR(255) NOT NULL UNIQUE,
  full_name     VARCHAR(100) NOT NULL,
  country_code  CHAR(2) NOT NULL DEFAULT 'US',
  is_active     BOOLEAN NOT NULL DEFAULT TRUE,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT now(),
  profile       JSONB,
  CONSTRAINT ck_country_len CHECK (char_length(country_code) = 2)
);</code></pre>
    <strong>Expected:</strong> <code>CREATE TABLE</code>.</li>
  <li>Create products:
    <pre><code>CREATE TABLE products (
  product_id    INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  sku           VARCHAR(32) NOT NULL UNIQUE,
  name          VARCHAR(200) NOT NULL,
  unit_price    NUMERIC(10,2) NOT NULL CHECK (unit_price >= 0),
  stock_qty     INTEGER NOT NULL DEFAULT 0 CHECK (stock_qty >= 0)
);</code></pre></li>
  <li>Create orders with foreign keys:
    <pre><code>CREATE TABLE orders (
  order_id      BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  customer_id   INTEGER NOT NULL REFERENCES customers(customer_id),
  order_date    DATE NOT NULL DEFAULT CURRENT_DATE,
  status        VARCHAR(20) NOT NULL DEFAULT 'NEW'
    CHECK (status IN ('NEW','PAID','SHIPPED','CANCELLED')),
  total_amount  NUMERIC(12,2) NOT NULL DEFAULT 0
);</code></pre></li>
  <li>Inspect structure:
    <pre><code>\\d customers
\\d orders</code></pre>
    <strong>Expected:</strong> constraints and indexes listed.</li>
</ol>

<h2>SQLite equivalent (note INTEGER PRIMARY KEY autoincrement)</h2>
<ol>
  <li>
    <pre><code>sqlite3 shop.db
CREATE TABLE customers (
  customer_id INTEGER PRIMARY KEY AUTOINCREMENT,
  email TEXT NOT NULL UNIQUE,
  full_name TEXT NOT NULL,
  country_code TEXT NOT NULL DEFAULT 'US' CHECK(length(country_code)=2),
  is_active INTEGER NOT NULL DEFAULT 1 CHECK(is_active IN (0,1)),
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);</code></pre></li>
  <li>Verify:
    <pre><code>.schema customers</code></pre></li>
</ol>

<h2>Constraint reference</h2>
<ul>
  <li><strong>PRIMARY KEY</strong> — unique + not null; one per table.</li>
  <li><strong>FOREIGN KEY</strong> — child column must exist in parent (or NULL if allowed).</li>
  <li><strong>UNIQUE</strong> — no duplicate values (NULLs usually allowed once per SQL standard).</li>
  <li><strong>NOT NULL</strong> — column must have a value on insert/update.</li>
  <li><strong>CHECK</strong> — boolean expression per row.</li>
  <li><strong>DEFAULT</strong> — value when insert omits column.</li>
</ul>

<div class="callout"><strong>Verify:</strong>
  <ul>
    <li><code>\\d customers</code> (psql) shows PK, UNIQUE on email, CHECK on country.</li>
    <li>Insert with invalid country length fails with constraint error.</li>
    <li>Insert order with non-existent <code>customer_id</code> fails FK check.</li>
    <li>You can explain why NUMERIC beats FLOAT for prices.</li>
  </ul>
</div>
`,
    quiz: {
      q: "Which type is best for storing exact currency amounts?",
      options: ["FLOAT", "NUMERIC(10,2)", "TEXT", "BYTEA"],
      answer: 1
    }
  });

  L("sql06", {
    module: "sql-m02",
    title: "ALTER & DROP Safely",
    level: "Beginner",
    duration: "40 min",
    objectives: [
      "Add, rename, and drop columns safely",
      "Add constraints online where possible",
      "Plan rollback before destructive DDL",
      "Use IF EXISTS to avoid errors"
    ],
    content: `
<p>DDL mistakes are expensive. Always work on a copy first, capture <code>\\d+ table</code> before/after, and prefer additive changes in production.</p>

<h2>Safe ALTER workflow</h2>
<ol>
  <li><strong>Backup or snapshot</strong> the database (or clone to DEV).</li>
  <li><strong>Document current DDL:</strong>
    <pre><code>\\d+ shop.products   -- PostgreSQL
.schema products     -- SQLite</code></pre></li>
  <li><strong>Apply change in a transaction</strong> when the engine allows (PostgreSQL DDL is transactional).</li>
  <li><strong>Verify</strong> with test inserts/selects.</li>
  <li><strong>Deploy</strong> via migration tool (Flyway, Liquibase, etc.) in real teams.</li>
</ol>

<h2>PostgreSQL — common ALTER examples</h2>
<ol>
  <li>Add nullable column (online-friendly):
    <pre><code>ALTER TABLE shop.products
  ADD COLUMN description TEXT;</code></pre>
    <strong>Expected:</strong> <code>ALTER TABLE</code>.</li>
  <li>Add column with default (PostgreSQL 11+ often avoids full rewrite):
    <pre><code>ALTER TABLE shop.products
  ADD COLUMN weight_kg NUMERIC(8,3) NOT NULL DEFAULT 0;</code></pre></li>
  <li>Rename column:
    <pre><code>ALTER TABLE shop.products RENAME COLUMN name TO product_name;</code></pre></li>
  <li>Add CHECK constraint:
    <pre><code>ALTER TABLE shop.products
  ADD CONSTRAINT ck_weight_nonneg CHECK (weight_kg >= 0);</code></pre></li>
  <li>Drop column (destructive — confirm first):
    <pre><code>ALTER TABLE shop.products DROP COLUMN IF EXISTS weight_kg;</code></pre></li>
  <li>Drop table safely:
    <pre><code>DROP TABLE IF EXISTS shop.old_staging CASCADE;</code></pre></li>
</ol>

<h2>SQLite limitations (know before you ALTER)</h2>
<ol>
  <li>SQLite supports limited <code>ALTER TABLE</code>: add column, rename table, rename column (3.25+).</li>
  <li>Dropping columns or changing types requires table rebuild:
    <ol>
      <li>Create new table with desired shape.</li>
      <li><code>INSERT INTO new SELECT ... FROM old;</code></li>
      <li>Drop old; rename new.</li>
    </ol>
  </li>
</ol>

<h2>Rollback pattern (PostgreSQL)</h2>
<ol>
  <li>Start transaction:
    <pre><code>BEGIN;
ALTER TABLE shop.products ADD COLUMN color VARCHAR(30);
SELECT column_name FROM information_schema.columns
  WHERE table_schema='shop' AND table_name='products' AND column_name='color';
ROLLBACK;  -- practice only — undoes the ALTER</code></pre>
    <strong>Expected:</strong> column absent after rollback.</li>
</ol>

<div class="callout warning"><strong>Production rule:</strong> Never <code>DROP TABLE</code> or <code>DROP COLUMN</code> without backup and stakeholder sign-off.</div>

<div class="callout"><strong>Verify:</strong>
  <ul>
    <li>You added and renamed a column successfully.</li>
    <li>You used <code>IF EXISTS</code> on a drop statement.</li>
    <li>You demonstrated transactional DDL rollback in PostgreSQL.</li>
    <li>You know SQLite's ALTER limitations.</li>
  </ul>
</div>
`,
    quiz: {
      q: "In PostgreSQL, DDL inside BEGIN...ROLLBACK can:",
      options: ["Never be rolled back", "Be rolled back like DML in the same transaction", "Only run on Sundays", "Require restarting the server"],
      answer: 1
    }
  });

  /* ========== MODULE 3: DML ========== */

  L("sql07", {
    module: "sql-m03",
    title: "INSERT — All Forms",
    level: "Beginner",
    duration: "45 min",
    objectives: [
      "Insert single and multiple rows",
      "Insert from SELECT",
      "Use DEFAULT and omitting columns",
      "Handle identity/serial columns"
    ],
    content: `
<p>Populate tables with disciplined INSERT patterns. Always know which columns are NOT NULL and which have defaults.</p>

<h2>Prerequisites — ensure shop tables exist (sql05)</h2>
<ol>
  <li>Connect: <code>psql -U postgres -d ashovix</code> and <code>SET search_path TO shop, public;</code></li>
</ol>

<h2>Form 1 — INSERT one row (explicit columns)</h2>
<ol>
  <li>
    <pre><code>INSERT INTO customers (email, full_name, country_code)
VALUES ('ada@example.com', 'Ada Lovelace', 'GB');</code></pre>
    <strong>Expected:</strong> <code>INSERT 0 1</code>.</li>
  <li>Confirm:
    <pre><code>SELECT customer_id, email, created_at FROM customers WHERE email='ada@example.com';</code></pre>
    <strong>Expected:</strong> auto-generated <code>customer_id</code> and timestamp.</li>
</ol>

<h2>Form 2 — INSERT multiple rows</h2>
<ol>
  <li>
    <pre><code>INSERT INTO products (sku, name, unit_price, stock_qty) VALUES
  ('SKU-001', 'Mechanical Keyboard', 129.99, 50),
  ('SKU-002', 'USB-C Hub', 49.50, 120),
  ('SKU-003', 'Monitor Arm', 89.00, 30);</code></pre>
    <strong>Expected:</strong> <code>INSERT 0 3</code>.</li>
</ol>

<h2>Form 3 — INSERT with DEFAULT keyword</h2>
<ol>
  <li>
    <pre><code>INSERT INTO customers (email, full_name, country_code, is_active)
VALUES ('default@example.com', 'Default User', DEFAULT, DEFAULT);</code></pre>
    <strong>Expected:</strong> <code>country_code='US'</code>, <code>is_active=true</code>.</li>
</ol>

<h2>Form 4 — INSERT ... SELECT (copy/transform)</h2>
<ol>
  <li>Create archive table:
    <pre><code>CREATE TABLE products_archive (LIKE products INCLUDING ALL);</code></pre></li>
  <li>Copy low-stock items:
    <pre><code>INSERT INTO products_archive (product_id, sku, name, unit_price, stock_qty)
SELECT product_id, sku, name, unit_price, stock_qty
FROM products
WHERE stock_qty &lt; 40;</code></pre>
    <strong>Expected:</strong> rows copied matching filter.</li>
  <li>Verify count:
    <pre><code>SELECT COUNT(*) FROM products_archive;</code></pre></li>
</ol>

<h2>Form 5 — RETURNING clause (PostgreSQL)</h2>
<ol>
  <li>
    <pre><code>INSERT INTO orders (customer_id, status, total_amount)
VALUES (1, 'NEW', 0)
RETURNING order_id, order_date;</code></pre>
    <strong>Expected:</strong> new <code>order_id</code> printed immediately — useful in apps.</li>
</ol>

<h2>SQLite notes</h2>
<ul>
  <li><code>RETURNING</code> supported in SQLite 3.35+.</li>
  <li>Omit <code>customer_id</code> for AUTOINCREMENT to assign next integer.</li>
</ul>

<div class="callout"><strong>Verify:</strong>
  <ul>
    <li><code>SELECT COUNT(*) FROM customers;</code> ≥ 2.</li>
    <li><code>SELECT COUNT(*) FROM products;</code> = 3.</li>
    <li>INSERT...SELECT populated <code>products_archive</code>.</li>
    <li>RETURNING showed a new <code>order_id</code>.</li>
  </ul>
</div>
`,
    quiz: {
      q: "INSERT ... SELECT is used to:",
      options: ["Delete rows", "Copy or transform rows from a query into a table", "Create indexes", "Grant permissions"],
      answer: 1
    }
  });

  L("sql08", {
    module: "sql-m03",
    title: "UPDATE & DELETE with WHERE Safety",
    level: "Beginner",
    duration: "40 min",
    objectives: [
      "Update rows with precise predicates",
      "Delete safely with dry-run SELECT",
      "Avoid accidental full-table changes",
      "Use transactions for multi-step changes"
    ],
    content: `
<p>The most common production incident: <code>UPDATE</code> or <code>DELETE</code> without a <code>WHERE</code> clause. Treat every change as a two-step: SELECT first, then DML.</p>

<h2>Golden safety rule</h2>
<ol>
  <li>Write the <code>WHERE</code> as a <code>SELECT</code> first.</li>
  <li>Count rows: <code>SELECT COUNT(*) ...</code></li>
  <li>Wrap in <code>BEGIN;</code> … verify … <code>COMMIT;</code> or <code>ROLLBACK;</code></li>
</ol>

<h2>UPDATE step-by-step</h2>
<ol>
  <li>Dry run — find product to repriced:
    <pre><code>SELECT product_id, sku, unit_price FROM products WHERE sku = 'SKU-002';</code></pre>
    <strong>Expected:</strong> exactly 1 row.</li>
  <li>Update inside transaction:
    <pre><code>BEGIN;
UPDATE products SET unit_price = 44.99 WHERE sku = 'SKU-002';
SELECT product_id, unit_price FROM products WHERE sku = 'SKU-002';
COMMIT;</code></pre>
    <strong>Expected:</strong> price is <code>44.99</code>.</li>
  <li>Update with expression:
    <pre><code>UPDATE products SET stock_qty = stock_qty - 5 WHERE sku = 'SKU-001';</code></pre></li>
  <li>Update with subquery (customers with no orders — mark inactive):
    <pre><code>UPDATE customers c
SET is_active = FALSE
WHERE NOT EXISTS (SELECT 1 FROM orders o WHERE o.customer_id = c.customer_id);</code></pre></li>
</ol>

<h2>DELETE step-by-step</h2>
<ol>
  <li>Dry run:
    <pre><code>SELECT * FROM products_archive;</code></pre></li>
  <li>Delete with WHERE:
    <pre><code>DELETE FROM products_archive WHERE sku = 'SKU-003';</code></pre>
    <strong>Expected:</strong> <code>DELETE 1</code> (if row existed).</li>
  <li>Prevent orphan deletes — FK on orders protects customers:
    <pre><code>DELETE FROM customers WHERE customer_id = 1;</code></pre>
    <strong>Expected:</strong> error if orders reference customer (FK violation) — this is good.</li>
</ol>

<h2>TRUNCATE vs DELETE</h2>
<ul>
  <li><code>DELETE</code> — row-by-row, can use WHERE, fires triggers, logged per row.</li>
  <li><code>TRUNCATE</code> — fast empty table (PostgreSQL), resets identities optionally; cannot filter rows.</li>
</ul>

<div class="callout warning"><strong>Never do this:</strong> <code>DELETE FROM orders;</code> without WHERE in production. Always require a predicate.</div>

<div class="callout"><strong>Verify:</strong>
  <ul>
    <li>You ran SELECT before every UPDATE/DELETE.</li>
    <li>SKU-002 price changed inside a transaction.</li>
    <li>FK blocked deleting a referenced customer.</li>
    <li>You can explain TRUNCATE vs DELETE.</li>
  </ul>
</div>
`,
    quiz: {
      q: "Before running DELETE in production, you should first:",
      options: ["Drop the table", "Run an equivalent SELECT with the same WHERE", "Restart the server", "Disable all constraints"],
      answer: 1
    }
  });

  L("sql09", {
    module: "sql-m03",
    title: "MERGE & UPSERT Patterns",
    level: "Intermediate",
    duration: "45 min",
    objectives: [
      "Upsert with PostgreSQL ON CONFLICT",
      "Use MERGE (SQL:2003, PostgreSQL 15+)",
      "Implement SQLite INSERT OR REPLACE / UPSERT",
      "Sync staging tables into production"
    ],
    content: `
<p><strong>Upsert</strong> = update if exists, insert if not. Essential for idempotent ETL and API sync.</p>

<h2>PostgreSQL — ON CONFLICT (most common)</h2>
<ol>
  <li>Ensure UNIQUE on <code>sku</code> (already from sql05).</li>
  <li>Upsert one product:
    <pre><code>INSERT INTO products (sku, name, unit_price, stock_qty)
VALUES ('SKU-001', 'Mech Keyboard v2', 139.99, 60)
ON CONFLICT (sku) DO UPDATE
  SET name = EXCLUDED.name,
      unit_price = EXCLUDED.unit_price,
      stock_qty = products.stock_qty + EXCLUDED.stock_qty;</code></pre>
    <strong>Expected:</strong> existing SKU-001 row updated, stock increased.</li>
  <li>Verify:
    <pre><code>SELECT sku, name, unit_price, stock_qty FROM products WHERE sku='SKU-001';</code></pre></li>
  <li>Do nothing on conflict:
    <pre><code>INSERT INTO products (sku, name, unit_price, stock_qty)
VALUES ('SKU-002', 'Ignored', 1, 1)
ON CONFLICT (sku) DO NOTHING;</code></pre>
    <strong>Expected:</strong> SKU-002 unchanged.</li>
</ol>

<h2>PostgreSQL 15+ — MERGE</h2>
<ol>
  <li>Create staging table:
    <pre><code>CREATE TABLE products_staging (
  sku VARCHAR(32) PRIMARY KEY,
  name VARCHAR(200),
  unit_price NUMERIC(10,2),
  stock_qty INTEGER
);
INSERT INTO products_staging VALUES
  ('SKU-004', 'Webcam HD', 59.99, 80),
  ('SKU-001', 'Keyboard Pro', 149.99, 10);</code></pre></li>
  <li>MERGE into target:
    <pre><code>MERGE INTO products p
USING products_staging s ON p.sku = s.sku
WHEN MATCHED THEN UPDATE SET
  name = s.name, unit_price = s.unit_price, stock_qty = p.stock_qty + s.stock_qty
WHEN NOT MATCHED THEN INSERT (sku, name, unit_price, stock_qty)
  VALUES (s.sku, s.name, s.unit_price, s.stock_qty);</code></pre>
    <strong>Expected:</strong> SKU-001 updated, SKU-004 inserted.</li>
</ol>

<h2>SQLite — UPSERT</h2>
<ol>
  <li>
    <pre><code>INSERT INTO products (sku, name, unit_price, stock_qty)
VALUES ('SKU-001', 'SQLite Keyboard', 99.00, 5)
ON CONFLICT(sku) DO UPDATE SET
  unit_price = excluded.unit_price,
  stock_qty = stock_qty + excluded.stock_qty;</code></pre></li>
</ol>

<div class="callout"><strong>Verify:</strong>
  <ul>
    <li>ON CONFLICT updated SKU-001 without duplicate key error.</li>
    <li>MERGE (or documented alternative) synced staging rows.</li>
    <li>New SKU-004 exists in products.</li>
    <li>You know when to prefer MERGE vs ON CONFLICT.</li>
  </ul>
</div>
`,
    quiz: {
      q: "PostgreSQL ON CONFLICT requires:",
      options: ["A random GUID", "A unique or primary key constraint on the conflict target", "No indexes", "Windows only"],
      answer: 1
    }
  });

  /* ========== MODULE 4: QUERIES ========== */

  L("sql10", {
    module: "sql-m04",
    title: "SELECT — Projection & Aliases",
    level: "Beginner",
    duration: "35 min",
    objectives: [
      "Project specific columns vs SELECT *",
      "Use column and table aliases",
      "Compute expressions in SELECT",
      "Understand DISTINCT"
    ],
    content: `
<h2>Step 1 — Basic projection</h2>
<ol>
  <li>List product names and prices only:
    <pre><code>SELECT name, unit_price FROM shop.products;</code></pre>
    <strong>Expected:</strong> two columns, all product rows.</li>
  <li>Avoid <code>SELECT *</code> in application hot paths — it breaks when columns are added and prevents covering indexes.</li>
</ol>

<h2>Step 2 — Aliases (AS is optional)</h2>
<ol>
  <li>Column alias:
    <pre><code>SELECT name AS product_name, unit_price AS price_usd FROM shop.products;</code></pre></li>
  <li>Expression alias:
    <pre><code>SELECT sku, unit_price, unit_price * 0.9 AS sale_price FROM shop.products;</code></pre>
    <strong>Expected:</strong> sale_price = 90% of unit_price.</li>
  <li>Table alias for brevity:
    <pre><code>SELECT p.sku, p.name FROM shop.products AS p;</code></pre></li>
</ol>

<h2>Step 3 — DISTINCT</h2>
<ol>
  <li>Unique countries among customers:
    <pre><code>SELECT DISTINCT country_code FROM shop.customers ORDER BY 1;</code></pre></li>
  <li>DISTINCT ON (PostgreSQL) — first row per group:
    <pre><code>SELECT DISTINCT ON (customer_id) customer_id, order_id, order_date
FROM shop.orders ORDER BY customer_id, order_date DESC;</code></pre></li>
</ol>

<h2>Step 4 — Literal values and functions</h2>
<ol>
  <li>
    <pre><code>SELECT 'Ashovix Labs' AS source, CURRENT_DATE AS report_date, 42 AS magic_number;</code></pre>
    <strong>Expected:</strong> one row, three computed columns.</li>
</ol>

<div class="callout"><strong>Verify:</strong>
  <ul>
    <li>You projected only needed columns.</li>
    <li>Expression alias <code>sale_price</code> calculated correctly.</li>
    <li>DISTINCT returned unique country codes.</li>
  </ul>
</div>
`,
    quiz: {
      q: "Why avoid SELECT * in production application queries?",
      options: ["It is illegal SQL", "It returns unexpected columns when schema evolves and can hurt performance", "It only works in SQLite", "It disables JOINs"],
      answer: 1
    }
  });

  L("sql11", {
    module: "sql-m04",
    title: "WHERE — Operators & NULL",
    level: "Beginner",
    duration: "40 min",
    objectives: [
      "Filter with comparison and logical operators",
      "Use IN, BETWEEN, LIKE, ILIKE",
      "Handle NULL correctly with IS NULL",
      "Combine predicates with AND/OR precedence"
    ],
    content: `
<h2>Comparison operators</h2>
<ol>
  <li>Equality and inequality:
    <pre><code>SELECT sku, unit_price FROM shop.products WHERE unit_price = 49.50;
SELECT sku FROM shop.products WHERE unit_price &lt;&gt; 49.50;</code></pre></li>
  <li>Range:
    <pre><code>SELECT sku, unit_price FROM shop.products WHERE unit_price BETWEEN 50 AND 130;</code></pre></li>
  <li>IN list:
    <pre><code>SELECT * FROM shop.products WHERE sku IN ('SKU-001','SKU-003');</code></pre></li>
</ol>

<h2>Pattern matching</h2>
<ol>
  <li>LIKE (case-sensitive in PostgreSQL for non-C locales):
    <pre><code>SELECT name FROM shop.products WHERE name LIKE '%Keyboard%';</code></pre></li>
  <li>ILIKE (PostgreSQL case-insensitive):
    <pre><code>SELECT name FROM shop.products WHERE name ILIKE '%keyboard%';</code></pre></li>
  <li>Escape wildcards:
    <pre><code>SELECT sku FROM shop.products WHERE sku LIKE 'SKU-\_%' ESCAPE '\\';</code></pre></li>
</ol>

<h2>NULL — the silent killer</h2>
<ol>
  <li>NULL means unknown — never use <code>= NULL</code>:
    <pre><code>-- WRONG: returns no rows
SELECT * FROM shop.customers WHERE country_code = NULL;

-- RIGHT:
SELECT * FROM shop.customers WHERE country_code IS NULL;</code></pre></li>
  <li>Three-valued logic: <code>WHERE (NULL = 'US')</code> is UNKNOWN, row filtered out.</li>
  <li>COALESCE for display:
    <pre><code>SELECT email, COALESCE(country_code, '??') AS country FROM shop.customers;</code></pre></li>
</ol>

<h2>Logical operators</h2>
<ol>
  <li>
    <pre><code>SELECT sku, unit_price, stock_qty FROM shop.products
WHERE unit_price &gt; 50 AND stock_qty &lt; 100;</code></pre></li>
  <li>Use parentheses when mixing OR/AND:
    <pre><code>SELECT * FROM shop.products
WHERE (unit_price &lt; 50 OR sku = 'SKU-001') AND stock_qty &gt; 0;</code></pre></li>
</ol>

<div class="callout"><strong>Verify:</strong>
  <ul>
    <li>BETWEEN returned expected price band.</li>
    <li>IS NULL syntax used (not = NULL).</li>
    <li>Parentheses changed OR/AND results as expected.</li>
  </ul>
</div>
`,
    quiz: {
      q: "Which predicate correctly finds rows where city IS unknown?",
      options: ["city = NULL", "city IS NULL", "city == NULL", "city EQUALS NULL"],
      answer: 1
    }
  });

  L("sql12", {
    module: "sql-m04",
    title: "ORDER BY, LIMIT & FETCH",
    level: "Beginner",
    duration: "30 min",
    objectives: [
      "Sort ascending and descending",
      "Sort by multiple columns and ordinals",
      "Paginate with LIMIT/OFFSET",
      "Use FETCH FIRST (standard SQL)"
    ],
    content: `
<h2>ORDER BY</h2>
<ol>
  <li>Single column ascending (default):
    <pre><code>SELECT sku, unit_price FROM shop.products ORDER BY unit_price;</code></pre></li>
  <li>Descending:
    <pre><code>SELECT sku, stock_qty FROM shop.products ORDER BY stock_qty DESC;</code></pre></li>
  <li>Multiple keys — tie-breakers:
    <pre><code>SELECT customer_id, order_date, order_id FROM shop.orders
ORDER BY customer_id ASC, order_date DESC, order_id DESC;</code></pre></li>
  <li>NULLS ordering (PostgreSQL):
    <pre><code>SELECT email, country_code FROM shop.customers
ORDER BY country_code NULLS LAST;</code></pre></li>
</ol>

<h2>Pagination</h2>
<ol>
  <li>Top 3 expensive products:
    <pre><code>SELECT sku, unit_price FROM shop.products
ORDER BY unit_price DESC
LIMIT 3;</code></pre>
    <strong>Expected:</strong> at most 3 rows.</li>
  <li>Page 2 (page size 2) — OFFSET pattern:
    <pre><code>SELECT sku, unit_price FROM shop.products
ORDER BY sku
LIMIT 2 OFFSET 2;</code></pre>
    <strong>Expected:</strong> rows 3–4 by sku order.</li>
  <li>Standard SQL FETCH:
    <pre><code>SELECT sku FROM shop.products ORDER BY sku
OFFSET 2 ROWS FETCH FIRST 2 ROWS ONLY;</code></pre></li>
</ol>

<div class="callout"><strong>Performance note:</strong> Large OFFSET scans and discards rows — keyset pagination (<code>WHERE id &gt; last_seen</code>) scales better.</div>

<div class="callout"><strong>Verify:</strong>
  <ul>
    <li>ORDER BY DESC changed row order.</li>
    <li>LIMIT 3 returned ≤3 rows.</li>
    <li>OFFSET skipped the correct number of rows.</li>
  </ul>
</div>
`,
    quiz: {
      q: "LIMIT 10 OFFSET 20 returns:",
      options: ["First 20 rows", "Rows 21–30 after sorting", "All rows", "Only row 20"],
      answer: 1
    }
  });

  L("sql13", {
    module: "sql-m04",
    title: "JOINs — Step by Step",
    level: "Intermediate",
    duration: "55 min",
    objectives: [
      "Write INNER JOIN with explicit ON",
      "Use LEFT, RIGHT, FULL OUTER joins",
      "Understand CROSS JOIN and SELF JOIN",
      "Avoid accidental Cartesian products"
    ],
    content: `
<p>Joins combine rows from related tables. Always specify join conditions explicitly.</p>

<h2>Setup — order line items</h2>
<ol>
  <li>
    <pre><code>CREATE TABLE IF NOT EXISTS shop.order_items (
  order_id INTEGER NOT NULL REFERENCES shop.orders(order_id),
  product_id INTEGER NOT NULL REFERENCES shop.products(product_id),
  qty INTEGER NOT NULL CHECK (qty &gt; 0),
  line_price NUMERIC(10,2) NOT NULL,
  PRIMARY KEY (order_id, product_id)
);
INSERT INTO shop.order_items VALUES (1, 1, 2, 259.98);</code></pre></li>
</ol>

<h2>INNER JOIN</h2>
<ol>
  <li>Orders with customer names:
    <pre><code>SELECT o.order_id, c.full_name, o.order_date, o.status
FROM shop.orders o
INNER JOIN shop.customers c ON c.customer_id = o.customer_id;</code></pre>
    <strong>Expected:</strong> only orders that have matching customers.</li>
  <li>Three-table join:
    <pre><code>SELECT o.order_id, p.sku, oi.qty, oi.line_price
FROM shop.order_items oi
INNER JOIN shop.orders o ON o.order_id = oi.order_id
INNER JOIN shop.products p ON p.product_id = oi.product_id;</code></pre></li>
</ol>

<h2>LEFT OUTER JOIN</h2>
<ol>
  <li>All customers, even without orders:
    <pre><code>SELECT c.full_name, o.order_id
FROM shop.customers c
LEFT JOIN shop.orders o ON o.customer_id = c.customer_id;</code></pre>
    <strong>Expected:</strong> NULL order_id for customers with no orders.</li>
</ol>

<h2>RIGHT / FULL OUTER (PostgreSQL)</h2>
<ol>
  <li>RIGHT JOIN (rare — usually rewrite as LEFT):
    <pre><code>SELECT c.full_name, o.order_id
FROM shop.orders o
RIGHT JOIN shop.customers c ON c.customer_id = o.customer_id;</code></pre></li>
  <li>FULL OUTER — unmatched from both sides:
    <pre><code>SELECT c.full_name, o.order_id
FROM shop.customers c
FULL OUTER JOIN shop.orders o ON c.customer_id = o.customer_id;</code></pre></li>
</ol>

<h2>CROSS JOIN</h2>
<ol>
  <li>Every product × every customer (careful — explosive):
    <pre><code>SELECT c.customer_id, p.sku
FROM shop.customers c
CROSS JOIN shop.products p
LIMIT 5;</code></pre>
    <strong>Expected:</strong> Cartesian combinations (limited to 5 for safety).</li>
</ol>

<h2>SELF JOIN</h2>
<ol>
  <li>Employees table example:
    <pre><code>CREATE TABLE shop.employees (
  emp_id INT PRIMARY KEY, name TEXT, manager_id INT REFERENCES shop.employees(emp_id)
);
INSERT INTO shop.employees VALUES (1,'CEO',NULL),(2,'Mgr',1),(3,'Dev',2);
SELECT e.name AS employee, m.name AS manager
FROM shop.employees e
LEFT JOIN shop.employees m ON e.manager_id = m.emp_id;</code></pre></li>
</ol>

<div class="callout warning"><strong>Cartesian trap:</strong> <code>FROM a, b</code> without WHERE multiplies row counts. Prefer explicit JOIN syntax.</div>

<div class="callout"><strong>Verify:</strong>
  <ul>
    <li>INNER JOIN returned only matching pairs.</li>
    <li>LEFT JOIN showed NULLs for customers without orders.</li>
    <li>SELF JOIN listed employee and manager names.</li>
  </ul>
</div>
`,
    quiz: {
      q: "LEFT JOIN keeps all rows from which table?",
      options: ["Right table", "Left table", "Both always", "Neither"],
      answer: 1
    }
  });

  L("sql14", {
    module: "sql-m04",
    title: "GROUP BY, HAVING & Aggregates",
    level: "Intermediate",
    duration: "45 min",
    objectives: [
      "Use COUNT, SUM, AVG, MIN, MAX",
      "Group by one or more columns",
      "Filter groups with HAVING",
      "Understand SELECT column rules with GROUP BY"
    ],
    content: `
<h2>Scalar aggregates (whole table)</h2>
<ol>
  <li>
    <pre><code>SELECT COUNT(*) AS product_count,
       SUM(stock_qty) AS total_units,
       AVG(unit_price) AS avg_price,
       MIN(unit_price) AS min_price,
       MAX(unit_price) AS max_price
FROM shop.products;</code></pre>
    <strong>Expected:</strong> one summary row.</li>
</ol>

<h2>GROUP BY</h2>
<ol>
  <li>Orders per customer:
    <pre><code>SELECT customer_id, COUNT(*) AS order_count, SUM(total_amount) AS revenue
FROM shop.orders
GROUP BY customer_id;</code></pre></li>
  <li>Multi-column grouping:
    <pre><code>SELECT status, DATE_TRUNC('month', order_date) AS month, COUNT(*)
FROM shop.orders
GROUP BY status, DATE_TRUNC('month', order_date)
ORDER BY month, status;</code></pre></li>
</ol>

<h2>HAVING (filter groups, not rows)</h2>
<ol>
  <li>Customers with more than one order:
    <pre><code>SELECT customer_id, COUNT(*) AS cnt
FROM shop.orders
GROUP BY customer_id
HAVING COUNT(*) &gt; 1;</code></pre></li>
  <li>Compare WHERE vs HAVING:
    <pre><code>SELECT customer_id, SUM(total_amount) AS spent
FROM shop.orders
WHERE status &lt;&gt; 'CANCELLED'
GROUP BY customer_id
HAVING SUM(total_amount) &gt; 100;</code></pre>
    <strong>Expected:</strong> WHERE filters rows before grouping; HAVING filters groups after.</li>
</ol>

<h2>Rule: non-aggregated SELECT columns must appear in GROUP BY</h2>
<pre><code>-- INVALID in standard SQL:
-- SELECT customer_id, order_date, COUNT(*) FROM orders GROUP BY customer_id;

-- VALID:
SELECT customer_id, COUNT(*) FROM shop.orders GROUP BY customer_id;</code></pre>

<div class="callout"><strong>Verify:</strong>
  <ul>
    <li>Scalar aggregate returned one row.</li>
    <li>GROUP BY produced per-customer counts.</li>
    <li>HAVING excluded groups below threshold.</li>
    <li>You can explain WHERE vs HAVING.</li>
  </ul>
</div>
`,
    quiz: {
      q: "HAVING filters:",
      options: ["Individual rows before grouping", "Groups after aggregation", "Only indexed columns", "Only NULL values"],
      answer: 1
    }
  });

  L("sql15", {
    module: "sql-m04",
    title: "Subqueries & CTEs",
    level: "Intermediate",
    duration: "50 min",
    objectives: [
      "Write scalar, row, and table subqueries",
      "Use IN and EXISTS semi-joins",
      "Refactor with WITH (CTE)",
      "Build a recursive CTE"
    ],
    content: `
<h2>Subquery in WHERE (IN)</h2>
<ol>
  <li>Products ordered at least once:
    <pre><code>SELECT sku, name FROM shop.products
WHERE product_id IN (
  SELECT product_id FROM shop.order_items
);</code></pre></li>
</ol>

<h2>EXISTS (often faster than IN for large sets)</h2>
<ol>
  <li>Customers who placed orders:
    <pre><code>SELECT c.full_name FROM shop.customers c
WHERE EXISTS (
  SELECT 1 FROM shop.orders o WHERE o.customer_id = c.customer_id
);</code></pre></li>
</ol>

<h2>Scalar subquery in SELECT</h2>
<ol>
  <li>
    <pre><code>SELECT sku, unit_price,
  (SELECT AVG(unit_price) FROM shop.products) AS catalog_avg
FROM shop.products;</code></pre>
    <strong>Expected:</strong> same catalog_avg on every row.</li>
</ol>

<h2>CTE (WITH clause)</h2>
<ol>
  <li>Readable revenue per customer:
    <pre><code>WITH revenue AS (
  SELECT customer_id, SUM(total_amount) AS total
  FROM shop.orders GROUP BY customer_id
)
SELECT c.full_name, r.total
FROM shop.customers c
JOIN revenue r ON r.customer_id = c.customer_id;</code></pre></li>
</ol>

<h2>Recursive CTE — org chart depth</h2>
<ol>
  <li>
    <pre><code>WITH RECURSIVE chain AS (
  SELECT emp_id, name, manager_id, 0 AS depth FROM shop.employees WHERE manager_id IS NULL
  UNION ALL
  SELECT e.emp_id, e.name, e.manager_id, chain.depth + 1
  FROM shop.employees e JOIN chain ON e.manager_id = chain.emp_id
)
SELECT * FROM chain ORDER BY depth, name;</code></pre>
    <strong>Expected:</strong> CEO depth 0, manager depth 1, dev depth 2.</li>
</ol>

<div class="callout"><strong>Verify:</strong>
  <ul>
    <li>IN and EXISTS returned consistent customer sets.</li>
    <li>CTE query ran without errors.</li>
    <li>Recursive CTE showed increasing depth values.</li>
  </ul>
</div>
`,
    quiz: {
      q: "A CTE (WITH clause) primarily improves:",
      options: ["Disk encryption", "Readability and reuse of query logic", "Network bandwidth only", "OS kernel scheduling"],
      answer: 1
    }
  });

  L("sql16", {
    module: "sql-m04",
    title: "Window Functions",
    level: "Advanced",
    duration: "50 min",
    objectives: [
      "Use ROW_NUMBER, RANK, DENSE_RANK",
      "Compute running totals with frames",
      "Compare GROUP BY vs OVER()",
      "Apply LAG/LEAD for row comparisons"
    ],
    content: `
<p>Window functions compute across related rows <em>without</em> collapsing them like GROUP BY.</p>

<h2>Ranking</h2>
<ol>
  <li>Rank products by price:
    <pre><code>SELECT sku, unit_price,
  RANK() OVER (ORDER BY unit_price DESC) AS price_rank,
  DENSE_RANK() OVER (ORDER BY unit_price DESC) AS dense_rank
FROM shop.products;</code></pre>
    <strong>Expected:</strong> ties get same rank; RANK leaves gaps, DENSE_RANK does not.</li>
  <li>ROW_NUMBER — unique sequence even with ties:
    <pre><code>SELECT sku, unit_price,
  ROW_NUMBER() OVER (ORDER BY unit_price DESC, sku) AS rn
FROM shop.products;</code></pre></li>
</ol>

<h2>PARTITION BY</h2>
<ol>
  <li>Rank orders within each customer:
    <pre><code>SELECT order_id, customer_id, order_date,
  ROW_NUMBER() OVER (PARTITION BY customer_id ORDER BY order_date DESC) AS recent_rank
FROM shop.orders;</code></pre></li>
</ol>

<h2>Aggregate window — running total</h2>
<ol>
  <li>
    <pre><code>SELECT order_id, customer_id, total_amount,
  SUM(total_amount) OVER (
    PARTITION BY customer_id ORDER BY order_id
    ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW
  ) AS running_total
FROM shop.orders;</code></pre></li>
</ol>

<h2>LAG / LEAD</h2>
<ol>
  <li>Compare each order total to previous per customer:
    <pre><code>SELECT order_id, customer_id, total_amount,
  LAG(total_amount) OVER (PARTITION BY customer_id ORDER BY order_id) AS prev_amount,
  total_amount - LAG(total_amount) OVER (PARTITION BY customer_id ORDER BY order_id) AS delta
FROM shop.orders;</code></pre></li>
</ol>

<div class="callout"><strong>Verify:</strong>
  <ul>
    <li>ROW_NUMBER assigned unique sequence per partition ordering.</li>
    <li>Running total increased monotonically within customer.</li>
    <li>LAG returned NULL for first order per customer.</li>
  </ul>
</div>
`,
    quiz: {
      q: "Unlike GROUP BY, window functions:",
      options: ["Always delete rows", "Keep detail rows while adding analytic columns", "Require a HAVING clause", "Only work on one column"],
      answer: 1
    }
  });

  /* ========== MODULE 5: DESIGN & OBJECTS ========== */

  L("sql17", {
    module: "sql-m05",
    title: "Constraints & Normalization (1NF–3NF)",
    level: "Intermediate",
    duration: "50 min",
    objectives: [
      "Apply normalization rules with examples",
      "Recognize 1NF, 2NF, 3NF violations",
      "Balance normalization vs denormalization",
      "Use constraints to enforce design in the database"
    ],
    content: `
<h2>Why normalize?</h2>
<p>Reduce redundancy, update anomalies, and deletion anomalies. The database enforces truth once; every app benefits.</p>

<h2>0NF → 1NF (atomic values)</h2>
<p><strong>Violation:</strong> repeating groups or multi-valued cells.</p>
<ol>
  <li>Bad design:
    <pre><code>-- BAD: phone1, phone2 columns or '555-1,555-2' in one cell
CREATE TABLE bad_customer (id INT, name TEXT, phones TEXT);</code></pre></li>
  <li>1NF fix — separate row per phone:
    <pre><code>CREATE TABLE customer_phones (
  customer_id INT REFERENCES shop.customers(customer_id),
  phone TEXT NOT NULL,
  PRIMARY KEY (customer_id, phone)
);</code></pre></li>
</ol>

<h2>1NF → 2NF (no partial dependency on composite key)</h2>
<p>Only applies when PK has multiple columns.</p>
<ol>
  <li>Violation: order line stores product name (depends only on product_id, not full PK):
    <pre><code>-- BAD composite PK (order_id, product_id) but product_name depends only on product_id</code></pre></li>
  <li>2NF fix: product name stays in <code>products</code>; line item stores only FK + qty + price snapshot.</li>
</ol>

<h2>2NF → 3NF (no transitive dependency)</h2>
<ol>
  <li>Violation: customer stores <code>city</code> and <code>country_name</code> where country_name depends on city, not customer_id.</li>
  <li>3NF fix:
    <pre><code>CREATE TABLE cities (city_id SERIAL PRIMARY KEY, city_name TEXT, country_code CHAR(2));
CREATE TABLE customer_city (
  customer_id INT PRIMARY KEY REFERENCES shop.customers(customer_id),
  city_id INT REFERENCES cities(city_id)
);</code></pre></li>
</ol>

<h2>When to denormalize</h2>
<ul>
  <li>Read-heavy reporting tables (materialized summaries)</li>
  <li>Snapshot columns on order lines (<code>line_price</code> at purchase time)</li>
  <li>Always document why and how you keep denormalized data consistent</li>
</ul>

<h2>Enforce with constraints</h2>
<ol>
  <li>Add UNIQUE on natural keys where appropriate.</li>
  <li>Use FK to prevent orphan references.</li>
  <li>CHECK for domain rules (status enums, non-negative amounts).</li>
</ol>

<div class="callout"><strong>Verify:</strong>
  <ul>
    <li>You can identify a 1NF violation (multi-valued column).</li>
    <li>You explained why <code>line_price</code> on order_items is intentional denormalization.</li>
    <li>You created at least one FK-backed child table.</li>
  </ul>
</div>
`,
    quiz: {
      q: "Third normal form (3NF) eliminates:",
      options: ["All indexes", "Transitive dependencies on non-key attributes", "Primary keys", "Foreign keys"],
      answer: 1
    }
  });

  L("sql18", {
    module: "sql-m05",
    title: "Indexes — Create, Use & When Not To",
    level: "Intermediate",
    duration: "45 min",
    objectives: [
      "Create B-tree indexes on PostgreSQL and SQLite",
      "Understand when indexes help SELECT and hurt writes",
      "Use composite and partial indexes",
      "Inspect index usage with EXPLAIN"
    ],
    content: `
<h2>Create indexes step-by-step</h2>
<ol>
  <li>Single-column index on FK join column:
    <pre><code>CREATE INDEX ix_orders_customer ON shop.orders (customer_id);</code></pre>
    <strong>Expected:</strong> <code>CREATE INDEX</code>.</li>
  <li>Composite index for filter + sort:
    <pre><code>CREATE INDEX ix_orders_cust_date ON shop.orders (customer_id, order_date DESC);</code></pre></li>
  <li>Partial index (PostgreSQL) — only active customers:
    <pre><code>CREATE INDEX ix_customers_active_email ON shop.customers (email)
WHERE is_active = TRUE;</code></pre></li>
  <li>List indexes:
    <pre><code>\\di shop.*   -- psql
.indexes      -- sqlite (meta)</code></pre></li>
</ol>

<h2>When indexes help</h2>
<ul>
  <li>WHERE equality/range on leading index columns</li>
  <li>JOIN keys (especially FK columns on the child table)</li>
  <li>ORDER BY matching index order</li>
</ul>

<h2>When NOT to index</h2>
<ul>
  <li>Tiny tables (sequential scan is faster)</li>
  <li>Low-cardinality columns alone (e.g. boolean) unless partial</li>
  <li>Tables with extreme write volume and rare reads</li>
  <li>Every column "just in case" — slows INSERT/UPDATE/DELETE</li>
</ul>

<h2>Drop unused index</h2>
<ol>
  <li>
    <pre><code>DROP INDEX IF EXISTS shop.ix_orders_customer;</code></pre>
    <strong>Expected:</strong> index removed; recreate if you still need it for labs.</li>
</ol>

<div class="callout"><strong>Verify:</strong>
  <ul>
    <li><code>\\di</code> lists your new indexes.</li>
    <li>You can name one benefit and one cost of indexing.</li>
    <li>You created a composite or partial index.</li>
  </ul>
</div>
`,
    quiz: {
      q: "Over-indexing primarily hurts:",
      options: ["SELECT with perfect predicates", "INSERT/UPDATE/DELETE maintenance", "Database creation only", "UTF-8 encoding"],
      answer: 1
    }
  });

  L("sql19", {
    module: "sql-m05",
    title: "Views",
    level: "Intermediate",
    duration: "40 min",
    objectives: [
      "Create simple and joined views",
      "Use views for security and simplification",
      "Understand updatable vs read-only views",
      "Create materialized views (PostgreSQL)"
    ],
    content: `
<h2>Simple view</h2>
<ol>
  <li>Customer order summary:
    <pre><code>CREATE OR REPLACE VIEW shop.v_customer_orders AS
SELECT c.customer_id, c.full_name, c.email,
       COUNT(o.order_id) AS order_count,
       COALESCE(SUM(o.total_amount), 0) AS lifetime_spend
FROM shop.customers c
LEFT JOIN shop.orders o ON o.customer_id = c.customer_id
GROUP BY c.customer_id, c.full_name, c.email;</code></pre></li>
  <li>Query like a table:
    <pre><code>SELECT * FROM shop.v_customer_orders WHERE lifetime_spend &gt; 0;</code></pre>
    <strong>Expected:</strong> aggregated rows, no duplicate customer rows.</li>
</ol>

<h2>Security pattern</h2>
<ol>
  <li>Hide emails from reporting role:
    <pre><code>CREATE VIEW shop.v_customers_public AS
SELECT customer_id, full_name, country_code, is_active FROM shop.customers;</code></pre></li>
  <li>Grant SELECT on view only (PostgreSQL):
    <pre><code>-- GRANT SELECT ON shop.v_customers_public TO reporting_role;</code></pre></li>
</ol>

<h2>Materialized view (PostgreSQL)</h2>
<ol>
  <li>
    <pre><code>CREATE MATERIALIZED VIEW shop.mv_product_sales AS
SELECT p.product_id, p.sku, SUM(oi.qty) AS units_sold, SUM(oi.line_price) AS revenue
FROM shop.products p
LEFT JOIN shop.order_items oi ON oi.product_id = p.product_id
GROUP BY p.product_id, p.sku;</code></pre></li>
  <li>Refresh after ETL:
    <pre><code>REFRESH MATERIALIZED VIEW shop.mv_product_sales;</code></pre>
    <strong>Expected:</strong> snapshot updated.</li>
</ol>

<h2>Updatable views (rules)</h2>
<p>Simple views on one table with no aggregation may be updatable. Complex joins/GROUP BY views are read-only unless INSTEAD OF triggers exist.</p>

<div class="callout"><strong>Verify:</strong>
  <ul>
    <li><code>v_customer_orders</code> returns one row per customer.</li>
    <li>Materialized view refreshed successfully.</li>
    <li>You know when a view is not updatable.</li>
  </ul>
</div>
`,
    quiz: {
      q: "A materialized view stores:",
      options: ["Only the view definition", "A physical snapshot of query results", "OS log files", "User passwords"],
      answer: 1
    }
  });

  L("sql20", {
    module: "sql-m05",
    title: "Transactions — ACID, Isolation, COMMIT & ROLLBACK",
    level: "Intermediate",
    duration: "50 min",
    objectives: [
      "Explain ACID properties",
      "Use BEGIN, COMMIT, ROLLBACK, SAVEPOINT",
      "Understand isolation levels and anomalies",
      "Transfer money safely in one transaction"
    ],
    content: `
<h2>ACID recap</h2>
<ul>
  <li><strong>Atomicity</strong> — all or nothing</li>
  <li><strong>Consistency</strong> — constraints hold after commit</li>
  <li><strong>Isolation</strong> — concurrent sessions don't corrupt each other</li>
  <li><strong>Durability</strong> — committed data survives crash</li>
</ul>

<h2>Bank transfer lab</h2>
<ol>
  <li>Add balance column to accounts concept (use products stock as analog or create accounts):
    <pre><code>CREATE TABLE shop.accounts (
  acct_id SERIAL PRIMARY KEY, customer_id INT REFERENCES shop.customers(customer_id),
  balance NUMERIC(12,2) NOT NULL CHECK (balance &gt;= 0)
);
INSERT INTO shop.accounts (customer_id, balance) VALUES (1, 1000), (2, 500);</code></pre></li>
  <li>Transfer 100 from acct 1 → 2 inside transaction:
    <pre><code>BEGIN;
UPDATE shop.accounts SET balance = balance - 100 WHERE acct_id = 1;
UPDATE shop.accounts SET balance = balance + 100 WHERE acct_id = 2;
SELECT * FROM shop.accounts ORDER BY acct_id;
COMMIT;</code></pre>
    <strong>Expected:</strong> 900 and 600 balances.</li>
  <li>Simulate failure — rollback:
    <pre><code>BEGIN;
UPDATE shop.accounts SET balance = balance - 50 WHERE acct_id = 1;
-- oops — application error
ROLLBACK;
SELECT balance FROM shop.accounts WHERE acct_id = 1;</code></pre>
    <strong>Expected:</strong> balance unchanged from last commit.</li>
</ol>

<h2>SAVEPOINT</h2>
<ol>
  <li>
    <pre><code>BEGIN;
UPDATE shop.accounts SET balance = balance - 10 WHERE acct_id = 1;
SAVEPOINT sp1;
UPDATE shop.accounts SET balance = balance - 99999 WHERE acct_id = 1; -- would violate CHECK
ROLLBACK TO SAVEPOINT sp1;
COMMIT;</code></pre>
    <strong>Expected:</strong> only -10 applied if first update valid.</li>
</ol>

<h2>Isolation levels (PostgreSQL)</h2>
<ol>
  <li>
    <pre><code>SHOW transaction_isolation;
SET TRANSACTION ISOLATION LEVEL READ COMMITTED;
SET TRANSACTION ISOLATION LEVEL REPEATABLE READ;</code></pre></li>
</ol>
<div class="table-wrap"><table>
  <thead><tr><th>Level</th><th>Dirty read</th><th>Non-repeatable read</th><th>Phantom</th></tr></thead>
  <tbody>
    <tr><td>READ UNCOMMITTED (PG treats as RC)</td><td>No</td><td>Yes</td><td>Yes</td></tr>
    <tr><td>READ COMMITTED (default)</td><td>No</td><td>Yes</td><td>Yes</td></tr>
    <tr><td>REPEATABLE READ</td><td>No</td><td>No</td><td>No (PG)</td></tr>
    <tr><td>SERIALIZABLE</td><td>No</td><td>No</td><td>No</td></tr>
  </tbody>
</table></div>

<div class="callout"><strong>Verify:</strong>
  <ul>
    <li>Transfer committed with correct balances.</li>
    <li>ROLLBACK undid uncommitted changes.</li>
    <li>You named all four ACID properties.</li>
    <li>You tried SAVEPOINT or read isolation docs.</li>
  </ul>
</div>
`,
    quiz: {
      q: "ROLLBACK in a transaction:",
      options: ["Commits changes", "Undoes changes since BEGIN", "Deletes the database", "Creates an index"],
      answer: 1
    }
  });

  /* ========== MODULE 6: PRO ========== */

  L("sql21", {
    module: "sql-m06",
    title: "Functions & Stored Routines Overview",
    level: "Advanced",
    duration: "45 min",
    objectives: [
      "Use built-in scalar and aggregate functions",
      "Write a SQL function in PostgreSQL",
      "Create a stored procedure with control flow",
      "Know when logic belongs in DB vs application"
    ],
    content: `
<h2>Built-in functions (quick tour)</h2>
<ol>
  <li>String: <code>UPPER</code>, <code>LOWER</code>, <code>TRIM</code>, <code>SUBSTRING</code>, <code>CONCAT</code> / <code>||</code></li>
  <li>Date: <code>NOW()</code>, <code>DATE_TRUNC</code>, <code>AGE</code>, <code>EXTRACT</code></li>
  <li>Math: <code>ROUND</code>, <code>CEIL</code>, <code>FLOOR</code>, <code>ABS</code></li>
  <li>Conditional: <code>COALESCE</code>, <code>NULLIF</code>, <code>CASE</code></li>
  <li>Aggregate: <code>COUNT</code>, <code>STRING_AGG</code> (PostgreSQL)</li>
</ol>

<h2>User-defined function (PostgreSQL)</h2>
<ol>
  <li>Price with tax:
    <pre><code>CREATE OR REPLACE FUNCTION shop.price_with_tax(p_amount NUMERIC, p_rate NUMERIC DEFAULT 0.08)
RETURNS NUMERIC LANGUAGE sql IMMUTABLE AS $$
  SELECT ROUND(p_amount * (1 + p_rate), 2);
$$;</code></pre></li>
  <li>Test:
    <pre><code>SELECT shop.price_with_tax(100);</code></pre>
    <strong>Expected:</strong> <code>108.00</code>.</li>
</ol>

<h2>Stored procedure (PL/pgSQL)</h2>
<ol>
  <li>Apply discount if stock high:
    <pre><code>CREATE OR REPLACE PROCEDURE shop.apply_bulk_discount(p_sku TEXT, p_pct NUMERIC)
LANGUAGE plpgsql AS $$
BEGIN
  IF p_pct &lt; 0 OR p_pct &gt; 50 THEN
    RAISE EXCEPTION 'Discount % out of range', p_pct;
  END IF;
  UPDATE shop.products
  SET unit_price = ROUND(unit_price * (1 - p_pct/100), 2)
  WHERE sku = p_sku AND stock_qty &gt; 100;
END;
$$;</code></pre></li>
  <li>Call:
    <pre><code>CALL shop.apply_bulk_discount('SKU-002', 10);</code></pre></li>
</ol>

<h2>DB vs app logic</h2>
<ul>
  <li><strong>In DB:</strong> constraints, simple transforms close to data, performance-critical set operations</li>
  <li><strong>In app:</strong> complex business workflows, external API calls, UI rules</li>
</ul>

<div class="callout"><strong>Verify:</strong>
  <ul>
    <li><code>price_with_tax(100)</code> returned 108.00.</li>
    <li>Procedure ran without error (or raised expected exception for bad input).</li>
    <li>You listed three built-in function categories.</li>
  </ul>
</div>
`,
    quiz: {
      q: "IMMUTABLE on a PostgreSQL function tells the optimizer:",
      options: ["The function deletes data", "The function result depends only on inputs (safe to optimize)", "The function must run as root", "The function cannot use SQL"],
      answer: 1
    }
  });

  L("sql22", {
    module: "sql-m06",
    title: "Performance — EXPLAIN & Anti-Patterns",
    level: "Advanced",
    duration: "55 min",
    objectives: [
      "Read EXPLAIN and EXPLAIN ANALYZE output",
      "Identify sequential scans and nested loops",
      "Fix common anti-patterns",
      "Apply practical tuning checklist"
    ],
    content: `
<h2>Capture a plan</h2>
<ol>
  <li>PostgreSQL — explain without executing:
    <pre><code>EXPLAIN SELECT * FROM shop.orders o
JOIN shop.customers c ON c.customer_id = o.customer_id
WHERE c.country_code = 'US';</code></pre>
    <strong>Expected:</strong> plan tree with Seq Scan or Index Scan nodes.</li>
  <li>Execute and measure:
    <pre><code>EXPLAIN (ANALYZE, BUFFERS, FORMAT TEXT)
SELECT * FROM shop.orders o
JOIN shop.customers c ON c.customer_id = o.customer_id
WHERE c.email LIKE '%@example.com';</code></pre>
    <strong>Expected:</strong> actual row counts and timing per node.</li>
  <li>SQLite:
    <pre><code>EXPLAIN QUERY PLAN SELECT * FROM products WHERE sku = 'SKU-001';</code></pre></li>
</ol>

<h2>Read the plan</h2>
<ul>
  <li><strong>Seq Scan</strong> — reads whole table; OK for tiny tables, bad for large filtered tables.</li>
  <li><strong>Index Scan / Index Only Scan</strong> — uses index; preferred for selective predicates.</li>
  <li><strong>Nested Loop</strong> — for each outer row, probe inner — good with index on inner.</li>
  <li><strong>Hash Join</strong> — builds hash table on one side — good for larger equi-joins.</li>
  <li><strong>Sort</strong> — expensive; check if index provides order.</li>
</ul>

<h2>Anti-patterns & fixes</h2>
<div class="table-wrap"><table>
  <thead><tr><th>Anti-pattern</th><th>Symptom</th><th>Fix</th></tr></thead>
  <tbody>
    <tr><td>SELECT * in hot queries</td><td>Wide rows, no covering index</td><td>Project needed columns only</td></tr>
    <tr><td>Function on indexed column <code>WHERE UPPER(email)=...</code></td><td>Seq scan</td><td>Store normalized email or functional index</td></tr>
    <tr><td>Leading wildcard LIKE <code>'%x'</code></td><td>Index unusable</td><td>Full-text search / trigram index</td></tr>
    <tr><td>Implicit type cast on indexed column</td><td>Seq scan</td><td>Match parameter type to column</td></tr>
    <tr><td>N+1 queries from app loop</td><td>High round trips</td><td>JOIN or batch IN query</td></tr>
    <tr><td>Missing index on FK child column</td><td>Slow joins/deletes on parent</td><td>Index FK columns</td></tr>
    <tr><td>OR across columns</td><td>Multiple scans</td><td>UNION ALL rewrite or bitmap plans</td></tr>
  </tbody>
</table></div>

<h2>Tuning checklist</h2>
<ol>
  <li>Reproduce with realistic data volume.</li>
  <li>EXPLAIN (ANALYZE, BUFFERS) the slow query.</li>
  <li>Check row estimate vs actual (stats stale?).</li>
  <li>Add/adjust index on selective predicates and join keys.</li>
  <li>Rewrite query (CTE vs subquery, EXISTS vs IN).</li>
  <li>Update statistics: <code>ANALYZE shop.orders;</code> (PostgreSQL).</li>
  <li>Re-measure; document before/after.</li>
</ol>

<h2>Lab — index proof</h2>
<ol>
  <li>Run EXPLAIN before index on <code>orders(customer_id)</code>.</li>
  <li><code>CREATE INDEX ix_orders_customer ON shop.orders(customer_id);</code></li>
  <li>Run EXPLAIN again — expect Index Scan or better join plan.</li>
</ol>

<div class="callout"><strong>Verify:</strong>
  <ul>
    <li>You ran EXPLAIN ANALYZE on a join query.</li>
    <li>You identified at least one Seq Scan or Join node.</li>
    <li>You named three SQL anti-patterns and fixes.</li>
    <li>Index changed the plan (or you documented why not).</li>
  </ul>
</div>
`,
    quiz: {
      q: "EXPLAIN ANALYZE differs from EXPLAIN because it:",
      options: ["Only works on SQLite", "Actually runs the query and shows real timings", "Deletes the table", "Creates automatic indexes"],
      answer: 1
    }
  });

  /* ========== REGISTER COURSE ========== */

  window.FORGE.register({
    id: "sql",
    order: 1,
    title: "SQL Mastery",
    shortTitle: "SQL",
    tagline: "Portable SQL from zero to production — SQLite & PostgreSQL, nothing skipped",
    level: "Beginner → Advanced",
    accent: "#6aa8ff",
    description: "Complete step-by-step SQL course: install SQLite and PostgreSQL on Windows and Linux, DDL/DML, queries, joins, windows, design, indexes, views, transactions, routines, and EXPLAIN tuning.",
    audience: "Developers, analysts, aspiring DBAs, and anyone who needs production-grade SQL skills",
    modules: [
      { id: "sql-m01", title: "Getting Started", lessonIds: ["sql01", "sql02", "sql03"] },
      { id: "sql-m02", title: "DDL — Defining Structure", lessonIds: ["sql04", "sql05", "sql06"] },
      { id: "sql-m03", title: "DML — Changing Data", lessonIds: ["sql07", "sql08", "sql09"] },
      { id: "sql-m04", title: "Queries — Reading Data", lessonIds: ["sql10", "sql11", "sql12", "sql13", "sql14", "sql15", "sql16"] },
      { id: "sql-m05", title: "Design & Database Objects", lessonIds: ["sql17", "sql18", "sql19", "sql20"] },
      { id: "sql-m06", title: "Professional SQL", lessonIds: ["sql21", "sql22"] }
    ],
    lessons,
    labs: [
      {
        id: "sql-lab01",
        title: "Install & verify SQLite + PostgreSQL",
        lesson: "sql02",
        steps: "Complete Windows or Linux install paths for both engines. Run sqlite3 --version, psql --version, SELECT 1 in each. Document passwords and workspace folder."
      },
      {
        id: "sql-lab02",
        title: "Build the shop schema",
        lesson: "sql05",
        steps: "Create ashovix database and shop schema. Create customers, products, orders with all constraints. Insert seed rows. Verify with \\d and test FK violation."
      },
      {
        id: "sql-lab03",
        title: "CLI power session",
        lesson: "sql03",
        steps: "Open sqlite3 and psql interactively. Run meta-commands, execute hello.sql, optionally connect DBeaver and run SELECT 42."
      },
      {
        id: "sql-lab04",
        title: "Safe UPDATE/DELETE drill",
        lesson: "sql08",
        steps: "For three scenarios, write SELECT dry-run first, then UPDATE or DELETE inside BEGIN/COMMIT. Demonstrate FK blocking a bad delete."
      },
      {
        id: "sql-lab05",
        title: "Upsert staging sync",
        lesson: "sql09",
        steps: "Load products_staging from CSV or manual INSERT. Run ON CONFLICT or MERGE to sync into products. Verify counts and updated prices."
      },
      {
        id: "sql-lab06",
        title: "Join challenge",
        lesson: "sql13",
        steps: "Write queries: inner join orders to customers; left join all customers; three-table order line report; self-join on employees."
      },
      {
        id: "sql-lab07",
        title: "Analytics with windows",
        lesson: "sql16",
        steps: "Rank products by price; running total per customer; LAG delta between orders. Compare output to equivalent subquery approach."
      },
      {
        id: "sql-lab08",
        title: "ACID transfer transaction",
        lesson: "sql20",
        steps: "Create accounts table. Transfer funds in one transaction. Demonstrate ROLLBACK and SAVEPOINT. Show balances before and after."
      },
      {
        id: "sql-lab09",
        title: "Index & EXPLAIN before/after",
        lesson: "sql22",
        steps: "Pick a slow join. Capture EXPLAIN ANALYZE. Add index on FK column. Re-run and document plan change and timing."
      },
      {
        id: "sql-lab10",
        title: "Normalization refactor",
        lesson: "sql17",
        steps: "Start from a denormalized table with repeating phone numbers. Refactor to 1NF/3NF. Migrate data with INSERT...SELECT."
      }
    ]
  });
})();
