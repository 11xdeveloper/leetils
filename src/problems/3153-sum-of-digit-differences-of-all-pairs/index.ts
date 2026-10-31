/**
 * 3153. Sum of Digit Differences of All Pairs
 *
 * For numbers with the same number of digits, add up over all pairs the
 * count of positions where their digits differ.
 *
 * Per position, count each digit; the pairs that differ there are all
 * pairs minus those sharing a digit.
 *
 * @see https://leetcode.com/problems/sum-of-digit-differences-of-all-pairs/
 * @difficulty Medium
 * @timeComplexity O(n log max)
 * @spaceComplexity O(1)
 *
 * @example
 * sumOfDigitDifferencesOfAllPairs([13, 23, 12]); // 4
 */
export const sumOfDigitDifferencesOfAllPairs = (
	nums: readonly number[],
): number => {
	const n = nums.length;
	let total = 0;
	for (let place = 1; place <= (nums[0] ?? 0); place *= 10) {
		const counts = new Array<number>(10).fill(0);
		for (const num of nums)
			counts[Math.floor(num / place) % 10] =
				(counts[Math.floor(num / place) % 10] ?? 0) + 1;
		let same = 0;
		for (const count of counts) same += (count * (count - 1)) / 2;
		total += (n * (n - 1)) / 2 - same;
	}
	return total;
};
