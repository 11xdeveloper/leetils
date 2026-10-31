/**
 * 2910. Minimum Number of Groups to Create a Valid Assignment
 *
 * Splits the balls, labelled by `balls`, into boxes holding a single
 * label each, with box sizes differing by at most 1. Returns the fewest
 * boxes.
 *
 * Try box sizes `s` and `s + 1` from the smallest count down. A count `c`
 * fits in `⌈c / (s + 1)⌉` boxes if that many boxes of size `s` don't
 * overflow it. The first `s` that fits every count gives the answer.
 *
 * @see https://leetcode.com/problems/minimum-number-of-groups-to-create-a-valid-assignment/
 * @difficulty Medium
 * @timeComplexity O(n + d · m), where `d` is the distinct labels and `m` the smallest count
 * @spaceComplexity O(d)
 *
 * @example
 * minimumNumberOfGroupsToCreateAValidAssignment([10, 10, 10, 3, 1, 1]); // 4
 */
export const minimumNumberOfGroupsToCreateAValidAssignment = (
	balls: readonly number[],
): number => {
	const counts = new Map<number, number>();
	for (const ball of balls) counts.set(ball, (counts.get(ball) ?? 0) + 1);
	const sizes = [...counts.values()];
	for (let s = Math.min(...sizes); s >= 1; s--) {
		let boxes = 0;
		let fits = true;
		for (const c of sizes) {
			const needed = Math.ceil(c / (s + 1));
			if (needed * s > c) {
				fits = false;
				break;
			}
			boxes += needed;
		}
		if (fits) return boxes;
	}
	return balls.length;
};
