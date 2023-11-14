export const meta = {
    type: 'problem',
    hasSuggestions: true,
    fixable: true,
  };
  
  export function create(context) {
    return {
      BinaryExpression(node){
            var sourceCode = context.getSource();
            var scope = context.getScope();
        
          var lValue = undefined;
            var lType = undefined;
          var rValue = undefined;
            var rType = undefined;
        
            if(node.left.type === "Identifier"){
            scope.variables.map((v)=> {
              if(v.name===node.left.name){
                lValue = v.identifiers[0].parent.init.value
              lType = typeof lValue;
            }
            });
          }
        
            if(node.right.type === "Literal"){
              console.log("!!")
              rValue = node.right.value;
                rType = typeof rValue;
          }
        
        
            if(lType != rType){
              if(lType === "string" && rType === "number" ) {
                var value = lValue+rValue;
                context.report({
                  node,
                  message: "Coersion: string('"+lValue+"') + toString("+rValue+") = '" + value + "'"
                })
              }
          }else{
              context.report({
                  node,
                  message: "Types are equal. No coersion happening."
              }) 
          }
      },
    };
  };