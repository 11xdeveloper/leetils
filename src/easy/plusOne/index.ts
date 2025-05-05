export const plusOne = (digits: number[]): number[] =>
	Array.from((BigInt(digits.join("")) + BigInt(1)).toString(), Number);
