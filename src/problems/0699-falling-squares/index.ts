/**
 * 699. Falling Squares
 *
 * Squares `[left, sideLength]` are dropped one at a time onto the x-axis,
 * each landing on the highest square below it (touching edges don't
 * count). Returns the height of the tallest stack after each drop.
 *
 * Keeps each landed square's span and top height. A new square lands on
 * the highest top among those overlapping its span, which a scan over the
 * earlier squares finds.
 *
 * @see https://leetcode.com/problems/falling-squares/
 * @difficulty Hard
 * @timeComplexity O(n^2)
 * @spaceComplexity O(n)
 *
 * @example
 * fallingSquares([[1, 2], [2, 3], [6, 1]]); // [2, 5, 5]
 */
export const fallingSquares = (
	positions: readonly (readonly number[])[],
): number[] => {
	const landed: [left: number, right: number, top: number][] = [];
	const tallest: number[] = [];
	let highest = 0;

	for (const [left = 0, side = 0] of positions) {
		const right = left + side;
		let base = 0;
		for (const [otherLeft, otherRight, top] of landed) {
			if (otherLeft < right && left < otherRight) base = Math.max(base, top);
		}
		landed.push([left, right, base + side]);
		highest = Math.max(highest, base + side);
		tallest.push(highest);
	}

	return tallest;
};
