/* Ashovix Labs — MySQL Complete */
(function () {
  const F = window.FORGE;
  if (!F || !F.registerGenerated) {
    console.error("course-helpers.js must load before course-mysql.js");
    return;
  }
  F.registerGenerated({
  "id": "mysql",
  "order": 15,
  "prefix": "my",
  "title": "MySQL Complete",
  "shortTitle": "MySQL",
  "tagline": "MySQL for apps and operations",
  "description": "Install, InnoDB, SQL, users, dumps, and replication concepts.",
  "badge": "Updated",
  "difficulty": "Beginner → Intermediate",
  "category": "Databases",
  "accent": "#4DA3FF"
}, [
  {
    "title": "MySQL Core",
    "lessons": [
      {
        "title": "Install & connect",
        "topic": "MySQL install",
        "steps": [
          "Install MySQL Server.",
          "Secure root access.",
          "Create a database and user.",
          "Connect with mysql client."
        ]
      },
      {
        "title": "InnoDB & SQL practice",
        "topic": "InnoDB tables",
        "steps": [
          "Create InnoDB tables with FKs.",
          "Insert sample data.",
          "Explain and index a slow filter."
        ]
      },
      {
        "title": "Backup with mysqldump",
        "topic": "mysqldump",
        "steps": [
          "Dump a database.",
          "Restore into a new schema.",
          "Verify table counts."
        ]
      }
    ]
  }
]);
})();
