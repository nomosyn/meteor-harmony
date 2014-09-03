var path = Npm.require("path");

Package.describe({
  summary: "JavaScript.next-to-JavaScript-of-today compiler",
  version: "1.2.1",
  name: "mquandalle:harmony",
  git: "https://github.com/mquandalle/meteor-harmony.git"
});

Package._transitional_registerBuildPlugin({
  name: "compileHarmony",
  use: [],
  sources: [
    "plugin/compile-harmony.js"
  ],
  npmDependencies: {
    "traceur": "0.0.44"
  }
});

Package.onUse(function (api) {
  // The location of this runtime file is not supposed to change:
  // http://git.io/B2s0Tg
  var dir = ".npm/plugin/compileHarmony/node_modules/traceur/bin/";
  api.addFiles(path.join(dir, "traceur-runtime.js"));

  // Export `module.exports` and `exports` down the package pipeline
  api.imply('mrt:exports');
});

Package.onTest(function (api) {
  api.use(['mquandalle:harmony', 'tinytest']);
  api.addFiles([
    'harmony_test_setup.js',
    'harmony_tests.js',
    'tests/harmony_test_setup.next.js',
    'tests/harmony_tests.next.js'
  ]);
});
