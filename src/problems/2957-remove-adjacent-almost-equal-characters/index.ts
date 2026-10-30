/**
 * 2957. Remove Adjacent Almost-Equal Characters
 *
 * Letters are almost equal if they're the same or neighbours in the
 * alphabet. Returns the fewest letter changes leaving no adjacent almost
 * equal pair.
 *
 * In each run of almost-equal neighbours, change every second letter to
 * something far away; scan, skipping past each change.
 *
 * @see https://leetcode.com/problems/remove-adjacent-almost-equal-characters/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(1)
 *
 * @example
 * removeAdjacentAlmostEqualCharacters("zyxyxyz"); // 3
 */
export const removeAdjacentAlmostEqualCharacters = (word: string): number => {
	let changes = 0;
	for (let i = 1; i < word.length; i++)
		if (Math.abs(word.charCodeAt(i) - word.charCodeAt(i - 1)) <= 1) {
			changes++;
			i++;
		}
	return changes;
};
