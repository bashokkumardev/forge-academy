/* Ashovix Labs — Complete IBM Db2 LUW Curriculum (original educational content) */
window.DB2FORGE = {
  meta: {
    title: "Ashovix Labs",
    subtitle: "Complete IBM Db2 LUW Academy",
    version: "11.5 / 12.1 oriented",
    lessons: 42,
    modules: 14,
    labs: 12
  },
  paths: [
    { id: "foundation", name: "Foundation", level: "Beginner", blurb: "What Db2 LUW is, Linux install, instances, databases, and the CLP.", color: "#3fd0b6" },
    { id: "sql", name: "SQL Mastery", level: "Beginner → Intermediate", blurb: "Query, modify, and shape data with Db2 SQL dialects and objects.", color: "#6aa8ff" },
    { id: "design", name: "Physical Design", level: "Intermediate", blurb: "Tablespaces, buffer pools, indexes, partitioning, and schema craft.", color: "#f0b429" },
    { id: "security", name: "Security", level: "Intermediate", blurb: "Authentication, authorities, RCAC/LBAC, roles, and auditing.", color: "#ff8f70" },
    { id: "admin", name: "Administration", level: "Intermediate → Advanced", blurb: "Logging, backup/restore, monitoring, and day-2 operations.", color: "#7dd3c0" },
    { id: "performance", name: "Performance", level: "Advanced", blurb: "Optimizer, EXPLAIN, memory, compression, BLU, and WLM.", color: "#5dde8a" },
    { id: "architect", name: "Architect Track", level: "Expert", blurb: "HADR, pureScale, DPF, federation, cloud, and enterprise patterns.", color: "#e8a87c" }
  ],
  modules: [],
  lessons: {},
  labs: [],
  reference: {},
  cert: {}
};

