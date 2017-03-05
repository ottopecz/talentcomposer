"use strict";

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

const Talent = require("./Talent");

var _require = require("./util");

const getIterableObjectEntries = _require.getIterableObjectEntries,
      findWhereKey = _require.findWhereKey;


exports.parseMemberLog = function parseMemberLog(memberLog, required) {

  for (const memberLogEntry of memberLog) {

    const key = Reflect.ownKeys(memberLogEntry)[0];
    const value = memberLogEntry[key];

    memberLogEntry[key] = value.filter(elem => elem !== required);
  }

  return memberLog;
};

exports.addSourceInfoToML = function addSourceInfoToML(source, memberLog) {

  let mL = memberLog;

  for (const _ref of getIterableObjectEntries(source)) {
    var _ref2 = _slicedToArray(_ref, 2);

    const key = _ref2[0];
    const value = _ref2[1];


    if (Talent.typeCheck(value)) {

      mL = addSourceInfoToML(value, mL);
    }

    const memberLogEntry = findWhereKey(mL, key);

    if (!memberLogEntry && !Talent.typeCheck(value)) {

      mL.push({ [key]: [value] });
    } else if (!Talent.typeCheck(value)) {

      memberLogEntry[key].push(value);
    }
  }

  return mL;
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL2xpYi9zaWRlRWZmZWN0cy5qcyJdLCJuYW1lcyI6WyJUYWxlbnQiLCJyZXF1aXJlIiwiZ2V0SXRlcmFibGVPYmplY3RFbnRyaWVzIiwiZmluZFdoZXJlS2V5IiwiZXhwb3J0cyIsInBhcnNlTWVtYmVyTG9nIiwibWVtYmVyTG9nIiwicmVxdWlyZWQiLCJtZW1iZXJMb2dFbnRyeSIsImtleSIsIlJlZmxlY3QiLCJvd25LZXlzIiwidmFsdWUiLCJmaWx0ZXIiLCJlbGVtIiwiYWRkU291cmNlSW5mb1RvTUwiLCJzb3VyY2UiLCJtTCIsInR5cGVDaGVjayIsInB1c2giXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxNQUFNQSxTQUFTQyxRQUFRLFVBQVIsQ0FBZjs7ZUFDaURBLFFBQVEsUUFBUixDOztNQUExQ0Msd0IsWUFBQUEsd0I7TUFBMEJDLFksWUFBQUEsWTs7O0FBRWpDQyxRQUFRQyxjQUFSLEdBQXlCLFNBQVNBLGNBQVQsQ0FBd0JDLFNBQXhCLEVBQW1DQyxRQUFuQyxFQUE2Qzs7QUFFcEUsT0FBSyxNQUFNQyxjQUFYLElBQTZCRixTQUE3QixFQUF3Qzs7QUFFdEMsVUFBTUcsTUFBTUMsUUFBUUMsT0FBUixDQUFnQkgsY0FBaEIsRUFBZ0MsQ0FBaEMsQ0FBWjtBQUNBLFVBQU1JLFFBQVFKLGVBQWVDLEdBQWYsQ0FBZDs7QUFFQUQsbUJBQWVDLEdBQWYsSUFBc0JHLE1BQU1DLE1BQU4sQ0FBYUMsUUFBU0EsU0FBU1AsUUFBL0IsQ0FBdEI7QUFDRDs7QUFFRCxTQUFPRCxTQUFQO0FBQ0QsQ0FYRDs7QUFhQUYsUUFBUVcsaUJBQVIsR0FBNEIsU0FBU0EsaUJBQVQsQ0FBMkJDLE1BQTNCLEVBQW1DVixTQUFuQyxFQUE4Qzs7QUFFeEUsTUFBSVcsS0FBS1gsU0FBVDs7QUFFQSxxQkFBMkJKLHlCQUF5QmMsTUFBekIsQ0FBM0IsRUFBNkQ7QUFBQTs7QUFBQSxVQUFqRFAsR0FBaUQ7QUFBQSxVQUE1Q0csS0FBNEM7OztBQUUzRCxRQUFJWixPQUFPa0IsU0FBUCxDQUFpQk4sS0FBakIsQ0FBSixFQUE2Qjs7QUFFM0JLLFdBQUtGLGtCQUFrQkgsS0FBbEIsRUFBeUJLLEVBQXpCLENBQUw7QUFDRDs7QUFFRCxVQUFNVCxpQkFBaUJMLGFBQWFjLEVBQWIsRUFBaUJSLEdBQWpCLENBQXZCOztBQUVBLFFBQUksQ0FBQ0QsY0FBRCxJQUFtQixDQUFDUixPQUFPa0IsU0FBUCxDQUFpQk4sS0FBakIsQ0FBeEIsRUFBaUQ7O0FBRS9DSyxTQUFHRSxJQUFILENBQVEsRUFBQyxDQUFDVixHQUFELEdBQU8sQ0FBQ0csS0FBRCxDQUFSLEVBQVI7QUFDRCxLQUhELE1BR08sSUFBSSxDQUFDWixPQUFPa0IsU0FBUCxDQUFpQk4sS0FBakIsQ0FBTCxFQUE4Qjs7QUFFbkNKLHFCQUFlQyxHQUFmLEVBQW9CVSxJQUFwQixDQUF5QlAsS0FBekI7QUFDRDtBQUNGOztBQUVELFNBQU9LLEVBQVA7QUFDRCxDQXZCRCIsImZpbGUiOiJzaWRlRWZmZWN0cy5qcyIsInNvdXJjZXNDb250ZW50IjpbImNvbnN0IFRhbGVudCA9IHJlcXVpcmUoXCIuL1RhbGVudFwiKTtcbmNvbnN0IHtnZXRJdGVyYWJsZU9iamVjdEVudHJpZXMsIGZpbmRXaGVyZUtleX0gPSByZXF1aXJlKFwiLi91dGlsXCIpO1xuXG5leHBvcnRzLnBhcnNlTWVtYmVyTG9nID0gZnVuY3Rpb24gcGFyc2VNZW1iZXJMb2cobWVtYmVyTG9nLCByZXF1aXJlZCkge1xuXG4gIGZvciAoY29uc3QgbWVtYmVyTG9nRW50cnkgb2YgbWVtYmVyTG9nKSB7XG5cbiAgICBjb25zdCBrZXkgPSBSZWZsZWN0Lm93bktleXMobWVtYmVyTG9nRW50cnkpWzBdO1xuICAgIGNvbnN0IHZhbHVlID0gbWVtYmVyTG9nRW50cnlba2V5XTtcblxuICAgIG1lbWJlckxvZ0VudHJ5W2tleV0gPSB2YWx1ZS5maWx0ZXIoZWxlbSA9PiAoZWxlbSAhPT0gcmVxdWlyZWQpKTtcbiAgfVxuXG4gIHJldHVybiBtZW1iZXJMb2c7XG59O1xuXG5leHBvcnRzLmFkZFNvdXJjZUluZm9Ub01MID0gZnVuY3Rpb24gYWRkU291cmNlSW5mb1RvTUwoc291cmNlLCBtZW1iZXJMb2cpIHtcblxuICBsZXQgbUwgPSBtZW1iZXJMb2c7XG5cbiAgZm9yIChjb25zdCBba2V5LCB2YWx1ZV0gb2YgZ2V0SXRlcmFibGVPYmplY3RFbnRyaWVzKHNvdXJjZSkpIHtcblxuICAgIGlmIChUYWxlbnQudHlwZUNoZWNrKHZhbHVlKSkge1xuXG4gICAgICBtTCA9IGFkZFNvdXJjZUluZm9Ub01MKHZhbHVlLCBtTCk7XG4gICAgfVxuXG4gICAgY29uc3QgbWVtYmVyTG9nRW50cnkgPSBmaW5kV2hlcmVLZXkobUwsIGtleSk7XG5cbiAgICBpZiAoIW1lbWJlckxvZ0VudHJ5ICYmICFUYWxlbnQudHlwZUNoZWNrKHZhbHVlKSkge1xuXG4gICAgICBtTC5wdXNoKHtba2V5XTogW3ZhbHVlXX0pO1xuICAgIH0gZWxzZSBpZiAoIVRhbGVudC50eXBlQ2hlY2sodmFsdWUpKSB7XG5cbiAgICAgIG1lbWJlckxvZ0VudHJ5W2tleV0ucHVzaCh2YWx1ZSk7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIG1MO1xufTtcbiJdfQ==
