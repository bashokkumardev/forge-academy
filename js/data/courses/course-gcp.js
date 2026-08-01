/* Ashovix Labs — Google Cloud Essentials */
(function () {
  const F = window.FORGE;
  if (!F || !F.registerGenerated) {
    console.error("course-helpers.js must load before course-gcp.js");
    return;
  }
  F.registerGenerated({
  "id": "gcp",
  "order": 13,
  "prefix": "gc",
  "title": "Google Cloud Essentials",
  "shortTitle": "GCP",
  "tagline": "GCP foundations for engineers",
  "description": "Projects, IAM, Compute Engine, Cloud Storage, and Cloud SQL concepts.",
  "badge": "New",
  "difficulty": "Beginner",
  "category": "Cloud",
  "accent": "#2DD4BF"
}, [
  {
    "title": "GCP Basics",
    "lessons": [
      {
        "title": "Projects & IAM",
        "topic": "GCP identity",
        "steps": [
          "Create/select a project.",
          "Review IAM roles.",
          "Enable a basic API."
        ]
      },
      {
        "title": "Compute & storage",
        "topic": "GCE and GCS",
        "steps": [
          "VM create checklist.",
          "Create a bucket.",
          "Upload an object with gsutil or console."
        ]
      }
    ]
  }
]);
})();
