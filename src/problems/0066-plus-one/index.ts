/**
 * 66. Plus One
 *
 * Adds one to a non-negative integer stored as an array of digits, most
 * significant first, and returns the result in the same form.
 *
 * Turns trailing 9s into 0s until it reaches a digit it can increment. If
 * every digit was 9, the result gains a leading 1.
 *
 * @see https://leetcode.com/problems/plus-one/
 * @difficulty Easy
 * @timeComplexity O(n)
 * @spaceComplexity O(n) for the returned array
 *
 * @example
 * plusOne([1, 2, 3]); // [1, 2, 4]
 * plusOne([9, 9]); // [1, 0, 0]
 */
export const plusOne = (digits: readonly number[]): number[] => {
	const result = [...digits];

	for (let i = result.length - 1; i >= 0; i--) {
		const digit = result[i] ?? 0;
		if (digit < 9) {
			result[i] = digit + 1;
			return result;
		}
		result[i] = 0;
	}

	return [1, ...result];
};
