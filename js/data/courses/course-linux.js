/* Ashovix Labs — Linux Mastery */
(function () {
  const F = window.FORGE;
  if (!F || !F.registerGenerated) {
    console.error("course-helpers.js must load before course-linux.js");
    return;
  }
  F.registerGenerated({
  "id": "linux",
  "order": 7,
  "prefix": "lx",
  "title": "Linux Mastery",
  "shortTitle": "Linux",
  "tagline": "Command line, users, services, and automation",
  "description": "Filesystem, permissions, processes, networking basics, systemd, and shell productivity for engineers.",
  "badge": "Most Popular",
  "difficulty": "Beginner → Advanced",
  "featured": true,
  "accent": "#2DD4BF",
  "category": "Platform"
}, [
  {
    "title": "CLI Foundations",
    "lessons": [
      {
        "title": "Filesystem navigation",
        "topic": "paths and navigation",
        "steps": [
          "Open a terminal.",
          "Use pwd, ls -la, cd, mkdir, touch, cp, mv, rm carefully.",
          "Create a ~/forgelab workspace."
        ]
      },
      {
        "title": "Permissions & ownership",
        "topic": "chmod chown",
        "steps": [
          "Create a file and inspect with ls -l.",
          "Change mode with chmod.",
          "Explain u/g/o and rwx."
        ]
      },
      {
        "title": "Processes & resources",
        "topic": "ps top kill",
        "steps": [
          "List processes.",
          "Find a PID.",
          "Practice graceful stop vs kill."
        ]
      }
    ]
  },
  {
    "title": "Admin Basics",
    "lessons": [
      {
        "title": "Users and sudo",
        "topic": "user management",
        "steps": [
          "Create a practice user.",
          "Add to a group.",
          "Run a command with sudo and verify logs mindset."
        ]
      },
      {
        "title": "systemd services",
        "topic": "systemctl",
        "steps": [
          "Check a service status.",
          "Enable on boot.",
          "Read journalctl -u for errors."
        ]
      },
      {
        "title": "Networking tools",
        "topic": "ss curl dig",
        "steps": [
          "Inspect listening ports.",
          "curl a URL.",
          "Resolve a hostname."
        ]
      }
    ]
  }
]);
})();
