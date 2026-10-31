/**
 * 3206. Alternating Groups I
 *
 * In a circle of red (0) and blue (1) tiles, count the runs of three tiles
 * where the middle one differs from both neighbours.
 *
 * Check every tile as the middle, wrapping around the ends.
 *
 * @see https://leetcode.com/problems/alternating-groups-i/
 * @difficulty Easy
 * @timeComplexity O(n)
 * @spaceComplexity O(1)
 *
 * @example
 * alternatingGroupsI([0, 1, 0, 0, 1]); // 3
 */
export const alternatingGroupsI = (colors: readonly number[]): number => {
	const n = colors.length;
	let groups = 0;
	for (let i = 0; i < n; i++) {
		const middle = colors[i];
		if (middle !== colors[(i + n - 1) % n] && middle !== colors[(i + 1) % n])
			groups++;
	}
	return groups;
};
