"use strict";

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

/**
 * Creates an iterable based on an object literal
 * @param {Object} obj The source object which own keys should be iterable
 * @returns {Object} The iterable with the own keys
 */
function getIterableObjectEntries(obj) {

  var index = 0;

  var propKeys = Reflect.ownKeys(obj);

  return {
    [Symbol.iterator]() {
      return this;
    },
    next() {

      if (index < propKeys.length) {

        var key = propKeys[index];

        index += 1;
        return { "value": [key, obj[key]] };
      }

      return { "done": true };
    }
  };
}

/**
 * Returns the object where the given own key exists and equal with value
 * @param {Array.<Object>} arr The source array of objects
 * @param {string} key The name of the own key to filter with
 * @param {*} value The value of the key to filter with
 * @returns {Object} The found object specified by the key value pair
 */
function findWhere(arr, key, value) {

  return arr.find(function (elem) {
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {

      for (var _iterator = getIterableObjectEntries(elem)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var _ref = _step.value;

        var _ref2 = _slicedToArray(_ref, 2);

        var k = _ref2[0];
        var v = _ref2[1];


        return k === key && v === value;
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator.return) {
          _iterator.return();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }
  });
}

/**
 * Returns the object where the given own key exists
 * @param {Array.<Object>} arr The source array of objects
 * @param {string} key The name of the own key to filter with
 * @returns {Object} The found object specified by the name of the given own key
 */
function findWhereKey(arr, key) {

  return arr.find(function (elem) {
    var _iteratorNormalCompletion2 = true;
    var _didIteratorError2 = false;
    var _iteratorError2 = undefined;

    try {

      for (var _iterator2 = getIterableObjectEntries(elem)[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
        var _ref3 = _step2.value;

        var _ref4 = _slicedToArray(_ref3, 1);

        var k = _ref4[0];


        return k === key;
      }
    } catch (err) {
      _didIteratorError2 = true;
      _iteratorError2 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion2 && _iterator2.return) {
          _iterator2.return();
        }
      } finally {
        if (_didIteratorError2) {
          throw _iteratorError2;
        }
      }
    }
  });
}

