'use strict';

/*
 * Dependencies.
 */

var hedges,
    assert;

hedges = require('./');
assert = require('assert');

/*
 * Tests.
 */

describe('hedges', function () {
    it('should be an `Object`', function () {
        assert(typeof hedges === 'object');
    });
});

describe('hedges.is(word)', function () {
    it('should return true if a word is a hedge', function () {
        assert(hedges.is('usually') === true);
    });

    it('should return false if a word is not a hedge', function () {
        assert(hedges.is('unicorn') === false);
    });
});

describe('hedges.all()', function () {
    var all;

    all = hedges.all();

    it('should return an array', function () {
        assert('length' in all);
        assert(typeof all === 'object');
    });

    it('every entry should be lowercase', function () {
        all.forEach(function (word) {
            assert(word.toLowerCase() === word);
        });
    });

    it('every entry should only occur once', function () {
        all.forEach(function (word, index) {
            assert(all.indexOf(word, index + 1) === -1);
        });
    });

    it('should be immutable', function () {
        all.push('unicorn');

        assert(hedges.all().indexOf('unicorn') === -1);
    });
});

describe('hedges.add(hedge) and hedges.remove(hedge)', function () {
    it('should add and remove a hedge', function () {
        assert(hedges.is('unicorn') === false);

        hedges.add('unicorn');

        assert(hedges.is('unicorn') === true);

        hedges.remove('unicorn');

        assert(hedges.is('unicorn') === false);
    });

    it('should add and remove multiple hedges', function () {
        assert(hedges.is('unicorn') === false);
        assert(hedges.is('rainbow') === false);

        hedges.add('unicorn', 'rainbow');

        assert(hedges.is('unicorn') === true);
        assert(hedges.is('rainbow') === true);

        hedges.remove('unicorn', 'rainbow');

        assert(hedges.is('unicorn') === false);
        assert(hedges.is('rainbow') === false);
    });

    it('should fail silently when removing a non-existing hedge',
        function () {
            assert(hedges.is('unicorn') === false);

            hedges.remove('unicorn');

            assert(hedges.is('unicorn') === false);
        }
    );
});
