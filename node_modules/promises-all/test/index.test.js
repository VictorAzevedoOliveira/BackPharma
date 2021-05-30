var chai = require('chai');
var promiseAll = require('../index');
var bluebird = require('bluebird');

let expect = chai.expect;

describe('promise.all should always resolve with the individual status of all the promises passed to it', function() {
	it('promiseAll.all() should return an object with two keys: resolve and reject', function() {

		promiseAll.all([p1Resolve(), p2Reject()]).then(function(response) {
			expect(response).to.have.property('resolve').length(1);
			expect(response).to.have.property('reject').length(1);	
		});
		
	});
});

function p1Resolve() {
	return new Promise(function(resolve, reject) {
		return resolve('Function P1 is resolved');
	});
}

function p1Reject() {
	return new Promise(function(resolve, reject) {
		return reject('Function P1 is rejected');
	});
}

function p2Resolve() {
	return new Promise(function(resolve, reject) {
		return resolve('Function P2 is resolved');
	});
}

function p2Reject() {
	return new Promise(function(resolve, reject) {
		return reject('Function P2 is rejected');
	});
}