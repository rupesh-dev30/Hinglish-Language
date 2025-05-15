// TOKEN TYPES
export const TokenType = {
  // KEYWORDS
  PRINT: 0,
  IF: 1,
  ELSE: 2,
  WHILE: 3,
  VARIABLE_DECLARATION: 4,

  // LITERALS
  IDENTIFIER: 5,
  NUMBER: 6,
  STRING: 7,

  // OPERATORS
  PLUS: 8,
  MINUS: 9,
  MULTIPLY: 10,
  DIVIDE: 11,
  EQUALS: 12,

  // PUNCTUATIONS
  SEMICOLON: 13,

  EOL: 14,
  EOF: 15,
} as const;

export type TokenType = (typeof TokenType)[keyof typeof TokenType];

// AST NODE TYPES
export const NodeType = {
  PROGRAM: 0,
  PRINT: 1,
  VARIABLE_DECLARATION: 2,
  ASSIGNMENT: 3,
  VARIABLE: 4,
  NUMBER: 5,
  STRING: 6,
  ADDITION: 7,
  SUBTRACTION: 8,
  MULTIPLICATION: 9,
  DIVISION: 10,
} as const;

export type NodeType = (typeof NodeType)[keyof typeof NodeType];

// TOKEN INTERFACE
export interface Token {
  type: TokenType;
  value: string | number;
  line: number;
}

// AST NODE INTERFACE
export interface ASTNode {
  type: NodeType;
  value?: string | number;
  name?: string;
  statements?: ASTNode[];
  expression?: ASTNode;
  left?: ASTNode;
  right?: ASTNode;
}

// PRINT FUNCTION TYPE
export type PrintFunction = (text: string) => void;

// RUNTIME ENVIRONMENT
export interface RuntimeEnvironment {
  print: PrintFunction;
}
