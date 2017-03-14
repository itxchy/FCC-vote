"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var mockPollObject = {
  "_id": "585710be7d132d5bf9ba14e0",
  "updatedAt": "2017-03-12T21:46:19.924Z",
  "createdAt": "2016-12-18T22:42:06.571Z",
  "owner": "Borg",
  "totalVotes": 5,
  "title": "First there is a(n)...",
  "__v": 0,
  "options": [{
    "option": "mark",
    "_id": "58a24fe8496b7d40125dc5b6",
    "votes": [{
      "voter": "Borg",
      "_id": "58a24feb496b7d40125dc5b7"
    }, {
      "voter": "damon",
      "_id": "58a3b2d71c5955499e7de8a9"
    }, {
      "_id": "58a930756f6af831d8485cd8",
      "voter": "::ffff:127.0.0.1"
    }, {
      "_id": "58c5c1abc93bfe374f52d938",
      "voter": "Clang"
    }]
  }, {
    "option": "hill",
    "_id": "58a24fe8496b7d40125dc5b5",
    "votes": [{
      "voter": "john",
      "_id": "58a3a62716cf5e36f6e130c0"
    }, {
      "_id": "58aa27f0b5183c179bc8d5e3",
      "voter": "flamable"
    }]
  }, {
    "option": "egg",
    "_id": "58a24fe8496b7d40125dc5b4",
    "votes": []
  }]
};

exports.default = mockPollObject;