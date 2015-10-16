/**
 * Created by GUERIN Olivier, on 15/10/2015.
 * Twitter: @MisterRaton
 */

var typeOf = require('../index.js');
var test = require('tape');

test('fat arrow', function (assert) {
    try {
        var expected = 'Function';
        var actual = typeOf(()=>{});
        assert.equal(actual, expected, "typeOf(()=>{}) should return '"+expected+"'");
    } catch (err) {
        console.log(err.message, '-> SKIP');
    }
    assert.end();
});

test('symbol', function (assert) {
    var expected = 'Symbol';
    try {
        var actual = typeOf(Symbol("Foo"));
        assert.equal(actual, expected, "typeOf(Symbol('Foo')) should return '"+expected+"'");
    } catch (err) {
        console.log(err.message, '-> SKIP')
    }
    assert.end();
});

test('generator', function (assert) {
    var expected = 'GeneratorFunction';

    try {
        var actual = typeOf(function*() {});
        assert.equal(actual, expected, "typeOf(function*() {}) should return '"+expected+"'");
    } catch (err) {
        console.log(err.message, '-> SKIP');
    }
    assert.end();
});

test('promise', function (assert) {
    var expected = 'Promise';
    try {
        var actual = typeOf(new Promise(function () {}));
        assert.equal(actual, expected, "typeOf(new Promise(function () {})) should return '"+expected+"'");
    } catch (err) {
        console.log(err.message, '-> SKIP');
    }
    assert.end();
});