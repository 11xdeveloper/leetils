/**
 * 2258. Escape the Spreading Fire
 *
 * You start at the top-left of `grid` (0 grass, 1 fire, 2 wall) and must
 * reach the bottom-right safehouse; each minute you move one cell and then
 * fire spreads to adjacent grass. Returns the most minutes you can wait
 * first and still escape, -1 if you can't, or 10^9 if you always can.
 *
 * Breadth-first search gives when fire reaches each cell. Binary search
 * the wait, checking each with a search that only enters a cell before the
 * fire does (or at the same time, at the safehouse).
 *
 * @see https://leetcode.com/problems/escape-the-spreading-fire/
 * @difficulty Hard
 * @timeComplexity O(m · n · log(m · n))
 * @spaceComplexity O(m · n)
 *
 * @example
 * escapeTheSpreadingFire([[0, 0, 0, 0], [0, 1, 2, 0], [0, 2, 0, 0]]); // -1
 */
export const escapeTheSpreadingFire = (
	grid: readonly (readonly number[])[],
): number => {
	const [m, n] = [grid.length, grid[0]?.length ?? 0];
	const cells = m * n;
	const neighbours = (cell: number): number[] => {
		const [r, c] = [Math.floor(cell / n), cell % n];
		const result: number[] = [];
		if (r > 0) result.push(cell - n);
		if (r < m - 1) result.push(cell + n);
		if (c > 0) result.push(cell - 1);
		if (c < n - 1) result.push(cell + 1);
		return result.filter(
			(next) => grid[Math.floor(next / n)]?.[next % n] !== 2,
		);
	};

	const fire = new Array<number>(cells).fill(Infinity);
	const queue: number[] = [];
	for (let cell = 0; cell < cells; cell++) {
		if (grid[Math.floor(cell / n)]?.[cell % n] === 1) {
			fire[cell] = 0;
			queue.push(cell);
		}
	}
	for (let head = 0; head < queue.length; head++) {
		const cell = queue[head] ?? 0;
		for (const next of neighbours(cell)) {
			if (fire[next] !== Infinity) continue;
			fire[next] = (fire[cell] ?? 0) + 1;
			queue.push(next);
		}
	}

	const safehouse = cells - 1;
	const escapes = (wait: number): boolean => {
		if ((fire[0] ?? 0) <= wait) return false;
		const time = new Array<number>(cells).fill(-1);
		time[0] = wait;
		const people = [0];
		for (let head = 0; head < people.length; head++) {
			const cell = people[head] ?? 0;
			const arrival = (time[cell] ?? 0) + 1;
			for (const next of neighbours(cell)) {
				if (time[next] !== -1) continue;
				const burns = fire[next] ?? Infinity;
				if (next === safehouse) {
					if (arrival <= burns) return true;
					continue;
				}
				if (arrival >= burns) continue;
				time[next] = arrival;
				people.push(next);
			}
		}
		return false;
	};

	if (!escapes(0)) return -1;
	if (escapes(cells)) return 1_000_000_000;
	let [lo, hi] = [0, cells];
	while (lo < hi) {
		const wait = Math.ceil((lo + hi) / 2);
		if (escapes(wait)) lo = wait;
		else hi = wait - 1;
	}
	return lo;
};
