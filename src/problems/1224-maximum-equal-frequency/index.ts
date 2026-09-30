/**
 * 1224. Maximum Equal Frequency
 *
 * Returns the length of the longest prefix of `nums` from which removing
 * exactly one element leaves every remaining value with the same count.
 *
 * Tracks each value's count and how many values have each count. A prefix
 * of length `len` works if every value appears once, if all values but one
 * share the top count and that one appears once, or if one value has the
 * top count and all others have one less.
 *
 * @see https://leetcode.com/problems/maximum-equal-frequency/
 * @difficulty Hard
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * maximumEqualFrequency([2, 2, 1, 1, 5, 3, 3, 5]); // 7
 */
export const maximumEqualFrequency = (nums: readonly number[]): number => {
	const count = new Map<number, number>();
	const valuesWithCount = new Map<number, number>();
	let [top, longest] = [0, 0];
	nums.forEach((num, i) => {
		const before = count.get(num) ?? 0;
		const after = before + 1;
		count.set(num, after);
		valuesWithCount.set(before, (valuesWithCount.get(before) ?? 0) - 1);
		valuesWithCount.set(after, (valuesWithCount.get(after) ?? 0) + 1);
		top = Math.max(top, after);
		const length = i + 1;
		const atTop = valuesWithCount.get(top) ?? 0;
		const belowTop = valuesWithCount.get(top - 1) ?? 0;
		if (
			top === 1 ||
			atTop * top + 1 === length ||
			(atTop === 1 && belowTop * (top - 1) + top === length)
		) {
			longest = length;
		}
	});
	return longest;
};
