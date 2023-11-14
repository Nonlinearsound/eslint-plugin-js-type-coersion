/**
 * @fileoverview Finds type coersion in additive operators
 * @author Carsten Brueggmann
 */
"use strict";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

/** @type {import('eslint').Rule.RuleModule} */
module.exports = {
  meta: {
    type: null, // `problem`, `suggestion`, or `layout`
    docs: {
      description: "Finds type coersion in additive operators",
      recommended: false,
      url: null, // URL to the documentation page for this rule
    },
    fixable: null, // Or `code` or `whitespace`
    schema: [], // Add a schema if the rule has options
  },

  create(context) {
    // variables should be defined here

    return {
      // visitor functions for different types of nodes
      BinaryExpression(node) {
        var sourceCode = context.getSource();
        var scope = context.getScope();

        var lValue = undefined;
        var lType = undefined;
        var rValue = undefined;
        var rType = undefined;

        if (node.left.type === "Identifier") {
          scope.variables.map((v) => {
            if (v.name === node.left.name) {
              lValue = v.identifiers[0].parent.init.value;
              lType = typeof lValue;
            }
          });
        }

        if (node.right.type === "Literal") {
          console.log("!!");
          rValue = node.right.value;
          rType = typeof rValue;
        }

        if (lType != rType) {
          if (lType === "string" && rType === "number") {
            var value = lValue + rValue;
            context.report({
              node,
              message:
                "Coersion: string('" +
                lValue +
                "') + toString(" +
                rValue +
                ") = '" +
                value +
                "'",
            });
          }
        } else {
          context.report({
            node,
            message: "Types are equal. No coersion happening.",
          });
        }
      },
    };
  },
};
