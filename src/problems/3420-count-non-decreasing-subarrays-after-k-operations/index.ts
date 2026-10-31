/**
 * 3420. Count Non-Decreasing Subarrays After K Operations
 *
 * Count the subarrays that can be made non-decreasing with at most `k`
 * increments in total.
 *
 * A subarray's cost is how far each element falls below the running
 * maximum before it. Grow windows leftwards: a new first element becomes
 * the running maximum until the next bigger one, so keep the window as a
 * stack of (maximum, length) blocks and merge the blocks it covers. Shrink
 * from the right while the cost is too high; the rightmost block tells
 * what the last element was raised to.
 *
 * @see https://leetcode.com/problems/count-non-decreasing-subarrays-after-k-operations/
 * @difficulty Hard
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * countNonDecreasingSubarraysAfterKOperations([6, 3, 1, 2, 4, 4], 7); // 17
 */
export const countNonDecreasingSubarraysAfterKOperations = (
	nums: readonly number[],
	k: number,
): number => {
	const n = nums.length;
	// Blocks from right (index `oldest`) to left (end of the array).
	const blockMax: number[] = [];
	const blockLength: number[] = [];
	let oldest = 0;
	let cost = 0;
	let total = 0;
	for (let left = n - 1, right = n - 1; left >= 0; left--) {
		const value = nums[left] ?? 0;
		let length = 1;
		while (blockMax.length > oldest && (blockMax.at(-1) ?? 0) <= value) {
			cost += (value - (blockMax.at(-1) ?? 0)) * (blockLength.at(-1) ?? 0);
			length += blockLength.pop() ?? 0;
			blockMax.pop();
		}
		blockMax.push(value);
		blockLength.push(length);
		while (cost > k) {
			cost -= (blockMax[oldest] ?? 0) - (nums[right--] ?? 0);
			blockLength[oldest] = (blockLength[oldest] ?? 0) - 1;
			if (blockLength[oldest] === 0) oldest++;
		}
		total += right - left + 1;
	}
	return total;
};
