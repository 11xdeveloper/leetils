/**
 * 4063. Longest Subarray Divisible by K with At Most One Negation I
 *
 * The longest subarray whose sum is divisible by `k`, possibly after
 * negating one of its elements, or 0.
 *
 * Negating x changes the sum by -2x. Extend from every start, keeping the
 * residues of 2x for the elements so far.
 *
 * @see https://leetcode.com/problems/longest-subarray-divisible-by-k-with-at-most-one-negation-i/
 * @difficulty Medium
 * @timeComplexity O(n²)
 * @spaceComplexity O(n)
 *
 * @example
 * longestSubarrayDivisibleByKWithAtMostOneNegationI([2, 2, 5], 6); // 2
 */
export const longestSubarrayDivisibleByKWithAtMostOneNegationI = (
	nums: readonly number[],
	k: number,
): number => {
	const mod = (x: number) => ((x % k) + k) % k;
	let best = 0;
	for (let i = 0; i < nums.length; i++) {
		const doubled = new Set<number>();
		let sum = 0;
		for (let j = i; j < nums.length; j++) {
			sum = mod(sum + (nums[j] ?? 0));
			doubled.add(mod(2 * (nums[j] ?? 0)));
			if (sum === 0 || doubled.has(sum)) best = Math.max(best, j - i + 1);
		}
	}
	return best;
};
