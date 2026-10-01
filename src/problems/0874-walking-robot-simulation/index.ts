/**
 * 874. Walking Robot Simulation
 *
 * A robot starts at the origin facing north. Command -2 turns left, -1
 * turns right, and 1 to 9 moves that many unit steps, stopping before any
 * obstacle. Returns the largest squared distance from the origin it ever
 * reaches.
 *
 * Simulates step by step, with the obstacles in a set.
 *
 * @see https://leetcode.com/problems/walking-robot-simulation/
 * @difficulty Medium
 * @timeComplexity O(total steps + number of obstacles)
 * @spaceComplexity O(number of obstacles)
 *
 * @example
 * walkingRobotSimulation([4, -1, 4, -2, 4], [[2, 4]]); // 65
 */
export const walkingRobotSimulation = (
	commands: readonly number[],
	obstacles: readonly (readonly number[])[],
): number => {
	const blocked = new Set(obstacles.map(([x = 0, y = 0]) => `${x},${y}`));
	const directions = [
		[0, 1],
		[1, 0],
		[0, -1],
		[-1, 0],
	] as const;
	let facing = 0;
	let x = 0;
	let y = 0;
	let furthest = 0;
	for (const command of commands) {
		if (command === -2) facing = (facing + 3) % 4;
		else if (command === -1) facing = (facing + 1) % 4;
		else {
			const [dx, dy] = directions[facing] ?? [0, 0];
			for (
				let step = 0;
				step < command && !blocked.has(`${x + dx},${y + dy}`);
				step++
			) {
				x += dx;
				y += dy;
			}
			furthest = Math.max(furthest, x * x + y * y);
		}
	}
	return furthest;
};
