// Copyright 2020, Geoffrey A. Pitman

// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.

//  This program is distributed in the hope that it will be useful,
//  but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
//  GNU General Public License for more details.

//  You should have received a copy of the GNU General Public License
//  along with this program.  If not, see <https://www.gnu.org/licenses/>.

function retrieveData(url) {

  // Helper Function to Parse Data From Other Functions

  // Retrieve JSON Formatted Data
  var json = UrlFetchApp.fetch(url, {'muteHttpExceptions': true});
  
  // Parse JSON Formatted Data
  return JSON.parse(json);
}

/**
*
* Retrieves End-of-Day Quotes from Tiingo API
* For more information, please see https://api.tiingo.com/documentation/end-of-day
*
* @param {Tiingo_API_Key} authorization Tiingo API Key from https://www.tiingo.com/account/api/token
* @param {"SPY"} ticker A ticker symbol
* @param {"adjClose"} factor A field name from Tiingo API 
*                            {date, open, high, low, close, volume, adjOpen, adjHigh, adjLow, adjClose, adjVolume, divCash, splitFactor}
* @param {TEXT("2020-01-01", "YYYY-MM-DD")} startDate First record date requested
* @param {TEXT("2020-01-02", "YYYY-MM-DD")} endDate Last record date requested
* @param {"daily"} frequency A resampling frequency {daily, weekly, monthly}
* @returns A single data point from the Tiingo End-Of-Day API on a specific date
* @customfunction
*/

function TIINGOEOD(authorization, ticker, factor, startDate, endDate, frequency) {

  // KNOWN ISSUE: Dates From Sheets Cell Require Conversion to Work, e.g. "=TEXT(date, "YYYY-MM-DD")"
  // GOOGLE WON'T FIX Ability to Call Built-In Functions from Custom Functions
  // SEE: https://issuetracker.google.com/issues/36752287

  var url = 'https://api.tiingo.com/tiingo/daily/' + ticker + '/prices?startDate=' + startDate + '&endDate=' + endDate + '&resampleFreq=' + frequency + '&token=' + authorization;

  return retrieveData(url)[0][factor];
}

/**
*
* Retrieves IntraDay Quotes from Tiingo API
* For more information, please see https://api.tiingo.com/documentation/iex
*
* @param {Tiingo_API_Key} authorization Tiingo API Key from https://www.tiingo.com/account/api/token
* @param {"SPY"} ticker A ticker symbol
* @param {"tngoLast"} factor A field name from Tiingo API 
*                            {date, open, high, low, close, volume, adjOpen, adjHigh, adjLow, adjClose, adjVolume, divCash, splitFactor}
* @param {"True"} afterHours Request after market hours quotes {True or False}
* @returns A single data point from the Tiingo IEX API
* @customfunction
*/

function TIINGOIEX(authorization, ticker, factor, afterHours) {

  var url = 'https://api.tiingo.com/iex/' + ticker + '?token=' + authorization + '&afterHours=' + afterHours;

  return retrieveData(url)[0][factor];
}

/**
*
* Retrieves IntraDay Quotes from Tiingo API
* For more information, please see https://api.tiingo.com/documentation/forex
*
* @param {Tiingo_API_Key} authorization Tiingo API Key from https://www.tiingo.com/account/api/token
* @param {"EURUSD"} currencyPair A standard currency pair
* @param {"midPrice"} factor A field name from Tiingo API 
*                            {ticker, timestamp, midPrice, bidSize, bidPrice, askSize, askPrice}
* @returns A single data point from the Tiingo Foreign Exchange API
* @customfunction
*/

function TIINGOFX(authorization, currencyPair, factor) {

  var url = 'https://api.tiingo.com/tiingo/fx/' + currencyPair + '/top?token=' + authorization;

  return retrieveData(url)[0][factor];
}

/**
*
* Retrieves IntraDay Quotes from Tiingo API
* For more information, please see https://api.tiingo.com/documentation/crypto
*
* @param {Tiingo_API_Key} authorization Tiingo API Key from https://www.tiingo.com/account/api/token
* @param {"BTCUSD"} cryptoPair A standard cryptocurrency pair
* @param {"lastPrice"} factor A field name from Tiingo API 
*                            {quoteTimestamp, lastSaleTimestamp, lastPrice, lastSize, lastSizeNotional, lastExchange, bidSize, bidPrice, bidExchange, askSize, askPrice, askExchange}
* @returns A single data point from the Tiingo Foreign Exchange API
* @customfunction
*/

function TIINGOCRYPTO(authorization, cryptoPair, factor) {

  var url = 'https://api.tiingo.com/tiingo/crypto/top?tickers=' + cryptoPair + '&token=' + authorization;
  
  return retrieveData(url)[0]['topOfBookData'][0][factor];
}
