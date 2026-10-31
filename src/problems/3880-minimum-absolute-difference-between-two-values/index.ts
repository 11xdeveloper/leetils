/**
 * 3880. Minimum Absolute Difference Between Two Values
 *
 * The smallest distance between an index holding 1 and one holding 2, or
 * -1.
 *
 * @see https://leetcode.com/problems/minimum-absolute-difference-between-two-values/
 * @difficulty Easy
 * @timeComplexity O(n)
 * @spaceComplexity O(1)
 *
 * @example
 * minimumAbsoluteDifferenceBetweenTwoValues([1, 0, 0, 2, 0, 1]); // 2
 */
export const minimumAbsoluteDifferenceBetweenTwoValues = (
	nums: readonly number[],
): number => {
	let [lastOne, lastTwo, best] = [-1, -1, -1];
	nums.forEach((num, i) => {
		if (num === 1) lastOne = i;
		else if (num === 2) lastTwo = i;
		else return;
		const other = num === 1 ? lastTwo : lastOne;
		if (other >= 0 && (best < 0 || i - other < best)) best = i - other;
	});
	return best;
};
