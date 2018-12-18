module.exports = grunt => {

  require("load-grunt-tasks")(grunt);

  let plugin = grunt.file.readJSON('plugin.json');
  let pkg = grunt.file.readJSON('package.json');

  grunt.initConfig({

    clean: ["dist"],

    copy: {
      src_to_dist: {
        cwd: "src",
        expand: true,
        src: ["partials/*.html", "css/*.css"],
        dest: "dist"
      },
      pluginDef: {
        expand: true,
        src: ["plugin.json", "README.md"],
        dest: "dist"
      },
      img_to_dist: {
        cwd: "src",
        expand: true,
        src: ["img/**/*"],
        dest: "dist/src/"
      }
    },

    run: {
      options: {
      },
      tests: {
        exec: "npm run test"
      }
    },

    watch: {
      rebuild_all: {
        files: ["src/**/*", "plugin.json", "README.md"],
        tasks: ["dev"],
        options: {
          debounceDelay: 250,
          spawn: false
        }
      }
    },

    tslint: {
      options: {
        configuration: "tslint.json"
      },
      files: {
        src: ['src/**/*.ts'],
      },
    },

    ts: {
      build: {
        tsconfig: './tsconfig.json'
      }
    },

    uglify: {
      options: {
        mangle: false
      },
      ts: {
        options: {
          sourceMap: false,
          banner: `/*! 
Plugin Name : ${plugin.name}
Plugin ID : ${pkg.name}
Plugin URL : ${plugin.info.links.map(l => l.url).join(", ")}
Plugin Author : ${ plugin.info.author.name + " " + plugin.info.author.url}
Plugin Version : v${ pkg.version}
Built on : <%= grunt.template.today("yyyy-mm-dd HH:MM") %>
*/
`
        },
        files: [{
          expand: true,
          cwd: '.tmp/compile_output/typescript',
          src: '**/*.js',
          dest: 'dist/'
        }]
      }
    }

  });

  grunt.registerTask("dev", [
    "ts:build",
    "copy:src_to_dist",
    "copy:pluginDef",
    "copy:img_to_dist"
  ]);

  grunt.registerTask("test", [
    "run:tests",
    "tslint",
  ]);

  grunt.registerTask("default", [
    "clean",
    "run:tests",
    "tslint",
    "ts:build",
    "uglify:ts",
    "copy:src_to_dist",
    "copy:pluginDef",
    "copy:img_to_dist"
  ]);
};