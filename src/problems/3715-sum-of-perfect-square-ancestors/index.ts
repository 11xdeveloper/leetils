/**
 * 3715. Sum of Perfect Square Ancestors
 *
 * In a tree rooted at 0, count for each node the ancestors whose value
 * times its own is a perfect square. Returns the sum of those counts.
 *
 * Two numbers multiply to a square exactly when their square-free parts
 * match. Walk the tree depth first, keeping counts of square-free parts
 * along the current root path.
 *
 * @see https://leetcode.com/problems/sum-of-perfect-square-ancestors/
 * @difficulty Hard
 * @timeComplexity O(n log V + V log log V)
 * @spaceComplexity O(n + V)
 *
 * @example
 * sumOfPerfectSquareAncestors(3, [[0, 1], [1, 2]], [2, 8, 2]); // 3
 */
export const sumOfPerfectSquareAncestors = (
	n: number,
	edges: readonly (readonly number[])[],
	nums: readonly number[],
): number => {
	const limit = Math.max(...nums);
	const smallest = new Int32Array(limit + 1);
	for (let p = 2; p <= limit; p++)
		if (!smallest[p])
			for (let x = p; x <= limit; x += p) if (!smallest[x]) smallest[x] = p;
	const kernel = nums.map((num) => {
		let result = 1;
		for (let x = num; x > 1; ) {
			const p = smallest[x] ?? x;
			let odd = false;
			while (x % p === 0) {
				x /= p;
				odd = !odd;
			}
			if (odd) result *= p;
		}
		return result;
	});
	const adjacent: number[][] = Array.from({ length: n }, () => []);
	for (const [u = 0, v = 0] of edges) {
		adjacent[u]?.push(v);
		adjacent[v]?.push(u);
	}
	const onPath = new Map<number, number>();
	let total = 0;
	// Negative entries mark leaving a node.
	const stack = [0];
	const parent = new Int32Array(n).fill(-1);
	while (stack.length > 0) {
		const entry = stack.pop() ?? 0;
		if (entry < 0) {
			const k = kernel[~entry] ?? 1;
			onPath.set(k, (onPath.get(k) ?? 0) - 1);
			continue;
		}
		const k = kernel[entry] ?? 1;
		total += onPath.get(k) ?? 0;
		onPath.set(k, (onPath.get(k) ?? 0) + 1);
		stack.push(~entry);
		for (const child of adjacent[entry] ?? [])
			if (child !== parent[entry]) {
				parent[child] = entry;
				stack.push(child);
			}
	}
	return total;
};
