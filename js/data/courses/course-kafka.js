/* Ashovix Labs — Apache Kafka */
(function () {
  const F = window.FORGE;
  if (!F || !F.registerGenerated) {
    console.error("course-helpers.js must load before course-kafka.js");
    return;
  }
  F.registerGenerated({
  "id": "kafka",
  "order": 27,
  "prefix": "kf",
  "title": "Apache Kafka",
  "shortTitle": "Kafka",
  "tagline": "Event streaming fundamentals",
  "description": "Topics, partitions, producers/consumers, offsets, and delivery semantics overview.",
  "badge": "New",
  "difficulty": "Intermediate → Advanced",
  "category": "Data",
  "accent": "#F4B942"
}, [
  {
    "title": "Streaming",
    "lessons": [
      {
        "title": "Kafka mental model",
        "topic": "logs partitions",
        "steps": [
          "Define topic and partition.",
          "Explain consumer groups.",
          "Sketch an order-events flow."
        ]
      },
      {
        "title": "Produce & consume",
        "topic": "clients",
        "steps": [
          "Run Kafka locally via Docker Compose checklist.",
          "Produce a message.",
          "Consume and commit offsets mindset."
        ]
      }
    ]
  }
]);
})();
