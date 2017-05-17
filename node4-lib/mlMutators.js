"use strict";

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var Talent = require("./Talent");

var _require = require("./util"),
    getIterableObjectEntries = _require.getIterableObjectEntries,
    findWhereKey = _require.findWhereKey;

/**
 * Removes the required members of the meber log
 * @param {Array.<Object>} memberLog The array of the members. The entries are objects with one own key
 * @param {Symbol} required The rquired marker
 * @returns {Array.<Object>} The parsed member log
 */


function parseML(memberLog, required) {

  var mL = memberLog;

  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = mL[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var mLEntry = _step.value;


      var key = Reflect.ownKeys(mLEntry)[0];
      var value = mLEntry[key];

      mLEntry[key] = value.filter(function (elem) {
        return elem !== required;
      });
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

  return mL;
}

/**
 * Adds new entry to the member log or modifies an existing one
 * @param {Array.<Object>} memberLog The array of the members. The entries are objects with one own key
 * @param {Talent} source The talent which info needs to be added. (Might be nested)
 * @returns {Array.<Object>} The modified member log
 */
function addSourceInfoToML(memberLog, source) {

  var mL = memberLog;

  var _iteratorNormalCompletion2 = true;
  var _didIteratorError2 = false;
  var _iteratorError2 = undefined;

  try {
    for (var _iterator2 = getIterableObjectEntries(source)[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
      var _ref = _step2.value;

      var _ref2 = _slicedToArray(_ref, 2);

      var key = _ref2[0];
      var value = _ref2[1];


      if (Talent.typeCheck(value)) {

        mL = addSourceInfoToML(mL, value);
      }

      var memberLogEntry = findWhereKey(mL, key);

      if (!memberLogEntry && !Talent.typeCheck(value)) {

        mL.push({ [key]: [value] });
      } else if (!Talent.typeCheck(value)) {

        memberLogEntry[key].push(value);
      }
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

  return mL;
}

module.exports.parseML = parseML;
module.exports.addSourceInfoToML = addSourceInfoToML;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL2xpYi9tbE11dGF0b3JzLmpzIl0sIm5hbWVzIjpbIlRhbGVudCIsInJlcXVpcmUiLCJnZXRJdGVyYWJsZU9iamVjdEVudHJpZXMiLCJmaW5kV2hlcmVLZXkiLCJwYXJzZU1MIiwibWVtYmVyTG9nIiwicmVxdWlyZWQiLCJtTCIsIm1MRW50cnkiLCJrZXkiLCJSZWZsZWN0Iiwib3duS2V5cyIsInZhbHVlIiwiZmlsdGVyIiwiZWxlbSIsImFkZFNvdXJjZUluZm9Ub01MIiwic291cmNlIiwidHlwZUNoZWNrIiwibWVtYmVyTG9nRW50cnkiLCJwdXNoIiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLElBQU1BLFNBQVNDLFFBQVEsVUFBUixDQUFmOztlQUNpREEsUUFBUSxRQUFSLEM7SUFBMUNDLHdCLFlBQUFBLHdCO0lBQTBCQyxZLFlBQUFBLFk7O0FBRWpDOzs7Ozs7OztBQU1BLFNBQVNDLE9BQVQsQ0FBaUJDLFNBQWpCLEVBQTRCQyxRQUE1QixFQUFzQzs7QUFFcEMsTUFBTUMsS0FBS0YsU0FBWDs7QUFGb0M7QUFBQTtBQUFBOztBQUFBO0FBSXBDLHlCQUFzQkUsRUFBdEIsOEhBQTBCO0FBQUEsVUFBZkMsT0FBZTs7O0FBRXhCLFVBQU1DLE1BQU1DLFFBQVFDLE9BQVIsQ0FBZ0JILE9BQWhCLEVBQXlCLENBQXpCLENBQVo7QUFDQSxVQUFNSSxRQUFRSixRQUFRQyxHQUFSLENBQWQ7O0FBRUFELGNBQVFDLEdBQVIsSUFBZUcsTUFBTUMsTUFBTixDQUFhO0FBQUEsZUFBU0MsU0FBU1IsUUFBbEI7QUFBQSxPQUFiLENBQWY7QUFDRDtBQVZtQztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBOztBQVlwQyxTQUFPQyxFQUFQO0FBQ0Q7O0FBRUQ7Ozs7OztBQU1BLFNBQVNRLGlCQUFULENBQTJCVixTQUEzQixFQUFzQ1csTUFBdEMsRUFBOEM7O0FBRTVDLE1BQUlULEtBQUtGLFNBQVQ7O0FBRjRDO0FBQUE7QUFBQTs7QUFBQTtBQUk1QywwQkFBMkJILHlCQUF5QmMsTUFBekIsQ0FBM0IsbUlBQTZEO0FBQUE7O0FBQUE7O0FBQUEsVUFBakRQLEdBQWlEO0FBQUEsVUFBNUNHLEtBQTRDOzs7QUFFM0QsVUFBSVosT0FBT2lCLFNBQVAsQ0FBaUJMLEtBQWpCLENBQUosRUFBNkI7O0FBRTNCTCxhQUFLUSxrQkFBa0JSLEVBQWxCLEVBQXNCSyxLQUF0QixDQUFMO0FBQ0Q7O0FBRUQsVUFBTU0saUJBQWlCZixhQUFhSSxFQUFiLEVBQWlCRSxHQUFqQixDQUF2Qjs7QUFFQSxVQUFJLENBQUNTLGNBQUQsSUFBbUIsQ0FBQ2xCLE9BQU9pQixTQUFQLENBQWlCTCxLQUFqQixDQUF4QixFQUFpRDs7QUFFL0NMLFdBQUdZLElBQUgsQ0FBUSxFQUFDLENBQUNWLEdBQUQsR0FBTyxDQUFDRyxLQUFELENBQVIsRUFBUjtBQUNELE9BSEQsTUFHTyxJQUFJLENBQUNaLE9BQU9pQixTQUFQLENBQWlCTCxLQUFqQixDQUFMLEVBQThCOztBQUVuQ00sdUJBQWVULEdBQWYsRUFBb0JVLElBQXBCLENBQXlCUCxLQUF6QjtBQUNEO0FBQ0Y7QUFwQjJDO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7O0FBc0I1QyxTQUFPTCxFQUFQO0FBQ0Q7O0FBRURhLE9BQU9DLE9BQVAsQ0FBZWpCLE9BQWYsR0FBeUJBLE9BQXpCO0FBQ0FnQixPQUFPQyxPQUFQLENBQWVOLGlCQUFmLEdBQW1DQSxpQkFBbkMiLCJmaWxlIjoibWxNdXRhdG9ycy5qcyIsInNvdXJjZXNDb250ZW50IjpbImNvbnN0IFRhbGVudCA9IHJlcXVpcmUoXCIuL1RhbGVudFwiKTtcbmNvbnN0IHtnZXRJdGVyYWJsZU9iamVjdEVudHJpZXMsIGZpbmRXaGVyZUtleX0gPSByZXF1aXJlKFwiLi91dGlsXCIpO1xuXG4vKipcbiAqIFJlbW92ZXMgdGhlIHJlcXVpcmVkIG1lbWJlcnMgb2YgdGhlIG1lYmVyIGxvZ1xuICogQHBhcmFtIHtBcnJheS48T2JqZWN0Pn0gbWVtYmVyTG9nIFRoZSBhcnJheSBvZiB0aGUgbWVtYmVycy4gVGhlIGVudHJpZXMgYXJlIG9iamVjdHMgd2l0aCBvbmUgb3duIGtleVxuICogQHBhcmFtIHtTeW1ib2x9IHJlcXVpcmVkIFRoZSBycXVpcmVkIG1hcmtlclxuICogQHJldHVybnMge0FycmF5LjxPYmplY3Q+fSBUaGUgcGFyc2VkIG1lbWJlciBsb2dcbiAqL1xuZnVuY3Rpb24gcGFyc2VNTChtZW1iZXJMb2csIHJlcXVpcmVkKSB7XG5cbiAgY29uc3QgbUwgPSBtZW1iZXJMb2c7XG5cbiAgZm9yIChjb25zdCBtTEVudHJ5IG9mIG1MKSB7XG5cbiAgICBjb25zdCBrZXkgPSBSZWZsZWN0Lm93bktleXMobUxFbnRyeSlbMF07XG4gICAgY29uc3QgdmFsdWUgPSBtTEVudHJ5W2tleV07XG5cbiAgICBtTEVudHJ5W2tleV0gPSB2YWx1ZS5maWx0ZXIoZWxlbSA9PiAoZWxlbSAhPT0gcmVxdWlyZWQpKTtcbiAgfVxuXG4gIHJldHVybiBtTDtcbn1cblxuLyoqXG4gKiBBZGRzIG5ldyBlbnRyeSB0byB0aGUgbWVtYmVyIGxvZyBvciBtb2RpZmllcyBhbiBleGlzdGluZyBvbmVcbiAqIEBwYXJhbSB7QXJyYXkuPE9iamVjdD59IG1lbWJlckxvZyBUaGUgYXJyYXkgb2YgdGhlIG1lbWJlcnMuIFRoZSBlbnRyaWVzIGFyZSBvYmplY3RzIHdpdGggb25lIG93biBrZXlcbiAqIEBwYXJhbSB7VGFsZW50fSBzb3VyY2UgVGhlIHRhbGVudCB3aGljaCBpbmZvIG5lZWRzIHRvIGJlIGFkZGVkLiAoTWlnaHQgYmUgbmVzdGVkKVxuICogQHJldHVybnMge0FycmF5LjxPYmplY3Q+fSBUaGUgbW9kaWZpZWQgbWVtYmVyIGxvZ1xuICovXG5mdW5jdGlvbiBhZGRTb3VyY2VJbmZvVG9NTChtZW1iZXJMb2csIHNvdXJjZSkge1xuXG4gIGxldCBtTCA9IG1lbWJlckxvZztcblxuICBmb3IgKGNvbnN0IFtrZXksIHZhbHVlXSBvZiBnZXRJdGVyYWJsZU9iamVjdEVudHJpZXMoc291cmNlKSkge1xuXG4gICAgaWYgKFRhbGVudC50eXBlQ2hlY2sodmFsdWUpKSB7XG5cbiAgICAgIG1MID0gYWRkU291cmNlSW5mb1RvTUwobUwsIHZhbHVlKTtcbiAgICB9XG5cbiAgICBjb25zdCBtZW1iZXJMb2dFbnRyeSA9IGZpbmRXaGVyZUtleShtTCwga2V5KTtcblxuICAgIGlmICghbWVtYmVyTG9nRW50cnkgJiYgIVRhbGVudC50eXBlQ2hlY2sodmFsdWUpKSB7XG5cbiAgICAgIG1MLnB1c2goe1trZXldOiBbdmFsdWVdfSk7XG4gICAgfSBlbHNlIGlmICghVGFsZW50LnR5cGVDaGVjayh2YWx1ZSkpIHtcblxuICAgICAgbWVtYmVyTG9nRW50cnlba2V5XS5wdXNoKHZhbHVlKTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gbUw7XG59XG5cbm1vZHVsZS5leHBvcnRzLnBhcnNlTUwgPSBwYXJzZU1MO1xubW9kdWxlLmV4cG9ydHMuYWRkU291cmNlSW5mb1RvTUwgPSBhZGRTb3VyY2VJbmZvVG9NTDtcbiJdfQ==
