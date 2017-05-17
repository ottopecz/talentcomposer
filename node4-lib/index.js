"use strict";

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var Talent = require("./Talent");

var _require = require("./util"),
    getIterableObjectEntries = _require.getIterableObjectEntries;

var _require2 = require("./mlMutators"),
    parseML = _require2.parseML,
    addSourceInfoToML = _require2.addSourceInfoToML;

module.exports = {
  "required": Talent.required,
  createTalent(record) {

    return new Talent(record);
  },
  composeWithTalents(target) {

    if (Talent.typeCheck(target) || typeof target === "symbol" || typeof target === "string" || typeof target === "number" || typeof target === "boolean" || typeof target === "function") {
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

    var _iteratorNormalCompletion2 = true;
    var _didIteratorError2 = false;
    var _iteratorError2 = undefined;

    try {
      for (var _iterator2 = requiredsOnSource[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
        var requiredOnSource = _step2.value;


        if (!target[requiredOnSource] || target[requiredOnSource] === this.required) {

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
      for (var _iterator3 = getIterableObjectEntries(target)[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
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
      for (var _iterator4 = getIterableObjectEntries(Reflect.getPrototypeOf(target))[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
        var _ref5 = _step4.value;

        var _ref6 = _slicedToArray(_ref5, 2);

        var _key3 = _ref6[0];
        var _value2 = _ref6[1];


        if (!Reflect.ownKeys(target).includes(_key3) && _value2 === this.required) {

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

    return target;
  },
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL2xpYi9pbmRleC5qcyJdLCJuYW1lcyI6WyJUYWxlbnQiLCJyZXF1aXJlIiwiZ2V0SXRlcmFibGVPYmplY3RFbnRyaWVzIiwicGFyc2VNTCIsImFkZFNvdXJjZUluZm9Ub01MIiwibW9kdWxlIiwiZXhwb3J0cyIsInJlcXVpcmVkIiwiY3JlYXRlVGFsZW50IiwicmVjb3JkIiwiY29tcG9zZVdpdGhUYWxlbnRzIiwidGFyZ2V0IiwidHlwZUNoZWNrIiwiVHlwZUVycm9yIiwic291cmNlcyIsInNvdXJjZSIsImNvbXBvc2VUYWxlbnRzIiwicmVxdWlyZWRzT25Tb3VyY2UiLCJrZXkiLCJ2YWx1ZSIsInB1c2giLCJSZWZsZWN0IiwiZGVmaW5lUHJvcGVydHkiLCJnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IiLCJyZXF1aXJlZE9uU291cmNlIiwiRXJyb3IiLCJnZXRQcm90b3R5cGVPZiIsIm93bktleXMiLCJpbmNsdWRlcyIsInRhbGVudHMiLCJjb25zdHJ1Y3RvciIsInRvU3RyaW5nIiwibWVtYmVyTG9nIiwibWVtYmVyTG9nRW50cnkiLCJsZW5ndGgiLCJhbGlhcyIsInRhbGVudCIsIm9sZE5hbWUiLCJuZXdOYW1lIiwiYWRkZWQiLCJhZGRQcm9wZXJ0eSIsInJlbW92ZVByb3BlcnR5IiwiZXhjbHVkZSIsIm5hbWUiXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxJQUFNQSxTQUFTQyxRQUFRLFVBQVIsQ0FBZjs7ZUFDbUNBLFFBQVEsUUFBUixDO0lBQTVCQyx3QixZQUFBQSx3Qjs7Z0JBQzhCRCxRQUFRLGNBQVIsQztJQUE5QkUsTyxhQUFBQSxPO0lBQVNDLGlCLGFBQUFBLGlCOztBQUVoQkMsT0FBT0MsT0FBUCxHQUFpQjtBQUNmLGNBQVlOLE9BQU9PLFFBREo7QUFFZkMsZUFBYUMsTUFBYixFQUFxQjs7QUFFbkIsV0FBTyxJQUFJVCxNQUFKLENBQVdTLE1BQVgsQ0FBUDtBQUNELEdBTGM7QUFNZkMscUJBQW1CQyxNQUFuQixFQUF1Qzs7QUFFckMsUUFDRVgsT0FBT1ksU0FBUCxDQUFpQkQsTUFBakIsS0FDQSxPQUFPQSxNQUFQLEtBQWtCLFFBRGxCLElBRUEsT0FBT0EsTUFBUCxLQUFrQixRQUZsQixJQUdBLE9BQU9BLE1BQVAsS0FBa0IsUUFIbEIsSUFJQSxPQUFPQSxNQUFQLEtBQWtCLFNBSmxCLElBS0EsT0FBT0EsTUFBUCxLQUFrQixVQU5wQixFQU9FO0FBQ0EsWUFBTSxJQUFJRSxTQUFKLENBQWMsdURBQWQsQ0FBTjtBQUNEOztBQVhvQyxzQ0FBVEMsT0FBUztBQUFUQSxhQUFTO0FBQUE7O0FBYXJDLFFBQU1DLFNBQVMsS0FBS0MsY0FBTCxhQUF1QkYsT0FBdkIsQ0FBZjtBQUNBLFFBQU1HLG9CQUFvQixFQUExQjs7QUFkcUM7QUFBQTtBQUFBOztBQUFBO0FBZ0JyQywyQkFBMkJmLHlCQUF5QmEsTUFBekIsQ0FBM0IsOEhBQTZEO0FBQUE7O0FBQUE7O0FBQUEsWUFBakRHLEdBQWlEO0FBQUEsWUFBNUNDLEtBQTRDOzs7QUFFM0QsWUFBSUEsVUFBVSxLQUFLWixRQUFuQixFQUE2QjtBQUMzQlUsNEJBQWtCRyxJQUFsQixDQUF1QkYsR0FBdkI7QUFDRCxTQUZELE1BRU87QUFDTEcsa0JBQVFDLGNBQVIsQ0FBdUJYLE1BQXZCLEVBQStCTyxHQUEvQixFQUFvQ0csUUFBUUUsd0JBQVIsQ0FBaUNSLE1BQWpDLEVBQXlDRyxHQUF6QyxDQUFwQztBQUNEO0FBQ0Y7QUF2Qm9DO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7O0FBQUE7QUFBQTtBQUFBOztBQUFBO0FBeUJyQyw0QkFBK0JELGlCQUEvQixtSUFBa0Q7QUFBQSxZQUF2Q08sZ0JBQXVDOzs7QUFFaEQsWUFBSSxDQUFDYixPQUFPYSxnQkFBUCxDQUFELElBQTZCYixPQUFPYSxnQkFBUCxNQUE2QixLQUFLakIsUUFBbkUsRUFBNkU7O0FBRTNFLGdCQUFNLElBQUlrQixLQUFKLENBQVcsWUFBVUQsZ0JBQWlCLDJCQUF0QyxDQUFOO0FBQ0Q7QUFDRjtBQS9Cb0M7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTs7QUFBQTtBQUFBO0FBQUE7O0FBQUE7QUFpQ3JDLDRCQUEyQnRCLHlCQUF5QlMsTUFBekIsQ0FBM0IsbUlBQTZEO0FBQUE7O0FBQUE7O0FBQUEsWUFBakRPLEtBQWlEO0FBQUEsWUFBNUNDLE1BQTRDOzs7QUFFM0QsWUFBSUEsV0FBVSxLQUFLWixRQUFuQixFQUE2Qjs7QUFFM0IsZ0JBQU0sSUFBSWtCLEtBQUosQ0FBVyxZQUFVUCxLQUFJLDJCQUF6QixDQUFOO0FBQ0Q7QUFDRjtBQXZDb0M7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTs7QUFBQTtBQUFBO0FBQUE7O0FBQUE7QUF5Q3JDLDRCQUEyQmhCLHlCQUF5Qm1CLFFBQVFLLGNBQVIsQ0FBdUJmLE1BQXZCLENBQXpCLENBQTNCLG1JQUFxRjtBQUFBOztBQUFBOztBQUFBLFlBQXpFTyxLQUF5RTtBQUFBLFlBQXBFQyxPQUFvRTs7O0FBRW5GLFlBQUksQ0FBQ0UsUUFBUU0sT0FBUixDQUFnQmhCLE1BQWhCLEVBQXdCaUIsUUFBeEIsQ0FBaUNWLEtBQWpDLENBQUQsSUFBMkNDLFlBQVUsS0FBS1osUUFBOUQsRUFBeUU7O0FBRXZFLGdCQUFNLElBQUlrQixLQUFKLENBQVcsWUFBVVAsS0FBSSwyQkFBekIsQ0FBTjtBQUNEO0FBQ0Y7QUEvQ29DO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7O0FBaURyQyxXQUFPUCxNQUFQO0FBQ0QsR0F4RGM7QUF5RGZLLG1CQUEyQjtBQUFBLHVDQUFUYSxPQUFTO0FBQVRBLGFBQVM7QUFBQTs7QUFBQTtBQUFBO0FBQUE7O0FBQUE7O0FBRXpCLDRCQUFxQkEsT0FBckIsbUlBQThCO0FBQUEsWUFBbkJkLE1BQW1COzs7QUFFNUIsWUFBSSxDQUFDQSxPQUFPZSxXQUFQLENBQW1CQyxRQUFuQixHQUE4QkgsUUFBOUIsQ0FBdUMsZ0JBQXZDLENBQUwsRUFBK0Q7QUFDN0QsZ0JBQU0sSUFBSWYsU0FBSixDQUFlLGNBQVlFLE1BQU8sbUJBQWxDLENBQU47QUFDRDtBQUNGO0FBUHdCO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7O0FBU3pCLFFBQUlpQixZQUFZLEVBQWhCOztBQVR5QjtBQUFBO0FBQUE7O0FBQUE7QUFXekIsNEJBQXFCSCxPQUFyQixtSUFBOEI7QUFBQSxZQUFuQmQsT0FBbUI7OztBQUU1QmlCLG9CQUFZNUIsa0JBQWtCNEIsU0FBbEIsRUFBNkJqQixPQUE3QixDQUFaO0FBQ0Q7QUFkd0I7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTs7QUFnQnpCaUIsZ0JBQVk3QixRQUFRNkIsU0FBUixFQUFtQixLQUFLekIsUUFBeEIsQ0FBWjs7QUFFQSxRQUFNRSxTQUFTLEVBQWY7O0FBbEJ5QjtBQUFBO0FBQUE7O0FBQUE7QUFvQnpCLDRCQUE2QnVCLFNBQTdCLG1JQUF3QztBQUFBLFlBQTdCQyxjQUE2Qjs7O0FBRXRDLFlBQU1mLE1BQU1HLFFBQVFNLE9BQVIsQ0FBZ0JNLGNBQWhCLEVBQWdDLENBQWhDLENBQVo7QUFDQSxZQUFNZCxRQUFRYyxlQUFlZixHQUFmLENBQWQ7O0FBRUEsZ0JBQVFDLE1BQU1lLE1BQWQ7QUFDRSxlQUFLLENBQUw7QUFDRUQsMkJBQWVmLEdBQWYsSUFBc0IsS0FBS1gsUUFBM0I7QUFDQWMsb0JBQVFDLGNBQVIsQ0FBdUJiLE1BQXZCLEVBQStCUyxHQUEvQixFQUFvQ0csUUFBUUUsd0JBQVIsQ0FBaUNVLGNBQWpDLEVBQWlEZixHQUFqRCxDQUFwQztBQUNBO0FBQ0YsZUFBSyxDQUFMO0FBQ0VlLDJCQUFlZixHQUFmLElBQXNCQyxNQUFNLENBQU4sQ0FBdEI7QUFDQUUsb0JBQVFDLGNBQVIsQ0FBdUJiLE1BQXZCLEVBQStCUyxHQUEvQixFQUFvQ0csUUFBUUUsd0JBQVIsQ0FBaUNVLGNBQWpDLEVBQWlEZixHQUFqRCxDQUFwQztBQUNBO0FBQ0Y7QUFDRSxrQkFBTSxJQUFJTyxLQUFKLENBQVcsa0RBQWdEUCxHQUFJLElBQS9ELENBQU47QUFWSjtBQVlEO0FBckN3QjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBOztBQXVDekIsV0FBTyxLQUFLVixZQUFMLENBQWtCQyxNQUFsQixDQUFQO0FBQ0QsR0FqR2M7QUFrR2YwQixRQUFNQyxNQUFOLEVBQWNDLE9BQWQsRUFBdUJDLE9BQXZCLEVBQWdDOztBQUU5QixRQUFJLENBQUN0QyxPQUFPWSxTQUFQLENBQWlCd0IsTUFBakIsQ0FBTCxFQUErQjs7QUFFN0IsWUFBTSxJQUFJdkIsU0FBSixDQUFjLCtCQUFkLENBQU47QUFDRDs7QUFFRCxRQUFJLE9BQU93QixPQUFQLEtBQW1CLFFBQXZCLEVBQWlDOztBQUUvQixZQUFNLElBQUl4QixTQUFKLENBQWMsd0NBQWQsQ0FBTjtBQUNEOztBQUVELFFBQUksT0FBT3lCLE9BQVAsS0FBbUIsUUFBdkIsRUFBaUM7O0FBRS9CLFlBQU0sSUFBSXpCLFNBQUosQ0FBYyx3Q0FBZCxDQUFOO0FBQ0Q7O0FBRUQsUUFBTTBCLFFBQVF2QyxPQUNYd0MsV0FEVyxDQUNDSixNQURELEVBQ1MsRUFBQyxDQUFDRSxPQUFELEdBQVdGLE9BQU9DLE9BQVAsQ0FBWixFQURULENBQWQ7O0FBR0EsV0FBT3JDLE9BQ0p5QyxjQURJLENBQ1dGLEtBRFgsRUFDa0JGLE9BRGxCLENBQVA7QUFFRCxHQXhIYztBQXlIZkssVUFBUU4sTUFBUixFQUFnQk8sSUFBaEIsRUFBc0I7O0FBRXBCLFFBQUksQ0FBQzNDLE9BQU9ZLFNBQVAsQ0FBaUJ3QixNQUFqQixDQUFMLEVBQStCOztBQUU3QixZQUFNLElBQUl2QixTQUFKLENBQWMsK0JBQWQsQ0FBTjtBQUNEOztBQUVELFFBQUksT0FBTzhCLElBQVAsS0FBZ0IsUUFBcEIsRUFBOEI7O0FBRTVCLFlBQU0sSUFBSTlCLFNBQUosQ0FBYyxvQ0FBZCxDQUFOO0FBQ0Q7O0FBRUQsV0FBT2IsT0FBT3lDLGNBQVAsQ0FBc0JMLE1BQXRCLEVBQThCTyxJQUE5QixDQUFQO0FBQ0Q7QUF0SWMsQ0FBakIiLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBUYWxlbnQgPSByZXF1aXJlKFwiLi9UYWxlbnRcIik7XG5jb25zdCB7Z2V0SXRlcmFibGVPYmplY3RFbnRyaWVzfSA9IHJlcXVpcmUoXCIuL3V0aWxcIik7XG5jb25zdCB7cGFyc2VNTCwgYWRkU291cmNlSW5mb1RvTUx9ID0gcmVxdWlyZShcIi4vbWxNdXRhdG9yc1wiKTtcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIFwicmVxdWlyZWRcIjogVGFsZW50LnJlcXVpcmVkLFxuICBjcmVhdGVUYWxlbnQocmVjb3JkKSB7XG5cbiAgICByZXR1cm4gbmV3IFRhbGVudChyZWNvcmQpO1xuICB9LFxuICBjb21wb3NlV2l0aFRhbGVudHModGFyZ2V0LCAuLi5zb3VyY2VzKSB7XG5cbiAgICBpZiAoXG4gICAgICBUYWxlbnQudHlwZUNoZWNrKHRhcmdldCkgfHxcbiAgICAgIHR5cGVvZiB0YXJnZXQgPT09IFwic3ltYm9sXCIgfHxcbiAgICAgIHR5cGVvZiB0YXJnZXQgPT09IFwic3RyaW5nXCIgfHxcbiAgICAgIHR5cGVvZiB0YXJnZXQgPT09IFwibnVtYmVyXCIgfHxcbiAgICAgIHR5cGVvZiB0YXJnZXQgPT09IFwiYm9vbGVhblwiIHx8XG4gICAgICB0eXBlb2YgdGFyZ2V0ID09PSBcImZ1bmN0aW9uXCJcbiAgICApIHtcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJUaGUgZmlyc3QgYXJndW1lbnQgaGFzIHRvIGJlIGFuIGluc3RhbmNlIG9yIGFuIG9iamVjdFwiKTtcbiAgICB9XG5cbiAgICBjb25zdCBzb3VyY2UgPSB0aGlzLmNvbXBvc2VUYWxlbnRzKC4uLnNvdXJjZXMpO1xuICAgIGNvbnN0IHJlcXVpcmVkc09uU291cmNlID0gW107XG5cbiAgICBmb3IgKGNvbnN0IFtrZXksIHZhbHVlXSBvZiBnZXRJdGVyYWJsZU9iamVjdEVudHJpZXMoc291cmNlKSkge1xuXG4gICAgICBpZiAodmFsdWUgPT09IHRoaXMucmVxdWlyZWQpIHtcbiAgICAgICAgcmVxdWlyZWRzT25Tb3VyY2UucHVzaChrZXkpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgUmVmbGVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGtleSwgUmVmbGVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3Ioc291cmNlLCBrZXkpKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBmb3IgKGNvbnN0IHJlcXVpcmVkT25Tb3VyY2Ugb2YgcmVxdWlyZWRzT25Tb3VyY2UpIHtcblxuICAgICAgaWYgKCF0YXJnZXRbcmVxdWlyZWRPblNvdXJjZV0gfHwgdGFyZ2V0W3JlcXVpcmVkT25Tb3VyY2VdID09PSB0aGlzLnJlcXVpcmVkKSB7XG5cbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBNZW1iZXIgXCIke3JlcXVpcmVkT25Tb3VyY2V9XCIgcmVtYWluZWQgdW5pbXBsZW1lbnRlZGApO1xuICAgICAgfVxuICAgIH1cblxuICAgIGZvciAoY29uc3QgW2tleSwgdmFsdWVdIG9mIGdldEl0ZXJhYmxlT2JqZWN0RW50cmllcyh0YXJnZXQpKSB7XG5cbiAgICAgIGlmICh2YWx1ZSA9PT0gdGhpcy5yZXF1aXJlZCkge1xuXG4gICAgICAgIHRocm93IG5ldyBFcnJvcihgTWVtYmVyIFwiJHtrZXl9XCIgcmVtYWluZWQgdW5pbXBsZW1lbnRlZGApO1xuICAgICAgfVxuICAgIH1cblxuICAgIGZvciAoY29uc3QgW2tleSwgdmFsdWVdIG9mIGdldEl0ZXJhYmxlT2JqZWN0RW50cmllcyhSZWZsZWN0LmdldFByb3RvdHlwZU9mKHRhcmdldCkpKSB7XG5cbiAgICAgIGlmICghUmVmbGVjdC5vd25LZXlzKHRhcmdldCkuaW5jbHVkZXMoa2V5KSAmJiAodmFsdWUgPT09IHRoaXMucmVxdWlyZWQpKSB7XG5cbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBNZW1iZXIgXCIke2tleX1cIiByZW1haW5lZCB1bmltcGxlbWVudGVkYCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHRhcmdldDtcbiAgfSxcbiAgY29tcG9zZVRhbGVudHMoLi4udGFsZW50cykge1xuXG4gICAgZm9yIChjb25zdCBzb3VyY2Ugb2YgdGFsZW50cykge1xuXG4gICAgICBpZiAoIXNvdXJjZS5jb25zdHJ1Y3Rvci50b1N0cmluZygpLmluY2x1ZGVzKFwiY2xhc3MgVGFsZW50IHtcIikpIHtcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihgUGFyYW1ldGVyICR7c291cmNlfSBpcyBub3QgYSB0YWxlbnRgKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBsZXQgbWVtYmVyTG9nID0gW107XG5cbiAgICBmb3IgKGNvbnN0IHNvdXJjZSBvZiB0YWxlbnRzKSB7XG5cbiAgICAgIG1lbWJlckxvZyA9IGFkZFNvdXJjZUluZm9Ub01MKG1lbWJlckxvZywgc291cmNlKTtcbiAgICB9XG5cbiAgICBtZW1iZXJMb2cgPSBwYXJzZU1MKG1lbWJlckxvZywgdGhpcy5yZXF1aXJlZCk7XG5cbiAgICBjb25zdCByZWNvcmQgPSB7fTtcblxuICAgIGZvciAoY29uc3QgbWVtYmVyTG9nRW50cnkgb2YgbWVtYmVyTG9nKSB7XG5cbiAgICAgIGNvbnN0IGtleSA9IFJlZmxlY3Qub3duS2V5cyhtZW1iZXJMb2dFbnRyeSlbMF07XG4gICAgICBjb25zdCB2YWx1ZSA9IG1lbWJlckxvZ0VudHJ5W2tleV07XG5cbiAgICAgIHN3aXRjaCAodmFsdWUubGVuZ3RoKSB7XG4gICAgICAgIGNhc2UgMDpcbiAgICAgICAgICBtZW1iZXJMb2dFbnRyeVtrZXldID0gdGhpcy5yZXF1aXJlZDtcbiAgICAgICAgICBSZWZsZWN0LmRlZmluZVByb3BlcnR5KHJlY29yZCwga2V5LCBSZWZsZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihtZW1iZXJMb2dFbnRyeSwga2V5KSk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgMTpcbiAgICAgICAgICBtZW1iZXJMb2dFbnRyeVtrZXldID0gdmFsdWVbMF07XG4gICAgICAgICAgUmVmbGVjdC5kZWZpbmVQcm9wZXJ0eShyZWNvcmQsIGtleSwgUmVmbGVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IobWVtYmVyTG9nRW50cnksIGtleSkpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgVGhlcmUgaXMgYW4gdW5yZXNvbHZlZCBjb25mbGljdCBmb3IgcHJvcGVydHkgXCIke2tleX1cImApO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiB0aGlzLmNyZWF0ZVRhbGVudChyZWNvcmQpO1xuICB9LFxuICBhbGlhcyh0YWxlbnQsIG9sZE5hbWUsIG5ld05hbWUpIHtcblxuICAgIGlmICghVGFsZW50LnR5cGVDaGVjayh0YWxlbnQpKSB7XG5cbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJUaGUgdGFyZ2V0IGhhcyB0byBiZSBhIHRhbGVudFwiKTtcbiAgICB9XG5cbiAgICBpZiAodHlwZW9mIG9sZE5hbWUgIT09IFwic3RyaW5nXCIpIHtcblxuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlRoZSBvbGQgbWV0aG9kIG5hbWUgaGFzIHRvIGJlIGEgc3RyaW5nXCIpO1xuICAgIH1cblxuICAgIGlmICh0eXBlb2YgbmV3TmFtZSAhPT0gXCJzdHJpbmdcIikge1xuXG4gICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiVGhlIG5ldyBtZXRob2QgbmFtZSBoYXMgdG8gYmUgYSBzdHJpbmdcIik7XG4gICAgfVxuXG4gICAgY29uc3QgYWRkZWQgPSBUYWxlbnRcbiAgICAgIC5hZGRQcm9wZXJ0eSh0YWxlbnQsIHtbbmV3TmFtZV06IHRhbGVudFtvbGROYW1lXX0pO1xuXG4gICAgcmV0dXJuIFRhbGVudFxuICAgICAgLnJlbW92ZVByb3BlcnR5KGFkZGVkLCBvbGROYW1lKTtcbiAgfSxcbiAgZXhjbHVkZSh0YWxlbnQsIG5hbWUpIHtcblxuICAgIGlmICghVGFsZW50LnR5cGVDaGVjayh0YWxlbnQpKSB7XG5cbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJUaGUgdGFyZ2V0IGhhcyB0byBiZSBhIHRhbGVudFwiKTtcbiAgICB9XG5cbiAgICBpZiAodHlwZW9mIG5hbWUgIT09IFwic3RyaW5nXCIpIHtcblxuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlRoZSBtZXRob2QgbmFtZSBoYXMgdG8gYmUgYSBzdHJpbmdcIik7XG4gICAgfVxuXG4gICAgcmV0dXJuIFRhbGVudC5yZW1vdmVQcm9wZXJ0eSh0YWxlbnQsIG5hbWUpO1xuICB9XG59O1xuIl19
