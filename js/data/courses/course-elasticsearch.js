/* Ashovix Labs — ElasticSearch */
(function () {
  const F = window.FORGE;
  if (!F || !F.registerGenerated) {
    console.error("course-helpers.js must load before course-elasticsearch.js");
    return;
  }
  F.registerGenerated({
  "id": "elasticsearch",
  "order": 28,
  "prefix": "es",
  "title": "ElasticSearch",
  "shortTitle": "Elasticsearch",
  "tagline": "Search and analytics engine basics",
  "description": "Indexes, mappings, queries, aggregations, and when to use ES beside your DB.",
  "difficulty": "Intermediate",
  "category": "Data",
  "accent": "#4DA3FF"
}, [
  {
    "title": "Search Basics",
    "lessons": [
      {
        "title": "Indexes & documents",
        "topic": "Elasticsearch model",
        "steps": [
          "Run ES via Docker.",
          "Index a document.",
          "GET it by id."
        ]
      },
      {
        "title": "Query DSL",
        "topic": "search queries",
        "steps": [
          "Match query.",
          "Filter context.",
          "Simple aggregation."
        ]
      }
    ]
  }
]);
})();
