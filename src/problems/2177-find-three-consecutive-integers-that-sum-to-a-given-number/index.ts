/**
 * 2177. Find Three Consecutive Integers That Sum to a Given Number
 *
 * Returns three consecutive integers summing to `num`, or `[]`.
 *
 * They are `x - 1, x, x + 1` with `3x = num`.
 *
 * @see https://leetcode.com/problems/find-three-consecutive-integers-that-sum-to-a-given-number/
 * @difficulty Medium
 * @timeComplexity O(1)
 * @spaceComplexity O(1)
 *
 * @example
 * findThreeConsecutiveIntegersThatSumToAGivenNumber(33); // [10, 11, 12]
 */
export const findThreeConsecutiveIntegersThatSumToAGivenNumber = (
	num: number,
): number[] => {
	if (num % 3) return [];
	const middle = num / 3;
	return [middle - 1, middle, middle + 1];
};
