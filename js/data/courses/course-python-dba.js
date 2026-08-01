/* Ashovix Labs — Python for DBAs */
(function () {
  const F = window.FORGE;
  if (!F || !F.registerGenerated) {
    console.error("course-helpers.js must load before course-python-dba.js");
    return;
  }
  F.registerGenerated({
  "id": "python-dba",
  "order": 16,
  "prefix": "py",
  "title": "Python for DBAs",
  "shortTitle": "Python",
  "tagline": "Automate database work with Python",
  "description": "Python basics, DB-API, scripts for health checks, exports, and simple ETL.",
  "badge": "New",
  "difficulty": "Beginner → Intermediate",
  "category": "Automation",
  "accent": "#2DD4BF"
}, [
  {
    "title": "Python Automation",
    "lessons": [
      {
        "title": "Python setup for ops",
        "topic": "venv and pip",
        "steps": [
          "Install Python.",
          "Create a venv.",
          "Install a DB driver.",
          "Run a hello script."
        ]
      },
      {
        "title": "Query databases from Python",
        "topic": "DB-API",
        "steps": [
          "Connect with parameters.",
          "Run SELECT and print rows.",
          "Use context managers for cleanup."
        ]
      },
      {
        "title": "Health-check script",
        "topic": "ops scripting",
        "steps": [
          "Ping connectivity.",
          "Check row counts.",
          "Write results to a log file."
        ]
      }
    ]
  }
]);
})();
