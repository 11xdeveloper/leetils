/**
 * 3670. Maximum Product of Two Integers With No Common Bits
 *
 * The largest product of two elements of `nums` that share no set bits,
 * or 0.
 *
 * Sum over subsets: for every mask, the largest element using only its
 * bits. Each element then pairs best with the largest element inside its
 * complement.
 *
 * @see https://leetcode.com/problems/maximum-product-of-two-integers-with-no-common-bits/
 * @difficulty Medium
 * @timeComplexity O(n + V log V)
 * @spaceComplexity O(V)
 *
 * @example
 * maximumProductOfTwoIntegersWithNoCommonBits([1, 2, 3, 4, 5, 6, 7]); // 12
 */
export const maximumProductOfTwoIntegersWithNoCommonBits = (
	nums: readonly number[],
): number => {
	let bits = 1;
	while (1 << bits <= Math.max(...nums)) bits++;
	const full = (1 << bits) - 1;
	const largest = new Int32Array(1 << bits);
	for (const num of nums) largest[num] = num;
	for (let bit = 0; bit < bits; bit++)
		for (let mask = 0; mask <= full; mask++)
			if ((mask >> bit) & 1)
				largest[mask] = Math.max(
					largest[mask] ?? 0,
					largest[mask ^ (1 << bit)] ?? 0,
				);
	let best = 0;
	for (const num of nums)
		best = Math.max(best, num * (largest[full ^ num] ?? 0));
	return best;
};
