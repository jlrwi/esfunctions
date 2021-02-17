/*jslint
    fudge, node
*/

//MD # ESFunctions/p
//MD Pure curried functions for basic Javascript operators, methods, and
//MD functions./p
//MD /p
//MD Functions which take two same-typed values follow this convention:/p
//MD ESFunctions        | English             | Javascript/p
//MD -------------------|---------------------|--------------/p
//MD divide (9) (4)     | divide by 9 with 4  | 4 / 9/p
//MD lt (5) (1)         | lt 5 is 1           | 1 < 5/p
//MD and (true) (false) | and true with false | false && true/p


//test import jscheck from "@jlrwi/jscheck";
//test let jsc = jscheck();
//test const identity = function (x) {
//test     return x;
//test };

const method = function (method_name) {
    return function (...args) {
        return function (obj) {
            return obj[method_name](...args);
        };
    };
};

// Logic functions

//test jsc.claim({
//test     name: "and/or/not",
//test     predicate: function (verdict) {
//test         return function (a, b) {
//test             return verdict(and (not (a)) (not (b)) === not(or (a) (b)));
//test         };
//test     },
//test     signature: [
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
//test     signature: [
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
//test     signature: [
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
//test     signature: [
//test         jsc.any()
//test     ]
//test });

const not = function (x) {
    return !x;
};

//test jsc.claim({
//test     name: "either, lt, add, negate",
//test     predicate: function (verdict) {
//test         return function (value) {
//test             return verdict(
//test                 either (
//test                     lt (0)
//test                 ) (
//test                     negate
//test                 ) (
//test                     add (0)
//test                 ) (
//test                     value
//test                 ) === Math.abs(value)
//test             );
//test         };
//test     },
//test     signature: [
//test         jsc.integer(-99999, 99999)
//test     ]
//test });

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

//test jsc.claim({
//test     name: "subtract, add, and negate",
//test     predicate: function (verdict) {
//test         return function (a, b) {
//test             return verdict(subtract (a) (b) === add (a) (negate (b)));
//test         };
//test     },
//test     signature: [
//test         jsc.integer(-999, 999),
//test         jsc.integer(-999, 999)
//test     ]
//test });

const subtract = function (y) {
    return function (x) {
        return y - x;
    };
};

//test jsc.claim({
//test     name: "multiply and divide",
//test     predicate: function (verdict) {
//test         return function (a, b) {
//test             return verdict(divide (b) (multiply (a) (b)) === a);
//test         };
//test     },
//test     signature: [
//test         jsc.integer(),
//test         jsc.integer()
//test     ]
//test });

const multiply = function (y) {
    return function (x) {
        return x * y;
    };
};

// Tests that should work on the next 2 functions don't because of problems
// with numbers
const divide = function (y) {
    return function (x) {
        return x / y;
    };
};

//test jsc.claim({
//test     name: "multiply and invert",
//test     predicate: function (verdict) {
//test         return function (a) {
//test             return verdict(multiply (2**a) (invert (2**a)) === 1);
//test         };
//test     },
//test     signature: [
//test         jsc.integer(-99,99)
//test     ]
//test });

const invert = function (y) {
    return divide (y) (1);
};

const negate = multiply (-1);

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

//test jsc.claim({
//test     name: "divider",
//test     predicate: function (verdict) {
//test         return function (a, b) {
//test             const result = divider (a) (b);
//test             return verdict(
//test                 (result.quotient * a) + result.remainder === b
//test             );
//test         };
//test     },
//test     signature: [
//test         jsc.integer(-999,999),
//test         jsc.integer(-999,999)
//test     ]
//test });

const divider = function (divisor) {
    return function (dividend) {
        const q = Math.trunc(dividend / divisor);
        return Object.freeze({
            quotient: q,
            remainder: dividend - (q * divisor)
        });
    };
};

