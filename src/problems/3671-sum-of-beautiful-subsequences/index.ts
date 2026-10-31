const MOD = 1_000_000_007;

/**
 * 3671. Sum of Beautiful Subsequences
 *
 * For every g, count the strictly increasing subsequences of `nums` whose
 * gcd is exactly g; returns the sum of g times that count, modulo 1e9+7.
 *
 * For each d, count the strictly increasing subsequences using only
 * multiples of d, with a Fenwick tree over those values. Then subtract
 * multiples of d from the top down to get exact gcds.
 *
 * @see https://leetcode.com/problems/sum-of-beautiful-subsequences/
 * @difficulty Hard
 * @timeComplexity O(V log V + n · σ(V) · log n), for σ the most divisors
 * @spaceComplexity O(V + n)
 *
 * @example
 * sumOfBeautifulSubsequences([1, 2, 3]); // 10
 */
export const sumOfBeautifulSubsequences = (nums: readonly number[]): number => {
	const limit = Math.max(...nums);
	const positions: number[][] = Array.from({ length: limit + 1 }, () => []);
	nums.forEach((num, i) => {
		positions[num]?.push(i);
	});
	const exact = new Array<number>(limit + 1).fill(0);
	for (let d = limit; d >= 1; d--) {
		// Indices of multiples of d, in array order.
		const indices: number[] = [];
		for (let x = d; x <= limit; x += d) indices.push(...(positions[x] ?? []));
		if (indices.length === 0) continue;
		indices.sort((a, b) => a - b);
		const values = [...new Set(indices.map((i) => nums[i] ?? 0))].sort(
			(a, b) => a - b,
		);
		const rank = new Map(values.map((v, i) => [v, i + 1]));
		const tree = new Array<number>(values.length + 1).fill(0);
		let total = 0;
		for (const i of indices) {
			const r = rank.get(nums[i] ?? 0) ?? 1;
			let ways = 1;
			for (let j = r - 1; j > 0; j -= j & -j)
				ways = (ways + (tree[j] ?? 0)) % MOD;
			for (let j = r; j <= values.length; j += j & -j)
				tree[j] = ((tree[j] ?? 0) + ways) % MOD;
			total = (total + ways) % MOD;
		}
		for (let m = 2 * d; m <= limit; m += d)
			total = (total - (exact[m] ?? 0) + MOD) % MOD;
		exact[d] = total;
	}
	let sum = 0;
	exact.forEach((count, g) => {
		sum = (sum + ((g * count) % MOD)) % MOD;
	});
	return sum;
};
