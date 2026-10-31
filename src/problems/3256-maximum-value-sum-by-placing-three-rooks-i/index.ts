/**
 * 3256. Maximum Value Sum by Placing Three Rooks I
 *
 * Place three rooks on the board, no two sharing a row or column. Returns
 * the largest sum of the values under them.
 *
 * Some best placement uses only cells among the three largest in their row:
 * any other rook could move to one of those, as the other two rooks block
 * at most two columns. The same holds for columns among those cells. Then
 * each rook clashes with at most twelve candidates, so it can be swapped
 * into the thirteen largest candidates, and trying every triple of those
 * finishes the job.
 *
 * @see https://leetcode.com/problems/maximum-value-sum-by-placing-three-rooks-i/
 * @difficulty Hard
 * @timeComplexity O(m · n)
 * @spaceComplexity O(m + n)
 *
 * @example
 * maximumValueSumByPlacingThreeRooksI([[-3, 1, 1, 1], [-3, 1, -3, 1], [-3, 2, 1, 1]]); // 4
 */
export const maximumValueSumByPlacingThreeRooksI = (
	board: readonly (readonly number[])[],
): number => {
	const topThree = <T>(items: T[], value: (item: T) => number): T[] =>
		items.sort((a, b) => value(b) - value(a)).slice(0, 3);
	const cell = ([r, c]: readonly [number, number]): number =>
		board[r]?.[c] ?? 0;
	const byRow = board.flatMap((row, r) =>
		topThree(
			row.map((_, c) => [r, c] as [number, number]),
			cell,
		),
	);
	const byColumn = new Map<number, [number, number][]>();
	for (const position of byRow) {
		const list = byColumn.get(position[1]) ?? [];
		list.push(position);
		byColumn.set(position[1], list);
	}
	const candidates = [...byColumn.values()]
		.flatMap((list) => topThree(list, cell))
		.sort((a, b) => cell(b) - cell(a))
		.slice(0, 13);
	let best = Number.NEGATIVE_INFINITY;
	for (let i = 0; i < candidates.length; i++)
		for (let j = i + 1; j < candidates.length; j++)
			for (let k = j + 1; k < candidates.length; k++) {
				const [a = [0, 0], b = [0, 0], c = [0, 0]] = [
					candidates[i],
					candidates[j],
					candidates[k],
				];
				if (a[0] === b[0] || a[0] === c[0] || b[0] === c[0]) continue;
				if (a[1] === b[1] || a[1] === c[1] || b[1] === c[1]) continue;
				best = Math.max(best, cell(a) + cell(b) + cell(c));
			}
	return best;
};
