/* Ashovix Labs — CI/CD with GitHub Actions */
(function () {
  const F = window.FORGE;
  if (!F || !F.registerGenerated) {
    console.error("course-helpers.js must load before course-cicd.js");
    return;
  }
  F.registerGenerated({
  "id": "cicd",
  "order": 19,
  "prefix": "ci",
  "title": "CI/CD with GitHub Actions",
  "shortTitle": "GitHub Actions",
  "tagline": "Automate test and deploy pipelines",
  "description": "Workflows, jobs, secrets, matrices, artifacts, and deployment guards.",
  "badge": "Updated",
  "difficulty": "Intermediate",
  "category": "DevOps",
  "accent": "#2DD4BF"
}, [
  {
    "title": "Pipelines",
    "lessons": [
      {
        "title": "First workflow",
        "topic": "GitHub Actions YAML",
        "steps": [
          "Create .github/workflows/ci.yml.",
          "Trigger on push.",
          "Run lint/test job.",
          "Read the Actions log."
        ]
      },
      {
        "title": "Secrets & environments",
        "topic": "secrets",
        "steps": [
          "Add a repository secret.",
          "Reference it in a step.",
          "Protect a production environment."
        ]
      },
      {
        "title": "Artifacts & caching",
        "topic": "speed and outputs",
        "steps": [
          "Upload an artifact.",
          "Add dependency caching.",
          "Compare run durations."
        ]
      }
    ]
  }
]);
})();
