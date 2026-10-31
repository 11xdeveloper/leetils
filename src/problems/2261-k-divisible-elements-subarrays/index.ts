/**
 * 2261. K Divisible Elements Subarrays
 *
 * Counts the distinct subarrays with at most `k` elements divisible by
 * `p`.
 *
 * Extend subarrays from each start until they hold too many, collecting
 * them as strings in a set (arrays are short).
 *
 * @see https://leetcode.com/problems/k-divisible-elements-subarrays/
 * @difficulty Medium
 * @timeComplexity O(n^3)
 * @spaceComplexity O(n^3)
 *
 * @example
 * kDivisibleElementsSubarrays([2, 3, 3, 2, 2], 2, 2); // 11
 */
export const kDivisibleElementsSubarrays = (
	nums: readonly number[],
	k: number,
	p: number,
): number => {
	const seen = new Set<string>();
	for (let start = 0; start < nums.length; start++) {
		let [divisible, key] = [0, ""];
		for (let end = start; end < nums.length; end++) {
			const num = nums[end] ?? 0;
			if (num % p === 0 && ++divisible > k) break;
			key += `${num},`;
			seen.add(key);
		}
	}
	return seen.size;
};
