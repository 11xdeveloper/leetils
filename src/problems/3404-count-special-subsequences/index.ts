const gcd = (a: number, b: number): number => {
	let [x, y] = [a, b];
	while (y) [x, y] = [y, x % y];
	return x;
};

/**
 * 3404. Count Special Subsequences
 *
 * Count index quadruples p < q < r < s, each at least two apart, with
 * `nums[p] · nums[r] = nums[q] · nums[s]`.
 *
 * The condition says `nums[p] / nums[q] = nums[s] / nums[r]`. Sweep r,
 * adding each newly allowed (p, q) pair's reduced fraction to a count, then
 * look up each s's fraction.
 *
 * @see https://leetcode.com/problems/count-special-subsequences/
 * @difficulty Medium
 * @timeComplexity O(n² log max)
 * @spaceComplexity O(n²)
 *
 * @example
 * countSpecialSubsequences([1, 2, 3, 4, 3, 6, 1]); // 1
 */
export const countSpecialSubsequences = (nums: readonly number[]): number => {
	const n = nums.length;
	const key = (a: number, b: number): number => {
		const g = gcd(a, b);
		return (a / g) * 1001 + b / g;
	};
	const ratios = new Map<number, number>();
	let total = 0;
	for (let r = 4; r < n - 2; r++) {
		const q = r - 2;
		for (let p = 0; p <= q - 2; p++) {
			const k = key(nums[p] ?? 1, nums[q] ?? 1);
			ratios.set(k, (ratios.get(k) ?? 0) + 1);
		}
		for (let s = r + 2; s < n; s++)
			total += ratios.get(key(nums[s] ?? 1, nums[r] ?? 1)) ?? 0;
	}
	return total;
};
