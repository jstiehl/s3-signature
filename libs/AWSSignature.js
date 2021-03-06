var moment = require('moment-timezone');
var crypto = require('crypto');

//config
var config = require('../config');
//constants
var REGION_NAME = config.region;
var BUCKET = config.s3Bucket;
var SERVICE_NAME = 's3';
var TYPE = 'aws4_request';
var ALGORITHM = 'sha256';

var AWSPostSignature = function(uploadType) {
  var folderPath = ""; //currently just adding file to top level bucket dir
  var date = moment().utc();
  var policyDate = moment(date).format('YYYYMMDD[T]HHmmss[Z]');
  var expiration = moment(date).add(1, 'hour').toISOString();
  var YYYYMMDD = moment(date).format('YYYYMMDD');
  var credential = process.env.AWS_ACCESS_KEY_ID + "/" + YYYYMMDD + "/" + REGION_NAME + "/" + SERVICE_NAME + "/" + TYPE;

  var policy = {
    "expiration": expiration,
    "conditions": [
      {"bucket": BUCKET},
      ["starts-with", "$key", folderPath],
      {"acl": "bucket-owner-full-control"},
      ["starts-with", "$Content-Type", uploadType],
      {"x-amz-server-side-encryption": "AES256"},
      ["starts-with", "$x-amz-meta-tag", ""],
      {"x-amz-credential": credential},
      {"x-amz-algorithm": "AWS4-HMAC-SHA256"},
      {"x-amz-date": policyDate },
      ["content-length-range", 0, 10485760] //limit size to 10 MB
    ]
  };

  var encodedPolicy = new Buffer(JSON.stringify(policy)).toString('base64');

  var kDate = _HMAC(ALGORITHM, YYYYMMDD, 'AWS4' + process.env.AWS_SECRET_ACCESS_KEY);
  var kRegion = _HMAC(ALGORITHM, REGION_NAME, kDate);
  var kService = _HMAC(ALGORITHM, SERVICE_NAME, kRegion);
  var kSigning = _HMAC(ALGORITHM, TYPE, kService);
  var signature = _HMAC(ALGORITHM, encodedPolicy, kSigning).toString('hex');
  var data = {
    signature: signature,
    policy: encodedPolicy,
    date: policyDate,
    key_id: process.env.AWS_ACCESS_KEY_ID,
    path: folderPath,
    bucket: BUCKET,
    region: REGION_NAME
  };
  return data;
};

module.exports = AWSPostSignature;

var _HMAC = function(algorithm, message, passphrase) {
  var hmac = crypto.createHmac(algorithm, passphrase);
  hmac.write(message);
  hmac.end();
  return hmac.read();
};