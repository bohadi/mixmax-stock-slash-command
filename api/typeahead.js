//var key      = require('../utils/key');
var request  = require('request');
var sync     = require('synchronize');
var _        = require('underscore');
var typeaheadTemplate = require('../utils/template.js').typeahead;

// The Type Ahead API.
module.exports = function(req, res) {
  var term = req.query.text.trim();
  if (!term) {
    res.json([{
      title: '<i>(search for a company or symbol)</i>',
      text: ''
    }]);
    return;
  }

  var response;
  try {
    response = sync.await(request({
      url: 'http://search.xignite.com/Search/Suggest',
      qs: {
        parameter: 'XigniteFinancials.GetCompanyBalanceSheet.Identifier',
        tags:      'XNYS,XNAS,XASE,ARCX',
        limit:     6,
        term:      term,
      },
      gzip: true,
      json: true,
      timeout: 10 * 1000
    }, sync.defer()));
  } catch (e) {
    res.status(500).send('Error');
    return;
  }

  if (response.statusCode !== 200 || !response.body) {
    res.status(500).send('Error');
    return;
  }

  var results = _.chain(response.body.Results)
    .reject(function(data) {
      return !data.Value || !data.Text || !data.Tag;
    })
    .map(function(data) {
      return {
        title: typeaheadTemplate(data),
        text: data.Value
      };
    })
    .value();

  if (results.length === 0) {
    res.json([{
      title: '<i>(no results)</i>',
      text: ''
    }]);
  } else {
    res.json(results);
  }
};
