"use strict";

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var Talent = require("./Talent");

var _require = require("./util"),
    getIterableObjectEntries = _require.getIterableObjectEntries;

var _require2 = require("./mlMutators"),
    parseML = _require2.parseML,
    addSourceInfoToML = _require2.addSourceInfoToML;

module.exports = {

  /**
   * The "required marker"
   * @type {Symbol}
   */
  "required": Talent.required,

  /**
   * Creates a new talent
   * @param {Object} record The source record of a talent. Usually an object literal.
   * @returns {Talent} The created talent
   */
  createTalent(record) {

    return new Talent(record);
  },

  /**
   * Composes an instance of a class or an object literal with talents
   * @param {Object} target The target of the asymmetric composition
   * @param {...Talent} sources The list of the talents
   * @returns {*} The target with the composed talents
   */
  composeWithTalents(target) {

    var trgt = target;

    if (Talent.typeCheck(trgt) || typeof trgt === "symbol" || typeof trgt === "string" || typeof trgt === "number" || typeof trgt === "boolean" || typeof trgt === "function") {
      throw new TypeError("The first argument has to be an instance or an object");
    }

    for (var _len = arguments.length, sources = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      sources[_key - 1] = arguments[_key];
    }

    var source = this.composeTalents.apply(this, sources);
    var requiredsOnSource = [];

    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = getIterableObjectEntries(source)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var _ref = _step.value;

        var _ref2 = _slicedToArray(_ref, 2);

        var key = _ref2[0];
        var value = _ref2[1];


        if (value === this.required) {
          requiredsOnSource.push(key);
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

    var _iteratorNormalCompletion2 = true;
    var _didIteratorError2 = false;
    var _iteratorError2 = undefined;

    try {
      for (var _iterator2 = requiredsOnSource[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
        var requiredOnSource = _step2.value;


        if (!trgt[requiredOnSource] || trgt[requiredOnSource] === this.required) {

          throw new Error(`Member "${ requiredOnSource }" remained unimplemented`);
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

    var _iteratorNormalCompletion3 = true;
    var _didIteratorError3 = false;
    var _iteratorError3 = undefined;

    try {
      for (var _iterator3 = getIterableObjectEntries(trgt)[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
        var _ref3 = _step3.value;

        var _ref4 = _slicedToArray(_ref3, 2);

        var _key2 = _ref4[0];
        var _value = _ref4[1];


        if (_value === this.required) {

          throw new Error(`Member "${ _key2 }" remained unimplemented`);
        }
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

    var _iteratorNormalCompletion4 = true;
    var _didIteratorError4 = false;
    var _iteratorError4 = undefined;

    try {
      for (var _iterator4 = getIterableObjectEntries(Reflect.getPrototypeOf(trgt))[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
        var _ref5 = _step4.value;

        var _ref6 = _slicedToArray(_ref5, 2);

        var _key3 = _ref6[0];
        var _value2 = _ref6[1];


        if (!Reflect.ownKeys(trgt).includes(_key3) && _value2 === this.required) {

          throw new Error(`Member "${ _key3 }" remained unimplemented`);
        }
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

    return trgt;
  },

  /**
   * Composes a series of talents into one.
   * @param {...Talent} talents The talents to compose
   * @returns {Talent} The composed talent
   */
  composeTalents() {
    for (var _len2 = arguments.length, talents = Array(_len2), _key4 = 0; _key4 < _len2; _key4++) {
      talents[_key4] = arguments[_key4];
    }

    var _iteratorNormalCompletion5 = true;
    var _didIteratorError5 = false;
    var _iteratorError5 = undefined;

    try {

      for (var _iterator5 = talents[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
        var source = _step5.value;


        if (!source.constructor.toString().includes("class Talent {")) {
          throw new TypeError(`Parameter ${ source } is not a talent`);
        }
      }
    } catch (err) {
      _didIteratorError5 = true;
      _iteratorError5 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion5 && _iterator5.return) {
          _iterator5.return();
        }
      } finally {
        if (_didIteratorError5) {
          throw _iteratorError5;
        }
      }
    }

    var memberLog = [];

    var _iteratorNormalCompletion6 = true;
    var _didIteratorError6 = false;
    var _iteratorError6 = undefined;

    try {
      for (var _iterator6 = talents[Symbol.iterator](), _step6; !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
        var _source = _step6.value;


        memberLog = addSourceInfoToML(memberLog, _source);
      }
    } catch (err) {
      _didIteratorError6 = true;
      _iteratorError6 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion6 && _iterator6.return) {
          _iterator6.return();
        }
      } finally {
        if (_didIteratorError6) {
          throw _iteratorError6;
        }
      }
    }

    memberLog = parseML(memberLog, this.required);

    var record = {};

    var _iteratorNormalCompletion7 = true;
    var _didIteratorError7 = false;
    var _iteratorError7 = undefined;

    try {
      for (var _iterator7 = memberLog[Symbol.iterator](), _step7; !(_iteratorNormalCompletion7 = (_step7 = _iterator7.next()).done); _iteratorNormalCompletion7 = true) {
        var memberLogEntry = _step7.value;


        var key = Reflect.ownKeys(memberLogEntry)[0];
        var value = memberLogEntry[key];

        switch (value.length) {
          case 0:
            memberLogEntry[key] = this.required;
            Reflect.defineProperty(record, key, Reflect.getOwnPropertyDescriptor(memberLogEntry, key));
            break;
          case 1:
            memberLogEntry[key] = value[0];
            Reflect.defineProperty(record, key, Reflect.getOwnPropertyDescriptor(memberLogEntry, key));
            break;
          default:
            throw new Error(`There is an unresolved conflict for property "${ key }"`);
        }
      }
    } catch (err) {
      _didIteratorError7 = true;
      _iteratorError7 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion7 && _iterator7.return) {
          _iterator7.return();
        }
      } finally {
        if (_didIteratorError7) {
          throw _iteratorError7;
        }
      }
    }

    return this.createTalent(record);
  },

  /**
   * Aliases (renames in this case) a member of a talent
   * @param {Talent} talent The talent which member has to be aliased
   * @param {string} oldName The name of the member to be aliased
   * @param {string} newName The alias
   * @returns {Talent} The talent with the aliased member
   */
  alias(talent, oldName, newName) {

    if (!Talent.typeCheck(talent)) {

      throw new TypeError("The target has to be a talent");
    }

    if (typeof oldName !== "string") {

      throw new TypeError("The old method name has to be a string");
    }

    if (typeof newName !== "string") {

      throw new TypeError("The new method name has to be a string");
    }

    var added = Talent.addProperty(talent, { [newName]: talent[oldName] });

    return Talent.removeProperty(added, oldName);
  },

  /**
   * Excludes a member from a talent
   * @param {Talent} talent The talent which member has to be excluded
   * @param {string} name The name of the member to be excluded
   * @returns {Talent} The talent with the excluded member
   */
  exclude(talent, name) {

    if (!Talent.typeCheck(talent)) {

      throw new TypeError("The target has to be a talent");
    }

    if (typeof name !== "string") {

      throw new TypeError("The method name has to be a string");
    }

    return Talent.removeProperty(talent, name);
  }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL2xpYi9pbmRleC5qcyJdLCJuYW1lcyI6WyJUYWxlbnQiLCJyZXF1aXJlIiwiZ2V0SXRlcmFibGVPYmplY3RFbnRyaWVzIiwicGFyc2VNTCIsImFkZFNvdXJjZUluZm9Ub01MIiwibW9kdWxlIiwiZXhwb3J0cyIsInJlcXVpcmVkIiwiY3JlYXRlVGFsZW50IiwicmVjb3JkIiwiY29tcG9zZVdpdGhUYWxlbnRzIiwidGFyZ2V0IiwidHJndCIsInR5cGVDaGVjayIsIlR5cGVFcnJvciIsInNvdXJjZXMiLCJzb3VyY2UiLCJjb21wb3NlVGFsZW50cyIsInJlcXVpcmVkc09uU291cmNlIiwia2V5IiwidmFsdWUiLCJwdXNoIiwiUmVmbGVjdCIsImRlZmluZVByb3BlcnR5IiwiZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yIiwicmVxdWlyZWRPblNvdXJjZSIsIkVycm9yIiwiZ2V0UHJvdG90eXBlT2YiLCJvd25LZXlzIiwiaW5jbHVkZXMiLCJ0YWxlbnRzIiwiY29uc3RydWN0b3IiLCJ0b1N0cmluZyIsIm1lbWJlckxvZyIsIm1lbWJlckxvZ0VudHJ5IiwibGVuZ3RoIiwiYWxpYXMiLCJ0YWxlbnQiLCJvbGROYW1lIiwibmV3TmFtZSIsImFkZGVkIiwiYWRkUHJvcGVydHkiLCJyZW1vdmVQcm9wZXJ0eSIsImV4Y2x1ZGUiLCJuYW1lIl0sIm1hcHBpbmdzIjoiOzs7O0FBQUEsSUFBTUEsU0FBU0MsUUFBUSxVQUFSLENBQWY7O2VBQ21DQSxRQUFRLFFBQVIsQztJQUE1QkMsd0IsWUFBQUEsd0I7O2dCQUM4QkQsUUFBUSxjQUFSLEM7SUFBOUJFLE8sYUFBQUEsTztJQUFTQyxpQixhQUFBQSxpQjs7QUFFaEJDLE9BQU9DLE9BQVAsR0FBaUI7O0FBRWY7Ozs7QUFJQSxjQUFZTixPQUFPTyxRQU5KOztBQVFmOzs7OztBQUtBQyxlQUFhQyxNQUFiLEVBQXFCOztBQUVuQixXQUFPLElBQUlULE1BQUosQ0FBV1MsTUFBWCxDQUFQO0FBQ0QsR0FoQmM7O0FBa0JmOzs7Ozs7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OztBQUVwQixRQUFJLENBQUM1QyxPQUFPYSxTQUFQLENBQWlCd0IsTUFBakIsQ0FBTCxFQUErQjs7QUFFN0IsWUFBTSxJQUFJdkIsU0FBSixDQUFjLCtCQUFkLENBQU47QUFDRDs7QUFFRCxRQUFJLE9BQU84QixJQUFQLEtBQWdCLFFBQXBCLEVBQThCOztBQUU1QixZQUFNLElBQUk5QixTQUFKLENBQWMsb0NBQWQsQ0FBTjtBQUNEOztBQUVELFdBQU9kLE9BQU8wQyxjQUFQLENBQXNCTCxNQUF0QixFQUE4Qk8sSUFBOUIsQ0FBUDtBQUNEO0FBL0tjLENBQWpCIiwiZmlsZSI6ImluZGV4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgVGFsZW50ID0gcmVxdWlyZShcIi4vVGFsZW50XCIpO1xuY29uc3Qge2dldEl0ZXJhYmxlT2JqZWN0RW50cmllc30gPSByZXF1aXJlKFwiLi91dGlsXCIpO1xuY29uc3Qge3BhcnNlTUwsIGFkZFNvdXJjZUluZm9Ub01MfSA9IHJlcXVpcmUoXCIuL21sTXV0YXRvcnNcIik7XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuXG4gIC8qKlxuICAgKiBUaGUgXCJyZXF1aXJlZCBtYXJrZXJcIlxuICAgKiBAdHlwZSB7U3ltYm9sfVxuICAgKi9cbiAgXCJyZXF1aXJlZFwiOiBUYWxlbnQucmVxdWlyZWQsXG5cbiAgLyoqXG4gICAqIENyZWF0ZXMgYSBuZXcgdGFsZW50XG4gICAqIEBwYXJhbSB7T2JqZWN0fSByZWNvcmQgVGhlIHNvdXJjZSByZWNvcmQgb2YgYSB0YWxlbnQuIFVzdWFsbHkgYW4gb2JqZWN0IGxpdGVyYWwuXG4gICAqIEByZXR1cm5zIHtUYWxlbnR9IFRoZSBjcmVhdGVkIHRhbGVudFxuICAgKi9cbiAgY3JlYXRlVGFsZW50KHJlY29yZCkge1xuXG4gICAgcmV0dXJuIG5ldyBUYWxlbnQocmVjb3JkKTtcbiAgfSxcblxuICAvKipcbiAgICogQ29tcG9zZXMgYW4gaW5zdGFuY2Ugb2YgYSBjbGFzcyBvciBhbiBvYmplY3QgbGl0ZXJhbCB3aXRoIHRhbGVudHNcbiAgICogQHBhcmFtIHtPYmplY3R9IHRhcmdldCBUaGUgdGFyZ2V0IG9mIHRoZSBhc3ltbWV0cmljIGNvbXBvc2l0aW9uXG4gICAqIEBwYXJhbSB7Li4uVGFsZW50fSBzb3VyY2VzIFRoZSBsaXN0IG9mIHRoZSB0YWxlbnRzXG4gICAqIEByZXR1cm5zIHsqfSBUaGUgdGFyZ2V0IHdpdGggdGhlIGNvbXBvc2VkIHRhbGVudHNcbiAgICovXG4gIGNvbXBvc2VXaXRoVGFsZW50cyh0YXJnZXQsIC4uLnNvdXJjZXMpIHtcblxuICAgIGNvbnN0IHRyZ3QgPSB0YXJnZXQ7XG5cbiAgICBpZiAoXG4gICAgICBUYWxlbnQudHlwZUNoZWNrKHRyZ3QpIHx8XG4gICAgICB0eXBlb2YgdHJndCA9PT0gXCJzeW1ib2xcIiB8fFxuICAgICAgdHlwZW9mIHRyZ3QgPT09IFwic3RyaW5nXCIgfHxcbiAgICAgIHR5cGVvZiB0cmd0ID09PSBcIm51bWJlclwiIHx8XG4gICAgICB0eXBlb2YgdHJndCA9PT0gXCJib29sZWFuXCIgfHxcbiAgICAgIHR5cGVvZiB0cmd0ID09PSBcImZ1bmN0aW9uXCJcbiAgICApIHtcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJUaGUgZmlyc3QgYXJndW1lbnQgaGFzIHRvIGJlIGFuIGluc3RhbmNlIG9yIGFuIG9iamVjdFwiKTtcbiAgICB9XG5cbiAgICBjb25zdCBzb3VyY2UgPSB0aGlzLmNvbXBvc2VUYWxlbnRzKC4uLnNvdXJjZXMpO1xuICAgIGNvbnN0IHJlcXVpcmVkc09uU291cmNlID0gW107XG5cbiAgICBmb3IgKGNvbnN0IFtrZXksIHZhbHVlXSBvZiBnZXRJdGVyYWJsZU9iamVjdEVudHJpZXMoc291cmNlKSkge1xuXG4gICAgICBpZiAodmFsdWUgPT09IHRoaXMucmVxdWlyZWQpIHtcbiAgICAgICAgcmVxdWlyZWRzT25Tb3VyY2UucHVzaChrZXkpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgUmVmbGVjdC5kZWZpbmVQcm9wZXJ0eSh0cmd0LCBrZXksIFJlZmxlY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKHNvdXJjZSwga2V5KSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgZm9yIChjb25zdCByZXF1aXJlZE9uU291cmNlIG9mIHJlcXVpcmVkc09uU291cmNlKSB7XG5cbiAgICAgIGlmICghdHJndFtyZXF1aXJlZE9uU291cmNlXSB8fCB0cmd0W3JlcXVpcmVkT25Tb3VyY2VdID09PSB0aGlzLnJlcXVpcmVkKSB7XG5cbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBNZW1iZXIgXCIke3JlcXVpcmVkT25Tb3VyY2V9XCIgcmVtYWluZWQgdW5pbXBsZW1lbnRlZGApO1xuICAgICAgfVxuICAgIH1cblxuICAgIGZvciAoY29uc3QgW2tleSwgdmFsdWVdIG9mIGdldEl0ZXJhYmxlT2JqZWN0RW50cmllcyh0cmd0KSkge1xuXG4gICAgICBpZiAodmFsdWUgPT09IHRoaXMucmVxdWlyZWQpIHtcblxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYE1lbWJlciBcIiR7a2V5fVwiIHJlbWFpbmVkIHVuaW1wbGVtZW50ZWRgKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBmb3IgKGNvbnN0IFtrZXksIHZhbHVlXSBvZiBnZXRJdGVyYWJsZU9iamVjdEVudHJpZXMoUmVmbGVjdC5nZXRQcm90b3R5cGVPZih0cmd0KSkpIHtcblxuICAgICAgaWYgKCFSZWZsZWN0Lm93bktleXModHJndCkuaW5jbHVkZXMoa2V5KSAmJiAodmFsdWUgPT09IHRoaXMucmVxdWlyZWQpKSB7XG5cbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBNZW1iZXIgXCIke2tleX1cIiByZW1haW5lZCB1bmltcGxlbWVudGVkYCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHRyZ3Q7XG4gIH0sXG5cbiAgLyoqXG4gICAqIENvbXBvc2VzIGEgc2VyaWVzIG9mIHRhbGVudHMgaW50byBvbmUuXG4gICAqIEBwYXJhbSB7Li4uVGFsZW50fSB0YWxlbnRzIFRoZSB0YWxlbnRzIHRvIGNvbXBvc2VcbiAgICogQHJldHVybnMge1RhbGVudH0gVGhlIGNvbXBvc2VkIHRhbGVudFxuICAgKi9cbiAgY29tcG9zZVRhbGVudHMoLi4udGFsZW50cykge1xuXG4gICAgZm9yIChjb25zdCBzb3VyY2Ugb2YgdGFsZW50cykge1xuXG4gICAgICBpZiAoIXNvdXJjZS5jb25zdHJ1Y3Rvci50b1N0cmluZygpLmluY2x1ZGVzKFwiY2xhc3MgVGFsZW50IHtcIikpIHtcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihgUGFyYW1ldGVyICR7c291cmNlfSBpcyBub3QgYSB0YWxlbnRgKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBsZXQgbWVtYmVyTG9nID0gW107XG5cbiAgICBmb3IgKGNvbnN0IHNvdXJjZSBvZiB0YWxlbnRzKSB7XG5cbiAgICAgIG1lbWJlckxvZyA9IGFkZFNvdXJjZUluZm9Ub01MKG1lbWJlckxvZywgc291cmNlKTtcbiAgICB9XG5cbiAgICBtZW1iZXJMb2cgPSBwYXJzZU1MKG1lbWJlckxvZywgdGhpcy5yZXF1aXJlZCk7XG5cbiAgICBjb25zdCByZWNvcmQgPSB7fTtcblxuICAgIGZvciAoY29uc3QgbWVtYmVyTG9nRW50cnkgb2YgbWVtYmVyTG9nKSB7XG5cbiAgICAgIGNvbnN0IGtleSA9IFJlZmxlY3Qub3duS2V5cyhtZW1iZXJMb2dFbnRyeSlbMF07XG4gICAgICBjb25zdCB2YWx1ZSA9IG1lbWJlckxvZ0VudHJ5W2tleV07XG5cbiAgICAgIHN3aXRjaCAodmFsdWUubGVuZ3RoKSB7XG4gICAgICAgIGNhc2UgMDpcbiAgICAgICAgICBtZW1iZXJMb2dFbnRyeVtrZXldID0gdGhpcy5yZXF1aXJlZDtcbiAgICAgICAgICBSZWZsZWN0LmRlZmluZVByb3BlcnR5KHJlY29yZCwga2V5LCBSZWZsZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihtZW1iZXJMb2dFbnRyeSwga2V5KSk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgMTpcbiAgICAgICAgICBtZW1iZXJMb2dFbnRyeVtrZXldID0gdmFsdWVbMF07XG4gICAgICAgICAgUmVmbGVjdC5kZWZpbmVQcm9wZXJ0eShyZWNvcmQsIGtleSwgUmVmbGVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IobWVtYmVyTG9nRW50cnksIGtleSkpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgVGhlcmUgaXMgYW4gdW5yZXNvbHZlZCBjb25mbGljdCBmb3IgcHJvcGVydHkgXCIke2tleX1cImApO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiB0aGlzLmNyZWF0ZVRhbGVudChyZWNvcmQpO1xuICB9LFxuXG4gIC8qKlxuICAgKiBBbGlhc2VzIChyZW5hbWVzIGluIHRoaXMgY2FzZSkgYSBtZW1iZXIgb2YgYSB0YWxlbnRcbiAgICogQHBhcmFtIHtUYWxlbnR9IHRhbGVudCBUaGUgdGFsZW50IHdoaWNoIG1lbWJlciBoYXMgdG8gYmUgYWxpYXNlZFxuICAgKiBAcGFyYW0ge3N0cmluZ30gb2xkTmFtZSBUaGUgbmFtZSBvZiB0aGUgbWVtYmVyIHRvIGJlIGFsaWFzZWRcbiAgICogQHBhcmFtIHtzdHJpbmd9IG5ld05hbWUgVGhlIGFsaWFzXG4gICAqIEByZXR1cm5zIHtUYWxlbnR9IFRoZSB0YWxlbnQgd2l0aCB0aGUgYWxpYXNlZCBtZW1iZXJcbiAgICovXG4gIGFsaWFzKHRhbGVudCwgb2xkTmFtZSwgbmV3TmFtZSkge1xuXG4gICAgaWYgKCFUYWxlbnQudHlwZUNoZWNrKHRhbGVudCkpIHtcblxuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlRoZSB0YXJnZXQgaGFzIHRvIGJlIGEgdGFsZW50XCIpO1xuICAgIH1cblxuICAgIGlmICh0eXBlb2Ygb2xkTmFtZSAhPT0gXCJzdHJpbmdcIikge1xuXG4gICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiVGhlIG9sZCBtZXRob2QgbmFtZSBoYXMgdG8gYmUgYSBzdHJpbmdcIik7XG4gICAgfVxuXG4gICAgaWYgKHR5cGVvZiBuZXdOYW1lICE9PSBcInN0cmluZ1wiKSB7XG5cbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJUaGUgbmV3IG1ldGhvZCBuYW1lIGhhcyB0byBiZSBhIHN0cmluZ1wiKTtcbiAgICB9XG5cbiAgICBjb25zdCBhZGRlZCA9IFRhbGVudFxuICAgICAgLmFkZFByb3BlcnR5KHRhbGVudCwge1tuZXdOYW1lXTogdGFsZW50W29sZE5hbWVdfSk7XG5cbiAgICByZXR1cm4gVGFsZW50XG4gICAgICAucmVtb3ZlUHJvcGVydHkoYWRkZWQsIG9sZE5hbWUpO1xuICB9LFxuXG4gIC8qKlxuICAgKiBFeGNsdWRlcyBhIG1lbWJlciBmcm9tIGEgdGFsZW50XG4gICAqIEBwYXJhbSB7VGFsZW50fSB0YWxlbnQgVGhlIHRhbGVudCB3aGljaCBtZW1iZXIgaGFzIHRvIGJlIGV4Y2x1ZGVkXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lIFRoZSBuYW1lIG9mIHRoZSBtZW1iZXIgdG8gYmUgZXhjbHVkZWRcbiAgICogQHJldHVybnMge1RhbGVudH0gVGhlIHRhbGVudCB3aXRoIHRoZSBleGNsdWRlZCBtZW1iZXJcbiAgICovXG4gIGV4Y2x1ZGUodGFsZW50LCBuYW1lKSB7XG5cbiAgICBpZiAoIVRhbGVudC50eXBlQ2hlY2sodGFsZW50KSkge1xuXG4gICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiVGhlIHRhcmdldCBoYXMgdG8gYmUgYSB0YWxlbnRcIik7XG4gICAgfVxuXG4gICAgaWYgKHR5cGVvZiBuYW1lICE9PSBcInN0cmluZ1wiKSB7XG5cbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJUaGUgbWV0aG9kIG5hbWUgaGFzIHRvIGJlIGEgc3RyaW5nXCIpO1xuICAgIH1cblxuICAgIHJldHVybiBUYWxlbnQucmVtb3ZlUHJvcGVydHkodGFsZW50LCBuYW1lKTtcbiAgfVxufTtcbiJdfQ==
