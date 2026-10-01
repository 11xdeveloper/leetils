/**
 * 1950. Maximum of Minimum Values in All Subarrays
 *
 * For each window size `i + 1`, returns the largest minimum over all
 * subarrays of that size.
 *
 * With a monotonic stack, each element is the minimum of windows up to
 * the span between its nearest smaller neighbours; record it for that
 * size, then carry answers down to smaller sizes.
 *
 * @see https://leetcode.com/problems/maximum-of-minimum-values-in-all-subarrays/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * maximumOfMinimumValuesInAllSubarrays([10, 20, 50, 10]); // [50, 20, 10, 10]
 */
export const maximumOfMinimumValuesInAllSubarrays = (
	nums: readonly number[],
): number[] => {
	const n = nums.length;
	const answer = new Array<number>(n).fill(-Infinity);
	const stack: number[] = [];
	for (let end = 0; end <= n; end++) {
		const value = end < n ? (nums[end] ?? 0) : -Infinity;
		while (stack.length > 0 && (nums[stack.at(-1) ?? 0] ?? 0) >= value) {
			const i = stack.pop() ?? 0;
			const span = end - (stack.at(-1) ?? -1) - 1;
			answer[span - 1] = Math.max(answer[span - 1] ?? -Infinity, nums[i] ?? 0);
		}
		stack.push(end);
	}
	for (let size = n - 2; size >= 0; size--)
		answer[size] = Math.max(
			answer[size] ?? -Infinity,
			answer[size + 1] ?? -Infinity,
		);
	return answer;
};
