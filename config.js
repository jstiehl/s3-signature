var fs = require('fs');
var env = require('node-env-file');

//API Key is being kept in .env, which is in .gitignore, to avoid accidentally publishing key publicly
var path = __dirname + "/.env";
if(fs.existsSync(path)) {
  env(path);
} else {
  throw new Error("Environment file does not exist!");
}

module.exports = {
  server: {
    port: 5000,
    prefix: '/v1'
  },
  s3Bucket: process.env.BUCKET,
  region: process.env.REGION || 'us-west-2'
};