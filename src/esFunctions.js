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
            return (a(x) && b(x));
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
            return (a(x) || b(x));
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
//test     name: "functional_if, lt, add, negate",
//test     predicate: function (verdict) {
//test         return function (value) {
//test             return verdict(
//test                 functional_if (
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
                console.log(
                    "DEPRECATED: use functional_if() instead of either()"
                );
                return (
                    predicate(x)
                    ? if_true(x)
                    : if_false(x)
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
    return divide(y)(1);
};

const negate = function (x) {
    return -x;
};

//test jsc.claim({
//test     name: "multiply, divide, and remainder",
//test     predicate: function (verdict) {
//test         return function (a, b) {
//test             return verdict((
//test                 Math.trunc(divide (b) (a)) * b
//test             ) + (
//test                 remainder (b) (a)
//test             ) === a);
//test         };
//test     },
//test     signature: [
//test         jsc.integer(-99, 99),
//test         jsc.wun_of([jsc.integer(-9, -1), jsc.integer(1, 9)])
//test     ]
//test });

// Sign is taken from x
const remainder = function (y) {
    return function (x) {
        return x % y;
    };
};

//test jsc.claim({
//test     name: "remainder and modulus",
//test     predicate: function (verdict) {
//test         return function (a, b) {
//test             return verdict((
//test                 remainder (b) (a) * Math.sign(a)
//test             ) === (
//test                 modulus (b) (a) * Math.sign(b)
//test             ));
//test         };
//test     },
//test     signature: [
//test         jsc.integer(-99, 99),
//test         jsc.wun_of([jsc.integer(-9, -1), jsc.integer(1, 9)])
//test     ]
//test });

