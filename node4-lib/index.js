"use strict";

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i]; return arr2; } else { return Array.from(arr); } }

const Talent = require("./Talent");

var _require = require("./util");

const getIterableObjectEntries = _require.getIterableObjectEntries,
      findWhereKey = _require.findWhereKey;


module.exports = {
  "required": Symbol("required member"),
  createTalent: function createTalent(record) {

    return new Talent(record);
  },
  composeWithTalents: function composeWithTalents(target) {

    if (target instanceof Talent || typeof target === "symbol" || typeof target === "string" || typeof target === "number" || typeof target === "boolean" || typeof target === "function") {
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

    if (!(talent instanceof Talent)) {

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

    if (!(talent instanceof Talent)) {

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


      if (value instanceof Talent) {

        mL = this.addSourceInfoToML_(value, mL);
      }

      const memberLogEntry = findWhereKey(mL, key);

      if (!memberLogEntry && !(value instanceof Talent)) {

        mL.push({ [key]: [value] });
      } else if (!(value instanceof Talent)) {

        memberLogEntry[key].push(value);
      }
    }

    return mL;
  }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL2xpYi9pbmRleC5qcyJdLCJuYW1lcyI6WyJUYWxlbnQiLCJyZXF1aXJlIiwiZ2V0SXRlcmFibGVPYmplY3RFbnRyaWVzIiwiZmluZFdoZXJlS2V5IiwibW9kdWxlIiwiZXhwb3J0cyIsIlN5bWJvbCIsImNyZWF0ZVRhbGVudCIsInJlY29yZCIsImNvbXBvc2VXaXRoVGFsZW50cyIsInRhcmdldCIsIlR5cGVFcnJvciIsInNvdXJjZXMiLCJzb3VyY2UiLCJjb21wb3NlVGFsZW50cyIsInJlcXVpcmVkc09uU291cmNlIiwia2V5IiwidmFsdWUiLCJyZXF1aXJlZCIsInB1c2giLCJSZWZsZWN0IiwiZGVmaW5lUHJvcGVydHkiLCJnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IiLCJyZXF1aXJlZE9uU291cmNlIiwiRXJyb3IiLCJ0YWxlbnRzIiwiY29uc3RydWN0b3IiLCJ0b1N0cmluZyIsImluY2x1ZGVzIiwibWVtYmVyTG9nIiwiYWRkU291cmNlSW5mb1RvTUxfIiwicGFyc2VNZW1iZXJMb2dfIiwibWVtYmVyTG9nRW50cnkiLCJvd25LZXlzIiwibGVuZ3RoIiwiYWxpYXMiLCJ0YWxlbnQiLCJvbGROYW1lIiwibmV3TmFtZSIsImFkZGVkIiwiYWRkUHJvcGVydHkiLCJyZW1vdmVQcm9wZXJ0eSIsImV4Y2x1ZGUiLCJuYW1lIiwiZmlsdGVyIiwiZWxlbSIsIm1MIl0sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSxNQUFNQSxTQUFTQyxRQUFRLFVBQVIsQ0FBZjs7ZUFDaURBLFFBQVEsUUFBUixDOztNQUExQ0Msd0IsWUFBQUEsd0I7TUFBMEJDLFksWUFBQUEsWTs7O0FBRWpDQyxPQUFPQyxPQUFQLEdBQWlCO0FBQ2YsY0FBWUMsT0FBTyxpQkFBUCxDQURHO0FBRWZDLGNBRmUsd0JBRUZDLE1BRkUsRUFFTTs7QUFFbkIsV0FBTyxJQUFJUixNQUFKLENBQVdRLE1BQVgsQ0FBUDtBQUNELEdBTGM7QUFNZkMsb0JBTmUsOEJBTUlDLE1BTkosRUFNd0I7O0FBRXJDLFFB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RCxXQUFPNkIsRUFBUDtBQUNEO0FBbEtjLENBQWpCIiwiZmlsZSI6ImluZGV4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgVGFsZW50ID0gcmVxdWlyZShcIi4vVGFsZW50XCIpO1xuY29uc3Qge2dldEl0ZXJhYmxlT2JqZWN0RW50cmllcywgZmluZFdoZXJlS2V5fSA9IHJlcXVpcmUoXCIuL3V0aWxcIik7XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBcInJlcXVpcmVkXCI6IFN5bWJvbChcInJlcXVpcmVkIG1lbWJlclwiKSxcbiAgY3JlYXRlVGFsZW50KHJlY29yZCkge1xuXG4gICAgcmV0dXJuIG5ldyBUYWxlbnQocmVjb3JkKTtcbiAgfSxcbiAgY29tcG9zZVdpdGhUYWxlbnRzKHRhcmdldCwgLi4uc291cmNlcykge1xuXG4gICAgaWYgKFxuICAgICAgdGFyZ2V0IGluc3RhbmNlb2YgVGFsZW50IHx8XG4gICAgICB0eXBlb2YgdGFyZ2V0ID09PSBcInN5bWJvbFwiIHx8XG4gICAgICB0eXBlb2YgdGFyZ2V0ID09PSBcInN0cmluZ1wiIHx8XG4gICAgICB0eXBlb2YgdGFyZ2V0ID09PSBcIm51bWJlclwiIHx8XG4gICAgICB0eXBlb2YgdGFyZ2V0ID09PSBcImJvb2xlYW5cIiB8fFxuICAgICAgdHlwZW9mIHRhcmdldCA9PT0gXCJmdW5jdGlvblwiXG4gICAgKSB7XG4gICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiVGhlIGZpcnN0IGFyZ3VtZW50IGhhcyB0byBiZSBhbiBpbnN0YW5jZSBvciBhbiBvYmplY3RcIik7XG4gICAgfVxuXG4gICAgY29uc3Qgc291cmNlID0gdGhpcy5jb21wb3NlVGFsZW50cyguLi5zb3VyY2VzKTtcbiAgICBjb25zdCByZXF1aXJlZHNPblNvdXJjZSA9IFtdO1xuXG4gICAgZm9yIChjb25zdCBba2V5LCB2YWx1ZV0gb2YgZ2V0SXRlcmFibGVPYmplY3RFbnRyaWVzKHNvdXJjZSkpIHtcblxuICAgICAgaWYgKHZhbHVlID09PSB0aGlzLnJlcXVpcmVkKSB7XG4gICAgICAgIHJlcXVpcmVkc09uU291cmNlLnB1c2goa2V5KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIFJlZmxlY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBrZXksIFJlZmxlY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKHNvdXJjZSwga2V5KSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgZm9yIChjb25zdCByZXF1aXJlZE9uU291cmNlIG9mIHJlcXVpcmVkc09uU291cmNlKSB7XG5cbiAgICAgIGlmICghdGFyZ2V0W3JlcXVpcmVkT25Tb3VyY2VdIHx8IHRhcmdldFtyZXF1aXJlZE9uU291cmNlXSA9PT0gdGhpcy5yZXF1aXJlZCkge1xuXG4gICAgICAgIHRocm93IG5ldyBFcnJvcihgTWVtYmVyIFwiJHtyZXF1aXJlZE9uU291cmNlfVwiIHJlbWFpbmVkIHVuaW1wbGVtZW50ZWRgKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBmb3IgKGNvbnN0IFtrZXksIHZhbHVlXSBvZiBnZXRJdGVyYWJsZU9iamVjdEVudHJpZXModGFyZ2V0KSkge1xuXG4gICAgICBpZiAodmFsdWUgPT09IHRoaXMucmVxdWlyZWQpIHtcblxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYE1lbWJlciBcIiR7a2V5fVwiIHJlbWFpbmVkIHVuaW1wbGVtZW50ZWRgKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gdGFyZ2V0O1xuICB9LFxuICBjb21wb3NlVGFsZW50cyguLi50YWxlbnRzKSB7XG5cbiAgICBmb3IgKGNvbnN0IHNvdXJjZSBvZiB0YWxlbnRzKSB7XG5cbiAgICAgIGlmICghc291cmNlLmNvbnN0cnVjdG9yLnRvU3RyaW5nKCkuaW5jbHVkZXMoXCJjbGFzcyBUYWxlbnQge1wiKSkge1xuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKGBQYXJhbWV0ZXIgJHtzb3VyY2V9IGlzIG5vdCBhIHRhbGVudGApO1xuICAgICAgfVxuICAgIH1cblxuICAgIGxldCBtZW1iZXJMb2cgPSBbXTtcblxuICAgIGZvciAoY29uc3Qgc291cmNlIG9mIHRhbGVudHMpIHtcblxuICAgICAgbWVtYmVyTG9nID0gdGhpcy5hZGRTb3VyY2VJbmZvVG9NTF8oc291cmNlLCBtZW1iZXJMb2cpO1xuICAgIH1cblxuICAgIG1lbWJlckxvZyA9IHRoaXMucGFyc2VNZW1iZXJMb2dfKG1lbWJlckxvZyk7XG5cbiAgICBjb25zdCByZWNvcmQgPSB7fTtcblxuICAgIGZvciAoY29uc3QgbWVtYmVyTG9nRW50cnkgb2YgbWVtYmVyTG9nKSB7XG5cbiAgICAgIGNvbnN0IGtleSA9IFJlZmxlY3Qub3duS2V5cyhtZW1iZXJMb2dFbnRyeSlbMF07XG4gICAgICBjb25zdCB2YWx1ZSA9IG1lbWJlckxvZ0VudHJ5W2tleV07XG5cbiAgICAgIHN3aXRjaCAodmFsdWUubGVuZ3RoKSB7XG4gICAgICAgIGNhc2UgMDpcbiAgICAgICAgICBtZW1iZXJMb2dFbnRyeVtrZXldID0gdGhpcy5yZXF1aXJlZDtcbiAgICAgICAgICBSZWZsZWN0LmRlZmluZVByb3BlcnR5KHJlY29yZCwga2V5LCBSZWZsZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihtZW1iZXJMb2dFbnRyeSwga2V5KSk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgMTpcbiAgICAgICAgICBtZW1iZXJMb2dFbnRyeVtrZXldID0gdmFsdWVbMF07XG4gICAgICAgICAgUmVmbGVjdC5kZWZpbmVQcm9wZXJ0eShyZWNvcmQsIGtleSwgUmVmbGVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IobWVtYmVyTG9nRW50cnksIGtleSkpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgVGhlcmUgaXMgYW4gdW5yZXNvbHZlZCBjb25mbGljdCBmb3IgcHJvcGVydHkgXCIke2tleX1cImApO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiB0aGlzLmNyZWF0ZVRhbGVudChyZWNvcmQpO1xuICB9LFxuICBhbGlhcyh0YWxlbnQsIG9sZE5hbWUsIG5ld05hbWUpIHtcblxuICAgIGlmICghKHRhbGVudCBpbnN0YW5jZW9mIFRhbGVudCkpIHtcblxuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlRoZSB0YXJnZXQgaGFzIHRvIGJlIGEgdGFsZW50XCIpO1xuICAgIH1cblxuICAgIGlmICh0eXBlb2Ygb2xkTmFtZSAhPT0gXCJzdHJpbmdcIikge1xuXG4gICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiVGhlIG9sZCBtZXRob2QgbmFtZSBoYXMgdG8gYmUgYSBzdHJpbmdcIik7XG4gICAgfVxuXG4gICAgaWYgKHR5cGVvZiBuZXdOYW1lICE9PSBcInN0cmluZ1wiKSB7XG5cbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJUaGUgbmV3IG1ldGhvZCBuYW1lIGhhcyB0byBiZSBhIHN0cmluZ1wiKTtcbiAgICB9XG5cbiAgICBjb25zdCBhZGRlZCA9IFRhbGVudFxuICAgICAgLmFkZFByb3BlcnR5KHRhbGVudCwge1tuZXdOYW1lXTogdGFsZW50W29sZE5hbWVdfSk7XG5cbiAgICByZXR1cm4gVGFsZW50XG4gICAgICAucmVtb3ZlUHJvcGVydHkoYWRkZWQsIG9sZE5hbWUpO1xuICB9LFxuICBleGNsdWRlKHRhbGVudCwgbmFtZSkge1xuXG4gICAgaWYgKCEodGFsZW50IGluc3RhbmNlb2YgVGFsZW50KSkge1xuXG4gICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiVGhlIHRhcmdldCBoYXMgdG8gYmUgYSB0YWxlbnRcIik7XG4gICAgfVxuXG4gICAgaWYgKHR5cGVvZiBuYW1lICE9PSBcInN0cmluZ1wiKSB7XG5cbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJUaGUgbWV0aG9kIG5hbWUgaGFzIHRvIGJlIGEgc3RyaW5nXCIpO1xuICAgIH1cblxuICAgIHJldHVybiBUYWxlbnQucmVtb3ZlUHJvcGVydHkodGFsZW50LCBuYW1lKTtcbiAgfSxcbiAgcGFyc2VNZW1iZXJMb2dfKG1lbWJlckxvZykge1xuXG4gICAgZm9yIChjb25zdCBtZW1iZXJMb2dFbnRyeSBvZiBtZW1iZXJMb2cpIHtcblxuICAgICAgY29uc3Qga2V5ID0gUmVmbGVjdC5vd25LZXlzKG1lbWJlckxvZ0VudHJ5KVswXTtcbiAgICAgIGNvbnN0IHZhbHVlID0gbWVtYmVyTG9nRW50cnlba2V5XTtcblxuICAgICAgbWVtYmVyTG9nRW50cnlba2V5XSA9IHZhbHVlLmZpbHRlcihlbGVtID0+IChlbGVtICE9PSB0aGlzLnJlcXVpcmVkKSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIG1lbWJlckxvZztcbiAgfSxcbiAgYWRkU291cmNlSW5mb1RvTUxfKHNvdXJjZSwgbWVtYmVyTG9nKSB7XG5cbiAgICBsZXQgbUwgPSBtZW1iZXJMb2c7XG5cbiAgICBmb3IgKGNvbnN0IFtrZXksIHZhbHVlXSBvZiBnZXRJdGVyYWJsZU9iamVjdEVudHJpZXMoc291cmNlKSkge1xuXG4gICAgICBpZiAodmFsdWUgaW5zdGFuY2VvZiBUYWxlbnQpIHtcblxuICAgICAgICBtTCA9IHRoaXMuYWRkU291cmNlSW5mb1RvTUxfKHZhbHVlLCBtTCk7XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IG1lbWJlckxvZ0VudHJ5ID0gZmluZFdoZXJlS2V5KG1MLCBrZXkpO1xuXG4gICAgICBpZiAoIW1lbWJlckxvZ0VudHJ5ICYmICEodmFsdWUgaW5zdGFuY2VvZiBUYWxlbnQpKSB7XG5cbiAgICAgICAgbUwucHVzaCh7W2tleV06IFt2YWx1ZV19KTtcbiAgICAgIH0gZWxzZSBpZiAoISh2YWx1ZSBpbnN0YW5jZW9mIFRhbGVudCkpIHtcblxuICAgICAgICBtZW1iZXJMb2dFbnRyeVtrZXldLnB1c2godmFsdWUpO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBtTDtcbiAgfVxufTtcbiJdfQ==
