/**
 * 3096. Minimum Levels to Gain More Points
 *
 * Alice plays a prefix of the levels and Bob the rest, each playing at
 * least one. A possible level (1) scores +1 and an impossible one (0)
 * scores -1. Returns the fewest levels Alice must play to score more than
 * Bob, or -1.
 *
 * Walk the split point forward, tracking Alice's score against the total.
 *
 * @see https://leetcode.com/problems/minimum-levels-to-gain-more-points/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(1)
 *
 * @example
 * minimumLevelsToGainMorePoints([1, 0, 1, 0]); // 1
 */
export const minimumLevelsToGainMorePoints = (
	possible: readonly number[],
): number => {
	const total = possible.reduce(
		(sum, level) => sum + (level === 1 ? 1 : -1),
		0,
	);
	let alice = 0;
	for (let i = 0; i + 1 < possible.length; i++) {
		alice += possible[i] === 1 ? 1 : -1;
		if (alice > total - alice) return i + 1;
	}
	return -1;
};
