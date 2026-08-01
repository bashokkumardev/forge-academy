/* Ashovix Labs — Oracle Database */
(function () {
  const F = window.FORGE;
  if (!F || !F.registerGenerated) {
    console.error("course-helpers.js must load before course-oracle.js");
    return;
  }
  F.registerGenerated({
  "id": "oracle",
  "order": 14,
  "prefix": "or",
  "title": "Oracle Database",
  "shortTitle": "Oracle",
  "tagline": "Oracle fundamentals for DBAs & developers",
  "description": "Instances, schemas, SQL*Plus/SQLcl, tablespaces concepts, and backup awareness.",
  "difficulty": "Intermediate",
  "category": "Databases",
  "accent": "#F4B942"
}, [
  {
    "title": "Oracle Foundations",
    "lessons": [
      {
        "title": "Instance vs database",
        "topic": "Oracle architecture",
        "steps": [
          "Define SGA/PGA at a high level.",
          "Explain listener role.",
          "Map schema to user concept."
        ]
      },
      {
        "title": "SQL workflow",
        "topic": "Oracle SQL basics",
        "steps": [
          "Connect with a client.",
          "Create a user/schema practice.",
          "Create a table and query it."
        ]
      }
    ]
  }
]);
})();
