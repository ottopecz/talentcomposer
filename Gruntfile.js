module.exports = function(grunt) {

  require("load-grunt-tasks")(grunt);

  grunt.initConfig({
    "eslint": {
      "target": ["lib/**/*.js", "test-lib/**/*.spec.js"]
    },
    "shell": {
      "lab": {
        "command": "./node_modules/.bin/lab -I regeneratorRuntime,Observable,__core-js_shared__,core,System," +
        "_babelPolyfill,asap -S -r console -m 4000 -o stdout -r lcov -o coverage.info -c --coverage-path lib 'test-lib'"
      }
    },
    "coveralls": {
      "target": {
        "src": "coverage.info"
      }
    }
  });

  grunt.registerTask("default", ["eslint", "shell:lab"]);
};
