/**
 * 2042. Check if Numbers Are Ascending in a Sentence
 *
 * Returns whether the numbers among the space-separated tokens of `s` are
 * strictly increasing.
 *
 * Compare each number token with the previous one.
 *
 * @see https://leetcode.com/problems/check-if-numbers-are-ascending-in-a-sentence/
 * @difficulty Easy
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * checkIfNumbersAreAscendingInASentence("1 box has 3 blue 4 red 6 green and 12 yellow marbles"); // true
 */
export const checkIfNumbersAreAscendingInASentence = (s: string): boolean => {
	let previous = -Infinity;
	for (const token of s.split(" ")) {
		if (!/^\d+$/.test(token)) continue;
		const number = Number(token);
		if (number <= previous) return false;
		previous = number;
	}
	return true;
};
