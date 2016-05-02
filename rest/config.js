var dest = 'dist/';
var src = 'app';

module.exports = {
  server: {
    port: process.env.PORT || 4730,
    baseDir: dest
  },
  mongo: {
    database: 'mongodb://localhost:27017/order'
  },
  babel: {
    dependencies: ['es2015']
  },
 vendor: {
    src: ['bower_components/jquery/dist/jquery.js'],
    out: 'vendor.js',
    dest: dest
  },
  bundle: {
    src: src+'/app.js',
    out: 'bundle.js',
    dependencies: [],
    dest: dest
  },
   vendorBundle: {
    out: 'vendor.bundle.js',
    dependencies: [],
    dest: dest
  },
  production: {
    env : process.env.NODE_ENV === 'production'
  }
};