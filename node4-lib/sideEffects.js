"use strict";

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var Talent = require("./Talent");

var _require = require("./util"),
    getIterableObjectEntries = _require.getIterableObjectEntries,
    findWhereKey = _require.findWhereKey;

exports.parseMemberLog = function parseMemberLog(memberLog, required) {
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {

    for (var _iterator = memberLog[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var memberLogEntry = _step.value;


      var key = Reflect.ownKeys(memberLogEntry)[0];
      var value = memberLogEntry[key];

      memberLogEntry[key] = value.filter(function (elem) {
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

  return memberLog;
};

exports.addSourceInfoToML = function addSourceInfoToML(source, memberLog) {

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

        mL = addSourceInfoToML(value, mL);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL2xpYi9zaWRlRWZmZWN0cy5qcyJdLCJuYW1lcyI6WyJUYWxlbnQiLCJyZXF1aXJlIiwiZ2V0SXRlcmFibGVPYmplY3RFbnRyaWVzIiwiZmluZFdoZXJlS2V5IiwiZXhwb3J0cyIsInBhcnNlTWVtYmVyTG9nIiwibWVtYmVyTG9nIiwicmVxdWlyZWQiLCJtZW1iZXJMb2dFbnRyeSIsImtleSIsIlJlZmxlY3QiLCJvd25LZXlzIiwidmFsdWUiLCJmaWx0ZXIiLCJlbGVtIiwiYWRkU291cmNlSW5mb1RvTUwiLCJzb3VyY2UiLCJtTCIsInR5cGVDaGVjayIsInB1c2giXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxJQUFNQSxTQUFTQyxRQUFRLFVBQVIsQ0FBZjs7ZUFDaURBLFFBQVEsUUFBUixDO0lBQTFDQyx3QixZQUFBQSx3QjtJQUEwQkMsWSxZQUFBQSxZOztBQUVqQ0MsUUFBUUMsY0FBUixHQUF5QixTQUFTQSxjQUFULENBQXdCQyxTQUF4QixFQUFtQ0MsUUFBbkMsRUFBNkM7QUFBQTtBQUFBO0FBQUE7O0FBQUE7O0FBRXBFLHlCQUE2QkQsU0FBN0IsOEhBQXdDO0FBQUEsVUFBN0JFLGNBQTZCOzs7QUFFdEMsVUFBTUMsTUFBTUMsUUFBUUMsT0FBUixDQUFnQkgsY0FBaEIsRUFBZ0MsQ0FBaEMsQ0FBWjtBQUNBLFVBQU1JLFFBQVFKLGVBQWVDLEdBQWYsQ0FBZDs7QUFFQUQscUJBQWVDLEdBQWYsSUFBc0JHLE1BQU1DLE1BQU4sQ0FBYTtBQUFBLGVBQVNDLFNBQVNQLFFBQWxCO0FBQUEsT0FBYixDQUF0QjtBQUNEO0FBUm1FO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7O0FBVXBFLFNBQU9ELFNBQVA7QUFDRCxDQVhEOztBQWFBRixRQUFRVyxpQkFBUixHQUE0QixTQUFTQSxpQkFBVCxDQUEyQkMsTUFBM0IsRUFBbUNWLFNBQW5DLEVBQThDOztBQUV4RSxNQUFJVyxLQUFLWCxTQUFUOztBQUZ3RTtBQUFBO0FBQUE7O0FBQUE7QUFJeEUsMEJBQTJCSix5QkFBeUJjLE1BQXpCLENBQTNCLG1JQUE2RDtBQUFBOztBQUFBOztBQUFBLFVBQWpEUCxHQUFpRDtBQUFBLFVBQTVDRyxLQUE0Qzs7O0FBRTNELFVBQUlaLE9BQU9rQixTQUFQLENBQWlCTixLQUFqQixDQUFKLEVBQTZCOztBQUUzQkssYUFBS0Ysa0JBQWtCSCxLQUFsQixFQUF5QkssRUFBekIsQ0FBTDtBQUNEOztBQUVELFVBQU1ULGlCQUFpQkwsYUFBYWMsRUFBYixFQUFpQlIsR0FBakIsQ0FBdkI7O0FBRUEsVUFBSSxDQUFDRCxjQUFELElBQW1CLENBQUNSLE9BQU9rQixTQUFQLENBQWlCTixLQUFqQixDQUF4QixFQUFpRDs7QUFFL0NLLFdBQUdFLElBQUgsQ0FBUSxFQUFDLENBQUNWLEdBQUQsR0FBTyxDQUFDRyxLQUFELENBQVIsRUFBUjtBQUNELE9BSEQsTUFHTyxJQUFJLENBQUNaLE9BQU9rQixTQUFQLENBQWlCTixLQUFqQixDQUFMLEVBQThCOztBQUVuQ0osdUJBQWVDLEdBQWYsRUFBb0JVLElBQXBCLENBQXlCUCxLQUF6QjtBQUNEO0FBQ0Y7QUFwQnVFO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7O0FBc0J4RSxTQUFPSyxFQUFQO0FBQ0QsQ0F2QkQiLCJmaWxlIjoic2lkZUVmZmVjdHMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBUYWxlbnQgPSByZXF1aXJlKFwiLi9UYWxlbnRcIik7XG5jb25zdCB7Z2V0SXRlcmFibGVPYmplY3RFbnRyaWVzLCBmaW5kV2hlcmVLZXl9ID0gcmVxdWlyZShcIi4vdXRpbFwiKTtcblxuZXhwb3J0cy5wYXJzZU1lbWJlckxvZyA9IGZ1bmN0aW9uIHBhcnNlTWVtYmVyTG9nKG1lbWJlckxvZywgcmVxdWlyZWQpIHtcblxuICBmb3IgKGNvbnN0IG1lbWJlckxvZ0VudHJ5IG9mIG1lbWJlckxvZykge1xuXG4gICAgY29uc3Qga2V5ID0gUmVmbGVjdC5vd25LZXlzKG1lbWJlckxvZ0VudHJ5KVswXTtcbiAgICBjb25zdCB2YWx1ZSA9IG1lbWJlckxvZ0VudHJ5W2tleV07XG5cbiAgICBtZW1iZXJMb2dFbnRyeVtrZXldID0gdmFsdWUuZmlsdGVyKGVsZW0gPT4gKGVsZW0gIT09IHJlcXVpcmVkKSk7XG4gIH1cblxuICByZXR1cm4gbWVtYmVyTG9nO1xufTtcblxuZXhwb3J0cy5hZGRTb3VyY2VJbmZvVG9NTCA9IGZ1bmN0aW9uIGFkZFNvdXJjZUluZm9Ub01MKHNvdXJjZSwgbWVtYmVyTG9nKSB7XG5cbiAgbGV0IG1MID0gbWVtYmVyTG9nO1xuXG4gIGZvciAoY29uc3QgW2tleSwgdmFsdWVdIG9mIGdldEl0ZXJhYmxlT2JqZWN0RW50cmllcyhzb3VyY2UpKSB7XG5cbiAgICBpZiAoVGFsZW50LnR5cGVDaGVjayh2YWx1ZSkpIHtcblxuICAgICAgbUwgPSBhZGRTb3VyY2VJbmZvVG9NTCh2YWx1ZSwgbUwpO1xuICAgIH1cblxuICAgIGNvbnN0IG1lbWJlckxvZ0VudHJ5ID0gZmluZFdoZXJlS2V5KG1MLCBrZXkpO1xuXG4gICAgaWYgKCFtZW1iZXJMb2dFbnRyeSAmJiAhVGFsZW50LnR5cGVDaGVjayh2YWx1ZSkpIHtcblxuICAgICAgbUwucHVzaCh7W2tleV06IFt2YWx1ZV19KTtcbiAgICB9IGVsc2UgaWYgKCFUYWxlbnQudHlwZUNoZWNrKHZhbHVlKSkge1xuXG4gICAgICBtZW1iZXJMb2dFbnRyeVtrZXldLnB1c2godmFsdWUpO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBtTDtcbn07XG4iXX0=
