/**
 * 3477. Fruits Into Baskets II
 *
 * Place each fruit type, in order, into the leftmost unused basket that can
 * hold it. Returns how many types go unplaced.
 *
 * Simulate.
 *
 * @see https://leetcode.com/problems/fruits-into-baskets-ii/
 * @difficulty Easy
 * @timeComplexity O(n²)
 * @spaceComplexity O(n)
 *
 * @example
 * fruitsIntoBasketsII([4, 2, 5], [3, 5, 4]); // 1
 */
export const fruitsIntoBasketsII = (
	fruits: readonly number[],
	baskets: readonly number[],
): number => {
	const used = new Uint8Array(baskets.length);
	let unplaced = 0;
	for (const fruit of fruits) {
		const basket = baskets.findIndex(
			(capacity, i) => !used[i] && capacity >= fruit,
		);
		if (basket === -1) unplaced++;
		else used[basket] = 1;
	}
	return unplaced;
};
