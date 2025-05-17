import { parse } from "./parser";

import { tokenize } from "./lexer";
import type { PrintFunction } from "./types";
import { evaluate } from "./evaluator";

export async function interpretHinglish(
  code: string,
  printFunction: PrintFunction
): Promise<void> {
  const tokens = tokenize(code);
  console.log("TOKEN IS : ", tokens);

  const ast = parse(tokens);
  console.log("AST : ", ast);

  await evaluate(ast, { print: printFunction });
}
