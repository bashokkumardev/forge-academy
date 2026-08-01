(function () {
  const F = window.FORGE;
  const M = F.marketing;
  const app = document.getElementById("app");
  const STORAGE_KEY = "forgelab-progress-v2";
  const USERS_KEY = "forgelab-users-v1";
  const SESSION_KEY = "forgelab-session-v1";
  const $ = (sel, el = document) => el.querySelector(sel);

  document.getElementById("year").textContent = new Date().getFullYear();
  const isMac = /Mac|iPhone|iPad/.test(navigator.platform || "");
  $("#search-kbd").textContent = isMac ? "⌘K" : "Ctrl K";

  /* ---------- Auth (local) ---------- */
  function getUsers() {
    try { return JSON.parse(localStorage.getItem(USERS_KEY) || "{}"); }
    catch { return {}; }
  }
  function saveUsers(users) {
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
  }
  function getSession() {
    try { return JSON.parse(localStorage.getItem(SESSION_KEY) || "null"); }
    catch { return null; }
  }
  function setSession(user) {
    localStorage.setItem(SESSION_KEY, JSON.stringify({
      email: user.email,
      name: user.name,
      loggedInAt: Date.now()
    }));
    updateAuthUI();
  }
  function clearSession() {
    localStorage.removeItem(SESSION_KEY);
  }
  function logout() {
    clearSession();
    updateAuthUI();
    const path = (location.hash || "#/").replace(/^#\/?/, "").split("/").filter(Boolean)[0] || "home";
    if (path === "login") {
      render();
    } else {
      location.hash = "#/login";
    }
  }
  function normalizeEmail(email) {
    return String(email || "").trim().toLowerCase();
  }
  function registerUser({ name, email, password }) {
    const users = getUsers();
    const key = normalizeEmail(email);
    if (!key || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(key)) {
      return { ok: false, error: "Enter a valid email address." };
    }
    if (!password || password.length < 8) {
      return { ok: false, error: "Password must be at least 8 characters." };
    }
    if (users[key]) {
      return { ok: false, error: "An account with this email already exists. Please log in." };
    }
    const user = {
      name: (name || key.split("@")[0]).trim(),
      email: key,
      password // demo-only local store; replace with a real backend for production
    };
    users[key] = user;
    saveUsers(users);
    setSession(user);
    return { ok: true, user };
  }
  function loginUser({ email, password }) {
    const users = getUsers();
    const key = normalizeEmail(email);
    const user = users[key];
    if (!user) {
      return { ok: false, error: "No account found for this email. Click Get Started to create one." };
    }
    if (user.password !== password) {
      return { ok: false, error: "Incorrect password. Try again." };
    }
    setSession(user);
    return { ok: true, user };
  }
  function updateAuthUI() {
    const session = getSession();
    document.body.classList.toggle("is-logged-in", !!session);

    const guest = document.getElementById("auth-guest");
    const userMenu = document.getElementById("user-menu");
    const mobileLogout = document.getElementById("mobile-logout");

    if (guest) guest.hidden = !!session;

    if (session) {
      if (userMenu) {
        userMenu.hidden = false;
        userMenu.innerHTML = `
          <span class="user-chip" title="${session.email}">
            <span class="user-avatar">${(session.name || "U").charAt(0).toUpperCase()}</span>
            <span class="user-name">${session.name || session.email}</span>
          </span>
          <button type="button" class="btn-logout" id="logout-btn">Log out</button>`;
      }
      if (mobileLogout) mobileLogout.hidden = false;
    } else {
      if (userMenu) {
        userMenu.hidden = true;
        userMenu.innerHTML = "";
      }
      if (mobileLogout) mobileLogout.hidden = true;
    }
  }

  function progKey(courseId, lessonId) {
    return `${courseId}::${lessonId}`;
  }
  function getProgress() {
    try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}"); }
    catch { return {}; }
  }
  function setProgress(map) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(map));
    updateProgressChip();
  }
  function markDone(courseId, lessonId) {
    const p = getProgress();
    p[progKey(courseId, lessonId)] = true;
    setProgress(p);
  }
  function isDone(courseId, lessonId) {
    return !!getProgress()[progKey(courseId, lessonId)];
  }
  function courseProgress(course) {
    const ids = course.orderedLessonIds || [];
    if (!ids.length) return { done: 0, total: 0, pct: 0 };
    const done = ids.filter((id) => isDone(course.id, id)).length;
    return { done, total: ids.length, pct: Math.round((done / ids.length) * 100) };
  }
  function globalProgress() {
    let done = 0, total = 0;
    F.list().forEach((c) => {
      const p = courseProgress(c);
      done += p.done; total += p.total;
    });
    return { done, total, pct: total ? Math.round((done / total) * 100) : 0 };
  }
  function updateProgressChip() {
    const g = globalProgress();
    const chip = $("#progress-chip");
    if (chip) chip.textContent = `${g.pct}% · ${g.done}/${g.total} lessons`;
  }

  function parseHash() {
    const raw = (location.hash || "#/").replace(/^#\/?/, "");
    const parts = raw.split("/").filter(Boolean);
    return { parts, path: parts[0] || "home" };
  }
  function navigate(to) {
    location.hash = to.startsWith("#") ? to : `#/${to.replace(/^#?\/?/, "")}`;
  }

  /* ---------- UI helpers ---------- */
  function courseCard(c, opts = {}) {
    const p = courseProgress(c);
    const lessons = (c.orderedLessonIds || []).length;
    const modules = (c.modules || []).length;
    const badge = c.badge ? `<span class="course-badge ${badgeClass(c.badge)}">${c.badge}</span>` : "";
    const logo = (window.CourseLogo && CourseLogo.forCourse(c)) || "";
    return `
      <article class="course-card" style="animation-delay:${opts.delay || 0}ms">
        <div class="course-thumb" style="--c:${c.accent || "var(--accent)"}">
          ${badge}
          ${logo}
        </div>
        <div class="course-body">
          <div class="difficulty">${c.difficulty || c.level || "All levels"}</div>
          <h3>${c.title}</h3>
          <p class="desc">${c.description || c.tagline || ""}</p>
          <div class="course-meta">
            <span>${lessons} lessons</span>
            <span>${modules} modules</span>
            <span>${c.duration || "—"}</span>
          </div>
          <div class="progress-bar" aria-label="Progress ${p.pct}%"><span style="width:${p.pct}%"></span></div>
          <a class="btn btn-primary btn-sm btn-block" href="#/course/${c.id}" data-nav style="margin-top:.35rem">Start Learning</a>
        </div>
      </article>`;
  }

  function badgeClass(b) {
    const s = (b || "").toLowerCase();
    if (s.includes("popular")) return "popular";
    if (s.includes("new")) return "new";
    if (s.includes("updated")) return "updated";
    return "";
  }

  function workspaceArt() {
    return `
      <div class="hero-visual-wrap">
        <div class="workspace-3d" aria-hidden="true">
          <div class="ws-topbar"><span></span><span></span><span></span></div>
          <div class="ws-body">
            <div class="ws-sidebar"><i></i><i></i><i></i><i></i><i></i></div>
            <pre class="ws-editor"><span class="cm">-- Ashovix Labs · live workspace</span>
<span class="kw">SELECT</span> path, progress
<span class="kw">FROM</span> academy.courses
<span class="kw">WHERE</span> level &gt;= <span class="str">'pro'</span>
<span class="kw">ORDER BY</span> impact <span class="kw">DESC</span>;

<span class="cm"># ship with confidence</span>
git checkout -b feature/scale
docker compose up -d
kubectl apply -f deploy.yaml</pre>
          </div>
          <div class="ws-glow"></div>
        </div>
      </div>`;
  }

  /* ---------- Views ---------- */
  function viewHome() {
    const courses = F.list();
    const featured = courses.filter((c) => c.featured).slice(0, 8);

    return `
      <section class="hero">
        <div class="hero-glow" aria-hidden="true"></div>
        <div class="hero-grid">
          <div class="hero-copy">
            <div class="eyebrow">Ashovix Labs · Premium Developer Academy</div>
            <h1>Master Tools Like a Professional</h1>
            <p class="lead">Learn SQL, MongoDB, PostgreSQL, Git, Docker, Linux, Kubernetes, DevOps, and Cloud technologies through structured step-by-step academies.</p>
            <div class="cta-row">
              <a class="btn btn-primary" href="#/courses" data-nav>Start Learning</a>
            </div>
          </div>
          ${workspaceArt()}
        </div>
      </section>

      <div class="stats-bar" id="stats-bar" data-animate-stats>
        ${M.stats.map((s) => `
          <div class="stat-item">
            <strong data-count="${s.value}" data-suffix="${s.suffix}" data-decimals="${s.decimals || 0}">0</strong>
            <span>${s.label}</span>
          </div>`).join("")}
      </div>

      <section class="section reveal">
        <div class="section-head">
          <div>
            <div class="section-label">Curriculum</div>
            <h2>Courses built like premium products</h2>
            <p>${courses.length} academies — databases, cloud, DevOps, and backend engineering.</p>
          </div>
          <a class="btn btn-ghost btn-sm" href="#/courses" data-nav>View all</a>
        </div>
        <div class="courses-grid">
          ${featured.map((c, i) => courseCard(c, { delay: i * 40 })).join("")}
        </div>
      </section>

      <section class="section reveal" id="paths-preview">
        <div class="section-head">
          <div>
            <div class="section-label">Learning Paths</div>
            <h2>Your roadmap from beginner to hired</h2>
            <p>Follow the guided sequence. No guesswork.</p>
          </div>
          <a class="btn btn-ghost btn-sm" href="#/paths" data-nav>Full path</a>
        </div>
        ${roadmapHtml()}
      </section>

      <section class="section reveal">
        <div class="section-head">
          <div>
            <div class="section-label">Platform</div>
            <h2>Everything you need to learn seriously</h2>
          </div>
        </div>
        <div class="features-grid">
          ${M.features.map((f) => `
            <article class="feature-card">
              <div class="feature-icon" aria-hidden="true">${f.icon}</div>
              <h3>${f.title}</h3>
              <p>${f.desc}</p>
            </article>`).join("")}
        </div>
      </section>

      <section class="section reveal">
        <div class="section-head">
          <div>
            <div class="section-label">Projects</div>
            <h2>Build work that gets you hired</h2>
          </div>
          <a class="btn btn-ghost btn-sm" href="#/projects" data-nav>All projects</a>
        </div>
        <div class="projects-grid">
          ${M.projects.slice(0, 6).map((p) => `
            <article class="project-card">
              <span class="tag">${p.tag}</span>
              <h3>${p.title}</h3>
              <p>${p.desc}</p>
            </article>`).join("")}
        </div>
      </section>

      <section class="section reveal">
        <div class="section-head">
          <div>
            <div class="section-label">Community</div>
            <h2>Loved by learners worldwide</h2>
          </div>
        </div>
        ${testimonialsHtml()}
      </section>

      <section class="section reveal">
        <div class="section-head">
          <div>
            <div class="section-label">FAQ</div>
            <h2>Questions, answered</h2>
          </div>
        </div>
        ${faqHtml()}
      </section>
    `;
  }

  function roadmapHtml() {
    const nodes = M.roadmap;
    return `<div class="roadmap" role="list">
      ${nodes.map((n, i) => `
        <a class="roadmap-node ${i === 0 ? "start" : ""} ${i === nodes.length - 1 ? "end" : ""}" role="listitem" href="#/paths" data-nav>${n}</a>
        ${i < nodes.length - 1 ? `<span class="roadmap-arrow" aria-hidden="true">→</span>` : ""}
      `).join("")}
    </div>`;
  }

  function testimonialsHtml() {
    return `
      <div class="t-slider" data-testimonials>
        <div class="t-track">
          ${M.testimonials.map((t) => `
            <article class="t-card">
              <div class="t-stars" aria-label="${t.rating} stars">${"★".repeat(t.rating)}</div>
              <blockquote>“${t.text}”</blockquote>
              <div class="t-author">
                <div class="t-avatar" aria-hidden="true">${t.name.charAt(0)}</div>
                <div>
                  <strong>${t.name}</strong>
                  <span>${t.role}</span>
                </div>
              </div>
            </article>`).join("")}
        </div>
        <div class="t-controls" role="tablist" aria-label="Testimonial slides">
          ${M.testimonials.map((_, i) => `<button type="button" class="t-dot ${i === 0 ? "active" : ""}" data-t-dot="${i}" aria-label="Show testimonial ${i + 1}"></button>`).join("")}
        </div>
      </div>`;
  }

  function faqHtml() {
    return `<div class="faq-list">
      ${M.faqs.map((f) => `
        <details class="faq-item">
          <summary>${f.q}</summary>
          <p>${f.a}</p>
        </details>`).join("")}
    </div>`;
  }

  function viewCourses() {
    const courses = F.list();
    const cats = ["All", ...new Set(courses.map((c) => c.category || "Engineering"))];
    return `
      <div class="page">
        <div class="section-label">Catalog</div>
        <h1>All courses</h1>
        <p class="lead">${courses.length} premium academies. Filter by category, then start learning.</p>
        <div class="filter-row" id="course-filters">
          ${cats.map((c, i) => `<button type="button" class="chip ${i === 0 ? "active" : ""}" data-filter="${c}">${c}</button>`).join("")}
        </div>
        <div class="courses-grid" id="courses-grid">
          ${courses.map((c, i) => `<div data-category="${c.category || "Engineering"}">${courseCard(c, { delay: (i % 8) * 30 })}</div>`).join("")}
        </div>
      </div>`;
  }

  function viewPaths() {
    return `
      <div class="page">
        <div class="section-label">Learning Paths</div>
        <h1>From zero to professional</h1>
        <p class="lead">A single recommended sequence. Complete each stage, then ship projects and earn certificate progress.</p>
        ${roadmapHtml()}
        <div class="curriculum-list" style="margin-top:2rem">
          ${[
            ["Beginner foundations", "git", "linux", "sql"],
            ["Data layer", "postgres", "mongo", "redis", "mysql"],
            ["Containers & cloud", "docker", "kubernetes", "aws", "azure", "gcp"],
            ["Delivery & reliability", "devops", "cicd", "prometheus", "terraform"],
            ["Build & design", "nodejs", "rest", "system-design", "db-perf"]
          ].map(([title, ...ids]) => `
            <div class="module-block">
              <h2>${title}</h2>
              <ol>
                ${ids.map((id) => {
                  const c = F.get(id);
                  return c ? `<li><a href="#/course/${id}" data-nav>${c.title}</a> — ${c.tagline || c.description}</li>` : "";
                }).join("")}
              </ol>
            </div>`).join("")}
        </div>
      </div>`;
  }

  function viewProjects() {
    return `
      <div class="page">
        <div class="section-label">Projects</div>
        <h1>Portfolio-ready builds</h1>
        <p class="lead">Ship these end-to-end. Each maps to skills from Ashovix Labs courses.</p>
        <div class="projects-grid">
          ${M.projects.map((p) => `
            <article class="project-card">
              <span class="tag">${p.tag}</span>
              <h3>${p.title}</h3>
              <p>${p.desc}</p>
            </article>`).join("")}
        </div>
      </div>`;
  }

  function viewBlog() {
    return `
      <div class="page">
        <div class="section-label">Blog</div>
        <h1>Notes from the academy</h1>
        <p class="lead">Short, practical articles that pair with your courses.</p>
        <div class="projects-grid">
          ${M.blog.map((b) => `
            <article class="project-card">
              <span class="tag">${b.tag}</span>
              <h3>${b.title}</h3>
              <p>${b.excerpt}</p>
            </article>`).join("")}
        </div>
      </div>`;
  }

  function viewCommunity() {
    return `
      <div class="page">
        <div class="section-label">Community</div>
        <h1>Learn with others</h1>
        <p class="lead">Join discussions, share projects, and get unstuck faster.</p>
        <div class="features-grid">
          <article class="feature-card"><div class="feature-icon">💬</div><h3>Discord</h3><p>Daily help channels for SQL, DevOps, and career questions.</p><a class="btn btn-ghost btn-sm" style="margin-top:1rem" href="https://discord.com" target="_blank" rel="noopener">Open Discord</a></article>
          <article class="feature-card"><div class="feature-icon">🐙</div><h3>GitHub</h3><p>Sample repos, lab starters, and issue templates.</p><a class="btn btn-ghost btn-sm" style="margin-top:1rem" href="https://github.com" target="_blank" rel="noopener">Open GitHub</a></article>
          <article class="feature-card"><div class="feature-icon">📺</div><h3>YouTube</h3><p>Walkthroughs that mirror Ashovix Labs lesson flows.</p><a class="btn btn-ghost btn-sm" style="margin-top:1rem" href="https://youtube.com" target="_blank" rel="noopener">Watch</a></article>
          <article class="feature-card"><div class="feature-icon">🔗</div><h3>LinkedIn</h3><p>Share certificate milestones and project launches.</p><a class="btn btn-ghost btn-sm" style="margin-top:1rem" href="https://linkedin.com" target="_blank" rel="noopener">Connect</a></article>
        </div>
        <div style="margin-top:2.5rem">${testimonialsHtml()}</div>
      </div>`;
  }

  function viewAuth(mode) {
    const isLogin = mode === "login";
    const session = getSession();
    if (session) {
      return `
        <div class="auth-panel">
          <h1>You're signed in</h1>
          <p class="lead">Welcome back, <strong>${session.name || session.email}</strong>.</p>
          <div class="auth-status ok">Signed in as ${session.email}</div>
          <div class="cta-row" style="margin-top:1.25rem">
            <a class="btn btn-primary" href="#/courses" data-nav>Continue learning</a>
            <button type="button" class="btn btn-ghost" id="logout-inline">Log out</button>
          </div>
        </div>`;
    }
    return `
      <div class="auth-panel">
        <h1>${isLogin ? "Welcome back" : "Get started"}</h1>
        <p class="lead">${isLogin ? "Log in to continue your Ashovix Labs progress." : "Create your Ashovix Labs account and start your first path today."}</p>
        <div id="auth-status" class="auth-status" hidden></div>
        <form id="auth-form" data-mode="${mode}" novalidate>
          ${!isLogin ? `<div class="field"><label for="name">Full name</label><input id="name" name="name" autocomplete="name" required placeholder="Your name" /></div>` : ""}
          <div class="field">
            <label for="email">Email</label>
            <input id="email" name="email" type="email" autocomplete="username" required placeholder="you@example.com" />
          </div>
          <div class="field">
            <label for="password">Password</label>
            <input id="password" name="password" type="password" autocomplete="${isLogin ? "current-password" : "new-password"}" required minlength="8" placeholder="At least 8 characters" />
          </div>
          <button class="btn btn-primary btn-block" type="submit" id="auth-submit">${isLogin ? "Login" : "Create account"}</button>
        </form>
        <p style="margin-top:1rem;color:var(--muted);font-size:.9rem">
          ${isLogin ? `New here? <a href="#/start" data-nav>Get started</a>` : `Already have an account? <a href="#/login" data-nav>Login</a>`}
        </p>
      </div>`;
  }

  function viewLegal(kind) {
    return `
      <div class="page">
        <h1>${kind === "privacy" ? "Privacy" : "Terms"}</h1>
        <p class="lead">Ashovix Labs stores lesson progress locally in your browser unless you create an account. We don’t sell personal data. This is a demo legal stub — replace with counsel-approved policies before production launch.</p>
        <a class="btn btn-ghost" href="#/" data-nav>Back home</a>
      </div>`;
  }

  function viewCourse(courseId) {
    const c = F.get(courseId);
    if (!c) return viewNotFound();
    const p = courseProgress(c);
    const first = c.orderedLessonIds[0];
    return `
      <div class="page">
        <div class="section-label">${c.category || "Course"}</div>
        <p class="difficulty" style="margin:0 0 .5rem">${c.difficulty || c.level}</p>
        <h1 class="course-title-row">${(window.CourseLogo && CourseLogo.forCourse(c)) || ""} <span>${c.title}</span></h1>
        <p class="lead">${c.description}</p>
        <div class="progress-bar" style="max-width:360px;margin-bottom:1rem"><span style="width:${p.pct}%"></span></div>
        <p style="color:var(--muted);margin-top:0">${p.done}/${p.total} lessons · ${c.modules.length} modules · ${c.duration || ""} · Certificate progress ${p.pct}%</p>
        <div class="cta-row" style="margin:1.25rem 0 2rem">
          <a class="btn btn-primary" href="#/course/${c.id}/lesson/${first}" data-nav>Watch Lesson / Start</a>
          <a class="btn btn-ghost" href="#/course/${c.id}/labs" data-nav>Practice Labs</a>
          ${c.reference ? `<a class="btn btn-ghost" href="#/course/${c.id}/reference" data-nav>Notes / Quick Ref</a>` : ""}
        </div>
        <div class="curriculum-list">
          ${c.modules.map((m) => `
            <div class="module-block">
              <h2>${m.title}</h2>
              <ol>
                ${m.lessonIds.map((id) => {
                  const L = c.lessons[id];
                  if (!L) return "";
                  return `<li><a href="#/course/${c.id}/lesson/${id}" data-nav>${L.title}</a> · ${L.duration || ""}${isDone(c.id, id) ? " ✓" : ""}</li>`;
                }).join("")}
              </ol>
            </div>`).join("")}
        </div>
      </div>`;
  }

  function sidebarHtml(course, activeId) {
    const p = courseProgress(course);
    return `
      <aside class="sidebar" aria-label="Course modules">
        <div class="sidebar-head">
          <h2><a href="#/course/${course.id}" data-nav style="color:inherit">${course.shortTitle || course.title}</a></h2>
          <p>${p.pct}% complete · Certificate ${p.pct}%</p>
          <div class="progress-bar"><span style="width:${p.pct}%"></span></div>
          <div class="sidebar-actions">
            <a href="#/course/${course.id}/lesson/${activeId}" data-nav>▶ Watch lesson</a>
            <a href="#/course/${course.id}/labs" data-nav>🧪 Practice quiz / labs</a>
            <a href="#/course/${course.id}" data-nav>📝 Download notes (overview)</a>
            <a href="#/projects" data-nav>🛠️ Assignments / projects</a>
          </div>
        </div>
        ${course.modules.map((m) => {
          const open = m.lessonIds.includes(activeId);
          return `
            <div class="module-group">
              <button type="button" class="module-toggle" data-toggle-module aria-expanded="${open}">
                <span>${m.title}</span>
                <small>${m.lessonIds.length}</small>
              </button>
              <ul class="lesson-list" ${open ? "" : "hidden"}>
                ${m.lessonIds.map((id) => {
                  const L = course.lessons[id];
                  if (!L) return "";
                  return `<li><a href="#/course/${course.id}/lesson/${id}" data-nav class="${id === activeId ? "active" : ""} ${isDone(course.id, id) ? "done" : ""}">${L.title}</a></li>`;
                }).join("")}
              </ul>
            </div>`;
        }).join("")}
      </aside>`;
  }

  function viewLesson(courseId, lessonId) {
    const c = F.get(courseId);
    if (!c) return viewNotFound();
    const L = c.lessons[lessonId];
    if (!L) return viewNotFound();
    const ids = c.orderedLessonIds;
    const idx = ids.indexOf(lessonId);
    const prev = ids[idx - 1];
    const next = ids[idx + 1];
    const objectives = (L.objectives || []).map((o) => `<li>${o}</li>`).join("");
    let quizHtml = "";
    if (L.quiz) {
      quizHtml = `
        <div class="quiz" data-quiz-answer="${L.quiz.answer}">
          <h3>Practice quiz</h3>
          <p>${L.quiz.q}</p>
          ${L.quiz.options.map((opt, i) => `<button type="button" class="quiz-option" data-quiz-opt="${i}">${opt}</button>`).join("")}
          <p class="quiz-feedback" hidden></p>
        </div>`;
    }
    return `
      <div class="course-shell">
        ${sidebarHtml(c, lessonId)}
        <article class="lesson-panel">
          <div class="lesson-meta">
            <span class="badge">${c.shortTitle || c.title}</span>
            <span>${L.level || ""}</span>
            <span>${L.duration || ""}</span>
            <span>Lesson ${idx + 1} of ${ids.length}</span>
          </div>
          <h1>${L.title}</h1>
          ${objectives ? `<div class="callout"><strong>You will learn to:</strong><ul>${objectives}</ul></div>` : ""}
          ${L.content || ""}
          ${quizHtml}
          <div class="mark-done">
            <button type="button" class="btn btn-primary" id="mark-complete" data-course="${c.id}" data-lesson="${lessonId}">
              ${isDone(c.id, lessonId) ? "Completed ✓" : "Mark lesson complete"}
            </button>
          </div>
          <div class="lesson-nav">
            ${prev ? `<a class="btn btn-ghost" href="#/course/${c.id}/lesson/${prev}" data-nav>← Previous</a>` : "<span></span>"}
            ${next ? `<a class="btn btn-primary" href="#/course/${c.id}/lesson/${next}" data-nav>Next →</a>` : `<a class="btn btn-primary" href="#/course/${c.id}/labs" data-nav>Labs →</a>`}
          </div>
        </article>
      </div>`;
  }

  function viewLabs(courseId) {
    const c = F.get(courseId);
    if (!c) return viewNotFound();
    return `
      <div class="page">
        <h1>${c.shortTitle || c.title} — Labs & assignments</h1>
        <p class="lead">Hands-on practice. Complete related lessons first.</p>
        <p><a href="#/course/${c.id}" data-nav>← Back to course</a></p>
        ${(c.labs || []).map((lab) => `
          <div class="lab-card">
            <h3>${lab.title}</h3>
            <p>${lab.steps}</p>
            <a class="btn btn-ghost btn-sm" href="#/course/${c.id}/lesson/${lab.lesson}" data-nav>Open lesson</a>
          </div>`).join("") || "<p>Labs coming soon.</p>"}
      </div>`;
  }

  function viewReference(courseId) {
    const c = F.get(courseId);
    if (!c || !c.reference) return viewNotFound();
    const r = c.reference;
    return `
      <div class="page">
        <h1>${c.shortTitle || c.title} — Notes / Quick ref</h1>
        <p><a href="#/course/${c.id}" data-nav>← Back to course</a></p>
        <div class="module-block">
          ${r.commands ? `<div class="table-wrap"><table><thead><tr><th>Command</th><th>Use</th></tr></thead><tbody>
            ${r.commands.map((x) => `<tr><td><code>${x.cmd}</code></td><td>${x.use}</td></tr>`).join("")}
          </tbody></table></div>` : ""}
        </div>
      </div>`;
  }

  function viewNotFound() {
    return `<div class="page"><h1>Not found</h1><p class="lead">That page isn’t in Ashovix Labs.</p><a class="btn btn-primary" href="#/" data-nav>Home</a></div>`;
  }

  /* ---------- Router & effects ---------- */
  function render() {
    const { parts, path } = parseHash();
    let html;
    if (path === "home") html = viewHome();
    else if (path === "courses") html = viewCourses();
    else if (path === "paths") html = viewPaths();
    else if (path === "projects") html = viewProjects();
    else if (path === "blog") html = viewBlog();
    else if (path === "community") html = viewCommunity();
    else if (path === "login") html = viewAuth("login");
    else if (path === "start") html = viewAuth("start");
    else if (path === "privacy") html = viewLegal("privacy");
    else if (path === "terms") html = viewLegal("terms");
    else if (path === "course" && parts[1] && parts[2] === "lesson" && parts[3]) html = viewLesson(parts[1], parts[3]);
    else if (path === "course" && parts[1] && parts[2] === "labs") html = viewLabs(parts[1]);
    else if (path === "course" && parts[1] && parts[2] === "reference") html = viewReference(parts[1]);
    else if (path === "course" && parts[1]) html = viewCourse(parts[1]);
    else html = viewNotFound();

    app.innerHTML = html;
    bindViewEvents(parts);
    updateProgressChip();
    updateAuthUI();
    highlightNav(parts);
    window.scrollTo(0, 0);
    requestAnimationFrame(() => {
      animateStats();
      observeReveals();
      initTestimonials();
    });
  }

  function highlightNav(parts) {
    document.querySelectorAll(".top-nav a").forEach((a) => {
      const href = (a.getAttribute("href") || "").replace("#/", "") || "home";
      const key = href === "" ? "home" : href.split("/")[0];
      const current = parts[0] || "home";
      a.classList.toggle("active", key === current || (key === "home" && current === "home"));
    });
  }

  function bindViewEvents(parts) {
    document.querySelectorAll("[data-toggle-module]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const list = btn.parentElement.querySelector(".lesson-list");
        const open = list.hasAttribute("hidden");
        list.toggleAttribute("hidden", !open);
        btn.setAttribute("aria-expanded", String(open));
      });
    });

    const markBtn = $("#mark-complete");
    if (markBtn) {
      markBtn.addEventListener("click", () => {
        markDone(markBtn.dataset.course, markBtn.dataset.lesson);
        render();
      });
    }

    const quiz = $(".quiz");
    if (quiz) {
      const answer = Number(quiz.dataset.quizAnswer);
      quiz.querySelectorAll("[data-quiz-opt]").forEach((btn) => {
        btn.addEventListener("click", () => {
          const i = Number(btn.dataset.quizOpt);
          quiz.querySelectorAll(".quiz-option").forEach((b) => { b.disabled = true; b.classList.remove("correct", "wrong"); });
          btn.classList.add(i === answer ? "correct" : "wrong");
          quiz.querySelectorAll(".quiz-option")[answer].classList.add("correct");
          const fb = quiz.querySelector(".quiz-feedback");
          fb.hidden = false;
          fb.textContent = i === answer ? "Correct — nice work." : "Not quite — see the highlighted answer.";
          if (i === answer && markBtn) markDone(markBtn.dataset.course, markBtn.dataset.lesson);
        });
      });
    }

    const filters = $("#course-filters");
    if (filters) {
      filters.addEventListener("click", (e) => {
        const chip = e.target.closest("[data-filter]");
        if (!chip) return;
        filters.querySelectorAll(".chip").forEach((c) => c.classList.remove("active"));
        chip.classList.add("active");
        const cat = chip.dataset.filter;
        document.querySelectorAll("#courses-grid > [data-category]").forEach((el) => {
          el.style.display = cat === "All" || el.dataset.category === cat ? "" : "none";
        });
      });
    }

    $("#logout-inline")?.addEventListener("click", (e) => {
      e.preventDefault();
      logout();
    });

    const form = $("#auth-form");
    if (form) {
      const status = $("#auth-status");
      const submitBtn = $("#auth-submit");
      const showStatus = (msg, ok) => {
        if (!status) return;
        status.hidden = false;
        status.className = `auth-status ${ok ? "ok" : "err"}`;
        status.textContent = msg;
      };

      form.addEventListener("submit", (e) => {
        e.preventDefault();
        e.stopPropagation();

        const mode = form.getAttribute("data-mode");
        const email = form.email?.value || "";
        const password = form.password?.value || "";
        const name = form.name?.value || "";

        if (!email.trim()) {
          showStatus("Email is required.", false);
          form.email?.focus();
          return;
        }
        if (!password) {
          showStatus("Password is required.", false);
          form.password?.focus();
          return;
        }
        if (password.length < 8) {
          showStatus("Password must be at least 8 characters.", false);
          form.password?.focus();
          return;
        }

        if (submitBtn) {
          submitBtn.disabled = true;
          submitBtn.textContent = mode === "login" ? "Signing in…" : "Creating account…";
        }

        const result = mode === "login"
          ? loginUser({ email, password })
          : registerUser({ name, email, password });

        if (!result.ok) {
          showStatus(result.error, false);
          if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.textContent = mode === "login" ? "Login" : "Create account";
          }
          return;
        }

        showStatus(mode === "login" ? "Login successful. Redirecting…" : "Account created. Redirecting…", true);
        setTimeout(() => navigate("courses"), 450);
      });
    }
  }

  function animateStats() {
    const bar = $("#stats-bar");
    if (!bar || bar.dataset.done) return;
    const els = bar.querySelectorAll("[data-count]");
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        bar.dataset.done = "1";
        els.forEach((el) => {
          const target = Number(el.dataset.count);
          const suffix = el.dataset.suffix || "";
          const decimals = Number(el.dataset.decimals || 0);
          const start = performance.now();
          const dur = 1200;
          function tick(now) {
            const t = Math.min(1, (now - start) / dur);
            const eased = 1 - Math.pow(1 - t, 3);
            const val = target * eased;
            el.textContent = (decimals ? val.toFixed(decimals) : Math.round(val).toLocaleString()) + suffix;
            if (t < 1) requestAnimationFrame(tick);
          }
          requestAnimationFrame(tick);
        });
        io.disconnect();
      });
    }, { threshold: 0.35 });
    io.observe(bar);
  }

  function observeReveals() {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("visible");
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.12 });
    document.querySelectorAll(".reveal").forEach((el) => io.observe(el));
  }

  let tTimer;
  function initTestimonials() {
    const root = $("[data-testimonials]");
    if (!root) return;
    const track = root.querySelector(".t-track");
    const dots = [...root.querySelectorAll("[data-t-dot]")];
    let i = 0;
    function go(n) {
      i = n % dots.length;
      if (i < 0) i = dots.length - 1;
      const cardW = track.querySelector(".t-card").getBoundingClientRect().width;
      const gap = window.innerWidth >= 800 ? 16 : 0;
      track.style.transform = `translateX(-${i * (cardW + gap)}px)`;
      dots.forEach((d, di) => d.classList.toggle("active", di === i));
    }
    dots.forEach((d) => d.addEventListener("click", () => go(Number(d.dataset.tDot))));
    clearInterval(tTimer);
    tTimer = setInterval(() => go(i + 1), 5000);
  }

  /* Search */
  const overlay = $("#search-overlay");
  const searchInput = $("#search-input");
  const searchResults = $("#search-results");

  function openSearch() {
    overlay.hidden = false;
    document.body.classList.add("search-open");
    searchInput.value = "";
    searchResults.innerHTML = `<li><button type="button" disabled>Type to search courses & lessons…</button></li>`;
    searchInput.focus();
  }
  function closeSearch() {
    overlay.hidden = true;
    document.body.classList.remove("search-open");
  }
  function runSearch(q) {
    const term = q.trim().toLowerCase();
    if (term.length < 2) {
      searchResults.innerHTML = `<li><button type="button" disabled>Keep typing…</button></li>`;
      return;
    }
    const courseHits = F.list().filter((c) =>
      `${c.title} ${c.description} ${c.tagline} ${c.category}`.toLowerCase().includes(term)
    ).slice(0, 6);
    const lessonHits = F.allLessons().filter(({ lesson, courseTitle }) =>
      `${courseTitle} ${lesson.title} ${lesson.content || ""}`.toLowerCase().includes(term)
    ).slice(0, 8);

    if (!courseHits.length && !lessonHits.length) {
      searchResults.innerHTML = `<li><button type="button" disabled>No matches</button></li>`;
      return;
    }
    searchResults.innerHTML = [
      ...courseHits.map((c) => `<li><button type="button" data-go="course/${c.id}"><strong>${c.title}</strong><small>Course · ${c.category || ""}</small></button></li>`),
      ...lessonHits.map(({ courseId, courseTitle, lesson }) =>
        `<li><button type="button" data-go="course/${courseId}/lesson/${lesson.id}"><strong>${lesson.title}</strong><small>${courseTitle}</small></button></li>`)
    ].join("");
    searchResults.querySelectorAll("[data-go]").forEach((btn) => {
      btn.addEventListener("click", () => { closeSearch(); navigate(btn.dataset.go); });
    });
  }

  $("#search-open").addEventListener("click", openSearch);
  overlay.addEventListener("click", (e) => { if (e.target === overlay) closeSearch(); });
  searchInput.addEventListener("input", () => runSearch(searchInput.value));

  document.addEventListener("keydown", (e) => {
    if ((e.key === "k" || e.key === "K") && (e.metaKey || e.ctrlKey)) {
      e.preventDefault();
      openSearch();
    }
    if (e.key === "/" && !e.ctrlKey && !e.metaKey && !["INPUT", "TEXTAREA"].includes(document.activeElement.tagName)) {
      e.preventDefault();
      openSearch();
    }
    if (e.key === "Escape") closeSearch();
  });

  /* Navbar blur */
  const header = $("#site-header");
  function onScroll() {
    header.classList.toggle("scrolled", window.scrollY > 8);
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* Mobile menu */
  const menuToggle = $("#menu-toggle");
  const mobileNav = $("#mobile-nav");
  menuToggle.addEventListener("click", () => {
    const open = mobileNav.hidden;
    mobileNav.hidden = !open;
    menuToggle.setAttribute("aria-expanded", String(open));
    document.body.classList.toggle("menu-open", open);
  });
  document.body.addEventListener("click", (e) => {
    if (e.target.closest("[data-nav]")) {
      mobileNav.hidden = true;
      document.body.classList.remove("menu-open");
      menuToggle.setAttribute("aria-expanded", "false");
    }
  });

  $("#reset-progress").addEventListener("click", () => {
    if (confirm("Reset all progress on this device?")) {
      localStorage.removeItem(STORAGE_KEY);
      updateProgressChip();
      render();
    }
  });

  /* Persistent logout handlers (survive header re-renders) */
  document.querySelector(".header-actions")?.addEventListener("click", (e) => {
    const btn = e.target.closest("#logout-btn, .btn-logout");
    if (!btn) return;
    e.preventDefault();
    e.stopPropagation();
    logout();
  });
  document.getElementById("mobile-nav")?.addEventListener("click", (e) => {
    if (!e.target.closest("#mobile-logout")) return;
    e.preventDefault();
    document.getElementById("mobile-nav").hidden = true;
    document.body.classList.remove("menu-open");
    document.getElementById("menu-toggle")?.setAttribute("aria-expanded", "false");
    logout();
  });

  window.addEventListener("hashchange", render);
  updateProgressChip();
  updateAuthUI();
  render();
})();
