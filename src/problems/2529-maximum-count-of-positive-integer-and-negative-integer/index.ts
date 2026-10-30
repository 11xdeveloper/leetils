/**
 * 2529. Maximum Count of Positive Integer and Negative Integer
 *
 * Returns the larger of the number of positive and the number of negative
 * integers in a sorted array.
 *
 * Binary search for where the negatives end and the positives begin.
 *
 * @see https://leetcode.com/problems/maximum-count-of-positive-integer-and-negative-integer/
 * @difficulty Easy
 * @timeComplexity O(log n)
 * @spaceComplexity O(1)
 *
 * @example
 * maximumCountOfPositiveIntegerAndNegativeInteger([-2, -1, -1, 1, 2, 3]); // 3
 */
export const maximumCountOfPositiveIntegerAndNegativeInteger = (
	nums: readonly number[],
): number => {
	/** The first index whose value is at least `target`. */
	const lowerBound = (target: number): number => {
		let low = 0;
		let high = nums.length;
		while (low < high) {
			const mid = (low + high) >> 1;
			if ((nums[mid] ?? 0) < target) low = mid + 1;
			else high = mid;
		}
		return low;
	};
	return Math.max(lowerBound(0), nums.length - lowerBound(1));
};
