var dest = 'dist/';
var src = 'app';

module.exports = {
  browserSync: {
    server: {
      baseDir: dest
    }
  },
  server: {
    port: process.env.PORT || 4000,
    baseDir: dest
  },
  babel: {
    dependencies: ['es2015', 'react']
  },
 vendor: {
    src: ['bower_components/jquery/dist/jquery.js', 'bower_components/bootstrap/dist/js/bootstrap.js'],
    out: 'vendor.js',
    dest: dest
  },
  bundle: {
    src: src+'/scripts/app.js',
    out: 'bundle.js',
    dependencies: ['alt',
				  'react',
				  'react-dom',
				  'react-router',
				  'underscore'],
    dest: dest
  },
   vendorBundle: {
    out: 'vendor.bundle.js',
    dependencies: ['alt',
				  'react',
				  'react-dom',
				  'react-router',
				  'underscore'],
    dest: dest
  },
  less: {
    src: src + '/less/**/*.less',
    dest: dest
  },
  markup: {
    src: [src + '/html/**'],
    dest: dest
  },
  production: {
    env : process.env.NODE_ENV === 'production'
  }
};