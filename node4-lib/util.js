"use strict";

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

function getIterableObjectEntries(obj) {

  let index = 0;

  const propKeys = Reflect.ownKeys(obj);

  return {
    [Symbol.iterator]: function () {
      return this;
    },
    next: function next() {

      if (index < propKeys.length) {

        const key = propKeys[index];

        index += 1;
        return { "value": [key, obj[key]] };
      }

      return { "done": true };
    }
  };
}

function copyOwnProps(target, source) {

  for (const _ref of getIterableObjectEntries(source)) {
    var _ref2 = _slicedToArray(_ref, 1);

    const key = _ref2[0];


    Reflect.defineProperty(target, key, Reflect.getOwnPropertyDescriptor(source, key));
  }

  return target;
}

function removeWhere(arr, key, value) {

  return arr.filter(elem => {

    let ret = true;

    for (const _ref3 of getIterableObjectEntries(elem)) {
      var _ref4 = _slicedToArray(_ref3, 2);

      const k = _ref4[0];
      const v = _ref4[1];


      if (k === key && v === value) {

        ret = false;
        break;
      }
    }

    return ret;
  });
}

function findWhere(arr, key, value) {

  return arr.find(elem => {

    for (const _ref5 of getIterableObjectEntries(elem)) {
      var _ref6 = _slicedToArray(_ref5, 2);

      const k = _ref6[0];
      const v = _ref6[1];


      return k === key && v === value;
    }
  });
}

function findWhereKey(arr, key) {

  return arr.find(elem => {

    for (const _ref7 of getIterableObjectEntries(elem)) {
      var _ref8 = _slicedToArray(_ref7, 1);

      const k = _ref8[0];


      return k === key;
    }
  });
}

