/* Ashovix Labs — Monitoring with Prometheus & Grafana */
(function () {
  const F = window.FORGE;
  if (!F || !F.registerGenerated) {
    console.error("course-helpers.js must load before course-prometheus.js");
    return;
  }
  F.registerGenerated({
  "id": "prometheus",
  "order": 20,
  "prefix": "pr",
  "title": "Monitoring with Prometheus & Grafana",
  "shortTitle": "Prometheus",
  "tagline": "Metrics that wake you before users do",
  "description": "Exporters, PromQL basics, alerting rules, and Grafana dashboards.",
  "badge": "New",
  "difficulty": "Intermediate",
  "category": "DevOps",
  "accent": "#F4B942"
}, [
  {
    "title": "Metrics Stack",
    "lessons": [
      {
        "title": "Prometheus architecture",
        "topic": "pull model",
        "steps": [
          "Explain scrape targets.",
          "Run Prometheus locally via Docker.",
          "Open the UI and check /targets."
        ]
      },
      {
        "title": "PromQL starter",
        "topic": "PromQL",
        "steps": [
          "Graph a rate() query.",
          "Use labels in selectors.",
          "Create a recording rule sketch."
        ]
      },
      {
        "title": "Grafana dashboard",
        "topic": "Grafana",
        "steps": [
          "Add Prometheus datasource.",
          "Build a 3-panel dashboard.",
          "Save and share the JSON mindset."
        ]
      }
    ]
  }
]);
})();
