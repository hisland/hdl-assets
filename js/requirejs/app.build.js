({
    appDir: "./",
    baseUrl: "./",
    dir: "../requirejs-build",
    //Comment out the optimize line if you want
    //the code minified by UglifyJS
    optimize: "none",

    paths: {
        "jquery": "jquery-1.7.1"
    },

	packages: ['css']
})
