/**
 * 823. Binary Trees With Factors
 *
 * Counts the binary trees whose nodes hold numbers from `arr` (distinct,
 * each at least 2, usable any number of times) where every non-leaf node is
 * the product of its two children. Returns the count modulo 10^9 + 7.
 *
 * With the numbers sorted, the trees rooted at `x` are a single leaf plus,
 * for each factorisation `x = a · b` with both in `arr`, the trees at `a`
 * times the trees at `b`.
 *
 * @see https://leetcode.com/problems/binary-trees-with-factors/
 * @difficulty Medium
 * @timeComplexity O(n^2)
 * @spaceComplexity O(n)
 *
 * @example
 * binaryTreesWithFactors([2, 4, 5, 10]); // 7
 */
export const binaryTreesWithFactors = (arr: readonly number[]): number => {
	const MOD = 1_000_000_007n;
	const sorted = arr.toSorted((a, b) => a - b);
	const trees = new Map<number, bigint>();
	let total = 0n;
	for (const [i, root] of sorted.entries()) {
		let count = 1n;
		for (const left of sorted.slice(0, i)) {
			const right = root / left;
			const rightCount = trees.get(right);
			if (Number.isInteger(right) && rightCount !== undefined)
				count = (count + (trees.get(left) ?? 0n) * rightCount) % MOD;
		}
		trees.set(root, count);
		total = (total + count) % MOD;
	}
	return Number(total);
};
