test("module without setup/teardown (default)", function() {
	expect(2);
	ok(true, 'god');
	ok(true, 'please');
});

module('a mod');
test("a1", function() {
	expect(2);
	ok(true, 'god');
	ok(true, 'please');
});
asyncTest("wait 1 second", function() {
	expect(2);
	ok(true, 'god');
	ok(true, 'please');
	setTimeout(function(){
		start();
	}, 1000);
});

module('b mod');
test("b1", function() {
	expect(2);
	ok(true, 'god');
	ok(true, 'please');
});
test("b2", function() {
	expect(2);
	ok(true, 'god');
	ok(true, 'please');
});