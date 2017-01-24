"use strict";

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i]; return arr2; } else { return Array.from(arr); } }

const Talent = require("./Talent");

var _require = require("./util");

const getIterableObjectEntries = _require.getIterableObjectEntries,
      findWhereKey = _require.findWhereKey;


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

      memberLog = this.addSourceInfoToML_(source, memberLog);
    }

    memberLog = this.parseMemberLog_(memberLog);

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
  },
  parseMemberLog_: function parseMemberLog_(memberLog) {

    for (const memberLogEntry of memberLog) {

      const key = Reflect.ownKeys(memberLogEntry)[0];
      const value = memberLogEntry[key];

      memberLogEntry[key] = value.filter(elem => elem !== this.required);
    }

    return memberLog;
  },
  addSourceInfoToML_: function addSourceInfoToML_(source, memberLog) {

    let mL = memberLog;

    for (const _ref5 of getIterableObjectEntries(source)) {
      var _ref6 = _slicedToArray(_ref5, 2);

      const key = _ref6[0];
      const value = _ref6[1];


      if (Talent.typeCheck(value)) {

        mL = this.addSourceInfoToML_(value, mL);
      }

      const memberLogEntry = findWhereKey(mL, key);

      if (!memberLogEntry && !Talent.typeCheck(value)) {

        mL.push({ [key]: [value] });
      } else if (!Talent.typeCheck(value)) {

        memberLogEntry[key].push(value);
      }
    }

    return mL;
  }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL2xpYi9pbmRleC5qcyJdLCJuYW1lcyI6WyJUYWxlbnQiLCJyZXF1aXJlIiwiZ2V0SXRlcmFibGVPYmplY3RFbnRyaWVzIiwiZmluZFdoZXJlS2V5IiwibW9kdWxlIiwiZXhwb3J0cyIsInJlcXVpcmVkIiwiY3JlYXRlVGFsZW50IiwicmVjb3JkIiwiY29tcG9zZVdpdGhUYWxlbnRzIiwidGFyZ2V0IiwidHlwZUNoZWNrIiwiVHlwZUVycm9yIiwic291cmNlcyIsInNvdXJjZSIsImNvbXBvc2VUYWxlbnRzIiwicmVxdWlyZWRzT25Tb3VyY2UiLCJrZXkiLCJ2YWx1ZSIsInB1c2giLCJSZWZsZWN0IiwiZGVmaW5lUHJvcGVydHkiLCJnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IiLCJyZXF1aXJlZE9uU291cmNlIiwiRXJyb3IiLCJ0YWxlbnRzIiwiY29uc3RydWN0b3IiLCJ0b1N0cmluZyIsImluY2x1ZGVzIiwibWVtYmVyTG9nIiwiYWRkU291cmNlSW5mb1RvTUxfIiwicGFyc2VNZW1iZXJMb2dfIiwibWVtYmVyTG9nRW50cnkiLCJvd25LZXlzIiwibGVuZ3RoIiwiYWxpYXMiLCJ0YWxlbnQiLCJvbGROYW1lIiwibmV3TmFtZSIsImFkZGVkIiwiYWRkUHJvcGVydHkiLCJyZW1vdmVQcm9wZXJ0eSIsImV4Y2x1ZGUiLCJuYW1lIiwiZmlsdGVyIiwiZWxlbSIsIm1MIl0sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSxNQUFNQSxTQUFTQyxRQUFRLFVBQVIsQ0FBZjs7ZUFDaURBLFFBQVEsUUFBUixDOztNQUExQ0Msd0IsWUFBQUEsd0I7TUFBMEJDLFksWUFBQUEsWTs7O0FBRWpDQyxPQUFPQyxPQUFQLEdBQWlCO0FBQ2YsY0FBWUwsT0FBT00sUUFESjtBQUVmQyxjQUZlLHdCQUVGQyxNQUZFLEVBRU07O0FBRW5CLFdBQU8sSUFBSVIsTUFBSixDQUFXUSxNQUFYLENBQVA7QUFDRCxHQUxjO0FBTWZDLG9CQU5lLDhCQU1JQyxNQU5KLEVBTXdCOztBQUVyQyxRQUNF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Q2MsdUJBQWVmLEdBQWYsRUFBb0JFLElBQXBCLENBQXlCRCxLQUF6QjtBQUNEO0FBQ0Y7O0FBRUQsV0FBTzRCLEVBQVA7QUFDRDtBQWxLYyxDQUFqQiIsImZpbGUiOiJpbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbImNvbnN0IFRhbGVudCA9IHJlcXVpcmUoXCIuL1RhbGVudFwiKTtcbmNvbnN0IHtnZXRJdGVyYWJsZU9iamVjdEVudHJpZXMsIGZpbmRXaGVyZUtleX0gPSByZXF1aXJlKFwiLi91dGlsXCIpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgXCJyZXF1aXJlZFwiOiBUYWxlbnQucmVxdWlyZWQsXG4gIGNyZWF0ZVRhbGVudChyZWNvcmQpIHtcblxuICAgIHJldHVybiBuZXcgVGFsZW50KHJlY29yZCk7XG4gIH0sXG4gIGNvbXBvc2VXaXRoVGFsZW50cyh0YXJnZXQsIC4uLnNvdXJjZXMpIHtcblxuICAgIGlmIChcbiAgICAgIFRhbGVudC50eXBlQ2hlY2sodGFyZ2V0KSB8fFxuICAgICAgdHlwZW9mIHRhcmdldCA9PT0gXCJzeW1ib2xcIiB8fFxuICAgICAgdHlwZW9mIHRhcmdldCA9PT0gXCJzdHJpbmdcIiB8fFxuICAgICAgdHlwZW9mIHRhcmdldCA9PT0gXCJudW1iZXJcIiB8fFxuICAgICAgdHlwZW9mIHRhcmdldCA9PT0gXCJib29sZWFuXCIgfHxcbiAgICAgIHR5cGVvZiB0YXJnZXQgPT09IFwiZnVuY3Rpb25cIlxuICAgICkge1xuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlRoZSBmaXJzdCBhcmd1bWVudCBoYXMgdG8gYmUgYW4gaW5zdGFuY2Ugb3IgYW4gb2JqZWN0XCIpO1xuICAgIH1cblxuICAgIGNvbnN0IHNvdXJjZSA9IHRoaXMuY29tcG9zZVRhbGVudHMoLi4uc291cmNlcyk7XG4gICAgY29uc3QgcmVxdWlyZWRzT25Tb3VyY2UgPSBbXTtcblxuICAgIGZvciAoY29uc3QgW2tleSwgdmFsdWVdIG9mIGdldEl0ZXJhYmxlT2JqZWN0RW50cmllcyhzb3VyY2UpKSB7XG5cbiAgICAgIGlmICh2YWx1ZSA9PT0gdGhpcy5yZXF1aXJlZCkge1xuICAgICAgICByZXF1aXJlZHNPblNvdXJjZS5wdXNoKGtleSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBSZWZsZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwga2V5LCBSZWZsZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihzb3VyY2UsIGtleSkpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGZvciAoY29uc3QgcmVxdWlyZWRPblNvdXJjZSBvZiByZXF1aXJlZHNPblNvdXJjZSkge1xuXG4gICAgICBpZiAoIXRhcmdldFtyZXF1aXJlZE9uU291cmNlXSB8fCB0YXJnZXRbcmVxdWlyZWRPblNvdXJjZV0gPT09IHRoaXMucmVxdWlyZWQpIHtcblxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYE1lbWJlciBcIiR7cmVxdWlyZWRPblNvdXJjZX1cIiByZW1haW5lZCB1bmltcGxlbWVudGVkYCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgZm9yIChjb25zdCBba2V5LCB2YWx1ZV0gb2YgZ2V0SXRlcmFibGVPYmplY3RFbnRyaWVzKHRhcmdldCkpIHtcblxuICAgICAgaWYgKHZhbHVlID09PSB0aGlzLnJlcXVpcmVkKSB7XG5cbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBNZW1iZXIgXCIke2tleX1cIiByZW1haW5lZCB1bmltcGxlbWVudGVkYCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHRhcmdldDtcbiAgfSxcbiAgY29tcG9zZVRhbGVudHMoLi4udGFsZW50cykge1xuXG4gICAgZm9yIChjb25zdCBzb3VyY2Ugb2YgdGFsZW50cykge1xuXG4gICAgICBpZiAoIXNvdXJjZS5jb25zdHJ1Y3Rvci50b1N0cmluZygpLmluY2x1ZGVzKFwiY2xhc3MgVGFsZW50IHtcIikpIHtcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihgUGFyYW1ldGVyICR7c291cmNlfSBpcyBub3QgYSB0YWxlbnRgKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBsZXQgbWVtYmVyTG9nID0gW107XG5cbiAgICBmb3IgKGNvbnN0IHNvdXJjZSBvZiB0YWxlbnRzKSB7XG5cbiAgICAgIG1lbWJlckxvZyA9IHRoaXMuYWRkU291cmNlSW5mb1RvTUxfKHNvdXJjZSwgbWVtYmVyTG9nKTtcbiAgICB9XG5cbiAgICBtZW1iZXJMb2cgPSB0aGlzLnBhcnNlTWVtYmVyTG9nXyhtZW1iZXJMb2cpO1xuXG4gICAgY29uc3QgcmVjb3JkID0ge307XG5cbiAgICBmb3IgKGNvbnN0IG1lbWJlckxvZ0VudHJ5IG9mIG1lbWJlckxvZykge1xuXG4gICAgICBjb25zdCBrZXkgPSBSZWZsZWN0Lm93bktleXMobWVtYmVyTG9nRW50cnkpWzBdO1xuICAgICAgY29uc3QgdmFsdWUgPSBtZW1iZXJMb2dFbnRyeVtrZXldO1xuXG4gICAgICBzd2l0Y2ggKHZhbHVlLmxlbmd0aCkge1xuICAgICAgICBjYXNlIDA6XG4gICAgICAgICAgbWVtYmVyTG9nRW50cnlba2V5XSA9IHRoaXMucmVxdWlyZWQ7XG4gICAgICAgICAgUmVmbGVjdC5kZWZpbmVQcm9wZXJ0eShyZWNvcmQsIGtleSwgUmVmbGVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IobWVtYmVyTG9nRW50cnksIGtleSkpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgbWVtYmVyTG9nRW50cnlba2V5XSA9IHZhbHVlWzBdO1xuICAgICAgICAgIFJlZmxlY3QuZGVmaW5lUHJvcGVydHkocmVjb3JkLCBrZXksIFJlZmxlY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKG1lbWJlckxvZ0VudHJ5LCBrZXkpKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYFRoZXJlIGlzIGFuIHVucmVzb2x2ZWQgY29uZmxpY3QgZm9yIHByb3BlcnR5IFwiJHtrZXl9XCJgKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy5jcmVhdGVUYWxlbnQocmVjb3JkKTtcbiAgfSxcbiAgYWxpYXModGFsZW50LCBvbGROYW1lLCBuZXdOYW1lKSB7XG5cbiAgICBpZiAoIVRhbGVudC50eXBlQ2hlY2sodGFsZW50KSkge1xuXG4gICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiVGhlIHRhcmdldCBoYXMgdG8gYmUgYSB0YWxlbnRcIik7XG4gICAgfVxuXG4gICAgaWYgKHR5cGVvZiBvbGROYW1lICE9PSBcInN0cmluZ1wiKSB7XG5cbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJUaGUgb2xkIG1ldGhvZCBuYW1lIGhhcyB0byBiZSBhIHN0cmluZ1wiKTtcbiAgICB9XG5cbiAgICBpZiAodHlwZW9mIG5ld05hbWUgIT09IFwic3RyaW5nXCIpIHtcblxuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlRoZSBuZXcgbWV0aG9kIG5hbWUgaGFzIHRvIGJlIGEgc3RyaW5nXCIpO1xuICAgIH1cblxuICAgIGNvbnN0IGFkZGVkID0gVGFsZW50XG4gICAgICAuYWRkUHJvcGVydHkodGFsZW50LCB7W25ld05hbWVdOiB0YWxlbnRbb2xkTmFtZV19KTtcblxuICAgIHJldHVybiBUYWxlbnRcbiAgICAgIC5yZW1vdmVQcm9wZXJ0eShhZGRlZCwgb2xkTmFtZSk7XG4gIH0sXG4gIGV4Y2x1ZGUodGFsZW50LCBuYW1lKSB7XG5cbiAgICBpZiAoIVRhbGVudC50eXBlQ2hlY2sodGFsZW50KSkge1xuXG4gICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiVGhlIHRhcmdldCBoYXMgdG8gYmUgYSB0YWxlbnRcIik7XG4gICAgfVxuXG4gICAgaWYgKHR5cGVvZiBuYW1lICE9PSBcInN0cmluZ1wiKSB7XG5cbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJUaGUgbWV0aG9kIG5hbWUgaGFzIHRvIGJlIGEgc3RyaW5nXCIpO1xuICAgIH1cblxuICAgIHJldHVybiBUYWxlbnQucmVtb3ZlUHJvcGVydHkodGFsZW50LCBuYW1lKTtcbiAgfSxcbiAgcGFyc2VNZW1iZXJMb2dfKG1lbWJlckxvZykge1xuXG4gICAgZm9yIChjb25zdCBtZW1iZXJMb2dFbnRyeSBvZiBtZW1iZXJMb2cpIHtcblxuICAgICAgY29uc3Qga2V5ID0gUmVmbGVjdC5vd25LZXlzKG1lbWJlckxvZ0VudHJ5KVswXTtcbiAgICAgIGNvbnN0IHZhbHVlID0gbWVtYmVyTG9nRW50cnlba2V5XTtcblxuICAgICAgbWVtYmVyTG9nRW50cnlba2V5XSA9IHZhbHVlLmZpbHRlcihlbGVtID0+IChlbGVtICE9PSB0aGlzLnJlcXVpcmVkKSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIG1lbWJlckxvZztcbiAgfSxcbiAgYWRkU291cmNlSW5mb1RvTUxfKHNvdXJjZSwgbWVtYmVyTG9nKSB7XG5cbiAgICBsZXQgbUwgPSBtZW1iZXJMb2c7XG5cbiAgICBmb3IgKGNvbnN0IFtrZXksIHZhbHVlXSBvZiBnZXRJdGVyYWJsZU9iamVjdEVudHJpZXMoc291cmNlKSkge1xuXG4gICAgICBpZiAoVGFsZW50LnR5cGVDaGVjayh2YWx1ZSkpIHtcblxuICAgICAgICBtTCA9IHRoaXMuYWRkU291cmNlSW5mb1RvTUxfKHZhbHVlLCBtTCk7XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IG1lbWJlckxvZ0VudHJ5ID0gZmluZFdoZXJlS2V5KG1MLCBrZXkpO1xuXG4gICAgICBpZiAoIW1lbWJlckxvZ0VudHJ5ICYmICFUYWxlbnQudHlwZUNoZWNrKHZhbHVlKSkge1xuXG4gICAgICAgIG1MLnB1c2goe1trZXldOiBbdmFsdWVdfSk7XG4gICAgICB9IGVsc2UgaWYgKCFUYWxlbnQudHlwZUNoZWNrKHZhbHVlKSkge1xuXG4gICAgICAgIG1lbWJlckxvZ0VudHJ5W2tleV0ucHVzaCh2YWx1ZSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIG1MO1xuICB9XG59O1xuIl19
