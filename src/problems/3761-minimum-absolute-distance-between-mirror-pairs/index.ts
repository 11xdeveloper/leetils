/**
 * 3761. Minimum Absolute Distance Between Mirror Pairs
 *
 * A mirror pair is i < j with `nums[j]` equal to `nums[i]`'s digits
 * reversed (leading zeros dropped). Returns the smallest j - i over
 * mirror pairs, or -1.
 *
 * Sweep j, remembering the latest index whose reversal is each value.
 *
 * @see https://leetcode.com/problems/minimum-absolute-distance-between-mirror-pairs/
 * @difficulty Medium
 * @timeComplexity O(n log V)
 * @spaceComplexity O(n)
 *
 * @example
 * minimumAbsoluteDistanceBetweenMirrorPairs([12, 21, 45, 33, 54]); // 1
 */
export const minimumAbsoluteDistanceBetweenMirrorPairs = (
	nums: readonly number[],
): number => {
	const latest = new Map<number, number>();
	let best = -1;
	nums.forEach((num, j) => {
		const i = latest.get(num);
		if (i !== undefined && (best < 0 || j - i < best)) best = j - i;
		latest.set(Number([...String(num)].reverse().join("")), j);
	});
	return best;
};
