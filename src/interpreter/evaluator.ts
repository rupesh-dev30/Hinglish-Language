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

  if (value === undefined) {
    throw new Error(`Variable declaration for '${name}' must have a value`);
  }

  variables[name] = isNumeric(value) ? Number(value) : value;
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

  if (value === undefined) {
    throw new Error(`Assignment to '${name}' must have a value`);
  }

  variables[name] = isNumeric(value) ? Number(value) : value;
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
  return Number(left) + Number(right);
}

async function evaluateSubtraction(
  node: ASTNode,
  environment: RuntimeEnvironment
): Promise<number> {
  const left = await evaluate(node.left!, environment);
  const right = await evaluate(node.right!, environment);
  return Number(left) - Number(right);
}

async function evaluateMultiplication(
  node: ASTNode,
  environment: RuntimeEnvironment
): Promise<number> {
  const left = await evaluate(node.left!, environment);
  const right = await evaluate(node.right!, environment);
  return Number(left) * Number(right);
}

async function evaluateDivision(
  node: ASTNode,
  environment: RuntimeEnvironment
): Promise<number> {
  const left = await evaluate(node.left!, environment);
  const right = await evaluate(node.right!, environment);

  if (Number(right) === 0) {
    throw new Error("Arrey bhai, zero se divide nahi kar sakte!");
  }

  return Number(left) / Number(right);
}

// Helper function to check if a value can be converted to a number
function isNumeric(value: unknown): boolean {
  return !isNaN(Number(value));
}
