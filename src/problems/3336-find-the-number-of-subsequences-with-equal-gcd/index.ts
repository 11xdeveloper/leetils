const MOD = 1_000_000_007;

/**
 * 3336. Find the Number of Subsequences With Equal GCD
 *
 * Count the pairs of non-empty, disjoint subsequences of `nums` with equal
 * GCDs, modulo 10⁹ + 7.
 *
 * Dynamic programming over the elements, keeping counts for each pair of
 * GCDs so far (0 for an empty subsequence): each element joins the first,
 * the second or neither.
 *
 * @see https://leetcode.com/problems/find-the-number-of-subsequences-with-equal-gcd/
 * @difficulty Hard
 * @timeComplexity O(n · V²), for values up to V
 * @spaceComplexity O(V²)
 *
 * @example
 * findTheNumberOfSubsequencesWithEqualGcd([1, 2, 3, 4]); // 10
 */
export const findTheNumberOfSubsequencesWithEqualGcd = (
	nums: readonly number[],
): number => {
	const max = Math.max(...nums);
	const size = max + 1;
	const gcd = new Int32Array(size * size);
	for (let a = 0; a <= max; a++)
		for (let b = 0; b <= max; b++) {
			let [x, y] = [a, b];
			while (y) [x, y] = [y, x % y];
			gcd[a * size + b] = x;
		}
	let ways = new Float64Array(size * size);
	ways[0] = 1;
	for (const num of nums) {
		const next = Float64Array.from(ways);
		for (let a = 0; a <= max; a++)
			for (let b = 0; b <= max; b++) {
				const count = ways[a * size + b] ?? 0;
				if (count === 0) continue;
				const first = (gcd[a * size + num] ?? 0) * size + b;
				const second = a * size + (gcd[b * size + num] ?? 0);
				next[first] = ((next[first] ?? 0) + count) % MOD;
				next[second] = ((next[second] ?? 0) + count) % MOD;
			}
		ways = next;
	}
	let total = 0;
	for (let g = 1; g <= max; g++)
		total = (total + (ways[g * size + g] ?? 0)) % MOD;
	return total;
};
