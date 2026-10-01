/**
 * 954. Array of Doubled Pairs
 *
 * Returns whether `arr` (of even length) can be reordered so that every
 * odd-indexed element is double the one before it, i.e. split into pairs
 * `(x, 2x)`.
 *
 * Going through the values in order of absolute size, the smallest
 * remaining value can only pair with its double, so its double must be
 * available as many times as it is.
 *
 * @see https://leetcode.com/problems/array-of-doubled-pairs/
 * @difficulty Medium
 * @timeComplexity O(n log n)
 * @spaceComplexity O(n)
 *
 * @example
 * arrayOfDoubledPairs([4, -2, 2, -4]); // true
 */
export const arrayOfDoubledPairs = (arr: readonly number[]): boolean => {
	const counts = new Map<number, number>();
	for (const value of arr) counts.set(value, (counts.get(value) ?? 0) + 1);
	for (const value of [...counts.keys()].sort(
		(a, b) => Math.abs(a) - Math.abs(b),
	)) {
		const count = counts.get(value) ?? 0;
		if (count === 0) continue;
		if (value === 0) {
			if (count % 2 !== 0) return false;
			continue;
		}
		const doubles = counts.get(2 * value) ?? 0;
		if (doubles < count) return false;
		counts.set(2 * value, doubles - count);
	}
	return true;
};
