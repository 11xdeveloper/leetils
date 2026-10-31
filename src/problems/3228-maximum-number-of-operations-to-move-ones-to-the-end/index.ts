/**
 * 3228. Maximum Number of Operations to Move Ones to the End
 *
 * An operation slides a 1 that has a 0 right after it rightwards until it
 * hits the end or another 1. Returns the most operations possible.
 *
 * Move the leftmost movable ones first, so they pile up and each block of
 * zeros is crossed once by every 1 before it. Add the ones seen so far at
 * the start of each block of zeros.
 *
 * @see https://leetcode.com/problems/maximum-number-of-operations-to-move-ones-to-the-end/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(1)
 *
 * @example
 * maximumNumberOfOperationsToMoveOnesToTheEnd("1001101"); // 4
 */
export const maximumNumberOfOperationsToMoveOnesToTheEnd = (
	s: string,
): number => {
	let ones = 0;
	let operations = 0;
	for (let i = 0; i < s.length; i++)
		if (s[i] === "1") ones++;
		else if (i > 0 && s[i - 1] === "1") operations += ones;
	return operations;
};
