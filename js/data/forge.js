/* ForgeLab multi-course registry */
window.FORGE = {
  brand: "ForgeLab",
  courses: {},
  register(course) {
    if (!course || !course.id) throw new Error("Course needs an id");
    course.modules = course.modules || [];
    course.lessons = course.lessons || {};
    course.labs = course.labs || [];
    course.orderedLessonIds = course.modules.flatMap((m) => m.lessonIds);
    this.courses[course.id] = course;
  },
  list() {
    return Object.values(this.courses).sort((a, b) => (a.order || 99) - (b.order || 99));
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
