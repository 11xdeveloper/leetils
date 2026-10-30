/**
 * 2411. Smallest Subarrays With Maximum Bitwise OR
 *
 * Returns, for each start index, the length of the shortest subarray
 * starting there whose OR equals the OR of the whole suffix.
 *
 * Scan from the right, remembering the nearest index holding each bit; a
 * start must reach the furthest of those.
 *
 * @see https://leetcode.com/problems/smallest-subarrays-with-maximum-bitwise-or/
 * @difficulty Medium
 * @timeComplexity O(30 · n)
 * @spaceComplexity O(30)
 *
 * @example
 * smallestSubarraysWithMaximumBitwiseOr([1, 0, 2, 1, 3]); // [3, 3, 2, 2, 1]
 */
export const smallestSubarraysWithMaximumBitwiseOr = (
	nums: readonly number[],
): number[] => {
	const nearest = new Array<number>(30).fill(-1);
	const answer = new Array<number>(nums.length).fill(1);
	for (let i = nums.length - 1; i >= 0; i--) {
		let reach = i;
		for (let bit = 0; bit < 30; bit++) {
			if ((nums[i] ?? 0) & (1 << bit)) nearest[bit] = i;
			reach = Math.max(reach, nearest[bit] ?? -1);
		}
		answer[i] = reach - i + 1;
	}
	return answer;
};
