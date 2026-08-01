/* Ashovix Labs — Notes / Quick Ref command syntax sheets */
(function () {
  const F = window.FORGE;
  if (!F) return;

  function sheet(title, intro, commands) {
    return { title, intro, commands };
  }

  const REFS = {
    sql: sheet(
      "SQL Quick Reference",
      "Portable SQL syntax used across SQLite, PostgreSQL, and MySQL (dialect notes in lessons).",
      [
        { cmd: "CREATE DATABASE", syntax: "CREATE DATABASE name;", use: "Create a database (server engines)" },
        { cmd: "CREATE TABLE", syntax: "CREATE TABLE name (\n  col TYPE constraints,\n  ...\n);", use: "Define a table" },
        { cmd: "ALTER TABLE", syntax: "ALTER TABLE name ADD COLUMN col TYPE;", use: "Change table structure" },
        { cmd: "DROP TABLE", syntax: "DROP TABLE IF EXISTS name;", use: "Remove a table" },
        { cmd: "INSERT", syntax: "INSERT INTO table (c1, c2) VALUES (v1, v2);", use: "Add rows" },
        { cmd: "UPDATE", syntax: "UPDATE table SET c1 = v1 WHERE condition;", use: "Change rows" },
        { cmd: "DELETE", syntax: "DELETE FROM table WHERE condition;", use: "Remove rows" },
        { cmd: "SELECT", syntax: "SELECT cols\nFROM table\nWHERE condition\nORDER BY col;", use: "Read data" },
        { cmd: "WHERE", syntax: "WHERE col = value\n  AND col2 LIKE 'A%'\n  OR col3 IN (1,2,3);", use: "Filter rows" },
        { cmd: "ORDER BY", syntax: "ORDER BY col ASC|DESC, col2;", use: "Sort results" },
        { cmd: "GROUP BY", syntax: "SELECT col, COUNT(*)\nFROM t\nGROUP BY col;", use: "Aggregate groups" },
        { cmd: "HAVING", syntax: "GROUP BY col\nHAVING COUNT(*) > 1;", use: "Filter groups" },
        { cmd: "INNER JOIN", syntax: "SELECT ...\nFROM a\nINNER JOIN b ON a.id = b.a_id;", use: "Matching rows only" },
        { cmd: "LEFT JOIN", syntax: "SELECT ...\nFROM a\nLEFT JOIN b ON a.id = b.a_id;", use: "All left rows + matches" },
        { cmd: "Subquery", syntax: "SELECT *\nFROM t\nWHERE col > (SELECT AVG(col) FROM t);", use: "Nested query" },
        { cmd: "CREATE VIEW", syntax: "CREATE VIEW v AS\nSELECT ...;", use: "Saved query" },
        { cmd: "CREATE INDEX", syntax: "CREATE INDEX ix_name ON table(col);", use: "Speed lookups" },
        { cmd: "PRIMARY KEY", syntax: "id INTEGER PRIMARY KEY", use: "Unique row id" },
        { cmd: "FOREIGN KEY", syntax: "FOREIGN KEY (a_id) REFERENCES a(id)", use: "Referential integrity" },
        { cmd: "CONSTRAINTS", syntax: "NOT NULL | UNIQUE | CHECK (expr) | DEFAULT val", use: "Data rules" },
        { cmd: "BEGIN/COMMIT", syntax: "BEGIN;\n  ...statements...\nCOMMIT;", use: "Transaction" },
        { cmd: "ROLLBACK", syntax: "ROLLBACK;\n-- or ROLLBACK TO savepoint;", use: "Undo transaction" },
        { cmd: "GRANT/REVOKE", syntax: "GRANT SELECT ON table TO role;\nREVOKE SELECT ON table FROM role;", use: "Permissions (DCL)" },
        { cmd: "EXPLAIN", syntax: "EXPLAIN ANALYZE SELECT ...;", use: "Query plan / tuning" }
      ]
    ),

    mongodb: sheet(
      "MongoDB Quick Reference",
      "mongosh command syntax for everyday CRUD, indexes, and aggregation.",
      [
        { cmd: "mongosh", syntax: "mongosh \"mongodb://127.0.0.1:27017\"", use: "Connect shell" },
        { cmd: "use", syntax: "use ashovix", use: "Switch database" },
        { cmd: "insertOne", syntax: "db.col.insertOne({ name: \"Asha\", age: 22 })", use: "Insert one doc" },
        { cmd: "insertMany", syntax: "db.col.insertMany([ {...}, {...} ])", use: "Insert many docs" },
        { cmd: "find", syntax: "db.col.find({ age: { $gte: 18 } })", use: "Query documents" },
        { cmd: "findOne", syntax: "db.col.findOne({ _id: id })", use: "Single document" },
        { cmd: "updateOne", syntax: "db.col.updateOne({ _id: id }, { $set: { city: \"Pune\" } })", use: "Update one" },
        { cmd: "updateMany", syntax: "db.col.updateMany({ city: \"X\" }, { $set: { city: \"Y\" } })", use: "Update many" },
        { cmd: "deleteOne", syntax: "db.col.deleteOne({ _id: id })", use: "Delete one" },
        { cmd: "deleteMany", syntax: "db.col.deleteMany({ status: \"gone\" })", use: "Delete many" },
        { cmd: "aggregate", syntax: "db.col.aggregate([\n  { $match: {...} },\n  { $group: { _id: \"$k\", n: { $sum: 1 } } }\n])", use: "Pipelines" },
        { cmd: "createIndex", syntax: "db.col.createIndex({ email: 1 }, { unique: true })", use: "Create index" },
        { cmd: "explain", syntax: "db.col.find({...}).explain(\"executionStats\")", use: "Plan analysis" },
        { cmd: "mongodump", syntax: "mongodump --db ashovix --out ./backup", use: "Backup" },
        { cmd: "mongorestore", syntax: "mongorestore --db ashovix ./backup/ashovix", use: "Restore" }
      ]
    ),

    git: sheet(
      "Git Quick Reference",
      "Everyday Git command syntax for local work and remotes.",
      [
        { cmd: "git init", syntax: "git init", use: "New repository" },
        { cmd: "git clone", syntax: "git clone <url> [folder]", use: "Copy remote repo" },
        { cmd: "git status", syntax: "git status", use: "Working tree state" },
        { cmd: "git add", syntax: "git add .\ngit add path/file", use: "Stage changes" },
        { cmd: "git commit", syntax: "git commit -m \"message\"", use: "Save snapshot" },
        { cmd: "git log", syntax: "git log --oneline -n 10", use: "History" },
        { cmd: "git branch", syntax: "git branch\ngit branch name", use: "List / create branch" },
        { cmd: "git checkout / switch", syntax: "git switch name\ngit switch -c feature/x", use: "Change / create branch" },
        { cmd: "git merge", syntax: "git merge feature/x", use: "Merge branch" },
        { cmd: "git pull", syntax: "git pull origin main", use: "Fetch + merge" },
        { cmd: "git push", syntax: "git push -u origin branch", use: "Publish commits" },
        { cmd: "git diff", syntax: "git diff\ngit diff --staged", use: "Show changes" },
        { cmd: "git stash", syntax: "git stash\ngit stash pop", use: "Park local changes" },
        { cmd: "git remote", syntax: "git remote -v\ngit remote add origin <url>", use: "Remotes" }
      ]
    ),

    postgresql: sheet(
      "PostgreSQL Quick Reference",
      "psql and SQL essentials for PostgreSQL.",
      [
        { cmd: "psql", syntax: "psql -U postgres -d ashovix", use: "Connect" },
        { cmd: "\\l \\c \\dt \\d", syntax: "\\l\n\\c dbname\n\\dt\n\\d table", use: "Meta commands" },
        { cmd: "CREATE DATABASE", syntax: "CREATE DATABASE ashovix;", use: "New DB" },
        { cmd: "CREATE TABLE", syntax: "CREATE TABLE t (\n  id SERIAL PRIMARY KEY,\n  name TEXT NOT NULL\n);", use: "DDL" },
        { cmd: "EXPLAIN ANALYZE", syntax: "EXPLAIN ANALYZE SELECT ...;", use: "Plans" },
        { cmd: "pg_dump", syntax: "pg_dump -U postgres ashovix > backup.sql", use: "Backup" },
        { cmd: "CREATE INDEX", syntax: "CREATE INDEX ON t(col);", use: "Indexes" },
        { cmd: "GRANT", syntax: "GRANT SELECT ON ALL TABLES IN SCHEMA public TO app;", use: "Privileges" },
        { cmd: "JSONB", syntax: "SELECT data->>'key' FROM t;", use: "JSON query" }
      ]
    ),

    mysql: sheet(
      "MySQL Quick Reference",
      "mysql client and core SQL syntax.",
      [
        { cmd: "mysql", syntax: "mysql -u root -p", use: "Connect" },
        { cmd: "CREATE DATABASE", syntax: "CREATE DATABASE ashovix;\nUSE ashovix;", use: "Create / select DB" },
        { cmd: "SHOW", syntax: "SHOW DATABASES;\nSHOW TABLES;\nDESCRIBE table;", use: "Inspect" },
        { cmd: "CREATE TABLE", syntax: "CREATE TABLE t (\n  id INT PRIMARY KEY AUTO_INCREMENT,\n  name VARCHAR(100) NOT NULL\n);", use: "DDL" },
        { cmd: "INSERT/SELECT", syntax: "INSERT INTO t(name) VALUES ('Asha');\nSELECT * FROM t WHERE id = 1;", use: "DML / DQL" },
        { cmd: "mysqldump", syntax: "mysqldump -u root -p ashovix > backup.sql", use: "Backup" }
      ]
    ),

    redis: sheet(
      "Redis Quick Reference",
      "redis-cli data structure commands.",
      [
        { cmd: "SET/GET", syntax: "SET key value\nGET key", use: "Strings" },
        { cmd: "DEL/EXISTS", syntax: "DEL key\nEXISTS key", use: "Remove / check" },
        { cmd: "EXPIRE/TTL", syntax: "EXPIRE key 60\nTTL key", use: "TTL seconds" },
        { cmd: "HSET/HGETALL", syntax: "HSET user:1 name Asha\nHGETALL user:1", use: "Hashes" },
        { cmd: "LPUSH/LRANGE", syntax: "LPUSH q job1\nLRANGE q 0 -1", use: "Lists" },
        { cmd: "SADD/SMEMBERS", syntax: "SADD tags sql\nSMEMBERS tags", use: "Sets" },
        { cmd: "INCR", syntax: "INCR visits", use: "Counters" }
      ]
    ),

    docker: sheet(
      "Docker Quick Reference",
      "Docker CLI syntax for images and containers.",
      [
        { cmd: "docker version", syntax: "docker version", use: "Client/server info" },
        { cmd: "docker pull", syntax: "docker pull nginx:latest", use: "Download image" },
        { cmd: "docker images", syntax: "docker images", use: "List images" },
        { cmd: "docker run", syntax: "docker run -d -p 8080:80 --name web nginx", use: "Start container" },
        { cmd: "docker ps", syntax: "docker ps -a", use: "List containers" },
        { cmd: "docker logs", syntax: "docker logs -f web", use: "Container logs" },
        { cmd: "docker exec", syntax: "docker exec -it web sh", use: "Shell inside" },
        { cmd: "docker stop/rm", syntax: "docker stop web\ndocker rm web", use: "Stop / remove" },
        { cmd: "docker compose", syntax: "docker compose up -d\ndocker compose down", use: "Multi-service apps" },
        { cmd: "Dockerfile build", syntax: "docker build -t app:1 .", use: "Build image" }
      ]
    ),

    kubernetes: sheet(
      "Kubernetes Quick Reference",
      "kubectl essentials.",
      [
        { cmd: "kubectl get", syntax: "kubectl get pods -A\nkubectl get svc,deploy", use: "List resources" },
        { cmd: "kubectl describe", syntax: "kubectl describe pod name", use: "Details / events" },
        { cmd: "kubectl apply", syntax: "kubectl apply -f deploy.yaml", use: "Create/update from file" },
        { cmd: "kubectl delete", syntax: "kubectl delete -f deploy.yaml", use: "Remove resources" },
        { cmd: "kubectl logs", syntax: "kubectl logs deploy/api -f", use: "App logs" },
        { cmd: "kubectl exec", syntax: "kubectl exec -it pod -- sh", use: "Shell in pod" },
        { cmd: "kubectl rollout", syntax: "kubectl rollout status deploy/api", use: "Deploy progress" },
        { cmd: "kubectl config", syntax: "kubectl config get-contexts", use: "Clusters / contexts" }
      ]
    ),

    linux: sheet(
      "Linux Quick Reference",
      "Common shell commands for labs.",
      [
        { cmd: "pwd / ls / cd", syntax: "pwd\nls -la\ncd /path", use: "Navigate" },
        { cmd: "mkdir / cp / mv / rm", syntax: "mkdir -p dir\ncp a b\nmv a b\nrm -rf dir", use: "Files" },
        { cmd: "cat / less / nano", syntax: "cat file\nless file\nnano file", use: "Read / edit" },
        { cmd: "grep / find", syntax: "grep -R pattern .\nfind . -name \"*.log\"", use: "Search" },
        { cmd: "chmod / chown", syntax: "chmod 755 script.sh\nchown user:group file", use: "Permissions" },
        { cmd: "ps / top / kill", syntax: "ps aux\ntop\nkill PID", use: "Processes" },
        { cmd: "systemctl", syntax: "systemctl status nginx\nsystemctl restart nginx", use: "Services" },
        { cmd: "df / free / uname", syntax: "df -h\nfree -m\nuname -a", use: "System info" }
      ]
    ),

    aws: sheet(
      "AWS CLI Quick Reference",
      "Common aws command patterns.",
      [
        { cmd: "sts identity", syntax: "aws sts get-caller-identity", use: "Who am I" },
        { cmd: "s3", syntax: "aws s3 ls\naws s3 cp file s3://bucket/", use: "Object storage" },
        { cmd: "ec2", syntax: "aws ec2 describe-instances", use: "Compute" },
        { cmd: "lambda", syntax: "aws lambda list-functions", use: "Serverless" },
        { cmd: "iam", syntax: "aws iam list-users", use: "Identity" }
      ]
    ),

    azure: sheet(
      "Azure CLI Quick Reference",
      "az command syntax for common tasks.",
      [
        { cmd: "az login", syntax: "az login", use: "Authenticate" },
        { cmd: "az account", syntax: "az account show", use: "Subscription" },
        { cmd: "az group", syntax: "az group list -o table", use: "Resource groups" },
        { cmd: "az vm", syntax: "az vm list -d -o table", use: "Virtual machines" },
        { cmd: "az storage", syntax: "az storage account list -o table", use: "Storage" }
      ]
    ),

    gcp: sheet(
      "Google Cloud Quick Reference",
      "gcloud essentials.",
      [
        { cmd: "gcloud config", syntax: "gcloud config list", use: "Active config" },
        { cmd: "projects", syntax: "gcloud projects list", use: "Projects" },
        { cmd: "compute", syntax: "gcloud compute instances list", use: "VMs" },
        { cmd: "storage", syntax: "gcloud storage ls", use: "Buckets" },
        { cmd: "auth", syntax: "gcloud auth list", use: "Accounts" }
      ]
    ),

    terraform: sheet(
      "Terraform Quick Reference",
      "Core Terraform workflow commands.",
      [
        { cmd: "terraform init", syntax: "terraform init", use: "Init providers/modules" },
        { cmd: "terraform plan", syntax: "terraform plan", use: "Preview changes" },
        { cmd: "terraform apply", syntax: "terraform apply", use: "Apply changes" },
        { cmd: "terraform destroy", syntax: "terraform destroy", use: "Tear down" },
        { cmd: "terraform state", syntax: "terraform state list", use: "Inspect state" },
        { cmd: "terraform fmt/validate", syntax: "terraform fmt\nterraform validate", use: "Format / check" }
      ]
    ),

    db2: sheet(
      "IBM Db2 Quick Reference",
      "CLP and common Db2 LUW commands.",
      [
        { cmd: "db2start/stop", syntax: "db2start\ndb2stop", use: "Instance control" },
        { cmd: "CREATE DB", syntax: "db2 create database ASHOVIX", use: "Create database" },
        { cmd: "CONNECT", syntax: "db2 connect to ASHOVIX", use: "Connect CLP" },
        { cmd: "SQL", syntax: "db2 \"SELECT * FROM SYSCAT.TABLES FETCH FIRST 10 ROWS ONLY\"", use: "Run SQL" },
        { cmd: "CFG", syntax: "db2 get db cfg for ASHOVIX", use: "Config" },
        { cmd: "BACKUP", syntax: "db2 backup db ASHOVIX", use: "Backup" },
        { cmd: "RUNSTATS", syntax: "db2 RUNSTATS ON TABLE schema.t", use: "Statistics" },
        { cmd: "REORG", syntax: "db2 REORG TABLE schema.t", use: "Reorganize" }
      ]
    ),

    python: sheet(
      "Python Quick Reference",
      "Syntax patterns used in Ashovix Labs Python lessons.",
      [
        { cmd: "print / variables", syntax: "name = \"Ashovix\"\nprint(name)", use: "Basics" },
        { cmd: "list / loop", syntax: "nums = [1,2,3]\nfor n in nums:\n    print(n)", use: "Iterate" },
        { cmd: "function", syntax: "def add(a, b):\n    return a + b", use: "Functions" },
        { cmd: "dict", syntax: "user = {\"name\": \"Asha\", \"age\": 22}\nprint(user[\"name\"])", use: "Maps" },
        { cmd: "if", syntax: "if x > 0:\n    print(\"positive\")", use: "Branching" }
      ]
    ),

    bash: sheet(
      "Bash Quick Reference",
      "Shell scripting and command syntax.",
      [
        { cmd: "echo / vars", syntax: "NAME=ashovix\necho \"Hello $NAME\"", use: "Print / variables" },
        { cmd: "if", syntax: "if [ -f file ]; then echo yes; fi", use: "Conditions" },
        { cmd: "for", syntax: "for f in *.sh; do echo $f; done", use: "Loops" },
        { cmd: "pipes", syntax: "ps aux | grep nginx | head", use: "Compose commands" },
        { cmd: "chmod +x", syntax: "chmod +x script.sh\n./script.sh", use: "Run scripts" }
      ]
    )
  };

  // Aliases for catalog / logo ids
  REFS.mongo = REFS.mongodb;
  REFS.k8s = REFS.kubernetes;
  REFS.postgres = REFS.postgresql;
  REFS.oracle = REFS.sql;
  REFS.sqlite = REFS.sql;
  REFS.cicd = REFS.git;
  REFS.devops = REFS.linux;
  REFS.node = REFS.javascript || sheet("Node.js Quick Reference", "Node/npm essentials.", [
    { cmd: "node", syntax: "node app.js", use: "Run script" },
    { cmd: "npm init", syntax: "npm init -y", use: "New package" },
    { cmd: "npm install", syntax: "npm install express", use: "Add dependency" },
    { cmd: "npm start", syntax: "npm start", use: "Start app" }
  ]);
  REFS.javascript = REFS.node;
  REFS.nodejs = REFS.node;
  REFS.prometheus = sheet("Prometheus Quick Reference", "PromQL and service basics.", [
    { cmd: "up", syntax: "up{job=\"api\"}", use: "Target health" },
    { cmd: "rate", syntax: "rate(http_requests_total[5m])", use: "Request rate" },
    { cmd: "sum by", syntax: "sum by (job) (up)", use: "Aggregate" }
  ]);
  REFS.rest = sheet("REST Quick Reference", "HTTP API patterns.", [
    { cmd: "GET", syntax: "GET /api/items", use: "Read" },
    { cmd: "POST", syntax: "POST /api/items\nContent-Type: application/json\n{ \"name\": \"x\" }", use: "Create" },
    { cmd: "PUT/PATCH", syntax: "PUT /api/items/1", use: "Replace / update" },
    { cmd: "DELETE", syntax: "DELETE /api/items/1", use: "Remove" }
  ]);
  REFS.graphql = sheet("GraphQL Quick Reference", "Query language basics.", [
    { cmd: "query", syntax: "query { user(id: \"1\") { name email } }", use: "Read" },
    { cmd: "mutation", syntax: "mutation { createUser(name: \"Asha\") { id } }", use: "Write" }
  ]);
  REFS.systemdesign = sheet("System Design Quick Reference", "Common building-block terms.", [
    { cmd: "Load balancer", syntax: "Client -> LB -> App replicas", use: "Distribute traffic" },
    { cmd: "Cache", syntax: "App -> Redis -> DB", use: "Speed reads" },
    { cmd: "Queue", syntax: "Producer -> Queue -> Worker", use: "Async work" }
  ]);

  function pickRef(course) {
    if (!course) return null;
    if (course.reference && course.reference.commands && course.reference.commands.length) {
      // Upgrade existing refs that lack syntax
      const cmds = course.reference.commands.map((c) => ({
        cmd: c.cmd,
        syntax: c.syntax || c.cmd,
        use: c.use || ""
      }));
      return {
        title: course.reference.title || `${course.shortTitle || course.title} Quick Reference`,
        intro: course.reference.intro || "Command syntax used in this course.",
        commands: cmds,
        operators: course.reference.operators,
        monFunctions: course.reference.monFunctions,
        catalogViews: course.reference.catalogViews
      };
    }
    const keys = [course.id, course.technology, course.logo, course.shortTitle, course.title]
      .filter(Boolean)
      .map((k) => String(k).toLowerCase().replace(/\s+/g, ""));
    for (const k of keys) {
      if (REFS[k]) return REFS[k];
    }
    // fuzzy
    for (const k of keys) {
      for (const id of Object.keys(REFS)) {
        if (k.includes(id) || id.includes(k)) return REFS[id];
      }
    }
    return null;
  }

  function attachAll() {
    F.list().forEach((c) => {
      const ref = pickRef(c);
      if (ref) c.reference = ref;
    });
  }

  // Courses register before this file; attach immediately, then again on DOM ready.
  attachAll();
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", attachAll);
  }

  F.references = REFS;
  F.attachReferences = attachAll;
})();
