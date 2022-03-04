// Copyright 2020, 2022, Geoffrey A. Pitman

// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.

//  This program is distributed in the hope that it will be useful,
//  but WITHOUT ANY WARRANTY; without even the implied warranty of
//  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
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

function dateToString(date) {

  // Helper Function to Change Input Data Type from Epoch Time to Date String
  
  // Convert Epoch Time to ISO 8601 Formatted Date
  var newDate = new Date(date).toISOString().split('T')[0];
  return newDate; 
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
* @param {"2020-01-01"} startDate First record date requested
* @param {"2020-01-02"} endDate Last record date requested
* @param {"daily"} frequency A resampling frequency {daily, weekly, monthly}
* @returns A single data point from the Tiingo End-Of-Day API on a specific date
* @customfunction
*/

function TIINGOEOD(authorization, ticker, factor, startDate, endDate, frequency) {

  var url = 'https://api.tiingo.com/tiingo/daily/' + ticker + '/prices?startDate=' + dateToString(startDate) + '&endDate=' + dateToString(endDate) + '&resampleFreq=' + frequency + '&columns=' + factor +  '&token=' + authorization;

  return retrieveData(url)[0][factor];
}

/**
*
* Retrieves IntraDay IEX Quotes from Tiingo API
* For more information, please see https://api.tiingo.com/documentation/iex
*
* @param {Tiingo_API_Key} authorization Tiingo API Key from https://www.tiingo.com/account/api/token
* @param {"SPY"} ticker A ticker symbol
* @param {"tngoLast"} factor A field name from Tiingo API 
*                            {date, open, high, low, close, volume, adjOpen, adjHigh, adjLow, adjClose, adjVolume, divCash, splitFactor}
* @param {"True"} afterHours Request after market hours quotes {True or False}
* @param {"True"} forceFill Request Tiingo to forceFill a quote {True or False}
* @param {opt_Ununsed} opt_Unused A slot to insert a cell reference that you may update to force a data refresh
* @returns A single data point from the Tiingo IEX API
* @customfunction
*/

function TIINGOIEX(authorization, ticker, factor, forceFill, afterHours, opt_Unused) {

  var url = 'https://api.tiingo.com/iex/' + ticker + '?afterHours=' + afterHours + '&forceFill=' + forceFill + '&token=' + authorization;

  return retrieveData(url)[0][factor];
}

/**
*
* Retrieves IntraDay Foreign Exchange Quotes from Tiingo API
* For more information, please see https://api.tiingo.com/documentation/forex
*
* @param {Tiingo_API_Key} authorization Tiingo API Key from https://www.tiingo.com/account/api/token
* @param {"EURUSD"} currencyPair A standard currency pair
* @param {"midPrice"} factor A field name from Tiingo API 
*                            {ticker, timestamp, midPrice, bidSize, bidPrice, askSize, askPrice}
* @param {opt_Ununsed} opt_Unused A slot to insert a cell reference that you may update to force a data refresh
* @returns A single data point from the Tiingo Foreign Exchange API
* @customfunction
*/

function TIINGOFX(authorization, currencyPair, factor, opt_Unused) {

  var url = 'https://api.tiingo.com/tiingo/fx/' + currencyPair + '/top?token=' + authorization;

  return retrieveData(url)[0][factor];
}

/**
*
* Retrieves IntraDay Crypto Quotes from Tiingo API
* For more information, please see https://api.tiingo.com/documentation/crypto
*
* @param {Tiingo_API_Key} authorization Tiingo API Key from https://www.tiingo.com/account/api/token
* @param {"BTCUSD"} cryptoPair A standard cryptocurrency pair
* @param {"lastPrice"} factor A field name from Tiingo API 
*                            {quoteTimestamp, lastSaleTimestamp, lastPrice, lastSize, lastSizeNotional, lastExchange, bidSize, bidPrice, bidExchange, askSize, askPrice, askExchange}
* @param {opt_Ununsed} opt_Unused A slot to insert a cell reference that you may update to force a data refresh
* @returns A single data point from the Tiingo Foreign Exchange API
* @customfunction
*/

function TIINGOCRYPTO(authorization, cryptoPair, factor, opt_Unused) {

  var url = 'https://api.tiingo.com/tiingo/crypto/top?tickers=' + cryptoPair + '&token=' + authorization;
  
  return retrieveData(url)[0]['topOfBookData'][0][factor];
}