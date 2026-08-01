/* Ashovix Labs — multi-environment practice workspace catalog */
(function () {
  const WS = (window.FORGE.workspace = window.FORGE.workspace || {});

  WS.categories = ["Languages", "Databases", "Cloud", "DevOps"];

  WS.tools = [
    {
      id: "javascript",
      name: "JavaScript",
      category: "Languages",
      mode: "js",
      accent: "#F7DF1E",
      blurb: "Run JS live in your browser.",
      starter: `// Ashovix Labs · JavaScript workspace
const students = [
  { name: "Asha", score: 92 },
  { name: "Dev", score: 88 },
  { name: "Kai", score: 95 }
];

const top = students
  .filter((s) => s.score >= 90)
  .map((s) => s.name);

console.log("Top scorers:", top.join(", "));
console.log("Average:", students.reduce((a, s) => a + s.score, 0) / students.length);
`
    },
    {
      id: "typescript",
      name: "TypeScript",
      category: "Languages",
      mode: "js",
      accent: "#3178C6",
      blurb: "Practice TS-style JS (runs as JavaScript).",
      starter: `// TypeScript-style practice (runs as JS in-browser)
function greet(user) {
  return \`Hello, \${user.name} — welcome to Ashovix Labs\`;
}

const user = { name: "Ashok", role: "learner" };
console.log(greet(user));
console.log("Role:", user.role);
`
    },
    {
      id: "python",
      name: "Python",
      category: "Languages",
      mode: "python",
      accent: "#3776AB",
      blurb: "Practice Python with guided lab output.",
      starter: `# Ashovix Labs · Python workspace
numbers = [3, 1, 4, 1, 5, 9]
print("sorted:", sorted(numbers))
print("sum:", sum(numbers))
print("unique:", set(numbers))

for n in numbers:
    if n % 2:
        print(n, "is odd")
`
    },
    {
      id: "bash",
      name: "Bash / Shell",
      category: "Languages",
      mode: "shell",
      accent: "#4EAA25",
      blurb: "Practice common shell commands.",
      starter: `# Ashovix Labs · shell workspace
pwd
ls -la
echo "Building release..."
mkdir -p ~/ashovix/labs
cd ~/ashovix/labs
whoami
date
`
    },
    {
      id: "html",
      name: "HTML / CSS",
      category: "Languages",
      mode: "html",
      accent: "#E34F26",
      blurb: "Live preview HTML & CSS.",
      starter: `<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: system-ui; background: #07111A; color: #E8EEF5; padding: 2rem; }
    h1 { color: #4DA3FF; }
    .card { border: 1px solid #1e3a4f; border-radius: 12px; padding: 1rem; max-width: 360px; }
  </style>
</head>
<body>
  <div class="card">
    <h1>Ashovix Labs</h1>
    <p>HTML / CSS live preview workspace.</p>
  </div>
</body>
</html>
`
    },
    {
      id: "sql",
      name: "SQL (SQLite)",
      category: "Databases",
      mode: "sql",
      accent: "#336791",
      blurb: "Real SQLite engine in your browser.",
      starter: `-- Ashovix Labs · SQL workspace (SQLite)
CREATE TABLE IF NOT EXISTS courses (
  id INTEGER PRIMARY KEY,
  title TEXT,
  category TEXT,
  hours INTEGER
);

DELETE FROM courses;
INSERT INTO courses (title, category, hours) VALUES
  ('SQL Mastery', 'Databases', 20),
  ('MongoDB Pro', 'Databases', 16),
  ('Docker Essentials', 'DevOps', 12),
  ('AWS Cloud', 'Cloud', 18);

SELECT category, COUNT(*) AS courses, SUM(hours) AS total_hours
FROM courses
GROUP BY category
ORDER BY total_hours DESC;
`
    },
    {
      id: "postgresql",
      name: "PostgreSQL",
      category: "Databases",
      mode: "sql",
      accent: "#4169E1",
      blurb: "Postgres-style SQL (runs on in-browser SQLite).",
      starter: `-- PostgreSQL-style practice
CREATE TABLE IF NOT EXISTS employees (
  id INTEGER PRIMARY KEY,
  name TEXT,
  dept TEXT,
  salary INTEGER
);

DELETE FROM employees;
INSERT INTO employees (name, dept, salary) VALUES
  ('Riya', 'Data', 95000),
  ('Omar', 'Platform', 110000),
  ('Lee', 'Data', 88000);

SELECT dept, AVG(salary) AS avg_salary, COUNT(*) AS headcount
FROM employees
GROUP BY dept
HAVING COUNT(*) >= 1
ORDER BY avg_salary DESC;
`
    },
    {
      id: "mysql",
      name: "MySQL",
      category: "Databases",
      mode: "sql",
      accent: "#4479A1",
      blurb: "MySQL-style queries on in-browser SQLite.",
      starter: `CREATE TABLE IF NOT EXISTS orders (
  id INTEGER PRIMARY KEY,
  customer TEXT,
  amount REAL,
  status TEXT
);

DELETE FROM orders;
INSERT INTO orders (customer, amount, status) VALUES
  ('Acme', 1200.50, 'paid'),
  ('Globex', 890.00, 'pending'),
  ('Acme', 450.25, 'paid');

SELECT customer, SUM(amount) AS revenue
FROM orders
WHERE status = 'paid'
GROUP BY customer;
`
    },
    {
      id: "mongodb",
      name: "MongoDB",
      category: "Databases",
      mode: "mongo",
      accent: "#47A248",
      blurb: "Practice mongosh-style commands.",
      starter: `// mongosh-style practice
use ashovix
db.courses.insertMany([
  { title: "SQL Mastery", level: "beginner", hours: 20 },
  { title: "Kubernetes", level: "advanced", hours: 18 }
])
db.courses.find({ hours: { $gte: 18 } })
db.courses.aggregate([
  { $group: { _id: "$level", total: { $sum: 1 } } }
])
`
    },
    {
      id: "redis",
      name: "Redis",
      category: "Databases",
      mode: "redis",
      accent: "#DC382D",
      blurb: "Practice Redis CLI patterns.",
      starter: `SET user:1 "Ashok"
GET user:1
HSET course:sql title "SQL Mastery" hours 20
HGETALL course:sql
LPUSH queue:jobs "build" "deploy"
LRANGE queue:jobs 0 -1
INCR visits
`
    },
    {
      id: "oracle",
      name: "Oracle",
      category: "Databases",
      mode: "sql",
      accent: "#F80000",
      blurb: "Oracle-style SQL practice (SQLite engine).",
      starter: `CREATE TABLE IF NOT EXISTS dual_demo (
  id INTEGER PRIMARY KEY,
  label TEXT
);

DELETE FROM dual_demo;
INSERT INTO dual_demo (label) VALUES ('X');
SELECT id, label FROM dual_demo;
`
    },
    {
      id: "db2",
      name: "IBM Db2",
      category: "Databases",
      mode: "sql",
      accent: "#054ADA",
      blurb: "Db2-style SQL practice (SQLite engine).",
      starter: `CREATE TABLE IF NOT EXISTS emp (
  empno INTEGER PRIMARY KEY,
  firstnme TEXT,
  salary INTEGER
);

DELETE FROM emp;
INSERT INTO emp (empno, firstnme, salary) VALUES
  (10, 'CHRISTINE', 52750),
  (20, 'MICHAEL', 73800);

SELECT firstnme, salary FROM emp WHERE salary > 60000;
`
    },
    {
      id: "aws",
      name: "AWS CLI",
      category: "Cloud",
      mode: "cloud",
      accent: "#FF9900",
      blurb: "Practice common AWS CLI commands.",
      starter: `aws sts get-caller-identity
aws s3 ls
aws ec2 describe-instances --query "Reservations[].Instances[].InstanceId"
aws lambda list-functions --max-items 5
`
    },
    {
      id: "azure",
      name: "Azure CLI",
      category: "Cloud",
      mode: "cloud",
      accent: "#0078D4",
      blurb: "Practice Azure CLI workflows.",
      starter: `az account show
az group list -o table
az vm list -d -o table
az storage account list -o table
`
    },
    {
      id: "gcp",
      name: "Google Cloud",
      category: "Cloud",
      mode: "cloud",
      accent: "#4285F4",
      blurb: "Practice gcloud commands.",
      starter: `gcloud config list
gcloud projects list
gcloud compute instances list
gcloud storage ls
`
    },
    {
      id: "docker",
      name: "Docker",
      category: "DevOps",
      mode: "shell",
      accent: "#2496ED",
      blurb: "Practice Docker CLI.",
      starter: `docker version
docker images
docker ps -a
docker compose up -d
docker logs ashovix-api --tail 20
`
    },
    {
      id: "kubernetes",
      name: "Kubernetes",
      category: "DevOps",
      mode: "shell",
      accent: "#326CE5",
      blurb: "Practice kubectl workflows.",
      starter: `kubectl get nodes
kubectl get pods -A
kubectl get svc
kubectl apply -f deploy.yaml
kubectl rollout status deployment/ashovix-api
`
    },
    {
      id: "terraform",
      name: "Terraform",
      category: "DevOps",
      mode: "shell",
      accent: "#7B42BC",
      blurb: "Practice Terraform commands.",
      starter: `terraform init
terraform plan
terraform apply -auto-approve
terraform state list
`
    },
    {
      id: "git",
      name: "Git",
      category: "DevOps",
      mode: "shell",
      accent: "#F05032",
      blurb: "Practice Git workflows.",
      starter: `git status
git branch -vv
git log --oneline -5
git checkout -b feature/workspace
git add .
git commit -m "feat: practice workspace"
`
    },
    {
      id: "linux",
      name: "Linux Admin",
      category: "DevOps",
      mode: "shell",
      accent: "#FCC624",
      blurb: "Practice Linux admin commands.",
      starter: `uname -a
df -h
free -m
ps aux | head
systemctl status nginx
`
    }
  ];

  WS.byId = function (id) {
    return WS.tools.find((t) => t.id === id) || WS.tools[0];
  };
})();
