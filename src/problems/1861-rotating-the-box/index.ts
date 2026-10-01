/**
 * 1861. Rotating the Box
 *
 * Rotates the side view `boxGrid` (stones `#`, obstacles `*`, empty `.`)
 * 90° clockwise and lets the stones fall. Returns the result.
 *
 * Falling after the rotation is sliding right before it: in each row,
 * move stones right until an obstacle, tracking the next free slot. Then
 * rotate.
 *
 * @see https://leetcode.com/problems/rotating-the-box/
 * @difficulty Medium
 * @timeComplexity O(mn)
 * @spaceComplexity O(mn)
 *
 * @example
 * rotatingTheBox([["#", ".", "#"]]); // [["."], ["#"], ["#"]]
 */
export const rotatingTheBox = (
	boxGrid: readonly (readonly string[])[],
): string[][] => {
	const [m, n] = [boxGrid.length, boxGrid[0]?.length ?? 0];
	const settled = boxGrid.map((row) => {
		const result = [...row];
		let free = n - 1;
		for (let c = n - 1; c >= 0; c--) {
			if (row[c] === "*") free = c - 1;
			else if (row[c] === "#") {
				result[c] = ".";
				result[free] = "#";
				free--;
			}
		}
		return result;
	});
	return Array.from({ length: n }, (_, c) =>
		Array.from({ length: m }, (_, r) => settled[m - 1 - r]?.[c] ?? "."),
	);
};
