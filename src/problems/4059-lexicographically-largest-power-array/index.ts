/**
 * 4059. Lexicographically Largest Power Array
 *
 * Order `nums` so that, for bits 14 down to 0, the run at the front of
 * elements having that bit is as long as possible, the higher bits first.
 * Returns those 15 run lengths.
 *
 * Keep an ordered list of groups that later bits may still rearrange
 * within. For each bit, the run covers each leading group that has the bit
 * throughout, and the elements having it in the first group that doesn't,
 * which must go first there: split just that group. Later groups stay
 * free, and earlier runs keep their length.
 *
 * @see https://leetcode.com/problems/lexicographically-largest-power-array/
 * @difficulty Hard
 * @timeComplexity O(15 · n)
 * @spaceComplexity O(n)
 *
 * @example
 * lexicographicallyLargestPowerArray([3, 1, 7]); // [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 3]
 */
export const lexicographicallyLargestPowerArray = (
	nums: readonly number[],
): number[] => {
	const groups: number[][] = [[...nums]];
	const power: number[] = [];
	for (let bit = 14; bit >= 0; bit--) {
		let run = 0;
		for (let g = 0; g < groups.length; g++) {
			const group = groups[g] ?? [];
			const having = group.filter((x) => (x >> bit) & 1);
			run += having.length;
			if (having.length === group.length) continue;
			// Only this group must change: its elements with the bit go first.
			const rest = group.filter((x) => !((x >> bit) & 1));
			groups.splice(g, 1, ...[having, rest].filter((part) => part.length > 0));
			break;
		}
		power.push(run);
	}
	return power;
};
