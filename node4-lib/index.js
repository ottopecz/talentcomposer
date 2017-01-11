"use strict";

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i]; return arr2; } else { return Array.from(arr); } }

module.exports = {
  "required": Symbol("required member"),
  compose: function compose() {
    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    for (const arg of args) {
      this.typeCheck_(arg);
    }

    if (typeof args[0] === "function") {
      return this.composeSym_.apply(this, _toConsumableArray(args));
    }

    return this.composeAsym_.apply(this, _toConsumableArray(args));
  },
  typeCheck_: function typeCheck_(arg) {

    if (typeof arg === "symbol" || typeof arg === "string" || typeof arg === "number" || typeof arg === "boolean" || arg.toString().includes("class")) {
      throw new TypeError("The parameter should not be a primitive or a class");
    }
  },
  composeSym_: function composeSym_() {
    for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }

    return this.delegate_.apply(this, [{}].concat(_toConsumableArray(args)));
  },
  composeAsym_: function composeAsym_() {
    for (var _len3 = arguments.length, args = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
      args[_key3] = arguments[_key3];
    }

    const target = args.shift();

    return this.delegate_.apply(this, [target].concat(_toConsumableArray(args)));
  },
  delegate_: function delegate_(target) {
    for (var _len4 = arguments.length, sources = Array(_len4 > 1 ? _len4 - 1 : 0), _key4 = 1; _key4 < _len4; _key4++) {
      sources[_key4 - 1] = arguments[_key4];
    }

    for (let source of sources) {

      if (typeof source === "function") {

        source = {
          [`${ source.name }`]: source
        };
      }

      this.copyover_(target, source);
    }

    return this.checkIntegrity_(target);
  },
  recursiveCopy_: function copyover_(target, source) {

    for (const prop of Reflect.ownKeys(source)) {

      if (source[prop].constructor === Object) {

        this.copyover_(target, source[prop]);
      }

      Reflect.defineProperty(target, prop, Reflect.getOwnPropertyDescriptor(source, prop));
    }
  },
  checkIntegrity_: function checkIntegrity_(composed) {

    for (const prop of Reflect.ownKeys(composed)) {

      if (composed[prop] === this.required) {

        throw new Error(`The member "${ prop }" is required to be implemented`);
      }
    }

    return composed;
  }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL2xpYi9pbmRleC5qcyJdLCJuYW1lcyI6WyJtb2R1bGUiLCJleHBvcnRzIiwiU3ltYm9sIiwiY29tcG9zZSIsImFyZ3MiLCJhcmciLCJ0eXBlQ2hlY2tfIiwiY29tcG9zZVN5bV8iLCJjb21wb3NlQXN5bV8iLCJ0b1N0cmluZyIsImluY2x1ZGVzIiwiVHlwZUVycm9yIiwiZGVsZWdhdGVfIiwidGFyZ2V0Iiwic2hpZnQiLCJzb3VyY2VzIiwic291cmNlIiwibmFtZSIsImNvcHlvdmVyXyIsImNoZWNrSW50ZWdyaXR5XyIsInByb3AiLCJSZWZsZWN0Iiwib3duS2V5cyIsImNvbnN0cnVjdG9yIiwiT2JqZWN0IiwiZGVmaW5lUHJvcGVydHkiLCJnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IiLCJjb21wb3NlZCIsInJlcXVpcmVkIiwiRXJyb3IiXSwibWFwcGluZ3MiOiI7Ozs7QUFBQUEsT0FBT0MsT0FBUCxHQUFpQjtBQUNmLGNBQVlDLE9BQU8saUJBQVAsQ0FERztBQUVmQyxTQUZlLHFCQUVFO0FBQUEsc0NBQU5DLElBQU07QUFBTkEsVUFBTTtBQUFBOztBQUVmLFNBQUssTUFBTUMsR0FBWCxJQUFrQkQsSUFBbEIsRUFBd0I7QUFDdEIsV0FBS0UsVUFBTCxDQUFnQkQsR0FBaEI7QUFDRDs7QUFFRCxRQUFJLE9BQU9ELEtBQUssQ0FBTCxDQUFQLEtBQW1CLFVBQXZCLEVBQW1DO0FBQ2pDLGFBQU8sS0FBS0csV0FBTCxnQ0FBb0JILElBQXBCLEVBQVA7QUFDRDs7QUFFRCxXQUFPLEtBQUtJLFlBQUwsZ0NBQXFCSixJQUFyQixFQUFQO0FBQ0QsR0FiYztBQWNmRSxZQWRlLHNCQWNKRCxHQWRJLEVBY0M7O0FBRWQsUUFDRSxPQUFPQSxHQUFQLEtBQWUsUUFBZixJQUNBLE9BQU9BLEdBQVAsS0FBZSxRQURmLElBRUEsT0FBT0EsR0FBUCxLQUFlLFFBRmYsSUFHQSxPQUFPQSxHQUFQLEtBQWUsU0FIZixJQUlBQSxJQUFJSSxRQUFKLEdBQWVDLFFBQWYsQ0FBd0IsT0FBeEIsQ0FMRixFQU1FO0FBQ0EsWUFBTSxJQUFJQyxTQUFKLENBQWMsb0RBQWQsQ0FBTjtBQUNEO0FBQ0YsR0F6QmM7QUEwQmZKLGFBMUJlLHlCQTBCTTtBQUFBLHVDQUFOSCxJQUFNO0FBQU5BLFVBQU07QUFBQTs7QUFDbkIsV0FBTyxLQUFLUSxTQUFMLGNBQWUsRUFBZiw0QkFBc0JSLElBQXRCLEdBQVA7QUFDRCxHQTVCYztBQTZCZkksY0E3QmUsMEJBNkJPO0FBQUEsdUNBQU5KLElBQU07QUFBTkEsVUFBTTtBQUFBOztBQUVwQixVQUFNUyxTQUFTVCxLQUFLVSxLQUFMLEVBQWY7O0FBRUEsV0FBTyxLQUFLRixTQUFMLGNBQWVDLE1BQWYsNEJBQTBCVCxJQUExQixHQUFQO0FBQ0QsR0FsQ2M7QUFtQ2ZRLFdBbkNlLHFCQW1DTEMsTUFuQ0ssRUFtQ2U7QUFBQSx1Q0FBVEUsT0FBUztBQUFUQSxhQUFTO0FBQUE7O0FBRTVCLFNBQUssSUFBSUMsTUFBVCxJQUFtQkQsT0FBbkIsRUFBNEI7O0FBRTFCLFVBQUksT0FBT0MsTUFBUCxLQUFrQixVQUF0QixFQUFrQzs7QUFFaENBLGlCQUFTO0FBQ1AsV0FBRSxJQUFFQSxPQUFPQyxJQUFLLEdBQWhCLEdBQW9CRDtBQURiLFNBQVQ7QUFHRDs7QUFFRCxXQUFLRSxTQUFMLENBQWVMLE1BQWYsRUFBdUJHLE1BQXZCO0FBQ0Q7O0FBRUQsV0FBTyxLQUFLRyxlQUFMLENBQXFCTixNQUFyQixDQUFQO0FBQ0QsR0FsRGM7QUFtRGZLLFdBbkRlLHFCQW1ETEwsTUFuREssRUFtREdHLE1BbkRILEVBbURXOztBQUV4QixTQUFLLE1BQU1JLElBQVgsSUFBbUJDLFFBQVFDLE9BQVIsQ0FBZ0JOLE1BQWhCLENBQW5CLEVBQTRDOztBQUUxQyxVQUFJQSxPQUFPSSxJQUFQLEVBQWFHLFdBQWIsS0FBNkJDLE1BQWpDLEVBQXlDOztBQUV2QyxhQUFLTixTQUFMLENBQWVMLE1BQWYsRUFBdUJHLE9BQU9JLElBQVAsQ0FBdkI7QUFDRDs7QUFFREMsY0FBUUksY0FBUixDQUF1QlosTUFBdkIsRUFBK0JPLElBQS9CLEVBQXFDQyxRQUFRSyx3QkFBUixDQUFpQ1YsTUFBakMsRUFBeUNJLElBQXpDLENBQXJDO0FBQ0Q7QUFDRixHQTlEYztBQStEZkQsaUJBL0RlLDJCQStEQ1EsUUEvREQsRUErRFc7O0FBRXhCLFNBQUssTUFBTVAsSUFBWCxJQUFtQkMsUUFBUUMsT0FBUixDQUFnQkssUUFBaEIsQ0FBbkIsRUFBOEM7O0FBRTVDLFVBQUlBLFNBQVNQLElBQVQsTUFBbUIsS0FBS1EsUUFBNUIsRUFBc0M7O0FBRXBDLGNBQU0sSUFBSUMsS0FBSixDQUFXLGdCQUFjVCxJQUFLLGtDQUE5QixDQUFOO0FBQ0Q7QUFDRjs7QUFFRCxXQUFPTyxRQUFQO0FBQ0Q7QUExRWMsQ0FBakIiLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyJtb2R1bGUuZXhwb3J0cyA9IHtcbiAgXCJyZXF1aXJlZFwiOiBTeW1ib2woXCJyZXF1aXJlZCBtZW1iZXJcIiksXG4gIGNvbXBvc2UoLi4uYXJncykge1xuXG4gICAgZm9yIChjb25zdCBhcmcgb2YgYXJncykge1xuICAgICAgdGhpcy50eXBlQ2hlY2tfKGFyZyk7XG4gICAgfVxuXG4gICAgaWYgKHR5cGVvZiBhcmdzWzBdID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgIHJldHVybiB0aGlzLmNvbXBvc2VTeW1fKC4uLmFyZ3MpO1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzLmNvbXBvc2VBc3ltXyguLi5hcmdzKTtcbiAgfSxcbiAgdHlwZUNoZWNrXyhhcmcpIHtcblxuICAgIGlmIChcbiAgICAgIHR5cGVvZiBhcmcgPT09IFwic3ltYm9sXCIgfHxcbiAgICAgIHR5cGVvZiBhcmcgPT09IFwic3RyaW5nXCIgfHxcbiAgICAgIHR5cGVvZiBhcmcgPT09IFwibnVtYmVyXCIgfHxcbiAgICAgIHR5cGVvZiBhcmcgPT09IFwiYm9vbGVhblwiIHx8XG4gICAgICBhcmcudG9TdHJpbmcoKS5pbmNsdWRlcyhcImNsYXNzXCIpXG4gICAgKSB7XG4gICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiVGhlIHBhcmFtZXRlciBzaG91bGQgbm90IGJlIGEgcHJpbWl0aXZlIG9yIGEgY2xhc3NcIik7XG4gICAgfVxuICB9LFxuICBjb21wb3NlU3ltXyguLi5hcmdzKSB7XG4gICAgcmV0dXJuIHRoaXMuZGVsZWdhdGVfKHt9LCAuLi5hcmdzKTtcbiAgfSxcbiAgY29tcG9zZUFzeW1fKC4uLmFyZ3MpIHtcblxuICAgIGNvbnN0IHRhcmdldCA9IGFyZ3Muc2hpZnQoKTtcblxuICAgIHJldHVybiB0aGlzLmRlbGVnYXRlXyh0YXJnZXQsIC4uLmFyZ3MpO1xuICB9LFxuICBkZWxlZ2F0ZV8odGFyZ2V0LCAuLi5zb3VyY2VzKSB7XG5cbiAgICBmb3IgKGxldCBzb3VyY2Ugb2Ygc291cmNlcykge1xuXG4gICAgICBpZiAodHlwZW9mIHNvdXJjZSA9PT0gXCJmdW5jdGlvblwiKSB7XG5cbiAgICAgICAgc291cmNlID0ge1xuICAgICAgICAgIFtgJHtzb3VyY2UubmFtZX1gXTogc291cmNlXG4gICAgICAgIH07XG4gICAgICB9XG5cbiAgICAgIHRoaXMuY29weW92ZXJfKHRhcmdldCwgc291cmNlKTtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy5jaGVja0ludGVncml0eV8odGFyZ2V0KTtcbiAgfSxcbiAgY29weW92ZXJfKHRhcmdldCwgc291cmNlKSB7XG5cbiAgICBmb3IgKGNvbnN0IHByb3Agb2YgUmVmbGVjdC5vd25LZXlzKHNvdXJjZSkpIHtcblxuICAgICAgaWYgKHNvdXJjZVtwcm9wXS5jb25zdHJ1Y3RvciA9PT0gT2JqZWN0KSB7XG5cbiAgICAgICAgdGhpcy5jb3B5b3Zlcl8odGFyZ2V0LCBzb3VyY2VbcHJvcF0pO1xuICAgICAgfVxuXG4gICAgICBSZWZsZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwgcHJvcCwgUmVmbGVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3Ioc291cmNlLCBwcm9wKSk7XG4gICAgfVxuICB9LFxuICBjaGVja0ludGVncml0eV8oY29tcG9zZWQpIHtcblxuICAgIGZvciAoY29uc3QgcHJvcCBvZiBSZWZsZWN0Lm93bktleXMoY29tcG9zZWQpKSB7XG5cbiAgICAgIGlmIChjb21wb3NlZFtwcm9wXSA9PT0gdGhpcy5yZXF1aXJlZCkge1xuXG4gICAgICAgIHRocm93IG5ldyBFcnJvcihgVGhlIG1lbWJlciBcIiR7cHJvcH1cIiBpcyByZXF1aXJlZCB0byBiZSBpbXBsZW1lbnRlZGApO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBjb21wb3NlZDtcbiAgfVxufTtcbiJdfQ==
