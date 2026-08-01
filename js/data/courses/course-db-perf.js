/* Ashovix Labs — Database Performance Tuning */
(function () {
  const F = window.FORGE;
  if (!F || !F.registerGenerated) {
    console.error("course-helpers.js must load before course-db-perf.js");
    return;
  }
  F.registerGenerated({
  "id": "db-perf",
  "order": 25,
  "prefix": "pf",
  "title": "Database Performance Tuning",
  "shortTitle": "DB Performance",
  "tagline": "Find and fix slow databases",
  "description": "Indexing strategy, query plans, pooling, vacuum/analyze mindset, and workload isolation.",
  "badge": "Updated",
  "difficulty": "Advanced",
  "category": "Databases",
  "accent": "#4DA3FF"
}, [
  {
    "title": "Performance",
    "lessons": [
      {
        "title": "Measure before tuning",
        "topic": "baselines",
        "steps": [
          "Capture slow query log sample.",
          "Record p95 latency.",
          "Note hardware limits."
        ]
      },
      {
        "title": "Index strategy",
        "topic": "indexes",
        "steps": [
          "Identify filter/join columns.",
          "Add covering candidates carefully.",
          "Re-measure."
        ]
      },
      {
        "title": "Pool & cache",
        "topic": "app-side performance",
        "steps": [
          "Size a connection pool.",
          "Add cache for hot reads.",
          "Watch consistency trade-offs."
        ]
      }
    ]
  }
]);
})();
