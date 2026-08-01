/* Ashovix Labs — Docker Complete */
(function () {
  const F = window.FORGE;
  if (!F || !F.registerGenerated) {
    console.error("course-helpers.js must load before course-docker.js");
    return;
  }
  F.registerGenerated({
  "id": "docker",
  "order": 8,
  "prefix": "dk",
  "title": "Docker Complete",
  "shortTitle": "Docker",
  "tagline": "Containers from first image to Compose",
  "description": "Images, containers, volumes, networks, Dockerfiles, multi-stage builds, and Compose stacks.",
  "badge": "Most Popular",
  "difficulty": "Beginner → Intermediate",
  "featured": true,
  "accent": "#4DA3FF",
  "category": "DevOps"
}, [
  {
    "title": "Containers 101",
    "lessons": [
      {
        "title": "Install Docker Desktop / Engine",
        "topic": "Docker install",
        "steps": [
          "Install Docker for your OS.",
          "Start the engine.",
          "Run `docker version` and `docker run hello-world`."
        ]
      },
      {
        "title": "Images vs containers",
        "topic": "docker run",
        "steps": [
          "Pull nginx.",
          "Run it mapped to port 8080.",
          "Exec into the container and curl localhost."
        ]
      },
      {
        "title": "Volumes & networks",
        "topic": "persistence and networking",
        "steps": [
          "Create a named volume.",
          "Attach it to a container.",
          "Create a user-defined bridge network and attach two containers."
        ]
      }
    ]
  },
  {
    "title": "Build & Compose",
    "lessons": [
      {
        "title": "Write a Dockerfile",
        "topic": "Dockerfile",
        "steps": [
          "Create a tiny Node or static app.",
          "Write FROM, WORKDIR, COPY, RUN, CMD.",
          "Build and run the image."
        ]
      },
      {
        "title": "Docker Compose",
        "topic": "compose.yml",
        "steps": [
          "Define app + database services.",
          "Use depends_on and env files.",
          "Up, logs, down, and verify data volume."
        ]
      }
    ]
  }
]);
})();
