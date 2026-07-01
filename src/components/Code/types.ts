export type CodeLanguage = "javascript" | "php";

export type CodeTokenType =
  | "boolean"
  | "comment"
  | "identifier"
  | "keyword"
  | "operator"
  | "property"
  | "punctuation"
  | "string"
  | "variable";

export type CodeIndentLevel = 0 | 1 | 2 | 3;
