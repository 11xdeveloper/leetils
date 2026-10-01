/**
 * 1722. Minimize Hamming Distance After Swap Operations
 *
 * Swapping `source` elements at any listed index pairs, any number of
 * times, returns the fewest positions where it can differ from `target`.
 *
 * Swaps can arrange each connected group of indices arbitrarily, so within
 * a group match as many `target` values as the group's `source` values
 * allow (union–find plus a count per group).
 *
 * @see https://leetcode.com/problems/minimize-hamming-distance-after-swap-operations/
 * @difficulty Medium
 * @timeComplexity O((n + s) · α(n))
 * @spaceComplexity O(n)
 *
 * @example
 * minimizeHammingDistanceAfterSwapOperations([1, 2, 3, 4], [2, 1, 4, 5], [[0, 1], [2, 3]]); // 1
 */
export const minimizeHammingDistanceAfterSwapOperations = (
	source: readonly number[],
	target: readonly number[],
	allowedSwaps: readonly (readonly number[])[],
): number => {
	const parent = source.map((_, i) => i);
	const find = (x: number) => {
		let root = x;
		while (parent[root] !== root) root = parent[root] ?? root;
		for (let node = x; node !== root; ) {
			const next = parent[node] ?? root;
			parent[node] = root;
			node = next;
		}
		return root;
	};
	for (const [a = 0, b = 0] of allowedSwaps) parent[find(a)] = find(b);
	const available = new Map<string, number>();
	for (const [i, value] of source.entries()) {
		const key = `${find(i)},${value}`;
		available.set(key, (available.get(key) ?? 0) + 1);
	}
	let distance = 0;
	for (const [i, value] of target.entries()) {
		const key = `${find(i)},${value}`;
		const count = available.get(key) ?? 0;
		if (count > 0) available.set(key, count - 1);
		else distance++;
	}
	return distance;
};
