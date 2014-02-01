'use strict';

/**
 * Module dependencies.
 */
process.env.NODE_ENV = 'test';
require('mongoose').connect(require('../../../config/config').db);
require('../../../app/models/user');
require('../../../app/models/question');

var should = require('should'),
    mongoose = require('mongoose'),
    User = mongoose.model('User'),
    Question = mongoose.model('Question');

//Globals
var user;
var question;

//The tests
describe('<Unit Test>', function() {
    describe('Model Question:', function() {
        beforeEach(function(done) {
            user = new User({
                name: 'Full name',
                email: 'test@test.com',
                username: 'user',
                password: 'password'
            });

            user.save(function() {
                question = new Question({
                    title: 'Question Title',
                    content: 'Question Content',
                    user: user
                });

                done();
            });
        });

        describe('Method Save', function() {
            it('should be able to save without problems', function(done) {
                return question.save(function(err) {
                    should.not.exist(err);
                    done();
                });
            });

            it('should be able to show an error when try to save without title', function(done) {
                question.title = '';

                return question.save(function(err) {
                    should.exist(err);
                    done();
                });
            });
        });

        afterEach(function(done) {
            Question.remove({});
            User.remove({});
            done();
        });
        after(function(done) {
            Question.remove().exec();
            User.remove().exec();
            done();
        });
    });
});