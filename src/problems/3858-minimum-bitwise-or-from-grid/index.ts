/**
 * 3858. Minimum Bitwise OR From Grid
 *
 * Pick one number from each row of `grid`, minimising their bitwise OR.
 *
 * Decide bits from the top: rule a bit out whenever every row still has a
 * number avoiding all the bits ruled out so far. The answer is the bits
 * that couldn't be ruled out.
 *
 * @see https://leetcode.com/problems/minimum-bitwise-or-from-grid/
 * @difficulty Medium
 * @timeComplexity O(m · n · log V)
 * @spaceComplexity O(1)
 *
 * @example
 * minimumBitwiseOrFromGrid([[3, 5], [6, 4]]); // 5
 */
export const minimumBitwiseOrFromGrid = (
	grid: readonly (readonly number[])[],
): number => {
	let bits = 1;
	while (1 << bits <= Math.max(...grid.flat())) bits++;
	let banned = 0;
	for (let bit = bits - 1; bit >= 0; bit--) {
		const trial = banned | (1 << bit);
		if (grid.every((row) => row.some((x) => (x & trial) === 0))) banned = trial;
	}
	return ((1 << bits) - 1) & ~banned;
};