(function (C) {
  const L = (id, data) => { C.lessons[id] = { id, ...data }; };

  C.modules = [
    { id: "m01", path: "foundation", title: "Db2 LUW Foundations", lessonIds: ["f01", "f02", "f03", "f04", "f05", "f06"] },
    { id: "m02", path: "sql", title: "SQL Query Language", lessonIds: ["s01", "s02", "s03", "s04"] },
    { id: "m03", path: "sql", title: "SQL Objects & Logic", lessonIds: ["s05", "s06", "s07"] },
    { id: "m04", path: "design", title: "Storage & Access Paths", lessonIds: ["d01", "d02", "d03", "d04", "d05"] },
    { id: "m05", path: "security", title: "Protecting the Database", lessonIds: ["sec01", "sec02", "sec03", "sec04"] },
    { id: "m06", path: "admin", title: "Recovery & Operations", lessonIds: ["a01", "a02", "a03", "a04", "a05"] },
    { id: "m07", path: "performance", title: "Tuning & Workloads", lessonIds: ["p01", "p02", "p03", "p04", "p05"] },
    { id: "m08", path: "architect", title: "HA, Scale & Enterprise", lessonIds: ["x01", "x02", "x03", "x04", "x05", "x06"] }
  ];

  /* ========== FOUNDATION ========== */
  L("f01", {
    path: "foundation", module: "m01", title: "What Is IBM Db2 LUW?",
    level: "Beginner", duration: "25 min",
    objectives: ["Distinguish LUW from z/OS", "Name editions and use cases", "Map who uses Db2 in enterprises"],
    content: `
<p>IBM <strong>Db2 for Linux, UNIX, and Windows</strong> (Db2 LUW) is IBM’s distributed relational database engine. It shares SQL DNA with Db2 for z/OS, but the process model, storage, and administration tools are built for commodity servers, VMs, and containers—not the mainframe Parallel Sysplex world.</p>
<h2>Why Db2 still matters</h2>
<ul>
  <li><strong>Mission-critical OLTP</strong> — banks, insurers, telecom, government systems still run Db2 for durability and concurrency control.</li>
  <li><strong>Analytics in the same engine</strong> — column-organized tables (BLU Acceleration), compression, and in-memory techniques handle warehouse-style queries without a separate product for many shops.</li>
  <li><strong>Linux-first operations</strong> — RHEL, SLES, and Ubuntu (supported versions) are the default platforms for new LUW deployments.</li>
</ul>
<h2>LUW vs z/OS (quick map)</h2>
<div class="table-wrap"><table>
  <thead><tr><th>Topic</th><th>Db2 LUW</th><th>Db2 for z/OS</th></tr></thead>
  <tbody>
    <tr><td>Runtime</td><td>Instances on Linux/UNIX/Windows</td><td>Subsystem on z/OS</td></tr>
    <tr><td>HA pattern</td><td>HADR, pureScale, Pacemaker</td><td>Data Sharing / Parallel Sysplex</td></tr>
    <tr><td>Storage</td><td>Tablespace containers (files/devices)</td><td>VSAM linear data sets</td></tr>
    <tr><td>Entry point</td><td>Free Community / trial editions</td><td>Mainframe access required</td></tr>
  </tbody>
</table></div>
<div class="callout"><strong>Architect note:</strong> SQL skills transfer. Architecture and day-2 ops do not. This academy focuses entirely on <em>LUW on Linux</em>.</div>
<h2>Editions you will hear about</h2>
<ul>
  <li><strong>Community Edition</strong> — free for learning and small deployments (resource limits apply).</li>
  <li><strong>Standard / Advanced</strong> — production feature sets; Advanced unlocks pureScale, more HADR standbys, advanced compression, and enterprise tooling.</li>
  <li><strong>Warehouse / cloud offerings</strong> — Db2 Warehouse, Db2 on Cloud, and cartridge-style deployments for managed scale-out analytics.</li>
</ul>
<p>Throughout this site you will work conceptually against Db2 11.5 and 12.1 behavior: STMM, adaptive compression, HADR multi-standby, and modern monitoring table functions.</p>
`,
    quiz: {
      q: "Db2 LUW primarily runs on which class of platform?",
      options: ["Mainframe Parallel Sysplex only", "Linux, UNIX, and Windows servers", "Mobile phones only", "Browser WebAssembly only"],
      answer: 1
    }
  });

  L("f02", {
    path: "foundation", module: "m01", title: "Db2 Process & Memory Architecture",
    level: "Beginner", duration: "35 min",
    objectives: ["Explain agents and EDUs", "Describe instance vs database memory", "Relate buffer pools to I/O"],
    content: `
<p>When Db2 is “up,” you are looking at an <strong>instance</strong> (database manager) that hosts one or more <strong>databases</strong>. Work is executed by <strong>engine dispatchable units (EDUs)</strong>—threads that handle listeners, prefetchers, page cleaners, log writers, and especially <strong>agents</strong>.</p>
<h2>Agents</h2>
<p>Each application connection gets a <strong>coordinator agent</strong> (<code>db2agent</code>) that runs SQL on behalf of the client. Idle agents can sit in a pool so new connections avoid expensive create/destroy cycles. Key knobs:</p>
<ul>
  <li><code>MAX_COORDAGENTS</code> — ceiling on coordinator agents</li>
  <li><code>NUM_POOLAGENTS</code> — idle pool sizing (often managed automatically)</li>
</ul>
<h2>Memory layers</h2>
<ol>
  <li><strong>Instance shared memory</strong> — allocated at <code>db2start</code>; monitors and manages activity across databases.</li>
  <li><strong>Database global memory</strong> — buffer pools, lock list, catalog/package caches, utility heap; grows when a database activates.</li>
  <li><strong>Application / agent private memory</strong> — sort heaps, statement heaps, and per-agent working areas.</li>
</ol>
<div class="callout"><strong>Linux tip:</strong> Prefer <code>db2mtrk</code> and monitor table functions (<code>MON_GET_MEMORY_SET</code>, <code>MON_GET_MEMORY_POOL</code>) over raw <code>ipcs</code> for understanding Db2 memory consumption.</div>
<h2>Buffer pools &amp; tablespaces</h2>
<p>A <strong>buffer pool</strong> caches data pages in memory. A <strong>tablespace</strong> is the logical container mapping tables/indexes to physical containers (files or raw devices). Page size (4K/8K/16K/32K) must match between buffer pool and tablespace.</p>
<pre><code>-- Inspect buffer pools
SELECT BPNAME, NPAGES, PAGESIZE FROM SYSCAT.BUFFERPOOLS;

-- Inspect tablespaces
SELECT TBSPACE, TBSPACETYPE, PAGESIZE, BUFFERPOOLID
FROM SYSCAT.TABLESPACES;</code></pre>
`,
    quiz: {
      q: "Buffer pool page size must match which object?",
      options: ["Only the instance name", "The tablespace page size", "The Linux hugepage size exclusively", "The client JDBC driver version"],
      answer: 1
    }
  });

  L("f03", {
    path: "foundation", module: "m01", title: "Linux Prerequisites & Installation",
    level: "Beginner", duration: "40 min",
    objectives: ["Prepare a Linux host", "Run db2prereqcheck", "Install Db2 and verify"],
    content: `
<p>Successful installs fail less often when you treat Linux prep as part of the product. Supported distros (check IBM docs for your exact Fix Pack) typically include recent RHEL/Rocky, SLES, and Ubuntu LTS releases on x86_64.</p>
<h2>Pre-flight checklist</h2>
<ul>
  <li>64-bit OS with enough RAM (8 GB+ for learning; production sizing is workload-driven)</li>
  <li>Required libraries: PAM, AIO, libstdc++, ksh/bash as required by release notes</li>
  <li>Kernel parameters for shared memory / semaphores (Db2 installer can recommend)</li>
  <li>Dedicated filesystem for instance home and database paths</li>
  <li>Non-root install user strategy (instance owner, fenced user, DAS if used)</li>
</ul>
<pre><code># As root, after unpacking the media
./db2prereqcheck -v 11.5.0.0   # version string matches your media

# Typical GUI or response-file install
./db2setup
# or silent:
./db2setup -r /tmp/db2server.rsp</code></pre>
<h2>What the installer creates</h2>
<ul>
  <li>Instance owner OS user (often <code>db2inst1</code>)</li>
  <li>Fenced user for external routines</li>
  <li>Instance directory under <code>~/sqllib</code></li>
  <li>Optionally a sample database</li>
</ul>
<div class="callout warning"><strong>Security:</strong> Never leave default passwords in production. Separate OS authentication policy from application IDs early.</div>
<h2>Verify</h2>
<pre><code>su - db2inst1
db2level
db2start
db2 create db LEARNDB
db2 connect to LEARNDB
db2 "values current date"</code></pre>
<p>If <code>db2start</code> fails, check <code>db2diag.log</code> under the instance diagnostic path—usually the fastest path to root cause.</p>
`,
    quiz: {
      q: "Which command checks OS prerequisites before installing Db2?",
      options: ["db2look", "db2prereqcheck", "REORGCHK", "db2expln"],
      answer: 1
    }
  });

  L("f04", {
    path: "foundation", module: "m01", title: "Instances, Databases & Configuration",
    level: "Beginner", duration: "30 min",
    objectives: ["Create and drop instances", "Create databases", "Read CFG parameters"],
    content: `
<p>An <strong>instance</strong> is the Db2 database manager environment. Multiple instances can coexist on one Linux host (useful for isolating DEV/TEST or different Db2 copies).</p>
<pre><code># Create another instance (root / instance admin)
db2icrt -u db2fenc2 db2inst2

# List instances
db2ilist

# Set environment for an instance
. ~/sqllib/db2profile</code></pre>
<h2>Database creation</h2>
<pre><code>db2 create database SALES
  automatic storage yes
  on /data/db2
  dbpath on /meta/db2
  using codeset UTF-8 territory US
  collate using system
  pagesize 8 K;</code></pre>
<p><strong>Automatic storage</strong> lets Db2 manage container growth across storage paths—preferred for most new designs unless you have strict raw-device requirements.</p>
<h2>Configuration layers</h2>
<ul>
  <li><strong>Database manager CFG</strong> (<code>db2 get dbm cfg</code>) — instance-wide: authentication, agents, diagnostics.</li>
  <li><strong>Database CFG</strong> (<code>db2 get db cfg for SALES</code>) — logging, locking, self-tuning memory, HADR.</li>
  <li><strong>Registry variables</strong> (<code>db2set -all</code>) — special behaviors (e.g., <code>DB2_WORKLOAD=ANALYTICS</code>).</li>
</ul>
<pre><code>-- Update a parameter (many are dynamic)
db2 update db cfg for SALES using LOGFILSIZ 1024
db2 update dbm cfg using DIAGLEVEL 3</code></pre>
<div class="callout"><strong>STMM:</strong> Self Tuning Memory Manager can redistribute memory among buffer pools, lock list, package cache, and sort heap. Learn it, then decide when to pin critical pools manually.</div>
`,
    quiz: {
      q: "Which scope does database manager configuration (DBM CFG) apply to?",
      options: ["A single table", "The entire instance", "Only one buffer pool", "Only HADR standby"],
      answer: 1
    }
  });

  L("f05", {
    path: "foundation", module: "m01", title: "CLP, Clients & Connectivity",
    level: "Beginner", duration: "30 min",
    objectives: ["Use CLP effectively", "Catalog nodes and databases", "Connect from remote clients"],
    content: `
<p>The <strong>Command Line Processor (CLP)</strong> is your daily driver. Interactive mode, scripts, and <code>db2 -tvf</code> batch runs cover most DBA work.</p>
<pre><code>db2
db2 => connect to LEARNDB
db2 => list tables
db2 => quit

# Non-interactive
db2 -tvf setup.sql -z setup.log</code></pre>
<h2>Cataloging for remote access</h2>
<p>Clients do not magically see remote databases. You catalog a <strong>node</strong> (TCP/IP endpoint) and then a <strong>database</strong> on that node.</p>
<pre><code>db2 catalog tcpip node lxdb1 remote 10.0.0.21 server 50000
db2 catalog db LEARNDB as LEARNDB at node lxdb1
db2 terminate
db2 connect to LEARNDB user appuser using '********'</code></pre>
<h2>Communication essentials</h2>
<ul>
  <li>Instance SVCENAME / port (often 50000) must be reachable through firewalls</li>
  <li>SSL/TLS configuration for encrypted clients in production</li>
  <li>JDBC URL shape: <code>jdbc:db2://host:50000/LEARNDB</code></li>
</ul>
<div class="callout lab"><strong>Lab hook:</strong> From a second Linux box (or container), install the Db2 client, catalog your server, and run <code>VALUES CURRENT SERVER</code>.</div>
<h2>Useful discovery commands</h2>
<pre><code>db2 list node directory
db2 list db directory
db2 list applications
db2 get instance</code></pre>
`,
    quiz: {
      q: "Before connecting remotely, you typically catalog which two objects?",
      options: ["Tablespace and buffer pool", "Node and database", "Trigger and sequence", "HADR primary and CF"],
      answer: 1
    }
  });

  L("f06", {
    path: "foundation", module: "m01", title: "Your First Schema & Sample Workload",
    level: "Beginner", duration: "35 min",
    objectives: ["Create schemas and tables", "Load sample rows", "Run basic joins"],
    content: `
<p>We will build a tiny banking fragment used throughout later labs: customers, accounts, and transactions.</p>
<pre><code>CONNECT TO LEARNDB;

CREATE SCHEMA BANK;

CREATE TABLE BANK.CUSTOMER (
  CUST_ID     INTEGER NOT NULL,
  FULL_NAME   VARCHAR(100) NOT NULL,
  CITY        VARCHAR(50),
  CREATED_ON  DATE DEFAULT CURRENT DATE,
  PRIMARY KEY (CUST_ID)
);

CREATE TABLE BANK.ACCOUNT (
  ACCT_ID     INTEGER NOT NULL PRIMARY KEY,
  CUST_ID     INTEGER NOT NULL,
  ACCT_TYPE   CHAR(3) NOT NULL,
  BALANCE     DECIMAL(12,2) NOT NULL,
  CONSTRAINT FK_ACCT_CUST FOREIGN KEY (CUST_ID)
    REFERENCES BANK.CUSTOMER(CUST_ID)
);

CREATE TABLE BANK.TXN (
  TXN_ID      BIGINT NOT NULL PRIMARY KEY,
  ACCT_ID     INTEGER NOT NULL,
  TXN_TS      TIMESTAMP NOT NULL DEFAULT CURRENT TIMESTAMP,
  AMOUNT      DECIMAL(12,2) NOT NULL,
  TXN_CODE    CHAR(3) NOT NULL,
  CONSTRAINT FK_TXN_ACCT FOREIGN KEY (ACCT_ID)
    REFERENCES BANK.ACCOUNT(ACCT_ID)
);

INSERT INTO BANK.CUSTOMER VALUES
  (1,'Asha Rao','Bengaluru',CURRENT DATE),
  (2,'Leo Martins','Lisbon',CURRENT DATE);

INSERT INTO BANK.ACCOUNT VALUES
  (1001,1,'SAV',25000.00),
  (1002,1,'CUR',4200.50),
  (2001,2,'SAV',18000.00);

INSERT INTO BANK.TXN VALUES
  (1,1001,CURRENT TIMESTAMP,500.00,'CR'),
  (2,1001,CURRENT TIMESTAMP,-200.00,'DR');

COMMIT;</code></pre>
<h2>Smoke-test query</h2>
<pre><code>SELECT c.FULL_NAME, a.ACCT_ID, a.BALANCE,
       COALESCE(SUM(t.AMOUNT),0) AS TXN_NET
FROM BANK.CUSTOMER c
JOIN BANK.ACCOUNT a ON a.CUST_ID = c.CUST_ID
LEFT JOIN BANK.TXN t ON t.ACCT_ID = a.ACCT_ID
GROUP BY c.FULL_NAME, a.ACCT_ID, a.BALANCE
ORDER BY 1,2;</code></pre>
<div class="callout"><strong>Discipline:</strong> Always qualify objects with schema names in scripts. Relying on CURRENT SCHEMA causes silent breakage across environments.</div>
`,
    quiz: {
      q: "Why qualify table names with a schema in scripts?",
      options: ["It makes SQL slower", "It avoids CURRENT SCHEMA surprises across environments", "Schemas are required only on z/OS", "Db2 forbids unqualified names"],
      answer: 1
    }
  });

  /* ========== SQL ========== */
  L("s01", {
    path: "sql", module: "m02", title: "SELECT, Filters & Expressions",
    level: "Beginner", duration: "30 min",
    objectives: ["Write selective queries", "Use predicates safely", "Apply expressions and CASE"],
    content: `
<p>Db2 SQL is ANSI-rooted with IBM extensions. Start with projection, selection, and deterministic expressions.</p>
<pre><code>SELECT FULL_NAME, CITY
FROM BANK.CUSTOMER
WHERE CITY = 'Bengaluru'
ORDER BY FULL_NAME;

SELECT ACCT_ID, BALANCE,
       CASE
         WHEN BALANCE >= 20000 THEN 'HIGH'
         WHEN BALANCE >= 5000  THEN 'MID'
         ELSE 'LOW'
       END AS TIER
FROM BANK.ACCOUNT;</code></pre>
<h2>NULL handling</h2>
<p>Use <code>IS NULL</code> / <code>IS NOT NULL</code>. Equality with NULL never matches. Prefer <code>COALESCE</code> and <code>NULLIF</code> for display and math.</p>
<pre><code>SELECT FULL_NAME, COALESCE(CITY, 'UNKNOWN') AS CITY
FROM BANK.CUSTOMER;</code></pre>
<div class="callout warning"><strong>SARGability:</strong> Wrapping columns in functions (e.g., <code>UPPER(CITY) = ...</code>) can disable index use. Prefer storing canonical values or using generated columns / expression indexes where appropriate.</div>
`,
    quiz: {
      q: "Which predicate correctly tests for unknown CITY?",
      options: ["CITY = NULL", "CITY IS NULL", "CITY == NULL", "CITY EQUALS NULL"],
      answer: 1
    }
  });

  L("s02", {
    path: "sql", module: "m02", title: "Joins: INNER, OUTER, LATERAL",
    level: "Beginner", duration: "35 min",
    objectives: ["Choose join types", "Avoid accidental Cartesian products", "Use LATERAL for correlated row generators"],
    content: `
<pre><code>-- Inner join: matching rows only
SELECT c.FULL_NAME, a.ACCT_ID, a.BALANCE
FROM BANK.CUSTOMER c
INNER JOIN BANK.ACCOUNT a ON a.CUST_ID = c.CUST_ID;

-- Left outer: keep customers without accounts
SELECT c.FULL_NAME, a.ACCT_ID
FROM BANK.CUSTOMER c
LEFT OUTER JOIN BANK.ACCOUNT a ON a.CUST_ID = c.CUST_ID;

-- LATERAL example: top transaction per account
SELECT a.ACCT_ID, t.TXN_ID, t.AMOUNT
FROM BANK.ACCOUNT a,
LATERAL (
  SELECT TXN_ID, AMOUNT
  FROM BANK.TXN
  WHERE ACCT_ID = a.ACCT_ID
  ORDER BY TXN_TS DESC
  FETCH FIRST 1 ROW ONLY
) t;</code></pre>
<p>Always write join predicates explicitly. Comma joins without WHERE filters create Cartesian products that melt CPUs.</p>
`,
    quiz: {
      q: "A LEFT OUTER JOIN keeps unmatched rows from which side?",
      options: ["Right table only", "Left table", "Neither", "Only when using UNION"],
      answer: 1
    }
  });

  L("s03", {
    path: "sql", module: "m02", title: "Aggregation, GROUP BY & OLAP",
    level: "Intermediate", duration: "35 min",
    objectives: ["Aggregate correctly", "Filter groups with HAVING", "Use window functions"],
    content: `
<pre><code>SELECT ACCT_TYPE, COUNT(*) AS CNT, SUM(BALANCE) AS TOTAL_BAL
FROM BANK.ACCOUNT
GROUP BY ACCT_TYPE
HAVING SUM(BALANCE) > 10000;

SELECT ACCT_ID, TXN_TS, AMOUNT,
       SUM(AMOUNT) OVER (PARTITION BY ACCT_ID ORDER BY TXN_TS
         ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW) AS RUNNING
FROM BANK.TXN;</code></pre>
<p>Window functions (OLAP) compute rankings, running totals, and moving aggregates without collapsing rows the way GROUP BY does.</p>
<div class="callout"><strong>Performance:</strong> Large sorts for OLAP benefit from adequate sort heap and good indexing on PARTITION/ORDER columns.</div>
`,
    quiz: {
      q: "HAVING filters rows at which stage?",
      options: ["Before JOIN", "After GROUP BY aggregates", "Only on indexed columns", "Only inside triggers"],
      answer: 1
    }
  });

  L("s04", {
    path: "sql", module: "m02", title: "Subqueries, CTEs & Recursion",
    level: "Intermediate", duration: "30 min",
    objectives: ["Rewrite nested logic with CTEs", "Use EXISTS wisely", "Understand recursive CTEs"],
    content: `
<pre><code>WITH rich AS (
  SELECT CUST_ID FROM BANK.ACCOUNT GROUP BY CUST_ID HAVING SUM(BALANCE) > 20000
)
SELECT FULL_NAME FROM BANK.CUSTOMER WHERE CUST_ID IN (SELECT CUST_ID FROM rich);

-- EXISTS for semi-join style checks
SELECT c.FULL_NAME
FROM BANK.CUSTOMER c
WHERE EXISTS (
  SELECT 1 FROM BANK.ACCOUNT a
  WHERE a.CUST_ID = c.CUST_ID AND a.ACCT_TYPE = 'CUR'
);</code></pre>
<p>Recursive CTEs walk hierarchies (org charts, bill-of-materials). Guard recursion depth and watch for cycles in dirty data.</p>
`,
    quiz: {
      q: "CTE stands for:",
      options: ["Catalog Table Entry", "Common Table Expression", "Clustered Tuple Engine", "Compressed Temp Extent"],
      answer: 1
    }
  });

  L("s05", {
    path: "sql", module: "m03", title: "DML, MERGE & Transactions",
    level: "Intermediate", duration: "30 min",
    objectives: ["Use INSERT/UPDATE/DELETE safely", "Apply MERGE", "Control commits and isolation"],
    content: `
<pre><code>UPDATE BANK.ACCOUNT SET BALANCE = BALANCE - 100
WHERE ACCT_ID = 1001;

INSERT INTO BANK.TXN(TXN_ID, ACCT_ID, AMOUNT, TXN_CODE)
VALUES (3, 1001, -100, 'DR');

COMMIT;

MERGE INTO BANK.ACCOUNT a
USING (VALUES (1003, 2, 'CUR', 0.00)) AS n(ACCT_ID, CUST_ID, ACCT_TYPE, BALANCE)
ON a.ACCT_ID = n.ACCT_ID
WHEN MATCHED THEN UPDATE SET BALANCE = a.BALANCE
WHEN NOT MATCHED THEN INSERT VALUES (n.ACCT_ID, n.CUST_ID, n.ACCT_TYPE, n.BALANCE);</code></pre>
<h2>Isolation levels</h2>
<p>Db2 supports UR, CS (default often), RS, and RR. Higher isolation reduces anomalies but increases locking/conflict. Cursor stability is the usual OLTP default; understand uncommitted read only for true read-only reporting paths.</p>
<pre><code>SET CURRENT ISOLATION = CS;</code></pre>
`,
    quiz: {
      q: "After a successful money-move UPDATE + INSERT, you should usually:",
      options: ["Restart the instance", "COMMIT the unit of work", "Drop the tablespace", "Run REORG immediately"],
      answer: 1
    }
  });

  L("s06", {
    path: "sql", module: "m03", title: "DDL: Tables, Constraints, Identity",
    level: "Intermediate", duration: "30 min",
    objectives: ["Design durable DDL", "Use constraints", "Choose identity/sequences"],
    content: `
<pre><code>CREATE TABLE BANK.BRANCH (
  BRANCH_ID INTEGER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  BRANCH_CODE CHAR(4) NOT NULL UNIQUE,
  CITY VARCHAR(50) NOT NULL,
  OPEN_DATE DATE NOT NULL
);

ALTER TABLE BANK.ACCOUNT
  ADD CONSTRAINT CK_BAL_NONNEG CHECK (BALANCE >= 0);</code></pre>
<p>Prefer declarative constraints over application-only validation. They protect every client path—including ad-hoc SQL.</p>
<div class="callout"><strong>Online change:</strong> Many ALTER operations are online, but some still require careful maintenance windows. Test DDL on a clone before production.</div>
`,
    quiz: {
      q: "A CHECK constraint is enforced by:",
      options: ["The Linux kernel", "The Db2 engine for all DML paths", "Only JDBC drivers", "Only HADR standbys"],
      answer: 1
    }
  });

  L("s07", {
    path: "sql", module: "m03", title: "Views, Routines & Triggers",
    level: "Intermediate", duration: "35 min",
    objectives: ["Create views", "Write SQL PL procedures", "Use triggers carefully"],
    content: `
<pre><code>CREATE VIEW BANK.V_CUST_BAL AS
SELECT c.CUST_ID, c.FULL_NAME, SUM(a.BALANCE) AS TOTAL_BAL
FROM BANK.CUSTOMER c
JOIN BANK.ACCOUNT a ON a.CUST_ID = c.CUST_ID
GROUP BY c.CUST_ID, c.FULL_NAME;

CREATE OR REPLACE PROCEDURE BANK.APPLY_FEE(IN p_acct INTEGER, IN p_fee DECIMAL(12,2))
LANGUAGE SQL
BEGIN
  UPDATE BANK.ACCOUNT SET BALANCE = BALANCE - p_fee WHERE ACCT_ID = p_acct;
  INSERT INTO BANK.TXN(TXN_ID, ACCT_ID, AMOUNT, TXN_CODE)
  VALUES (NEXT VALUE FOR BANK.TXN_SEQ, p_acct, -p_fee, 'FEE');
END;</code></pre>
<p>Triggers are powerful and dangerous: hidden logic, mutating-table pitfalls, and performance cliffs. Prefer explicit procedures for business workflows when you can.</p>
`,
    quiz: {
      q: "A common risk of heavy trigger use is:",
      options: ["Faster EXPLAIN only", "Hidden side effects and harder performance diagnosis", "Automatic HADR setup", "Free pureScale licenses"],
      answer: 1
    }
  });

  /* ========== DESIGN ========== */
  L("d01", {
    path: "design", module: "m04", title: "Logical Design for Db2",
    level: "Intermediate", duration: "25 min",
    objectives: ["Normalize thoughtfully", "Model keys and relationships", "Plan for growth"],
    content: `
<p>Logical design still starts with entities, keys, and relationships. On Db2 LUW, you then map that model onto page sizes, tablespaces, and indexing strategies.</p>
<ul>
  <li>3NF for OLTP cores; controlled denormalization for hot read paths</li>
  <li>Stable surrogate keys vs natural keys (and uniqueness on both when needed)</li>
  <li>Temporal tables when you must answer “what was true on date X?”</li>
  <li>Soft-delete vs hard-delete policies aligned with retention law</li>
</ul>
<div class="callout"><strong>Architect rule:</strong> Design for the query patterns you will actually run, not only for ER purity.</div>
`
  });

  L("d02", {
    path: "design", module: "m04", title: "Tablespaces & Buffer Pools",
    level: "Intermediate", duration: "40 min",
    objectives: ["Choose SMS/DMS/automatic storage", "Size buffer pools", "Separate data/index/temp"],
    content: `
<p>Modern default: <strong>automatic storage</strong> databases with dedicated buffer pools for large hot tables or different page sizes.</p>
<pre><code>CREATE BUFFERPOOL BP8K SIZE 10000 PAGESIZE 8 K;
CREATE LARGE TABLESPACE TS_BANK_DATA
  PAGESIZE 8 K MANAGED BY AUTOMATIC STORAGE
  BUFFERPOOL BP8K
  AUTORESIZE YES;</code></pre>
<ul>
  <li>Keep TEMP tablespaces sized for sorts/hash joins under peak load</li>
  <li>Separate LOB/XML storage when large objects dominate I/O</li>
  <li>Align filesystem mount options and IO scheduler with vendor guidance</li>
</ul>
<div class="callout warning"><strong>Page size lock-in:</strong> You cannot casually change a tablespace page size. Choose with row width and prefetch patterns in mind.</div>
`,
    quiz: {
      q: "Automatic storage tablespaces grow by:",
      options: ["Editing /etc/passwd", "Db2 extending containers on storage paths", "Manual SMS file copies only", "Dropping the instance"],
      answer: 1
    }
  });

  L("d03", {
    path: "design", module: "m04", title: "Index Design & Access Paths",
    level: "Intermediate", duration: "40 min",
    objectives: ["Design B-tree indexes", "Understand clustering", "Avoid over-indexing"],
    content: `
<pre><code>CREATE INDEX BANK.IX_TXN_ACCT_TS
  ON BANK.TXN (ACCT_ID, TXN_TS)
  ALLOW REVERSE SCANS
  COLLECT STATISTICS;</code></pre>
<ul>
  <li>Leading columns should match equality predicates and join keys</li>
  <li>Include columns carefully—every index slows INSERT/UPDATE/DELETE</li>
  <li>Clustering indexes help range scans on row-organized tables</li>
  <li>Column-organized (BLU) tables rely less on classical secondary indexes for analytics</li>
</ul>
<p>Use EXPLAIN (later module) to verify the optimizer picks your indexes—don’t guess.</p>
`,
    quiz: {
      q: "Over-indexing mainly hurts which operations?",
      options: ["Only CONNECT", "INSERT/UPDATE/DELETE maintenance cost", "db2start only", "Cataloging nodes"],
      answer: 1
    }
  });

  L("d04", {
    path: "design", module: "m04", title: "Table Partitioning & MDC/ITC",
    level: "Advanced", duration: "35 min",
    objectives: ["Apply range partitioning", "Know MDC/ITC use cases", "Plan roll-in/roll-out"],
    content: `
<p><strong>Range partitioning</strong> (data partitions) splits a table by key ranges—ideal for date-based retention and partition elimination.</p>
<pre><code>CREATE TABLE BANK.TXN_HIST (
  TXN_ID BIGINT NOT NULL,
  ACCT_ID INTEGER NOT NULL,
  TXN_TS TIMESTAMP NOT NULL,
  AMOUNT DECIMAL(12,2) NOT NULL
) PARTITION BY RANGE (TXN_TS) (
  PARTITION Q1_2026 STARTING('2026-01-01') ENDING('2026-04-01') EXCLUSIVE,
  PARTITION Q2_2026 STARTING('2026-04-01') ENDING('2026-07-01') EXCLUSIVE
);</code></pre>
<p><strong>MDC</strong> (multi-dimensional clustering) and <strong>ITC</strong> organize data by block indexes for warehouse-style filters. Pair with REORG RECLAIM EXTENTS for space reuse.</p>
`
  });

  L("d05", {
    path: "design", module: "m04", title: "Compression & Column-Organized Tables",
    level: "Advanced", duration: "35 min",
    objectives: ["Enable adaptive compression", "Create ORGANIZE BY COLUMN tables", "Know BLU operational differences"],
    content: `
<pre><code>-- Row-organized adaptive compression
CREATE TABLE BANK.TXN_COMP (
  TXN_ID BIGINT NOT NULL PRIMARY KEY,
  PAYLOAD VARCHAR(200)
) COMPRESS YES ADAPTIVE;

-- Column-organized analytic table
CREATE TABLE BANK.FACT_SALES (
  DAY_ID DATE,
  REGION VARCHAR(20),
  REVENUE DECIMAL(18,2)
) ORGANIZE BY COLUMN;</code></pre>
<p>BLU Acceleration stores each column separately with frequency-based dictionaries, vector processing, and prefetch tuned for analytics. Coexist with OLTP row tables in the same database.</p>
<div class="callout"><strong>Ops tip:</strong> For columnar tables, prefer <code>REORG TABLE ... RECLAIM EXTENTS</code> over classical full REORG; keep RUNSTATS current including indexes.</div>
`,
    quiz: {
      q: "Column-organized tables are primarily optimized for:",
      options: ["Single-row OLTP lookups only", "Analytic scans/aggregates over subsets of columns", "HADR takeover speed only", "Installing Db2"],
      answer: 1
    }
  });

  /* ========== SECURITY ========== */
  L("sec01", {
    path: "security", module: "m05", title: "Authentication Models",
    level: "Intermediate", duration: "25 min",
    objectives: ["Configure AUTHENTICATION", "Use OS/LDAP/Kerberos patterns", "Separate instance and data access"],
    content: `
<p>Authentication answers “who are you?” Authorization answers “what may you do?” Keep them mentally separate when designing Linux estates.</p>
<pre><code>db2 get dbm cfg | grep -i auth
-- Common values: SERVER, SERVER_ENCRYPT, CLIENT, KERBEROS, GSSPLUGIN</code></pre>
<ul>
  <li><strong>SERVER / SERVER_ENCRYPT</strong> — credentials validated on the Db2 server (encrypt preferred).</li>
  <li><strong>CLIENT</strong> — trust the client OS identity (rarely appropriate across untrusted networks).</li>
  <li><strong>KERBEROS / plugins</strong> — enterprise SSO and custom directory integration.</li>
</ul>
<p>Production Linux estates often use OS users or LDAP with encrypted server authentication. Map groups carefully; document break-glass IDs.</p>
<div class="callout warning"><strong>Never</strong> run applications as <code>db2inst1</code>. Grant least privilege to dedicated IDs.</div>
`
  });

  L("sec02", {
    path: "security", module: "m05", title: "Authorities, Privileges & Roles",
    level: "Intermediate", duration: "35 min",
    objectives: ["Explain DBADM vs SECADM", "Grant privileges", "Use roles"],
    content: `
<p>Db2 separates powerful authorities: <strong>SYSADM</strong>, <strong>DBADM</strong>, <strong>SECADM</strong>, <strong>SQLADM</strong>, <strong>DATAACCESS</strong>, <strong>ACCESSCTRL</strong>, and more. SECADM manages security objects without needing raw data access in well-designed setups.</p>
<pre><code>GRANT ROLE BANK_APP TO USER appuser;
GRANT SELECT, INSERT ON BANK.TXN TO ROLE BANK_APP;
GRANT DBADM ON DATABASE TO USER dba_ops;</code></pre>
<p>Prefer roles for application packs; grant roles to users/groups. Audit grants regularly.</p>
`,
    quiz: {
      q: "Which authority is primarily focused on security administration?",
      options: ["SECADM", "LOAD", "BINDADD", "CREATETAB"],
      answer: 0
    }
  });

  L("sec03", {
    path: "security", module: "m05", title: "RCAC, LBAC & Trusted Contexts",
    level: "Advanced", duration: "40 min",
    objectives: ["Apply row/column access control", "Know LBAC labels", "Use trusted contexts for middle tiers"],
    content: `
<p><strong>RCAC</strong> (row and column access control) defines permissions and masks so the same SQL returns different row/column visibility per user—ideal for multi-tenant and privacy rules.</p>
<p><strong>LBAC</strong> attaches security labels to rows/columns for mandatory access control in highly classified environments.</p>
<p><strong>Trusted contexts</strong> let an application server connect once and switch end-user identity securely—critical for three-tier apps that would otherwise share one DB user.</p>
<pre><code>-- Conceptual trusted context
CREATE TRUSTED CONTEXT ctx_app
  BASED UPON CONNECTION USING SYSTEM AUTHID appserver
  ATTRIBUTES (ADDRESS '10.0.10.5')
  DEFAULT ROLE BANK_APP
  ENABLE;</code></pre>
`
  });

  L("sec04", {
    path: "security", module: "m05", title: "Audit Facility & Hardening",
    level: "Advanced", duration: "30 min",
    objectives: ["Configure audit policies", "Harden instance hosts", "Plan secret rotation"],
    content: `
<pre><code>CREATE AUDIT POLICY P_DDL CATEGORIES DDL STATUS BOTH ERROR TYPE NORMAL;
AUDIT DATABASE USING P_DDL;</code></pre>
<ul>
  <li>Ship audit archives off-box</li>
  <li>Restrict OS group membership for SYSADM paths</li>
  <li>Encrypt data in transit (SSL) and at rest (native encryption / filesystem)</li>
  <li>Rotate passwords and keystores with change control</li>
</ul>
`
  });

  /* ========== ADMIN ========== */
  L("a01", {
    path: "admin", module: "m06", title: "Transaction Logging Deep Dive",
    level: "Intermediate", duration: "35 min",
    objectives: ["Configure log files", "Choose circular vs archive logging", "Size for RPO"],
    content: `
<p>Every change is written to transaction logs before data pages are hardened. Key parameters: <code>LOGFILSIZ</code>, <code>LOGPRIMARY</code>, <code>LOGSECOND</code>, <code>NEWLOGPATH</code>, and log archiving settings.</p>
<pre><code>db2 update db cfg for LEARNDB using LOGFILSIZ 1024 LOGPRIMARY 20 LOGSECOND 40
db2 update db cfg for LEARNDB using LOGARCHMETH1 DISK:/archive/db2</code></pre>
<div class="callout"><strong>Rule of thumb:</strong> Size primary logs for normal workload; keep secondary as emergency headroom. Smaller files archive more often (better RPO); larger files mean cleaner directories but coarser archive intervals.</div>
<p>Circular logging cannot support rollforward to a point in time—archive logging is mandatory for serious recovery.</p>
`,
    quiz: {
      q: "Point-in-time rollforward requires:",
      options: ["Circular logging only", "Archive logging", "No logs at all", "pureScale CF only"],
      answer: 1
    }
  });

  L("a02", {
    path: "admin", module: "m06", title: "Backup, Restore & Rollforward",
    level: "Intermediate", duration: "45 min",
    objectives: ["Run online/offline backups", "Restore safely", "Rollforward to PIT"],
    content: `
<pre><code>-- Online backup (archive logging required)
db2 backup db LEARNDB online to /backup/db2 compress include logs

-- Restore + rollforward
db2 restore db LEARNDB from /backup/db2 taken at 20260731120000
db2 rollforward db LEARNDB to end of logs and stop
-- or: to ISO timestamp for PIT recovery</code></pre>
<ul>
  <li>Test restores on a different host—backups that never restore are fiction</li>
  <li>Include tablespace-level strategies for very large DBs</li>
  <li>Track backup history with <code>LIST HISTORY</code></li>
</ul>
`,
    quiz: {
      q: "Online database backup generally requires:",
      options: ["Archive logging enabled", "Dropping all indexes", "Single-user Windows only", "Disabling buffer pools"],
      answer: 0
    }
  });

  L("a03", {
    path: "admin", module: "m06", title: "Monitoring with Table Functions",
    level: "Intermediate", duration: "35 min",
    objectives: ["Use MON_GET_* views", "Read db2diag.log", "Find blockers"],
    content: `
<pre><code>SELECT APPLICATION_HANDLE, APPL_NAME, TOTAL_CPU_TIME
FROM TABLE(MON_GET_CONNECTION(NULL,-2)) AS t
ORDER BY TOTAL_CPU_TIME DESC FETCH FIRST 10 ROWS ONLY;

SELECT LOCK_NAME, LOCK_MODE, LOCK_STATUS, HLD_MEMBER
FROM TABLE(MON_GET_LOCKS(NULL,-2)) AS l
FETCH FIRST 20 ROWS ONLY;</code></pre>
<p>Also master: <code>db2pd</code>, <code>db2top</code>/<code>dsmtop</code>, and <code>db2diag -A</code> for diagnostics. Prefer table functions over legacy snapshots for new scripts.</p>
`
  });

  L("a04", {
    path: "admin", module: "m06", title: "RUNSTATS, REORG & Maintenance",
    level: "Intermediate", duration: "35 min",
    objectives: ["Keep statistics fresh", "Choose REORG modes", "Enable automatic maintenance wisely"],
    content: `
<pre><code>RUNSTATS ON TABLE BANK.TXN WITH DISTRIBUTION AND DETAILED INDEXES ALL;

REORGCHK CURRENT STATISTICS ON TABLE BANK.TXN;
REORG TABLE BANK.TXN INPLACE ALLOW WRITE ACCESS;
REORG TABLE BANK.FACT_SALES RECLAIM EXTENTS;</code></pre>
<p>Automatic maintenance can schedule backups, RUNSTATS, and REORG—but validate windows against SLAs. Columnar tables: reclaim extents; avoid assuming classic REORG behavior.</p>
`
  });

  L("a05", {
    path: "admin", module: "m06", title: "Data Movement: LOAD, IMPORT, EXPORT, Ingest",
    level: "Intermediate", duration: "30 min",
    objectives: ["Choose LOAD vs IMPORT", "Use EXPORT", "Know INGEST for continuous feeds"],
    content: `
<pre><code>EXPORT TO /tmp/cust.del OF DEL SELECT * FROM BANK.CUSTOMER;
IMPORT FROM /tmp/cust.del OF DEL INSERT INTO BANK.CUSTOMER;
LOAD FROM /tmp/txn.del OF DEL REPLACE INTO BANK.TXN NONRECOVERABLE;</code></pre>
<p><strong>LOAD</strong> is bulk-fast and minimally logged (with caveats for recoverability). <strong>IMPORT</strong> fires triggers and is fully logged. <strong>INGEST</strong> streams continuous data with restartability.</p>
<div class="callout warning"><strong>Recoverability:</strong> Nonrecoverable LOAD requires a subsequent backup strategy before you can rollforward through that point cleanly.</div>
`
  });

  /* ========== PERFORMANCE ========== */
  L("p01", {
    path: "performance", module: "m07", title: "Optimizer Fundamentals & EXPLAIN",
    level: "Advanced", duration: "40 min",
    objectives: ["Capture access plans", "Read operators", "Feed the optimizer with stats"],
    content: `
<pre><code>EXPLAIN PLAN SET QUERYNO = 100 FOR
SELECT c.FULL_NAME, SUM(a.BALANCE)
FROM BANK.CUSTOMER c
JOIN BANK.ACCOUNT a ON a.CUST_ID = c.CUST_ID
GROUP BY c.FULL_NAME;

SELECT * FROM EXPLAIN_OPERATOR WHERE EXPLAIN_TIME =
  (SELECT MAX(EXPLAIN_TIME) FROM EXPLAIN_OPERATOR);</code></pre>
<p>Also use <code>db2expln</code> and visual explain tools. Look for unexpected table scans, underestimated cardinalities, and sorts spilling to temp.</p>
`,
    quiz: {
      q: "The optimizer’s quality heavily depends on:",
      options: ["Fresh RUNSTATS / distribution stats", "Wallpaper color on the server", "Only the instance name", "Disabling all indexes"],
      answer: 0
    }
  });

  L("p02", {
    path: "performance", module: "m07", title: "Memory, I/O & Sort Spills",
    level: "Advanced", duration: "35 min",
    objectives: ["Tune buffer pools", "Detect sort spills", "Balance STMM vs manual"],
    content: `
<ul>
  <li>Hit ratios and physical reads via <code>MON_GET_BUFFERPOOL</code></li>
  <li>Sort heap overflows → increase sort memory or reduce sort demand with indexes</li>
  <li>Prefetchers and page cleaners for write-heavy systems</li>
  <li>Filesystem cache interaction—don’t double-count RAM mentally</li>
</ul>
<pre><code>SELECT BP_NAME, POOL_DATA_L_READS, POOL_DATA_P_READS
FROM TABLE(MON_GET_BUFFERPOOL(NULL,-2));</code></pre>
`
  });

  L("p03", {
    path: "performance", module: "m07", title: "Application & SQL Performance Patterns",
    level: "Advanced", duration: "30 min",
    objectives: ["Avoid chatty SQL", "Use sets not loops", "Bind/package awareness"],
    content: `
<ul>
  <li>Batch writes; avoid per-row commits in tight loops</li>
  <li>Parameter markers for plan reuse</li>
  <li>Eliminate SELECT * in hot paths</li>
  <li>Watch lock waits: short transactions, proper indexes, consistent lock order</li>
</ul>
<div class="callout"><strong>Classic fix:</strong> A missing index on a FK join column often outperforms days of memory tuning.</div>
`
  });

  L("p04", {
    path: "performance", module: "m07", title: "Workload Manager (WLM)",
    level: "Advanced", duration: "35 min",
    objectives: ["Define service classes", "Throttle runaway queries", "Protect OLTP from analytics"],
    content: `
<p>WLM assigns work to service classes with thresholds (CPU, rows read, temp space, concurrency). Use it so a warehouse scan cannot starve payment posting.</p>
<pre><code>-- Conceptual: create service superclass/subclass and threshold
CREATE SERVICE CLASS SC_ANALYTICS UNDER SYSDEFAULTSUBCLASS;
-- Then create workload definitions matching app IDs / users</code></pre>
<p>Db2 12.x evolves adaptive workload management—validate features for your exact version.</p>
`
  });

  L("p05", {
    path: "performance", module: "m07", title: "Problem Determination Playbook",
    level: "Advanced", duration: "30 min",
    objectives: ["Triage latency vs errors", "Capture evidence", "Escalate with data"],
    content: `
<ol>
  <li>Is it host (CPU/IO/mem/net) or Db2?</li>
  <li><code>LIST APPLICATIONS SHOW DETAIL</code> / MON_GET_CONNECTION for blockers</li>
  <li>db2diag around the incident timestamp</li>
  <li>EXPLAIN the top SQL; check stats age</li>
  <li>Recent changes: CFG, indexes dropped, stats, app release</li>
</ol>
<p>Architects institutionalize this playbook with runbooks and on-call packets.</p>
`
  });

  /* ========== ARCHITECT ========== */
  L("x01", {
    path: "architect", module: "m08", title: "HADR Architecture & Operations",
    level: "Expert", duration: "50 min",
    objectives: ["Design HADR topologies", "Choose sync modes", "Perform takeover"],
    content: `
<p><strong>HADR</strong> ships logs from a primary to one or more standbys for near-realtime HA/DR. Sync modes trade latency for durability: SYNC, NEARSYNC, ASYNC, SUPERASYNC.</p>
<pre><code>-- After restoring standby from primary backup, set HADR CFG on both, then:
db2 start hadr on db LEARNDB as standby
db2 start hadr on db LEARNDB as primary

db2 takeover hadr on db LEARNDB
-- Forced takeover when primary is gone:
db2 takeover hadr on db LEARNDB by force</code></pre>
<ul>
  <li>Mutual <code>HADR_TARGET_LIST</code> for multi-standby</li>
  <li>Monitor with <code>MON_GET_HADR</code> / <code>db2pd -hadr</code></li>
  <li>Pair with cluster managers (Pacemaker) for automated failover where required</li>
</ul>
<div class="callout warning"><strong>Split brain:</strong> Forced takeover without fencing the old primary risks dual writers. Automate STONITH carefully.</div>
`,
    quiz: {
      q: "Which HADR mode generally waits for log write on standby before commit returns?",
      options: ["SUPERASYNC", "SYNC", "Circular logging", "LOAD NONRECOVERABLE"],
      answer: 1
    }
  });

  L("x02", {
    path: "architect", module: "m08", title: "Db2 pureScale for Continuous Availability",
    level: "Expert", duration: "45 min",
    objectives: ["Explain CF and members", "Plan topology", "Combine with HADR for DR"],
    content: `
<p><strong>pureScale</strong> provides active-active scale-out members sharing data via a <strong>Cluster Caching Facility (CF)</strong>—optimized for continuous availability and horizontal growth of OLTP connections.</p>
<ul>
  <li>Members run SQL; CF coordinates locking/caching globally</li>
  <li>Member failure should be transparent to well-written apps (retry logic still required)</li>
  <li>HADR can protect a pureScale cluster for disaster recovery (preferred replay member concepts apply)</li>
</ul>
<div class="callout"><strong>Architect choice:</strong> HADR alone = primary/standby HA+DR. pureScale = multi-member continuous availability. Many enterprises use both.</div>
`
  });

  L("x03", {
    path: "architect", module: "m08", title: "DPF & Warehouse Scale-Out",
    level: "Expert", duration: "40 min",
    objectives: ["Design hash partitioning", "Plan distribution keys", "Balance ETL vs query"],
    content: `
<p>The <strong>Database Partitioning Feature (DPF)</strong> / partitioned database environments distribute table rows across database partitions (often co-located on multiple hosts) for warehouse scale.</p>
<ul>
  <li>Distribution key choice dominates join performance (collocation)</li>
  <li>Avoid skew—hot keys crush a single partition</li>
  <li>Coordinate backup/restore and rolling maintenance across partitions</li>
</ul>
<p>For many analytic greenfield projects, columnar + sufficient hardware or warehouse appliances may be preferred over classical DPF—evaluate honestly against data volume and concurrency.</p>
`
  });

  L("x04", {
    path: "architect", module: "m08", title: "Federation, Replication & Integration",
    level: "Expert", duration: "35 min",
    objectives: ["Federate remote sources", "Compare Q Rep / SQL Rep / CDC", "Design integration boundaries"],
    content: `
<p>Federation nicknames let Db2 query remote databases as local tables (with pushdown considerations). Replication (Q Replication, SQL Replication, CDC tools) keeps systems aligned asynchronously.</p>
<ul>
  <li>Don’t federate chatty OLTP across WAN without caching strategy</li>
  <li>Use replication for loosely coupled domains; dual-write only with extreme care</li>
  <li>Document conflict resolution and lag SLOs</li>
</ul>
`
  });

  L("x05", {
    path: "architect", module: "m08", title: "Cloud, Containers & Hybrid Patterns",
    level: "Expert", duration: "35 min",
    objectives: ["Map Db2 to cloud IaaS/PaaS", "Think stateful containers", "Hybrid HADR patterns"],
    content: `
<ul>
  <li>Db2 on Cloud / managed warehouse vs self-managed on VMs</li>
  <li>Containers need persistent volumes, anti-affinity, and backup integration</li>
  <li>Hybrid: on-prem primary with cloud HADR standby (latency &amp; compliance caveats)</li>
  <li>Infrastructure as code for instances, CFG, and grants</li>
</ul>
<div class="callout"><strong>Stateful truth:</strong> Treat databases as cattle <em>images</em> but pets for <em>data</em>. Automate everything except pretending data is ephemeral.</div>
`
  });

  L("x06", {
    path: "architect", module: "m08", title: "Enterprise Architecture & Capacity Planning",
    level: "Expert", duration: "40 min",
    objectives: ["Size CPU/RAM/IO", "Define NFRs", "Build reference architectures"],
    content: `
<h2>Non-functional requirements checklist</h2>
<ul>
  <li>RPO / RTO targets → logging, HADR mode, backup frequency</li>
  <li>Peak TPS and concurrency → agents, locking, connection pools</li>
  <li>Data growth &amp; retention → partitioning, compression, archive tiers</li>
  <li>Security &amp; residency → encryption, RCAC, audit, key custody</li>
  <li>Operability → monitoring, runbooks, chaos/failover drills</li>
</ul>
<h2>Reference topologies</h2>
<ol>
  <li><strong>SMB OLTP:</strong> single primary + async HADR + daily online backup</li>
  <li><strong>Regulated OLTP:</strong> sync/nearsync HADR + Pacemaker + quarterly restore tests</li>
  <li><strong>Global continuous:</strong> pureScale + HADR DR site + WLM + RCAC</li>
  <li><strong>Analytics:</strong> columnar cores, dedicated service class, ETL window isolation</li>
</ol>
<p>You now have an end-to-end path from Linux install to architecture decisions—without leaving Ashovix Labs.</p>
`,
    quiz: {
      q: "RPO most directly influences which design choices?",
      options: ["GUI theme", "Log archiving frequency and HADR sync mode", "Table font size", "Whether you use SELECT *"],
      answer: 1
    }
  });

  /* Labs */
  C.labs = [
    { id: "lab1", title: "Install & create LEARNDB", path: "foundation", lesson: "f03", steps: "Run prereqcheck, install, db2start, create LEARNDB, connect, VALUES CURRENT DATE." },
    { id: "lab2", title: "Build BANK schema", path: "foundation", lesson: "f06", steps: "Create CUSTOMER/ACCOUNT/TXN, insert seed data, run the smoke-test join." },
    { id: "lab3", title: "Catalog a remote client", path: "foundation", lesson: "f05", steps: "From a second host, catalog node+db and query CURRENT SERVER." },
    { id: "lab4", title: "Index & EXPLAIN challenge", path: "performance", lesson: "p01", steps: "Write a slow join, capture EXPLAIN, add an index, re-EXPLAIN, compare operators." },
    { id: "lab5", title: "Online backup drill", path: "admin", lesson: "a02", steps: "Enable archive logging, online backup, restore to a new name, rollforward." },
    { id: "lab6", title: "RCAC mask demo", path: "security", lesson: "sec03", steps: "Create a column mask on BALANCE for non-privileged users; prove visibility difference." },
    { id: "lab7", title: "HADR pair on two VMs", path: "architect", lesson: "x01", steps: "Configure primary/standby, start HADR, run takeover and failback." },
    { id: "lab8", title: "Columnar fact table", path: "design", lesson: "d05", steps: "Create ORGANIZE BY COLUMN table, LOAD sample data, aggregate query, RECLAIM EXTENTS." },
    { id: "lab9", title: "WLM guardrail", path: "performance", lesson: "p04", steps: "Create a workload for analytics users with a rows-read threshold." },
    { id: "lab10", title: "REORG vs RUNSTATS day", path: "admin", lesson: "a04", steps: "Generate churn, RUNSTATS, REORGCHK, INPLACE REORG, measure query time." },
    { id: "lab11", title: "Monitoring pack", path: "admin", lesson: "a03", steps: "Script MON_GET_CONNECTION, LOCKS, BUFFERPOOL into a daily health report." },
    { id: "lab12", title: "Architecture decision record", path: "architect", lesson: "x06", steps: "Write an ADR choosing HADR vs pureScale for a fictional payments platform with given NFRs." }
  ];

  C.reference = {
    commands: [
      { cmd: "db2start / db2stop", use: "Start or stop the instance" },
      { cmd: "db2 create db …", use: "Create a database" },
      { cmd: "db2 connect to DB", use: "Connect CLP session" },
      { cmd: "db2 get db/dbm cfg", use: "Show configuration" },
      { cmd: "db2 update db cfg …", use: "Change database parameters" },
      { cmd: "db2 backup / restore / rollforward", use: "Recovery chain" },
      { cmd: "db2pd -db DB -hadr", use: "HADR status" },
      { cmd: "db2diag -A", use: "Archive/rotate diag log view" },
      { cmd: "RUNSTATS / REORG / REORGCHK", use: "Physical maintenance" },
      { cmd: "db2expln / EXPLAIN", use: "Access plans" },
      { cmd: "db2look -d DB -e", use: "Extract DDL" },
      { cmd: "db2move", use: "Move many tables" }
    ],
    monFunctions: [
      "MON_GET_CONNECTION", "MON_GET_ACTIVITY", "MON_GET_LOCKS", "MON_GET_BUFFERPOOL",
      "MON_GET_TABLE", "MON_GET_INDEX", "MON_GET_HADR", "MON_GET_MEMORY_POOL", "MON_GET_PKG_CACHE_STMT"
    ],
    catalogViews: [
      "SYSCAT.TABLES", "SYSCAT.COLUMNS", "SYSCAT.INDEXES", "SYSCAT.TABLESPACES",
      "SYSCAT.BUFFERPOOLS", "SYSCAT.REFERENCES", "SYSIBMADM.DBCFG", "SYSIBMADM.DBMCFG"
    ]
  };

  C.cert = {
    intro: "Map your Ashovix Labs progress to common IBM Db2 LUW certification themes (exam numbers change over time—verify on IBM Training).",
    tracks: [
      { name: "Foundations", topics: ["SQL", "objects", "basic admin", "security basics"], lessons: ["f01", "f02", "s01", "s05", "s06", "sec01"] },
      { name: "Administration", topics: ["backup/recovery", "monitoring", "maintenance", "config"], lessons: ["a01", "a02", "a03", "a04", "a05", "f04"] },
      { name: "Advanced design & apps", topics: ["tablespaces", "partitioning", "advanced SQL", "routines"], lessons: ["d02", "d03", "d04", "s03", "s07"] },
      { name: "Advanced DBA / Architect", topics: ["HADR", "performance", "WLM", "pureScale concepts"], lessons: ["x01", "x02", "p01", "p04", "x06"] }
    ]
  };

  C.orderedLessonIds = C.modules.flatMap(m => m.lessonIds);
})(window.DB2FORGE);

/* Register Db2 as an Ashovix Labs course */
(function () {
  const D = window.DB2FORGE;
  window.FORGE.register({
    id: "db2",
    order: 4,
    title: "IBM Db2 LUW",
    shortTitle: "Db2",
    tagline: "Linux · UNIX · Windows — beginner to enterprise architect",
    level: "Beginner → Architect",
    accent: "#3fd0b6",
    description: "Complete IBM Db2 for Linux (LUW): install, SQL, storage, security, backup, performance, HADR, pureScale.",
    audience: "DBAs, developers, architects",
    featureFlag: "Yes",
    paths: D.paths,
    modules: D.modules,
    lessons: D.lessons,
    labs: D.labs,
    reference: D.reference,
    cert: D.cert
  });
})();
