/**
 * 410. Split Array Largest Sum
 *
 * Splits `nums` into `k` non-empty contiguous parts so that the largest
 * part's sum is as small as possible, and returns that sum.
 *
 * Binary search on the answer: for a candidate limit, greedily filling each
 * part until the next number would exceed it gives the fewest parts
 * possible. The smallest limit needing at most `k` parts is the answer.
 *
 * @see https://leetcode.com/problems/split-array-largest-sum/
 * @difficulty Hard
 * @timeComplexity O(n log(sum))
 * @spaceComplexity O(1)
 *
 * @example
 * splitArrayLargestSum([7, 2, 5, 10, 8], 2); // 18: [7, 2, 5] and [10, 8]
 */
export const splitArrayLargestSum = (
	nums: readonly number[],
	k: number,
): number => {
	const partsNeeded = (limit: number): number => {
		let parts = 1;
		let sum = 0;
		for (const num of nums) {
			if (sum + num > limit) {
				parts++;
				sum = 0;
			}
			sum += num;
		}
		return parts;
	};

	let low = Math.max(...nums);
	let high = nums.reduce((total, num) => total + num, 0);
	while (low < high) {
		const mid = Math.floor((low + high) / 2);
		if (partsNeeded(mid) <= k) high = mid;
		else low = mid + 1;
	}

	return low;
};
