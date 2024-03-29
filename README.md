# GSheets_Tiingo_API
Google Sheets add-on to enable Tiingo as a Stock Quote, Foreign Exchange (FX), or CryptoCurrency (BitCoin, etc.) Quotes Provider Written in Google AppScript (JavaScript)

A standalone Google Finance plug-in.

## Tiingo End Points Covered:

* End-of-Day Quotes
* Intraday Investors Exchange (IEX) Quotes
* Foreign Exchange (FX) Quotes
* Top-of-Book Cryptocurrency Quotes
* News (Partial Coverage)
* Fundamentals (Limited Partial Coverage)

## Installation

1. Create a new Google Sheet (in a Chromium-based browser, just enter sheets.new in the address bar)

2. In the spreadsheet, select Tools from the Menu bar

3. Select <>Code Editor from the Tools Menu

4. Copy and Paste the code from the preferred .gs file from this repository over the existing code

5. Approve the Google Security prompt. No data is shared with me through this project. But, the project is 'unaudited' causing this message. 

## USAGE

### Tiingo End-of-Day Endpoint

#### SYNTAX
  =TIINGOEOD(<a href="https://www.tiingo.com/account/api/token">TIINGO_API_KEY</a>, ticker, factor, startDate, endDate, frequency)
  
##### Example
  =TIINGOEOD("xxxxxxxx", "SPY", "adjClose", TODAY()-1, "daily")
  
At this time, the code is not set to iterate over an array to display the output from multiple days. The best current workaround in this nascent project is to create a list of dates and reference the cell with the dates in them. In addition, I encourage you to create specific cells to hold your API Key and whatever factor or frequency you may desire. With the hardcoded references, updates can be made simply across an entire spreadsheet.

Google Sheets requires that all of the entries be encapsulated in double-quotes (") in your function call. If you're calling a hard-coded cell then this may be omitted in favor of only the cell reference. The dates, startDate and endDate, <b> MUST BE</b> in ISO 8601 Format (YYYY-MM-DD).

For the latest information choices available on this API endpoint please see <a href="https://api.tiingo.com/documentation/end-of-day">Tiingo End-of-Day (EOD) API Documentation</a>

### Intraday Investors Exchange (IEX) Endpoint

#### SYNTAX
  =TIINGOIEX(<a href="https://www.tiingo.com/account/api/token">TIINGO_API_KEY</a>, ticker, factor, afterHours, [opt_Unused])

##### Example
  =TIINGOIEX("xxxxxxxx", "SPY", "tngoLast", "TRUE")

This endpoint queries intraday quotes to get current IEX market data. Included is the ability to select whether afterHours market data is returned. In the tiingo_refresh.gs version of the file, a superfluous argument is included to permit easy manual refreshing of the data. To use this functionality, first use the other code and second, create a cell reference that you can manually change the contents thus forcing a manual data refresh. Whenever you change the contents of that cell, the function will refresh the data.

For the latest information choices available on this API endpoint please see <a href="https://api.tiingo.com/documentation/iex">Tiingo IEX API Documentation</a>

### Foreign Exchange Endpoint

#### SYNTAX
  =TIINGOFX(<a href="https://www.tiingo.com/account/api/token">TIINGO_API_KEY</a>, currencyPair, factor, [opt_Unused])
  
##### Example
  =TIINGOFX("xxxxxxxx", "EURUSD", "midPrice")
  
This endpoint queries the latest/top-of-book from the Tiingo Foreign Exchange API endpoint. In the tiingo_refresh.gs version of the file, a superfluous argument is included to permit easy manual refreshing of the data. To use this functionality, first use the other code and second, create a cell reference that you can manually change the contents thus forcing a manual data refresh. Whenever you change the contents of that cell, the function will refresh the data.

For the latest information choices available on this API endpoint please see <a href="https://api.tiingo.com/documentation/forex">Tiingo Forex API Documentation</a>

### Top-of-Book Cryptocurrency Endpoint

#### SYNTAX

  =TIINGOCRYPTO(<a href="https://www.tiingo.com/account/api/token">TIINGO_API_KEY</a>, cryptoPair, factor, [opt_Unused])

##### Example

  =TIINGOCRYPTO("xxxxxxxx", "BTCUSD", "lastPrice")

This function queries the Tiingo Cryptocurrency Endpoint API. In the tiingo_refresh.gs version of the file, a superfluous argument is included to permit easy manual refreshing of the data. To use this functionality, first use the other code and second, create a cell reference that you can manually change the contents thus forcing a manual data refresh. Whenever you change the contents of that cell, the function will refresh the data.

For the latest information choices available on this API endpoint please see <a href="https://api.tiingo.com/documentation/crypto">Tiingo Crypto API Documentation</a>

### News Endpoint

#### SYNTAX

  =TIINGONEWS(<a href="https://www.tiingo.com/account/api/token">TIINGO_API_KEY</a>, searchType, tickerOrKeyword, responseNumber)
  
##### Example

  =TIINGONEWS("xxxxxxxx", "SPY", "ticker", 0)
  
This function queries the Tiingo News Endpoint API. The responseNumber or record number is zero-based, so the most recent news record will be 0, the next 1, etc. This is in very alpha form as of now.

### Fundamentals Endpoint

#### SYNTAX

  =TIINGOFUNDAMENTALS(<a href="https://www.tiingo.com/account/api/token">TIINGO_API_KEY</a>, ticker, factor)
  
##### Example

  =TIINGOFUNDAMENTALS("xxxxxxxx", "AAPL", "sector")
  
This function queries the Tiingo Fundamental Data Endpoint API. More information can be found at the <a href="https://api.tiingo.com/documentation/fundamentals">Tiingo Fundamentals documentation</a> page. You can also find a full list of the current factors available on the endpoint at the same location.

##### FUNDAMENTALS NOTE: THIS FEATURE REQUIRES A SEPARATE LICENSING FEE FROM TIINGO.

#### KNOWN ISSUES:

Google Sheets does not have a built-in way to refresh API data pulls. This presents some minor inconvenience when dealing with Intraday quotes. However, I have built a janky workaround into the tiingo_refresh.gs file which creates the opt_Unused field present in brackets as "optional" in the documentation above. The easiest way to implement this workaround is to install the tiingo_refresh.gs file and then create a superfluous cell that you can simply insert a random value in and then change the value to force a refresh.

#### FUTURE DEVELOPMENT:

I plan on creating the ability to pull several columns of data and output them at one time rather than only requesting a single factor at a time. It is also far more efficient to make a single query rather than a new query for each ticker requested, so that will also be on the TO DO List. Some of this functionality already exists in another example Google Sheets file from Tiingo. It is trivial to build in this functionality, and I plan on doing so as soon as I get the time.
Continued development of Tiingo Endpoints to create fuller integration with all endpoints.

#### RECENT UPDATES:

Added some code changes to make the EOD Endpoint API more data efficient thus reducing the packet size delivered to Google and speeding up the code.

Many thanks to Rishi Singh for creating Tiingo. This labor of love of mine in building Google Sheets integration is built upon his labor of love in creating the service.
