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
          ${courses.map((c, i) => courseCard(c, { delay: (i % 8) * 30 })).join("")}
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
    return `
      <div class="page">
        <div class="section-label">Catalog</div>
        <h1>All courses</h1>
        <p class="lead">${courses.length} academies — every course in Ashovix Labs is listed here.</p>
        <div class="courses-grid" id="courses-grid">
          ${courses.map((c, i) => courseCard(c, { delay: (i % 8) * 30 })).join("")}
        </div>
      </div>`;
  }

  function viewPaths() {
    return `
      <div class="page">
        <div class="section-label">Learning Paths</div>
        <h1>From zero to professional</h1>
        <p class="lead">A single recommended sequence. Complete each stage, then ship projects from what you learned.</p>
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

  function viewWorkspace() {
    const tools = (F.workspace && F.workspace.tools) || [];
    const cats = (F.workspace && F.workspace.categories) || [];
    const savedId = localStorage.getItem("ashovix-ws-tool") || "javascript";
    const active = (F.workspace && F.workspace.byId(savedId)) || tools[0];
    const savedCode = localStorage.getItem("ashovix-ws-code-" + (active && active.id)) || (active && active.starter) || "";

    const sidebar = cats.map((cat) => {
      const items = tools.filter((t) => t.category === cat);
      return `
        <div class="ws-cat">
          <div class="ws-cat-label">${cat}</div>
          ${items.map((t) => `
            <button type="button" class="ws-tool ${t.id === active.id ? "active" : ""}" data-ws-tool="${t.id}" style="--tool-accent:${t.accent}">
              <span class="ws-tool-dot" aria-hidden="true"></span>
              <span>${t.name}</span>
            </button>`).join("")}
        </div>`;
    }).join("");

    return `
      <div class="page workspace-page">
        <div class="section-label">Workspace</div>
        <h1>Practice any stack</h1>
        <p class="lead">Languages, databases, cloud CLIs, and DevOps tools — pick an environment and run labs in-browser.</p>
        <div class="ws-shell">
          <aside class="ws-sidebar" aria-label="Environments">
            <input type="search" id="ws-filter" class="ws-filter" placeholder="Filter tools…" autocomplete="off" />
            <div id="ws-tool-list">${sidebar}</div>
          </aside>
          <div class="ws-main">
            <div class="ws-toolbar">
              <div class="ws-meta">
                <strong id="ws-tool-name">${active.name}</strong>
                <span id="ws-tool-blurb">${active.blurb}</span>
              </div>
              <div class="ws-actions">
                <button type="button" class="btn btn-ghost btn-sm" id="ws-reset">Reset</button>
                <button type="button" class="btn btn-primary btn-sm" id="ws-run">Run ▶</button>
              </div>
            </div>
            <div class="ws-panes">
              <label class="ws-editor-wrap">
                <span class="ws-pane-label">Editor</span>
                <textarea id="ws-editor" spellcheck="false" aria-label="Workspace editor">${escapeHtml(savedCode)}</textarea>
              </label>
              <div class="ws-output-wrap">
                <span class="ws-pane-label">Output</span>
                <pre id="ws-output" class="ws-output" aria-live="polite">Ready. Click Run to execute.</pre>
                <iframe id="ws-preview" class="ws-preview" title="HTML preview" hidden></iframe>
              </div>
            </div>
          </div>
        </div>
      </div>`;
  }

  function escapeHtml(str) {
    return String(str || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function initWorkspace() {
    const editor = $("#ws-editor");
    const output = $("#ws-output");
    const preview = $("#ws-preview");
    const nameEl = $("#ws-tool-name");
    const blurbEl = $("#ws-tool-blurb");
    if (!editor || !output) return;

    let current = (F.workspace && F.workspace.byId(localStorage.getItem("ashovix-ws-tool") || "javascript")) || F.workspace.tools[0];

    const setOutput = (text, isHtml) => {
      preview.hidden = true;
      output.hidden = false;
      output.classList.toggle("err", !!isHtml && isHtml === "err");
      output.textContent = text;
    };

    const persist = () => {
      localStorage.setItem("ashovix-ws-tool", current.id);
      localStorage.setItem("ashovix-ws-code-" + current.id, editor.value);
    };

    const selectTool = (id) => {
      persist();
      current = F.workspace.byId(id);
      localStorage.setItem("ashovix-ws-tool", current.id);
      nameEl.textContent = current.name;
      blurbEl.textContent = current.blurb;
      editor.value = localStorage.getItem("ashovix-ws-code-" + current.id) || current.starter;
      document.querySelectorAll("[data-ws-tool]").forEach((btn) => {
        btn.classList.toggle("active", btn.dataset.wsTool === current.id);
      });
      setOutput("Ready. Click Run to execute.");
      preview.hidden = true;
    };

    document.querySelectorAll("[data-ws-tool]").forEach((btn) => {
      btn.addEventListener("click", () => selectTool(btn.dataset.wsTool));
    });

    $("#ws-filter")?.addEventListener("input", (e) => {
      const q = e.target.value.trim().toLowerCase();
      document.querySelectorAll("[data-ws-tool]").forEach((btn) => {
        const label = btn.textContent.trim().toLowerCase();
        btn.style.display = !q || label.includes(q) ? "" : "none";
      });
      document.querySelectorAll(".ws-cat").forEach((cat) => {
        const visible = [...cat.querySelectorAll("[data-ws-tool]")].some((b) => b.style.display !== "none");
        cat.style.display = visible ? "" : "none";
      });
    });

    $("#ws-reset")?.addEventListener("click", () => {
      editor.value = current.starter;
      persist();
      setOutput("Reset to starter template.");
    });

    editor.addEventListener("input", () => persist());

    $("#ws-run")?.addEventListener("click", async () => {
      persist();
      const code = editor.value;
      output.classList.remove("err");
      setOutput("Running…");
      try {
        const result = await runWorkspace(current, code, preview, output);
        if (result !== null) setOutput(result);
      } catch (err) {
        setOutput(String(err && err.message ? err.message : err), "err");
        output.classList.add("err");
      }
    });
  }

  async function runWorkspace(tool, code, preview, output) {
    switch (tool.mode) {
      case "js": return runJsLab(code);
      case "sql": return runSqlLab(code);
      case "html": return runHtmlLab(code, preview, output);
      case "python": return runPythonLab(code);
      case "mongo": return runMongoLab(code);
      case "redis": return runRedisLab(code);
      case "shell":
      case "cloud": return runShellLab(tool.id, code);
      default: return "Unsupported environment.";
    }
  }

  function runJsLab(code) {
    const logs = [];
    const fakeConsole = {
      log: (...a) => logs.push(a.map(formatVal).join(" ")),
      info: (...a) => logs.push(a.map(formatVal).join(" ")),
      warn: (...a) => logs.push("⚠ " + a.map(formatVal).join(" ")),
      error: (...a) => logs.push("✖ " + a.map(formatVal).join(" "))
    };
    const fn = new Function("console", code);
    fn(fakeConsole);
    return logs.length ? logs.join("\n") : "(completed with no output)";
  }

  function formatVal(v) {
    if (typeof v === "string") return v;
    try { return JSON.stringify(v, null, 2); } catch (_) { return String(v); }
  }

  function runHtmlLab(code, preview, output) {
    output.hidden = true;
    preview.hidden = false;
    preview.srcdoc = code;
    return null;
  }

  function loadScriptOnce(src) {
    return new Promise((resolve, reject) => {
      if (document.querySelector(`script[data-src="${src}"]`)) {
        resolve();
        return;
      }
      const s = document.createElement("script");
      s.src = src;
      s.async = true;
      s.dataset.src = src;
      s.onload = () => resolve();
      s.onerror = () => reject(new Error("Failed to load " + src));
      document.head.appendChild(s);
    });
  }

  async function ensureSqlJs() {
    if (window.__ashovixSql) return window.__ashovixSql;
    await loadScriptOnce("https://cdnjs.cloudflare.com/ajax/libs/sql.js/1.10.3/sql-wasm.js");
    const SQL = await window.initSqlJs({
      locateFile: (file) => `https://cdnjs.cloudflare.com/ajax/libs/sql.js/1.10.3/${file}`
    });
    window.__ashovixSql = new SQL.Database();
    return window.__ashovixSql;
  }

  async function runSqlLab(code) {
    const db = await ensureSqlJs();
    const parts = code.split(";").map((s) => s.trim()).filter(Boolean);
    const chunks = [];
    for (const stmt of parts) {
      const rows = db.exec(stmt);
      if (!rows.length) {
        chunks.push("✓ " + stmt.split("\n")[0].slice(0, 60) + (stmt.length > 60 ? "…" : ""));
        continue;
      }
      rows.forEach((r) => {
        const header = r.columns.join(" | ");
        const body = r.values.map((row) => row.map((c) => (c === null ? "NULL" : String(c))).join(" | ")).join("\n");
        chunks.push(header + "\n" + "-".repeat(Math.min(header.length, 48)) + "\n" + body);
      });
    }
    return chunks.join("\n\n") || "OK";
  }

  function runPythonLab(code) {
    const lines = code.split("\n");
    const out = [];
    const env = { numbers: null };
    for (const raw of lines) {
      const line = raw.trim();
      if (!line || line.startsWith("#")) continue;
      if (line.startsWith("print(") && line.endsWith(")")) {
        const inner = line.slice(6, -1);
        try {
          if (inner.includes("sorted(numbers)") && Array.isArray(env.numbers)) out.push("sorted: " + JSON.stringify([...env.numbers].sort((a, b) => a - b)));
          else if (inner.includes("sum(numbers)") && Array.isArray(env.numbers)) out.push("sum: " + env.numbers.reduce((a, b) => a + b, 0));
          else if (inner.includes("set(numbers)") && Array.isArray(env.numbers)) out.push("unique: " + JSON.stringify([...new Set(env.numbers)]));
          else out.push(inner.replace(/^["']|["']$/g, "").replace(/,\s*/g, " "));
        } catch (_) {
          out.push(inner);
        }
        continue;
      }
      const assign = line.match(/^(\w+)\s*=\s*\[(.*)\]$/);
      if (assign) {
        try {
          env[assign[1]] = JSON.parse("[" + assign[2] + "]");
          out.push(`# ${assign[1]} = ${JSON.stringify(env[assign[1]])}`);
        } catch (_) { /* ignore */ }
        continue;
      }
      if (line.startsWith("for ") && env.numbers) {
        env.numbers.forEach((n) => {
          if (n % 2) out.push(`${n} is odd`);
        });
      }
    }
    out.push("");
    out.push("—— Python lab mode ——");
    out.push("Starter patterns run locally. Use the SQL / JavaScript tools for full live engines.");
    return out.join("\n");
  }

  function runMongoLab(code) {
    const out = ["ashovix> connected"];
    if (/insertMany/i.test(code)) out.push("Acknowledged inserted documents: 2");
    if (/find\(/i.test(code)) {
      out.push(`[
  { title: "SQL Mastery", level: "beginner", hours: 20 },
  { title: "Kubernetes", level: "advanced", hours: 18 }
]`);
    }
    if (/aggregate/i.test(code)) {
      out.push(`[
  { _id: "beginner", total: 1 },
  { _id: "advanced", total: 1 }
]`);
    }
    out.push("ok");
    return out.join("\n");
  }

  function runRedisLab(code) {
    const store = Object.create(null);
    const lists = Object.create(null);
    const out = [];
    code.split("\n").map((l) => l.trim()).filter((l) => l && !l.startsWith("#")).forEach((line) => {
      const parts = line.match(/(?:[^\s"]+|"[^"]*")+/g) || [];
      const cmd = (parts[0] || "").toUpperCase();
      const args = parts.slice(1).map((a) => a.replace(/^"|"$/g, ""));
      if (cmd === "SET") { store[args[0]] = args[1]; out.push("OK"); }
      else if (cmd === "GET") out.push(store[args[0]] == null ? "(nil)" : store[args[0]]);
      else if (cmd === "HSET") {
        store[args[0]] = store[args[0]] || {};
        for (let i = 1; i < args.length; i += 2) store[args[0]][args[i]] = args[i + 1];
        out.push(String(Math.floor((args.length - 1) / 2)));
      } else if (cmd === "HGETALL") {
        const obj = store[args[0]] || {};
        Object.entries(obj).forEach(([k, v]) => { out.push(k); out.push(String(v)); });
      } else if (cmd === "LPUSH") {
        lists[args[0]] = lists[args[0]] || [];
        args.slice(1).forEach((v) => lists[args[0]].unshift(v));
        out.push(String(lists[args[0]].length));
      } else if (cmd === "LRANGE") out.push(JSON.stringify(lists[args[0]] || []));
      else if (cmd === "INCR") {
        store[args[0]] = Number(store[args[0]] || 0) + 1;
        out.push(String(store[args[0]]));
      } else out.push("(error) unknown command '" + cmd + "'");
    });
    return out.join("\n");
  }

  function runShellLab(toolId, code) {
    const replies = {
      pwd: "/home/ashovix/labs",
      "ls -la": "total 24\ndrwxr-xr-x  5 ashovix ashovix 4096 Jul 31 12:00 .\ndrwxr-xr-x 18 ashovix ashovix 4096 Jul 31 11:55 ..\n-rw-r--r--  1 ashovix ashovix  220 Jul 31 12:00 README.md",
      whoami: "ashovix",
      date: new Date().toString(),
      "uname -a": "Linux ashovix-lab 6.8.0 #1 SMP x86_64 GNU/Linux",
      "df -h": "Filesystem      Size  Used Avail Use% Mounted on\n/dev/sda1        50G   12G   36G  25% /",
      "free -m": "Mem:  7938  2104  4200",
      "docker version": "Client: Docker Engine 26.1\nServer: Docker Engine 26.1",
      "docker images": "REPOSITORY     TAG       IMAGE ID\nashovix-api    latest    8f3a21c",
      "docker ps -a": "CONTAINER ID   IMAGE          STATUS\na1b2c3d4e5f6   ashovix-api    Up 2 hours",
      "docker compose up -d": "✔ Container ashovix-api  Started",
      "kubectl get nodes": "NAME           STATUS   ROLES\nlab-node-1     Ready    control-plane",
      "kubectl get pods -A": "NAMESPACE     NAME                         READY   STATUS\ndefault       ashovix-api-7d9c             1/1     Running",
      "kubectl get svc": "NAME          TYPE        CLUSTER-IP\nashovix-api   ClusterIP   10.96.10.20",
      "kubectl apply -f deploy.yaml": "deployment.apps/ashovix-api configured",
      "kubectl rollout status deployment/ashovix-api": "deployment \"ashovix-api\" successfully rolled out",
      "terraform init": "Terraform initialized successfully!",
      "terraform plan": "Plan: 3 to add, 0 to change, 0 to destroy.",
      "terraform apply -auto-approve": "Apply complete! Resources: 3 added.",
      "terraform state list": "aws_s3_bucket.labs\naws_iam_role.runner",
      "git status": "On branch main\nnothing to commit, working tree clean",
      "git branch -vv": "* main 1cd8766 [origin/main] latest",
      "git log --oneline -5": "1cd8766 feat: workspace\nf154e4d fix: casing\n77394cf chore: headline",
      "git checkout -b feature/workspace": "Switched to a new branch 'feature/workspace'",
      "git add .": "",
      "aws sts get-caller-identity": '{\n  "UserId": "AIDAEXAMPLE",\n  "Account": "123456789012",\n  "Arn": "arn:aws:iam::123456789012:user/ashovix"\n}',
      "aws s3 ls": "2026-07-01  ashovix-labs-artifacts\n2026-07-01  ashovix-labs-logs",
      "az account show": '{\n  "name": "Ashovix Subscription",\n  "id": "00000000-0000-0000-0000-000000000000",\n  "state": "Enabled"\n}',
      "az group list -o table": "Name            Location\n------------    ---------\nashovix-rg      eastus",
      "gcloud config list": "[core]\naccount = ashok@ashovix.dev\nproject = ashovix-labs",
      "gcloud projects list": "PROJECT_ID        NAME\nashovix-labs       Ashovix Labs",
      "systemctl status nginx": "● nginx.service - active (running)"
    };

    const out = [];
    code.split("\n").forEach((raw) => {
      const line = raw.trim();
      if (!line || line.startsWith("#")) return;
      out.push(`$ ${line}`);
      let matched = false;
      for (const [cmd, reply] of Object.entries(replies)) {
        if (line === cmd || line.startsWith(cmd + " ")) {
          if (reply) out.push(reply);
          matched = true;
          break;
        }
      }
      if (!matched) {
        if (/^echo\s+/.test(line)) out.push(line.replace(/^echo\s+/, "").replace(/^["']|["']$/g, ""));
        else if (/^mkdir\b/.test(line)) out.push("");
        else if (/^cd\b/.test(line)) out.push("");
        else if (/^git commit\b/.test(line)) out.push("[feature/workspace 9ab12cd] practice commit\n 1 file changed");
        else if (/docker logs/.test(line)) out.push("listening on :8080\nready for traffic");
        else if (/aws ec2|aws lambda|az vm|az storage|gcloud compute|gcloud storage|ps aux/.test(line)) {
          out.push("(lab) sample output — command recognized in Ashovix workspace");
        } else out.push(`(lab) simulated: ${line}`);
      }
      out.push("");
    });
    out.push(`—— ${toolId} lab · browser simulation ——`);
    return out.join("\n").trim();
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
          <article class="feature-card"><div class="feature-icon">🔗</div><h3>LinkedIn</h3><p>Share project launches and learning milestones with your network.</p><a class="btn btn-ghost btn-sm" style="margin-top:1rem" href="https://linkedin.com" target="_blank" rel="noopener">Connect</a></article>
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
        <p style="color:var(--muted);margin-top:0">${p.done}/${p.total} lessons · ${c.modules.length} modules · ${c.duration || ""} · ${p.pct}% complete</p>
        <div class="cta-row" style="margin:1.25rem 0 2rem">
          <a class="btn btn-primary" href="#/course/${c.id}/lesson/${first}" data-nav>Watch Lesson / Start</a>
          <a class="btn btn-ghost" href="#/course/${c.id}/reference" data-nav>Quick Ref</a>
          ${c.assessment ? `<a class="btn btn-ghost" href="#/course/${c.id}/assessment" data-nav>Final Assessment (60 Q · 90 min)</a>` : ""}
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
          <p>${p.pct}% complete</p>
          <div class="progress-bar"><span style="width:${p.pct}%"></span></div>
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
            ${next ? `<a class="btn btn-primary" href="#/course/${c.id}/lesson/${next}" data-nav>Next →</a>` : `<a class="btn btn-primary" href="#/course/${c.id}" data-nav>Back to course</a>`}
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
    if (!c) return viewNotFound();
    if (F.attachReferences) F.attachReferences();
    const r = c.reference;
    if (!r || !(r.commands && r.commands.length)) {
      return `
        <div class="page">
          <h1>${c.shortTitle || c.title} — Quick Ref</h1>
          <p class="lead">Quick reference for this course is being prepared.</p>
          <p><a href="#/course/${c.id}" data-nav>← Back to course</a></p>
        </div>`;
    }

    const extras = [];
    if (r.operators && r.operators.length) {
      extras.push(`<h2>Operators</h2><p class="ref-chips">${r.operators.map((o) => `<code>${o}</code>`).join(" ")}</p>`);
    }
    if (r.monFunctions && r.monFunctions.length) {
      extras.push(`<h2>Monitor functions</h2><p class="ref-chips">${r.monFunctions.map((o) => `<code>${o}</code>`).join(" ")}</p>`);
    }
    if (r.catalogViews && r.catalogViews.length) {
      extras.push(`<h2>Catalog views</h2><p class="ref-chips">${r.catalogViews.map((o) => `<code>${o}</code>`).join(" ")}</p>`);
    }

    return `
      <div class="page ref-page">
        <div class="section-label">Quick Ref</div>
        <h1>${r.title || `${c.shortTitle || c.title} Quick Reference`}</h1>
        <p class="lead">${r.intro || "Command syntax used throughout this course."}</p>
        <p><a href="#/course/${c.id}" data-nav>← Back to course</a></p>
        <div class="table-wrap ref-table-wrap">
          <table class="ref-table">
            <thead><tr><th>Command</th><th>Syntax</th><th>Use</th></tr></thead>
            <tbody>
              ${r.commands.map((x) => `
                <tr>
                  <td><strong>${x.cmd}</strong></td>
                  <td><pre class="ref-syntax">${escapeHtml(x.syntax || x.cmd)}</pre></td>
                  <td>${x.use || ""}</td>
                </tr>`).join("")}
            </tbody>
          </table>
        </div>
        ${extras.join("")}
      </div>`;
  }

  function viewAssessment(courseId) {
    const c = F.get(courseId);
    if (!c || !c.assessment) return viewNotFound();
    const a = c.assessment;
    const qs = a.questions || [];
    const saved = safeJson(localStorage.getItem(`ashovix-assessment-${c.id}`), null);

    if (saved && saved.submitted) {
      return renderAssessmentScorecard(c, a, saved);
    }

    return `
      <div class="page assessment-page" id="assessment-root"
        data-course="${c.id}"
        data-minutes="${a.durationMinutes || 90}"
        data-pass="${a.passPercent || 70}">
        <div class="assessment-top">
          <div>
            <div class="section-label">Final Assessment</div>
            <h1>${a.title || "Final Assessment"}</h1>
            <p class="lead">${qs.length} questions · ${a.durationMinutes || 90} minutes · Pass mark ${a.passPercent || 70}%</p>
          </div>
          <div class="assessment-timer" id="assessment-timer" aria-live="polite">90:00</div>
        </div>
        <div class="assessment-progress">
          <div class="progress-bar"><span id="assessment-progress-bar" style="width:0%"></span></div>
          <span id="assessment-progress-label">0 / ${qs.length} answered</span>
        </div>
        <form id="assessment-form" class="assessment-form">
          ${qs.map((q, i) => `
            <fieldset class="assessment-q" data-q-index="${i}">
              <legend>Q${i + 1}. ${q.q}</legend>
              ${q.options.map((opt, oi) => `
                <label class="assessment-opt">
                  <input type="radio" name="q${i}" value="${oi}" />
                  <span>${opt}</span>
                </label>`).join("")}
            </fieldset>`).join("")}
          <div class="assessment-actions">
            <a class="btn btn-ghost" href="#/course/${c.id}/lesson/sql39" data-nav>Cancel</a>
            <button type="submit" class="btn btn-primary" id="assessment-submit">Submit assessment</button>
          </div>
        </form>
      </div>`;
  }

  function safeJson(raw, fallback) {
    try { return raw ? JSON.parse(raw) : fallback; } catch (_) { return fallback; }
  }

  function renderAssessmentScorecard(c, a, result) {
    const pct = result.percent;
    const passed = pct >= (a.passPercent || 70);
    const mins = Math.floor((result.usedSeconds || 0) / 60);
    const secs = (result.usedSeconds || 0) % 60;
    const review = (result.review || []).map((r) => `
      <div class="score-review ${r.correct ? "ok" : "bad"}">
        <strong>Q${r.n}. ${r.q}</strong>
        <p>Your answer: ${r.yours == null ? "<em>Not answered</em>" : r.yours}</p>
        ${r.correct ? "" : `<p>Correct: ${r.correctText}</p>`}
      </div>`).join("");

    return `
      <div class="page assessment-page">
        <div class="section-label">Score card</div>
        <h1>${a.title || "Final Assessment"} — Results</h1>
        <div class="score-card ${passed ? "pass" : "fail"}">
          <div class="score-big">${pct}%</div>
          <div class="score-meta">
            <p><strong>${passed ? "Passed" : "Not passed"}</strong> · Pass mark ${a.passPercent || 70}%</p>
            <p>${result.correct} / ${result.total} correct</p>
            <p>Time used: ${mins}m ${String(secs).padStart(2, "0")}s of ${a.durationMinutes || 90}m</p>
            <p>Submitted: ${result.at || ""}</p>
          </div>
        </div>
        <div class="cta-row" style="margin:1.25rem 0 2rem">
          <button type="button" class="btn btn-primary" id="assessment-retry" data-course="${c.id}">Retake assessment</button>
          <a class="btn btn-ghost" href="#/course/${c.id}" data-nav>Back to course</a>
        </div>
        <h2>Review</h2>
        <div class="score-review-list">${review}</div>
      </div>`;
  }

  function initAssessment(courseId) {
    const root = $("#assessment-root");
    const retry = $("#assessment-retry");
    if (retry) {
      retry.addEventListener("click", () => {
        localStorage.removeItem(`ashovix-assessment-${retry.dataset.course}`);
        location.hash = `#/course/${retry.dataset.course}/assessment`;
        render();
      });
      return;
    }
    if (!root) return;

    const c = F.get(courseId);
    const a = c.assessment;
    const total = (a.questions || []).length;
    const minutes = Number(root.dataset.minutes) || 90;
    let remaining = minutes * 60;
    const startedAt = Date.now();
    const timerEl = $("#assessment-timer");
    const bar = $("#assessment-progress-bar");
    const label = $("#assessment-progress-label");
    const form = $("#assessment-form");
    let submitted = false;

    const submitAssessment = (auto) => {
      if (submitted) return;
      submitted = true;
      clearTimeout(window.__assessmentTimer);
      const usedSeconds = Math.min(minutes * 60, Math.round((Date.now() - startedAt) / 1000));
      let correct = 0;
      const review = a.questions.map((q, i) => {
        const chosen = form.querySelector(`input[name="q${i}"]:checked`);
        const yoursIdx = chosen ? Number(chosen.value) : null;
        const ok = yoursIdx === q.answer;
        if (ok) correct += 1;
        return {
          n: i + 1,
          q: q.q,
          yours: yoursIdx == null ? null : q.options[yoursIdx],
          correctText: q.options[q.answer],
          correct: ok
        };
      });
      const percent = Math.round((correct / total) * 100);
      const payload = {
        submitted: true,
        auto: !!auto,
        correct,
        total,
        percent,
        usedSeconds,
        at: new Date().toLocaleString(),
        review
      };
      localStorage.setItem(`ashovix-assessment-${c.id}`, JSON.stringify(payload));
      if (percent >= (a.passPercent || 70)) markDone(c.id, "sql39");
      render();
    };

    const tick = () => {
      const m = Math.floor(remaining / 60);
      const s = remaining % 60;
      if (timerEl) {
        timerEl.textContent = `${m}:${String(s).padStart(2, "0")}`;
        timerEl.classList.toggle("urgent", remaining <= 300);
      }
      if (remaining <= 0) {
        submitAssessment(true);
        return;
      }
      remaining -= 1;
      window.__assessmentTimer = setTimeout(tick, 1000);
    };

    const updateProgress = () => {
      const answered = form.querySelectorAll("input[type=radio]:checked").length;
      if (bar) bar.style.width = `${Math.round((answered / total) * 100)}%`;
      if (label) label.textContent = `${answered} / ${total} answered`;
    };

    form?.addEventListener("change", updateProgress);
    updateProgress();
    clearTimeout(window.__assessmentTimer);
    tick();

    form?.addEventListener("submit", (e) => {
      e.preventDefault();
      const answered = form.querySelectorAll("input[type=radio]:checked").length;
      if (answered < total && !confirm(`You answered ${answered} of ${total}. Submit anyway?`)) return;
      submitAssessment(false);
    });
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
    else if (path === "workspace") html = viewWorkspace();
    else if (path === "blog") html = viewBlog();
    else if (path === "community") html = viewCommunity();
    else if (path === "login") html = viewAuth("login");
    else if (path === "start") html = viewAuth("start");
    else if (path === "privacy") html = viewLegal("privacy");
    else if (path === "terms") html = viewLegal("terms");
    else if (path === "course" && parts[1] && parts[2] === "lesson" && parts[3]) html = viewLesson(parts[1], parts[3]);
    else if (path === "course" && parts[1] && parts[2] === "labs") html = viewLabs(parts[1]);
    else if (path === "course" && parts[1] && parts[2] === "reference") html = viewReference(parts[1]);
    else if (path === "course" && parts[1] && parts[2] === "assessment") html = viewAssessment(parts[1]);
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

    if (parts[0] === "workspace") initWorkspace();
    if (parts[0] === "course" && parts[2] === "assessment") initAssessment(parts[1]);

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
