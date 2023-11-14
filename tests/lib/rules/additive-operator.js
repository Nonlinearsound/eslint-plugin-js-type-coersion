/**
 * @fileoverview Finds type coersion in additive operators
 * @author Carsten Brueggmann
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const rule = require("../../../lib/rules/additive-operator"),
  RuleTester = require("eslint").RuleTester;


//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

const ruleTester = new RuleTester();
ruleTester.run("additive-operator", rule, {
  valid: [
    // give me some code that won't trigger a warning
    "const a=5; const foo=a+5;"
  ],

  invalid: [
    {
      code: "const a='A'; const foo = a+5;",
      errors: [{ message: "Fill me in.", type: "Me too" }],
    },
  ],
});
