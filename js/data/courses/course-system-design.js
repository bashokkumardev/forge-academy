/* Ashovix Labs — System Design Basics */
(function () {
  const F = window.FORGE;
  if (!F || !F.registerGenerated) {
    console.error("course-helpers.js must load before course-system-design.js");
    return;
  }
  F.registerGenerated({
  "id": "system-design",
  "order": 24,
  "prefix": "sd",
  "title": "System Design Basics",
  "shortTitle": "System Design",
  "tagline": "Scalable systems without the buzzword fog",
  "description": "Load balancing, caching, queues, data partitioning, and trade-off drills.",
  "badge": "Best Seller",
  "difficulty": "Intermediate → Advanced",
  "featured": true,
  "category": "Architecture",
  "accent": "#F4B942"
}, [
  {
    "title": "Design Foundations",
    "lessons": [
      {
        "title": "Clarify requirements",
        "topic": "functional vs non-functional",
        "steps": [
          "Write FR/NFR for a URL shortener.",
          "Estimate QPS and storage roughly.",
          "List constraints."
        ]
      },
      {
        "title": "Building blocks",
        "topic": "LB cache queue DB",
        "steps": [
          "Place a load balancer.",
          "Add a cache tier.",
          "Decide SQL vs NoSQL for the use case."
        ]
      },
      {
        "title": "Failure modes",
        "topic": "reliability",
        "steps": [
          "List SPOFs.",
          "Add redundancy.",
          "Define a simple SLO."
        ]
      }
    ]
  }
]);
})();
