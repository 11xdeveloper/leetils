/**
 * 1388. Pizza With 3n Slices
 *
 * From a circle of `3n` slices, you repeatedly pick one and two friends take
 * its neighbours. Returns the largest total you can pick.
 *
 * Your picks can be any `n` slices with no two adjacent around the circle
 * (and any such set can be picked). Breaking the circle, either the first
 * or the last slice is excluded; for each line, dynamic programming finds
 * the best `n` non-adjacent slices.
 *
 * @see https://leetcode.com/problems/pizza-with-3n-slices/
 * @difficulty Hard
 * @timeComplexity O(n^2)
 * @spaceComplexity O(n)
 *
 * @example
 * pizzaWith3nSlices([8, 9, 8, 6, 1, 1]); // 16
 */
export const pizzaWith3nSlices = (slices: readonly number[]): number => {
	const picks = slices.length / 3;
	const bestInLine = (line: readonly number[]): number => {
		// taken[j] and skipped[j]: best with j picks so far, having just taken or skipped a slice.
		let taken = new Array<number>(picks + 1).fill(-Infinity);
		let skipped = new Array<number>(picks + 1).fill(-Infinity);
		skipped[0] = 0;
		for (const slice of line) {
			const nextTaken = new Array<number>(picks + 1).fill(-Infinity);
			const nextSkipped = new Array<number>(picks + 1).fill(-Infinity);
			for (let j = 0; j <= picks; j++) {
				nextSkipped[j] = Math.max(
					taken[j] ?? -Infinity,
					skipped[j] ?? -Infinity,
				);
				if (j > 0) nextTaken[j] = (skipped[j - 1] ?? -Infinity) + slice;
			}
			[taken, skipped] = [nextTaken, nextSkipped];
		}
		return Math.max(taken[picks] ?? -Infinity, skipped[picks] ?? -Infinity);
	};
	return Math.max(bestInLine(slices.slice(1)), bestInLine(slices.slice(0, -1)));
};
