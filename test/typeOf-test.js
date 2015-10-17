var typeOf = require('../index.js');
var test = require('tape');

test('null', function (assert) {
    var expected = '#Null';
    var actual = typeOf(null);
    assert.equal(actual, expected, "typeOf(null) should return '" + expected + "'");
    assert.end()
});


test('undefined', function (assert) {
    var expected = '#Undefined';
    var actual = typeOf(undefined);
    assert.equal(actual, expected, "typeOf(undefined) should return '" + expected + "'");
    assert.end()
});

test('NaN', function (assert) {
    var expected = '#NaN';
    var actual = typeOf(NaN);
    assert.equal(actual, expected, "typeOf(NaN) should return '" + expected + "'");

    actual = typeOf(Number(NaN));
    assert.equal(actual, expected, " typeOf(new Number(NaN)) should return '" + expected + "'");
    assert.end()
});

test('string', function (assert) {
    var expected = 'String';
    var actual = typeOf('test');
    assert.equal(actual, expected, "typeOf('test) should return '" + expected + "'");

    actual = typeOf(String('test'));
    assert.equal(actual, expected, " typeOf(new String('test') should return '" + expected + "'");
    assert.end()
});

test('number', function (assert) {
    var expected = 'Number';
    var actual = typeOf(42);
    assert.equal(actual, expected, "typeOf(42) should return '" + expected + "'");

    actual = typeOf(Number(42));
    assert.equal(actual, expected, " typeOf(new Number(42)) should return '" + expected + "'");
    assert.end()
});

test('boolean', function (assert) {
    var expected = 'Boolean';
    var actual = typeOf(false);
    assert.equal(actual, expected, "typeOf(false) should return '" + expected + "'");

    actual = typeOf(Boolean(false));
    assert.equal(actual, expected, " typeOf(Boolean(false)) should return '" + expected + "'");
    assert.end()
});

test('array', function (assert) {
    var expected = 'Array';
    var actual = typeOf([]);
    assert.equal(actual, expected, "typeOf([]) should return '" + expected + "'");

    actual = typeOf(new Array());
    assert.equal(actual, expected, " typeOf(new Array()) should return '" + expected + "'");
    assert.end()
});

test('object', function (assert) {
    var expected = 'Object';
    var actual = typeOf({});
    assert.equal(actual, expected, "typeOf({}) should return '" + expected + "'");

    actual = typeOf(new Object());
    assert.equal(actual, expected, " typeOf(new Object()) should return '" + expected + "'");
    assert.end()
});

test('regex', function (assert) {
    var expected = 'RegExp';
    var actual = typeOf(/test/);
    assert.equal(actual, expected, "typeOf(/test/) should return '" + expected + "'");

    actual = typeOf(new RegExp());
    assert.equal(actual, expected, " typeOf(new RegExp()) should return '" + expected + "'");
    assert.end()
});

test('function', function (assert) {
    var expected = 'Function';
    var actual = typeOf(new Function());
    assert.equal(actual, expected, "typeOf(new Function()) should return '" + expected + "'");
    assert.end()
});

test('error', function (assert) {
    var expected = 'Error';
    var actual = typeOf(new Error());
    assert.equal(actual, expected, "typeOf(new Error()) should return '" + expected + "'");

    expected = 'TypeError';
    actual = typeOf(new TypeError());
    assert.equal(actual, expected, " typeOf(new TypeError()) should return '" + expected + "'");
    assert.end()
});

test('date', function (assert) {
    var expected = 'Date';
    var actual = typeOf(new Date());
    assert.equal(actual, expected, "typeOf(new Date()) should return '" + expected + "'");
    assert.end()
});

//custom class
test('custom class', function (assert) {
    function $_MyOwnClass() {
    }

    var expected = '$_MyOwnClass';
    var actual = typeOf(new $_MyOwnClass());
    assert.equal(actual, expected, "typeOf(new $_MyOwnClass()) should return '" + expected + "'");

    var MyAnonymousClass = function () {
    };
    expected = '#Anonymous';
    actual = typeOf(new MyAnonymousClass());
    assert.equal(actual, expected, "typeOf(new MyAnonymousClass()) should return '" + expected + "'");
    assert.end()
});

test('special', function (assert) {
    var expected = ['Arguments','Object'];
    var actual = typeOf(function () {
        return arguments
    }());

    assert.ok(actual === expected[0] || actual === expected[1], "typeOf(function(){ return arguments }()) should return '" + expected[0] + "' or '"+expected[1]+"'");

    expected = 'Math';
    actual = typeOf(Math);
    assert.equal(actual, expected, "typeOf(Math) should return '" + expected + "'");

    expected = 'Array';
    actual = typeOf(Array.prototype);
    assert.equal(actual, expected, "typeOf(Array.prototype) should return '" + expected + "'");

    assert.end()
});


test('typed array', function (assert) {
    var expected, actual;
    try {
        expected = 'Uint32Array';
        actual = typeOf(new Uint32Array(2));
        assert.equal(actual, expected, "typeOf(new Uint32Array()) should return '" + expected + "'");
    } catch (err) {
        console.log(err.message, '-> SKIP');
    }
    try {
        expected = 'ArrayBuffer';
        actual = typeOf(new ArrayBuffer(2));
        assert.equal(actual, expected, "typeOf(new ArrayBuffer()) should return '" + expected + "'");
    } catch (err) {
        console.log(err.message, '-> SKIP');
    }
    try {
        expected = 'DataView';
        actual = typeOf(new DataView(new ArrayBuffer(2)));
        assert.equal(actual, expected, "typeOf(new DataView(new ArrayBuffer())) should return '" + expected + "'");
    } catch (err) {
        console.log(err.message, '-> SKIP');
    }
    assert.end()
});


//################################## options ##############################
test('force:true', function (assert) {
    expected = 'Error';
    actual = typeOf(new TypeError, 'forceObjectToString');
    assert.equal(actual, expected, "typeOf(new TypeError, 'forceObjectToString'); should return '" + expected + "'");

    assert.end()
});