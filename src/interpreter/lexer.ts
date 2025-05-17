import { TokenType, type Token } from "./types";

const multiWordKeywords = [
  { phrase: "ek variable banana", type: TokenType.VARIABLE_DECLARATION },
  { phrase: "print karo", type: TokenType.PRINT },
  // Add more multi-word keywords if needed
];

export function tokenize(input: string): Token[] {
  const tokens: Token[] = [];
  const lines = input.split("\n");

  for (let lineNum = 0; lineNum < lines.length; lineNum++) {
    const line = lines[lineNum].trim();
    if (line === "" || line.startsWith("//")) continue;

    let position = 0;

    while (position < line.length) {
      // Skip whitespace
      if (line[position] === " " || line[position] === "\t") {
        position++;
        continue;
      }

      // Try to match multi-word keywords first
      const multiWordMatch = tryMatchMultiWordKeyword(line, position, lineNum);
      if (multiWordMatch.token) {
        tokens.push(multiWordMatch.token);
        position += multiWordMatch.lengthConsumed!;
        continue;
      }

      const char = line[position];

      // Identify identifiers/keywords
      if (isAlpha(char)) {
        let identifier = "";
        while (
          position < line.length &&
          (isAlpha(line[position]) || isDigit(line[position]))
        ) {
          identifier += line[position];
          position++;
        }

        const token = identifyKeyword(identifier, lineNum);
        tokens.push(token);
        continue;
      }

      // Identify string literals
      if (char === '"' || char === "'") {
        const quoteType = char;
        let string = "";
        position++; // Skip opening quote

        while (position < line.length && line[position] !== quoteType) {
          string += line[position];
          position++;
        }

        if (position >= line.length) {
          throw new Error(`Unterminated string at line ${lineNum + 1}`);
        }

        position++; // Skip closing quote
        tokens.push({ type: TokenType.STRING, value: string, line: lineNum });
        continue;
      }

      // Identify numbers
      if (isDigit(char)) {
        let number = "";
        while (position < line.length && isDigit(line[position])) {
          number += line[position];
          position++;
        }

        if (position < line.length && line[position] === ".") {
          number += ".";
          position++;
          while (position < line.length && isDigit(line[position])) {
            number += line[position];
            position++;
          }
        }

        tokens.push({
          type: TokenType.NUMBER,
          value: parseFloat(number),
          line: lineNum,
        });
        continue;
      }

      // Operators and punctuation
      switch (char) {
        case "=":
          tokens.push({ type: TokenType.EQUALS, value: "=", line: lineNum });
          position++;
          break;
        case "+":
          tokens.push({ type: TokenType.PLUS, value: "+", line: lineNum });
          position++;
          break;
        case "-":
          tokens.push({ type: TokenType.MINUS, value: "-", line: lineNum });
          position++;
          break;
        case "*":
          tokens.push({ type: TokenType.MULTIPLY, value: "*", line: lineNum });
          position++;
          break;
        case "/":
          tokens.push({ type: TokenType.DIVIDE, value: "/", line: lineNum });
          position++;
          break;
        case ";":
          tokens.push({ type: TokenType.SEMICOLON, value: ";", line: lineNum });
          position++;
          break;
        default:
          // Skip unknown characters (you may want to throw error here)
          position++;
      }
    }

    // End of line token
    tokens.push({ type: TokenType.EOL, value: "EOL", line: lineNum });
  }

  // End of file token
  tokens.push({ type: TokenType.EOF, value: "EOF", line: lines.length });

  return tokens;
}

function tryMatchMultiWordKeyword(
  line: string,
  startPos: number,
  lineNum: number
): { token?: Token; lengthConsumed?: number } {
  for (const kw of multiWordKeywords) {
    if (line.slice(startPos).toLowerCase().startsWith(kw.phrase)) {
      return {
        token: { type: kw.type, value: kw.phrase, line: lineNum },
        lengthConsumed: kw.phrase.length,
      };
    }
  }
  return {};
}

function isAlpha(char: string): boolean {
  return /[a-zA-Z_]/.test(char);
}

function isDigit(char: string): boolean {
  return /[0-9]/.test(char);
}

function identifyKeyword(word: string, line: number): Token {
  const lowerWord = word.toLowerCase();

  switch (lowerWord) {
    case "print":
    case "karo":
    case "dikhao":
      return { type: TokenType.PRINT, value: word, line };
    case "agar":
    case "if":
      return { type: TokenType.IF, value: word, line };
    case "nahi":
    case "to":
    case "else":
      return { type: TokenType.ELSE, value: word, line };
    case "jabtak":
    case "while":
      return { type: TokenType.WHILE, value: word, line };
    case "ek":
    case "var":
    case "let":
    case "variable":
    case "banana":
      return { type: TokenType.IDENTIFIER, value: word, line }; // Now treat these alone as identifiers
    default:
      return { type: TokenType.IDENTIFIER, value: word, line };
  }
}
