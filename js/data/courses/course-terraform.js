/* Ashovix Labs — Terraform */
(function () {
  const F = window.FORGE;
  if (!F || !F.registerGenerated) {
    console.error("course-helpers.js must load before course-terraform.js");
    return;
  }
  F.registerGenerated({
  "id": "terraform",
  "order": 10,
  "prefix": "tf",
  "title": "Terraform",
  "shortTitle": "Terraform",
  "tagline": "Infrastructure as code",
  "description": "Providers, resources, state, modules, and safe plan/apply workflows.",
  "badge": "New",
  "difficulty": "Intermediate",
  "category": "DevOps",
  "accent": "#F4B942"
}, [
  {
    "title": "IaC Foundations",
    "lessons": [
      {
        "title": "Install Terraform",
        "topic": "terraform CLI",
        "steps": [
          "Install Terraform.",
          "Run `terraform version`.",
          "Create a working folder with main.tf."
        ]
      },
      {
        "title": "Plan & apply lifecycle",
        "topic": "init plan apply",
        "steps": [
          "Write a simple local or cloud resource stub.",
          "terraform init.",
          "terraform plan.",
          "terraform apply with review."
        ]
      },
      {
        "title": "State & modules",
        "topic": "state management",
        "steps": [
          "Inspect state list.",
          "Extract a reusable module.",
          "Document remote state benefits."
        ]
      }
    ]
  }
]);
})();
