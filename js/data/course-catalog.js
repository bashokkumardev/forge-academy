/* ForgeLab — expanded course catalog + marketing content */
(function () {
  const F = window.FORGE;

  F.marketing = {
    stats: [
      { value: 20000, suffix: "+", label: "Students" },
      { value: 12, suffix: "", label: "Learning Paths" },
      { value: 300, suffix: "+", label: "Lessons" },
      { value: 50, suffix: "+", label: "Hands-on Projects" },
      { value: 4.9, suffix: "★", label: "Student Rating", decimals: 1 }
    ],
    roadmap: [
      "Beginner", "Git", "Linux", "SQL", "PostgreSQL", "MongoDB",
      "Docker", "Kubernetes", "Cloud", "DevOps", "Projects", "Certificate"
    ],
    features: [
      { icon: "🧪", title: "Hands-on Labs", desc: "Practice every concept with guided terminal and SQL labs." },
      { icon: "🛠️", title: "Real Projects", desc: "Build portfolio-ready systems used in interviews and jobs." },
      { icon: "♾️", title: "Lifetime Access", desc: "Learn at your pace. Revisit lessons whenever you need." },
      { icon: "✅", title: "Quizzes", desc: "Check understanding after each module with instant feedback." },
      { icon: "🎓", title: "Certificates", desc: "Track certificate progress as you complete paths." },
      { icon: "💬", title: "Community Support", desc: "Ask questions, share wins, and learn with peers." },
      { icon: "🎯", title: "Interview Prep", desc: "Scenario drills for DBA, backend, and DevOps roles." },
      { icon: "📓", title: "Downloadable Notes", desc: "Cheat sheets and notes you can keep offline." }
    ],
    projects: [
      { tag: "SQL", title: "SQL Inventory System", desc: "Normalize products, stock movements, and reporting queries." },
      { tag: "SQL", title: "Hospital Database", desc: "Patients, appointments, billing, and access controls." },
      { tag: "SQL", title: "Bank Management", desc: "Accounts, ledgers, transactions, and audit trails." },
      { tag: "Backend", title: "E-Commerce Backend", desc: "Catalog, carts, orders, and payment stubs." },
      { tag: "Docker", title: "Dockerized Node API", desc: "Multi-stage builds, compose, and healthchecks." },
      { tag: "MongoDB", title: "MongoDB CRM", desc: "Flexible customer docs, pipelines, and indexes." },
      { tag: "K8s", title: "Kubernetes Deployment", desc: "Deploy, scale, and expose a production-like app." },
      { tag: "AWS", title: "AWS Web App", desc: "VPC-aware architecture with compute and storage." },
      { tag: "Linux", title: "Linux Automation Scripts", desc: "Bash jobs for backups, monitoring, and cleanup." },
      { tag: "Git", title: "Git Workflow Projects", desc: "Branching, PRs, reviews, and release tagging." }
    ],
    testimonials: [
      { name: "Priya N.", role: "Junior DBA", text: "ForgeLab’s step-by-step labs finally made PostgreSQL and backups click. Better than scattered YouTube playlists.", rating: 5 },
      { name: "Marcus L.", role: "Backend Engineer", text: "The Docker → Kubernetes path felt like a senior mentor sitting next to me. Clean UI, zero fluff.", rating: 5 },
      { name: "Aisha K.", role: "Career Switcher", text: "I went from zero Git to opening PRs confidently in two weeks. The conflict lessons are gold.", rating: 5 },
      { name: "Diego R.", role: "DevOps Associate", text: "Premium docs energy. Search is fast, progress sticks, and the projects look great on my portfolio.", rating: 5 }
    ],
    faqs: [
      { q: "Is ForgeLab free to start?", a: "Yes. Browse courses, complete lessons, and track progress in your browser. Account features unlock sync across devices." },
      { q: "Do I need prior experience?", a: "No. Start with Git and Linux, then SQL. Advanced tracks assume earlier foundations but every lesson stays step-by-step." },
      { q: "Are the courses hands-on?", a: "Every major track includes labs, quizzes, and projects. Install guides cover Windows and Linux where relevant." },
      { q: "Can I get a certificate?", a: "Complete a learning path and required projects to unlock certificate progress. Exportable certificates ship with account plans." },
      { q: "How is this different from random tutorials?", a: "Structured academies, consistent design, progress tracking, and no missing steps — install through production patterns." }
    ],
    blog: [
      { title: "Why every developer should learn SQL in 2026", excerpt: "ORMs hide queries until production hurts. Here’s a practical learning order.", tag: "SQL" },
      { title: "Docker mental model in 12 minutes", excerpt: "Images, containers, volumes, and networks without the noise.", tag: "Docker" },
      { title: "Git rebase without fear", excerpt: "When to rebase, when to merge, and how to recover safely.", tag: "Git" }
    ]
  };

  function estimateDuration(lessonCount) {
    const hours = Math.max(4, Math.round(lessonCount * 0.55));
    return `${hours}+ hrs`;
  }

  function makeLesson(prefix, n, title, topic, steps) {
    const id = `${prefix}${String(n).padStart(2, "0")}`;
    const stepHtml = steps.map((s, i) => `<li><strong>Step ${i + 1}.</strong> ${s}</li>`).join("");
    return {
      id,
      title,
      level: n <= 3 ? "Beginner" : n <= 7 ? "Intermediate" : "Advanced",
      duration: "25–40 min",
      objectives: [
        `Understand ${topic}`,
        `Complete every step without skipping`,
        `Verify your result before moving on`
      ],
      content: `
<p>This lesson covers <strong>${topic}</strong> with no skipped steps. Follow the sequence exactly, then use the verify checklist.</p>
<h2>Step-by-step</h2>
<ol>${stepHtml}</ol>
<div class="callout"><strong>Verify:</strong>
<ul>
  <li>You completed every step above in order.</li>
  <li>You can explain what each command/action did.</li>
  <li>You saved notes or a screenshot of the final successful output.</li>
</ul>
</div>
<div class="callout warning"><strong>Common mistake:</strong> Skipping prerequisites from earlier lessons. If something fails, go back one lesson and re-verify.</div>
`,
      quiz: {
        q: `What is the safest way to learn ${topic}?`,
        options: [
          "Skip to the last command only",
          "Follow every step, then verify the result",
          "Memorize marketing slogans",
          "Avoid practicing on a local machine"
        ],
        answer: 1
      }
    };
  }

  function registerGenerated(meta, modulesSpec) {
    const lessons = {};
    const modules = modulesSpec.map((m, mi) => {
      const lessonIds = [];
      m.lessons.forEach((lessonDef, li) => {
        const n = mi * 10 + li + 1;
        const L = makeLesson(meta.prefix, n, lessonDef.title, lessonDef.topic, lessonDef.steps);
        lessons[L.id] = L;
        lessonIds.push(L.id);
      });
      return { id: `${meta.id}-m${mi + 1}`, title: m.title, lessonIds };
    });

    const ordered = modules.flatMap((m) => m.lessonIds);
    F.register({
      id: meta.id,
      order: meta.order,
      title: meta.title,
      shortTitle: meta.shortTitle || meta.title,
      tagline: meta.tagline,
      level: meta.level || "Beginner → Advanced",
      accent: meta.accent || "#4DA3FF",
      description: meta.description,
      audience: meta.audience || "Developers & engineers",
      thumbnail: meta.thumbnail || "📘",
      badge: meta.badge || "",
      difficulty: meta.difficulty || "Intermediate",
      duration: meta.duration || estimateDuration(ordered.length),
      featured: !!meta.featured,
      category: meta.category || "Engineering",
      modules,
      lessons,
      labs: ordered.slice(0, 4).map((id, i) => ({
        id: `${meta.id}-lab${i + 1}`,
        title: `Lab ${i + 1}: ${lessons[id].title}`,
        lesson: id,
        steps: `Re-do every step from the lesson on a clean environment. Document commands and final verification output.`
      }))
    });
  }

  const catalog = [
    {
      meta: {
        id: "postgres", order: 5, prefix: "pg", title: "PostgreSQL Complete", shortTitle: "PostgreSQL",
        tagline: "Production PostgreSQL from install to tuning",
        description: "Install, SQL, indexes, JSONB, roles, backup, replication concepts, and performance basics.",
        thumbnail: "🐘", badge: "Best Seller", difficulty: "Beginner → Advanced", featured: true,
        accent: "#4DA3FF", category: "Databases", duration: "18+ hrs"
      },
      modules: [
        { title: "Install & Foundations", lessons: [
          { title: "PostgreSQL architecture overview", topic: "processes, WAL, and databases", steps: ["Sketch postmaster, backends, and shared buffers on paper.", "List local vs remote connection use cases.", "Write three reasons teams choose PostgreSQL."] },
          { title: "Install on Windows & Linux", topic: "PostgreSQL installation", steps: ["Download the official installer or use apt/yum packages.", "Set the data directory and superuser password securely.", "Start the service and confirm with `psql --version`.", "Connect with `psql -U postgres` and run `SELECT version();`."] },
          { title: "psql essentials", topic: "psql navigation", steps: ["Connect to a database.", "Use `\\l`, `\\c`, `\\dt`, `\\d table`.", "Create a practice database `forgelab`."] }
        ]},
        { title: "SQL & Schema", lessons: [
          { title: "Tables, types, and constraints", topic: "DDL in PostgreSQL", steps: ["Create schemas and tables with PK/FK.", "Add CHECK and UNIQUE constraints.", "Inspect with `\\d+`."] },
          { title: "Indexes & EXPLAIN", topic: "query plans", steps: ["Create a B-tree index on a filter column.", "Run `EXPLAIN ANALYZE` before and after.", "Note seq scan vs index scan."] },
          { title: "JSONB for flexible data", topic: "JSONB", steps: ["Add a JSONB column.", "Insert documents and query with `->>`.", "Create a GIN index and re-query."] }
        ]},
        { title: "Ops & Safety", lessons: [
          { title: "Roles and privileges", topic: "security", steps: ["Create an app role with least privilege.", "GRANT only required table rights.", "Test login as that role."] },
          { title: "Backup with pg_dump", topic: "backups", steps: ["Run `pg_dump` to a file.", "Drop a test table intentionally in a clone.", "Restore and verify row counts."] }
        ]}
      ]
    },
    {
      meta: {
        id: "redis", order: 6, prefix: "rd", title: "Redis Essentials", shortTitle: "Redis",
        tagline: "In-memory data structures for speed",
        description: "Install Redis, master strings/lists/hashes/sets, TTLs, persistence basics, and caching patterns.",
        thumbnail: "⚡", badge: "New", difficulty: "Beginner → Intermediate", featured: true,
        accent: "#F4B942", category: "Databases"
      },
      modules: [
        { title: "Start with Redis", lessons: [
          { title: "What Redis is for", topic: "caching and data structures", steps: ["List cache vs primary store use cases.", "Name five Redis data types.", "Sketch a session-store architecture."] },
          { title: "Install & redis-cli", topic: "Redis install", steps: ["Install Redis (Windows via Memurai/WSL or Linux packages).", "Start the server.", "Ping with `redis-cli PING` expecting PONG."] }
        ]},
        { title: "Data structures", lessons: [
          { title: "Strings & TTL", topic: "SET GET EXPIRE", steps: ["SET a key.", "GET it.", "EXPIRE and watch TTL.", "Confirm deletion after expiry."] },
          { title: "Hashes lists sets", topic: "HSET LPUSH SADD", steps: ["Model a user profile with HASH.", "Use a LIST as a queue.", "Use a SET for unique tags."] },
          { title: "Caching pattern", topic: "cache-aside", steps: ["Write a pseudo-flow: read cache → miss → DB → set cache.", "Choose a TTL strategy.", "Document stampede risks."] }
        ]}
      ]
    },
    {
      meta: {
        id: "linux", order: 7, prefix: "lx", title: "Linux Mastery", shortTitle: "Linux",
        tagline: "Command line, users, services, and automation",
        description: "Filesystem, permissions, processes, networking basics, systemd, and shell productivity for engineers.",
        thumbnail: "🐧", badge: "Most Popular", difficulty: "Beginner → Advanced", featured: true,
        accent: "#2DD4BF", category: "Platform"
      },
      modules: [
        { title: "CLI Foundations", lessons: [
          { title: "Filesystem navigation", topic: "paths and navigation", steps: ["Open a terminal.", "Use pwd, ls -la, cd, mkdir, touch, cp, mv, rm carefully.", "Create a ~/forgelab workspace."] },
          { title: "Permissions & ownership", topic: "chmod chown", steps: ["Create a file and inspect with ls -l.", "Change mode with chmod.", "Explain u/g/o and rwx."] },
          { title: "Processes & resources", topic: "ps top kill", steps: ["List processes.", "Find a PID.", "Practice graceful stop vs kill."] }
        ]},
        { title: "Admin Basics", lessons: [
          { title: "Users and sudo", topic: "user management", steps: ["Create a practice user.", "Add to a group.", "Run a command with sudo and verify logs mindset."] },
          { title: "systemd services", topic: "systemctl", steps: ["Check a service status.", "Enable on boot.", "Read journalctl -u for errors."] },
          { title: "Networking tools", topic: "ss curl dig", steps: ["Inspect listening ports.", "curl a URL.", "Resolve a hostname."] }
        ]}
      ]
    },
    {
      meta: {
        id: "docker", order: 8, prefix: "dk", title: "Docker Complete", shortTitle: "Docker",
        tagline: "Containers from first image to Compose",
        description: "Images, containers, volumes, networks, Dockerfiles, multi-stage builds, and Compose stacks.",
        thumbnail: "🐳", badge: "Most Popular", difficulty: "Beginner → Intermediate", featured: true,
        accent: "#4DA3FF", category: "DevOps"
      },
      modules: [
        { title: "Containers 101", lessons: [
          { title: "Install Docker Desktop / Engine", topic: "Docker install", steps: ["Install Docker for your OS.", "Start the engine.", "Run `docker version` and `docker run hello-world`."] },
          { title: "Images vs containers", topic: "docker run", steps: ["Pull nginx.", "Run it mapped to port 8080.", "Exec into the container and curl localhost."] },
          { title: "Volumes & networks", topic: "persistence and networking", steps: ["Create a named volume.", "Attach it to a container.", "Create a user-defined bridge network and attach two containers."] }
        ]},
        { title: "Build & Compose", lessons: [
          { title: "Write a Dockerfile", topic: "Dockerfile", steps: ["Create a tiny Node or static app.", "Write FROM, WORKDIR, COPY, RUN, CMD.", "Build and run the image."] },
          { title: "Docker Compose", topic: "compose.yml", steps: ["Define app + database services.", "Use depends_on and env files.", "Up, logs, down, and verify data volume."] }
        ]}
      ]
    },
    {
      meta: {
        id: "kubernetes", order: 9, prefix: "k8", title: "Kubernetes", shortTitle: "Kubernetes",
        tagline: "Orchestrate containers at scale",
        description: "Pods, Deployments, Services, ConfigMaps, Ingress concepts, and kubectl daily workflow.",
        thumbnail: "☸️", badge: "Updated", difficulty: "Intermediate → Advanced", featured: true,
        accent: "#2DD4BF", category: "DevOps"
      },
      modules: [
        { title: "Cluster Basics", lessons: [
          { title: "K8s architecture", topic: "control plane & nodes", steps: ["Draw API server, etcd, scheduler, kubelet.", "Define Pod vs Deployment.", "Install kubectl and a local cluster (kind/minikube)."] },
          { title: "Deploy your first app", topic: "kubectl apply", steps: ["Write a Deployment YAML.", "Apply it.", "Expose with a Service.", "Port-forward and verify."] },
          { title: "Config & secrets mindset", topic: "ConfigMaps Secrets", steps: ["Create a ConfigMap.", "Mount as env.", "Document why secrets need encryption at rest."] }
        ]}
      ]
    },
    {
      meta: {
        id: "terraform", order: 10, prefix: "tf", title: "Terraform", shortTitle: "Terraform",
        tagline: "Infrastructure as code",
        description: "Providers, resources, state, modules, and safe plan/apply workflows.",
        thumbnail: "🧱", badge: "New", difficulty: "Intermediate", category: "DevOps", accent: "#F4B942"
      },
      modules: [
        { title: "IaC Foundations", lessons: [
          { title: "Install Terraform", topic: "terraform CLI", steps: ["Install Terraform.", "Run `terraform version`.", "Create a working folder with main.tf."] },
          { title: "Plan & apply lifecycle", topic: "init plan apply", steps: ["Write a simple local or cloud resource stub.", "terraform init.", "terraform plan.", "terraform apply with review."] },
          { title: "State & modules", topic: "state management", steps: ["Inspect state list.", "Extract a reusable module.", "Document remote state benefits."] }
        ]}
      ]
    },
    {
      meta: {
        id: "aws", order: 11, prefix: "aw", title: "AWS Cloud Practitioner", shortTitle: "AWS",
        tagline: "Core AWS services for builders",
        description: "IAM, EC2, S3, VPC basics, RDS overview, and Well-Architected thinking.",
        thumbnail: "☁️", badge: "Best Seller", difficulty: "Beginner → Intermediate", featured: true,
        category: "Cloud", accent: "#F4B942"
      },
      modules: [
        { title: "AWS Core", lessons: [
          { title: "Accounts & IAM mindset", topic: "IAM", steps: ["Enable MFA on root (checklist).", "Create an admin IAM user pattern.", "Practice least privilege policy reading."] },
          { title: "EC2 & S3 essentials", topic: "compute and storage", steps: ["Launch a free-tier friendly instance checklist.", "Create an S3 bucket with block public access.", "Upload and retrieve an object."] },
          { title: "VPC mental model", topic: "networking", steps: ["Draw public/private subnets.", "Explain security groups vs NACLs.", "Map a simple 3-tier layout."] }
        ]}
      ]
    },
    {
      meta: {
        id: "azure", order: 12, prefix: "az", title: "Azure Fundamentals", shortTitle: "Azure",
        tagline: "Microsoft Azure core services",
        description: "Subscriptions, Resource Groups, VMs, Storage, Entra ID basics, and Azure SQL overview.",
        thumbnail: "🔷", badge: "New", difficulty: "Beginner", category: "Cloud", accent: "#4DA3FF"
      },
      modules: [
        { title: "Azure Basics", lessons: [
          { title: "Portal & resource groups", topic: "Azure organization", steps: ["Create a resource group.", "Tag resources.", "Review cost alerts mindset."] },
          { title: "Compute & storage", topic: "VMs and Blob", steps: ["Create a VM checklist.", "Create a storage account.", "Upload a blob."] }
        ]}
      ]
    },
    {
      meta: {
        id: "gcp", order: 13, prefix: "gc", title: "Google Cloud Essentials", shortTitle: "GCP",
        tagline: "GCP foundations for engineers",
        description: "Projects, IAM, Compute Engine, Cloud Storage, and Cloud SQL concepts.",
        thumbnail: "🌈", badge: "New", difficulty: "Beginner", category: "Cloud", accent: "#2DD4BF"
      },
      modules: [
        { title: "GCP Basics", lessons: [
          { title: "Projects & IAM", topic: "GCP identity", steps: ["Create/select a project.", "Review IAM roles.", "Enable a basic API."] },
          { title: "Compute & storage", topic: "GCE and GCS", steps: ["VM create checklist.", "Create a bucket.", "Upload an object with gsutil or console."] }
        ]}
      ]
    },
    {
      meta: {
        id: "oracle", order: 14, prefix: "or", title: "Oracle Database", shortTitle: "Oracle",
        tagline: "Oracle fundamentals for DBAs & developers",
        description: "Instances, schemas, SQL*Plus/SQLcl, tablespaces concepts, and backup awareness.",
        thumbnail: "🔴", difficulty: "Intermediate", category: "Databases", accent: "#F4B942"
      },
      modules: [
        { title: "Oracle Foundations", lessons: [
          { title: "Instance vs database", topic: "Oracle architecture", steps: ["Define SGA/PGA at a high level.", "Explain listener role.", "Map schema to user concept."] },
          { title: "SQL workflow", topic: "Oracle SQL basics", steps: ["Connect with a client.", "Create a user/schema practice.", "Create a table and query it."] }
        ]}
      ]
    },
    {
      meta: {
        id: "mysql", order: 15, prefix: "my", title: "MySQL Complete", shortTitle: "MySQL",
        tagline: "MySQL for apps and operations",
        description: "Install, InnoDB, SQL, users, dumps, and replication concepts.",
        thumbnail: "🐬", badge: "Updated", difficulty: "Beginner → Intermediate", category: "Databases", accent: "#4DA3FF"
      },
      modules: [
        { title: "MySQL Core", lessons: [
          { title: "Install & connect", topic: "MySQL install", steps: ["Install MySQL Server.", "Secure root access.", "Create a database and user.", "Connect with mysql client."] },
          { title: "InnoDB & SQL practice", topic: "InnoDB tables", steps: ["Create InnoDB tables with FKs.", "Insert sample data.", "Explain and index a slow filter."] },
          { title: "Backup with mysqldump", topic: "mysqldump", steps: ["Dump a database.", "Restore into a new schema.", "Verify table counts."] }
        ]}
      ]
    },
    {
      meta: {
        id: "python-dba", order: 16, prefix: "py", title: "Python for DBAs", shortTitle: "Python",
        tagline: "Automate database work with Python",
        description: "Python basics, DB-API, scripts for health checks, exports, and simple ETL.",
        thumbnail: "🐍", badge: "New", difficulty: "Beginner → Intermediate", category: "Automation", accent: "#2DD4BF"
      },
      modules: [
        { title: "Python Automation", lessons: [
          { title: "Python setup for ops", topic: "venv and pip", steps: ["Install Python.", "Create a venv.", "Install a DB driver.", "Run a hello script."] },
          { title: "Query databases from Python", topic: "DB-API", steps: ["Connect with parameters.", "Run SELECT and print rows.", "Use context managers for cleanup."] },
          { title: "Health-check script", topic: "ops scripting", steps: ["Ping connectivity.", "Check row counts.", "Write results to a log file."] }
        ]}
      ]
    },
    {
      meta: {
        id: "bash", order: 17, prefix: "sh", title: "Bash Scripting", shortTitle: "Bash",
        tagline: "Shell scripts that survive production",
        description: "Variables, loops, exit codes, set -euo pipefail, cron, and safe automation patterns.",
        thumbnail: "💻", difficulty: "Beginner → Intermediate", category: "Platform", accent: "#F4B942"
      },
      modules: [
        { title: "Shell Scripting", lessons: [
          { title: "First script", topic: "bash basics", steps: ["Write a .sh file with shebang.", "chmod +x.", "Use variables and quotes.", "Run it."] },
          { title: "Safe scripting flags", topic: "set -euo pipefail", steps: ["Add strict mode.", "Handle missing args.", "Return meaningful exit codes."] },
          { title: "Schedule with cron", topic: "cron", steps: ["Write a backup-style script.", "Add a crontab entry.", "Verify logs."] }
        ]}
      ]
    },
    {
      meta: {
        id: "devops", order: 18, prefix: "do", title: "DevOps Fundamentals", shortTitle: "DevOps",
        tagline: "Culture, pipelines, and reliability basics",
        description: "DevOps principles, CI vs CD, environments, observability, and handover checklists.",
        thumbnail: "🚀", badge: "Most Popular", difficulty: "Beginner → Intermediate", featured: true,
        category: "DevOps", accent: "#4DA3FF"
      },
      modules: [
        { title: "DevOps Core", lessons: [
          { title: "DevOps principles", topic: "flow feedback learning", steps: ["Define CALMS/Three Ways briefly.", "Map your current delivery pain points.", "Write a definition of done for releases."] },
          { title: "Environments & promotion", topic: "dev/stage/prod", steps: ["Draw env topology.", "List config differences.", "Define smoke tests per env."] },
          { title: "Observability intro", topic: "metrics logs traces", steps: ["Pick one golden signal set.", "List log fields you need.", "Create an on-call mini runbook."] }
        ]}
      ]
    },
    {
      meta: {
        id: "cicd", order: 19, prefix: "ci", title: "CI/CD with GitHub Actions", shortTitle: "GitHub Actions",
        tagline: "Automate test and deploy pipelines",
        description: "Workflows, jobs, secrets, matrices, artifacts, and deployment guards.",
        thumbnail: "⚙️", badge: "Updated", difficulty: "Intermediate", category: "DevOps", accent: "#2DD4BF"
      },
      modules: [
        { title: "Pipelines", lessons: [
          { title: "First workflow", topic: "GitHub Actions YAML", steps: ["Create .github/workflows/ci.yml.", "Trigger on push.", "Run lint/test job.", "Read the Actions log."] },
          { title: "Secrets & environments", topic: "secrets", steps: ["Add a repository secret.", "Reference it in a step.", "Protect a production environment."] },
          { title: "Artifacts & caching", topic: "speed and outputs", steps: ["Upload an artifact.", "Add dependency caching.", "Compare run durations."] }
        ]}
      ]
    },
    {
      meta: {
        id: "prometheus", order: 20, prefix: "pr", title: "Monitoring with Prometheus & Grafana", shortTitle: "Prometheus",
        tagline: "Metrics that wake you before users do",
        description: "Exporters, PromQL basics, alerting rules, and Grafana dashboards.",
        thumbnail: "📈", badge: "New", difficulty: "Intermediate", category: "DevOps", accent: "#F4B942"
      },
      modules: [
        { title: "Metrics Stack", lessons: [
          { title: "Prometheus architecture", topic: "pull model", steps: ["Explain scrape targets.", "Run Prometheus locally via Docker.", "Open the UI and check /targets."] },
          { title: "PromQL starter", topic: "PromQL", steps: ["Graph a rate() query.", "Use labels in selectors.", "Create a recording rule sketch."] },
          { title: "Grafana dashboard", topic: "Grafana", steps: ["Add Prometheus datasource.", "Build a 3-panel dashboard.", "Save and share the JSON mindset."] }
        ]}
      ]
    },
    {
      meta: {
        id: "rest", order: 21, prefix: "re", title: "REST APIs", shortTitle: "REST",
        tagline: "Design and consume HTTP APIs",
        description: "Resources, status codes, versioning, auth headers, and OpenAPI basics.",
        thumbnail: "🌐", difficulty: "Beginner → Intermediate", category: "Backend", accent: "#4DA3FF"
      },
      modules: [
        { title: "API Design", lessons: [
          { title: "REST principles", topic: "resources and verbs", steps: ["Model nouns as resources.", "Map GET/POST/PUT/PATCH/DELETE.", "Pick consistent status codes."] },
          { title: "Auth & errors", topic: "API security basics", steps: ["Use bearer tokens checklist.", "Design error JSON shape.", "Document rate-limit headers."] }
        ]}
      ]
    },
    {
      meta: {
        id: "graphql", order: 22, prefix: "gq", title: "GraphQL", shortTitle: "GraphQL",
        tagline: "Flexible queries for modern clients",
        description: "Schemas, queries, mutations, resolvers mindset, and N+1 awareness.",
        thumbnail: "◈", badge: "New", difficulty: "Intermediate", category: "Backend", accent: "#2DD4BF"
      },
      modules: [
        { title: "GraphQL Basics", lessons: [
          { title: "Schema & types", topic: "GraphQL SDL", steps: ["Write a type User.", "Add a Query field.", "Explain nullability."] },
          { title: "Queries & mutations", topic: "operations", steps: ["Write a query with fields.", "Write a mutation.", "Discuss over-fetching vs under-fetching."] }
        ]}
      ]
    },
    {
      meta: {
        id: "nodejs", order: 23, prefix: "no", title: "Node.js Backend", shortTitle: "Node.js",
        tagline: "Build APIs with Node and Express",
        description: "Node runtime, Express routes, middleware, env config, and DB connectivity patterns.",
        thumbnail: "🟢", badge: "Most Popular", difficulty: "Beginner → Intermediate", featured: true,
        category: "Backend", accent: "#2DD4BF"
      },
      modules: [
        { title: "Node APIs", lessons: [
          { title: "Node & npm setup", topic: "Node toolchain", steps: ["Install Node LTS.", "npm init.", "Install express.", "Create index.js hello server."] },
          { title: "REST with Express", topic: "routing", steps: ["Define GET/POST routes.", "Add JSON middleware.", "Validate input minimally.", "Return proper status codes."] },
          { title: "Connect a database", topic: "Node + DB", steps: ["Add a client library.", "Read DATABASE_URL from env.", "Run a health query on startup."] }
        ]}
      ]
    },
    {
      meta: {
        id: "system-design", order: 24, prefix: "sd", title: "System Design Basics", shortTitle: "System Design",
        tagline: "Scalable systems without the buzzword fog",
        description: "Load balancing, caching, queues, data partitioning, and trade-off drills.",
        thumbnail: "🏗️", badge: "Best Seller", difficulty: "Intermediate → Advanced", featured: true,
        category: "Architecture", accent: "#F4B942"
      },
      modules: [
        { title: "Design Foundations", lessons: [
          { title: "Clarify requirements", topic: "functional vs non-functional", steps: ["Write FR/NFR for a URL shortener.", "Estimate QPS and storage roughly.", "List constraints."] },
          { title: "Building blocks", topic: "LB cache queue DB", steps: ["Place a load balancer.", "Add a cache tier.", "Decide SQL vs NoSQL for the use case."] },
          { title: "Failure modes", topic: "reliability", steps: ["List SPOFs.", "Add redundancy.", "Define a simple SLO."] }
        ]}
      ]
    },
    {
      meta: {
        id: "db-perf", order: 25, prefix: "pf", title: "Database Performance Tuning", shortTitle: "DB Performance",
        tagline: "Find and fix slow databases",
        description: "Indexing strategy, query plans, pooling, vacuum/analyze mindset, and workload isolation.",
        thumbnail: "🏎️", badge: "Updated", difficulty: "Advanced", category: "Databases", accent: "#4DA3FF"
      },
      modules: [
        { title: "Performance", lessons: [
          { title: "Measure before tuning", topic: "baselines", steps: ["Capture slow query log sample.", "Record p95 latency.", "Note hardware limits."] },
          { title: "Index strategy", topic: "indexes", steps: ["Identify filter/join columns.", "Add covering candidates carefully.", "Re-measure."] },
          { title: "Pool & cache", topic: "app-side performance", steps: ["Size a connection pool.", "Add cache for hot reads.", "Watch consistency trade-offs."] }
        ]}
      ]
    },
    {
      meta: {
        id: "warehouse", order: 26, prefix: "dw", title: "Data Warehousing", shortTitle: "Data Warehouse",
        tagline: "Analytics modeling and pipelines",
        description: "Star schemas, ETL vs ELT, slowly changing dimensions, and warehouse query patterns.",
        thumbnail: "🏬", difficulty: "Intermediate", category: "Data", accent: "#2DD4BF"
      },
      modules: [
        { title: "Warehouse Design", lessons: [
          { title: "OLTP vs OLAP", topic: "workload differences", steps: ["Compare latency needs.", "List typical query shapes.", "Choose a warehouse pattern."] },
          { title: "Star schema", topic: "facts and dimensions", steps: ["Design a sales fact.", "Add date/customer dims.", "Write two BI queries."] }
        ]}
      ]
    },
    {
      meta: {
        id: "kafka", order: 27, prefix: "kf", title: "Apache Kafka", shortTitle: "Kafka",
        tagline: "Event streaming fundamentals",
        description: "Topics, partitions, producers/consumers, offsets, and delivery semantics overview.",
        thumbnail: "📨", badge: "New", difficulty: "Intermediate → Advanced", category: "Data", accent: "#F4B942"
      },
      modules: [
        { title: "Streaming", lessons: [
          { title: "Kafka mental model", topic: "logs partitions", steps: ["Define topic and partition.", "Explain consumer groups.", "Sketch an order-events flow."] },
          { title: "Produce & consume", topic: "clients", steps: ["Run Kafka locally via Docker Compose checklist.", "Produce a message.", "Consume and commit offsets mindset."] }
        ]}
      ]
    },
    {
      meta: {
        id: "elasticsearch", order: 28, prefix: "es", title: "ElasticSearch", shortTitle: "Elasticsearch",
        tagline: "Search and analytics engine basics",
        description: "Indexes, mappings, queries, aggregations, and when to use ES beside your DB.",
        thumbnail: "🔍", difficulty: "Intermediate", category: "Data", accent: "#4DA3FF"
      },
      modules: [
        { title: "Search Basics", lessons: [
          { title: "Indexes & documents", topic: "Elasticsearch model", steps: ["Run ES via Docker.", "Index a document.", "GET it by id."] },
          { title: "Query DSL", topic: "search queries", steps: ["Match query.", "Filter context.", "Simple aggregation."] }
        ]}
      ]
    },
    {
      meta: {
        id: "rabbitmq", order: 29, prefix: "rq", title: "RabbitMQ", shortTitle: "RabbitMQ",
        tagline: "Reliable messaging with queues",
        description: "Exchanges, queues, bindings, ack/nack, and dead-letter patterns.",
        thumbnail: "🐰", badge: "New", difficulty: "Intermediate", category: "Backend", accent: "#2DD4BF"
      },
      modules: [
        { title: "Messaging", lessons: [
          { title: "Broker concepts", topic: "AMQP basics", steps: ["Define producer/queue/consumer.", "Run RabbitMQ management Docker.", "Create a queue in the UI."] },
          { title: "Ack and retries", topic: "delivery safety", steps: ["Publish a message.", "Consume with manual ack.", "Configure a DLQ pattern sketch."] }
        ]}
      ]
    }
  ];

  catalog.forEach((entry) => registerGenerated(entry.meta, entry.modules));

  /* Enrich existing flagship courses with premium metadata */
  function enrich(id, extra) {
    const c = F.get(id);
    if (!c) return;
    Object.assign(c, extra);
    if (!c.duration) c.duration = estimateDuration((c.orderedLessonIds || []).length);
  }

  enrich("sql", {
    thumbnail: "🟦", badge: "Best Seller", difficulty: "Beginner → Advanced", featured: true,
    category: "Databases", duration: "20+ hrs", accent: "#4DA3FF"
  });
  enrich("mongo", {
    thumbnail: "🍃", badge: "Most Popular", difficulty: "Beginner → Advanced", featured: true,
    category: "Databases", duration: "16+ hrs", accent: "#2DD4BF"
  });
  enrich("git", {
    thumbnail: "🌿", badge: "Most Popular", difficulty: "Beginner → Advanced", featured: true,
    category: "Platform", duration: "12+ hrs", accent: "#F4B942"
  });
  enrich("db2", {
    thumbnail: "💠", badge: "Updated", difficulty: "Beginner → Architect", featured: true,
    category: "Databases", duration: "30+ hrs", accent: "#4DA3FF"
  });
})();
