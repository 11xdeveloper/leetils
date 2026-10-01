/**
 * 1536. Minimum Swaps to Arrange a Binary Grid
 *
 * Swapping neighbouring rows, returns the fewest swaps to make every cell
 * above the main diagonal 0, or -1.
 *
 * Row `i` needs at least `n − 1 − i` trailing zeros. Fill the rows top
 * down, each time bubbling up the nearest row below that has enough: any
 * row that works for an earlier position also works for later ones, so
 * taking the nearest never hurts.
 *
 * @see https://leetcode.com/problems/minimum-swaps-to-arrange-a-binary-grid/
 * @difficulty Medium
 * @timeComplexity O(n^2)
 * @spaceComplexity O(n)
 *
 * @example
 * minimumSwapsToArrangeABinaryGrid([[0, 0, 1], [1, 1, 0], [1, 0, 0]]); // 3
 */
export const minimumSwapsToArrangeABinaryGrid = (
	grid: readonly (readonly number[])[],
): number => {
	const n = grid.length;
	const zeros = grid.map((row) => {
		let count = 0;
		while (count < n && row[n - 1 - count] === 0) count++;
		return count;
	});
	let swaps = 0;
	for (let i = 0; i < n; i++) {
		const j = zeros.findIndex(
			(count, index) => index >= i && count >= n - 1 - i,
		);
		if (j === -1) return -1;
		const [row] = zeros.splice(j, 1);
		zeros.splice(i, 0, row ?? 0);
		swaps += j - i;
	}
	return swaps;
};