module.exports.getIterableObjectEntries = getIterableObjectEntries;
module.exports.copyOwnProps = copyOwnProps;
module.exports.removeWhere = removeWhere;
module.exports.findWhere = findWhere;
module.exports.findWhereKey = findWhereKey;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL2xpYi91dGlsLmpzIl0sIm5hbWVzIjpbImdldEl0ZXJhYmxlT2JqZWN0RW50cmllcyIsIm9iaiIsImluZGV4IiwicHJvcEtleXMiLCJSZWZsZWN0Iiwib3duS2V5cyIsIlN5bWJvbCIsIml0ZXJhdG9yIiwibmV4dCIsImxlbmd0aCIsImtleSIsImNvcHlPd25Qcm9wcyIsInRhcmdldCIsInNvdXJjZSIsImRlZmluZVByb3BlcnR5IiwiZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yIiwicmVtb3ZlV2hlcmUiLCJhcnIiLCJ2YWx1ZSIsImZpbHRlciIsImVsZW0iLCJyZXQiLCJrIiwidiIsImZpbmRXaGVyZSIsImZpbmQiLCJmaW5kV2hlcmVLZXkiLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiOzs7O0FBQUEsU0FBU0Esd0JBQVQsQ0FBa0NDLEdBQWxDLEVBQXVDOztBQUVyQyxNQUFJQyxRQUFRLENBQVo7O0FBRUEsUUFBTUMsV0FBV0MsUUFBUUMsT0FBUixDQUFnQkosR0FBaEIsQ0FBakI7O0FBRUEsU0FBTztBQUFBLEtBQ0pLLE9BQU9DLFFBREgsZUFDZTtBQUNsQixhQUFPLElBQVA7QUFDRCxLQUhJO0FBSUxDLFFBSkssa0JBSUU7O0FBRUwsVUFBSU4sUUFBUUMsU0FBU00sTUFBckIsRUFBNkI7O0FBRTNCLGNBQU1DLE1BQU1QLFNBQVNELEtBQVQsQ0FBWjs7QUFFQUEsaUJBQVMsQ0FBVDtBQUNBLGVBQU8sRUFBQyxTQUFTLENBQUNRLEdBQUQsRUFBTVQsSUFBSVMsR0FBSixDQUFOLENBQVYsRUFBUDtBQUNEOztBQUVELGFBQU8sRUFBQyxRQUFRLElBQVQsRUFBUDtBQUNEO0FBZkksR0FBUDtBQWlCRDs7QUFFRCxTQUFTQyxZQUFULENBQXNCQyxNQUF0QixFQUE4QkMsTUFBOUIsRUFBc0M7O0FBRXBDLHFCQUFvQmIseUJBQXlCYSxNQUF6QixDQUFwQixFQUFzRDtBQUFBOztBQUFBLFVBQTFDSCxHQUEwQzs7O0FBRXBETixZQUFRVSxjQUFSLENBQXVCRixNQUF2QixFQUErQkYsR0FBL0IsRUFBb0NOLFFBQVFXLHdCQUFSLENBQWlDRixNQUFqQyxFQUF5Q0gsR0FBekMsQ0FBcEM7QUFDRDs7QUFFRCxTQUFPRSxNQUFQO0FBQ0Q7O0FBRUQsU0FBU0ksV0FBVCxDQUFxQkMsR0FBckIsRUFBMEJQLEdBQTFCLEVBQStCUSxLQUEvQixFQUFzQzs7QUFFcEMsU0FBT0QsSUFBSUUsTUFBSixDQUFXQyxRQUFROztBQUV4QixRQUFJQyxNQUFNLElBQVY7O0FBRUEsd0JBQXFCckIseUJBQXlCb0IsSUFBekIsQ0FBckIsRUFBcUQ7QUFBQTs7QUFBQSxZQUF6Q0UsQ0FBeUM7QUFBQSxZQUF0Q0MsQ0FBc0M7OztBQUVuRCxVQUFJRCxNQUFNWixHQUFOLElBQWFhLE1BQU1MLEtBQXZCLEVBQThCOztBQUU1QkcsY0FBTSxLQUFOO0FBQ0E7QUFDRDtBQUNGOztBQUVELFdBQU9BLEdBQVA7QUFDRCxHQWRNLENBQVA7QUFlRDs7QUFFRCxTQUFTRyxTQUFULENBQW1CUCxHQUFuQixFQUF3QlAsR0FBeEIsRUFBNkJRLEtBQTdCLEVBQW9DOztBQUVsQyxTQUFPRCxJQUFJUSxJQUFKLENBQVNMLFFBQVE7O0FBRXRCLHdCQUFxQnBCLHlCQUF5Qm9CLElBQXpCLENBQXJCLEVBQXFEO0FBQUE7O0FBQUEsWUFBekNFLENBQXlDO0FBQUEsWUFBdENDLENBQXNDOzs7QUFFbkQsYUFBUUQsTUFBTVosR0FBTixJQUFhYSxNQUFNTCxLQUEzQjtBQUNEO0FBQ0YsR0FOTSxDQUFQO0FBT0Q7O0FBRUQsU0FBU1EsWUFBVCxDQUFzQlQsR0FBdEIsRUFBMkJQLEdBQTNCLEVBQWdDOztBQUU5QixTQUFPTyxJQUFJUSxJQUFKLENBQVNMLFFBQVE7O0FBRXRCLHdCQUFrQnBCLHlCQUF5Qm9CLElBQXpCLENBQWxCLEVBQWtEO0FBQUE7O0FBQUEsWUFBdENFLENBQXNDOzs7QUFFaEQsYUFBUUEsTUFBTVosR0FBZDtBQUNEO0FBQ0YsR0FOTSxDQUFQO0FBT0Q7O0FBRURpQixPQUFPQyxPQUFQLENBQWU1Qix3QkFBZixHQUEwQ0Esd0JBQTFDO0FBQ0EyQixPQUFPQyxPQUFQLENBQWVqQixZQUFmLEdBQThCQSxZQUE5QjtBQUNBZ0IsT0FBT0MsT0FBUCxDQUFlWixXQUFmLEdBQTZCQSxXQUE3QjtBQUNBVyxPQUFPQyxPQUFQLENBQWVKLFNBQWYsR0FBMkJBLFNBQTNCO0FBQ0FHLE9BQU9DLE9BQVAsQ0FBZUYsWUFBZixHQUE4QkEsWUFBOUIiLCJmaWxlIjoidXRpbC5qcyIsInNvdXJjZXNDb250ZW50IjpbImZ1bmN0aW9uIGdldEl0ZXJhYmxlT2JqZWN0RW50cmllcyhvYmopIHtcblxuICBsZXQgaW5kZXggPSAwO1xuXG4gIGNvbnN0IHByb3BLZXlzID0gUmVmbGVjdC5vd25LZXlzKG9iaik7XG5cbiAgcmV0dXJuIHtcbiAgICBbU3ltYm9sLml0ZXJhdG9yXSgpIHtcbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH0sXG4gICAgbmV4dCgpIHtcblxuICAgICAgaWYgKGluZGV4IDwgcHJvcEtleXMubGVuZ3RoKSB7XG5cbiAgICAgICAgY29uc3Qga2V5ID0gcHJvcEtleXNbaW5kZXhdO1xuXG4gICAgICAgIGluZGV4ICs9IDE7XG4gICAgICAgIHJldHVybiB7XCJ2YWx1ZVwiOiBba2V5LCBvYmpba2V5XV19O1xuICAgICAgfVxuXG4gICAgICByZXR1cm4ge1wiZG9uZVwiOiB0cnVlfTtcbiAgICB9XG4gIH07XG59XG5cbmZ1bmN0aW9uIGNvcHlPd25Qcm9wcyh0YXJnZXQsIHNvdXJjZSkge1xuXG4gIGZvciAoY29uc3QgW2tleV0gb2YgZ2V0SXRlcmFibGVPYmplY3RFbnRyaWVzKHNvdXJjZSkpIHtcblxuICAgIFJlZmxlY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBrZXksIFJlZmxlY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKHNvdXJjZSwga2V5KSk7XG4gIH1cblxuICByZXR1cm4gdGFyZ2V0O1xufVxuXG5mdW5jdGlvbiByZW1vdmVXaGVyZShhcnIsIGtleSwgdmFsdWUpIHtcblxuICByZXR1cm4gYXJyLmZpbHRlcihlbGVtID0+IHtcblxuICAgIGxldCByZXQgPSB0cnVlO1xuXG4gICAgZm9yIChjb25zdCBbaywgdl0gb2YgZ2V0SXRlcmFibGVPYmplY3RFbnRyaWVzKGVsZW0pKSB7XG5cbiAgICAgIGlmIChrID09PSBrZXkgJiYgdiA9PT0gdmFsdWUpIHtcblxuICAgICAgICByZXQgPSBmYWxzZTtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHJldDtcbiAgfSk7XG59XG5cbmZ1bmN0aW9uIGZpbmRXaGVyZShhcnIsIGtleSwgdmFsdWUpIHtcblxuICByZXR1cm4gYXJyLmZpbmQoZWxlbSA9PiB7XG5cbiAgICBmb3IgKGNvbnN0IFtrLCB2XSBvZiBnZXRJdGVyYWJsZU9iamVjdEVudHJpZXMoZWxlbSkpIHtcblxuICAgICAgcmV0dXJuIChrID09PSBrZXkgJiYgdiA9PT0gdmFsdWUpO1xuICAgIH1cbiAgfSk7XG59XG5cbmZ1bmN0aW9uIGZpbmRXaGVyZUtleShhcnIsIGtleSkge1xuXG4gIHJldHVybiBhcnIuZmluZChlbGVtID0+IHtcblxuICAgIGZvciAoY29uc3QgW2tdIG9mIGdldEl0ZXJhYmxlT2JqZWN0RW50cmllcyhlbGVtKSkge1xuXG4gICAgICByZXR1cm4gKGsgPT09IGtleSk7XG4gICAgfVxuICB9KTtcbn1cblxubW9kdWxlLmV4cG9ydHMuZ2V0SXRlcmFibGVPYmplY3RFbnRyaWVzID0gZ2V0SXRlcmFibGVPYmplY3RFbnRyaWVzO1xubW9kdWxlLmV4cG9ydHMuY29weU93blByb3BzID0gY29weU93blByb3BzO1xubW9kdWxlLmV4cG9ydHMucmVtb3ZlV2hlcmUgPSByZW1vdmVXaGVyZTtcbm1vZHVsZS5leHBvcnRzLmZpbmRXaGVyZSA9IGZpbmRXaGVyZTtcbm1vZHVsZS5leHBvcnRzLmZpbmRXaGVyZUtleSA9IGZpbmRXaGVyZUtleTtcbiJdfQ==
