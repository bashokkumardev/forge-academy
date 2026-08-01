/* Ashovix Labs — Data Warehousing */
(function () {
  const F = window.FORGE;
  if (!F || !F.registerGenerated) {
    console.error("course-helpers.js must load before course-warehouse.js");
    return;
  }
  F.registerGenerated({
  "id": "warehouse",
  "order": 26,
  "prefix": "dw",
  "title": "Data Warehousing",
  "shortTitle": "Data Warehouse",
  "tagline": "Analytics modeling and pipelines",
  "description": "Star schemas, ETL vs ELT, slowly changing dimensions, and warehouse query patterns.",
  "difficulty": "Intermediate",
  "category": "Data",
  "accent": "#2DD4BF"
}, [
  {
    "title": "Warehouse Design",
    "lessons": [
      {
        "title": "OLTP vs OLAP",
        "topic": "workload differences",
        "steps": [
          "Compare latency needs.",
          "List typical query shapes.",
          "Choose a warehouse pattern."
        ]
      },
      {
        "title": "Star schema",
        "topic": "facts and dimensions",
        "steps": [
          "Design a sales fact.",
          "Add date/customer dims.",
          "Write two BI queries."
        ]
      }
    ]
  }
]);
})();
