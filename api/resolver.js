//var key     = require('../utils/key');
var request  = require('request');
var sync     = require('synchronize');
var _        = require('underscore');

// The API that returns the in-email representation.
module.exports = function(req, res) {
  var symbol = req.query.text.trim();
  handleSearchString(symbol, req, res);
};

function handleSearchString(symbol, req, res) {
  var response;
  try {
    response = sync.await(request({
      url: 'https://api.iextrading.com/1.0/stock/' + symbol + '/quote',
      qs: {},
      gzip: true,
      json: true,
      timeout: 15 * 1000
    }, sync.defer()));
  } catch (e) {
    res.status(500).send('Error');
    return;
  }

  if (response.statusCode !== 200 || !response.body.symbol ||
      !response.body.latestPrice || !response.body.changePercent) {
    res.status(500).send('Error');
    return;
  }

  var linkto = 'https://finance.yahoo.com/quote/' + response.body.symbol;

  var html = '<div style="border:2px solid rgba(9,42,255,0.3);border-radius:8px 8px 3px;'
  html += 'padding:2px;font-family:Arial,sans-serif;font-size:0.8em;">'
  html += '<a href="'+linkto+'" target="_blank" style="text-decoration:none;color:black">';
  html += '<span style="font-weight:bold;">' + response.body.latestPrice +' '+ '</span> ';
  html += '<span style="font-size:0.9em;';
  var sign = '';
  if (response.body.changePercent > 0) {
    html += 'color:green;';
    sign = '+';
  }
  else if (response.body.changePercent < 0) {
    html += 'color:red;';
  }
  html += '">' +sign+ (100*response.body.changePercent).toFixed(2) + '% </span>';
  html += '<span style="font-family:Times,serif;font-size:1.1em;">';
  html += response.body.symbol + '</span></a></div>';

  res.json({
    body: html
  });
}

