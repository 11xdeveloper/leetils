/**
 * 414. Third Maximum Number
 *
 * Returns the third largest distinct value in `nums`, or the largest if
 * there are fewer than three distinct values.
 *
 * Keeps the three largest distinct values seen, shifting them down as larger
 * ones arrive.
 *
 * @see https://leetcode.com/problems/third-maximum-number/
 * @difficulty Easy
 * @timeComplexity O(n)
 * @spaceComplexity O(1)
 *
 * @example
 * thirdMaximumNumber([2, 2, 3, 1]); // 1
 */
export const thirdMaximumNumber = (nums: readonly number[]): number => {
	let first = Number.NEGATIVE_INFINITY;
	let second = Number.NEGATIVE_INFINITY;
	let third = Number.NEGATIVE_INFINITY;

	for (const num of nums) {
		if (num === first || num === second || num === third) continue;
		if (num > first) [first, second, third] = [num, first, second];
		else if (num > second) [second, third] = [num, second];
		else if (num > third) third = num;
	}

	return third === Number.NEGATIVE_INFINITY ? first : third;
};
