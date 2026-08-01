/**
 * Ashovix Labs — CourseLogo
 * Local SVG logos (Simple Icons / Devicon-compatible marks) with brand glow.
 *
 * CourseLogo("postgresql")
 * CourseLogo.render("aws", { lazy: true })
 * CourseLogo.forCourse(course)
 */
(function (global) {
  const BASE = "assets/logos";

  const TECH = {
    sql: { label: "SQL", color: "#4DA3FF", inline: true },
    postgresql: { label: "PostgreSQL", color: "#4169E1", file: "postgresql.svg" },
    mysql: { label: "MySQL", color: "#4479A1", file: "mysql.svg" },
    mongodb: { label: "MongoDB", color: "#47A248", file: "mongodb.svg" },
    redis: { label: "Redis", color: "#FF4438", file: "redis.svg" },
    db2: { label: "IBM Db2", color: "#0F62FE", file: "ibm.svg" },
    oracle: { label: "Oracle", color: "#F80000", file: "oracle.svg" },
    git: { label: "Git", color: "#F05032", file: "git.svg" },
    github: { label: "GitHub", color: "#E6EDF3", file: "github.svg" },
    linux: { label: "Linux", color: "#FCC624", file: "linux.svg" },
    docker: { label: "Docker", color: "#2496ED", file: "docker.svg" },
    kubernetes: { label: "Kubernetes", color: "#326CE5", file: "kubernetes.svg" },
    terraform: { label: "Terraform", color: "#7B42BC", file: "terraform.svg" },
    aws: { label: "AWS", color: "#FF9900", file: "aws.svg" },
    azure: { label: "Azure", color: "#0078D4", file: "azure.svg" },
    gcp: { label: "Google Cloud", color: "#4285F4", file: "googlecloud.svg" },
    devops: { label: "DevOps", color: "#2DD4BF", inline: "devops" },
    githubactions: { label: "GitHub Actions", color: "#2088FF", file: "githubactions.svg" },
    bash: { label: "Bash", color: "#4EAA25", inline: "bash" },
    python: { label: "Python", color: "#3776AB", file: "python.svg" },
    nodejs: { label: "Node.js", color: "#5FA04E", file: "nodedotjs.svg" },
    express: { label: "Express.js", color: "#E6EDF3", file: "express.svg" },
    nestjs: { label: "NestJS", color: "#E0234E", file: "nestjs.svg" },
    rest: { label: "REST API", color: "#4DA3FF", inline: "rest" },
    graphql: { label: "GraphQL", color: "#E10098", file: "graphql.svg" },
    kafka: { label: "Apache Kafka", color: "#E6EDF3", file: "apachekafka.svg" },
    rabbitmq: { label: "RabbitMQ", color: "#FF6600", file: "rabbitmq.svg" },
    elasticsearch: { label: "Elasticsearch", color: "#00BFB3", file: "elasticsearch.svg" },
    prometheus: { label: "Prometheus", color: "#E6522C", file: "prometheus.svg" },
    grafana: { label: "Grafana", color: "#F46800", file: "grafana.svg" },
    nginx: { label: "NGINX", color: "#009639", file: "nginx.svg" },
    jenkins: { label: "Jenkins", color: "#D24939", file: "jenkins.svg" },
    ansible: { label: "Ansible", color: "#EE0000", file: "ansible.svg" },
    cicd: { label: "CI/CD", color: "#4DA3FF", inline: "cicd" },
    ai: { label: "AI", color: "#A78BFA", inline: "ai" },
    ml: { label: "Machine Learning", color: "#2DD4BF", inline: "ml" },
    systemdesign: { label: "System Design", color: "#F4B942", inline: "systemdesign" },
    database: { label: "Database", color: "#4DA3FF", inline: "sql" },
    warehouse: { label: "Data Warehouse", color: "#2DD4BF", inline: "warehouse" }
  };

  const INLINE = {
    sql: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><ellipse cx="32" cy="14" rx="20" ry="8" fill="currentColor"/><path d="M12 14v28c0 4.4 9 8 20 8s20-3.6 20-8V14" stroke="currentColor" stroke-width="4" fill="none"/><path d="M12 28c0 4.4 9 8 20 8s20-3.6 20-8M12 40c0 4.4 9 8 20 8s20-3.6 20-8" stroke="currentColor" stroke-width="4" fill="none"/></svg>`,
    devops: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M18 32c0-7.7 6.3-14 14-14h2c5.5 0 10 4.5 10 10v2" stroke="currentColor" stroke-width="4" stroke-linecap="round"/><path d="M46 32c0 7.7-6.3 14-14 14h-2c-5.5 0-10-4.5-10-10v-2" stroke="currentColor" stroke-width="4" stroke-linecap="round" opacity=".85"/><circle cx="20" cy="32" r="5" fill="currentColor"/><circle cx="44" cy="32" r="5" fill="currentColor"/></svg>`,
    bash: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><rect x="6" y="10" width="52" height="44" rx="8" stroke="currentColor" stroke-width="3" opacity=".55"/><path d="M16 28l8 6-8 6M28 40h14" stroke="currentColor" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
    rest: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><circle cx="16" cy="32" r="8" stroke="currentColor" stroke-width="3"/><circle cx="48" cy="18" r="7" stroke="currentColor" stroke-width="3"/><circle cx="48" cy="46" r="7" stroke="currentColor" stroke-width="3"/><path d="M23 29l18-8M23 35l18 8" stroke="currentColor" stroke-width="3" stroke-linecap="round" opacity=".7"/></svg>`,
    cicd: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><rect x="8" y="12" width="16" height="12" rx="3" fill="currentColor"/><rect x="24" y="26" width="16" height="12" rx="3" fill="currentColor" opacity=".8"/><rect x="40" y="40" width="16" height="12" rx="3" fill="currentColor" opacity=".6"/><path d="M24 18h8v14M40 32h8v14" stroke="currentColor" stroke-width="3" opacity=".5"/></svg>`,
    ai: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><rect x="14" y="14" width="36" height="36" rx="8" stroke="currentColor" stroke-width="3"/><circle cx="32" cy="32" r="8" fill="currentColor"/><path d="M32 8v6M32 50v6M8 32h6M50 32h6M14 14l4 4M46 46l4 4M46 14l-4 4M18 46l-4 4" stroke="currentColor" stroke-width="3" stroke-linecap="round"/></svg>`,
    ml: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><circle cx="14" cy="18" r="5" fill="currentColor"/><circle cx="14" cy="46" r="5" fill="currentColor"/><circle cx="32" cy="32" r="6" fill="currentColor"/><circle cx="50" cy="18" r="5" fill="currentColor"/><circle cx="50" cy="46" r="5" fill="currentColor"/><path d="M18 20l10 9M18 44l10-9M38 29l8-8M38 35l8 8" stroke="currentColor" stroke-width="2.5" opacity=".7"/></svg>`,
    systemdesign: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><rect x="22" y="6" width="20" height="14" rx="3" stroke="currentColor" stroke-width="3"/><rect x="6" y="40" width="20" height="14" rx="3" stroke="currentColor" stroke-width="3"/><rect x="38" y="40" width="20" height="14" rx="3" stroke="currentColor" stroke-width="3"/><path d="M32 20v10M16 40V34h32v6" stroke="currentColor" stroke-width="3" opacity=".7"/></svg>`,
    warehouse: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M8 28L32 12l24 16v24H8V28z" stroke="currentColor" stroke-width="3" fill="none"/><path d="M24 52V36h16v16" stroke="currentColor" stroke-width="3"/></svg>`
  };

  const COURSE_MAP = {
    sql: "sql", postgres: "postgresql", mongo: "mongodb", redis: "redis", db2: "db2",
    oracle: "oracle", git: "git", linux: "linux", docker: "docker", kubernetes: "kubernetes",
    terraform: "terraform", aws: "aws", azure: "azure", gcp: "gcp", mysql: "mysql",
    "python-dba": "python", bash: "bash", devops: "devops", cicd: "githubactions",
    prometheus: "prometheus", rest: "rest", graphql: "graphql", nodejs: "nodejs",
    "system-design": "systemdesign", "db-perf": "database", warehouse: "warehouse",
    kafka: "kafka", elasticsearch: "elasticsearch", rabbitmq: "rabbitmq"
  };

  function normalize(tech) {
    return String(tech || "").trim().toLowerCase().replace(/\s+/g, "")
      .replace(/^postgres$/, "postgresql").replace(/^mongo$/, "mongodb")
      .replace(/^k8s$/, "kubernetes").replace(/^node$/, "nodejs")
      .replace(/^amazon$/, "aws").replace(/^googlecloud$/, "gcp")
      .replace(/^github-actions$/, "githubactions").replace(/^system-design$/, "systemdesign");
  }

  function resolveTech(techOrCourseId) {
    const key = normalize(techOrCourseId);
    if (TECH[key]) return key;
    if (COURSE_MAP[key]) return COURSE_MAP[key];
    if (COURSE_MAP[techOrCourseId]) return COURSE_MAP[techOrCourseId];
    return "database";
  }

  function render(technology, opts) {
    opts = opts || {};
    const key = resolveTech(technology);
    const meta = TECH[key] || TECH.database;
    const color = meta.color || "#4DA3FF";
    const label = meta.label || key;
    const lazy = opts.lazy !== false;
    let inner;

    if (meta.file) {
      const loading = lazy ? "lazy" : "eager";
      // Empty alt — visible SVG; aria-label on wrapper avoids broken-image text flash
      inner = `<img class="course-logo-img" src="${BASE}/${meta.file}" alt="" width="56" height="56" loading="${loading}" decoding="async" />`;
    } else {
      const svgKey = meta.inline === true ? key : meta.inline;
      inner = `<span class="course-logo-svg">${INLINE[svgKey] || INLINE.sql}</span>`;
    }

    const extra = opts.className ? ` ${opts.className}` : "";
    return `<span class="course-logo${extra}" data-tech="${key}" style="--logo-glow:${color};color:${color}" title="${label}" role="img" aria-label="${label}">${inner}</span>`;
  }

  function forCourse(course) {
    return render((course && (course.logo || course.technology || course.id)) || "database", { lazy: true });
  }

  function CourseLogo(technology, opts) {
    return render(technology, opts);
  }
  Object.assign(CourseLogo, { TECH, COURSE_MAP, render, forCourse, resolveTech });
  global.CourseLogo = CourseLogo;
  if (global.FORGE) global.FORGE.CourseLogo = CourseLogo;
})(typeof window !== "undefined" ? window : globalThis);
