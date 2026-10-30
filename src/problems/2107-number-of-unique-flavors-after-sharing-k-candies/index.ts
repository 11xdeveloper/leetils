/**
 * 2107. Number of Unique Flavors After Sharing K Candies
 *
 * You give your sister `k` consecutive candies. Returns the most distinct
 * flavours you can keep.
 *
 * Slide the `k`-candy gap along, counting the flavours left outside it.
 *
 * @see https://leetcode.com/problems/number-of-unique-flavors-after-sharing-k-candies/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * numberOfUniqueFlavorsAfterSharingKCandies([1, 2, 2, 3, 4, 3], 3); // 3
 */
export const numberOfUniqueFlavorsAfterSharingKCandies = (
	candies: readonly number[],
	k: number,
): number => {
	const kept = new Map<number, number>();
	const change = (flavour: number, by: number): void => {
		const count = (kept.get(flavour) ?? 0) + by;
		if (count === 0) kept.delete(flavour);
		else kept.set(flavour, count);
	};
	for (const flavour of candies.slice(k)) change(flavour, 1);
	let best = kept.size;
	for (let i = k; i < candies.length; i++) {
		change(candies[i] ?? 0, -1);
		change(candies[i - k] ?? 0, 1);
		best = Math.max(best, kept.size);
	}
	return best;
};
