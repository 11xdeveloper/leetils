/**
 * 3174. Clear Digits
 *
 * Repeatedly delete a digit together with the closest letter to its left.
 * Returns what's left.
 *
 * A stack of letters: each digit pops one.
 *
 * @see https://leetcode.com/problems/clear-digits/
 * @difficulty Easy
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * clearDigits("cb34"); // ""
 */
export const clearDigits = (s: string): string => {
	const stack: string[] = [];
	for (const char of s)
		if (char >= "0" && char <= "9") stack.pop();
		else stack.push(char);
	return stack.join("");
};
