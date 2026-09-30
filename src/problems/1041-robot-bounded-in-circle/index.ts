/**
 * 1041. Robot Bounded In Circle
 *
 * A robot at the origin facing north repeats `instructions` (`G` forward,
 * `L`/`R` turn) forever. Returns whether it stays within some circle.
 *
 * After one pass, if it's back at the origin or facing a different
 * direction, repeating the pass (at most four times) brings it home, so it
 * stays bounded. Facing north away from the origin, it drifts forever.
 *
 * @see https://leetcode.com/problems/robot-bounded-in-circle/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(1)
 *
 * @example
 * robotBoundedInCircle("GGLLGG"); // true
 */
export const robotBoundedInCircle = (instructions: string): boolean => {
	const directions = [
		[0, 1],
		[1, 0],
		[0, -1],
		[-1, 0],
	] as const;
	let [x, y, facing] = [0, 0, 0];
	for (const instruction of instructions) {
		if (instruction === "L") facing = (facing + 3) % 4;
		else if (instruction === "R") facing = (facing + 1) % 4;
		else {
			const [dx, dy] = directions[facing] ?? [0, 0];
			x += dx;
			y += dy;
		}
	}
	return (x === 0 && y === 0) || facing !== 0;
};
