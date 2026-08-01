/* Ashovix Labs — Bash Scripting */
(function () {
  const F = window.FORGE;
  if (!F || !F.registerGenerated) {
    console.error("course-helpers.js must load before course-bash.js");
    return;
  }
  F.registerGenerated({
  "id": "bash",
  "order": 17,
  "prefix": "sh",
  "title": "Bash Scripting",
  "shortTitle": "Bash",
  "tagline": "Shell scripts that survive production",
  "description": "Variables, loops, exit codes, set -euo pipefail, cron, and safe automation patterns.",
  "difficulty": "Beginner → Intermediate",
  "category": "Platform",
  "accent": "#F4B942"
}, [
  {
    "title": "Shell Scripting",
    "lessons": [
      {
        "title": "First script",
        "topic": "bash basics",
        "steps": [
          "Write a .sh file with shebang.",
          "chmod +x.",
          "Use variables and quotes.",
          "Run it."
        ]
      },
      {
        "title": "Safe scripting flags",
        "topic": "set -euo pipefail",
        "steps": [
          "Add strict mode.",
          "Handle missing args.",
          "Return meaningful exit codes."
        ]
      },
      {
        "title": "Schedule with cron",
        "topic": "cron",
        "steps": [
          "Write a backup-style script.",
          "Add a crontab entry.",
          "Verify logs."
        ]
      }
    ]
  }
]);
})();
