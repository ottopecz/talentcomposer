"use strict";

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var Talent = require("./Talent");

var _require = require("./util"),
    getIterableObjectEntries = _require.getIterableObjectEntries,
    findWhereKey = _require.findWhereKey;

exports.parseML = function parseML(memberLog, required) {

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
};

exports.addSourceInfoToML = function addSourceInfoToML(memberLog, source) {

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
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL2xpYi9tbE11dGF0b3JzLmpzIl0sIm5hbWVzIjpbIlRhbGVudCIsInJlcXVpcmUiLCJnZXRJdGVyYWJsZU9iamVjdEVudHJpZXMiLCJmaW5kV2hlcmVLZXkiLCJleHBvcnRzIiwicGFyc2VNTCIsIm1lbWJlckxvZyIsInJlcXVpcmVkIiwibUwiLCJtTEVudHJ5Iiwia2V5IiwiUmVmbGVjdCIsIm93bktleXMiLCJ2YWx1ZSIsImZpbHRlciIsImVsZW0iLCJhZGRTb3VyY2VJbmZvVG9NTCIsInNvdXJjZSIsInR5cGVDaGVjayIsIm1lbWJlckxvZ0VudHJ5IiwicHVzaCJdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLElBQU1BLFNBQVNDLFFBQVEsVUFBUixDQUFmOztlQUNpREEsUUFBUSxRQUFSLEM7SUFBMUNDLHdCLFlBQUFBLHdCO0lBQTBCQyxZLFlBQUFBLFk7O0FBRWpDQyxRQUFRQyxPQUFSLEdBQWtCLFNBQVNBLE9BQVQsQ0FBaUJDLFNBQWpCLEVBQTRCQyxRQUE1QixFQUFzQzs7QUFFdEQsTUFBTUMsS0FBS0YsU0FBWDs7QUFGc0Q7QUFBQTtBQUFBOztBQUFBO0FBSXRELHlCQUFzQkUsRUFBdEIsOEhBQTBCO0FBQUEsVUFBZkMsT0FBZTs7O0FBRXhCLFVBQU1DLE1BQU1DLFFBQVFDLE9BQVIsQ0FBZ0JILE9BQWhCLEVBQXlCLENBQXpCLENBQVo7QUFDQSxVQUFNSSxRQUFRSixRQUFRQyxHQUFSLENBQWQ7O0FBRUFELGNBQVFDLEdBQVIsSUFBZUcsTUFBTUMsTUFBTixDQUFhO0FBQUEsZUFBU0MsU0FBU1IsUUFBbEI7QUFBQSxPQUFiLENBQWY7QUFDRDtBQVZxRDtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBOztBQVl0RCxTQUFPQyxFQUFQO0FBQ0QsQ0FiRDs7QUFlQUosUUFBUVksaUJBQVIsR0FBNEIsU0FBU0EsaUJBQVQsQ0FBMkJWLFNBQTNCLEVBQXNDVyxNQUF0QyxFQUE4Qzs7QUFFeEUsTUFBSVQsS0FBS0YsU0FBVDs7QUFGd0U7QUFBQTtBQUFBOztBQUFBO0FBSXhFLDBCQUEyQkoseUJBQXlCZSxNQUF6QixDQUEzQixtSUFBNkQ7QUFBQTs7QUFBQTs7QUFBQSxVQUFqRFAsR0FBaUQ7QUFBQSxVQUE1Q0csS0FBNEM7OztBQUUzRCxVQUFJYixPQUFPa0IsU0FBUCxDQUFpQkwsS0FBakIsQ0FBSixFQUE2Qjs7QUFFM0JMLGFBQUtRLGtCQUFrQlIsRUFBbEIsRUFBc0JLLEtBQXRCLENBQUw7QUFDRDs7QUFFRCxVQUFNTSxpQkFBaUJoQixhQUFhSyxFQUFiLEVBQWlCRSxHQUFqQixDQUF2Qjs7QUFFQSxVQUFJLENBQUNTLGNBQUQsSUFBbUIsQ0FBQ25CLE9BQU9rQixTQUFQLENBQWlCTCxLQUFqQixDQUF4QixFQUFpRDs7QUFFL0NMLFdBQUdZLElBQUgsQ0FBUSxFQUFDLENBQUNWLEdBQUQsR0FBTyxDQUFDRyxLQUFELENBQVIsRUFBUjtBQUNELE9BSEQsTUFHTyxJQUFJLENBQUNiLE9BQU9rQixTQUFQLENBQWlCTCxLQUFqQixDQUFMLEVBQThCOztBQUVuQ00sdUJBQWVULEdBQWYsRUFBb0JVLElBQXBCLENBQXlCUCxLQUF6QjtBQUNEO0FBQ0Y7QUFwQnVFO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7O0FBc0J4RSxTQUFPTCxFQUFQO0FBQ0QsQ0F2QkQiLCJmaWxlIjoibWxNdXRhdG9ycy5qcyIsInNvdXJjZXNDb250ZW50IjpbImNvbnN0IFRhbGVudCA9IHJlcXVpcmUoXCIuL1RhbGVudFwiKTtcbmNvbnN0IHtnZXRJdGVyYWJsZU9iamVjdEVudHJpZXMsIGZpbmRXaGVyZUtleX0gPSByZXF1aXJlKFwiLi91dGlsXCIpO1xuXG5leHBvcnRzLnBhcnNlTUwgPSBmdW5jdGlvbiBwYXJzZU1MKG1lbWJlckxvZywgcmVxdWlyZWQpIHtcblxuICBjb25zdCBtTCA9IG1lbWJlckxvZztcblxuICBmb3IgKGNvbnN0IG1MRW50cnkgb2YgbUwpIHtcblxuICAgIGNvbnN0IGtleSA9IFJlZmxlY3Qub3duS2V5cyhtTEVudHJ5KVswXTtcbiAgICBjb25zdCB2YWx1ZSA9IG1MRW50cnlba2V5XTtcblxuICAgIG1MRW50cnlba2V5XSA9IHZhbHVlLmZpbHRlcihlbGVtID0+IChlbGVtICE9PSByZXF1aXJlZCkpO1xuICB9XG5cbiAgcmV0dXJuIG1MO1xufTtcblxuZXhwb3J0cy5hZGRTb3VyY2VJbmZvVG9NTCA9IGZ1bmN0aW9uIGFkZFNvdXJjZUluZm9Ub01MKG1lbWJlckxvZywgc291cmNlKSB7XG5cbiAgbGV0IG1MID0gbWVtYmVyTG9nO1xuXG4gIGZvciAoY29uc3QgW2tleSwgdmFsdWVdIG9mIGdldEl0ZXJhYmxlT2JqZWN0RW50cmllcyhzb3VyY2UpKSB7XG5cbiAgICBpZiAoVGFsZW50LnR5cGVDaGVjayh2YWx1ZSkpIHtcblxuICAgICAgbUwgPSBhZGRTb3VyY2VJbmZvVG9NTChtTCwgdmFsdWUpO1xuICAgIH1cblxuICAgIGNvbnN0IG1lbWJlckxvZ0VudHJ5ID0gZmluZFdoZXJlS2V5KG1MLCBrZXkpO1xuXG4gICAgaWYgKCFtZW1iZXJMb2dFbnRyeSAmJiAhVGFsZW50LnR5cGVDaGVjayh2YWx1ZSkpIHtcblxuICAgICAgbUwucHVzaCh7W2tleV06IFt2YWx1ZV19KTtcbiAgICB9IGVsc2UgaWYgKCFUYWxlbnQudHlwZUNoZWNrKHZhbHVlKSkge1xuXG4gICAgICBtZW1iZXJMb2dFbnRyeVtrZXldLnB1c2godmFsdWUpO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBtTDtcbn07XG4iXX0=
