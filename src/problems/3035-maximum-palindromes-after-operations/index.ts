/**
 * 3035. Maximum Palindromes After Operations
 *
 * Letters can be swapped freely between and within `words`. Returns the most
 * words that can be palindromes at once.
 *
 * A word of length L needs ⌊L / 2⌋ matching letter pairs, and any letter can
 * fill an odd middle. So count the pairs available across all words and
 * spend them on the shortest words first.
 *
 * @see https://leetcode.com/problems/maximum-palindromes-after-operations/
 * @difficulty Medium
 * @timeComplexity O(L + n log n), for L letters in total
 * @spaceComplexity O(n)
 *
 * @example
 * maximumPalindromesAfterOperations(["abbb", "ba", "aa"]); // 3
 */
export const maximumPalindromesAfterOperations = (
	words: readonly string[],
): number => {
	const counts = new Array<number>(26).fill(0);
	for (const word of words)
		for (let i = 0; i < word.length; i++)
			counts[word.charCodeAt(i) - 97] =
				(counts[word.charCodeAt(i) - 97] ?? 0) + 1;
	let pairs = counts.reduce((total, count) => total + Math.floor(count / 2), 0);
	let palindromes = 0;
	for (const length of words.map((word) => word.length).sort((a, b) => a - b)) {
		pairs -= Math.floor(length / 2);
		if (pairs < 0) break;
		palindromes++;
	}
	return palindromes;
};
