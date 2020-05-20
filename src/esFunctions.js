/*jslint
    fudge, node
*/

//MD # ESFunctions
//MD Pure curried functions for basic Javascript operators, methods, and ~n
//MD functions.
//MD
//MD Functions which take two same-typed values follow this convention:
//MD ESFunctions        | English             | Javascript
//MD -------------------|---------------------|--------------
//MD divide (9) (4)     | divide by 9, 4      | 4 / 9
//MD lt (5) (1)         | lt 5 is 1           | 1 < 5
//MD and (true) (false) | and true with false | false && true


//test import jscheck from "@jlrwi/jscheck";
//test let jsc = jscheck();
//test const identity = function (x) {
//test     return x;
//test };

const method_call = function (method_name) {
    return function (...args) {
        return function (obj) {
            return obj[method_name](args);
        };
    };
};

// Logic functions

//test jsc.claim({
//test     name: "and/or",
//test     predicate: function (verdict) {
//test         return function (a, b) {
//test             return verdict(and (not (a)) (not (b)) === not(or (a) (b)));
//test         };
//test     },
//test     specifier: [
//test         jsc.boolean(),
//test         jsc.boolean()
//test     ]
//test });

// a -> a -> bool
const and = function (b) {
    return function (a) {
        return a && b;
    };
};

// a -> a -> bool
const or = function (b) {
    return function (a) {
        return a || b;
    };
};

//test jsc.claim({
//test     name: "andf",
//test     predicate: function (verdict) {
//test         return function (a) {
//test             return verdict(not(andf (identity) (not) (a)));
//test         };
//test     },
//test     specifier: [
//test         jsc.boolean()
//test     ]
//test });

// a -> a -> b -> bool
const andf = function (b) {
    return function (a) {
        return function (x) {
            return (a (x) && b (x));
        };
    };
};

//test jsc.claim({
//test     name: "orf",
//test     predicate: function (verdict) {
//test         return function (a) {
//test             return verdict(orf (not) (identity) (a));
//test         };
//test     },
//test     specifier: [
//test         jsc.boolean()
//test     ]
//test });

// a -> a -> b -> bool
const orf = function (b) {
    return function (a) {
        return function (x) {
            return (a (x) || b (x));
        };
    };
};

//test jsc.claim({
//test     name: "not",
//test     predicate: function (verdict) {
//test         return function (value) {
//test             return verdict(Boolean(value) === not(not(value)));
//test         };
//test     },
//test     specifier: [
//test         jsc.any()
//test     ]
//test });

const not = function (x) {
    return !x;
};

const either = function (predicate) {
    return function (if_true) {
        return function (if_false) {
            return function (x) {
                return (
                    predicate (x)
                    ? if_true (x)
                    : if_false (x)
                );
            };
        };
    };
};

// Math functions

//test jsc.claim({
//test     name: "add and multiply",
//test     predicate: function (verdict) {
//test         return function (a, b, c) {
//test             return verdict(
//test                 multiply (
//test                     a
//test                 ) (
//test                     add (b) (c)
//test                 ) === add (
//test                     multiply (a) (b)
//test                 ) (
//test                     multiply (a) (c)
//test                 )
//test             );
//test         };
//test     },
//test     signature: [
//test         jsc.integer(-999, 999),
//test         jsc.integer(-999, 999),
//test         jsc.integer(-999, 999)
//test     ]
//test });

const add = function (y) {
    return function (x) {
        return y + x;
    };
};

const subtract = function (y) {
    return function (x) {
        return y - x;
    };
};

// Tests that should work on the next 4 functions don't because of problems
// with numbers
const multiply = function (y) {
    return function (x) {
        return x * y;
    };
};

const divide = function (y) {
    return function (x) {
        return x / y;
    };
};

// Sign is taken from x
const remainder = function (y) {
    return function (x) {
        return x % y;
    };
};

// Sign is taken from y
const modulus = function (y) {
    return function (x) {
        return (x % y) * (
            Math.sign(x) === Math.sign(y)
            ? 1
            : -1
        );
    };
};

const invert = function (y) {
    return divide (y) (1);
};

const negate = multiply (-1);

const exponent = function (power) {
    return function (x) {
        return Math.pow(x, power);
    };
};

// Primitive comparison

//test jsc.claim({
//test     name: "equals",
//test     predicate: function (verdict) {
//test         return function (a) {
//test             return verdict(equals (a) (a));
//test         };
//test     },
//test     specifier: [
//test         jsc.any()
//test     ]
//test });

const equals = function (y) {
    return function (x) {
        return (
            (Number.isNaN(x) && Number.isNaN(y))
            ? true
            : x === y
        );
    };
};

