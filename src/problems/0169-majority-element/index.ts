/**
 * 169. Majority Element
 *
 * Returns the value that appears more than `n / 2` times in `nums`, which
 * always exists.
 *
 * The Boyer–Moore majority vote: keeps a candidate and a count, cancelling
 * one occurrence of the candidate against each different value. The
 * majority value outnumbers all others combined, so it's the candidate left
 * at the end.
 *
 * @see https://leetcode.com/problems/majority-element/
 * @difficulty Easy
 * @timeComplexity O(n)
 * @spaceComplexity O(1)
 *
 * @example
 * majorityElement([2, 2, 1, 1, 1, 2, 2]); // 2
 */
export const majorityElement = (nums: readonly number[]): number => {
	let candidate = 0;
	let count = 0;

	for (const num of nums) {
		if (count === 0) candidate = num;
		count += num === candidate ? 1 : -1;
	}

	return candidate;
};
