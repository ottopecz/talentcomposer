"use strict";

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _require = require("./util");

const getIterableObjectEntries = _require.getIterableObjectEntries;

const symbol = Symbol("required member");

class Talent {

  constructor(record) {

    Talent.copyOwnProps(this, record);
  }

  static copyOwnProps(target, source) {

    for (const _ref of getIterableObjectEntries(source)) {
      var _ref2 = _slicedToArray(_ref, 2);

      const key = _ref2[0];
      const value = _ref2[1];


      if (typeof value === "symbol" && value.toString().includes("required member")) {

        target[key] = Talent.required;
      } else {

        Reflect.defineProperty(target, key, Reflect.getOwnPropertyDescriptor(source, key));
      }
    }

    return target;
  }

  static addProperty(talent, keyValue) {

    const key = Reflect.ownKeys(keyValue)[0];
    const valueDesc = Reflect.getOwnPropertyDescriptor(keyValue, key);
    const record = Talent.copyOwnProps({}, talent);

    Reflect.defineProperty(record, key, valueDesc);

    return new Talent(record);
  }

  static removeProperty(talent, key) {

    const record = Talent.copyOwnProps({}, talent);

    Reflect.deleteProperty(record, key);

    return new Talent(record);
  }

  static typeCheck(talent) {

    return talent instanceof Talent;
  }

  static get required() {

    return symbol;
  }
}

