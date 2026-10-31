/**
 * 3208. Alternating Groups II
 *
 * In a circle of red (0) and blue (1) tiles, count the runs of `k`
 * consecutive tiles whose colors alternate.
 *
 * Walk once around the circle plus k - 1 extra tiles, tracking the length
 * of the alternating run; every position where it reaches `k` ends a group.
 *
 * @see https://leetcode.com/problems/alternating-groups-ii/
 * @difficulty Medium
 * @timeComplexity O(n + k)
 * @spaceComplexity O(1)
 *
 * @example
 * alternatingGroupsII([0, 1, 0, 1, 0], 3); // 3
 */
export const alternatingGroupsII = (
	colors: readonly number[],
	k: number,
): number => {
	const n = colors.length;
	let groups = 0;
	let run = 1;
	for (let i = 1; i < n + k - 1; i++) {
		run = colors[i % n] !== colors[(i - 1) % n] ? run + 1 : 1;
		if (run >= k) groups++;
	}
	return groups;
};
