/**
 * 1591. Strange Printer II
 *
 * A printer prints solid rectangles of one colour over what's there, using
 * each colour at most once. Returns whether `targetGrid` can be printed.
 *
 * Each colour must be printed over its bounding rectangle, so any other
 * colour seen inside that rectangle has to be printed later. The grid can
 * be printed exactly when those "before" relations have no cycle, checked
 * with a topological sort.
 *
 * @see https://leetcode.com/problems/strange-printer-ii/
 * @difficulty Hard
 * @timeComplexity O(c · mn) for c colours
 * @spaceComplexity O(c^2)
 *
 * @example
 * strangePrinterII([[1, 2, 1], [2, 1, 2], [1, 2, 1]]); // false
 */
export const strangePrinterII = (
	targetGrid: readonly (readonly number[])[],
): boolean => {
	const bounds = new Map<number, [number, number, number, number]>();
	targetGrid.forEach((row, r) => {
		row.forEach((colour, c) => {
			const [top, left, bottom, right] = bounds.get(colour) ?? [r, c, r, c];
			bounds.set(colour, [
				Math.min(top, r),
				Math.min(left, c),
				Math.max(bottom, r),
				Math.max(right, c),
			]);
		});
	});
	const after = new Map<number, Set<number>>();
	const waiting = new Map<number, number>(
		[...bounds.keys()].map((colour) => [colour, 0]),
	);
	for (const [colour, [top, left, bottom, right]] of bounds) {
		const later = new Set<number>();
		for (let r = top; r <= bottom; r++) {
			for (let c = left; c <= right; c++) {
				const other = targetGrid[r]?.[c] ?? colour;
				if (other !== colour) later.add(other);
			}
		}
		after.set(colour, later);
		for (const other of later)
			waiting.set(other, (waiting.get(other) ?? 0) + 1);
	}
	const ready = [...waiting]
		.filter(([, count]) => count === 0)
		.map(([colour]) => colour);
	let printed = 0;
	for (let colour = ready.pop(); colour !== undefined; colour = ready.pop()) {
		printed++;
		for (const other of after.get(colour) ?? []) {
			const count = (waiting.get(other) ?? 0) - 1;
			waiting.set(other, count);
			if (count === 0) ready.push(other);
		}
	}
	return printed === bounds.size;
};
