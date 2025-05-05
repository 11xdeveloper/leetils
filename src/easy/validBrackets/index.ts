import { BracketPairMapping } from "../../lib/constants";

export const validBrackets = (str: string): boolean => {
	const stack: string[] = [];

	for (const char of str) {
		if (BracketPairMapping.has(char)) stack.push(char);
		else if (
			stack.length === 0 ||
			BracketPairMapping.get(stack.pop()!) !== char
		)
			return false;
	}

	return stack.length === 0;
};
