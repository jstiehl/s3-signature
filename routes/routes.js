var AWSSignature = require('../libs/AWSSignature')

module.exports = function(router) {
  /**
   * /awscredentials returns authorization data needed by client to perform a post directly to s3
   */
  router.route('/awscredentials').get(function(req, res){
    var type = req.query.type;
    var data = AWSSignature(type);
    res.send({status: 200, data: data});
  });

  return router
};