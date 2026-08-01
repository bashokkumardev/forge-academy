/* Ashovix Labs — shared course registration helpers */
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
