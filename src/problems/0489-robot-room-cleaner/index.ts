/** The robot LeetCode provides. */
interface Robot {
	/** Moves forward one cell and returns true, or returns false (without moving) if a wall is in the way. */
	move(): boolean;
	/** Turns 90 degrees left without moving. */
	turnLeft(): void;
	/** Turns 90 degrees right without moving. */
	turnRight(): void;
	/** Cleans the current cell. */
	clean(): void;
}

/**
 * 489. Robot Room Cleaner
 *
 * Cleans every reachable cell of a room using only the robot's controls:
 * the layout and the robot's position are unknown, and it starts facing up.
 *
 * Depth-first search in coordinates relative to the start. From each cell
 * the robot tries all four directions, turning right between them. Moving
 * into a new cell explores it, then backs out (turn around, move, turn
 * around) so the robot is where and how it was before. The search keeps its
 * own stack rather than recursing, since a room has up to 20,000 cells.
 *
 * @see https://leetcode.com/problems/robot-room-cleaner/
 * @difficulty Hard
 * @timeComplexity O(c) robot operations for c open cells
 * @spaceComplexity O(c)
 *
 * @example
 * robotRoomCleaner(robot); // every reachable cell is cleaned
 */
export const robotRoomCleaner = (robot: Robot): void => {
	// Up, right, down, left: each a right turn from the one before.
	const directions = [
		[-1, 0],
		[0, 1],
		[1, 0],
		[0, -1],
	] as const;

	const visited = new Set(["0,0"]);
	robot.clean();
	// Each frame is a cell, the direction the robot faced on arriving and how many directions it has tried.
	const stack = [{ row: 0, col: 0, facing: 0, tried: 0 }];

	while (stack.length > 0) {
		const frame = stack.at(-1);
		if (!frame) break;

		if (frame.tried === 4) {
			stack.pop();
			const parent = stack.at(-1);
			if (!parent) break;
			robot.turnRight();
			robot.turnRight();
			robot.move();
			robot.turnRight();
			robot.turnRight();
			parent.tried++;
			robot.turnRight();
			continue;
		}

		const facing = (frame.facing + frame.tried) % 4;
		const [dr, dc] = directions[facing] ?? [0, 0];
		const row = frame.row + dr;
		const col = frame.col + dc;
		const key = `${row},${col}`;
		if (!visited.has(key) && robot.move()) {
			visited.add(key);
			robot.clean();
			stack.push({ row, col, facing, tried: 0 });
		} else {
			frame.tried++;
			robot.turnRight();
		}
	}
};
