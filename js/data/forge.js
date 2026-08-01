/* Ashovix Labs multi-course registry */
window.FORGE = {
  brand: "Ashovix Labs",
  courses: {},
  /** Normalize featureFlag to "Yes" or "No". Default Yes when missing. */
  normalizeFeatureFlag(value) {
    if (value === false || value === 0) return "No";
    if (value === true || value === 1) return "Yes";
    const s = String(value == null ? "Yes" : value).trim().toLowerCase();
    if (s === "no" || s === "n" || s === "off" || s === "false" || s === "0") return "No";
    return "Yes";
  },
  isEnabled(course) {
    if (!course) return false;
    return this.normalizeFeatureFlag(course.featureFlag) === "Yes";
  },
  register(course) {
    if (!course || !course.id) throw new Error("Course needs an id");
    course.modules = course.modules || [];
    course.lessons = course.lessons || {};
    course.labs = course.labs || [];
    course.orderedLessonIds = course.modules.flatMap((m) => m.lessonIds);
    course.featureFlag = this.normalizeFeatureFlag(course.featureFlag);
    this.courses[course.id] = course;
  },
  list(opts) {
    const all = Object.values(this.courses).sort((a, b) => (a.order || 99) - (b.order || 99));
    if (opts && opts.all) return all;
    return all.filter((c) => this.isEnabled(c));
  },
  listAll() {
    return this.list({ all: true });
  },
  get(id) {
    return this.courses[id];
  },
  allLessons() {
    const out = [];
    this.list().forEach((c) => {
      c.orderedLessonIds.forEach((lid) => {
        const L = c.lessons[lid];
        if (L) out.push({ courseId: c.id, courseTitle: c.title, lesson: L });
      });
    });
    return out;
  }
};
