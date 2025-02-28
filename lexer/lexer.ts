// Example SimpleLang code
const code = `
func sum(x, y) { return x + y }
func multiply(x, y) { return x * y }

var a = 5;
var b = 10;
var c = sum(a, b);

if c > 10 {
    var result = multiply(c, 2)
} else {
    var result = c * 2
}

var i = 0
while (i < 5) {
    result = result + i
    i = i + 1
}
`;

enum TokenType {
    Keyword,
    Identifier,
    Number,
    Operator,
    Punctuation,
    Assignment,
    Comparison,
    Bracket,
    String,
    Whitespace, // Handled but not tokenized
    EndOfFile,
  }
  
  interface Token {
    type: TokenType;
    value: string;
  }
  
  const keywords = ["func", "var", "if", "else", "while", "return"];
  
  function isWhiteSpace(char: string): boolean {
    return char === " " || char === "\n" || char === "\t";
  }
  
  function isAlpha(char: string): boolean {
    return /[a-zA-Z]/.test(char);
  }
  
  function isDigit(char: string): boolean {
    return /[0-9]/.test(char);
  }
  
  function isAlphaNumeric(char: string): boolean {
    return isAlpha(char) || isDigit(char);
  }
  
  function isOperator(char: string): boolean {
    return /[+\-*/]/.test(char);
  }
  
  function tokenize(code: string): Token[] {
    let tokens: Token[] = [];
    let text: string[] = code.split("");
  
    while (text.length > 0) {
      let char = text.shift();
      if (!char) break;
  
      if (isWhiteSpace(char)) {
        continue;
      }
  
      if (isOperator(char)) {
        tokens.push({ type: TokenType.Operator, value: char });
        continue;
      }
  
      if (isAlpha(char)) {
        let word = char;
        while (text.length > 0 && isAlphaNumeric(text[0])) {
          word += text.shift();
        }
        tokens.push({
          type: keywords.includes(word) ? TokenType.Keyword : TokenType.Identifier,
          value: word,
        });
        continue;
      }
  
      if (isDigit(char)) {
        let num = char;
        while (text.length > 0 && isDigit(text[0])) {
          num += text.shift();
        }
        tokens.push({ type: TokenType.Number, value: num });
        continue;
      }
  
      if (char === "(" || char === ")") {
        tokens.push({ type: TokenType.Bracket, value: char });
        continue;
      }
  
      if (char === "{" || char === "}" || char === ";" || char === ",") {
        tokens.push({ type: TokenType.Punctuation, value: char });
        continue;
      }
  
      if (char === ">" || char === "<" || (char === "=" && text[0] === "=")) {
        let value = char;
        if (text[0] === "=") value += text.shift();
        tokens.push({ type: TokenType.Comparison, value });
        continue;
      }
  
      if (char === "=") {
        tokens.push({ type: TokenType.Assignment, value: char });
        continue;
      }
  
      if (char === '"' || char === "'") {
        let quoteType = char;
        let str = "";
        while (text.length > 0 && text[0] !== quoteType) {
          str += text.shift();
        }
        text.shift(); // Consume closing quote
        tokens.push({ type: TokenType.String, value: str });
        continue;
      }
    }
  
    tokens.push({ type: TokenType.EndOfFile, value: "" });
    return tokens;
  }
  
  export { tokenize, Token, TokenType, code };
  