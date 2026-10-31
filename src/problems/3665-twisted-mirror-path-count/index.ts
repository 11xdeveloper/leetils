const MOD = 1_000_000_007;

/**
 * 3665. Twisted Mirror Path Count
 *
 * A robot goes from the top-left of `grid` to the bottom-right moving
 * right or down. Entering a mirror (a 1) deflects it: moving right it's
 * sent down, moving down it's sent right. Counts the paths, modulo 1e9+7.
 *
 * Count ways to enter each cell by direction. From an empty cell, either
 * move is possible; from a mirror, only the deflected one.
 *
 * @see https://leetcode.com/problems/twisted-mirror-path-count/
 * @difficulty Medium
 * @timeComplexity O(m · n)
 * @spaceComplexity O(m · n)
 *
 * @example
 * twistedMirrorPathCount([[0, 1, 0], [0, 0, 1], [1, 0, 0]]); // 5
 */
export const twistedMirrorPathCount = (
	grid: readonly (readonly number[])[],
): number => {
	const m = grid.length;
	const n = grid[0]?.length ?? 0;
	// fromLeft/fromAbove: ways to enter each cell moving right/down.
	const fromLeft = new Array<number>(m * n).fill(0);
	const fromAbove = new Array<number>(m * n).fill(0);
	fromLeft[0] = 1;
	for (let i = 0; i < m; i++)
		for (let j = 0; j < n; j++) {
			const cell = i * n + j;
			const [right, down] = [fromLeft[cell] ?? 0, fromAbove[cell] ?? 0];
			const [goRight, goDown] = grid[i]?.[j]
				? [down, right]
				: [(right + down) % MOD, (right + down) % MOD];
			if (j + 1 < n)
				fromLeft[cell + 1] = ((fromLeft[cell + 1] ?? 0) + goRight) % MOD;
			if (i + 1 < m)
				fromAbove[cell + n] = ((fromAbove[cell + n] ?? 0) + goDown) % MOD;
		}
	return ((fromLeft[m * n - 1] ?? 0) + (fromAbove[m * n - 1] ?? 0)) % MOD;
};
