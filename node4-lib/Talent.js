"use strict";

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _require = require("./util"),
    getIterableObjectEntries = _require.getIterableObjectEntries;

var symbol = Symbol("required member");

/**
 * Represents a talent
 * @class
 */

var Talent = function () {

  /**
   * Constructs an instance
   * @param {Object} record The source record of a talent. Usually an object literal.
   */
  function Talent(record) {
    _classCallCheck(this, Talent);

    Talent.copyOwnProps(this, record);
  }

  /**
   * Copies the own properties from one object to an other
   * @param {Object} target The target of the copy
   * @param {Object} source The source of the copy
   * @static
   * @returns {Object} The result of the copy
   */


  _createClass(Talent, null, [{
    key: "copyOwnProps",
    value: function copyOwnProps(target, source) {

      var trgt = target;

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

            trgt[key] = Talent.required;
          } else {

            Reflect.defineProperty(trgt, key, Reflect.getOwnPropertyDescriptor(source, key));
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

      return trgt;
    }

    /**
     * Adds a new property to a talent
     * @param {Talent} talent The talent to add new member to
     * @param {Object} keyValue The key value pair of the new property wrapped up in an object literal
     * @static
     * @returns {Talent} The extended talent
     */

  }, {
    key: "addProperty",
    value: function addProperty(talent, keyValue) {

      var key = Reflect.ownKeys(keyValue)[0];
      var valueDesc = Reflect.getOwnPropertyDescriptor(keyValue, key);
      var record = Talent.copyOwnProps({}, talent);

      Reflect.defineProperty(record, key, valueDesc);

      return new Talent(record);
    }

    /**
     * Removes a property from a talent
     * @param {Talent} talent The talent to remove a member from
     * @param {string} key The name of the meber to be removed
     * @static
     * @returns {Talent} The ripped off talent
     */

  }, {
    key: "removeProperty",
    value: function removeProperty(talent, key) {

      var record = Talent.copyOwnProps({}, talent);

      Reflect.deleteProperty(record, key);

      return new Talent(record);
    }

    /**
     * Checks if the parameter is a talent
     * @param {*} param The parameter to check
     * @static
     * @returns {boolean} True if the parameter is a talent
     */

  }, {
    key: "typeCheck",
    value: function typeCheck(param) {

      return param instanceof Talent;
    }

    /**
     * Retrieves the required marker
     * @static
     * @returns {Symbol} The required marker
     */

  }, {
    key: "required",
    get: function get() {

      return symbol;
    }
  }]);

  return Talent;
}();

