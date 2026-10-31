const gcd = (a: number, b: number): number => {
	let [x, y] = [a, b];
	while (y) [x, y] = [y, x % y];
	return x;
};

/**
 * 3411. Maximum Subarray With Equal Products
 *
 * The length of the longest subarray whose product equals its LCM times its
 * GCD.
 *
 * Extend every start, tracking the product exactly with BigInt alongside
 * the LCM and GCD.
 *
 * @see https://leetcode.com/problems/maximum-subarray-with-equal-products/
 * @difficulty Easy
 * @timeComplexity O(n²)
 * @spaceComplexity O(1)
 *
 * @example
 * maximumSubarrayWithEqualProducts([1, 2, 1, 2, 1, 1, 1]); // 5
 */
export const maximumSubarrayWithEqualProducts = (
	nums: readonly number[],
): number => {
	let best = 0;
	for (let start = 0; start < nums.length; start++) {
		let product = 1n;
		let lcm = 1;
		let g = 0;
		for (let end = start; end < nums.length; end++) {
			const num = nums[end] ?? 1;
			product *= BigInt(num);
			lcm = (lcm / gcd(lcm, num)) * num;
			g = gcd(g, num);
			if (product === BigInt(lcm) * BigInt(g))
				best = Math.max(best, end - start + 1);
		}
	}
	return best;
};
