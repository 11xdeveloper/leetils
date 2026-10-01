/**
 * 875. Koko Eating Bananas
 *
 * Koko eats from one pile per hour, up to `k` bananas (finishing the pile
 * if it has fewer). Returns the smallest `k` that lets her eat every pile
 * within `h` hours.
 *
 * Binary search on `k`: a pile of `p` takes `⌈p / k⌉` hours, and the total
 * only falls as `k` grows.
 *
 * @see https://leetcode.com/problems/koko-eating-bananas/
 * @difficulty Medium
 * @timeComplexity O(n log max)
 * @spaceComplexity O(1)
 *
 * @example
 * kokoEatingBananas([3, 6, 7, 11], 8); // 4
 */
export const kokoEatingBananas = (
	piles: readonly number[],
	h: number,
): number => {
	let low = 1;
	let high = Math.max(...piles);
	while (low < high) {
		const mid = Math.floor((low + high) / 2);
		let hours = 0;
		for (const pile of piles) hours += Math.ceil(pile / mid);
		if (hours <= h) high = mid;
		else low = mid + 1;
	}
	return low;
};
