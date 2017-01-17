"use strict";

var _require = require("./util");

const copyOwnProps = _require.copyOwnProps;


class Talent {

  constructor(record) {

    copyOwnProps(this, record);
  }

  static addProperty(talent, keyValue) {

    const key = Reflect.ownKeys(keyValue)[0];
    const valueDesc = Reflect.getOwnPropertyDescriptor(keyValue, key);
    const record = copyOwnProps({}, talent);

    Reflect.defineProperty(record, key, valueDesc);

    return new Talent(record);
  }

  static removeProperty(talent, key) {

    const record = copyOwnProps({}, talent);

    Reflect.deleteProperty(record, key);

    return new Talent(record);
  }
}

module.exports = Talent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL2xpYi9UYWxlbnQuanMiXSwibmFtZXMiOlsicmVxdWlyZSIsImNvcHlPd25Qcm9wcyIsIlRhbGVudCIsImNvbnN0cnVjdG9yIiwicmVjb3JkIiwiYWRkUHJvcGVydHkiLCJ0YWxlbnQiLCJrZXlWYWx1ZSIsImtleSIsIlJlZmxlY3QiLCJvd25LZXlzIiwidmFsdWVEZXNjIiwiZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yIiwiZGVmaW5lUHJvcGVydHkiLCJyZW1vdmVQcm9wZXJ0eSIsImRlbGV0ZVByb3BlcnR5IiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6Ijs7ZUFBdUJBLFFBQVEsUUFBUixDOztNQUFoQkMsWSxZQUFBQSxZOzs7QUFFUCxNQUFNQyxNQUFOLENBQWE7O0FBRVhDLGNBQVlDLE1BQVosRUFBb0I7O0FBRWxCSCxpQkFBYSxJQUFiLEVBQW1CRyxNQUFuQjtBQUNEOztBQUVELFNBQU9DLFdBQVAsQ0FBbUJDLE1BQW5CLEVBQTJCQyxRQUEzQixFQUFxQzs7QUFFbkMsVUFBTUMsTUFBTUMsUUFBUUMsT0FBUixDQUFnQkgsUUFBaEIsRUFBMEIsQ0FBMUIsQ0FBWjtBQUNBLFVBQU1JLFlBQVlGLFFBQVFHLHdCQUFSLENBQWlDTCxRQUFqQyxFQUEyQ0MsR0FBM0MsQ0FBbEI7QUFDQSxVQUFNSixTQUFTSCxhQUFhLEVBQWIsRUFBaUJLLE1BQWpCLENBQWY7O0FBRUFHLFlBQVFJLGNBQVIsQ0FBdUJULE1BQXZCLEVBQStCSSxHQUEvQixFQUFvQ0csU0FBcEM7O0FBRUEsV0FBTyxJQUFJVCxNQUFKLENBQVdFLE1BQVgsQ0FBUDtBQUNEOztBQUVELFNBQU9VLGNBQVAsQ0FBc0JSLE1BQXRCLEVBQThCRSxHQUE5QixFQUFtQzs7QUFFakMsVUFBTUosU0FBU0gsYUFBYSxFQUFiLEVBQWlCSyxNQUFqQixDQUFmOztBQUVBRyxZQUFRTSxjQUFSLENBQXVCWCxNQUF2QixFQUErQkksR0FBL0I7O0FBRUEsV0FBTyxJQUFJTixNQUFKLENBQVdFLE1BQVgsQ0FBUDtBQUNEO0FBekJVOztBQTRCYlksT0FBT0MsT0FBUCxHQUFpQmYsTUFBakIiLCJmaWxlIjoiVGFsZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiY29uc3Qge2NvcHlPd25Qcm9wc30gPSByZXF1aXJlKFwiLi91dGlsXCIpO1xuXG5jbGFzcyBUYWxlbnQge1xuXG4gIGNvbnN0cnVjdG9yKHJlY29yZCkge1xuXG4gICAgY29weU93blByb3BzKHRoaXMsIHJlY29yZCk7XG4gIH1cblxuICBzdGF0aWMgYWRkUHJvcGVydHkodGFsZW50LCBrZXlWYWx1ZSkge1xuXG4gICAgY29uc3Qga2V5ID0gUmVmbGVjdC5vd25LZXlzKGtleVZhbHVlKVswXTtcbiAgICBjb25zdCB2YWx1ZURlc2MgPSBSZWZsZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihrZXlWYWx1ZSwga2V5KTtcbiAgICBjb25zdCByZWNvcmQgPSBjb3B5T3duUHJvcHMoe30sIHRhbGVudCk7XG5cbiAgICBSZWZsZWN0LmRlZmluZVByb3BlcnR5KHJlY29yZCwga2V5LCB2YWx1ZURlc2MpO1xuXG4gICAgcmV0dXJuIG5ldyBUYWxlbnQocmVjb3JkKTtcbiAgfVxuXG4gIHN0YXRpYyByZW1vdmVQcm9wZXJ0eSh0YWxlbnQsIGtleSkge1xuXG4gICAgY29uc3QgcmVjb3JkID0gY29weU93blByb3BzKHt9LCB0YWxlbnQpO1xuXG4gICAgUmVmbGVjdC5kZWxldGVQcm9wZXJ0eShyZWNvcmQsIGtleSk7XG5cbiAgICByZXR1cm4gbmV3IFRhbGVudChyZWNvcmQpO1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gVGFsZW50O1xuIl19