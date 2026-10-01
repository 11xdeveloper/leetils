/**
 * 1824. Minimum Sideway Jumps
 *
 * A frog runs along lane 2 from point 0 to point `n`; `obstacles[i]` blocks
 * lane `obstacles[i]` at point `i` (0 for none). It may jump sideways to
 * any free lane at the same point. Returns the fewest sideways jumps.
 *
 * Track the fewest jumps to be in each lane at each point: move forward,
 * then let each lane be reached from the cheapest other lane plus one.
 *
 * @see https://leetcode.com/problems/minimum-sideway-jumps/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(1)
 *
 * @example
 * minimumSidewayJumps([0, 1, 2, 3, 0]); // 2
 */
export const minimumSidewayJumps = (obstacles: readonly number[]): number => {
	let jumps = [1, 0, 1];
	for (let point = 1; point < obstacles.length; point++) {
		const blocked = (obstacles[point] ?? 0) - 1;
		const forward = jumps.map((value, lane) =>
			lane === blocked ? Infinity : value,
		);
		const cheapest = Math.min(...forward);
		jumps = forward.map((value, lane) =>
			lane === blocked ? Infinity : Math.min(value, cheapest + 1),
		);
	}
	return Math.min(...jumps);
};
