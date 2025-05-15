import { TokenType, type Token } from './types';

export function tokenize(input: string): Token[] {
  const tokens: Token[] = [];
  const lines = input.split('\n');
  
  for (let lineNum = 0; lineNum < lines.length; lineNum++) {
    const line = lines[lineNum].trim();
    
    // Skip empty lines and comments
    if (line === '' || line.startsWith('//')) {
      continue;
    }
    
    let position = 0;
    
    while (position < line.length) {
      const char = line[position];
      
      // Skip whitespace
      if (char === ' ' || char === '\t') {
        position++;
        continue;
      }
      
      // Identify keywords and identifiers
      if (isAlpha(char)) {
        let identifier = '';
        while (position < line.length && (isAlpha(line[position]) || isDigit(line[position]))) {
          identifier += line[position];
          position++;
        }
        
        // Check if this is a keyword
        const token = identifyKeyword(identifier, lineNum);
        tokens.push(token);
        continue;
      }
      
      // Identify string literals
      if (char === '"' || char === "'") {
        const quoteType = char;
        let string = '';
        position++; // Skip the opening quote
        
        while (position < line.length && line[position] !== quoteType) {
          string += line[position];
          position++;
        }
        
        if (position >= line.length) {
          throw new Error(`Unterminated string at line ${lineNum + 1}`);
        }
        
        position++; // Skip the closing quote
        tokens.push({ type: TokenType.STRING, value: string, line: lineNum });
        continue;
      }
      
      // Identify numbers
      if (isDigit(char)) {
        let number = '';
        while (position < line.length && isDigit(line[position])) {
          number += line[position];
          position++;
        }
        
        // Check for decimal point
        if (position < line.length && line[position] === '.') {
          number += '.';
          position++;
          
          while (position < line.length && isDigit(line[position])) {
            number += line[position];
            position++;
          }
        }
        
        tokens.push({ type: TokenType.NUMBER, value: parseFloat(number), line: lineNum });
        continue;
      }
      
      // Identify operators
      switch (char) {
        case '=':
          tokens.push({ type: TokenType.EQUALS, value: '=', line: lineNum });
          position++;
          break;
        case '+':
          tokens.push({ type: TokenType.PLUS, value: '+', line: lineNum });
          position++;
          break;
        case '-':
          tokens.push({ type: TokenType.MINUS, value: '-', line: lineNum });
          position++;
          break;
        case '*':
          tokens.push({ type: TokenType.MULTIPLY, value: '*', line: lineNum });
          position++;
          break;
        case '/':
          tokens.push({ type: TokenType.DIVIDE, value: '/', line: lineNum });
          position++;
          break;
        case ';':
          tokens.push({ type: TokenType.SEMICOLON, value: ';', line: lineNum });
          position++;
          break;
        default:
          position++; // Skip unrecognized characters for now
      }
    }
    
    // Add end of line token
    tokens.push({ type: TokenType.EOL, value: 'EOL', line: lineNum });
  }
  
  // Add end of file token
  tokens.push({ type: TokenType.EOF, value: 'EOF', line: lines.length });
  
  return tokens;
}

function isAlpha(char: string): boolean {
  return /[a-zA-Z_]/.test(char);
}

function isDigit(char: string): boolean {
  return /[0-9]/.test(char);
}

function identifyKeyword(word: string, line: number): Token {
  // Convert to lowercase for case-insensitive matching
  const lowerWord = word.toLowerCase();
  
  // Keywords mapping
  switch (lowerWord) {
    case 'print':
    case 'karo':
    case 'dikhao':
    case 'print karo':
      return { type: TokenType.PRINT, value: word, line };
    case 'agar':
    case 'if':
      return { type: TokenType.IF, value: word, line };
    case 'nahi':
    case 'to':
    case 'else':
      return { type: TokenType.ELSE, value: word, line };
    case 'jabtak':
    case 'while':
      return { type: TokenType.WHILE, value: word, line };
    case 'ek':
    case 'var':
    case 'let':
    case 'variable':
    case 'banana':
      return { type: TokenType.VARIABLE_DECLARATION, value: word, line };
    default:
      return { type: TokenType.IDENTIFIER, value: word, line };
  }
}