/* Ashovix Labs — marketing content + flagship enrich */
(function () {
  const F = window.FORGE;

  F.marketing = {
    stats: [
      { value: 20000, suffix: "+", label: "Students" },
      { value: 12, suffix: "", label: "Learning Paths" },
      { value: 300, suffix: "+", label: "Lessons" },
      { value: 50, suffix: "+", label: "Hands-on Projects" },
      { value: 4.5, suffix: "★", label: "Student Rating", decimals: 1 }
    ],
    roadmap: [
      "Git", "Linux", "SQL", "PostgreSQL", "MongoDB",
      "Docker", "Kubernetes", "Cloud", "DevOps", "Projects"
    ],
    features: [
      { icon: "🧪", title: "Hands-on Labs", desc: "Practice every concept with guided terminal and SQL labs." },
      { icon: "🛠️", title: "Real Projects", desc: "Build portfolio-ready systems used in interviews and jobs." },
      { icon: "♾️", title: "Lifetime Access", desc: "Learn at your pace. Revisit lessons whenever you need." },
      { icon: "✅", title: "Quizzes", desc: "Check understanding after each module with instant feedback." },
      { icon: "💬", title: "Community Support", desc: "Ask questions, share wins, and learn with peers." },
      { icon: "🎯", title: "Interview Prep", desc: "Scenario drills for DBA, backend, and DevOps roles." },
      { icon: "📓", title: "Downloadable Notes", desc: "Cheat sheets and notes you can keep offline." }
    ],
    projects: [
      { tag: "SQL", title: "SQL Inventory System", desc: "Normalize products, stock movements, and reporting queries." },
      { tag: "SQL", title: "Hospital Database", desc: "Patients, appointments, billing, and access controls." },
      { tag: "SQL", title: "Bank Management", desc: "Accounts, ledgers, transactions, and audit trails." },
      { tag: "Backend", title: "E-Commerce Backend", desc: "Catalog, carts, orders, and payment stubs." },
      { tag: "Docker", title: "Dockerized Node API", desc: "Multi-stage builds, compose, and healthchecks." },
      { tag: "MongoDB", title: "MongoDB CRM", desc: "Flexible customer docs, pipelines, and indexes." },
      { tag: "K8s", title: "Kubernetes Deployment", desc: "Deploy, scale, and expose a production-like app." },
      { tag: "AWS", title: "AWS Web App", desc: "VPC-aware architecture with compute and storage." },
      { tag: "Linux", title: "Linux Automation Scripts", desc: "Bash jobs for backups, monitoring, and cleanup." },
      { tag: "Git", title: "Git Workflow Projects", desc: "Branching, PRs, reviews, and release tagging." }
    ],
    testimonials: [
      { name: "Priya N.", role: "Junior DBA", text: "Ashovix Labs’ step-by-step labs finally made PostgreSQL and backups click. Better than scattered YouTube playlists.", rating: 5 },
      { name: "Marcus L.", role: "Backend Engineer", text: "The Docker → Kubernetes path felt like a senior mentor sitting next to me. Clean UI, zero fluff.", rating: 5 },
      { name: "Aisha K.", role: "Career Switcher", text: "I went from zero Git to opening PRs confidently in two weeks. The conflict lessons are gold.", rating: 5 },
      { name: "Diego R.", role: "DevOps Associate", text: "Premium docs energy. Search is fast, progress sticks, and the projects look great on my portfolio.", rating: 5 }
    ],
    faqs: [
      { q: "Is Ashovix Labs free to start?", a: "Yes. Browse courses, complete lessons, and track progress in your browser. Account features unlock sync across devices." },
      { q: "Do I need prior experience?", a: "No. Start with Git and Linux, then SQL. Advanced tracks assume earlier foundations but every lesson stays step-by-step." },
      { q: "Are the courses hands-on?", a: "Every major track includes labs, quizzes, and projects. Install guides cover Windows and Linux where relevant." },
      { q: "How do I track progress?", a: "Lesson completion is saved in your browser. Create an account when you want sync and a clearer learning history." },
      { q: "How is this different from random tutorials?", a: "Structured academies, consistent design, progress tracking, and no missing steps — install through production patterns." }
    ],
    blog: [
      { title: "Why every developer should learn SQL in 2026", excerpt: "ORMs hide queries until production hurts. Here’s a practical learning order.", tag: "SQL" },
      { title: "Docker mental model in 12 minutes", excerpt: "Images, containers, volumes, and networks without the noise.", tag: "Docker" },
      { title: "Git rebase without fear", excerpt: "When to rebase, when to merge, and how to recover safely.", tag: "Git" }
    ]
  };

  function enrich(id, extra) {
    const c = F.get(id);
    if (!c) return;
    Object.assign(c, extra);
    if (!c.duration && F.estimateDuration) {
      c.duration = F.estimateDuration((c.orderedLessonIds || []).length);
    }
  }

  enrich("sql", {
    logo: "sql", technology: "sql", badge: "Best Seller", difficulty: "Beginner → Advanced", featured: true,
    category: "Databases", duration: "20+ hrs", accent: "#4DA3FF"
  });
  enrich("mongo", {
    logo: "mongodb", technology: "mongodb", badge: "Most Popular", difficulty: "Beginner → Advanced", featured: true,
    category: "Databases", duration: "16+ hrs", accent: "#2DD4BF"
  });
  enrich("git", {
    logo: "git", technology: "git", badge: "Most Popular", difficulty: "Beginner → Advanced", featured: true,
    category: "Platform", duration: "12+ hrs", accent: "#F4B942"
  });
  enrich("db2", {
    logo: "db2", technology: "db2", badge: "Updated", difficulty: "Beginner → Architect", featured: true,
    category: "Databases", duration: "30+ hrs", accent: "#4DA3FF"
  });
})();
