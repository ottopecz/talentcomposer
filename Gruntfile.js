module.exports = function(grunt) {

  grunt.loadNpmTasks("grunt-mocha-test");
  grunt.loadNpmTasks("grunt-eslint");
  grunt.loadNpmTasks("grunt-babel");
  grunt.loadNpmTasks("grunt-contrib-clean");

  grunt.initConfig({
    "mochaTest": {
      "test": {
        "options": {
          "reporter": "spec",
          "captureFile": "test_results.txt",
          "quiet": false,
          "clearRequireCache": true,
          "noFail": false
        },
        "src": ["test-lib/**/*.spec.js"]
      }
    },
    "eslint": {
      "target": ["lib/**/*.js", "test-lib/**/*.spec.js"]
    },
    "clean": [
      "node4-lib"
    ]
  });

  grunt.registerTask("default", ["clean", "eslint", "mochaTest"]);
};
