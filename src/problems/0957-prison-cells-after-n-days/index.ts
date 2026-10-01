/**
 * 957. Prison Cells After N Days
 *
 * Eight prison cells change daily: a cell becomes occupied if its two
 * neighbours were both occupied or both vacant, and vacant otherwise; the
 * end cells always become vacant. Returns the cells after `n` days.
 *
 * There are at most 64 states after the first day (the ends are vacant),
 * so the sequence soon cycles. It simulates until a state repeats, then
 * skips the remaining whole cycles.
 *
 * @see https://leetcode.com/problems/prison-cells-after-n-days/
 * @difficulty Medium
 * @timeComplexity O(1): at most 64 distinct states
 * @spaceComplexity O(1)
 *
 * @example
 * prisonCellsAfterNDays([0, 1, 0, 1, 1, 0, 0, 1], 7); // [0, 0, 1, 1, 0, 0, 0, 0]
 */
export const prisonCellsAfterNDays = (
	cells: readonly number[],
	n: number,
): number[] => {
	const step = (state: readonly number[]): number[] =>
		state.map((_, i) =>
			i > 0 && i < state.length - 1 && state[i - 1] === state[i + 1] ? 1 : 0,
		);

	const seenOn = new Map<string, number>();
	let state = [...cells];
	for (let day = 0; day < n; day++) {
		const key = state.join("");
		const earlier = seenOn.get(key);
		if (earlier !== undefined) {
			const cycle = day - earlier;
			for (let remaining = (n - day) % cycle; remaining > 0; remaining--)
				state = step(state);
			return state;
		}
		seenOn.set(key, day);
		state = step(state);
	}
	return state;
};
