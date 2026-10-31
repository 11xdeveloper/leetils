const MOD = 1_000_000_007;

const multiply = (a: number, b: number): number =>
	(((a * Math.floor(b / 65536)) % MOD) * 65536 + a * (b % 65536)) % MOD;

const inverse = (a: number): number => {
	let result = 1;
	for (let base = a, e = MOD - 2; e > 0; e = Math.floor(e / 2)) {
		if (e % 2 === 1) result = multiply(result, base);
		base = multiply(base, base);
	}
	return result;
};

/**
 * 3655. XOR After Range Multiplication Queries II
 *
 * Each query `[l, r, k, v]` multiplies `nums[l]`, `nums[l + k]`, … up to
 * index r by v, modulo 1e9+7. Returns the XOR of the final array.
 *
 * Split by step size. A query with a large step touches few indices, so
 * apply it directly. Queries with the same small step share a
 * multiplicative difference array along that step: multiply by v at l and
 * by v⁻¹ just past the last index hit, then sweep with stride k.
 *
 * @see https://leetcode.com/problems/xor-after-range-multiplication-queries-ii/
 * @difficulty Hard
 * @timeComplexity O((n + q)√n + q log MOD)
 * @spaceComplexity O(n + q)
 *
 * @example
 * xorAfterRangeMultiplicationQueriesII([2, 3, 1, 5, 4], [[1, 4, 2, 3], [0, 2, 1, 2]]); // 31
 */
export const xorAfterRangeMultiplicationQueriesII = (
	nums: readonly number[],
	queries: readonly (readonly number[])[],
): number => {
	const n = nums.length;
	const limit = Math.max(1, Math.floor(Math.sqrt(n)));
	const values = [...nums];
	const byStep = new Map<number, (readonly number[])[]>();
	for (const query of queries) {
		const [l = 0, r = 0, k = 1, v = 1] = query;
		if (k >= limit)
			for (let i = l; i <= r; i += k) values[i] = multiply(values[i] ?? 0, v);
		else {
			const list = byStep.get(k) ?? [];
			list.push(query);
			byStep.set(k, list);
		}
	}
	const factor = new Array<number>(n);
	for (const [k, list] of byStep) {
		factor.fill(1);
		for (const [l = 0, r = 0, , v = 1] of list) {
			factor[l] = multiply(factor[l] ?? 1, v);
			const past = l + (Math.floor((r - l) / k) + 1) * k;
			if (past < n) factor[past] = multiply(factor[past] ?? 1, inverse(v));
		}
		for (let i = 0; i < n; i++) {
			if (i >= k) factor[i] = multiply(factor[i] ?? 1, factor[i - k] ?? 1);
			values[i] = multiply(values[i] ?? 0, factor[i] ?? 1);
		}
	}
	return values.reduce((a, b) => a ^ b, 0);
};
