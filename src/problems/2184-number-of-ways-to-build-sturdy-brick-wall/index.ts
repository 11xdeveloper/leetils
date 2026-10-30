/**
 * 2184. Number of Ways to Build Sturdy Brick Wall
 *
 * Builds a `height × width` wall from rows of bricks of the given widths
 * (height 1, unlimited supply). The wall is sturdy when adjacent rows never
 * have brick joints at the same position, except the ends. Counts the
 * sturdy walls, modulo 10^9 + 7.
 *
 * List every row as a bitmask of its joints, then count walls row by row,
 * allowing rows whose joint masks don't overlap.
 *
 * @see https://leetcode.com/problems/number-of-ways-to-build-sturdy-brick-wall/
 * @difficulty Medium
 * @timeComplexity O(height · R^2) for R possible rows
 * @spaceComplexity O(R^2)
 *
 * @example
 * numberOfWaysToBuildSturdyBrickWall(2, 3, [1, 2]); // 2
 */
export const numberOfWaysToBuildSturdyBrickWall = (
	height: number,
	width: number,
	bricks: readonly number[],
): number => {
	const MOD = 1_000_000_007;
	const rows: number[] = [];
	const stack: [filled: number, joints: number][] = [[0, 0]];
	for (let entry = stack.pop(); entry; entry = stack.pop()) {
		const [filled, joints] = entry;
		for (const brick of bricks) {
			const end = filled + brick;
			if (end === width) rows.push(joints);
			else if (end < width) stack.push([end, joints | (1 << end)]);
		}
	}
	const compatible = rows.map((a) =>
		rows.flatMap((b, j) => ((a & b) === 0 ? [j] : [])),
	);
	let ways = rows.map(() => 1);
	for (let level = 1; level < height; level++) {
		ways = compatible.map((options) =>
			options.reduce((sum, j) => (sum + (ways[j] ?? 0)) % MOD, 0),
		);
	}
	return ways.reduce((sum, w) => (sum + w) % MOD, 0);
};
