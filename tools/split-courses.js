/**
 * Split course-catalog.js generated courses into js/data/courses/course-*.js
 * and write shared helper + thin marketing files.
 */
const fs = require("fs");
const path = require("path");

const root = "c:/Users/ashok/Desktop/Project";
const catalogPath = path.join(root, "js/data/course-catalog.js");
const outDir = path.join(root, "js/data/courses");
fs.mkdirSync(outDir, { recursive: true });

const src = fs.readFileSync(catalogPath, "utf8");

// Extract catalog array text
const start = src.indexOf("const catalog = [");
const end = src.indexOf("];", start);
if (start < 0 || end < 0) throw new Error("catalog array not found");
const catalogJs = src.slice(start, end + 2);

// Evaluate catalog in a sandbox-ish way
const catalog = Function(`${catalogJs}; return catalog;`)();

const helperSrc = `/* Ashovix Labs — shared course registration helpers */
(function () {
  const F = window.FORGE;
  if (!F) throw new Error("FORGE must load before course-helpers.js");

  function estimateDuration(lessonCount) {
    const hours = Math.max(4, Math.round(lessonCount * 0.55));
    return hours + "+ hrs";
  }

  function makeLesson(prefix, n, title, topic, steps) {
    const id = prefix + String(n).padStart(2, "0");
    const stepHtml = (steps || []).map(function (s, i) {
      return "<li><strong>Step " + (i + 1) + ".</strong> " + s + "</li>";
    }).join("");
    return {
      id: id,
      title: title,
      level: n <= 3 ? "Beginner" : n <= 7 ? "Intermediate" : "Advanced",
      duration: "25–40 min",
      objectives: [
        "Understand " + topic,
        "Complete every step without skipping",
        "Verify your result before moving on"
      ],
      content: [
        "<p>This lesson covers <strong>" + topic + "</strong> with no skipped steps. Follow the sequence exactly, then use the verify checklist.</p>",
        "<h2>Step-by-step</h2>",
        "<ol>" + stepHtml + "</ol>",
        '<div class="callout"><strong>Verify:</strong>',
        "<ul>",
        "  <li>You completed every step above in order.</li>",
        "  <li>You can explain what each command/action did.</li>",
        "  <li>You saved notes or a screenshot of the final successful output.</li>",
        "</ul>",
        "</div>",
        '<div class="callout warning"><strong>Common mistake:</strong> Skipping prerequisites from earlier lessons. If something fails, go back one lesson and re-verify.</div>'
      ].join("\n"),
      quiz: {
        q: "What is the safest way to learn " + topic + "?",
        options: [
          "Skip to the last command only",
          "Follow every step, then verify the result",
          "Memorize marketing slogans",
          "Avoid practicing on a local machine"
        ],
        answer: 1
      }
    };
  }

  function registerGenerated(meta, modulesSpec) {
    const lessons = {};
    const modules = modulesSpec.map(function (m, mi) {
      const lessonIds = [];
      m.lessons.forEach(function (lessonDef, li) {
        const n = mi * 10 + li + 1;
        const L = makeLesson(meta.prefix, n, lessonDef.title, lessonDef.topic, lessonDef.steps);
        lessons[L.id] = L;
        lessonIds.push(L.id);
      });
      return { id: meta.id + "-m" + (mi + 1), title: m.title, lessonIds: lessonIds };
    });

    const ordered = modules.flatMap(function (m) { return m.lessonIds; });
    F.register({
      id: meta.id,
      order: meta.order,
      title: meta.title,
      shortTitle: meta.shortTitle || meta.title,
      tagline: meta.tagline,
      level: meta.level || "Beginner → Advanced",
      accent: meta.accent || "#4DA3FF",
      description: meta.description,
      audience: meta.audience || "Developers & engineers",
      thumbnail: meta.thumbnail || "",
      logo: meta.logo || meta.id,
      technology: meta.technology || meta.logo || meta.id,
      badge: meta.badge || "",
      difficulty: meta.difficulty || "Intermediate",
      duration: meta.duration || estimateDuration(ordered.length),
      featured: !!meta.featured,
      category: meta.category || "Engineering",
      modules: modules,
      lessons: lessons,
      labs: ordered.slice(0, 4).map(function (id, i) {
        return {
          id: meta.id + "-lab" + (i + 1),
          title: "Lab " + (i + 1) + ": " + lessons[id].title,
          lesson: id,
          steps: "Re-do every step from the lesson on a clean environment. Document commands and final verification output."
        };
      })
    });
  }

  F.estimateDuration = estimateDuration;
  F.makeLesson = makeLesson;
  F.registerGenerated = registerGenerated;
})();
`;

fs.writeFileSync(path.join(root, "js/data/course-helpers.js"), helperSrc);

// Keep marketing + enrich in course-catalog.js (thin)
const marketingMatch = src.match(/F\.marketing = \{[\s\S]*?\n  \};/);
if (!marketingMatch) throw new Error("marketing block not found");

const thinCatalog = `/* Ashovix Labs — marketing content + flagship enrich */
(function () {
  const F = window.FORGE;

  ${marketingMatch[0]}

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
`;

fs.writeFileSync(catalogPath, thinCatalog);

const scriptTags = [];
for (const entry of catalog) {
  const id = entry.meta.id;
  const fileName = `course-${id}.js`;
  const filePath = path.join(outDir, fileName);
  const body = `/* Ashovix Labs — ${entry.meta.title} */
(function () {
  const F = window.FORGE;
  if (!F || !F.registerGenerated) {
    console.error("course-helpers.js must load before ${fileName}");
    return;
  }
  F.registerGenerated(${JSON.stringify(entry.meta, null, 2)}, ${JSON.stringify(entry.modules, null, 2)});
})();
`;
  fs.writeFileSync(filePath, body);
  scriptTags.push(`  <script src="js/data/courses/${fileName}?v=20260802h"></script>`);
  console.log("wrote", fileName);
}

fs.writeFileSync(
  path.join(outDir, "_manifest.json"),
  JSON.stringify(catalog.map((e) => e.meta.id), null, 2)
);
fs.writeFileSync(
  path.join(root, "tools/course-script-tags.txt"),
  scriptTags.join("\n")
);
console.log("done", catalog.length, "courses");
