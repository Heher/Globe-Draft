module.exports = function(app) {
  var Draft = require('../models/drafts');
  app.get('/api/drafts', function (request, response) {
    Draft.find({}, function(err, drafts) {
      response.json(drafts);
    });
  });

  app.post('/api/drafts', function (request, response) {
    Draft.create(request.body, function(err, draft) {
      response.json(draft);
    });
  });

  app.put('/api/drafts', function (request, response) {
    Draft.findByIdAndUpdate(request.body.draft, { $set: request.body.payload }, { new: true }, function(err, draft) {
      response.json(draft);
    });
  });

  app.delete('/api/drafts', function (request, response) {
    Draft.find(request.body).remove(function(err, draft) {
      response.json(draft);
    });
  });

  app.post('/api/drafts/reset', function(request, response) {
    Draft.remove({}, function(err, drafts) {
      response.json(drafts);
    });
  });
}
