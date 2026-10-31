/**
 * 3279. Maximum Total Area Occupied by Pistons
 *
 * Pistons at `positions` move one unit per second in their `directions`
 * (`U` or `D`), bouncing between 0 and `height`. Returns the largest total
 * of their positions at any moment.
 *
 * Each piston's position changes linearly between bounces, and everything
 * repeats every 2 · height seconds. So the total is piecewise linear with
 * slope changes at the bounces in one period: sweep over them, tracking the
 * total and slope, and take the best value at a breakpoint.
 *
 * @see https://leetcode.com/problems/maximum-total-area-occupied-by-pistons/
 * @difficulty Hard
 * @timeComplexity O(n log n)
 * @spaceComplexity O(n)
 *
 * @example
 * maximumTotalAreaOccupiedByPistons(5, [2, 5], "UD"); // 7
 */
export const maximumTotalAreaOccupiedByPistons = (
	height: number,
	positions: readonly number[],
	directions: string,
): number => {
	const changes = new Map<number, number>();
	const at = (time: number, delta: number): void => {
		changes.set(time, (changes.get(time) ?? 0) + delta);
	};
	let total = 0;
	let slope = 0;
	positions.forEach((position, i) => {
		total += position;
		if (directions[i] === "U") {
			slope++;
			at(height - position, -2);
			at(2 * height - position, 2);
		} else {
			slope--;
			at(position, 2);
			at(height + position, -2);
		}
	});
	let best = total;
	let time = 0;
	for (const next of [...changes.keys()].sort((a, b) => a - b)) {
		total += slope * (next - time);
		time = next;
		best = Math.max(best, total);
		slope += changes.get(next) ?? 0;
	}
	return best;
};
