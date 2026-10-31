const bitCount = (value: number): number => {
	let count = 0;
	for (let v = value; v; v &= v - 1) count++;
	return count;
};

/**
 * 3011. Find if Array Can Be Sorted
 *
 * Whether `nums` can be sorted by swapping neighbours that have the same
 * number of set bits.
 *
 * Elements can only move within runs of neighbours with the same bit
 * count, so each run can be sorted but never mixed with another. That works
 * if every run's minimum is at least the previous runs' maximum.
 *
 * @see https://leetcode.com/problems/find-if-array-can-be-sorted/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(1)
 *
 * @example
 * findIfArrayCanBeSorted([8, 4, 2, 30, 15]); // true
 * findIfArrayCanBeSorted([3, 16, 8, 4, 2]); // false
 */
export const findIfArrayCanBeSorted = (nums: readonly number[]): boolean => {
	let previousMax = 0;
	let runMin = 0;
	let runMax = 0;
	let runBits = -1;
	for (const num of nums) {
		const bits = bitCount(num);
		if (bits !== runBits) {
			previousMax = Math.max(previousMax, runMax);
			runBits = bits;
			runMin = num;
			runMax = num;
		} else {
			runMin = Math.min(runMin, num);
			runMax = Math.max(runMax, num);
		}
		if (runMin < previousMax) return false;
	}
	return true;
};
