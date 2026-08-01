/* Ashovix Labs — GraphQL */
(function () {
  const F = window.FORGE;
  if (!F || !F.registerGenerated) {
    console.error("course-helpers.js must load before course-graphql.js");
    return;
  }
  F.registerGenerated({
  "id": "graphql",
  "order": 22,
  "prefix": "gq",
  "title": "GraphQL",
  "shortTitle": "GraphQL",
  "tagline": "Flexible queries for modern clients",
  "description": "Schemas, queries, mutations, resolvers mindset, and N+1 awareness.",
  "badge": "New",
  "difficulty": "Intermediate",
  "category": "Backend",
  "accent": "#2DD4BF"
}, [
  {
    "title": "GraphQL Basics",
    "lessons": [
      {
        "title": "Schema & types",
        "topic": "GraphQL SDL",
        "steps": [
          "Write a type User.",
          "Add a Query field.",
          "Explain nullability."
        ]
      },
      {
        "title": "Queries & mutations",
        "topic": "operations",
        "steps": [
          "Write a query with fields.",
          "Write a mutation.",
          "Discuss over-fetching vs under-fetching."
        ]
      }
    ]
  }
]);
})();
