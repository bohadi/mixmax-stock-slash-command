# Stock Slash Command for Mixmax

This is an open source Mixmax Slash Command.<br>
See <http://developer.mixmax.com/docs/overview-slash-commands#tutorial-building-mygiphy> for more information.

## What it does

Add realtime stock quotes (NYSE/Nasdaq/AMEX/Arca) with Mixmax.

Typeahead
![typeahead](https://raw.githubusercontent.com/bohadi/mixmax-stock-slash-command/master/img/typeahead.gif)

Resolver
![resolver](https://raw.githubusercontent.com/bohadi/mixmax-stock-slash-command/master/img/resolver.png)

## Running locally

1. Install using `npm/yarn install`
2. Run using `npm start`
3. Add the command (/stock) in your Mixmax dashboard:<br>
   Typeahead API URL: http://localhost:9149/typeahead<br>
   Typeahead API URL: http://localhost:9149/resolver
4. Enable chrome://flags '#allow-insecure-localhost'<br>
   See [here](http://developer.mixmax.com/docs/integration-api-appendix#local-development-error-neterr_insecure_response) for how to fix the **ERR_INSECURE_RESPONSE** error that you might get in Chrome.

## Improvements

1. Thumbnail company logo (if applicable)
2. Insert charting
3. Insert recent news
4. Forex and crypto

## Data

[Xignite](http://www.xignite.com/labs/typeahead#USEquities) and [IEX](https://iextrading.com/developer/docs/#quote)
