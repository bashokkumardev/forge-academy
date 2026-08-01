/* Ashovix Labs — Azure Fundamentals */
(function () {
  const F = window.FORGE;
  if (!F || !F.registerGenerated) {
    console.error("course-helpers.js must load before course-azure.js");
    return;
  }
  F.registerGenerated({
  "id": "azure",
  "order": 12,
  "prefix": "az",
  "title": "Azure Fundamentals",
  "shortTitle": "Azure",
  "tagline": "Microsoft Azure core services",
  "description": "Subscriptions, Resource Groups, VMs, Storage, Entra ID basics, and Azure SQL overview.",
  "badge": "New",
  "difficulty": "Beginner",
  "category": "Cloud",
  "accent": "#4DA3FF"
}, [
  {
    "title": "Azure Basics",
    "lessons": [
      {
        "title": "Portal & resource groups",
        "topic": "Azure organization",
        "steps": [
          "Create a resource group.",
          "Tag resources.",
          "Review cost alerts mindset."
        ]
      },
      {
        "title": "Compute & storage",
        "topic": "VMs and Blob",
        "steps": [
          "Create a VM checklist.",
          "Create a storage account.",
          "Upload a blob."
        ]
      }
    ]
  }
]);
})();