module.exports = Talent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL2xpYi9UYWxlbnQuanMiXSwibmFtZXMiOlsicmVxdWlyZSIsImdldEl0ZXJhYmxlT2JqZWN0RW50cmllcyIsInN5bWJvbCIsIlN5bWJvbCIsIlRhbGVudCIsImNvbnN0cnVjdG9yIiwicmVjb3JkIiwiY29weU93blByb3BzIiwidGFyZ2V0Iiwic291cmNlIiwia2V5IiwidmFsdWUiLCJ0b1N0cmluZyIsImluY2x1ZGVzIiwicmVxdWlyZWQiLCJSZWZsZWN0IiwiZGVmaW5lUHJvcGVydHkiLCJnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IiLCJhZGRQcm9wZXJ0eSIsInRhbGVudCIsImtleVZhbHVlIiwib3duS2V5cyIsInZhbHVlRGVzYyIsInJlbW92ZVByb3BlcnR5IiwiZGVsZXRlUHJvcGVydHkiLCJ0eXBlQ2hlY2siLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiOzs7O2VBQW1DQSxRQUFRLFFBQVIsQzs7TUFBNUJDLHdCLFlBQUFBLHdCOztBQUNQLE1BQU1DLFNBQVNDLE9BQU8saUJBQVAsQ0FBZjs7QUFFQSxNQUFNQyxNQUFOLENBQWE7O0FBRVhDLGNBQVlDLE1BQVosRUFBb0I7O0FBRWxCRixXQUFPRyxZQUFQLENBQW9CLElBQXBCLEVBQTBCRCxNQUExQjtBQUNEOztBQUVELFNBQU9DLFlBQVAsQ0FBb0JDLE1BQXBCLEVBQTRCQyxNQUE1QixFQUFvQzs7QUFFbEMsdUJBQTJCUix5QkFBeUJRLE1BQXpCLENBQTNCLEVBQTZEO0FBQUE7O0FBQUEsWUFBakRDLEdBQWlEO0FBQUEsWUFBNUNDLEtBQTRDOzs7QUFFM0QsVUFBSyxPQUFPQSxLQUFQLEtBQWlCLFFBQWxCLElBQStCQSxNQUFNQyxRQUFOLEdBQWlCQyxRQUFqQixDQUEwQixpQkFBMUIsQ0FBbkMsRUFBaUY7O0FBRS9FTCxlQUFPRSxHQUFQLElBQWNOLE9BQU9VLFFBQXJCO0FBQ0QsT0FIRCxNQUdPOztBQUVMQyxnQkFBUUMsY0FBUixDQUF1QlIsTUFBdkIsRUFBK0JFLEdBQS9CLEVBQW9DSyxRQUFRRSx3QkFBUixDQUFpQ1IsTUFBakMsRUFBeUNDLEdBQXpDLENBQXBDO0FBQ0Q7QUFDRjs7QUFFRCxXQUFPRixNQUFQO0FBQ0Q7O0FBRUQsU0FBT1UsV0FBUCxDQUFtQkMsTUFBbkIsRUFBMkJDLFFBQTNCLEVBQXFDOztBQUVuQyxVQUFNVixNQUFNSyxRQUFRTSxPQUFSLENBQWdCRCxRQUFoQixFQUEwQixDQUExQixDQUFaO0FBQ0EsVUFBTUUsWUFBWVAsUUFBUUUsd0JBQVIsQ0FBaUNHLFFBQWpDLEVBQTJDVixHQUEzQyxDQUFsQjtBQUNBLFVBQU1KLFNBQVNGLE9BQU9HLFlBQVAsQ0FBb0IsRUFBcEIsRUFBd0JZLE1BQXhCLENBQWY7O0FBRUFKLFlBQVFDLGNBQVIsQ0FBdUJWLE1BQXZCLEVBQStCSSxHQUEvQixFQUFvQ1ksU0FBcEM7O0FBRUEsV0FBTyxJQUFJbEIsTUFBSixDQUFXRSxNQUFYLENBQVA7QUFDRDs7QUFFRCxTQUFPaUIsY0FBUCxDQUFzQkosTUFBdEIsRUFBOEJULEdBQTlCLEVBQW1DOztBQUVqQyxVQUFNSixTQUFTRixPQUFPRyxZQUFQLENBQW9CLEVBQXBCLEVBQXdCWSxNQUF4QixDQUFmOztBQUVBSixZQUFRUyxjQUFSLENBQXVCbEIsTUFBdkIsRUFBK0JJLEdBQS9COztBQUVBLFdBQU8sSUFBSU4sTUFBSixDQUFXRSxNQUFYLENBQVA7QUFDRDs7QUFFRCxTQUFPbUIsU0FBUCxDQUFpQk4sTUFBakIsRUFBeUI7O0FBRXZCLFdBQVFBLGtCQUFrQmYsTUFBMUI7QUFDRDs7QUFFRCxhQUFXVSxRQUFYLEdBQXNCOztBQUVwQixXQUFPWixNQUFQO0FBQ0Q7QUFuRFU7O0FBc0Rid0IsT0FBT0MsT0FBUCxHQUFpQnZCLE1BQWpCIiwiZmlsZSI6IlRhbGVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbImNvbnN0IHtnZXRJdGVyYWJsZU9iamVjdEVudHJpZXN9ID0gcmVxdWlyZShcIi4vdXRpbFwiKTtcbmNvbnN0IHN5bWJvbCA9IFN5bWJvbChcInJlcXVpcmVkIG1lbWJlclwiKTtcblxuY2xhc3MgVGFsZW50IHtcblxuICBjb25zdHJ1Y3RvcihyZWNvcmQpIHtcblxuICAgIFRhbGVudC5jb3B5T3duUHJvcHModGhpcywgcmVjb3JkKTtcbiAgfVxuXG4gIHN0YXRpYyBjb3B5T3duUHJvcHModGFyZ2V0LCBzb3VyY2UpIHtcblxuICAgIGZvciAoY29uc3QgW2tleSwgdmFsdWVdIG9mIGdldEl0ZXJhYmxlT2JqZWN0RW50cmllcyhzb3VyY2UpKSB7XG5cbiAgICAgIGlmICgodHlwZW9mIHZhbHVlID09PSBcInN5bWJvbFwiKSAmJiB2YWx1ZS50b1N0cmluZygpLmluY2x1ZGVzKFwicmVxdWlyZWQgbWVtYmVyXCIpKSB7XG5cbiAgICAgICAgdGFyZ2V0W2tleV0gPSBUYWxlbnQucmVxdWlyZWQ7XG4gICAgICB9IGVsc2Uge1xuXG4gICAgICAgIFJlZmxlY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBrZXksIFJlZmxlY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKHNvdXJjZSwga2V5KSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHRhcmdldDtcbiAgfVxuXG4gIHN0YXRpYyBhZGRQcm9wZXJ0eSh0YWxlbnQsIGtleVZhbHVlKSB7XG5cbiAgICBjb25zdCBrZXkgPSBSZWZsZWN0Lm93bktleXMoa2V5VmFsdWUpWzBdO1xuICAgIGNvbnN0IHZhbHVlRGVzYyA9IFJlZmxlY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKGtleVZhbHVlLCBrZXkpO1xuICAgIGNvbnN0IHJlY29yZCA9IFRhbGVudC5jb3B5T3duUHJvcHMoe30sIHRhbGVudCk7XG5cbiAgICBSZWZsZWN0LmRlZmluZVByb3BlcnR5KHJlY29yZCwga2V5LCB2YWx1ZURlc2MpO1xuXG4gICAgcmV0dXJuIG5ldyBUYWxlbnQocmVjb3JkKTtcbiAgfVxuXG4gIHN0YXRpYyByZW1vdmVQcm9wZXJ0eSh0YWxlbnQsIGtleSkge1xuXG4gICAgY29uc3QgcmVjb3JkID0gVGFsZW50LmNvcHlPd25Qcm9wcyh7fSwgdGFsZW50KTtcblxuICAgIFJlZmxlY3QuZGVsZXRlUHJvcGVydHkocmVjb3JkLCBrZXkpO1xuXG4gICAgcmV0dXJuIG5ldyBUYWxlbnQocmVjb3JkKTtcbiAgfVxuXG4gIHN0YXRpYyB0eXBlQ2hlY2sodGFsZW50KSB7XG5cbiAgICByZXR1cm4gKHRhbGVudCBpbnN0YW5jZW9mIFRhbGVudCk7XG4gIH1cblxuICBzdGF0aWMgZ2V0IHJlcXVpcmVkKCkge1xuXG4gICAgcmV0dXJuIHN5bWJvbDtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IFRhbGVudDtcbiJdfQ==