module.exports.getIterableObjectEntries = getIterableObjectEntries;
module.exports.findWhere = findWhere;
module.exports.findWhereKey = findWhereKey;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL2xpYi91dGlsLmpzIl0sIm5hbWVzIjpbImdldEl0ZXJhYmxlT2JqZWN0RW50cmllcyIsIm9iaiIsImluZGV4IiwicHJvcEtleXMiLCJSZWZsZWN0Iiwib3duS2V5cyIsIlN5bWJvbCIsIml0ZXJhdG9yIiwibmV4dCIsImxlbmd0aCIsImtleSIsImZpbmRXaGVyZSIsImFyciIsInZhbHVlIiwiZmluZCIsImVsZW0iLCJrIiwidiIsImZpbmRXaGVyZUtleSIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiI7Ozs7QUFBQTs7Ozs7QUFLQSxTQUFTQSx3QkFBVCxDQUFrQ0MsR0FBbEMsRUFBdUM7O0FBRXJDLE1BQUlDLFFBQVEsQ0FBWjs7QUFFQSxNQUFNQyxXQUFXQyxRQUFRQyxPQUFSLENBQWdCSixHQUFoQixDQUFqQjs7QUFFQSxTQUFPO0FBQ0wsS0FBQ0ssT0FBT0MsUUFBUixJQUFvQjtBQUNsQixhQUFPLElBQVA7QUFDRCxLQUhJO0FBSUxDLFdBQU87O0FBRUwsVUFBSU4sUUFBUUMsU0FBU00sTUFBckIsRUFBNkI7O0FBRTNCLFlBQU1DLE1BQU1QLFNBQVNELEtBQVQsQ0FBWjs7QUFFQUEsaUJBQVMsQ0FBVDtBQUNBLGVBQU8sRUFBQyxTQUFTLENBQUNRLEdBQUQsRUFBTVQsSUFBSVMsR0FBSixDQUFOLENBQVYsRUFBUDtBQUNEOztBQUVELGFBQU8sRUFBQyxRQUFRLElBQVQsRUFBUDtBQUNEO0FBZkksR0FBUDtBQWlCRDs7QUFFRDs7Ozs7OztBQU9BLFNBQVNDLFNBQVQsQ0FBbUJDLEdBQW5CLEVBQXdCRixHQUF4QixFQUE2QkcsS0FBN0IsRUFBb0M7O0FBRWxDLFNBQU9ELElBQUlFLElBQUosQ0FBUyxnQkFBUTtBQUFBO0FBQUE7QUFBQTs7QUFBQTs7QUFFdEIsMkJBQXFCZCx5QkFBeUJlLElBQXpCLENBQXJCLDhIQUFxRDtBQUFBOztBQUFBOztBQUFBLFlBQXpDQyxDQUF5QztBQUFBLFlBQXRDQyxDQUFzQzs7O0FBRW5ELGVBQVFELE1BQU1OLEdBQU4sSUFBYU8sTUFBTUosS0FBM0I7QUFDRDtBQUxxQjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBTXZCLEdBTk0sQ0FBUDtBQU9EOztBQUVEOzs7Ozs7QUFNQSxTQUFTSyxZQUFULENBQXNCTixHQUF0QixFQUEyQkYsR0FBM0IsRUFBZ0M7O0FBRTlCLFNBQU9FLElBQUlFLElBQUosQ0FBUyxnQkFBUTtBQUFBO0FBQUE7QUFBQTs7QUFBQTs7QUFFdEIsNEJBQWtCZCx5QkFBeUJlLElBQXpCLENBQWxCLG1JQUFrRDtBQUFBOztBQUFBOztBQUFBLFlBQXRDQyxDQUFzQzs7O0FBRWhELGVBQVFBLE1BQU1OLEdBQWQ7QUFDRDtBQUxxQjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBTXZCLEdBTk0sQ0FBUDtBQU9EOztBQUVEUyxPQUFPQyxPQUFQLENBQWVwQix3QkFBZixHQUEwQ0Esd0JBQTFDO0FBQ0FtQixPQUFPQyxPQUFQLENBQWVULFNBQWYsR0FBMkJBLFNBQTNCO0FBQ0FRLE9BQU9DLE9BQVAsQ0FBZUYsWUFBZixHQUE4QkEsWUFBOUIiLCJmaWxlIjoidXRpbC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQ3JlYXRlcyBhbiBpdGVyYWJsZSBiYXNlZCBvbiBhbiBvYmplY3QgbGl0ZXJhbFxuICogQHBhcmFtIHtPYmplY3R9IG9iaiBUaGUgc291cmNlIG9iamVjdCB3aGljaCBvd24ga2V5cyBzaG91bGQgYmUgaXRlcmFibGVcbiAqIEByZXR1cm5zIHtPYmplY3R9IFRoZSBpdGVyYWJsZSB3aXRoIHRoZSBvd24ga2V5c1xuICovXG5mdW5jdGlvbiBnZXRJdGVyYWJsZU9iamVjdEVudHJpZXMob2JqKSB7XG5cbiAgbGV0IGluZGV4ID0gMDtcblxuICBjb25zdCBwcm9wS2V5cyA9IFJlZmxlY3Qub3duS2V5cyhvYmopO1xuXG4gIHJldHVybiB7XG4gICAgW1N5bWJvbC5pdGVyYXRvcl0oKSB7XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9LFxuICAgIG5leHQoKSB7XG5cbiAgICAgIGlmIChpbmRleCA8IHByb3BLZXlzLmxlbmd0aCkge1xuXG4gICAgICAgIGNvbnN0IGtleSA9IHByb3BLZXlzW2luZGV4XTtcblxuICAgICAgICBpbmRleCArPSAxO1xuICAgICAgICByZXR1cm4ge1widmFsdWVcIjogW2tleSwgb2JqW2tleV1dfTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHtcImRvbmVcIjogdHJ1ZX07XG4gICAgfVxuICB9O1xufVxuXG4vKipcbiAqIFJldHVybnMgdGhlIG9iamVjdCB3aGVyZSB0aGUgZ2l2ZW4gb3duIGtleSBleGlzdHMgYW5kIGVxdWFsIHdpdGggdmFsdWVcbiAqIEBwYXJhbSB7QXJyYXkuPE9iamVjdD59IGFyciBUaGUgc291cmNlIGFycmF5IG9mIG9iamVjdHNcbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIG5hbWUgb2YgdGhlIG93biBrZXkgdG8gZmlsdGVyIHdpdGhcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIG9mIHRoZSBrZXkgdG8gZmlsdGVyIHdpdGhcbiAqIEByZXR1cm5zIHtPYmplY3R9IFRoZSBmb3VuZCBvYmplY3Qgc3BlY2lmaWVkIGJ5IHRoZSBrZXkgdmFsdWUgcGFpclxuICovXG5mdW5jdGlvbiBmaW5kV2hlcmUoYXJyLCBrZXksIHZhbHVlKSB7XG5cbiAgcmV0dXJuIGFyci5maW5kKGVsZW0gPT4ge1xuXG4gICAgZm9yIChjb25zdCBbaywgdl0gb2YgZ2V0SXRlcmFibGVPYmplY3RFbnRyaWVzKGVsZW0pKSB7XG5cbiAgICAgIHJldHVybiAoayA9PT0ga2V5ICYmIHYgPT09IHZhbHVlKTtcbiAgICB9XG4gIH0pO1xufVxuXG4vKipcbiAqIFJldHVybnMgdGhlIG9iamVjdCB3aGVyZSB0aGUgZ2l2ZW4gb3duIGtleSBleGlzdHNcbiAqIEBwYXJhbSB7QXJyYXkuPE9iamVjdD59IGFyciBUaGUgc291cmNlIGFycmF5IG9mIG9iamVjdHNcbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIG5hbWUgb2YgdGhlIG93biBrZXkgdG8gZmlsdGVyIHdpdGhcbiAqIEByZXR1cm5zIHtPYmplY3R9IFRoZSBmb3VuZCBvYmplY3Qgc3BlY2lmaWVkIGJ5IHRoZSBuYW1lIG9mIHRoZSBnaXZlbiBvd24ga2V5XG4gKi9cbmZ1bmN0aW9uIGZpbmRXaGVyZUtleShhcnIsIGtleSkge1xuXG4gIHJldHVybiBhcnIuZmluZChlbGVtID0+IHtcblxuICAgIGZvciAoY29uc3QgW2tdIG9mIGdldEl0ZXJhYmxlT2JqZWN0RW50cmllcyhlbGVtKSkge1xuXG4gICAgICByZXR1cm4gKGsgPT09IGtleSk7XG4gICAgfVxuICB9KTtcbn1cblxubW9kdWxlLmV4cG9ydHMuZ2V0SXRlcmFibGVPYmplY3RFbnRyaWVzID0gZ2V0SXRlcmFibGVPYmplY3RFbnRyaWVzO1xubW9kdWxlLmV4cG9ydHMuZmluZFdoZXJlID0gZmluZFdoZXJlO1xubW9kdWxlLmV4cG9ydHMuZmluZFdoZXJlS2V5ID0gZmluZFdoZXJlS2V5O1xuIl19
