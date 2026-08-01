/**
 * Ashovix Labs — CourseLogo (vanilla JS)
 * Official / high-quality SVG logos via Simple Icons & Devicon CDNs,
 * plus crisp inline SVGs when no trademark SVG is appropriate.
 *
 * Usage:
 *   CourseLogo("postgresql")
 *   CourseLogo.render("docker", { lazy: true })
 */
(function (global) {
  const CDN_SI = "https://cdn.simpleicons.org";
  const CDN_DI = "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons";

  /** @type {Record<string, { color: string, label: string, si?: string, di?: string, inline?: string }>} */
  const TECH = {
    sql: {
      label: "SQL",
      color: "#4DA3FF",
      inline: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><ellipse cx="32" cy="14" rx="20" ry="8" fill="#4DA3FF"/><path d="M12 14v28c0 4.4 9 8 20 8s20-3.6 20-8V14" stroke="#4DA3FF" stroke-width="4" fill="none"/><path d="M12 28c0 4.4 9 8 20 8s20-3.6 20-8M12 40c0 4.4 9 8 20 8s20-3.6 20-8" stroke="#4DA3FF" stroke-width="4" fill="none"/></svg>`
    },
    postgresql: { label: "PostgreSQL", color: "#4169E1", si: "postgresql", di: "postgresql/postgresql-original.svg" },
    mysql: { label: "MySQL", color: "#4479A1", si: "mysql", di: "mysql/mysql-original.svg" },
    mongodb: { label: "MongoDB", color: "#47A248", si: "mongodb", di: "mongodb/mongodb-original.svg" },
    redis: { label: "Redis", color: "#FF4438", si: "redis", di: "redis/redis-original.svg" },
    db2: { label: "IBM Db2", color: "#054ADA", si: "ibm" },
    oracle: { label: "Oracle", color: "#F80000", si: "oracle" },
    git: { label: "Git", color: "#F05032", si: "git", di: "git/git-original.svg" },
    github: { label: "GitHub", color: "#E6EDF3", si: "github" },
    linux: { label: "Linux", color: "#FCC624", si: "linux", di: "linux/linux-original.svg" },
    docker: { label: "Docker", color: "#2496ED", si: "docker", di: "docker/docker-original.svg" },
    kubernetes: { label: "Kubernetes", color: "#326CE5", si: "kubernetes", di: "kubernetes/kubernetes-original.svg" },
    terraform: { label: "Terraform", color: "#7B42BC", si: "terraform", di: "terraform/terraform-original.svg" },
    aws: { label: "AWS", color: "#FF9900", si: "amazonaws" },
    azure: { label: "Azure", color: "#0078D4", si: "microsoftazure", di: "azure/azure-original.svg" },
    gcp: { label: "Google Cloud", color: "#4285F4", si: "googlecloud", di: "googlecloud/googlecloud-original.svg" },
    devops: {
      label: "DevOps",
      color: "#2DD4BF",
      inline: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M18 32c0-7.7 6.3-14 14-14h2c5.5 0 10 4.5 10 10v2" stroke="#2DD4BF" stroke-width="4" stroke-linecap="round"/><path d="M46 32c0 7.7-6.3 14-14 14h-2c-5.5 0-10-4.5-10-10v-2" stroke="#4DA3FF" stroke-width="4" stroke-linecap="round"/><circle cx="20" cy="32" r="5" fill="#2DD4BF"/><circle cx="44" cy="32" r="5" fill="#4DA3FF"/></svg>`
    },
    githubactions: { label: "GitHub Actions", color: "#2088FF", si: "githubactions" },
    bash: {
      label: "Bash / Terminal",
      color: "#4EAA25",
      si: "gnubash",
      inline: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><rect x="6" y="10" width="52" height="44" rx="8" stroke="#94A3B8" stroke-width="3"/><path d="M16 28l8 6-8 6M28 40h14" stroke="#4EAA25" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`
    },
    python: { label: "Python", color: "#3776AB", si: "python", di: "python/python-original.svg" },
    nodejs: { label: "Node.js", color: "#5FA04E", si: "nodedotjs", di: "nodejs/nodejs-original.svg" },
    express: { label: "Express.js", color: "#E6EDF3", si: "express" },
    nestjs: { label: "NestJS", color: "#E0234E", si: "nestjs" },
    rest: {
      label: "REST API",
      color: "#4DA3FF",
      inline: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><circle cx="16" cy="32" r="8" stroke="#4DA3FF" stroke-width="3"/><circle cx="48" cy="18" r="7" stroke="#2DD4BF" stroke-width="3"/><circle cx="48" cy="46" r="7" stroke="#F4B942" stroke-width="3"/><path d="M23 29l18-8M23 35l18 8" stroke="#94A3B8" stroke-width="3" stroke-linecap="round"/></svg>`
    },
    graphql: { label: "GraphQL", color: "#E10098", si: "graphql", di: "graphql/graphql-plain.svg" },
    kafka: { label: "Apache Kafka", color: "#E6EDF3", si: "apachekafka" },
    rabbitmq: { label: "RabbitMQ", color: "#FF6600", si: "rabbitmq" },
    elasticsearch: { label: "Elasticsearch", color: "#00BFB3", si: "elasticsearch" },
    prometheus: { label: "Prometheus", color: "#E6522C", si: "prometheus" },
    grafana: { label: "Grafana", color: "#F46800", si: "grafana" },
    nginx: { label: "NGINX", color: "#009639", si: "nginx", di: "nginx/nginx-original.svg" },
    jenkins: { label: "Jenkins", color: "#D24939", si: "jenkins", di: "jenkins/jenkins-original.svg" },
    ansible: { label: "Ansible", color: "#EE0000", si: "ansible", di: "ansible/ansible-original.svg" },
    cicd: {
      label: "CI/CD",
      color: "#4DA3FF",
      inline: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><rect x="8" y="12" width="16" height="12" rx="3" fill="#4DA3FF"/><rect x="24" y="26" width="16" height="12" rx="3" fill="#2DD4BF"/><rect x="40" y="40" width="16" height="12" rx="3" fill="#F4B942"/><path d="M24 18h8v14M40 32h8v14" stroke="#94A3B8" stroke-width="3"/></svg>`
    },
    ai: {
      label: "AI",
      color: "#A78BFA",
      inline: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><rect x="14" y="14" width="36" height="36" rx="8" stroke="#A78BFA" stroke-width="3"/><circle cx="32" cy="32" r="8" fill="#A78BFA"/><path d="M32 8v6M32 50v6M8 32h6M50 32h6M14 14l4 4M46 46l4 4M46 14l-4 4M18 46l-4 4" stroke="#A78BFA" stroke-width="3" stroke-linecap="round"/></svg>`
    },
    ml: {
      label: "Machine Learning",
      color: "#2DD4BF",
      inline: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><circle cx="14" cy="18" r="5" fill="#4DA3FF"/><circle cx="14" cy="46" r="5" fill="#4DA3FF"/><circle cx="32" cy="32" r="6" fill="#2DD4BF"/><circle cx="50" cy="18" r="5" fill="#F4B942"/><circle cx="50" cy="46" r="5" fill="#F4B942"/><path d="M18 20l10 9M18 44l10-9M38 29l8-8M38 35l8 8" stroke="#94A3B8" stroke-width="2.5"/></svg>`
    },
    systemdesign: {
      label: "System Design",
      color: "#F4B942",
      inline: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><rect x="22" y="6" width="20" height="14" rx="3" stroke="#F4B942" stroke-width="3"/><rect x="6" y="40" width="20" height="14" rx="3" stroke="#4DA3FF" stroke-width="3"/><rect x="38" y="40" width="20" height="14" rx="3" stroke="#2DD4BF" stroke-width="3"/><path d="M32 20v10M16 40V34h32v6" stroke="#94A3B8" stroke-width="3"/></svg>`
    },
    database: {
      label: "Database",
      color: "#4DA3FF",
      inline: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><ellipse cx="32" cy="14" rx="20" ry="8" fill="#4DA3FF"/><path d="M12 14v28c0 4.4 9 8 20 8s20-3.6 20-8V14" stroke="#4DA3FF" stroke-width="4" fill="none"/><path d="M12 28c0 4.4 9 8 20 8s20-3.6 20-8M12 40c0 4.4 9 8 20 8s20-3.6 20-8" stroke="#4DA3FF" stroke-width="4" fill="none"/></svg>`
    },
    warehouse: {
      label: "Data Warehouse",
      color: "#2DD4BF",
      inline: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M8 28L32 12l24 16v24H8V28z" stroke="#2DD4BF" stroke-width="3" fill="none"/><path d="M24 52V36h16v16" stroke="#4DA3FF" stroke-width="3"/></svg>`
    }
  };

  /** Course id → logo technology key */
  const COURSE_MAP = {
    sql: "sql",
    postgres: "postgresql",
    mongo: "mongodb",
    redis: "redis",
    db2: "db2",
    oracle: "oracle",
    git: "git",
    linux: "linux",
    docker: "docker",
    kubernetes: "kubernetes",
    terraform: "terraform",
    aws: "aws",
    azure: "azure",
    gcp: "gcp",
    mysql: "mysql",
    "python-dba": "python",
    bash: "bash",
    devops: "devops",
    cicd: "githubactions",
    prometheus: "prometheus",
    rest: "rest",
    graphql: "graphql",
    nodejs: "nodejs",
    "system-design": "systemdesign",
    "db-perf": "database",
    warehouse: "warehouse",
    kafka: "kafka",
    elasticsearch: "elasticsearch",
    rabbitmq: "rabbitmq"
  };

  function normalize(tech) {
    return String(tech || "")
      .trim()
      .toLowerCase()
      .replace(/\s+/g, "")
      .replace(/\.js$/i, "js")
      .replace(/^node$/, "nodejs")
      .replace(/^k8s$/, "kubernetes")
      .replace(/^postgres$/, "postgresql")
      .replace(/^mongo$/, "mongodb")
      .replace(/^amazon$/, "aws")
      .replace(/^googlecloud$/, "gcp")
      .replace(/^ghactions$/, "githubactions")
      .replace(/^github-actions$/, "githubactions")
      .replace(/^system-design$/, "systemdesign")
      .replace(/^machinelearning$/, "ml")
      .replace(/^openai$/, "ai");
  }

  function resolveTech(techOrCourseId) {
    const key = normalize(techOrCourseId);
    if (TECH[key]) return key;
    if (COURSE_MAP[key]) return COURSE_MAP[key];
    if (COURSE_MAP[techOrCourseId]) return COURSE_MAP[techOrCourseId];
    return "database";
  }

  function imgTag(src, label, lazy) {
    const loading = lazy === false ? "eager" : "lazy";
    return `<img class="course-logo-img" src="${src}" alt="${label} logo" width="56" height="56" loading="${loading}" decoding="async" referrerpolicy="no-referrer" />`;
  }

  /**
   * @param {string} technology course id or tech key
   * @param {{ lazy?: boolean, className?: string }} [opts]
   */
  function render(technology, opts) {
    opts = opts || {};
    const key = resolveTech(technology);
    const meta = TECH[key] || TECH.database;
    const color = meta.color || "#4DA3FF";
    const label = meta.label || key;
    const lazy = opts.lazy !== false;

    let inner = "";
    // Prefer Devicon original SVGs when available; else Simple Icons; else inline
    if (meta.di) {
      inner = imgTag(`${CDN_DI}/${meta.di}`, label, lazy);
    } else if (meta.si) {
      const hex = color.replace("#", "");
      inner = imgTag(`${CDN_SI}/${meta.si}/${hex}`, label, lazy);
    } else if (meta.inline) {
      inner = `<span class="course-logo-svg">${meta.inline}</span>`;
    } else {
      inner = imgTag(`${CDN_SI}/database/4DA3FF`, label, lazy);
    }

    // bash: prefer crisp terminal inline over text-heavy brand mark when both exist
    if (key === "bash" && meta.inline) {
      inner = `<span class="course-logo-svg">${meta.inline}</span>`;
    }

    const extra = opts.className ? ` ${opts.className}` : "";
    return `<span class="course-logo${extra}" data-tech="${key}" style="--logo-glow:${color}" title="${label}" role="img" aria-label="${label}">${inner}</span>`;
  }

  function forCourse(course) {
    const tech = (course && (course.logo || course.technology || course.id)) || "database";
    return render(tech, { lazy: true });
  }

  const api = {
    TECH,
    COURSE_MAP,
    render,
    forCourse,
    resolveTech
  };

  // Callable + .render for React-like usage in templates
  function CourseLogo(technology, opts) {
    return render(technology, opts);
  }
  Object.assign(CourseLogo, api);

  global.CourseLogo = CourseLogo;
  if (global.FORGE) global.FORGE.CourseLogo = CourseLogo;
})(typeof window !== "undefined" ? window : globalThis);
