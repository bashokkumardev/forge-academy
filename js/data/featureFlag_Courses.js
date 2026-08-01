/* Ashovix Labs — single place for course visibility flags
 * featureFlag_Courses.js
 *
 * Values: "Yes" = show on Home / Courses UI
 *         "No"  = hide from catalog (course data still loads)
 *
 * Edit only this file to turn courses on or off.
 */
(function () {
  const F = window.FORGE;
  if (!F) return;

  /** @type {Record<string, "Yes" | "No">} */
  const FEATURE_FLAG_COURSES = {
    // Core academies
    sql: "Yes",
    mongo: "Yes",
    git: "Yes",
    db2: "No",

    // Catalog academies
    postgres: "No",
    redis: "No",
    linux: "No",
    docker: "No",
    kubernetes: "No",
    terraform: "No",
    aws: "No",
    azure: "No",
    gcp: "No",
    oracle: "No",
    mysql: "No",
    "python-dba": "No",
    bash: "No",
    devops: "No",
    cicd: "No",
    prometheus: "No",
    rest: "No",
    graphql: "No",
    nodejs: "No",
    "system-design": "No",
    "db-perf": "No",
    warehouse: "No",
    kafka: "No",
    elasticsearch: "No",
    rabbitmq: "No"
  };

  function applyCourseFeatureFlags() {
    const known = new Set(Object.keys(FEATURE_FLAG_COURSES));

    // Apply explicit flags from this file
    Object.keys(FEATURE_FLAG_COURSES).forEach((id) => {
      const course = F.get(id);
      if (!course) return;
      course.featureFlag = F.normalizeFeatureFlag(FEATURE_FLAG_COURSES[id]);
    });

    // Any registered course missing from the map defaults to No (hidden)
    F.listAll().forEach((course) => {
      if (!known.has(course.id)) {
        course.featureFlag = "No";
      } else {
        course.featureFlag = F.normalizeFeatureFlag(FEATURE_FLAG_COURSES[course.id]);
      }
    });
  }

  F.FEATURE_FLAG_COURSES = FEATURE_FLAG_COURSES;
  F.applyCourseFeatureFlags = applyCourseFeatureFlags;

  applyCourseFeatureFlags();
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", applyCourseFeatureFlags);
  }
})();
