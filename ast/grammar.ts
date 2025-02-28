

export type ASTNode =
  | ProgramNode
  | FunctionNode
  | VarDeclarationNode
  | BlockNode
  | IfNode
  | WhileNode
  | ReturnNode
  | ExprNode;

  export interface ProgramNode{
    type: "Program";
    body: ASTNode[];
  }

  export interface FunctionNode {
    type: "FunctionDeclaration";
    id: IdentifierNode;
    params: IdentifierNode[];
    body: BlockNode;
  }

  export interface VarDeclarationNode {
    type: "VariableDeclaration";
    id: IdentifierNode;
    init: ExprNode | null | undefined;
  }

  export interface BlockNode {
    type: "Block";
    body: ASTNode[];
  }

  export interface IfNode {
    type: "IfStatement";
    condition: ExprNode;
    thenBlock: BlockNode;
    elseBlock: BlockNode | null | undefined;
  }

  export interface WhileNode {
    type: "WhileStatement";
    condition: ExprNode;
    body: BlockNode;
  }

  export interface ReturnNode {
    type: "ReturnStatement";
    argument: ExprNode | null | undefined;
  }

  export type ExprNode =
  | LiteralNode
  | IdentifierNode
  | BinaryExpressionNode
  | AssignmentExpressionNode
  | CallExpressionNode;

  export interface LiteralNode {
    type: "Literal";
    value: string | number;
  }

  export interface IdentifierNode {
    type: "Identifier";
    name: string;
  }

  export interface BinaryExpressionNode {
    type: "BinaryExpression";
    operator: string;
    left: ExprNode;
    right: ExprNode;
  }

  export interface AssignmentExpressionNode {
    type: "AssignmentExpression";
    operator: string;
    left: IdentifierNode;
    right: ExprNode;
  }

  export interface CallExpressionNode {
    type: "CallExpression";
    callee: IdentifierNode;
    arguments: ExprNode[];
  }

