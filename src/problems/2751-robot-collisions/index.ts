/**
 * 2751. Robot Collisions
 *
 * Robots on a line move left or right at the same speed. When two meet,
 * the weaker is removed and the stronger loses 1 health; equal ones are
 * both removed. Returns the survivors' healths in input order.
 *
 * Sweep by position with a stack of right-movers; each left-mover fights
 * them from the nearest outwards.
 *
 * @see https://leetcode.com/problems/robot-collisions/
 * @difficulty Hard
 * @timeComplexity O(n log n)
 * @spaceComplexity O(n)
 *
 * @example
 * robotCollisions([3, 5, 2, 6], [10, 10, 15, 12], "RLRL"); // [14]
 */
export const robotCollisions = (
	positions: readonly number[],
	healths: readonly number[],
	directions: string,
): number[] => {
	const health = [...healths];
	const order = positions
		.map((_, i) => i)
		.sort((a, b) => (positions[a] ?? 0) - (positions[b] ?? 0));
	const rightward: number[] = [];
	for (const robot of order) {
		if (directions.charAt(robot) === "R") {
			rightward.push(robot);
			continue;
		}
		while ((health[robot] ?? 0) > 0 && rightward.length > 0) {
			const other = rightward.at(-1) ?? 0;
			const mine = health[robot] ?? 0;
			const theirs = health[other] ?? 0;
			if (theirs > mine) {
				health[other] = theirs - 1;
				health[robot] = 0;
			} else {
				rightward.pop();
				health[other] = 0;
				health[robot] = theirs === mine ? 0 : mine - 1;
			}
		}
	}
	return health.filter((h) => h > 0);
};
