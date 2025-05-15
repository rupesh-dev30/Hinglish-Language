import { type Token, TokenType, type ASTNode, NodeType } from "./types";

export function parse(tokens: Token[]): ASTNode {
  let position = 0;

  function peek(): Token {
    return tokens[position];
  }

  function consume(): Token {
    return tokens[position++];
  }

  function match(type: TokenType): boolean {
    if (peek().type === type) {
      consume();
      return true;
    }
    return false;
  }

  // Main parsing function
  function parseProgram(): ASTNode {
    const statements: ASTNode[] = [];

    while (peek().type !== TokenType.EOF) {
      try {
        const statement = parseStatement();
        if (statement) {
          statements.push(statement);
        }
      } catch {
        // Skip to the next statement on error
        while (peek().type !== TokenType.EOL && peek().type !== TokenType.EOF) {
          consume();
        }
        if (peek().type === TokenType.EOL) {
          consume();
        }
      }
    }

    return {
      type: NodeType.PROGRAM,
      statements,
    };
  }

  function parseStatement(): ASTNode | null {
    const currentToken = peek();

    switch (currentToken.type) {
      case TokenType.PRINT:
        return parsePrintStatement();
      case TokenType.VARIABLE_DECLARATION:
        return parseVariableDeclaration();
      case TokenType.IDENTIFIER:
        return parseAssignment();
      case TokenType.EOL:
        consume(); // Skip empty lines
        return null;
      default:
        throw new Error(
          `Unexpected token: ${currentToken.value} at line ${
            currentToken.line + 1
          }`
        );
    }
  }

  function parsePrintStatement(): ASTNode {
    consume(); // Consume the 'print' token

    const expression = parseExpression();

    // Optionally consume a semicolon
    match(TokenType.SEMICOLON);

    // Consume EOL
    if (peek().type === TokenType.EOL) {
      consume();
    }

    return {
      type: NodeType.PRINT,
      expression,
    };
  }

  function parseVariableDeclaration(): ASTNode {
    consume(); // Consume the variable declaration keyword

    const nameToken = consume();
    if (nameToken.type !== TokenType.IDENTIFIER) {
      throw new Error(
        `Expected identifier, got ${nameToken.value} at line ${
          nameToken.line + 1
        }`
      );
    }

    // Make sure there's an equals sign
    if (!match(TokenType.EQUALS)) {
      throw new Error(
        `Expected '=', got ${peek().value} at line ${peek().line + 1}`
      );
    }

    const value = parseExpression();

    // Optionally consume a semicolon
    match(TokenType.SEMICOLON);

    // Consume EOL
    if (peek().type === TokenType.EOL) {
      consume();
    }

    return {
      type: NodeType.VARIABLE_DECLARATION,
      name: nameToken.value as string,
      expression: value,
    };
  }

  function parseAssignment(): ASTNode {
    const nameToken = consume(); // Consume the identifier

    // Make sure there's an equals sign
    if (!match(TokenType.EQUALS)) {
      throw new Error(
        `Expected '=', got ${peek().value} at line ${peek().line + 1}`
      );
    }

    const value = parseExpression();

    // Optionally consume a semicolon
    match(TokenType.SEMICOLON);

    // Consume EOL
    if (peek().type === TokenType.EOL) {
      consume();
    }

    return {
      type: NodeType.ASSIGNMENT,
      name: nameToken.value as string,
      expression: value,
    };
  }

  function parseExpression(): ASTNode {
    return parseAdditiveExpression();
  }

  function parseAdditiveExpression(): ASTNode {
    let left = parseMultiplicativeExpression();

    while (peek().type === TokenType.PLUS || peek().type === TokenType.MINUS) {
      const operator = consume().type;
      const right = parseMultiplicativeExpression();

      left = {
        type:
          operator === TokenType.PLUS
            ? NodeType.ADDITION
            : NodeType.SUBTRACTION,
        left,
        right,
      };
    }

    return left;
  }

  function parseMultiplicativeExpression(): ASTNode {
    let left = parsePrimaryExpression();

    while (
      peek().type === TokenType.MULTIPLY ||
      peek().type === TokenType.DIVIDE
    ) {
      const operator = consume().type;
      const right = parsePrimaryExpression();

      left = {
        type:
          operator === TokenType.MULTIPLY
            ? NodeType.MULTIPLICATION
            : NodeType.DIVISION,
        left,
        right,
      };
    }

    return left;
  }

  function parsePrimaryExpression(): ASTNode {
    const token = peek();

    switch (token.type) {
      case TokenType.NUMBER:
        consume();
        return {
          type: NodeType.NUMBER,
          value: token.value as number,
        };
      case TokenType.STRING:
        consume();
        return {
          type: NodeType.STRING,
          value: token.value as string,
        };
      case TokenType.IDENTIFIER:
        consume();
        return {
          type: NodeType.VARIABLE,
          name: token.value as string,
        };
      default:
        throw new Error(
          `Unexpected token: ${token.value} at line ${token.line + 1}`
        );
    }
  }

  return parseProgram();
}
