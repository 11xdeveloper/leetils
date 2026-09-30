/**
 * 1394. Find Lucky Integer in an Array
 *
 * A lucky integer appears in `arr` exactly as many times as its value.
 * Returns the largest lucky integer, or -1 if there's none.
 *
 * Counts each value, then checks them.
 *
 * @see https://leetcode.com/problems/find-lucky-integer-in-an-array/
 * @difficulty Easy
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * findLuckyIntegerInAnArray([1, 2, 2, 3, 3, 3]); // 3
 */
export const findLuckyIntegerInAnArray = (arr: readonly number[]): number => {
	const counts = new Map<number, number>();
	for (const value of arr) counts.set(value, (counts.get(value) ?? 0) + 1);
	let lucky = -1;
	for (const [value, count] of counts)
		if (value === count) lucky = Math.max(lucky, value);
	return lucky;
};
