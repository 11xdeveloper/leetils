/**
 * 2440. Create Components With Same Value
 *
 * Deletes edges of a tree so every component has the same total node
 * value. Returns the most edges deletable.
 *
 * Try each component count `c` dividing the total, largest first: walking
 * up from the leaves, a subtree reaching the target sum is cut off; it
 * works if no subtree overshoots.
 *
 * @see https://leetcode.com/problems/create-components-with-same-value/
 * @difficulty Hard
 * @timeComplexity O(n · d(total))
 * @spaceComplexity O(n)
 *
 * @example
 * createComponentsWithSameValue([6, 2, 2, 2, 6], [[0, 1], [1, 2], [1, 3], [3, 4]]); // 2
 */
export const createComponentsWithSameValue = (
	nums: readonly number[],
	edges: readonly (readonly number[])[],
): number => {
	const n = nums.length;
	const neighbours: number[][] = Array.from({ length: n }, () => []);
	for (const [a = 0, b = 0] of edges) {
		neighbours[a]?.push(b);
		neighbours[b]?.push(a);
	}
	const parent = new Array<number>(n).fill(-1);
	const order = [0];
	for (let head = 0; head < order.length; head++) {
		const node = order[head] ?? 0;
		for (const next of neighbours[node] ?? []) {
			if (next === parent[node]) continue;
			parent[next] = node;
			order.push(next);
		}
	}
	const total = nums.reduce((sum, v) => sum + v, 0);
	const splits = (target: number): boolean => {
		const sums = [...nums];
		for (const node of order.toReversed()) {
			const sum = sums[node] ?? 0;
			if (sum > target) return false;
			const p = parent[node] ?? -1;
			if (sum < target && p !== -1) sums[p] = (sums[p] ?? 0) + sum;
			else if (sum < target) return false;
		}
		return true;
	};
	for (let components = n; components > 1; components--)
		if (total % components === 0 && splits(total / components))
			return components - 1;
	return 0;
};
