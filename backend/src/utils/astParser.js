const fs = require("fs");
const parser = require("@babel/parser");
const traverse = require("@babel/traverse").default;

function parseJavaScriptFile(filePath) {
  const result = {
    imports: [],
    exports: [],
    functions: [],
    classes: [],
  };

  let code;
  try {
    code = fs.readFileSync(filePath, "utf-8");
  } catch (err) {
    return result;
  }

  let ast;
  try {
    ast = parser.parse(code, {
      sourceType: "unambiguous",
      plugins: ["jsx", "typescript"], 
      errorRecovery: true,
    });
  } catch (err) {
    return result;
  }

  try {
    traverse(ast, {
      // 1. Imports
      ImportDeclaration(path) {
        if (path.node.source?.value) {
          result.imports.push(path.node.source.value);
        }
      },

      CallExpression(path) {
        const { callee, arguments: args } = path.node;
        if (
          callee.type === "Identifier" &&
          callee.name === "require" &&
          args.length === 1 &&
          args[0].type === "StringLiteral"
        ) {
          result.imports.push(args[0].value);
        }
      },

      // 2. Exports
      ExportDefaultDeclaration() {
        result.exports.push("default");
      },

      ExportNamedDeclaration(path) {
        const { declaration, specifiers } = path.node;

        // Case A: export function foo() {} OR export class Foo {}
        if (
          declaration &&
          (declaration.type === "FunctionDeclaration" ||
            declaration.type === "ClassDeclaration")
        ) {
          if (declaration.id?.name) {
            result.exports.push(declaration.id.name);
          }
        }

        // Case B: export const foo = 1, bar = 2;
        if (declaration && declaration.type === "VariableDeclaration") {
          declaration.declarations.forEach((decl) => {
            if (decl.id?.name) {
              result.exports.push(decl.id.name);
            }
          });
        }

        // Case C: export { foo, bar as baz }
        if (specifiers && specifiers.length > 0) {
          specifiers.forEach((spec) => {
            if (spec.exported) {
              // Supports Identifier (foo) and StringLiteral ("foo")
              const name = spec.exported.name || spec.exported.value;
              if (name) result.exports.push(name);
            }
          });
        }
      },

      // 3. Functions
      FunctionDeclaration(path) {
        if (path.node.id?.name) {
          result.functions.push(path.node.id.name);
        }
      },

      VariableDeclarator(path) {
        const { id, init } = path.node;

        // Checks for arrow functions or function expressions assigned to variables
        if (
          init &&
          (init.type === "ArrowFunctionExpression" ||
            init.type === "FunctionExpression")
        ) {
          if (id?.name) {
            result.functions.push(id.name);
          }
        }
      },

      // 4. Classes
      ClassDeclaration(path) {
        if (path.node.id?.name) {
          result.classes.push(path.node.id.name);
        }
      },
    });
  } catch (err) {
    // Traverse failure
    return result;
  }

  return result;
}

module.exports = {
  parseJavaScriptFile,
};
