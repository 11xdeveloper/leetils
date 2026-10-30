/**
 * 2145. Count the Hidden Sequences
 *
 * A hidden sequence has consecutive differences `differences` and values
 * in `[lower, upper]`. Counts the possible hidden sequences.
 *
 * The sequence is fixed up to its starting value; its prefix sums span a
 * range of width `max - min`, which must fit in `[lower, upper]`.
 *
 * @see https://leetcode.com/problems/count-the-hidden-sequences/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(1)
 *
 * @example
 * countTheHiddenSequences([1, -3, 4], 1, 6); // 2
 */
export const countTheHiddenSequences = (
	differences: readonly number[],
	lower: number,
	upper: number,
): number => {
	let [value, low, high] = [0, 0, 0];
	for (const difference of differences) {
		value += difference;
		low = Math.min(low, value);
		high = Math.max(high, value);
	}
	return Math.max(0, upper - lower - (high - low) + 1);
};
