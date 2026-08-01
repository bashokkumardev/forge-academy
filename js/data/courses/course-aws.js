/* Ashovix Labs — AWS Cloud Practitioner */
(function () {
  const F = window.FORGE;
  if (!F || !F.registerGenerated) {
    console.error("course-helpers.js must load before course-aws.js");
    return;
  }
  F.registerGenerated({
  "id": "aws",
  "order": 11,
  "prefix": "aw",
  "title": "AWS Cloud Practitioner",
  "shortTitle": "AWS",
  "tagline": "Core AWS services for builders",
  "description": "IAM, EC2, S3, VPC basics, RDS overview, and Well-Architected thinking.",
  "badge": "Best Seller",
  "difficulty": "Beginner → Intermediate",
  "featured": true,
  "category": "Cloud",
  "accent": "#F4B942"
}, [
  {
    "title": "AWS Core",
    "lessons": [
      {
        "title": "Accounts & IAM mindset",
        "topic": "IAM",
        "steps": [
          "Enable MFA on root (checklist).",
          "Create an admin IAM user pattern.",
          "Practice least privilege policy reading."
        ]
      },
      {
        "title": "EC2 & S3 essentials",
        "topic": "compute and storage",
        "steps": [
          "Launch a free-tier friendly instance checklist.",
          "Create an S3 bucket with block public access.",
          "Upload and retrieve an object."
        ]
      },
      {
        "title": "VPC mental model",
        "topic": "networking",
        "steps": [
          "Draw public/private subnets.",
          "Explain security groups vs NACLs.",
          "Map a simple 3-tier layout."
        ]
      }
    ]
  }
]);
})();
