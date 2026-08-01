/* Ashovix Labs — Redis Essentials */
(function () {
  const F = window.FORGE;
  if (!F || !F.registerGenerated) {
    console.error("course-helpers.js must load before course-redis.js");
    return;
  }
  F.registerGenerated({
  "id": "redis",
  "order": 6,
  "prefix": "rd",
  "title": "Redis Essentials",
  "shortTitle": "Redis",
  "tagline": "In-memory data structures for speed",
  "description": "Install Redis, master strings/lists/hashes/sets, TTLs, persistence basics, and caching patterns.",
  "badge": "New",
  "difficulty": "Beginner → Intermediate",
  "featured": true,
  "accent": "#F4B942",
  "category": "Databases"
}, [
  {
    "title": "Start with Redis",
    "lessons": [
      {
        "title": "What Redis is for",
        "topic": "caching and data structures",
        "steps": [
          "List cache vs primary store use cases.",
          "Name five Redis data types.",
          "Sketch a session-store architecture."
        ]
      },
      {
        "title": "Install & redis-cli",
        "topic": "Redis install",
        "steps": [
          "Install Redis (Windows via Memurai/WSL or Linux packages).",
          "Start the server.",
          "Ping with `redis-cli PING` expecting PONG."
        ]
      }
    ]
  },
  {
    "title": "Data structures",
    "lessons": [
      {
        "title": "Strings & TTL",
        "topic": "SET GET EXPIRE",
        "steps": [
          "SET a key.",
          "GET it.",
          "EXPIRE and watch TTL.",
          "Confirm deletion after expiry."
        ]
      },
      {
        "title": "Hashes lists sets",
        "topic": "HSET LPUSH SADD",
        "steps": [
          "Model a user profile with HASH.",
          "Use a LIST as a queue.",
          "Use a SET for unique tags."
        ]
      },
      {
        "title": "Caching pattern",
        "topic": "cache-aside",
        "steps": [
          "Write a pseudo-flow: read cache → miss → DB → set cache.",
          "Choose a TTL strategy.",
          "Document stampede risks."
        ]
      }
    ]
  }
]);
})();
