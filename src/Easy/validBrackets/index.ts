import { BracketPairMapping } from "../../constants";

export default (str: string) => {
  const stack: string[] = [];

  for (const char of str) {
    if (BracketPairMapping.has(char)) stack.push(char);
    else if (stack.length === 0 || BracketPairMapping.get(stack.pop()) !== char)
      return false;
  }

  return stack.length === 0;
};
