/**
 * 2808. Minimum Seconds to Equalize a Circular Array
 *
 * Each second, every element of the circular array may become itself or
 * either neighbour, all at once. Returns the fewest seconds to make every
 * element equal.
 *
 * A value spreads one step each way per second, so it fills a gap
 * between consecutive occurrences `g` apart in `⌊g / 2⌋` seconds. Take
 * the value whose widest gap, around the circle, is smallest.
 *
 * @see https://leetcode.com/problems/minimum-seconds-to-equalize-a-circular-array/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * minimumSecondsToEqualizeACircularArray([2, 1, 3, 3, 2]); // 2
 */
export const minimumSecondsToEqualizeACircularArray = (
	nums: readonly number[],
): number => {
	const n = nums.length;
	const first = new Map<number, number>();
	const last = new Map<number, number>();
	const widest = new Map<number, number>();
	for (const [i, num] of nums.entries()) {
		const previous = last.get(num);
		if (previous === undefined) first.set(num, i);
		else widest.set(num, Math.max(widest.get(num) ?? 0, i - previous));
		last.set(num, i);
	}
	let best = n;
	for (const [num, start] of first) {
		const wrap = start + n - (last.get(num) ?? start);
		best = Math.min(best, Math.floor(Math.max(widest.get(num) ?? 0, wrap) / 2));
	}
	return best;
};
