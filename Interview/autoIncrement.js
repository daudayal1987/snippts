/*
Create a function which always return next number
e.g. works like auto increment
*/
let autoIncrement = (function(){
	let counter = 0;
	console.log(counter);
	return function(){
		return ++counter;
	}
})();