// Sign is taken from y
const modulus = function (y) {
    return function (x) {
        return (x % y) * (Math.sign(x) * Math.sign(y));
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

//test jsc.claim({
//test     name: "min, max, and add",
//test     predicate: function (verdict) {
//test         return function (a, b) {
//test             return verdict(max (a) (b) + min (a) (b) === a + b);
//test         };
//test     },
//test     signature: [
//test         jsc.integer(),
//test         jsc.integer()
//test     ]
//test });

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

//test jsc.claim({
//test     name: "string_concat",
//test     predicate: function (verdict) {
//test         return function (a, b, c) {
//test             return verdict(
//test                 string_concat (
//test                     string_concat (a) (b)
//test                 ) (c) == string_concat (a) (
//test                     string_concat (b) (c)
//test                 )
//test             );
//test         };
//test     },
//test     signature: [
//test         jsc.string(),
//test         jsc.string(),
//test         jsc.string()
//test     ]
//test });

const string_concat = add;
const string_split = method("split");

// Array functions

const array_concat = function (xs) {
    return function (ys) {
        return Object.freeze(xs.concat(ys));
    };
};

//test jsc.claim({
//test     name: "array_append and array_reduce",
//test     predicate: function (verdict) {
//test         return function (list, x) {
//test             const reducer = array_reduce (add) (0);
//test             return verdict(
//test                 add (
//test                     reducer (list)
//test                 ) (
//test                     x
//test                 ) === reducer (
//test                     array_append (x) (list)
//test                 )
//test             );
//test         };
//test     },
//test     signature: [
//test         jsc.array(),
//test         jsc.integer()
//test     ]
//test });

const array_append = function (x) {
    return function (xs) {
        return array_concat(xs)([x]);
    };
};


//test jsc.claim({
//test     name: "array_create",
//test     predicate: function (verdict) {
//test         return function (a, b) {
//test             const reducer = array_reduce (add) (0);
//test             return verdict(
//test                 array_reduce (add) (0) (array_create (a) (b)) === a * b
//test             );
//test         };
//test     },
//test     signature: [
//test         jsc.integer(),
//test         jsc.integer()
//test     ]
//test });

const array_create = function (fill_with) {
    return function (size) {
        const result = new Array(size).fill(fill_with);
        return Object.freeze(result);
    };
};

//test jsc.claim({
//test     name: "array_insert, array_drop, and array_join",
//test     predicate: function (verdict) {
//test         return function (list_a, list_b, position) {
//test             if (Math.abs(position) > list_a.length) {
//test                 position = (
//test                     (10 - Math.abs(position) < list_a.length)
//test                     ? Math.abs(position) - (10 - list_a.length)
//test                     : list_a.length
//test                 ) * Math.sign(position);
//test             }
//test             const new_list = array_insert (position) (list_b) (list_a);
//test             const revert = (
//test                 (position < 0)
//test                 ? array_drop (position - list_b.length, position)
//test                 : array_drop (position, position + list_b.length)
//test             ) (
//test                 new_list
//test             );
//test             return verdict(
//test                 array_join () (list_a) === array_join () (revert)
//test             );
//test         };
//test     },
//test     signature: [
//test         jsc.array(jsc.integer(10), jsc.string()),
//test         jsc.array(jsc.integer(10), jsc.string()),
//test         jsc.integer(-10, 10)
//test     ]
//test });

// Flipped arg order for first 2, refactored return - breaking change from 1.2.0
const array_insert = function (at_position) {
    return function (new_array) {
        return function (old_array) {
            return [
                ...old_array.slice(0, at_position),
                ...new_array,
                ...old_array.slice(at_position)
            ];
        };
    };
};

// like slice (inverse), dropped portion includes first position up to and not
// including the second
const array_drop = function (drop_from, drop_to) {
    return function (list) {

        if (drop_from === undefined) {
            drop_from = 0;
        }

// if no drop_to, functions like slice
        if (drop_to === undefined) {
            return list.slice(0, drop_from);
        }

        return [
            ...list.slice(0, drop_from),
            ...list.slice(drop_to)
        ];
    };
};

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

const array_join = method("join");

const array_slice = method("slice");

// Use a function to combine two arrays into one array going element by element
// e.g. make array with minimum values at each index:
//      array_zip (min) (list_a) (list_b)
// (a -> b -> c) -> [a] -> [b] -> [c]
const array_zip = function (zipper) {
    return function (list1) {
        return function (list2) {
            return list1.map(function (item, index) {
                return zipper(item)(list2[index]);
            });
        };
    };
};

const array_filter = method("filter");

const array_map = function (f) {
    return function (xs) {
        return Object.freeze(xs.map(f));
    };
};

const array_reduce = function (f) {
    return function (initial) {
        return function (xs) {
            let acc = initial;

// can't use .reduce because f is curried
            xs.forEach(function (val) {
                acc = f(acc)(val);
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
            Object.assign(empty_object(), b, a)
        );
    };
};

// switched arg order
const object_append = function (key) {
    return function (val) {
        return function (obj) {
            return object_concat(obj)(Object.fromEntries([[key, val]]));
        };
    };
};

const object_delete_key = function (key) {
    return function (obj) {
        let result = Object.assign(empty_object(), obj);
        delete result[key];
        return Object.freeze(result);
    };
};

const object_drop = function (key_list) {
    return function (obj) {
        return Object.freeze(
            Object.fromEntries(
                Object.entries(obj).filter(
                    function (key_val_pair) {
                        return !key_list.includes(key_val_pair[0]);
                    }
                )
            )
        );
    };
};

const object_filter = function (predicate) {
    return function (obj) {
        return Object.freeze(
            Object.fromEntries(
                Object.entries(obj).filter(
                    function (key_val_pair) {
                        return predicate(key_val_pair[1]);
                    }
                )
            )
        );
    };
};

const object_create_pair = function (key) {
    return function (val) {
        return minimal_object(
            Object.fromEntries([[key, val]])
        );
    };
};

const object_map = function (f) {
    return function (xs) {
        return Object.freeze(
            Object.fromEntries(
                Object.entries(xs).map(
                    function ([key, value]) {
                        return [
                            key,
                            f(value)
                        ];
                    }
                )
            )
        );
    };
};

// (c -> {a: b} -> c) -> c -> {a: b} -> c
const object_reduce = function (f) {
    return function (initial) {
        return function (obj) {
            let acc = initial;
            Object.entries(obj).forEach(function (key_val) {
                acc = f(
                    acc
                )(
                    object_create_pair(key_val[0])(key_val[1])
                );
            });
            return Object.freeze(acc);
        };
    };
};

const prop = function (name) {
    return function (o) {
        return o[name];
    };
};

const map_new = function (contents) {
    console.log("DEPRECATED: use functional_new(Map) instead of map_new()");
    return functional_new(Map)(contents);
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

// Not yet added to export - is it useful?
/*
const get_prototype_list = function (obj) {
    let list = [];
    const descender = function (o) {
        const proto = Object.getPrototypeOf(o);
        if (proto !== null) {
            list.push(proto);
            descender(proto);
        }
    };

    descender(obj);
    return list;
};
*/

// Miscellaneous functions

// Not needed?
const spread_apply = function (f) {
    return function (args_array) {
        return f(...args_array);
    };
};

//const rest = function (...args) {
//    return args;
//};

/*
Same as either (now deprecated)
Breaking change after 3.1 - curried on_true, on_false
*/
const functional_if = function (predicate) {
    return function (on_true) {
        return function (on_false) {
            return function (x) {
                return (
                    predicate(x)
                    ? on_true(x)
                    : on_false(x)
                );
            };
        };
    };
};

// JSLint doesn't like omitting the inner function
const functional_new = function (Constructor) {
    return function (...args) {
        return new Constructor(...args);
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
    either,     // deprecated

    string_concat,
    string_split,

    array_append,
    array_concat,
    array_create,
    array_drop,
    array_filter,
    array_insert,
    array_join,
    array_map,
    array_reduce,
    array_reverse,
    array_slice,
    array_zip,

    prop,
    empty_object,
    minimal_object,
    object_append,
    object_concat,
    object_create_pair,
    object_delete_key,
    object_drop,
    object_filter,
    object_has_property,
    object_map,
    object_reduce,
    is_object,

    map_new,
    map_get,
    map_has,
    map_append,

    functional_if,
    functional_new,
    log,
    method,
    spread_apply,
    type_check
};