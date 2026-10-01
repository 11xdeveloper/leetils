/**
 * 1569. Number of Ways to Reorder Array to Get Same BST
 *
 * `nums` is a permutation of `1 … n` inserted into an empty binary search
 * tree. Returns how many other orders build the same tree, modulo 10^9 + 7.
 *
 * The root must come first; after that the left and right subtrees' orders
 * can be interleaved freely, in `C(left + right, left)` ways, and each
 * subtree has its own number of orders. Builds the tree, then combines
 * those counts bottom-up (with binomials from Pascal's triangle). Excludes
 * the original order itself.
 *
 * @see https://leetcode.com/problems/number-of-ways-to-reorder-array-to-get-same-bst/
 * @difficulty Hard
 * @timeComplexity O(n^2)
 * @spaceComplexity O(n^2)
 *
 * @example
 * numberOfWaysToReorderArrayToGetSameBst([3, 4, 5, 1, 2]); // 5
 */
export const numberOfWaysToReorderArrayToGetSameBst = (
	nums: readonly number[],
): number => {
	const MOD = 1_000_000_007n;
	const n = nums.length;
	const choose = Array.from({ length: n + 1 }, () =>
		new Array<bigint>(n + 1).fill(0n),
	);
	for (let i = 0; i <= n; i++) {
		const row = choose[i] ?? [];
		row[0] = 1n;
		for (let j = 1; j <= i; j++)
			row[j] =
				((choose[i - 1]?.[j - 1] ?? 0n) + (choose[i - 1]?.[j] ?? 0n)) % MOD;
	}
	const [left, right] = [new Int32Array(n + 1), new Int32Array(n + 1)];
	const root = nums[0] ?? 0;
	for (const value of nums.slice(1)) {
		let node = root;
		for (;;) {
			const side = value < node ? left : right;
			const child = side[node] ?? 0;
			if (child === 0) {
				side[node] = value;
				break;
			}
			node = child;
		}
	}
	// Post-order: children before parents, via reversed preorder.
	const order: number[] = [];
	const stack = [root];
	for (let node = stack.pop(); node !== undefined; node = stack.pop()) {
		order.push(node);
		for (const child of [left[node] ?? 0, right[node] ?? 0])
			if (child !== 0) stack.push(child);
	}
	const size = new Int32Array(n + 1);
	const ways = new Array<bigint>(n + 1).fill(1n);
	for (const node of order.reverse()) {
		const [a, b] = [left[node] ?? 0, right[node] ?? 0];
		const [sizeA, sizeB] = [size[a] ?? 0, size[b] ?? 0];
		size[node] = sizeA + sizeB + 1;
		ways[node] =
			((((choose[sizeA + sizeB]?.[sizeA] ?? 1n) * (ways[a] ?? 1n)) % MOD) *
				(ways[b] ?? 1n)) %
			MOD;
	}
	return Number(((ways[root] ?? 1n) - 1n + MOD) % MOD);
};