//test jsc.claim({
//test     name: "method and exponent",
//test     predicate: function (verdict) {
//test         return function (base, power) {
//test             return verdict(
//test                 exponent (
//test                     power
//test                 ) (
//test                     base
//test                 ) === method ("pow") (base, power) (Math)
//test             );
//test         };
//test     },
//test     signature: [
//test         jsc.integer(99),
//test         jsc.integer(5)
//test     ]
//test });

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
//test     signature: [
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
const string_split = method ("split");

// Array functions

const array_concat = function (xs) {
    return function (ys) {
        return Object.freeze(xs.concat(ys));
    };
};

const array_append = function (xs) {
    return function (x) {
        return array_concat (xs) ([x]);
    };
};

const array_create = function (fill_with) {
    return function (size) {
        const arr = new Array(size).fill(fill_with);
        return Object.freeze(arr);
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

const array_join = method ("join");

//test jsc.claim({
//test     name: "array join and string split",
//test     predicate: function (verdict) {
//test         return function (array_of_string) {
//test             const joined = array_join ("~") (array_of_string);
//test             return verdict(
//test                 joined === array_join ("~") (string_split ("~") (joined))
//test             );
//test         };
//test     },
//test     signature: [
//test         jsc.array(jsc.integer(10), jsc.string())
//test     ]
//test });

const array_slice = method ("slice");

// (a -> b -> c) -> [a] -> [b] -> [c]
const array_zip = function (zipper) {
    return function (list1) {
        return function (list2) {
            let result = [];

            list1.forEach(function (item, index) {
                result.push(zipper (item) (list2[index]));
            });

            return result;
        };
    };
};

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

// Object functions

const null_prototype = Object.getPrototypeOf({});

const empty_object = function () {
    return Object.create(null);
};

// Prototype checks only allow {} or Object.create(null)
// Otherwise doesn't resolve Map or Set
const is_object = function (x) {
    return (
        typeof x === "object"
        ? (x !== null) && !Array.isArray(x) && (
            (Object.getPrototypeOf(x) === null_prototype) ||
            (Object.getPrototypeOf(x) === null)
        )
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

const object_append = function (obj) {
    return function (key) {
        return function (val) {
            return object_concat (obj) (Object.fromEntries([[key, val]]));
        };
    };
};

const object_create_pair = function (key) {
    return function (val) {
        return minimal_object (
            Object.fromEntries([[key, val]])
        );
    };
};

const object_map = function (f) {
    return function (obj) {
        let result = Object.create(null);
        Object.keys(obj).forEach(function (key) {
            result[key] = f(obj[key]);
        });
        return Object.freeze(result);
    };
};

const prop = function (name) {
    return function (o) {
        return o[name];
    };
};

const map_new = function (contents) {
    return new Map(contents);
};

const map_get = function (key) {
    return function (m) {
        return m.get(key);
    };
};

const map_append = function (m) {
    return function (key) {
        return function (val) {
            const result = map_new(m);
            return result.set(key, val);
        };
    };
};

const map_has = function (key) {
    return function (m) {
        return m.has(key);
    };
};

const get_prototype_list = function (obj) {
    let list = [];
    const descender = function (o) {
        const proto = Object.getPrototypeOf(o);
        if (proto !== null) {
            list.push(proto);
            descender (proto);
        }
    };

    descender(obj);
    return list;
};

/*
const propN = function (...args) {
    return pipeN(
        array_reverse,
        array_map (prop),
        spread_apply (pipeN)
    ) (
        args
    );
};
*/

// Miscellaneous functions

const spread_apply = function (f) {
    return function (args_array) {
        return f(...args_array);
    };
};

//const rest = function (...args) {
//    return args;
//};

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
    divider,
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
    string_split,

    array_append,
    array_concat,
    array_create,
    array_insert,
    array_join,
    array_map,
    array_reduce,
    array_reverse,
    array_slice,
    array_zip,

    prop,
//    propN,
    empty_object,
    minimal_object,
    object_append,
    object_concat,
    object_create_pair,
    object_has_property,
    object_map,
    is_object,

    map_new,
    map_get,
    map_has,
    map_append,

    functional_if,
    log,
    method,
    spread_apply,
    type_check
};