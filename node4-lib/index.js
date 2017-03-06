"use strict";

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var Talent = require("./Talent");

var _require = require("./util"),
    getIterableObjectEntries = _require.getIterableObjectEntries;

var _require2 = require("./sideEffects"),
    parseMemberLog = _require2.parseMemberLog,
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


        memberLog = addSourceInfoToML(_source, memberLog);
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

    memberLog = parseMemberLog(memberLog, this.required);

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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL2xpYi9pbmRleC5qcyJdLCJuYW1lcyI6WyJUYWxlbnQiLCJyZXF1aXJlIiwiZ2V0SXRlcmFibGVPYmplY3RFbnRyaWVzIiwicGFyc2VNZW1iZXJMb2ciLCJhZGRTb3VyY2VJbmZvVG9NTCIsIm1vZHVsZSIsImV4cG9ydHMiLCJyZXF1aXJlZCIsImNyZWF0ZVRhbGVudCIsInJlY29yZCIsImNvbXBvc2VXaXRoVGFsZW50cyIsInRhcmdldCIsInR5cGVDaGVjayIsIlR5cGVFcnJvciIsInNvdXJjZXMiLCJzb3VyY2UiLCJjb21wb3NlVGFsZW50cyIsInJlcXVpcmVkc09uU291cmNlIiwia2V5IiwidmFsdWUiLCJwdXNoIiwiUmVmbGVjdCIsImRlZmluZVByb3BlcnR5IiwiZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yIiwicmVxdWlyZWRPblNvdXJjZSIsIkVycm9yIiwiZ2V0UHJvdG90eXBlT2YiLCJvd25LZXlzIiwiaW5jbHVkZXMiLCJ0YWxlbnRzIiwiY29uc3RydWN0b3IiLCJ0b1N0cmluZyIsIm1lbWJlckxvZyIsIm1lbWJlckxvZ0VudHJ5IiwibGVuZ3RoIiwiYWxpYXMiLCJ0YWxlbnQiLCJvbGROYW1lIiwibmV3TmFtZSIsImFkZGVkIiwiYWRkUHJvcGVydHkiLCJyZW1vdmVQcm9wZXJ0eSIsImV4Y2x1ZGUiLCJuYW1lIl0sIm1hcHBpbmdzIjoiOzs7O0FBQUEsSUFBTUEsU0FBU0MsUUFBUSxVQUFSLENBQWY7O2VBQ21DQSxRQUFRLFFBQVIsQztJQUE1QkMsd0IsWUFBQUEsd0I7O2dCQUNxQ0QsUUFBUSxlQUFSLEM7SUFBckNFLGMsYUFBQUEsYztJQUFnQkMsaUIsYUFBQUEsaUI7O0FBRXZCQyxPQUFPQyxPQUFQLEdBQWlCO0FBQ2YsY0FBWU4sT0FBT08sUUFESjtBQUVmQyxlQUFhQyxNQUFiLEVBQXFCOztBQUVuQixXQUFPLElBQUlULE1BQUosQ0FBV1MsTUFBWCxDQUFQO0FBQ0QsR0FMYztBQU1mQyxxQkFBbUJDLE1BQW5CLEVBQXVDOztBQUVy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Q0FBTjtBQUNEOztBQUVELFFBQUksT0FBTzhCLElBQVAsS0FBZ0IsUUFBcEIsRUFBOEI7O0FBRTVCLFlBQU0sSUFBSTlCLFNBQUosQ0FBYyxvQ0FBZCxDQUFOO0FBQ0Q7O0FBRUQsV0FBT2IsT0FBT3lDLGNBQVAsQ0FBc0JMLE1BQXRCLEVBQThCTyxJQUE5QixDQUFQO0FBQ0Q7QUF0SWMsQ0FBakIiLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBUYWxlbnQgPSByZXF1aXJlKFwiLi9UYWxlbnRcIik7XG5jb25zdCB7Z2V0SXRlcmFibGVPYmplY3RFbnRyaWVzfSA9IHJlcXVpcmUoXCIuL3V0aWxcIik7XG5jb25zdCB7cGFyc2VNZW1iZXJMb2csIGFkZFNvdXJjZUluZm9Ub01MfSA9IHJlcXVpcmUoXCIuL3NpZGVFZmZlY3RzXCIpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgXCJyZXF1aXJlZFwiOiBUYWxlbnQucmVxdWlyZWQsXG4gIGNyZWF0ZVRhbGVudChyZWNvcmQpIHtcblxuICAgIHJldHVybiBuZXcgVGFsZW50KHJlY29yZCk7XG4gIH0sXG4gIGNvbXBvc2VXaXRoVGFsZW50cyh0YXJnZXQsIC4uLnNvdXJjZXMpIHtcblxuICAgIGlmIChcbiAgICAgIFRhbGVudC50eXBlQ2hlY2sodGFyZ2V0KSB8fFxuICAgICAgdHlwZW9mIHRhcmdldCA9PT0gXCJzeW1ib2xcIiB8fFxuICAgICAgdHlwZW9mIHRhcmdldCA9PT0gXCJzdHJpbmdcIiB8fFxuICAgICAgdHlwZW9mIHRhcmdldCA9PT0gXCJudW1iZXJcIiB8fFxuICAgICAgdHlwZW9mIHRhcmdldCA9PT0gXCJib29sZWFuXCIgfHxcbiAgICAgIHR5cGVvZiB0YXJnZXQgPT09IFwiZnVuY3Rpb25cIlxuICAgICkge1xuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlRoZSBmaXJzdCBhcmd1bWVudCBoYXMgdG8gYmUgYW4gaW5zdGFuY2Ugb3IgYW4gb2JqZWN0XCIpO1xuICAgIH1cblxuICAgIGNvbnN0IHNvdXJjZSA9IHRoaXMuY29tcG9zZVRhbGVudHMoLi4uc291cmNlcyk7XG4gICAgY29uc3QgcmVxdWlyZWRzT25Tb3VyY2UgPSBbXTtcblxuICAgIGZvciAoY29uc3QgW2tleSwgdmFsdWVdIG9mIGdldEl0ZXJhYmxlT2JqZWN0RW50cmllcyhzb3VyY2UpKSB7XG5cbiAgICAgIGlmICh2YWx1ZSA9PT0gdGhpcy5yZXF1aXJlZCkge1xuICAgICAgICByZXF1aXJlZHNPblNvdXJjZS5wdXNoKGtleSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBSZWZsZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwga2V5LCBSZWZsZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihzb3VyY2UsIGtleSkpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGZvciAoY29uc3QgcmVxdWlyZWRPblNvdXJjZSBvZiByZXF1aXJlZHNPblNvdXJjZSkge1xuXG4gICAgICBpZiAoIXRhcmdldFtyZXF1aXJlZE9uU291cmNlXSB8fCB0YXJnZXRbcmVxdWlyZWRPblNvdXJjZV0gPT09IHRoaXMucmVxdWlyZWQpIHtcblxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYE1lbWJlciBcIiR7cmVxdWlyZWRPblNvdXJjZX1cIiByZW1haW5lZCB1bmltcGxlbWVudGVkYCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgZm9yIChjb25zdCBba2V5LCB2YWx1ZV0gb2YgZ2V0SXRlcmFibGVPYmplY3RFbnRyaWVzKHRhcmdldCkpIHtcblxuICAgICAgaWYgKHZhbHVlID09PSB0aGlzLnJlcXVpcmVkKSB7XG5cbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBNZW1iZXIgXCIke2tleX1cIiByZW1haW5lZCB1bmltcGxlbWVudGVkYCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgZm9yIChjb25zdCBba2V5LCB2YWx1ZV0gb2YgZ2V0SXRlcmFibGVPYmplY3RFbnRyaWVzKFJlZmxlY3QuZ2V0UHJvdG90eXBlT2YodGFyZ2V0KSkpIHtcblxuICAgICAgaWYgKCFSZWZsZWN0Lm93bktleXModGFyZ2V0KS5pbmNsdWRlcyhrZXkpICYmICh2YWx1ZSA9PT0gdGhpcy5yZXF1aXJlZCkpIHtcblxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYE1lbWJlciBcIiR7a2V5fVwiIHJlbWFpbmVkIHVuaW1wbGVtZW50ZWRgKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gdGFyZ2V0O1xuICB9LFxuICBjb21wb3NlVGFsZW50cyguLi50YWxlbnRzKSB7XG5cbiAgICBmb3IgKGNvbnN0IHNvdXJjZSBvZiB0YWxlbnRzKSB7XG5cbiAgICAgIGlmICghc291cmNlLmNvbnN0cnVjdG9yLnRvU3RyaW5nKCkuaW5jbHVkZXMoXCJjbGFzcyBUYWxlbnQge1wiKSkge1xuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKGBQYXJhbWV0ZXIgJHtzb3VyY2V9IGlzIG5vdCBhIHRhbGVudGApO1xuICAgICAgfVxuICAgIH1cblxuICAgIGxldCBtZW1iZXJMb2cgPSBbXTtcblxuICAgIGZvciAoY29uc3Qgc291cmNlIG9mIHRhbGVudHMpIHtcblxuICAgICAgbWVtYmVyTG9nID0gYWRkU291cmNlSW5mb1RvTUwoc291cmNlLCBtZW1iZXJMb2cpO1xuICAgIH1cblxuICAgIG1lbWJlckxvZyA9IHBhcnNlTWVtYmVyTG9nKG1lbWJlckxvZywgdGhpcy5yZXF1aXJlZCk7XG5cbiAgICBjb25zdCByZWNvcmQgPSB7fTtcblxuICAgIGZvciAoY29uc3QgbWVtYmVyTG9nRW50cnkgb2YgbWVtYmVyTG9nKSB7XG5cbiAgICAgIGNvbnN0IGtleSA9IFJlZmxlY3Qub3duS2V5cyhtZW1iZXJMb2dFbnRyeSlbMF07XG4gICAgICBjb25zdCB2YWx1ZSA9IG1lbWJlckxvZ0VudHJ5W2tleV07XG5cbiAgICAgIHN3aXRjaCAodmFsdWUubGVuZ3RoKSB7XG4gICAgICAgIGNhc2UgMDpcbiAgICAgICAgICBtZW1iZXJMb2dFbnRyeVtrZXldID0gdGhpcy5yZXF1aXJlZDtcbiAgICAgICAgICBSZWZsZWN0LmRlZmluZVByb3BlcnR5KHJlY29yZCwga2V5LCBSZWZsZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihtZW1iZXJMb2dFbnRyeSwga2V5KSk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgMTpcbiAgICAgICAgICBtZW1iZXJMb2dFbnRyeVtrZXldID0gdmFsdWVbMF07XG4gICAgICAgICAgUmVmbGVjdC5kZWZpbmVQcm9wZXJ0eShyZWNvcmQsIGtleSwgUmVmbGVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IobWVtYmVyTG9nRW50cnksIGtleSkpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgVGhlcmUgaXMgYW4gdW5yZXNvbHZlZCBjb25mbGljdCBmb3IgcHJvcGVydHkgXCIke2tleX1cImApO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiB0aGlzLmNyZWF0ZVRhbGVudChyZWNvcmQpO1xuICB9LFxuICBhbGlhcyh0YWxlbnQsIG9sZE5hbWUsIG5ld05hbWUpIHtcblxuICAgIGlmICghVGFsZW50LnR5cGVDaGVjayh0YWxlbnQpKSB7XG5cbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJUaGUgdGFyZ2V0IGhhcyB0byBiZSBhIHRhbGVudFwiKTtcbiAgICB9XG5cbiAgICBpZiAodHlwZW9mIG9sZE5hbWUgIT09IFwic3RyaW5nXCIpIHtcblxuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlRoZSBvbGQgbWV0aG9kIG5hbWUgaGFzIHRvIGJlIGEgc3RyaW5nXCIpO1xuICAgIH1cblxuICAgIGlmICh0eXBlb2YgbmV3TmFtZSAhPT0gXCJzdHJpbmdcIikge1xuXG4gICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiVGhlIG5ldyBtZXRob2QgbmFtZSBoYXMgdG8gYmUgYSBzdHJpbmdcIik7XG4gICAgfVxuXG4gICAgY29uc3QgYWRkZWQgPSBUYWxlbnRcbiAgICAgIC5hZGRQcm9wZXJ0eSh0YWxlbnQsIHtbbmV3TmFtZV06IHRhbGVudFtvbGROYW1lXX0pO1xuXG4gICAgcmV0dXJuIFRhbGVudFxuICAgICAgLnJlbW92ZVByb3BlcnR5KGFkZGVkLCBvbGROYW1lKTtcbiAgfSxcbiAgZXhjbHVkZSh0YWxlbnQsIG5hbWUpIHtcblxuICAgIGlmICghVGFsZW50LnR5cGVDaGVjayh0YWxlbnQpKSB7XG5cbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJUaGUgdGFyZ2V0IGhhcyB0byBiZSBhIHRhbGVudFwiKTtcbiAgICB9XG5cbiAgICBpZiAodHlwZW9mIG5hbWUgIT09IFwic3RyaW5nXCIpIHtcblxuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlRoZSBtZXRob2QgbmFtZSBoYXMgdG8gYmUgYSBzdHJpbmdcIik7XG4gICAgfVxuXG4gICAgcmV0dXJuIFRhbGVudC5yZW1vdmVQcm9wZXJ0eSh0YWxlbnQsIG5hbWUpO1xuICB9XG59O1xuIl19
