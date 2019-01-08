[![Build Status](https://travis-ci.org/ottopecz/talentcomposer.svg?branch=master)](https://travis-ci.org/ottopecz/talentcomposer)[![Coverage Status](https://coveralls.io/repos/github/ottopecz/talentcomposer/badge.svg?branch=master)](https://coveralls.io/github/ottopecz/talentcomposer?branch=master)[![Dependency status](https://david-dm.org/ottopecz/talentcomposer/status.svg)](https://david-dm.org/ottopecz/talentcomposer#info=dependencies) [![devDependency Status](https://david-dm.org/ottopecz/talentcomposer/dev-status.svg)](https://david-dm.org/ottopecz/talentcomposer#info=devDependencies)

[![NPM](https://nodei.co/npm/talentcomposer.png?downloads=true)](https://www.npmjs.com/package/talentcomposer/)

# talentcomposer

The **talentcomposer** is a tool which can compose pieces of capabilities (talents) with each other and also talents with an instance. This tool can help you to do [role oriented programming](https://en.wikipedia.org/wiki/Role-oriented_programming). The implementation is based on the [publication](http://scg.unibe.ch/archive/papers/Ress12eTalentsSPE.pdf) of the Software Composition Group part of the Institute of Computer Science (INF) at the University of Bern

##Supported engines

node v8 and v10

## Notes

1. The package [mainliner](https://www.npmjs.com/package/mainliner) utilizes this package.
1. Conflict resolution between talents is explicit. The programmer has to resolve conflicts using either the alias or the exclude method. See below in the examples
2. Conflict resolution between an instance and talents is implicit. The member will delegated on to the instance blindly. If there is already a member on the instance with same name it's gonna be shadowed or overridden.
3. Although the publication allows stateful talents I would **NOT** not recommend to use them with this tool. Like **DON'T** do this (It's leaking anyway)

```javascript
const Composer = require("talentcomposer");
let x = 0;

module.export = Composer.createTalent({
  method() {

    x += 1;

    return x;
  }
});
```

## Examples

### Composing an instance with talents

```javascript
const assert = require("assert");
const Composer = require("talentcomposer");

class Person {
  constructor(name) {
    this.name = name;
  }
  eating() {}
  sleeping() {}
}

const studentTalent = Composer.createTalent({
  studying() {}
});

const teacherTalent = Composer.createTalent({
  teaching() {}
});

const sportTalent = Composer.createTalent({
  swimming() {}
});

let travis = new Person("Travis");
let mavis = new Person("Mavis");

travis = Composer.composeWithTalents(travis, studentTalent, sportTalent);
mavis = Composer.composeWithTalents(mavis, teacherTalent, sportTalent);

assert.ok(travis.studying);
assert.ok(travis.swimming);
assert.ok(mavis.teaching);
assert.ok(mavis.swimming);
```

### Composing talents

```javascript
const assert = require("assert");
const Composer = require("talentcomposer");

const circusTalent = Composer.createTalent({
  juggling() {},
  clowning() {}
});

const sportTalent = Composer.createTalent({
  running() {},
  swimming() {}
});

combinedTalents = Composer.composeTalents(circusTalent, sportTalent);

assert.ok(combinedTalents.juggling);
assert.deepEqual(combinedTalents.juggling, circusTalent.juggling);
assert.ok(combinedTalents.clowning);
assert.deepEqual(combinedTalents.clowning, circusTalent.clowning);
assert.ok(combinedTalents.running);
assert.deepEqual(combinedTalents.running, sportTalent.running);
assert.ok(combinedTalents.swimming);
assert.deepEqual(combinedTalents.swimming, sportTalent.swimming);
```

### Require an unimplemented capability

```javascript
const assert = require("assert");
const Composer = require("talentcomposer");

class Person {
  constructor(name) {
    this.name = name;
  }
  eating() {}
  sleeping() {}
}

const courierTalent = Composer.createTalent({
  "cycling": Composer.required,
  delivering() {
    this.cycling();
  }
});

const sportTalent = Composer.createTalent({
  cycling() {}
});

let travis = new Person("Travis");

travis = Composer.composeWithTalents(travis, courierTalent, sportTalent);

assert.ok(travis.cycling);
assert.deepEqual(travis.cycling, sportTalent.cycling);
assert.ok(travis.delivering);
assert.deepEqual(travis.delivering, courierTalent.delivering);
```

### Require an unimplemented capability on the prototype of a class

```javascript
const assert = require("assert");
const Composer = require("talentcomposer");

class Person {
  constructor(name) {
    this.name = name;
  }
  get drawing() {
    return Composer.required;
  }
  eating() {}
  sleeping() {}
}

const artTalent = Composer.createTalent({
  drawing() {}
});

let travis = new Person("Travis");

travis = Composer.composeWithTalents(travis, artTalent);

assert.ok(travis.drawing);
assert.deepEqual(travis.drawing, artTalent.drawing);
```

### Require an unimplemented capability in the constructor of a class

```javascript
const assert = require("assert");
const Composer = require("talentcomposer");

class Person {
  constructor(name) {
    this.name = name;
    this.painting = Composer.required;
  }
  eating() {}
  sleeping() {}
}

const artTalent = Composer.createTalent({
  painting() {}
});

let travis = new Person("Travis");

travis = Composer.composeWithTalents(travis, artTalent);

assert.ok(travis.painting);
assert.deepEqual(travis.painting, artTalent.painting);
```

### Explicit conflict resolution (aliasing)

```javascript
const assert = require("assert");
const Composer = require("talentcomposer");

const courierTalent = Composer.createTalent({
  cycling() {console.log("like a courier");}
});

const sportTalent = Composer.createTalent({
  cycling() {console.log("like an athlete");}
});

combinedTalents = Composer.composeTalents(
    courierTalent,
    Composer.alias(sportTalent, "cycling", "riding")
);

assert.ok(combinedTalents.cycling);
assert.deepEqual(combinedTalents.cycling, courierTalent.cycling);
assert.ok(combinedTalents.riding);
assert.deepEqual(combinedTalents.riding, sportTalent.cycling);
```

### Explicit conflict resolution (excluding)

```javascript
const assert = require("assert");
const Composer = require("talentcomposer");

const courierTalent = Composer.createTalent({
  cycling() {console.log("like a courier");},
  delivering() {}
});

const sportTalent = Composer.createTalent({
  cycling() {console.log("like a athlete");},
  swimming() {}
});

combinedTalents = Composer.composeTalents(
    courierTalent,
    Composer.exclude(sportTalent, "cycling")
);

assert.ok(combinedTalents.cycling);
assert.deepEqual(combinedTalents.cycling, courierTalent.cycling);
assert.ok(combinedTalents.cycling);
assert.deepEqual(combinedTalents.cycling, courierTalent.cycling);
assert.ok(combinedTalents.delivering);
assert.deepEqual(combinedTalents.delivering, courierTalent.delivering);
```

## API

### createTalent(record: Object): Talent 

Creates a new talent

### composeWithTalents(instance: Object, ...talents: Talent[]): Object

Composes talents with an instantiated object

### composeTalents(...talents: Talent[]): Talent

Composes talents into one

### alias(talent: Talent, methodName: string, alias: string): Talent

Aliases a method of the talent
(It doesn't mutate the talent but returns a new one)

### exclude(talent: Talent, methodName: string): Talent

Excludes a method of the talent
(It doesn't mutate the talent but returns a new one)

### required: Symbol

Property to mark required members for talents
