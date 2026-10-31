/**
 * 2814. Minimum Time Takes to Reach Destination Without Drowning
 *
 * On a grid, "S" is you, "D" the destination, "X" stone, "*" flooded and
 * "." empty land. Each second you step to a neighbouring cell, then the
 * flood spreads to every empty cell next to it; it never covers stone or
 * the destination. You can't step onto a cell that is or is about to be
 * flooded. Returns the fewest seconds to reach "D", or -1.
 *
 * Breadth-first search from the flood gives when each cell goes under.
 * Then search from the start, entering a cell at second `t` only if it
 * floods later than `t`.
 *
 * @see https://leetcode.com/problems/minimum-time-takes-to-reach-destination-without-drowning/
 * @difficulty Hard
 * @timeComplexity O(m · n)
 * @spaceComplexity O(m · n)
 *
 * @example
 * minimumTimeTakesToReachDestinationWithoutDrowning([["D", ".", "*"], [".", ".", "."], [".", "S", "."]]); // 3
 */
export const minimumTimeTakesToReachDestinationWithoutDrowning = (
	land: readonly (readonly string[])[],
): number => {
	const rows = land.length;
	const cols = land[0]?.length ?? 0;
	const at = (cell: number): string =>
		land[Math.floor(cell / cols)]?.[cell % cols] ?? "X";
	const neighbours = (cell: number): number[] => {
		const r = Math.floor(cell / cols);
		const c = cell % cols;
		const result: number[] = [];
		if (r > 0) result.push(cell - cols);
		if (r < rows - 1) result.push(cell + cols);
		if (c > 0) result.push(cell - 1);
		if (c < cols - 1) result.push(cell + 1);
		return result;
	};
	const search = (
		sources: number[],
		open: (cell: number, time: number) => boolean,
	): number[] => {
		const time = Array.from(
			{ length: rows * cols },
			() => Number.POSITIVE_INFINITY,
		);
		for (const source of sources) time[source] = 0;
		const queue = [...sources];
		for (let head = 0; head < queue.length; head++) {
			const cell = queue[head] ?? 0;
			const next = (time[cell] ?? 0) + 1;
			for (const other of neighbours(cell))
				if (time[other] === Number.POSITIVE_INFINITY && open(other, next)) {
					time[other] = next;
					queue.push(other);
				}
		}
		return time;
	};

	const cells = [...Array(rows * cols).keys()];
	const flooded = search(
		cells.filter((cell) => at(cell) === "*"),
		(cell) => at(cell) === "." || at(cell) === "S",
	);
	const start = cells.find((cell) => at(cell) === "S") ?? 0;
	const target = cells.find((cell) => at(cell) === "D") ?? 0;
	const reached = search(
		[start],
		(cell, time) => at(cell) !== "X" && (flooded[cell] ?? 0) > time,
	);
	const answer = reached[target] ?? Number.POSITIVE_INFINITY;
	return answer === Number.POSITIVE_INFINITY ? -1 : answer;
};
