'use strict';

// Articles routes use articles controller
var questions = require('../controllers/questions');
var authorization = require('./middlewares/authorization');

// Article authorization helpers
var hasAuthorization = function(req, res, next) {
	if (req.question.user.id !== req.user.id) {
        return res.send(401, 'User is not authorized');
    }
    next();
};

module.exports = function(app) {

    app.get('/questions', questions.all);
    app.post('/questions', authorization.requiresLogin, questions.create);
    app.get('/articles/:questionId', questions.show);
    app.put('/articles/:questionId', authorization.requiresLogin, hasAuthorization, questions.update);
    app.del('/articles/:questionId', authorization.requiresLogin, hasAuthorization, questions.destroy);

    // Finish with setting up the articleId param
    app.param('questionId', questions.question);

};