//test jsc.claim({
//test     name: "lte and gt",
//test     predicate: function (verdict) {
//test         return function (pair) {
//test             return verdict(
//test                 lte (pair[0]) (pair[1]) === gt (pair[1]) (pair[0])
//test             );
//test         };
//test     },
//test     signature: [
//test         jsc.wun_of([
//test             jsc.array(2, jsc.string()),
//test             jsc.array(2, jsc.number(-1, 1)),
//test             jsc.array(2, jsc.integer(-999, 999))
//test         ])
//test     ]
//test });
//test
//test jsc.claim({
//test     name: "lt and gte",
//test     predicate: function (verdict) {
//test         return function (pair) {
//test             return verdict(
//test                 lt (pair[0]) (pair[1]) === gte (pair[1]) (pair[0])
//test             );
//test         };
//test     },
//test     signature: [
//test         jsc.wun_of([
//test             jsc.array(2, jsc.string()),
//test             jsc.array(2, jsc.number(-1, 1)),
//test             jsc.array(2, jsc.integer(-999, 999))
//test         ])
//test     ]
//test });

const lte = function (y) {
    return function (x) {
        return x <= y;
    };
};

const lt = function (y) {
    return function (x) {
        return x < y;
    };
};

const gte = function (y) {
    return function (x) {
        return x >= y;
    };
};

const gt = function (y) {
    return function (x) {
        return x > y;
    };
};

const max = function (y) {
    return function (x) {
        return Math.max(x, y);
    };
};

const min = function (y) {
    return function (x) {
        return Math.min(x, y);
    };
};

// String functions

const string_concat = add;

// Array functions

const array_concat = function (xs) {
    return function (ys) {
        return Object.freeze(xs.concat(ys));
    };
};

const array_insert = function (new_array) {
    return function (at_position) {
        return function (old_array) {
            if (at_position < 0) {
                at_position += old_array.length;
            }

            const front = old_array.slice(0, at_position);
            const back = old_array.slice(at_position);
            return front.concat(new_array, back);
        };
    };
};

const array_join = method_call ("join");

const array_map = function (f) {
    return function (xs) {
        return Object.freeze(xs.map(f));
    };
};

const array_reduce = function (f) {
    return function (initial) {
        return function (xs) {
            let acc = initial;
            xs.forEach (function (val) {
                acc = f (acc) (val);
            });
            return acc;
        };
    };
};

const array_reverse = function (xs) {
    return xs.slice().reverse();
};

const array_split = method_call ("split");

//test jsc.claim({
//test     name: "array join and split",
//test     predicate: function (verdict) {
//test         return function (array_of_string) {
//test             const joined = array_join ("~") (array_of_string);
//test             return verdict(
//test                 joined === array_join ("~") (array_split ("~") (joined))
//test             );
//test         };
//test     },
//test     signature: [
//test         jsc.array(jsc.integer(10), jsc.string())
//test     ]
//test });

// Object functions

const empty_object = function () {
    return Object.create(null);
};

// Doesn't resolve Map or Set
const is_object = function (x) {
    return (
        typeof x === "object"
        ? (x !== null) && !Array.isArray(x)
        : false
    );
};

const minimal_object = function (obj) {
    return Object.freeze(
        Object.assign(empty_object(), obj)
    );
};

/*
Both in and hasOwnProperty() report true if a property is set to undefined
There should be no varieties or degrees of nothingness
*/
const object_has_property = function (key) {
    return function (obj) {
        return (obj[key] !== undefined);
    };
};

// Performs shallow copy with a's properties overwriting duplicates in b
const object_concat = function (b) {
    return function (a) {
        return Object.freeze(
            Object.assign(empty_object (), b, a)
        );
    };
};

const object_create_pair = function (key) {
    return function (val) {
        return minimal_object (
            Object.fromEntries([[key, val]])
        );
    };
};

const prop = function (name) {
    return function (o) {
        return o[name];
    };
};

// Miscellaneous functions

const functional_if = function (predicate) {
    return function (on_true, on_false) {
        return function (x) {
            return (
                predicate (x)
                ? on_true (x)
                : on_false (x)
            );
        };
    };
};

const log = function (x) {
    console.log(x);
    return x;
};

const type_check = function (type_name) {
    return function (x) {
        const type_result = typeof x;
        return (type_result === type_name);
    };
};

/*
JSLint doesn't like, because of unpredictability of prototype chain?
const instance_check = function (type) {
    return function (x) {
        return (x instanceof type);
    };
};
*/

//test jsc.check({
//test     on_report: console.log
//test });

export {
    equals,
    lte,
    lt,
    gte,
    gt,
    min,
    max,

    add,
    subtract,
    multiply,
    divide,
    remainder,
    modulus,
    exponent,
    invert,
    negate,

    and,
    or,
    andf,
    orf,
    not,
    either,

    string_concat,

    array_concat,
    array_insert,
    array_join,
    array_map,
    array_reduce,
    array_reverse,
    array_split,

    prop,
    empty_object,
    minimal_object,
    object_concat,
    object_create_pair,
    object_has_property,
    is_object,

    functional_if,
    log,
    type_check
};