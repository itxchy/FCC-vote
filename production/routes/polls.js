'use strict';

var express = require('express');
var isEmpty = require('lodash/isEmpty');
var async = require('asyncawait/async');
var awaitFake = require('asyncawait/await');
var Poll = require('../models/Poll');
var authenticate = require('../server/middleware/authenticate');
var commonValidations = require('./shared/createAPollValidation');

var _require = require('./lib/pollsLib'),
    getVoterIdentity = _require.getVoterIdentity;

var _require2 = require('./lib/pollsDb'),
    checkVoterUniqueness = _require2.checkVoterUniqueness,
    updateDocumentWithNewVote = _require2.updateDocumentWithNewVote,
    updateDocumentVotesTotal = _require2.updateDocumentVotesTotal,
    updatePollDocumentOnEdit = _require2.updatePollDocumentOnEdit;

var router = express.Router();

function validateNewPoll(res, data, commonValidations) {
  // Ugly hack to rename keys so they can be validated by createAPollValidation
  var validatorData = {
    newPollTitle: data.title,
    newPollOptions: data.options
  };

  var _commonValidations = commonValidations(validatorData),
      errors = _commonValidations.errors;

  // Checks if a poll of the same title exists already
  // Each poll title must be unique


  return Poll.find({ title: data.title }).exec().then(function (poll) {
    if (!isEmpty(poll)) {
      errors.title = 'Another poll has the same title';
    }
    return {
      errors: errors,
      isValid: isEmpty(errors)
    };
  }).catch(function (err) {
    return res.status(500).json({ 'duplicate poll check error': err });
  });
}

function validateUpdatedPoll(res, data, commonValidations) {
  var validatorData = {
    newPollTitle: data.title,
    newPollOptions: data.options
  };

  var _commonValidations2 = commonValidations(validatorData),
      errors = _commonValidations2.errors,
      isValid = _commonValidations2.isValid;

  return { errors: errors, isValid: isValid };
}

/**
 * Saves a new poll to the database if it passes
 * validation
 */
router.post('/', authenticate, function (req, res) {
  validateNewPoll(res, req.body, commonValidations).then(function (result) {
    if (result.isValid) {
      var poll = new Poll();
      var _req$body = req.body,
          title = _req$body.title,
          options = _req$body.options,
          owner = _req$body.owner;


      var formattedOptions = options.map(function (option) {
        return {
          option: option,
          votes: []
        };
      });

      poll.title = title;
      poll.options = formattedOptions;
      poll.totalVotes = 0;
      poll.owner = owner;

      poll.save().then(function (poll) {
        res.json({ success: 'new poll created!', poll: poll });
      }).catch(function (err) {
        return res.status(500).json({ 'new poll DB save error': err });
      });
    } else {
      res.status(400).json({ 'poll validation error': result.errors });
    }
  }).catch(function (err) {
    return res.status(500).json({ 'Poll validation promise rejected': err });
  });
});

/**
 *  Edits a poll
 */
router.put('/edit/:id', authenticate, function (req, res) {
  var validate = validateUpdatedPoll(res, req.body, commonValidations);
  if (!validate.isValid) {
    return res.status(400).json({ 'bad request': 'bad data for poll edit', errors: validate.errors });
  }

  var applyPollEdits = async(function applyPollEdits(req, res) {
    try {
      var updatedPoll = awaitFake(updatePollDocumentOnEdit(req.params.id, req.body));
      console.log('edit: updatedPoll:', updatedPoll);
      if (updatedPoll.updatedDoc) {
        return res.json(updatedPoll.updatedDoc);
      }
      if (updatedPoll.error) {
        return res.status(500).json({ 'poll edit failed in database operation': updatedPoll.error });
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json({ 'poll edit failed': error });
    }
  });

  applyPollEdits(req, res);
});

/**
 * Updates a poll with a new vote
 */
router.put('/:id', function (req, res) {
  var pollID = req.params.id;
  var selectedOption = req.body.selectedOption;
  var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  var voter = getVoterIdentity(req, ip);

  if (!voter) {
    return res.status(400).json({ error: 'no voter or IP found while updating poll' });
  }

  /**
   * Adds a new unique vote to the relevent poll document in MongoDB. Duplicate voters are rejected.
   * Returns the updated poll document from MongoDB, along with the new totalVotes value
   */
  var addNewVoteToPoll = async(function addNewVoteToPoll(req, res) {
    try {
      // check if voter has already voted
      var dupeCheck = awaitFake(checkVoterUniqueness(pollID, voter));
      if (dupeCheck) {
        return res.status(400).json({
          'bad request': 'user or IP can only vote once per poll',
          dupeVoter: true
        });
      }
      // add new vote to current poll
      var updatedPoll = { updated: false, totalVotes: null, doc: null };
      updatedPoll = awaitFake(updateDocumentWithNewVote(selectedOption, pollID, voter));
      if (!updatedPoll.updated) {
        return res.status(500).json({
          error: 'Failed to update poll with a valid new vote',
          details: updatedPoll.error
        });
      }
      // add new vote total to poll
      var updatedTotalVotes = awaitFake(updateDocumentVotesTotal(pollID, updatedPoll.totalVotes));
      if (!updatedTotalVotes.updated) {
        return res.status(500).json({
          error: 'Failed to update total votes tally',
          details: updatedTotalVotes.error });
      }
      console.log('updatedTotalVotes.doc', updatedTotalVotes.doc);
      return res.json({
        success: 'new vote and new total votes tally saved',
        poll: updatedPoll.doc,
        totalVotes: updatedTotalVotes.doc,
        dupeVote: false
      });
    } catch (error) {
      console.error('caught ERROR', error);
      return res.status(500).json({ error: 'Failed to add new vote to the current poll\'s document' });
    }
  });

  addNewVoteToPoll(req, res);
});

/**
 * Retrieves all polls
 */
router.get('/', function (req, res) {
  Poll.find().select('_id title options totalVotes owner').exec().then(function (polls) {
    return res.json(polls);
  }).catch(function (err) {
    return res.status(500).json({ 'error retrieving all polls': err });
  });
});

/**
 * Retrieves all of a user's polls
 */
router.get('/:user', function (req, res) {
  Poll.find({ owner: req.params.user }).select('_id title options totalVotes owner').exec().then(function (polls) {
    return res.json(polls);
  }).catch(function (err) {
    return res.status(500).json({ 'error retrieving current user\'s polls': err });
  });
});

/**
 * Retrieves a single poll based on poll ID
 */
router.get('/id/:id', function (req, res) {
  Poll.find({ _id: req.params.id }).select('_id title options totalVotes owner').exec().then(function (poll) {
    console.log('mongo returned this poll:', poll);
    return res.json(poll);
  }).catch(function (err) {
    return res.status(500).json({ 'error retrieveing single poll': err });
  });
});

/**
 * Deletes a poll forever based on ID
 */
router.delete('/delete/:id', function (req, res) {
  Poll.find({ _id: req.params.id }).remove().exec().then(function (poll) {
    console.log('This poll has been deleted!:', poll);
    return res.json(poll);
  }).catch(function (err) {
    return res.status(500).json({ 'error deleting poll': err });
  });
});

module.exports = router;