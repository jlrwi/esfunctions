# ESFunctions 
Pure curried functions for basic Javascript operators, methods, and functions. 
## Philosophy 
- Include functions to replace impure Javascript functions and methods 
- Include functions to replace non-unary Javascript functions and methods 
- Include functions to replace Javascript operators 
- Include equivalent functions for objects as for arrays where reasonable 
 
Functions which take two same-typed values follow this convention: 
ESFunctions        | English             | Javascript 
-------------------|---------------------|-------------- 
divide (9) (4)     | divide by 9 with 4  | 4 / 9 
lt (5) (1)         | lt 5 is 1           | 1 < 5 
and (true) (false) | and true with false | false && true 
 
## Functions 
### method 
Invoke a method of an object. 
Syntax: `method(method_name)(arguments)(object)` 
Example: `method("of")(6)(Array)` equates to `Array.of(6)` 
### and 
Boolean and. 
Syntax: `and(boolean)(boolean)` 
Example: `and(true)(false) === false` 
