"use strict";

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i]; return arr2; } else { return Array.from(arr); } }

const Talent = require("./Talent");

var _require = require("./util");

const getIterableObjectEntries = _require.getIterableObjectEntries;

var _require2 = require("./sideEffects");

const parseMemberLog = _require2.parseMemberLog,
      addSourceInfoToML = _require2.addSourceInfoToML;


module.exports = {
  "required": Talent.required,
  createTalent: function createTalent(record) {

    return new Talent(record);
  },
  composeWithTalents: function composeWithTalents(target) {

    if (Talent.typeCheck(target) || typeof target === "symbol" || typeof target === "string" || typeof target === "number" || typeof target === "boolean" || typeof target === "function") {
      throw new TypeError("The first argument has to be an instance or an object");
    }

    for (var _len = arguments.length, sources = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      sources[_key - 1] = arguments[_key];
    }

    const source = this.composeTalents.apply(this, _toConsumableArray(sources));
    const requiredsOnSource = [];

    for (const _ref of getIterableObjectEntries(source)) {
      var _ref2 = _slicedToArray(_ref, 2);

      const key = _ref2[0];
      const value = _ref2[1];


      if (value === this.required) {
        requiredsOnSource.push(key);
      } else {
        Reflect.defineProperty(target, key, Reflect.getOwnPropertyDescriptor(source, key));
      }
    }

    for (const requiredOnSource of requiredsOnSource) {

      if (!target[requiredOnSource] || target[requiredOnSource] === this.required) {

        throw new Error(`Member "${ requiredOnSource }" remained unimplemented`);
      }
    }

    for (const _ref3 of getIterableObjectEntries(target)) {
      var _ref4 = _slicedToArray(_ref3, 2);

      const key = _ref4[0];
      const value = _ref4[1];


      if (value === this.required) {

        throw new Error(`Member "${ key }" remained unimplemented`);
      }
    }

    for (const _ref5 of getIterableObjectEntries(Reflect.getPrototypeOf(target))) {
      var _ref6 = _slicedToArray(_ref5, 2);

      const key = _ref6[0];
      const value = _ref6[1];


      if (!Reflect.ownKeys(target).includes(key) && value === this.required) {

        throw new Error(`Member "${ key }" remained unimplemented`);
      }
    }

    return target;
  },
  composeTalents: function composeTalents() {
    for (var _len2 = arguments.length, talents = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      talents[_key2] = arguments[_key2];
    }

    for (const source of talents) {

      if (!source.constructor.toString().includes("class Talent {")) {
        throw new TypeError(`Parameter ${ source } is not a talent`);
      }
    }

    let memberLog = [];

    for (const source of talents) {

      memberLog = addSourceInfoToML(source, memberLog);
    }

    memberLog = parseMemberLog(memberLog, this.required);

    const record = {};

    for (const memberLogEntry of memberLog) {

      const key = Reflect.ownKeys(memberLogEntry)[0];
      const value = memberLogEntry[key];

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

    return this.createTalent(record);
  },
  alias: function alias(talent, oldName, newName) {

    if (!Talent.typeCheck(talent)) {

      throw new TypeError("The target has to be a talent");
    }

    if (typeof oldName !== "string") {

      throw new TypeError("The old method name has to be a string");
    }

    if (typeof newName !== "string") {

      throw new TypeError("The new method name has to be a string");
    }

    const added = Talent.addProperty(talent, { [newName]: talent[oldName] });

    return Talent.removeProperty(added, oldName);
  },
  exclude: function exclude(talent, name) {

    if (!Talent.typeCheck(talent)) {

      throw new TypeError("The target has to be a talent");
    }

    if (typeof name !== "string") {

      throw new TypeError("The method name has to be a string");
    }

    return Talent.removeProperty(talent, name);
  }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL2xpYi9pbmRleC5qcyJdLCJuYW1lcyI6WyJUYWxlbnQiLCJyZXF1aXJlIiwiZ2V0SXRlcmFibGVPYmplY3RFbnRyaWVzIiwicGFyc2VNZW1iZXJMb2ciLCJhZGRTb3VyY2VJbmZvVG9NTCIsIm1vZHVsZSIsImV4cG9ydHMiLCJyZXF1aXJlZCIsImNyZWF0ZVRhbGVudCIsInJlY29yZCIsImNvbXBvc2VXaXRoVGFsZW50cyIsInRhcmdldCIsInR5cGVDaGVjayIsIlR5cGVFcnJvciIsInNvdXJjZXMiLCJzb3VyY2UiLCJjb21wb3NlVGFsZW50cyIsInJlcXVpcmVkc09uU291cmNlIiwia2V5IiwidmFsdWUiLCJwdXNoIiwiUmVmbGVjdCIsImRlZmluZVByb3BlcnR5IiwiZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yIiwicmVxdWlyZWRPblNvdXJjZSIsIkVycm9yIiwiZ2V0UHJvdG90eXBlT2YiLCJvd25LZXlzIiwiaW5jbHVkZXMiLCJ0YWxlbnRzIiwiY29uc3RydWN0b3IiLCJ0b1N0cmluZyIsIm1lbWJlckxvZyIsIm1lbWJlckxvZ0VudHJ5IiwibGVuZ3RoIiwiYWxpYXMiLCJ0YWxlbnQiLCJvbGROYW1lIiwibmV3TmFtZSIsImFkZGVkIiwiYWRkUHJvcGVydHkiLCJyZW1vdmVQcm9wZXJ0eSIsImV4Y2x1ZGUiLCJuYW1lIl0sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSxNQUFNQSxTQUFTQyxRQUFRLFVBQVIsQ0FBZjs7ZUFDbUNBLFFBQVEsUUFBUixDOztNQUE1QkMsd0IsWUFBQUEsd0I7O2dCQUNxQ0QsUUFBUSxlQUFSLEM7O01BQXJDRSxjLGFBQUFBLGM7TUFBZ0JDLGlCLGFBQUFBLGlCOzs7QUFFdkJDLE9BQU9DLE9BQVAsR0FBaUI7QUFDZixjQUFZTixPQUFPTyxRQURKO0FBRWZDLGNBRmUsd0JBRUZDLE1BRkUsRUFFTTs7QUFFbkIsV0FBTyxJQUFJVCxNQUFKLENBQVdTLE1BQVgsQ0FBUDtBQUNELEdBTGM7QUFNZkMsb0JBTmUsOEJBTUlDLE1B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QU9DLE9BQVAsQ0FBWixFQURULENBQWQ7O0FBR0EsV0FBT3JDLE9BQ0p5QyxjQURJLENBQ1dGLEtBRFgsRUFDa0JGLE9BRGxCLENBQVA7QUFFRCxHQXhIYztBQXlIZkssU0F6SGUsbUJBeUhQTixNQXpITyxFQXlIQ08sSUF6SEQsRUF5SE87O0FBRXBCLFFBQUksQ0FBQzNDLE9BQU9ZLFNBQVAsQ0FBaUJ3QixNQUFqQixDQUFMLEVBQStCOztBQUU3QixZQUFNLElBQUl2QixTQUFKLENBQWMsK0JBQWQsQ0FBTjtBQUNEOztBQUVELFFBQUksT0FBTzhCLElBQVAsS0FBZ0IsUUFBcEIsRUFBOEI7O0FBRTVCLFlBQU0sSUFBSTlCLFNBQUosQ0FBYyxvQ0FBZCxDQUFOO0FBQ0Q7O0FBRUQsV0FBT2IsT0FBT3lDLGNBQVAsQ0FBc0JMLE1BQXRCLEVBQThCTyxJQUE5QixDQUFQO0FBQ0Q7QUF0SWMsQ0FBakIiLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBUYWxlbnQgPSByZXF1aXJlKFwiLi9UYWxlbnRcIik7XG5jb25zdCB7Z2V0SXRlcmFibGVPYmplY3RFbnRyaWVzfSA9IHJlcXVpcmUoXCIuL3V0aWxcIik7XG5jb25zdCB7cGFyc2VNZW1iZXJMb2csIGFkZFNvdXJjZUluZm9Ub01MfSA9IHJlcXVpcmUoXCIuL3NpZGVFZmZlY3RzXCIpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgXCJyZXF1aXJlZFwiOiBUYWxlbnQucmVxdWlyZWQsXG4gIGNyZWF0ZVRhbGVudChyZWNvcmQpIHtcblxuICAgIHJldHVybiBuZXcgVGFsZW50KHJlY29yZCk7XG4gIH0sXG4gIGNvbXBvc2VXaXRoVGFsZW50cyh0YXJnZXQsIC4uLnNvdXJjZXMpIHtcblxuICAgIGlmIChcbiAgICAgIFRhbGVudC50eXBlQ2hlY2sodGFyZ2V0KSB8fFxuICAgICAgdHlwZW9mIHRhcmdldCA9PT0gXCJzeW1ib2xcIiB8fFxuICAgICAgdHlwZW9mIHRhcmdldCA9PT0gXCJzdHJpbmdcIiB8fFxuICAgICAgdHlwZW9mIHRhcmdldCA9PT0gXCJudW1iZXJcIiB8fFxuICAgICAgdHlwZW9mIHRhcmdldCA9PT0gXCJib29sZWFuXCIgfHxcbiAgICAgIHR5cGVvZiB0YXJnZXQgPT09IFwiZnVuY3Rpb25cIlxuICAgICkge1xuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlRoZSBmaXJzdCBhcmd1bWVudCBoYXMgdG8gYmUgYW4gaW5zdGFuY2Ugb3IgYW4gb2JqZWN0XCIpO1xuICAgIH1cblxuICAgIGNvbnN0IHNvdXJjZSA9IHRoaXMuY29tcG9zZVRhbGVudHMoLi4uc291cmNlcyk7XG4gICAgY29uc3QgcmVxdWlyZWRzT25Tb3VyY2UgPSBbXTtcblxuICAgIGZvciAoY29uc3QgW2tleSwgdmFsdWVdIG9mIGdldEl0ZXJhYmxlT2JqZWN0RW50cmllcyhzb3VyY2UpKSB7XG5cbiAgICAgIGlmICh2YWx1ZSA9PT0gdGhpcy5yZXF1aXJlZCkge1xuICAgICAgICByZXF1aXJlZHNPblNvdXJjZS5wdXNoKGtleSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBSZWZsZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwga2V5LCBSZWZsZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihzb3VyY2UsIGtleSkpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGZvciAoY29uc3QgcmVxdWlyZWRPblNvdXJjZSBvZiByZXF1aXJlZHNPblNvdXJjZSkge1xuXG4gICAgICBpZiAoIXRhcmdldFtyZXF1aXJlZE9uU291cmNlXSB8fCB0YXJnZXRbcmVxdWlyZWRPblNvdXJjZV0gPT09IHRoaXMucmVxdWlyZWQpIHtcblxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYE1lbWJlciBcIiR7cmVxdWlyZWRPblNvdXJjZX1cIiByZW1haW5lZCB1bmltcGxlbWVudGVkYCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgZm9yIChjb25zdCBba2V5LCB2YWx1ZV0gb2YgZ2V0SXRlcmFibGVPYmplY3RFbnRyaWVzKHRhcmdldCkpIHtcblxuICAgICAgaWYgKHZhbHVlID09PSB0aGlzLnJlcXVpcmVkKSB7XG5cbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBNZW1iZXIgXCIke2tleX1cIiByZW1haW5lZCB1bmltcGxlbWVudGVkYCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgZm9yIChjb25zdCBba2V5LCB2YWx1ZV0gb2YgZ2V0SXRlcmFibGVPYmplY3RFbnRyaWVzKFJlZmxlY3QuZ2V0UHJvdG90eXBlT2YodGFyZ2V0KSkpIHtcblxuICAgICAgaWYgKCFSZWZsZWN0Lm93bktleXModGFyZ2V0KS5pbmNsdWRlcyhrZXkpICYmICh2YWx1ZSA9PT0gdGhpcy5yZXF1aXJlZCkpIHtcblxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYE1lbWJlciBcIiR7a2V5fVwiIHJlbWFpbmVkIHVuaW1wbGVtZW50ZWRgKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gdGFyZ2V0O1xuICB9LFxuICBjb21wb3NlVGFsZW50cyguLi50YWxlbnRzKSB7XG5cbiAgICBmb3IgKGNvbnN0IHNvdXJjZSBvZiB0YWxlbnRzKSB7XG5cbiAgICAgIGlmICghc291cmNlLmNvbnN0cnVjdG9yLnRvU3RyaW5nKCkuaW5jbHVkZXMoXCJjbGFzcyBUYWxlbnQge1wiKSkge1xuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKGBQYXJhbWV0ZXIgJHtzb3VyY2V9IGlzIG5vdCBhIHRhbGVudGApO1xuICAgICAgfVxuICAgIH1cblxuICAgIGxldCBtZW1iZXJMb2cgPSBbXTtcblxuICAgIGZvciAoY29uc3Qgc291cmNlIG9mIHRhbGVudHMpIHtcblxuICAgICAgbWVtYmVyTG9nID0gYWRkU291cmNlSW5mb1RvTUwoc291cmNlLCBtZW1iZXJMb2cpO1xuICAgIH1cblxuICAgIG1lbWJlckxvZyA9IHBhcnNlTWVtYmVyTG9nKG1lbWJlckxvZywgdGhpcy5yZXF1aXJlZCk7XG5cbiAgICBjb25zdCByZWNvcmQgPSB7fTtcblxuICAgIGZvciAoY29uc3QgbWVtYmVyTG9nRW50cnkgb2YgbWVtYmVyTG9nKSB7XG5cbiAgICAgIGNvbnN0IGtleSA9IFJlZmxlY3Qub3duS2V5cyhtZW1iZXJMb2dFbnRyeSlbMF07XG4gICAgICBjb25zdCB2YWx1ZSA9IG1lbWJlckxvZ0VudHJ5W2tleV07XG5cbiAgICAgIHN3aXRjaCAodmFsdWUubGVuZ3RoKSB7XG4gICAgICAgIGNhc2UgMDpcbiAgICAgICAgICBtZW1iZXJMb2dFbnRyeVtrZXldID0gdGhpcy5yZXF1aXJlZDtcbiAgICAgICAgICBSZWZsZWN0LmRlZmluZVByb3BlcnR5KHJlY29yZCwga2V5LCBSZWZsZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihtZW1iZXJMb2dFbnRyeSwga2V5KSk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgMTpcbiAgICAgICAgICBtZW1iZXJMb2dFbnRyeVtrZXldID0gdmFsdWVbMF07XG4gICAgICAgICAgUmVmbGVjdC5kZWZpbmVQcm9wZXJ0eShyZWNvcmQsIGtleSwgUmVmbGVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IobWVtYmVyTG9nRW50cnksIGtleSkpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgVGhlcmUgaXMgYW4gdW5yZXNvbHZlZCBjb25mbGljdCBmb3IgcHJvcGVydHkgXCIke2tleX1cImApO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiB0aGlzLmNyZWF0ZVRhbGVudChyZWNvcmQpO1xuICB9LFxuICBhbGlhcyh0YWxlbnQsIG9sZE5hbWUsIG5ld05hbWUpIHtcblxuICAgIGlmICghVGFsZW50LnR5cGVDaGVjayh0YWxlbnQpKSB7XG5cbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJUaGUgdGFyZ2V0IGhhcyB0byBiZSBhIHRhbGVudFwiKTtcbiAgICB9XG5cbiAgICBpZiAodHlwZW9mIG9sZE5hbWUgIT09IFwic3RyaW5nXCIpIHtcblxuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlRoZSBvbGQgbWV0aG9kIG5hbWUgaGFzIHRvIGJlIGEgc3RyaW5nXCIpO1xuICAgIH1cblxuICAgIGlmICh0eXBlb2YgbmV3TmFtZSAhPT0gXCJzdHJpbmdcIikge1xuXG4gICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiVGhlIG5ldyBtZXRob2QgbmFtZSBoYXMgdG8gYmUgYSBzdHJpbmdcIik7XG4gICAgfVxuXG4gICAgY29uc3QgYWRkZWQgPSBUYWxlbnRcbiAgICAgIC5hZGRQcm9wZXJ0eSh0YWxlbnQsIHtbbmV3TmFtZV06IHRhbGVudFtvbGROYW1lXX0pO1xuXG4gICAgcmV0dXJuIFRhbGVudFxuICAgICAgLnJlbW92ZVByb3BlcnR5KGFkZGVkLCBvbGROYW1lKTtcbiAgfSxcbiAgZXhjbHVkZSh0YWxlbnQsIG5hbWUpIHtcblxuICAgIGlmICghVGFsZW50LnR5cGVDaGVjayh0YWxlbnQpKSB7XG5cbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJUaGUgdGFyZ2V0IGhhcyB0byBiZSBhIHRhbGVudFwiKTtcbiAgICB9XG5cbiAgICBpZiAodHlwZW9mIG5hbWUgIT09IFwic3RyaW5nXCIpIHtcblxuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlRoZSBtZXRob2QgbmFtZSBoYXMgdG8gYmUgYSBzdHJpbmdcIik7XG4gICAgfVxuXG4gICAgcmV0dXJuIFRhbGVudC5yZW1vdmVQcm9wZXJ0eSh0YWxlbnQsIG5hbWUpO1xuICB9XG59O1xuIl19
