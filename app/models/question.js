'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;


var AnswerSchema = {
  date: { type: Date, default: Date.now },
  user: { type: Schema.ObjectId, ref: 'User' },
  body: { type: String, trim: true },
  title: { type: String, trim: true }
}

/**
 * Article Schema
 */
var QuestionSchema = new Schema({
  created: {
    type: Date,
    default: Date.now
  },
  title: {
    type: String,
    default: '',
    trim: true
  },
  content: {
    type: String,
    default: '',
    trim: true
  },
  user: {
    type: Schema.ObjectId,
    ref: 'User'
  },
  upvotes_count: Number,
  upvotes: [ { type: Schema.ObjectId, ref: 'User' } ],
  downvotes_count: Number,
  downvotes: [ { type: Schema.ObjectId, ref: 'User' } ],
  answers: [ AnswerSchema ]
});

/**
 * Validations
 */
QuestionSchema.path('title').validate(function (title) {
  return title.length;
}, 'Title cannot be blank');

/**
 * Statics
 */
QuestionSchema.statics.load = function (id, cb) {
  this.findOne({
    _id: id
  }).populate('user', 'name username').exec(cb);
};

mongoose.model('Question', QuestionSchema);
