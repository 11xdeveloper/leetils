/**
 * 2300. Successful Pairs of Spells and Potions
 *
 * A spell and potion pair succeeds when their product is at least
 * `success`. Returns, for each spell, how many potions it succeeds with.
 *
 * Sort the potions and binary search each spell's threshold.
 *
 * @see https://leetcode.com/problems/successful-pairs-of-spells-and-potions/
 * @difficulty Medium
 * @timeComplexity O((n + m) log m)
 * @spaceComplexity O(m)
 *
 * @example
 * successfulPairsOfSpellsAndPotions([5, 1, 3], [1, 2, 3, 4, 5], 7); // [4, 0, 3]
 */
export const successfulPairsOfSpellsAndPotions = (
	spells: readonly number[],
	potions: readonly number[],
	success: number,
): number[] => {
	const sorted = potions.toSorted((a, b) => a - b);
	return spells.map((spell) => {
		let [lo, hi] = [0, sorted.length];
		while (lo < hi) {
			const mid = (lo + hi) >> 1;
			if (spell * (sorted[mid] ?? 0) < success) lo = mid + 1;
			else hi = mid;
		}
		return sorted.length - lo;
	});
};
