var AWSSignature = require('../libs/AWSSignature')
var config = require('../config');
var bucket = config.s3Bucket

module.exports = function(router) {
  /**
   * /awssignature returns signature needed by client to perform a post directly to s3
   */
  router.route('/awssignature').get(function(req, res){
    var type = req.query.type;
    var data = AWSSignature(type, bucket);
    res.send({status: 200, data: data});
  });

  return router
};