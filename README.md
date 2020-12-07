# GSheets_Tiingo_API
Add-on to enable Tiingo as a Stock Quote, Foreign Exchange (FX), or CryptoCurrency (BitCoin, etc.) Quotes Provider Written in Google App Script

## Tiingo End Points Covered:

* End-of-Day Quotes
* Intraday Investors Exchange (IEX) Quotes
* Foreign Exchange (FX) Quotes
* Top-of-Book Cryptocurrency Quotes

## Installation

// Fill This Out

## USAGE

### Tiingo End-of-Day Endpoint

#### SYNTAX
  =TIINGOEOD(<a href="https://www.tiingo.com/account/api/token">TIINGO_API_KEY</a>, ticker, factor, startDate, endDate, frequency)
  
##### Example
  =TIINGOEOD("xxxxxxxx", "SPY", "adjClose", TODAY()-1, "daily")
  
At this time, the code is not set to iterate over an array to display the output from multiple days. The best current workaround in this nascent project is to create a list of dates and reference the cell with the dates in them. In addition, I encourage you to create specific cells to hold your API Key and whatever factor or frequency you may desire. With the hardcoded references, updates can be made simply across an entire spreadsheet.

Google Sheets requires that all of the entries be encapsulated in double-quotes (") in your function call. If you're calling a hard-coded cell then this may be omitted in favor of only the cell reference. The dates, startDate and endDate, <b> MUST BE</b> in ISO 8601 Format (YYYY-MM-DD).

### Intraday Investors Exchange (IEX) Endpoint

// Fill This Out

### Foreign Exchange Endpoint

// Fill This Out

### Top-of-Book Cryptocurrency Endpoint

// Fill This Out

#### KNOWN ISSUES:

// Fill This Out
