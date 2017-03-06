"use strict";

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

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

function copyOwnProps(target, source) {
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {

    for (var _iterator = getIterableObjectEntries(source)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var _ref = _step.value;

      var _ref2 = _slicedToArray(_ref, 1);

      var key = _ref2[0];


      Reflect.defineProperty(target, key, Reflect.getOwnPropertyDescriptor(source, key));
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

  return target;
}

function removeWhere(arr, key, value) {

  return arr.filter(function (elem) {

    var ret = true;

    var _iteratorNormalCompletion2 = true;
    var _didIteratorError2 = false;
    var _iteratorError2 = undefined;

    try {
      for (var _iterator2 = getIterableObjectEntries(elem)[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
        var _ref3 = _step2.value;

        var _ref4 = _slicedToArray(_ref3, 2);

        var k = _ref4[0];
        var v = _ref4[1];


        if (k === key && v === value) {

          ret = false;
          break;
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

    return ret;
  });
}

function findWhere(arr, key, value) {

  return arr.find(function (elem) {
    var _iteratorNormalCompletion3 = true;
    var _didIteratorError3 = false;
    var _iteratorError3 = undefined;

    try {

      for (var _iterator3 = getIterableObjectEntries(elem)[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
        var _ref5 = _step3.value;

        var _ref6 = _slicedToArray(_ref5, 2);

        var k = _ref6[0];
        var v = _ref6[1];


        return k === key && v === value;
      }
    } catch (err) {
      _didIteratorError3 = true;
      _iteratorError3 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion3 && _iterator3.return) {
          _iterator3.return();
        }
      } finally {
        if (_didIteratorError3) {
          throw _iteratorError3;
        }
      }
    }
  });
}

function findWhereKey(arr, key) {

  return arr.find(function (elem) {
    var _iteratorNormalCompletion4 = true;
    var _didIteratorError4 = false;
    var _iteratorError4 = undefined;

    try {

      for (var _iterator4 = getIterableObjectEntries(elem)[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
        var _ref7 = _step4.value;

        var _ref8 = _slicedToArray(_ref7, 1);

        var k = _ref8[0];


        return k === key;
      }
    } catch (err) {
      _didIteratorError4 = true;
      _iteratorError4 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion4 && _iterator4.return) {
          _iterator4.return();
        }
      } finally {
        if (_didIteratorError4) {
          throw _iteratorError4;
        }
      }
    }
  });
}

module.exports.getIterableObjectEntries = getIterableObjectEntries;
module.exports.copyOwnProps = copyOwnProps;
module.exports.removeWhere = removeWhere;
module.exports.findWhere = findWhere;
module.exports.findWhereKey = findWhereKey;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL2xpYi91dGlsLmpzIl0sIm5hbWVzIjpbImdldEl0ZXJhYmxlT2JqZWN0RW50cmllcyIsIm9iaiIsImluZGV4IiwicHJvcEtleXMiLCJSZWZsZWN0Iiwib3duS2V5cyIsIlN5bWJvbCIsIml0ZXJhdG9yIiwibmV4dCIsImxlbmd0aCIsImtleSIsImNvcHlPd25Qcm9wcyIsInRhcmdldCIsInNvdXJjZSIsImRlZmluZVByb3BlcnR5IiwiZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yIiwicmVtb3ZlV2hlcmUiLCJhcnIiLCJ2YWx1ZSIsImZpbHRlciIsInJldCIsImVsZW0iLCJrIiwidiIsImZpbmRXaGVyZSIsImZpbmQiLCJmaW5kV2hlcmVLZXkiLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiOzs7O0FBQUEsU0FBU0Esd0JBQVQsQ0FBa0NDLEdBQWxDLEVBQXVDOztBQUVyQyxNQUFJQyxRQUFRLENBQVo7O0FBRUEsTUFBTUMsV0FBV0MsUUFBUUMsT0FBUixDQUFnQkosR0FBaEIsQ0FBakI7O0FBRUEsU0FBTztBQUNMLEtBQUNLLE9BQU9DLFFBQVIsSUFBb0I7QUFDbEIsYUFBTyxJQUFQO0FBQ0QsS0FISTtBQUlMQyxXQUFPOztBQUVMLFVBQUlOLFFBQVFDLFNBQVNNLE1BQXJCLEVBQTZCOztBQUUzQixZQUFNQyxNQUFNUCxTQUFTRCxLQUFULENBQVo7O0FBRUFBLGlCQUFTLENBQVQ7QUFDQSxlQUFPLEVBQUMsU0FBUyxDQUFDUSxHQUFELEVBQU1ULElBQUlTLEdBQUosQ0FBTixDQUFWLEVBQVA7QUFDRDs7QUFFRCxhQUFPLEVBQUMsUUFBUSxJQUFULEVBQVA7QUFDRDtBQWZJLEdBQVA7QUFpQkQ7O0FBRUQsU0FBU0MsWUFBVCxDQUFzQkMsTUFBdEIsRUFBOEJDLE1BQTlCLEVBQXNDO0FBQUE7QUFBQTtBQUFBOztBQUFBOztBQUVwQyx5QkFBb0JiLHlCQUF5QmEsTUFBekIsQ0FBcEIsOEhBQXNEO0FBQUE7O0FBQUE7O0FBQUEsVUFBMUNILEdBQTBDOzs7QUFFcEROLGNBQVFVLGNBQVIsQ0FBdUJGLE1BQXZCLEVBQStCRixHQUEvQixFQUFvQ04sUUFBUVcsd0JBQVIsQ0FBaUNGLE1BQWpDLEVBQXlDSCxHQUF6QyxDQUFwQztBQUNEO0FBTG1DO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7O0FBT3BDLFNBQU9FLE1BQVA7QUFDRDs7QUFFRCxTQUFTSSxXQUFULENBQXFCQyxHQUFyQixFQUEwQlAsR0FBMUIsRUFBK0JRLEtBQS9CLEVBQXNDOztBQUVwQyxTQUFPRCxJQUFJRSxNQUFKLENBQVcsZ0JBQVE7O0FBRXhCLFFBQUlDLE1BQU0sSUFBVjs7QUFGd0I7QUFBQTtBQUFBOztBQUFBO0FBSXhCLDRCQUFxQnBCLHlCQUF5QnFCLElBQXpCLENBQXJCLG1JQUFxRDtBQUFBOztBQUFBOztBQUFBLFlBQXpDQyxDQUF5QztBQUFBLFlBQXRDQyxDQUFzQzs7O0FBRW5ELFlBQUlELE1BQU1aLEdBQU4sSUFBYWEsTUFBTUwsS0FBdkIsRUFBOEI7O0FBRTVCRSxnQkFBTSxLQUFOO0FBQ0E7QUFDRDtBQUNGO0FBWHVCO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7O0FBYXhCLFdBQU9BLEdBQVA7QUFDRCxHQWRNLENBQVA7QUFlRDs7QUFFRCxTQUFTSSxTQUFULENBQW1CUCxHQUFuQixFQUF3QlAsR0FBeEIsRUFBNkJRLEtBQTdCLEVBQW9DOztBQUVsQyxTQUFPRCxJQUFJUSxJQUFKLENBQVMsZ0JBQVE7QUFBQTtBQUFBO0FBQUE7O0FBQUE7O0FBRXRCLDRCQUFxQnpCLHlCQUF5QnFCLElBQXpCLENBQXJCLG1JQUFxRDtBQUFBOztBQUFBOztBQUFBLFlBQXpDQyxDQUF5QztBQUFBLFlBQXRDQyxDQUFzQzs7O0FBRW5ELGVBQVFELE1BQU1aLEdBQU4sSUFBYWEsTUFBTUwsS0FBM0I7QUFDRDtBQUxxQjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBTXZCLEdBTk0sQ0FBUDtBQU9EOztBQUVELFNBQVNRLFlBQVQsQ0FBc0JULEdBQXRCLEVBQTJCUCxHQUEzQixFQUFnQzs7QUFFOUIsU0FBT08sSUFBSVEsSUFBSixDQUFTLGdCQUFRO0FBQUE7QUFBQTtBQUFBOztBQUFBOztBQUV0Qiw0QkFBa0J6Qix5QkFBeUJxQixJQUF6QixDQUFsQixtSUFBa0Q7QUFBQTs7QUFBQTs7QUFBQSxZQUF0Q0MsQ0FBc0M7OztBQUVoRCxlQUFRQSxNQUFNWixHQUFkO0FBQ0Q7QUFMcUI7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQU12QixHQU5NLENBQVA7QUFPRDs7QUFFRGlCLE9BQU9DLE9BQVAsQ0FBZTVCLHdCQUFmLEdBQTBDQSx3QkFBMUM7QUFDQTJCLE9BQU9DLE9BQVAsQ0FBZWpCLFlBQWYsR0FBOEJBLFlBQTlCO0FBQ0FnQixPQUFPQyxPQUFQLENBQWVaLFdBQWYsR0FBNkJBLFdBQTdCO0FBQ0FXLE9BQU9DLE9BQVAsQ0FBZUosU0FBZixHQUEyQkEsU0FBM0I7QUFDQUcsT0FBT0MsT0FBUCxDQUFlRixZQUFmLEdBQThCQSxZQUE5QiIsImZpbGUiOiJ1dGlsLmpzIiwic291cmNlc0NvbnRlbnQiOlsiZnVuY3Rpb24gZ2V0SXRlcmFibGVPYmplY3RFbnRyaWVzKG9iaikge1xuXG4gIGxldCBpbmRleCA9IDA7XG5cbiAgY29uc3QgcHJvcEtleXMgPSBSZWZsZWN0Lm93bktleXMob2JqKTtcblxuICByZXR1cm4ge1xuICAgIFtTeW1ib2wuaXRlcmF0b3JdKCkge1xuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfSxcbiAgICBuZXh0KCkge1xuXG4gICAgICBpZiAoaW5kZXggPCBwcm9wS2V5cy5sZW5ndGgpIHtcblxuICAgICAgICBjb25zdCBrZXkgPSBwcm9wS2V5c1tpbmRleF07XG5cbiAgICAgICAgaW5kZXggKz0gMTtcbiAgICAgICAgcmV0dXJuIHtcInZhbHVlXCI6IFtrZXksIG9ialtrZXldXX07XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB7XCJkb25lXCI6IHRydWV9O1xuICAgIH1cbiAgfTtcbn1cblxuZnVuY3Rpb24gY29weU93blByb3BzKHRhcmdldCwgc291cmNlKSB7XG5cbiAgZm9yIChjb25zdCBba2V5XSBvZiBnZXRJdGVyYWJsZU9iamVjdEVudHJpZXMoc291cmNlKSkge1xuXG4gICAgUmVmbGVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGtleSwgUmVmbGVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3Ioc291cmNlLCBrZXkpKTtcbiAgfVxuXG4gIHJldHVybiB0YXJnZXQ7XG59XG5cbmZ1bmN0aW9uIHJlbW92ZVdoZXJlKGFyciwga2V5LCB2YWx1ZSkge1xuXG4gIHJldHVybiBhcnIuZmlsdGVyKGVsZW0gPT4ge1xuXG4gICAgbGV0IHJldCA9IHRydWU7XG5cbiAgICBmb3IgKGNvbnN0IFtrLCB2XSBvZiBnZXRJdGVyYWJsZU9iamVjdEVudHJpZXMoZWxlbSkpIHtcblxuICAgICAgaWYgKGsgPT09IGtleSAmJiB2ID09PSB2YWx1ZSkge1xuXG4gICAgICAgIHJldCA9IGZhbHNlO1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gcmV0O1xuICB9KTtcbn1cblxuZnVuY3Rpb24gZmluZFdoZXJlKGFyciwga2V5LCB2YWx1ZSkge1xuXG4gIHJldHVybiBhcnIuZmluZChlbGVtID0+IHtcblxuICAgIGZvciAoY29uc3QgW2ssIHZdIG9mIGdldEl0ZXJhYmxlT2JqZWN0RW50cmllcyhlbGVtKSkge1xuXG4gICAgICByZXR1cm4gKGsgPT09IGtleSAmJiB2ID09PSB2YWx1ZSk7XG4gICAgfVxuICB9KTtcbn1cblxuZnVuY3Rpb24gZmluZFdoZXJlS2V5KGFyciwga2V5KSB7XG5cbiAgcmV0dXJuIGFyci5maW5kKGVsZW0gPT4ge1xuXG4gICAgZm9yIChjb25zdCBba10gb2YgZ2V0SXRlcmFibGVPYmplY3RFbnRyaWVzKGVsZW0pKSB7XG5cbiAgICAgIHJldHVybiAoayA9PT0ga2V5KTtcbiAgICB9XG4gIH0pO1xufVxuXG5tb2R1bGUuZXhwb3J0cy5nZXRJdGVyYWJsZU9iamVjdEVudHJpZXMgPSBnZXRJdGVyYWJsZU9iamVjdEVudHJpZXM7XG5tb2R1bGUuZXhwb3J0cy5jb3B5T3duUHJvcHMgPSBjb3B5T3duUHJvcHM7XG5tb2R1bGUuZXhwb3J0cy5yZW1vdmVXaGVyZSA9IHJlbW92ZVdoZXJlO1xubW9kdWxlLmV4cG9ydHMuZmluZFdoZXJlID0gZmluZFdoZXJlO1xubW9kdWxlLmV4cG9ydHMuZmluZFdoZXJlS2V5ID0gZmluZFdoZXJlS2V5O1xuIl19
