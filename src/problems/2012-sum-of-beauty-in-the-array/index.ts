/**
 * 2012. Sum of Beauty in the Array
 *
 * An inner element's beauty is 2 if it is greater than everything before
 * it and less than everything after it, 1 if it is just between its
 * neighbours, and 0 otherwise. Returns the total beauty.
 *
 * Suffix minimums and a running prefix maximum answer the first test.
 *
 * @see https://leetcode.com/problems/sum-of-beauty-in-the-array/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * sumOfBeautyInTheArray([2, 4, 6, 4]); // 1
 */
export const sumOfBeautyInTheArray = (nums: readonly number[]): number => {
	const n = nums.length;
	const suffixMin = new Array<number>(n + 1).fill(Infinity);
	for (let i = n - 1; i >= 0; i--)
		suffixMin[i] = Math.min(suffixMin[i + 1] ?? Infinity, nums[i] ?? 0);
	let [beauty, prefixMax] = [0, nums[0] ?? 0];
	for (let i = 1; i < n - 1; i++) {
		const value = nums[i] ?? 0;
		if (prefixMax < value && value < (suffixMin[i + 1] ?? 0)) beauty += 2;
		else if ((nums[i - 1] ?? 0) < value && value < (nums[i + 1] ?? 0))
			beauty += 1;
		prefixMax = Math.max(prefixMax, value);
	}
	return beauty;
};
