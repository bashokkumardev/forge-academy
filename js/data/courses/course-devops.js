/* Ashovix Labs — DevOps Fundamentals */
(function () {
  const F = window.FORGE;
  if (!F || !F.registerGenerated) {
    console.error("course-helpers.js must load before course-devops.js");
    return;
  }
  F.registerGenerated({
  "id": "devops",
  "order": 18,
  "prefix": "do",
  "title": "DevOps Fundamentals",
  "shortTitle": "DevOps",
  "tagline": "Culture, pipelines, and reliability basics",
  "description": "DevOps principles, CI vs CD, environments, observability, and handover checklists.",
  "badge": "Most Popular",
  "difficulty": "Beginner → Intermediate",
  "featured": true,
  "category": "DevOps",
  "accent": "#4DA3FF"
}, [
  {
    "title": "DevOps Core",
    "lessons": [
      {
        "title": "DevOps principles",
        "topic": "flow feedback learning",
        "steps": [
          "Define CALMS/Three Ways briefly.",
          "Map your current delivery pain points.",
          "Write a definition of done for releases."
        ]
      },
      {
        "title": "Environments & promotion",
        "topic": "dev/stage/prod",
        "steps": [
          "Draw env topology.",
          "List config differences.",
          "Define smoke tests per env."
        ]
      },
      {
        "title": "Observability intro",
        "topic": "metrics logs traces",
        "steps": [
          "Pick one golden signal set.",
          "List log fields you need.",
          "Create an on-call mini runbook."
        ]
      }
    ]
  }
]);
})();
