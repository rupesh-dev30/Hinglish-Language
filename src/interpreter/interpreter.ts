import { parse } from "./parser";

import { tokenize } from "./lexer";
import type { PrintFunction } from "./types";
import { evaluate } from "./evaluator";

export async function interpretHinglish(
  code: string,
  printFunction: PrintFunction
): Promise<void> {
  const tokens = tokenize(code);

  const ast = parse(tokens);

  await evaluate(ast, { print: printFunction });
}
