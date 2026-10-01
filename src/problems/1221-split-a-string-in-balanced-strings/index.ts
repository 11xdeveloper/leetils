/**
 * 1221. Split a String in Balanced Strings
 *
 * A balanced string has as many `L`s as `R`s. Returns the most pieces the
 * balanced string `s` can be split into, each balanced.
 *
 * Cuts greedily wherever the running balance returns to 0.
 *
 * @see https://leetcode.com/problems/split-a-string-in-balanced-strings/
 * @difficulty Easy
 * @timeComplexity O(n)
 * @spaceComplexity O(1)
 *
 * @example
 * splitAStringInBalancedStrings("RLRRLLRLRL"); // 4
 */
export const splitAStringInBalancedStrings = (s: string): number => {
	let [balance, pieces] = [0, 0];
	for (const char of s) {
		balance += char === "L" ? 1 : -1;
		if (balance === 0) pieces++;
	}
	return pieces;
};