module.exports = Talent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL2xpYi9UYWxlbnQuanMiXSwibmFtZXMiOlsicmVxdWlyZSIsImdldEl0ZXJhYmxlT2JqZWN0RW50cmllcyIsInN5bWJvbCIsIlN5bWJvbCIsIlRhbGVudCIsInJlY29yZCIsImNvcHlPd25Qcm9wcyIsInRhcmdldCIsInNvdXJjZSIsInRyZ3QiLCJrZXkiLCJ2YWx1ZSIsInRvU3RyaW5nIiwiaW5jbHVkZXMiLCJyZXF1aXJlZCIsIlJlZmxlY3QiLCJkZWZpbmVQcm9wZXJ0eSIsImdldE93blByb3BlcnR5RGVzY3JpcHRvciIsInRhbGVudCIsImtleVZhbHVlIiwib3duS2V5cyIsInZhbHVlRGVzYyIsImRlbGV0ZVByb3BlcnR5IiwicGFyYW0iLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7OztlQUFtQ0EsUUFBUSxRQUFSLEM7SUFBNUJDLHdCLFlBQUFBLHdCOztBQUNQLElBQU1DLFNBQVNDLE9BQU8saUJBQVAsQ0FBZjs7QUFFQTs7Ozs7SUFJTUMsTTs7QUFFSjs7OztBQUlBLGtCQUFZQyxNQUFaLEVBQW9CO0FBQUE7O0FBRWxCRCxXQUFPRSxZQUFQLENBQW9CLElBQXBCLEVBQTBCRCxNQUExQjtBQUNEOztBQUVEOzs7Ozs7Ozs7OztpQ0FPb0JFLE0sRUFBUUMsTSxFQUFROztBQUVsQyxVQUFNQyxPQUFPRixNQUFiOztBQUZrQztBQUFBO0FBQUE7O0FBQUE7QUFJbEMsNkJBQTJCTix5QkFBeUJPLE1BQXpCLENBQTNCLDhIQUE2RDtBQUFBOztBQUFBOztBQUFBLGNBQWpERSxHQUFpRDtBQUFBLGNBQTVDQyxLQUE0Qzs7O0FBRTNELGNBQUssT0FBT0EsS0FBUCxLQUFpQixRQUFsQixJQUErQkEsTUFBTUMsUUFBTixHQUFpQkMsUUFBakIsQ0FBMEIsaUJBQTFCLENBQW5DLEVBQWlGOztBQUUvRUosaUJBQUtDLEdBQUwsSUFBWU4sT0FBT1UsUUFBbkI7QUFDRCxXQUhELE1BR087O0FBRUxDLG9CQUFRQyxjQUFSLENBQXVCUCxJQUF2QixFQUE2QkMsR0FBN0IsRUFBa0NLLFFBQVFFLHdCQUFSLENBQWlDVCxNQUFqQyxFQUF5Q0UsR0FBekMsQ0FBbEM7QUFDRDtBQUNGO0FBYmlDO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7O0FBZWxDLGFBQU9ELElBQVA7QUFDRDs7QUFFRDs7Ozs7Ozs7OztnQ0FPbUJTLE0sRUFBUUMsUSxFQUFVOztBQUVuQyxVQUFNVCxNQUFNSyxRQUFRSyxPQUFSLENBQWdCRCxRQUFoQixFQUEwQixDQUExQixDQUFaO0FBQ0EsVUFBTUUsWUFBWU4sUUFBUUUsd0JBQVIsQ0FBaUNFLFFBQWpDLEVBQTJDVCxHQUEzQyxDQUFsQjtBQUNBLFVBQU1MLFNBQVNELE9BQU9FLFlBQVAsQ0FBb0IsRUFBcEIsRUFBd0JZLE1BQXhCLENBQWY7O0FBRUFILGNBQVFDLGNBQVIsQ0FBdUJYLE1BQXZCLEVBQStCSyxHQUEvQixFQUFvQ1csU0FBcEM7O0FBRUEsYUFBTyxJQUFJakIsTUFBSixDQUFXQyxNQUFYLENBQVA7QUFDRDs7QUFFRDs7Ozs7Ozs7OzttQ0FPc0JhLE0sRUFBUVIsRyxFQUFLOztBQUVqQyxVQUFNTCxTQUFTRCxPQUFPRSxZQUFQLENBQW9CLEVBQXBCLEVBQXdCWSxNQUF4QixDQUFmOztBQUVBSCxjQUFRTyxjQUFSLENBQXVCakIsTUFBdkIsRUFBK0JLLEdBQS9COztBQUVBLGFBQU8sSUFBSU4sTUFBSixDQUFXQyxNQUFYLENBQVA7QUFDRDs7QUFFRDs7Ozs7Ozs7OzhCQU1pQmtCLEssRUFBTzs7QUFFdEIsYUFBUUEsaUJBQWlCbkIsTUFBekI7QUFDRDs7QUFFRDs7Ozs7Ozs7d0JBS3NCOztBQUVwQixhQUFPRixNQUFQO0FBQ0Q7Ozs7OztBQUdIc0IsT0FBT0MsT0FBUCxHQUFpQnJCLE1BQWpCIiwiZmlsZSI6IlRhbGVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbImNvbnN0IHtnZXRJdGVyYWJsZU9iamVjdEVudHJpZXN9ID0gcmVxdWlyZShcIi4vdXRpbFwiKTtcbmNvbnN0IHN5bWJvbCA9IFN5bWJvbChcInJlcXVpcmVkIG1lbWJlclwiKTtcblxuLyoqXG4gKiBSZXByZXNlbnRzIGEgdGFsZW50XG4gKiBAY2xhc3NcbiAqL1xuY2xhc3MgVGFsZW50IHtcblxuICAvKipcbiAgICogQ29uc3RydWN0cyBhbiBpbnN0YW5jZVxuICAgKiBAcGFyYW0ge09iamVjdH0gcmVjb3JkIFRoZSBzb3VyY2UgcmVjb3JkIG9mIGEgdGFsZW50LiBVc3VhbGx5IGFuIG9iamVjdCBsaXRlcmFsLlxuICAgKi9cbiAgY29uc3RydWN0b3IocmVjb3JkKSB7XG5cbiAgICBUYWxlbnQuY29weU93blByb3BzKHRoaXMsIHJlY29yZCk7XG4gIH1cblxuICAvKipcbiAgICogQ29waWVzIHRoZSBvd24gcHJvcGVydGllcyBmcm9tIG9uZSBvYmplY3QgdG8gYW4gb3RoZXJcbiAgICogQHBhcmFtIHtPYmplY3R9IHRhcmdldCBUaGUgdGFyZ2V0IG9mIHRoZSBjb3B5XG4gICAqIEBwYXJhbSB7T2JqZWN0fSBzb3VyY2UgVGhlIHNvdXJjZSBvZiB0aGUgY29weVxuICAgKiBAc3RhdGljXG4gICAqIEByZXR1cm5zIHtPYmplY3R9IFRoZSByZXN1bHQgb2YgdGhlIGNvcHlcbiAgICovXG4gIHN0YXRpYyBjb3B5T3duUHJvcHModGFyZ2V0LCBzb3VyY2UpIHtcblxuICAgIGNvbnN0IHRyZ3QgPSB0YXJnZXQ7XG5cbiAgICBmb3IgKGNvbnN0IFtrZXksIHZhbHVlXSBvZiBnZXRJdGVyYWJsZU9iamVjdEVudHJpZXMoc291cmNlKSkge1xuXG4gICAgICBpZiAoKHR5cGVvZiB2YWx1ZSA9PT0gXCJzeW1ib2xcIikgJiYgdmFsdWUudG9TdHJpbmcoKS5pbmNsdWRlcyhcInJlcXVpcmVkIG1lbWJlclwiKSkge1xuXG4gICAgICAgIHRyZ3Rba2V5XSA9IFRhbGVudC5yZXF1aXJlZDtcbiAgICAgIH0gZWxzZSB7XG5cbiAgICAgICAgUmVmbGVjdC5kZWZpbmVQcm9wZXJ0eSh0cmd0LCBrZXksIFJlZmxlY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKHNvdXJjZSwga2V5KSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHRyZ3Q7XG4gIH1cblxuICAvKipcbiAgICogQWRkcyBhIG5ldyBwcm9wZXJ0eSB0byBhIHRhbGVudFxuICAgKiBAcGFyYW0ge1RhbGVudH0gdGFsZW50IFRoZSB0YWxlbnQgdG8gYWRkIG5ldyBtZW1iZXIgdG9cbiAgICogQHBhcmFtIHtPYmplY3R9IGtleVZhbHVlIFRoZSBrZXkgdmFsdWUgcGFpciBvZiB0aGUgbmV3IHByb3BlcnR5IHdyYXBwZWQgdXAgaW4gYW4gb2JqZWN0IGxpdGVyYWxcbiAgICogQHN0YXRpY1xuICAgKiBAcmV0dXJucyB7VGFsZW50fSBUaGUgZXh0ZW5kZWQgdGFsZW50XG4gICAqL1xuICBzdGF0aWMgYWRkUHJvcGVydHkodGFsZW50LCBrZXlWYWx1ZSkge1xuXG4gICAgY29uc3Qga2V5ID0gUmVmbGVjdC5vd25LZXlzKGtleVZhbHVlKVswXTtcbiAgICBjb25zdCB2YWx1ZURlc2MgPSBSZWZsZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihrZXlWYWx1ZSwga2V5KTtcbiAgICBjb25zdCByZWNvcmQgPSBUYWxlbnQuY29weU93blByb3BzKHt9LCB0YWxlbnQpO1xuXG4gICAgUmVmbGVjdC5kZWZpbmVQcm9wZXJ0eShyZWNvcmQsIGtleSwgdmFsdWVEZXNjKTtcblxuICAgIHJldHVybiBuZXcgVGFsZW50KHJlY29yZCk7XG4gIH1cblxuICAvKipcbiAgICogUmVtb3ZlcyBhIHByb3BlcnR5IGZyb20gYSB0YWxlbnRcbiAgICogQHBhcmFtIHtUYWxlbnR9IHRhbGVudCBUaGUgdGFsZW50IHRvIHJlbW92ZSBhIG1lbWJlciBmcm9tXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIG5hbWUgb2YgdGhlIG1lYmVyIHRvIGJlIHJlbW92ZWRcbiAgICogQHN0YXRpY1xuICAgKiBAcmV0dXJucyB7VGFsZW50fSBUaGUgcmlwcGVkIG9mZiB0YWxlbnRcbiAgICovXG4gIHN0YXRpYyByZW1vdmVQcm9wZXJ0eSh0YWxlbnQsIGtleSkge1xuXG4gICAgY29uc3QgcmVjb3JkID0gVGFsZW50LmNvcHlPd25Qcm9wcyh7fSwgdGFsZW50KTtcblxuICAgIFJlZmxlY3QuZGVsZXRlUHJvcGVydHkocmVjb3JkLCBrZXkpO1xuXG4gICAgcmV0dXJuIG5ldyBUYWxlbnQocmVjb3JkKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDaGVja3MgaWYgdGhlIHBhcmFtZXRlciBpcyBhIHRhbGVudFxuICAgKiBAcGFyYW0geyp9IHBhcmFtIFRoZSBwYXJhbWV0ZXIgdG8gY2hlY2tcbiAgICogQHN0YXRpY1xuICAgKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB0aGUgcGFyYW1ldGVyIGlzIGEgdGFsZW50XG4gICAqL1xuICBzdGF0aWMgdHlwZUNoZWNrKHBhcmFtKSB7XG5cbiAgICByZXR1cm4gKHBhcmFtIGluc3RhbmNlb2YgVGFsZW50KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXRyaWV2ZXMgdGhlIHJlcXVpcmVkIG1hcmtlclxuICAgKiBAc3RhdGljXG4gICAqIEByZXR1cm5zIHtTeW1ib2x9IFRoZSByZXF1aXJlZCBtYXJrZXJcbiAgICovXG4gIHN0YXRpYyBnZXQgcmVxdWlyZWQoKSB7XG5cbiAgICByZXR1cm4gc3ltYm9sO1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gVGFsZW50O1xuIl19
