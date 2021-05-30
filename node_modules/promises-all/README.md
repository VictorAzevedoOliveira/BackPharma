[![Build Status][travis-image]][travis-url] [![Known Vulnerabilities][vulnerability-image]][vulnerability-url]

# promises-all
Track down promise states of all promise functions executing in parallel. Similar to promise.all function, but it rejects the complete promise.all() even if any one of the promise fails, where as promises-all npm will indiviudally return you the states.

If you have used promises in your javscript code, then you might know one very good functionality of it, that is promise.all(). Fires multiple promise calls in parallel! Awesome!!

Recently I got stuck wiht this. My requirement was to fire 3 API calls parallely, but don't really care if any one of the api calls fail, unless all of them are failing! Then thats a different story. But, i could not achieve this, because promise.all rejects all the promise even if any on of them rejects.

There are solutions one would suggest that dont reject your indiviudal functions, rather always resolve them and then check once promise.all is done with all promise calls. But then why should I move that logic of checking fail case outside the function which is actually making an API call. Doesnt make sense to me.

Hence, I wrote a small plugin as well as an npm package which does exacltly what I explained earlier.

Promises-all will always resolve, irrespective of any promise calls rejects or resolves. Yes, it will reject also but only if there is some exception in the code!

It uses bluebird as the promise library when in node.

Below is the example:

### Require:
```javascript
var PromiseAll = require('promises-all');
```

### Sample Call:
```javascript
PromiseAll.all([p1(), p2()]).then(function(response) {
	console.log(response);
}, function(error) {
	console.log(error);
});

function p1() {
	return new bluebird(function(resolve, reject) {
		setTimeout(function() {
			resolve('p1 resolved');
		}, 1000);
	});	
}

function p2() {
	return new bluebird(function(resolve, reject) {
		setTimeout(function() {
			reject('p2 rejected');
		}, 3000);
	});	
}
```

### Output:
```javascript
{
	resolve: [ 'p1 resolved' ],
	reject: [ 'p2 rejected' ] 
}
```
[travis-url]: https://travis-ci.org/BhargavThakrar/promises-all
[travis-image]: https://travis-ci.org/BhargavThakrar/promises-all.svg?branch=master

[vulnerability-image]: https://snyk.io/test/github/bhargavthakrar/promises-all/badge.svg
[vulnerability-url]: https://snyk.io/test/github/bhargavthakrar/promises-all