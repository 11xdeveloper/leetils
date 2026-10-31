/**
 * 2709. Greatest Common Divisor Traversal
 *
 * You may step between indices whose values share a factor greater than
 * 1. Returns whether every pair of indices is connected by such steps.
 *
 * Union each index with its prime factors, then check everything ended up
 * in one component.
 *
 * @see https://leetcode.com/problems/greatest-common-divisor-traversal/
 * @difficulty Hard
 * @timeComplexity O(m log log m + n log m), where `m` is the largest value
 * @spaceComplexity O(n + m)
 *
 * @example
 * greatestCommonDivisorTraversal([3, 9, 5]); // false
 */
export const greatestCommonDivisorTraversal = (
	nums: readonly number[],
): boolean => {
	const n = nums.length;
	if (n === 1) return true;
	const largest = Math.max(...nums);
	const smallestPrime = new Int32Array(largest + 1);
	for (let p = 2; p <= largest; p++)
		if (!smallestPrime[p])
			for (let m = p; m <= largest; m += p)
				if (!smallestPrime[m]) smallestPrime[m] = p;

	// Indices 0..n-1, then each value p at n + p.
	const parent = Array.from({ length: n + largest + 1 }, (_, i) => i);
	const find = (x: number): number => {
		while (parent[x] !== x) {
			const up = parent[parent[x] ?? x] ?? x;
			parent[x] = up;
			x = up;
		}
		return x;
	};
	for (const [i, num] of nums.entries()) {
		if (num === 1) return false;
		for (let rest = num; rest > 1; ) {
			const p = smallestPrime[rest] ?? rest;
			parent[find(i)] = find(n + p);
			while (rest % p === 0) rest /= p;
		}
	}
	const root = find(0);
	return nums.every((_, i) => find(i) === root);
};
