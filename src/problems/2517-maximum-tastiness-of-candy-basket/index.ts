/**
 * 2517. Maximum Tastiness of Candy Basket
 *
 * A basket's tastiness is the smallest price difference between any two
 * of its `k` distinct candies. Returns the largest tastiness possible.
 *
 * Sort, then binary search the tastiness: a gap is achievable if greedily
 * taking each candy at least that far above the last one taken finds `k`.
 *
 * @see https://leetcode.com/problems/maximum-tastiness-of-candy-basket/
 * @difficulty Medium
 * @timeComplexity O(n log n + n log m), where `m` is the price range
 * @spaceComplexity O(n)
 *
 * @example
 * maximumTastinessOfCandyBasket([13, 5, 1, 8, 21, 2], 3); // 8
 */
export const maximumTastinessOfCandyBasket = (
	price: readonly number[],
	k: number,
): number => {
	const sorted = price.toSorted((a, b) => a - b);
	const achievable = (gap: number): boolean => {
		let taken = 1;
		let last = sorted[0] ?? 0;
		for (const p of sorted)
			if (p - last >= gap) {
				taken++;
				last = p;
			}
		return taken >= k;
	};

	let low = 0;
	let high = (sorted.at(-1) ?? 0) - (sorted[0] ?? 0);
	while (low < high) {
		const mid = Math.ceil((low + high) / 2);
		if (achievable(mid)) low = mid;
		else high = mid - 1;
	}
	return low;
};
