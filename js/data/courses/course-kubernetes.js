/* Ashovix Labs — Kubernetes */
(function () {
  const F = window.FORGE;
  if (!F || !F.registerGenerated) {
    console.error("course-helpers.js must load before course-kubernetes.js");
    return;
  }
  F.registerGenerated({
  "id": "kubernetes",
  "order": 9,
  "prefix": "k8",
  "title": "Kubernetes",
  "shortTitle": "Kubernetes",
  "tagline": "Orchestrate containers at scale",
  "description": "Pods, Deployments, Services, ConfigMaps, Ingress concepts, and kubectl daily workflow.",
  "badge": "Updated",
  "difficulty": "Intermediate → Advanced",
  "featured": true,
  "accent": "#2DD4BF",
  "category": "DevOps"
}, [
  {
    "title": "Cluster Basics",
    "lessons": [
      {
        "title": "K8s architecture",
        "topic": "control plane & nodes",
        "steps": [
          "Draw API server, etcd, scheduler, kubelet.",
          "Define Pod vs Deployment.",
          "Install kubectl and a local cluster (kind/minikube)."
        ]
      },
      {
        "title": "Deploy your first app",
        "topic": "kubectl apply",
        "steps": [
          "Write a Deployment YAML.",
          "Apply it.",
          "Expose with a Service.",
          "Port-forward and verify."
        ]
      },
      {
        "title": "Config & secrets mindset",
        "topic": "ConfigMaps Secrets",
        "steps": [
          "Create a ConfigMap.",
          "Mount as env.",
          "Document why secrets need encryption at rest."
        ]
      }
    ]
  }
]);
})();
