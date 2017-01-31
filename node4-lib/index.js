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

    for (const _ref7 of getIterableObjectEntries(source)) {
      var _ref8 = _slicedToArray(_ref7, 2);

      const key = _ref8[0];
      const value = _ref8[1];


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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL2xpYi9pbmRleC5qcyJdLCJuYW1lcyI6WyJUYWxlbnQiLCJyZXF1aXJlIiwiZ2V0SXRlcmFibGVPYmplY3RFbnRyaWVzIiwiZmluZFdoZXJlS2V5IiwibW9kdWxlIiwiZXhwb3J0cyIsInJlcXVpcmVkIiwiY3JlYXRlVGFsZW50IiwicmVjb3JkIiwiY29tcG9zZVdpdGhUYWxlbnRzIiwidGFyZ2V0IiwidHlwZUNoZWNrIiwiVHlwZUVycm9yIiwic291cmNlcyIsInNvdXJjZSIsImNvbXBvc2VUYWxlbnRzIiwicmVxdWlyZWRzT25Tb3VyY2UiLCJrZXkiLCJ2YWx1ZSIsInB1c2giLCJSZWZsZWN0IiwiZGVmaW5lUHJvcGVydHkiLCJnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IiLCJyZXF1aXJlZE9uU291cmNlIiwiRXJyb3IiLCJnZXRQcm90b3R5cGVPZiIsIm93bktleXMiLCJpbmNsdWRlcyIsInRhbGVudHMiLCJjb25zdHJ1Y3RvciIsInRvU3RyaW5nIiwibWVtYmVyTG9nIiwiYWRkU291cmNlSW5mb1RvTUxfIiwicGFyc2VNZW1iZXJMb2dfIiwibWVtYmVyTG9nRW50cnkiLCJsZW5ndGgiLCJhbGlhcyIsInRhbGVudCIsIm9sZE5hbWUiLCJuZXdOYW1lIiwiYWRkZWQiLCJhZGRQcm9wZXJ0eSIsInJlbW92ZVByb3BlcnR5IiwiZXhjbHVkZSIsIm5hbWUiLCJmaWx0ZXIiLCJlbGVtIiwibUwiXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLE1BQU1BLFNBQVNDLFFBQVEsVUFBUixDQUFmOztlQUNpREEsUUFBUSxRQUFSLEM7O01BQTFDQyx3QixZQUFBQSx3QjtNQUEwQkMsWSxZQUFBQSxZOzs7QUFFakNDLE9BQU9DLE9BQVAsR0FBaUI7QUFDZixjQUFZTCxPQUFPTSxRQURKO0FBRWZDLGNBRmUsd0JBRUZDLE1BRkUsRUFFTTs7QUFFbkIsV0FBTyxJQUFJUixNQUFKLENBQVdRLE1BQVgsQ0FBUDtBQUNELEdBTGM7QUFNZkMsb0JBTmUsOEJBTUlDLE1BTkos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QUFLZixrQkFBTCxDQUF3QmQsS0FBeEIsRUFBK0I2QixFQUEvQixDQUFMO0FBQ0Q7O0FBRUQsWUFBTWIsaUJBQWlCL0IsYUFBYTRDLEVBQWIsRUFBaUI5QixHQUFqQixDQUF2Qjs7QUFFQSxVQUFJLENBQUNpQixjQUFELElBQW1CLENBQUNsQyxPQUFPVyxTQUFQLENBQWlCTyxLQUFqQixDQUF4QixFQUFpRDs7QUFFL0M2QixXQUFHNUIsSUFBSCxDQUFRLEVBQUMsQ0FBQ0YsR0FBRCxHQUFPLENBQUNDLEtBQUQsQ0FBUixFQUFSO0FBQ0QsT0FIRCxNQUdPLElBQUksQ0FBQ2xCLE9BQU9XLFNBQVAsQ0FBaUJPLEtBQWpCLENBQUwsRUFBOEI7O0FBRW5DZ0IsdUJBQWVqQixHQUFmLEVBQW9CRSxJQUFwQixDQUF5QkQsS0FBekI7QUFDRDtBQUNGOztBQUVELFdBQU82QixFQUFQO0FBQ0Q7QUExS2MsQ0FBakIiLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBUYWxlbnQgPSByZXF1aXJlKFwiLi9UYWxlbnRcIik7XG5jb25zdCB7Z2V0SXRlcmFibGVPYmplY3RFbnRyaWVzLCBmaW5kV2hlcmVLZXl9ID0gcmVxdWlyZShcIi4vdXRpbFwiKTtcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIFwicmVxdWlyZWRcIjogVGFsZW50LnJlcXVpcmVkLFxuICBjcmVhdGVUYWxlbnQocmVjb3JkKSB7XG5cbiAgICByZXR1cm4gbmV3IFRhbGVudChyZWNvcmQpO1xuICB9LFxuICBjb21wb3NlV2l0aFRhbGVudHModGFyZ2V0LCAuLi5zb3VyY2VzKSB7XG5cbiAgICBpZiAoXG4gICAgICBUYWxlbnQudHlwZUNoZWNrKHRhcmdldCkgfHxcbiAgICAgIHR5cGVvZiB0YXJnZXQgPT09IFwic3ltYm9sXCIgfHxcbiAgICAgIHR5cGVvZiB0YXJnZXQgPT09IFwic3RyaW5nXCIgfHxcbiAgICAgIHR5cGVvZiB0YXJnZXQgPT09IFwibnVtYmVyXCIgfHxcbiAgICAgIHR5cGVvZiB0YXJnZXQgPT09IFwiYm9vbGVhblwiIHx8XG4gICAgICB0eXBlb2YgdGFyZ2V0ID09PSBcImZ1bmN0aW9uXCJcbiAgICApIHtcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJUaGUgZmlyc3QgYXJndW1lbnQgaGFzIHRvIGJlIGFuIGluc3RhbmNlIG9yIGFuIG9iamVjdFwiKTtcbiAgICB9XG5cbiAgICBjb25zdCBzb3VyY2UgPSB0aGlzLmNvbXBvc2VUYWxlbnRzKC4uLnNvdXJjZXMpO1xuICAgIGNvbnN0IHJlcXVpcmVkc09uU291cmNlID0gW107XG5cbiAgICBmb3IgKGNvbnN0IFtrZXksIHZhbHVlXSBvZiBnZXRJdGVyYWJsZU9iamVjdEVudHJpZXMoc291cmNlKSkge1xuXG4gICAgICBpZiAodmFsdWUgPT09IHRoaXMucmVxdWlyZWQpIHtcbiAgICAgICAgcmVxdWlyZWRzT25Tb3VyY2UucHVzaChrZXkpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgUmVmbGVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGtleSwgUmVmbGVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3Ioc291cmNlLCBrZXkpKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBmb3IgKGNvbnN0IHJlcXVpcmVkT25Tb3VyY2Ugb2YgcmVxdWlyZWRzT25Tb3VyY2UpIHtcblxuICAgICAgaWYgKCF0YXJnZXRbcmVxdWlyZWRPblNvdXJjZV0gfHwgdGFyZ2V0W3JlcXVpcmVkT25Tb3VyY2VdID09PSB0aGlzLnJlcXVpcmVkKSB7XG5cbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBNZW1iZXIgXCIke3JlcXVpcmVkT25Tb3VyY2V9XCIgcmVtYWluZWQgdW5pbXBsZW1lbnRlZGApO1xuICAgICAgfVxuICAgIH1cblxuICAgIGZvciAoY29uc3QgW2tleSwgdmFsdWVdIG9mIGdldEl0ZXJhYmxlT2JqZWN0RW50cmllcyh0YXJnZXQpKSB7XG5cbiAgICAgIGlmICh2YWx1ZSA9PT0gdGhpcy5yZXF1aXJlZCkge1xuXG4gICAgICAgIHRocm93IG5ldyBFcnJvcihgTWVtYmVyIFwiJHtrZXl9XCIgcmVtYWluZWQgdW5pbXBsZW1lbnRlZGApO1xuICAgICAgfVxuICAgIH1cblxuICAgIGZvciAoY29uc3QgW2tleSwgdmFsdWVdIG9mIGdldEl0ZXJhYmxlT2JqZWN0RW50cmllcyhSZWZsZWN0LmdldFByb3RvdHlwZU9mKHRhcmdldCkpKSB7XG5cbiAgICAgIGlmICghUmVmbGVjdC5vd25LZXlzKHRhcmdldCkuaW5jbHVkZXMoa2V5KSAmJiAodmFsdWUgPT09IHRoaXMucmVxdWlyZWQpKSB7XG5cbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBNZW1iZXIgXCIke2tleX1cIiByZW1haW5lZCB1bmltcGxlbWVudGVkYCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHRhcmdldDtcbiAgfSxcbiAgY29tcG9zZVRhbGVudHMoLi4udGFsZW50cykge1xuXG4gICAgZm9yIChjb25zdCBzb3VyY2Ugb2YgdGFsZW50cykge1xuXG4gICAgICBpZiAoIXNvdXJjZS5jb25zdHJ1Y3Rvci50b1N0cmluZygpLmluY2x1ZGVzKFwiY2xhc3MgVGFsZW50IHtcIikpIHtcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihgUGFyYW1ldGVyICR7c291cmNlfSBpcyBub3QgYSB0YWxlbnRgKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBsZXQgbWVtYmVyTG9nID0gW107XG5cbiAgICBmb3IgKGNvbnN0IHNvdXJjZSBvZiB0YWxlbnRzKSB7XG5cbiAgICAgIG1lbWJlckxvZyA9IHRoaXMuYWRkU291cmNlSW5mb1RvTUxfKHNvdXJjZSwgbWVtYmVyTG9nKTtcbiAgICB9XG5cbiAgICBtZW1iZXJMb2cgPSB0aGlzLnBhcnNlTWVtYmVyTG9nXyhtZW1iZXJMb2cpO1xuXG4gICAgY29uc3QgcmVjb3JkID0ge307XG5cbiAgICBmb3IgKGNvbnN0IG1lbWJlckxvZ0VudHJ5IG9mIG1lbWJlckxvZykge1xuXG4gICAgICBjb25zdCBrZXkgPSBSZWZsZWN0Lm93bktleXMobWVtYmVyTG9nRW50cnkpWzBdO1xuICAgICAgY29uc3QgdmFsdWUgPSBtZW1iZXJMb2dFbnRyeVtrZXldO1xuXG4gICAgICBzd2l0Y2ggKHZhbHVlLmxlbmd0aCkge1xuICAgICAgICBjYXNlIDA6XG4gICAgICAgICAgbWVtYmVyTG9nRW50cnlba2V5XSA9IHRoaXMucmVxdWlyZWQ7XG4gICAgICAgICAgUmVmbGVjdC5kZWZpbmVQcm9wZXJ0eShyZWNvcmQsIGtleSwgUmVmbGVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IobWVtYmVyTG9nRW50cnksIGtleSkpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgbWVtYmVyTG9nRW50cnlba2V5XSA9IHZhbHVlWzBdO1xuICAgICAgICAgIFJlZmxlY3QuZGVmaW5lUHJvcGVydHkocmVjb3JkLCBrZXksIFJlZmxlY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKG1lbWJlckxvZ0VudHJ5LCBrZXkpKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYFRoZXJlIGlzIGFuIHVucmVzb2x2ZWQgY29uZmxpY3QgZm9yIHByb3BlcnR5IFwiJHtrZXl9XCJgKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy5jcmVhdGVUYWxlbnQocmVjb3JkKTtcbiAgfSxcbiAgYWxpYXModGFsZW50LCBvbGROYW1lLCBuZXdOYW1lKSB7XG5cbiAgICBpZiAoIVRhbGVudC50eXBlQ2hlY2sodGFsZW50KSkge1xuXG4gICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiVGhlIHRhcmdldCBoYXMgdG8gYmUgYSB0YWxlbnRcIik7XG4gICAgfVxuXG4gICAgaWYgKHR5cGVvZiBvbGROYW1lICE9PSBcInN0cmluZ1wiKSB7XG5cbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJUaGUgb2xkIG1ldGhvZCBuYW1lIGhhcyB0byBiZSBhIHN0cmluZ1wiKTtcbiAgICB9XG5cbiAgICBpZiAodHlwZW9mIG5ld05hbWUgIT09IFwic3RyaW5nXCIpIHtcblxuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlRoZSBuZXcgbWV0aG9kIG5hbWUgaGFzIHRvIGJlIGEgc3RyaW5nXCIpO1xuICAgIH1cblxuICAgIGNvbnN0IGFkZGVkID0gVGFsZW50XG4gICAgICAuYWRkUHJvcGVydHkodGFsZW50LCB7W25ld05hbWVdOiB0YWxlbnRbb2xkTmFtZV19KTtcblxuICAgIHJldHVybiBUYWxlbnRcbiAgICAgIC5yZW1vdmVQcm9wZXJ0eShhZGRlZCwgb2xkTmFtZSk7XG4gIH0sXG4gIGV4Y2x1ZGUodGFsZW50LCBuYW1lKSB7XG5cbiAgICBpZiAoIVRhbGVudC50eXBlQ2hlY2sodGFsZW50KSkge1xuXG4gICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiVGhlIHRhcmdldCBoYXMgdG8gYmUgYSB0YWxlbnRcIik7XG4gICAgfVxuXG4gICAgaWYgKHR5cGVvZiBuYW1lICE9PSBcInN0cmluZ1wiKSB7XG5cbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJUaGUgbWV0aG9kIG5hbWUgaGFzIHRvIGJlIGEgc3RyaW5nXCIpO1xuICAgIH1cblxuICAgIHJldHVybiBUYWxlbnQucmVtb3ZlUHJvcGVydHkodGFsZW50LCBuYW1lKTtcbiAgfSxcbiAgcGFyc2VNZW1iZXJMb2dfKG1lbWJlckxvZykge1xuXG4gICAgZm9yIChjb25zdCBtZW1iZXJMb2dFbnRyeSBvZiBtZW1iZXJMb2cpIHtcblxuICAgICAgY29uc3Qga2V5ID0gUmVmbGVjdC5vd25LZXlzKG1lbWJlckxvZ0VudHJ5KVswXTtcbiAgICAgIGNvbnN0IHZhbHVlID0gbWVtYmVyTG9nRW50cnlba2V5XTtcblxuICAgICAgbWVtYmVyTG9nRW50cnlba2V5XSA9IHZhbHVlLmZpbHRlcihlbGVtID0+IChlbGVtICE9PSB0aGlzLnJlcXVpcmVkKSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIG1lbWJlckxvZztcbiAgfSxcbiAgYWRkU291cmNlSW5mb1RvTUxfKHNvdXJjZSwgbWVtYmVyTG9nKSB7XG5cbiAgICBsZXQgbUwgPSBtZW1iZXJMb2c7XG5cbiAgICBmb3IgKGNvbnN0IFtrZXksIHZhbHVlXSBvZiBnZXRJdGVyYWJsZU9iamVjdEVudHJpZXMoc291cmNlKSkge1xuXG4gICAgICBpZiAoVGFsZW50LnR5cGVDaGVjayh2YWx1ZSkpIHtcblxuICAgICAgICBtTCA9IHRoaXMuYWRkU291cmNlSW5mb1RvTUxfKHZhbHVlLCBtTCk7XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IG1lbWJlckxvZ0VudHJ5ID0gZmluZFdoZXJlS2V5KG1MLCBrZXkpO1xuXG4gICAgICBpZiAoIW1lbWJlckxvZ0VudHJ5ICYmICFUYWxlbnQudHlwZUNoZWNrKHZhbHVlKSkge1xuXG4gICAgICAgIG1MLnB1c2goe1trZXldOiBbdmFsdWVdfSk7XG4gICAgICB9IGVsc2UgaWYgKCFUYWxlbnQudHlwZUNoZWNrKHZhbHVlKSkge1xuXG4gICAgICAgIG1lbWJlckxvZ0VudHJ5W2tleV0ucHVzaCh2YWx1ZSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIG1MO1xuICB9XG59O1xuIl19
