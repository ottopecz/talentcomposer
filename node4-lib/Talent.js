"use strict";

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _require = require("./util"),
    getIterableObjectEntries = _require.getIterableObjectEntries;

var symbol = Symbol("required member");

var Talent = function () {
  function Talent(record) {
    _classCallCheck(this, Talent);

    Talent.copyOwnProps(this, record);
  }

  _createClass(Talent, null, [{
    key: "copyOwnProps",
    value: function copyOwnProps(target, source) {
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {

        for (var _iterator = getIterableObjectEntries(source)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var _ref = _step.value;

          var _ref2 = _slicedToArray(_ref, 2);

          var key = _ref2[0];
          var value = _ref2[1];


          if (typeof value === "symbol" && value.toString().includes("required member")) {

            target[key] = Talent.required;
          } else {

            Reflect.defineProperty(target, key, Reflect.getOwnPropertyDescriptor(source, key));
          }
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
  }, {
    key: "addProperty",
    value: function addProperty(talent, keyValue) {

      var key = Reflect.ownKeys(keyValue)[0];
      var valueDesc = Reflect.getOwnPropertyDescriptor(keyValue, key);
      var record = Talent.copyOwnProps({}, talent);

      Reflect.defineProperty(record, key, valueDesc);

      return new Talent(record);
    }
  }, {
    key: "removeProperty",
    value: function removeProperty(talent, key) {

      var record = Talent.copyOwnProps({}, talent);

      Reflect.deleteProperty(record, key);

      return new Talent(record);
    }
  }, {
    key: "typeCheck",
    value: function typeCheck(talent) {

      return talent instanceof Talent;
    }
  }, {
    key: "required",
    get: function get() {

      return symbol;
    }
  }]);

  return Talent;
}();

module.exports = Talent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL2xpYi9UYWxlbnQuanMiXSwibmFtZXMiOlsicmVxdWlyZSIsImdldEl0ZXJhYmxlT2JqZWN0RW50cmllcyIsInN5bWJvbCIsIlN5bWJvbCIsIlRhbGVudCIsInJlY29yZCIsImNvcHlPd25Qcm9wcyIsInRhcmdldCIsInNvdXJjZSIsImtleSIsInZhbHVlIiwidG9TdHJpbmciLCJpbmNsdWRlcyIsInJlcXVpcmVkIiwiUmVmbGVjdCIsImRlZmluZVByb3BlcnR5IiwiZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yIiwidGFsZW50Iiwia2V5VmFsdWUiLCJvd25LZXlzIiwidmFsdWVEZXNjIiwiZGVsZXRlUHJvcGVydHkiLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7OztlQUFtQ0EsUUFBUSxRQUFSLEM7SUFBNUJDLHdCLFlBQUFBLHdCOztBQUNQLElBQU1DLFNBQVNDLE9BQU8saUJBQVAsQ0FBZjs7SUFFTUMsTTtBQUVKLGtCQUFZQyxNQUFaLEVBQW9CO0FBQUE7O0FBRWxCRCxXQUFPRSxZQUFQLENBQW9CLElBQXBCLEVBQTBCRCxNQUExQjtBQUNEOzs7O2lDQUVtQkUsTSxFQUFRQyxNLEVBQVE7QUFBQTtBQUFBO0FBQUE7O0FBQUE7O0FBRWxDLDZCQUEyQlAseUJBQXlCTyxNQUF6QixDQUEzQiw4SEFBNkQ7QUFBQTs7QUFBQTs7QUFBQSxjQUFqREMsR0FBaUQ7QUFBQSxjQUE1Q0MsS0FBNEM7OztBQUUzRCxjQUFLLE9BQU9BLEtBQVAsS0FBaUIsUUFBbEIsSUFBK0JBLE1BQU1DLFFBQU4sR0FBaUJDLFFBQWpCLENBQTBCLGlCQUExQixDQUFuQyxFQUFpRjs7QUFFL0VMLG1CQUFPRSxHQUFQLElBQWNMLE9BQU9TLFFBQXJCO0FBQ0QsV0FIRCxNQUdPOztBQUVMQyxvQkFBUUMsY0FBUixDQUF1QlIsTUFBdkIsRUFBK0JFLEdBQS9CLEVBQW9DSyxRQUFRRSx3QkFBUixDQUFpQ1IsTUFBakMsRUFBeUNDLEdBQXpDLENBQXBDO0FBQ0Q7QUFDRjtBQVhpQztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBOztBQWFsQyxhQUFPRixNQUFQO0FBQ0Q7OztnQ0FFa0JVLE0sRUFBUUMsUSxFQUFVOztBQUVuQyxVQUFNVCxNQUFNSyxRQUFRSyxPQUFSLENBQWdCRCxRQUFoQixFQUEwQixDQUExQixDQUFaO0FBQ0EsVUFBTUUsWUFBWU4sUUFBUUUsd0JBQVIsQ0FBaUNFLFFBQWpDLEVBQTJDVCxHQUEzQyxDQUFsQjtBQUNBLFVBQU1KLFNBQVNELE9BQU9FLFlBQVAsQ0FBb0IsRUFBcEIsRUFBd0JXLE1BQXhCLENBQWY7O0FBRUFILGNBQVFDLGNBQVIsQ0FBdUJWLE1BQXZCLEVBQStCSSxHQUEvQixFQUFvQ1csU0FBcEM7O0FBRUEsYUFBTyxJQUFJaEIsTUFBSixDQUFXQyxNQUFYLENBQVA7QUFDRDs7O21DQUVxQlksTSxFQUFRUixHLEVBQUs7O0FBRWpDLFVBQU1KLFNBQVNELE9BQU9FLFlBQVAsQ0FBb0IsRUFBcEIsRUFBd0JXLE1BQXhCLENBQWY7O0FBRUFILGNBQVFPLGNBQVIsQ0FBdUJoQixNQUF2QixFQUErQkksR0FBL0I7O0FBRUEsYUFBTyxJQUFJTCxNQUFKLENBQVdDLE1BQVgsQ0FBUDtBQUNEOzs7OEJBRWdCWSxNLEVBQVE7O0FBRXZCLGFBQVFBLGtCQUFrQmIsTUFBMUI7QUFDRDs7O3dCQUVxQjs7QUFFcEIsYUFBT0YsTUFBUDtBQUNEOzs7Ozs7QUFHSG9CLE9BQU9DLE9BQVAsR0FBaUJuQixNQUFqQiIsImZpbGUiOiJUYWxlbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCB7Z2V0SXRlcmFibGVPYmplY3RFbnRyaWVzfSA9IHJlcXVpcmUoXCIuL3V0aWxcIik7XG5jb25zdCBzeW1ib2wgPSBTeW1ib2woXCJyZXF1aXJlZCBtZW1iZXJcIik7XG5cbmNsYXNzIFRhbGVudCB7XG5cbiAgY29uc3RydWN0b3IocmVjb3JkKSB7XG5cbiAgICBUYWxlbnQuY29weU93blByb3BzKHRoaXMsIHJlY29yZCk7XG4gIH1cblxuICBzdGF0aWMgY29weU93blByb3BzKHRhcmdldCwgc291cmNlKSB7XG5cbiAgICBmb3IgKGNvbnN0IFtrZXksIHZhbHVlXSBvZiBnZXRJdGVyYWJsZU9iamVjdEVudHJpZXMoc291cmNlKSkge1xuXG4gICAgICBpZiAoKHR5cGVvZiB2YWx1ZSA9PT0gXCJzeW1ib2xcIikgJiYgdmFsdWUudG9TdHJpbmcoKS5pbmNsdWRlcyhcInJlcXVpcmVkIG1lbWJlclwiKSkge1xuXG4gICAgICAgIHRhcmdldFtrZXldID0gVGFsZW50LnJlcXVpcmVkO1xuICAgICAgfSBlbHNlIHtcblxuICAgICAgICBSZWZsZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwga2V5LCBSZWZsZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihzb3VyY2UsIGtleSkpO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiB0YXJnZXQ7XG4gIH1cblxuICBzdGF0aWMgYWRkUHJvcGVydHkodGFsZW50LCBrZXlWYWx1ZSkge1xuXG4gICAgY29uc3Qga2V5ID0gUmVmbGVjdC5vd25LZXlzKGtleVZhbHVlKVswXTtcbiAgICBjb25zdCB2YWx1ZURlc2MgPSBSZWZsZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihrZXlWYWx1ZSwga2V5KTtcbiAgICBjb25zdCByZWNvcmQgPSBUYWxlbnQuY29weU93blByb3BzKHt9LCB0YWxlbnQpO1xuXG4gICAgUmVmbGVjdC5kZWZpbmVQcm9wZXJ0eShyZWNvcmQsIGtleSwgdmFsdWVEZXNjKTtcblxuICAgIHJldHVybiBuZXcgVGFsZW50KHJlY29yZCk7XG4gIH1cblxuICBzdGF0aWMgcmVtb3ZlUHJvcGVydHkodGFsZW50LCBrZXkpIHtcblxuICAgIGNvbnN0IHJlY29yZCA9IFRhbGVudC5jb3B5T3duUHJvcHMoe30sIHRhbGVudCk7XG5cbiAgICBSZWZsZWN0LmRlbGV0ZVByb3BlcnR5KHJlY29yZCwga2V5KTtcblxuICAgIHJldHVybiBuZXcgVGFsZW50KHJlY29yZCk7XG4gIH1cblxuICBzdGF0aWMgdHlwZUNoZWNrKHRhbGVudCkge1xuXG4gICAgcmV0dXJuICh0YWxlbnQgaW5zdGFuY2VvZiBUYWxlbnQpO1xuICB9XG5cbiAgc3RhdGljIGdldCByZXF1aXJlZCgpIHtcblxuICAgIHJldHVybiBzeW1ib2w7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBUYWxlbnQ7XG4iXX0=
