import { type ASTNode, NodeType, type RuntimeEnvironment } from "./types";

export async function evaluate(
  node: ASTNode,
  environment: RuntimeEnvironment
): Promise<string | number | void> {
  switch (node.type) {
    case NodeType.PROGRAM:
      return evaluateProgram(node, environment);
    case NodeType.PRINT:
      return evaluatePrint(node, environment);
    case NodeType.VARIABLE_DECLARATION:
      return evaluateVariableDeclaration(node, environment);
    case NodeType.ASSIGNMENT:
      return evaluateAssignment(node, environment);
    case NodeType.VARIABLE:
      return evaluateVariable(node);
    case NodeType.NUMBER:
    case NodeType.STRING:
      return node.value!;
    case NodeType.ADDITION:
      return evaluateAddition(node, environment);
    case NodeType.SUBTRACTION:
      return evaluateSubtraction(node, environment);
    case NodeType.MULTIPLICATION:
      return evaluateMultiplication(node, environment);
    case NodeType.DIVISION:
      return evaluateDivision(node, environment);
    default:
      throw new Error(`Unknown node type: ${node.type}`);
  }
}

// ✅ Strongly-typed environment for storing variables
const variables: Record<string, string | number> = {};

async function evaluateProgram(
  node: ASTNode,
  environment: RuntimeEnvironment
): Promise<void> {
  for (const statement of node.statements ?? []) {
    await evaluate(statement, environment);
  }
}

async function evaluatePrint(
  node: ASTNode,
  environment: RuntimeEnvironment
): Promise<void> {
  const value = await evaluate(node.expression!, environment);
  environment.print(String(value));
}

async function evaluateVariableDeclaration(
  node: ASTNode,
  environment: RuntimeEnvironment
): Promise<void> {
  const name = node.name!;
  const value = await evaluate(node.expression!, environment);
  variables[name] = value as string | number;
}

async function evaluateAssignment(
  node: ASTNode,
  environment: RuntimeEnvironment
): Promise<void> {
  const name = node.name!;
  const value = await evaluate(node.expression!, environment);

  if (!(name in variables)) {
    throw new Error(`Variable '${name}' has not been declared`);
  }

  variables[name] = value as string | number;
}

function evaluateVariable(node: ASTNode): string | number {
  const name = node.name!;

  if (!(name in variables)) {
    throw new Error(`Variable '${name}' has not been declared`);
  }

  return variables[name];
}

async function evaluateAddition(
  node: ASTNode,
  environment: RuntimeEnvironment
): Promise<string | number> {
  const left = await evaluate(node.left!, environment);
  const right = await evaluate(node.right!, environment);

  // If either operand is a string, perform string concatenation
  if (typeof left === "string" || typeof right === "string") {
    return String(left) + String(right);
  }

  // Otherwise, perform numeric addition
  return (left as number) + (right as number);
}

async function evaluateSubtraction(
  node: ASTNode,
  environment: RuntimeEnvironment
): Promise<number> {
  const left = await evaluate(node.left!, environment);
  const right = await evaluate(node.right!, environment);
  return (left as number) - (right as number);
}

async function evaluateMultiplication(
  node: ASTNode,
  environment: RuntimeEnvironment
): Promise<number> {
  const left = await evaluate(node.left!, environment);
  const right = await evaluate(node.right!, environment);
  return (left as number) * (right as number);
}

async function evaluateDivision(
  node: ASTNode,
  environment: RuntimeEnvironment
): Promise<number> {
  const left = await evaluate(node.left!, environment);
  const right = await evaluate(node.right!, environment);

  if (right === 0) {
    throw new Error("Arrey bhai, zero se divide nahi kar sakte!");
  }

  return (left as number) / (right as number);
}
