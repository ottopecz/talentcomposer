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

    return talent.constructor.toString().includes("class Talent {");
  }

  static get required() {

    return symbol;
  }
}

module.exports = Talent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL2xpYi9UYWxlbnQuanMiXSwibmFtZXMiOlsicmVxdWlyZSIsImdldEl0ZXJhYmxlT2JqZWN0RW50cmllcyIsInN5bWJvbCIsIlN5bWJvbCIsIlRhbGVudCIsImNvbnN0cnVjdG9yIiwicmVjb3JkIiwiY29weU93blByb3BzIiwidGFyZ2V0Iiwic291cmNlIiwia2V5IiwidmFsdWUiLCJ0b1N0cmluZyIsImluY2x1ZGVzIiwicmVxdWlyZWQiLCJSZWZsZWN0IiwiZGVmaW5lUHJvcGVydHkiLCJnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IiLCJhZGRQcm9wZXJ0eSIsInRhbGVudCIsImtleVZhbHVlIiwib3duS2V5cyIsInZhbHVlRGVzYyIsInJlbW92ZVByb3BlcnR5IiwiZGVsZXRlUHJvcGVydHkiLCJ0eXBlQ2hlY2siLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiOzs7O2VBQW1DQSxRQUFRLFFBQVIsQzs7TUFBNUJDLHdCLFlBQUFBLHdCOztBQUNQLE1BQU1DLFNBQVNDLE9BQU8saUJBQVAsQ0FBZjs7QUFFQSxNQUFNQyxNQUFOLENBQWE7O0FBRVhDLGNBQVlDLE1BQVosRUFBb0I7O0FBRWxCRixXQUFPRyxZQUFQLENBQW9CLElBQXBCLEVBQTBCRCxNQUExQjtBQUNEOztBQUVELFNBQU9DLFlBQVAsQ0FBb0JDLE1BQXBCLEVBQTRCQyxNQUE1QixFQUFvQzs7QUFFbEMsdUJBQTJCUix5QkFBeUJRLE1BQXpCLENBQTNCLEVBQTZEO0FBQUE7O0FBQUEsWUFBakRDLEdBQWlEO0FBQUEsWUFBNUNDLEtBQTRDOzs7QUFFM0QsVUFBSyxPQUFPQSxLQUFQLEtBQWlCLFFBQWxCLElBQStCQSxNQUFNQyxRQUFOLEdBQWlCQyxRQUFqQixDQUEwQixpQkFBMUIsQ0FBbkMsRUFBaUY7O0FBRS9FTCxlQUFPRSxHQUFQLElBQWNOLE9BQU9VLFFBQXJCO0FBQ0QsT0FIRCxNQUdPOztBQUVMQyxnQkFBUUMsY0FBUixDQUF1QlIsTUFBdkIsRUFBK0JFLEdBQS9CLEVBQW9DSyxRQUFRRSx3QkFBUixDQUFpQ1IsTUFBakMsRUFBeUNDLEdBQXpDLENBQXBDO0FBQ0Q7QUFDRjs7QUFFRCxXQUFPRixNQUFQO0FBQ0Q7O0FBRUQsU0FBT1UsV0FBUCxDQUFtQkMsTUFBbkIsRUFBMkJDLFFBQTNCLEVBQXFDOztBQUVuQyxVQUFNVixNQUFNSyxRQUFRTSxPQUFSLENBQWdCRCxRQUFoQixFQUEwQixDQUExQixDQUFaO0FBQ0EsVUFBTUUsWUFBWVAsUUFBUUUsd0JBQVIsQ0FBaUNHLFFBQWpDLEVBQTJDVixHQUEzQyxDQUFsQjtBQUNBLFVBQU1KLFNBQVNGLE9BQU9HLFlBQVAsQ0FBb0IsRUFBcEIsRUFBd0JZLE1BQXhCLENBQWY7O0FBRUFKLFlBQVFDLGNBQVIsQ0FBdUJWLE1BQXZCLEVBQStCSSxHQUEvQixFQUFvQ1ksU0FBcEM7O0FBRUEsV0FBTyxJQUFJbEIsTUFBSixDQUFXRSxNQUFYLENBQVA7QUFDRDs7QUFFRCxTQUFPaUIsY0FBUCxDQUFzQkosTUFBdEIsRUFBOEJULEdBQTlCLEVBQW1DOztBQUVqQyxVQUFNSixTQUFTRixPQUFPRyxZQUFQLENBQW9CLEVBQXBCLEVBQXdCWSxNQUF4QixDQUFmOztBQUVBSixZQUFRUyxjQUFSLENBQXVCbEIsTUFBdkIsRUFBK0JJLEdBQS9COztBQUVBLFdBQU8sSUFBSU4sTUFBSixDQUFXRSxNQUFYLENBQVA7QUFDRDs7QUFFRCxTQUFPbUIsU0FBUCxDQUFpQk4sTUFBakIsRUFBeUI7O0FBRXZCLFdBQU9BLE9BQU9kLFdBQVAsQ0FBbUJPLFFBQW5CLEdBQThCQyxRQUE5QixDQUF1QyxnQkFBdkMsQ0FBUDtBQUNEOztBQUVELGFBQVdDLFFBQVgsR0FBc0I7O0FBRXBCLFdBQU9aLE1BQVA7QUFDRDtBQW5EVTs7QUFzRGJ3QixPQUFPQyxPQUFQLEdBQWlCdkIsTUFBakIiLCJmaWxlIjoiVGFsZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiY29uc3Qge2dldEl0ZXJhYmxlT2JqZWN0RW50cmllc30gPSByZXF1aXJlKFwiLi91dGlsXCIpO1xuY29uc3Qgc3ltYm9sID0gU3ltYm9sKFwicmVxdWlyZWQgbWVtYmVyXCIpO1xuXG5jbGFzcyBUYWxlbnQge1xuXG4gIGNvbnN0cnVjdG9yKHJlY29yZCkge1xuXG4gICAgVGFsZW50LmNvcHlPd25Qcm9wcyh0aGlzLCByZWNvcmQpO1xuICB9XG5cbiAgc3RhdGljIGNvcHlPd25Qcm9wcyh0YXJnZXQsIHNvdXJjZSkge1xuXG4gICAgZm9yIChjb25zdCBba2V5LCB2YWx1ZV0gb2YgZ2V0SXRlcmFibGVPYmplY3RFbnRyaWVzKHNvdXJjZSkpIHtcblxuICAgICAgaWYgKCh0eXBlb2YgdmFsdWUgPT09IFwic3ltYm9sXCIpICYmIHZhbHVlLnRvU3RyaW5nKCkuaW5jbHVkZXMoXCJyZXF1aXJlZCBtZW1iZXJcIikpIHtcblxuICAgICAgICB0YXJnZXRba2V5XSA9IFRhbGVudC5yZXF1aXJlZDtcbiAgICAgIH0gZWxzZSB7XG5cbiAgICAgICAgUmVmbGVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGtleSwgUmVmbGVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3Ioc291cmNlLCBrZXkpKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gdGFyZ2V0O1xuICB9XG5cbiAgc3RhdGljIGFkZFByb3BlcnR5KHRhbGVudCwga2V5VmFsdWUpIHtcblxuICAgIGNvbnN0IGtleSA9IFJlZmxlY3Qub3duS2V5cyhrZXlWYWx1ZSlbMF07XG4gICAgY29uc3QgdmFsdWVEZXNjID0gUmVmbGVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3Ioa2V5VmFsdWUsIGtleSk7XG4gICAgY29uc3QgcmVjb3JkID0gVGFsZW50LmNvcHlPd25Qcm9wcyh7fSwgdGFsZW50KTtcblxuICAgIFJlZmxlY3QuZGVmaW5lUHJvcGVydHkocmVjb3JkLCBrZXksIHZhbHVlRGVzYyk7XG5cbiAgICByZXR1cm4gbmV3IFRhbGVudChyZWNvcmQpO1xuICB9XG5cbiAgc3RhdGljIHJlbW92ZVByb3BlcnR5KHRhbGVudCwga2V5KSB7XG5cbiAgICBjb25zdCByZWNvcmQgPSBUYWxlbnQuY29weU93blByb3BzKHt9LCB0YWxlbnQpO1xuXG4gICAgUmVmbGVjdC5kZWxldGVQcm9wZXJ0eShyZWNvcmQsIGtleSk7XG5cbiAgICByZXR1cm4gbmV3IFRhbGVudChyZWNvcmQpO1xuICB9XG5cbiAgc3RhdGljIHR5cGVDaGVjayh0YWxlbnQpIHtcblxuICAgIHJldHVybiB0YWxlbnQuY29uc3RydWN0b3IudG9TdHJpbmcoKS5pbmNsdWRlcyhcImNsYXNzIFRhbGVudCB7XCIpO1xuICB9XG5cbiAgc3RhdGljIGdldCByZXF1aXJlZCgpIHtcblxuICAgIHJldHVybiBzeW1ib2w7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBUYWxlbnQ7XG4iXX0=
