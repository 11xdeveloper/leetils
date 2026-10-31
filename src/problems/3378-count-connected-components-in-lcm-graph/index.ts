/**
 * 3378. Count Connected Components in LCM Graph
 *
 * Distinct numbers are joined when their LCM is at most `threshold`.
 * Returns the number of connected components.
 *
 * Two numbers have an LCM within the threshold exactly when they share a
 * common multiple within it. So join each number to all its multiples up
 * to the threshold with union-find over 1 to threshold; numbers above the
 * threshold stand alone.
 *
 * @see https://leetcode.com/problems/count-connected-components-in-lcm-graph/
 * @difficulty Hard
 * @timeComplexity O(T log T · α(T)), for threshold T
 * @spaceComplexity O(T)
 *
 * @example
 * countConnectedComponentsInLcmGraph([2, 4, 8, 3, 9], 5); // 4
 */
export const countConnectedComponentsInLcmGraph = (
	nums: readonly number[],
	threshold: number,
): number => {
	const parent = Int32Array.from({ length: threshold + 1 }, (_, i) => i);
	const find = (x: number): number => {
		let root = x;
		while (parent[root] !== root) root = parent[root] ?? root;
		for (let node = x; node !== root; ) {
			const up = parent[node] ?? root;
			parent[node] = root;
			node = up;
		}
		return root;
	};
	let alone = 0;
	for (const num of nums) {
		if (num > threshold) {
			alone++;
			continue;
		}
		for (let multiple = 2 * num; multiple <= threshold; multiple += num)
			parent[find(multiple)] = find(num);
	}
	const roots = new Set<number>();
	for (const num of nums) if (num <= threshold) roots.add(find(num));
	return roots.size + alone;
};
