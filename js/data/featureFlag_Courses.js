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
    db2: "Yes",

    // Catalog academies
    postgres: "Yes",
    redis: "Yes",
    linux: "Yes",
    docker: "Yes",
    kubernetes: "Yes",
    terraform: "Yes",
    aws: "Yes",
    azure: "Yes",
    gcp: "Yes",
    oracle: "Yes",
    mysql: "Yes",
    "python-dba": "Yes",
    bash: "Yes",
    devops: "Yes",
    cicd: "Yes",
    prometheus: "Yes",
    rest: "Yes",
    graphql: "Yes",
    nodejs: "Yes",
    "system-design": "Yes",
    "db-perf": "Yes",
    warehouse: "Yes",
    kafka: "Yes",
    elasticsearch: "Yes",
    rabbitmq: "Yes"
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
