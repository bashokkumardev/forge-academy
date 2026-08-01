/* Ashovix Labs — REST APIs */
(function () {
  const F = window.FORGE;
  if (!F || !F.registerGenerated) {
    console.error("course-helpers.js must load before course-rest.js");
    return;
  }
  F.registerGenerated({
  "id": "rest",
  "order": 21,
  "prefix": "re",
  "title": "REST APIs",
  "shortTitle": "REST",
  "tagline": "Design and consume HTTP APIs",
  "description": "Resources, status codes, versioning, auth headers, and OpenAPI basics.",
  "difficulty": "Beginner → Intermediate",
  "category": "Backend",
  "accent": "#4DA3FF"
}, [
  {
    "title": "API Design",
    "lessons": [
      {
        "title": "REST principles",
        "topic": "resources and verbs",
        "steps": [
          "Model nouns as resources.",
          "Map GET/POST/PUT/PATCH/DELETE.",
          "Pick consistent status codes."
        ]
      },
      {
        "title": "Auth & errors",
        "topic": "API security basics",
        "steps": [
          "Use bearer tokens checklist.",
          "Design error JSON shape.",
          "Document rate-limit headers."
        ]
      }
    ]
  }
]);
})();
