/**
 * 932. Beautiful Array
 *
 * Returns a permutation of 1 to `n` with no `i < k < j` where
 * `2 · nums[k] = nums[i] + nums[j]`. Any such permutation is accepted.
 *
 * Odd numbers before even numbers can never form such a triple across the
 * halves (odd + even is odd). The property survives `x → 2x - 1` and
 * `x → 2x`, so a beautiful array for `⌈n/2⌉` mapped to odds, followed by one
 * for `⌊n/2⌋` mapped to evens, is beautiful. Built iteratively by doubling.
 *
 * @see https://leetcode.com/problems/beautiful-array/
 * @difficulty Medium
 * @timeComplexity O(n log n)
 * @spaceComplexity O(n)
 *
 * @example
 * beautifulArray(4); // [1, 3, 2, 4]
 */
export const beautifulArray = (n: number): number[] => {
	let result = [1];
	while (result.length < n)
		result = [...result.map((x) => 2 * x - 1), ...result.map((x) => 2 * x)];
	return result.filter((x) => x <= n);
};
