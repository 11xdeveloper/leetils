const MOVES = [
	[-2, -1],
	[-2, 1],
	[-1, -2],
	[-1, 2],
	[1, -2],
	[1, 2],
	[2, -1],
	[2, 1],
] as const;

/**
 * 2664. The Knight’s Tour
 *
 * Returns an `m × n` board where each cell holds the step at which a
 * knight starting at `(r, c)` visits it, covering every cell once. A
 * tour is guaranteed to exist.
 *
 * Backtracking, trying first the moves with the fewest onward options
 * (Warnsdorff's rule), which finds a tour almost immediately.
 *
 * @see https://leetcode.com/problems/the-knights-tour/
 * @difficulty Medium
 * @timeComplexity O(8^(m · n)) in the worst case, fast in practice for m, n ≤ 5
 * @spaceComplexity O(m · n)
 *
 * @example
 * theKnightsTour(1, 1, 0, 0); // [[0]]
 */
export const theKnightsTour = (
	m: number,
	n: number,
	r: number,
	c: number,
): number[][] => {
	const board = Array.from({ length: m }, () =>
		Array.from({ length: n }, () => -1),
	);
	const free = (i: number, j: number): boolean => board[i]?.[j] === -1;
	const onward = (i: number, j: number): [number, number][] =>
		MOVES.map(([di, dj]): [number, number] => [i + di, j + dj]).filter(
			([a, b]) => free(a, b),
		);

	const tour = (i: number, j: number, step: number): boolean => {
		(board[i] ?? [])[j] = step;
		if (step === m * n - 1) return true;
		const next = onward(i, j).sort(
			([a1, b1], [a2, b2]) => onward(a1, b1).length - onward(a2, b2).length,
		);
		for (const [a, b] of next) if (tour(a, b, step + 1)) return true;
		(board[i] ?? [])[j] = -1;
		return false;
	};
	tour(r, c, 0);
	return board;
};
