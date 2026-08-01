/* Ashovix Labs — PostgreSQL Complete */
(function () {
  const F = window.FORGE;
  if (!F || !F.registerGenerated) {
    console.error("course-helpers.js must load before course-postgres.js");
    return;
  }
  F.registerGenerated({
  "id": "postgres",
  "order": 5,
  "prefix": "pg",
  "title": "PostgreSQL Complete",
  "shortTitle": "PostgreSQL",
  "tagline": "Production PostgreSQL from install to tuning",
  "description": "Install, SQL, indexes, JSONB, roles, backup, replication concepts, and performance basics.",
  "badge": "Best Seller",
  "difficulty": "Beginner → Advanced",
  "featured": true,
  "accent": "#4DA3FF",
  "category": "Databases",
  "duration": "18+ hrs"
}, [
  {
    "title": "Install & Foundations",
    "lessons": [
      {
        "title": "PostgreSQL architecture overview",
        "topic": "processes, WAL, and databases",
        "steps": [
          "Sketch postmaster, backends, and shared buffers on paper.",
          "List local vs remote connection use cases.",
          "Write three reasons teams choose PostgreSQL."
        ]
      },
      {
        "title": "Install on Windows & Linux",
        "topic": "PostgreSQL installation",
        "steps": [
          "Download the official installer or use apt/yum packages.",
          "Set the data directory and superuser password securely.",
          "Start the service and confirm with `psql --version`.",
          "Connect with `psql -U postgres` and run `SELECT version();`."
        ]
      },
      {
        "title": "psql essentials",
        "topic": "psql navigation",
        "steps": [
          "Connect to a database.",
          "Use `\\l`, `\\c`, `\\dt`, `\\d table`.",
          "Create a practice database `forgelab`."
        ]
      }
    ]
  },
  {
    "title": "SQL & Schema",
    "lessons": [
      {
        "title": "Tables, types, and constraints",
        "topic": "DDL in PostgreSQL",
        "steps": [
          "Create schemas and tables with PK/FK.",
          "Add CHECK and UNIQUE constraints.",
          "Inspect with `\\d+`."
        ]
      },
      {
        "title": "Indexes & EXPLAIN",
        "topic": "query plans",
        "steps": [
          "Create a B-tree index on a filter column.",
          "Run `EXPLAIN ANALYZE` before and after.",
          "Note seq scan vs index scan."
        ]
      },
      {
        "title": "JSONB for flexible data",
        "topic": "JSONB",
        "steps": [
          "Add a JSONB column.",
          "Insert documents and query with `->>`.",
          "Create a GIN index and re-query."
        ]
      }
    ]
  },
  {
    "title": "Ops & Safety",
    "lessons": [
      {
        "title": "Roles and privileges",
        "topic": "security",
        "steps": [
          "Create an app role with least privilege.",
          "GRANT only required table rights.",
          "Test login as that role."
        ]
      },
      {
        "title": "Backup with pg_dump",
        "topic": "backups",
        "steps": [
          "Run `pg_dump` to a file.",
          "Drop a test table intentionally in a clone.",
          "Restore and verify row counts."
        ]
      }
    ]
  }
]);
})();
