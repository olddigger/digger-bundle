/*

  (The MIT License)

  Copyright (C) 2005-2013 Kai Davenport

  Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

  The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

 */

/*
  Module dependencies.
*/

var Container = require('digger-container');
var XML = require('digger-xml');
var Radio = require('digger-radio');

module.exports = Container;

function augment_prototype(api){
	for(var prop in api){
		Container.prototype[prop] = api[prop];
	}
}

/*

	setup the full container api for the client
	
*/
augment_prototype(require('digger-contracts'));
augment_prototype(require('digger-find'));
augment_prototype({
	toXML:function(){
		return XML.stringify(this.toJSON())
	},
	radio:function(){
		var radio = new Radio(this);
		if(this.supplychain){
			radio.bridge(this.supplychain);
		}
		return radio;
	}
});
Container.parsers.push(function(string){
	if(string.charAt(0)=='<'){
		return XML.parse(string);
	}
	else{
		return null;
	}
})