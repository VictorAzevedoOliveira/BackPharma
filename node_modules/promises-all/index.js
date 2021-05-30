/**
 * Third party dependency for bluebird library if in node env
 * OR
 * Browsers native promise code
 */
var has_require = typeof require !== 'undefined';
var Bluebird = null;

if(has_require) {
	Bluebird = require('bluebird');
}else if(typeof Promise !== "undefined" && Promise.toString().indexOf("[native code]") !== -1){
	Bluebird = Promise;
}else {
	throw new Error('Your browser does not support promises');
}
/** End of Third party dependency check */

(function() {
	"use strict";

	var root = this;
  	var previous_promiseAll = root.PromiseAll;

  	var PromiseAll = function() {
  		// Constructor
	};

	// To resolve name conflicts on browser
	PromiseAll.noConflict = function() {
		root.PromiseAll = previous_promiseAll;
  		return PromiseAll;
	};

	/**
	 * Function that is called to fire parallel promises
	 *
	 * It always resolves no matter any of the passed promise function rejects or resolves,
	 * rather it will encapsulate their states in an object which has fundamnetally two keys only, resolve and reject
	 * 
	 * @param  {array}  fns 	Array of function calls
	 * @return {promise}     	
	 */
	PromiseAll.all = function(fns) {
		return new Bluebird(function(resolve, reject) {

			// Validating the passed arguments
			var error = PromiseAll.validateArgs(fns);

			// Throw an exception if the arguments are not as expected
			if(error) {
				throw new Error('Arguments must be an array of function calls. Ex - [fn1(), fn2()]');
			}

			// Keeping track of total number of function calls to make
			var totalNumberOfFunctionCalls = fns.length;
			var status = {
				resolve: [],
				reject: []
			};

			// Callback called when any of the functions resolves
			var successCallback = function(response) {
				// Storing into our final status object
				status.resolve.push(response);

				// Decrementing the functions remaining
				totalNumberOfFunctionCalls--;

				// Checks if all the functions are done
				resolvePromise();
			};

			// Callback called when any of the functions rejects
			var failCallback = function(response) {
				// Storing into our final status object
				status.reject.push(response);

				// Decrementing the functions remaining
				totalNumberOfFunctionCalls--;

				// Checks if all the functions are done
				resolvePromise();			
			};

			// Checks if all the functions are done, if yes, resolve this very promise and return!
			var resolvePromise = function() {
				if(totalNumberOfFunctionCalls === 0) {

					// Below closures are no more required, removing them...
					successCallback = null;
					failCallback = null;
					resolvePromise = null;

					
					return resolve(status);
				}
			};

			try {
				fns.forEach(function(fn) {
					fn.then(successCallback, failCallback);
				});	
			}catch(e) {
				return reject(e.stack);
			}
		});
	};

	PromiseAll.validateArgs = function(args) {
		if(Object.prototype.toString.call(args) === "[object Array]" && args.length > 0) {
			return false;
		}

		return true;
	};

	if( typeof exports !== 'undefined' ) {
		if( typeof module !== 'undefined' && module.exports ) {
			exports = module.exports = PromiseAll;
		}
		exports.PromiseAll = PromiseAll;
	}else {
		root.PromiseAll = PromiseAll;
	}
}).call(this);