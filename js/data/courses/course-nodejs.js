/* Ashovix Labs — Node.js Backend */
(function () {
  const F = window.FORGE;
  if (!F || !F.registerGenerated) {
    console.error("course-helpers.js must load before course-nodejs.js");
    return;
  }
  F.registerGenerated({
  "id": "nodejs",
  "order": 23,
  "prefix": "no",
  "title": "Node.js Backend",
  "shortTitle": "Node.js",
  "tagline": "Build APIs with Node and Express",
  "description": "Node runtime, Express routes, middleware, env config, and DB connectivity patterns.",
  "badge": "Most Popular",
  "difficulty": "Beginner → Intermediate",
  "featured": true,
  "category": "Backend",
  "accent": "#2DD4BF"
}, [
  {
    "title": "Node APIs",
    "lessons": [
      {
        "title": "Node & npm setup",
        "topic": "Node toolchain",
        "steps": [
          "Install Node LTS.",
          "npm init.",
          "Install express.",
          "Create index.js hello server."
        ]
      },
      {
        "title": "REST with Express",
        "topic": "routing",
        "steps": [
          "Define GET/POST routes.",
          "Add JSON middleware.",
          "Validate input minimally.",
          "Return proper status codes."
        ]
      },
      {
        "title": "Connect a database",
        "topic": "Node + DB",
        "steps": [
          "Add a client library.",
          "Read DATABASE_URL from env.",
          "Run a health query on startup."
        ]
      }
    ]
  }
]);
})();
