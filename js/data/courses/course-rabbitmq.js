/* Ashovix Labs — RabbitMQ */
(function () {
  const F = window.FORGE;
  if (!F || !F.registerGenerated) {
    console.error("course-helpers.js must load before course-rabbitmq.js");
    return;
  }
  F.registerGenerated({
  "id": "rabbitmq",
  "order": 29,
  "prefix": "rq",
  "title": "RabbitMQ",
  "shortTitle": "RabbitMQ",
  "tagline": "Reliable messaging with queues",
  "description": "Exchanges, queues, bindings, ack/nack, and dead-letter patterns.",
  "badge": "New",
  "difficulty": "Intermediate",
  "category": "Backend",
  "accent": "#2DD4BF"
}, [
  {
    "title": "Messaging",
    "lessons": [
      {
        "title": "Broker concepts",
        "topic": "AMQP basics",
        "steps": [
          "Define producer/queue/consumer.",
          "Run RabbitMQ management Docker.",
          "Create a queue in the UI."
        ]
      },
      {
        "title": "Ack and retries",
        "topic": "delivery safety",
        "steps": [
          "Publish a message.",
          "Consume with manual ack.",
          "Configure a DLQ pattern sketch."
        ]
      }
    ]
  }
]);
})();
