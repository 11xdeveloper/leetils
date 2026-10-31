/**
 * 3046. Split the Array
 *
 * Whether `nums` can be split into two halves that each have distinct
 * elements.
 *
 * That works exactly when no value appears more than twice.
 *
 * @see https://leetcode.com/problems/split-the-array/
 * @difficulty Easy
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * splitTheArray([1, 1, 2, 2, 3, 4]); // true
 */
export const splitTheArray = (nums: readonly number[]): boolean => {
	const counts = new Map<number, number>();
	for (const num of nums) {
		const count = (counts.get(num) ?? 0) + 1;
		if (count > 2) return false;
		counts.set(num, count);
	}
	return true;
};
