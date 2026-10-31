/**
 * 3479. Fruits Into Baskets III
 *
 * Place each fruit type, in order, into the leftmost unused basket that can
 * hold it. Returns how many types go unplaced, for up to 10⁵ of each.
 *
 * A segment tree of basket capacities (0 once used) finds the leftmost
 * basket at least as big as the fruit by descending towards the left
 * whenever the left half's maximum is enough.
 *
 * @see https://leetcode.com/problems/fruits-into-baskets-iii/
 * @difficulty Medium
 * @timeComplexity O(n log n)
 * @spaceComplexity O(n)
 *
 * @example
 * fruitsIntoBasketsIII([4, 2, 5], [3, 5, 4]); // 1
 */
export const fruitsIntoBasketsIII = (
	fruits: readonly number[],
	baskets: readonly number[],
): number => {
	let size = 1;
	while (size < baskets.length) size *= 2;
	const tree = new Float64Array(2 * size);
	baskets.forEach((capacity, i) => {
		tree[size + i] = capacity;
	});
	for (let node = size - 1; node > 0; node--)
		tree[node] = Math.max(tree[2 * node] ?? 0, tree[2 * node + 1] ?? 0);
	let unplaced = 0;
	for (const fruit of fruits) {
		if ((tree[1] ?? 0) < fruit) {
			unplaced++;
			continue;
		}
		let node = 1;
		while (node < size)
			node = (tree[2 * node] ?? 0) >= fruit ? 2 * node : 2 * node + 1;
		tree[node] = 0;
		for (node >>= 1; node > 0; node >>= 1)
			tree[node] = Math.max(tree[2 * node] ?? 0, tree[2 * node + 1] ?? 0);
	}
	return unplaced;
};
