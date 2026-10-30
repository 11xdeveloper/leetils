/**
 * 2268. Minimum Number of Keypresses
 *
 * Map the 26 letters onto 9 buttons, at most 3 per button, where the
 * `k`-th letter on a button takes `k` presses. Returns the fewest presses
 * to type `s` under the best mapping.
 *
 * Give the most frequent letters the first slots on each button.
 *
 * @see https://leetcode.com/problems/minimum-number-of-keypresses/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(1)
 *
 * @example
 * minimumNumberOfKeypresses("apple"); // 5
 */
export const minimumNumberOfKeypresses = (s: string): number => {
	const counts = new Map<string, number>();
	for (const char of s) counts.set(char, (counts.get(char) ?? 0) + 1);
	return [...counts.values()]
		.sort((a, b) => b - a)
		.reduce((total, count, i) => total + count * (Math.floor(i / 9) + 1), 0);
};
