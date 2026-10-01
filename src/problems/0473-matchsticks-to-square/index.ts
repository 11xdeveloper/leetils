/**
 * 473. Matchsticks to Square
 *
 * Returns whether all the matchsticks can form a square, using each one
 * exactly once without breaking any.
 *
 * Each side must be a quarter of the total. Backtracking places the
 * longest sticks first, trying each side that still has room. Sides with
 * the same length so far are interchangeable, so only the first of them is
 * tried.
 *
 * @see https://leetcode.com/problems/matchsticks-to-square/
 * @difficulty Medium
 * @timeComplexity O(4^n) in the worst case, with heavy pruning in practice
 * @spaceComplexity O(n)
 *
 * @example
 * matchsticksToSquare([1, 1, 2, 2, 2]); // true: sides 1+1, 2, 2 and 2
 */
export const matchsticksToSquare = (
	matchsticks: readonly number[],
): boolean => {
	const total = matchsticks.reduce((sum, stick) => sum + stick, 0);
	const side = total / 4;
	const sticks = matchsticks.toSorted((a, b) => b - a);
	if (!Number.isInteger(side) || (sticks[0] ?? 0) > side) return false;

	const sides = [0, 0, 0, 0];
	const place = (index: number): boolean => {
		if (index === sticks.length) return true;
		const stick = sticks[index] ?? 0;
		for (let s = 0; s < 4; s++) {
			const length = sides[s] ?? 0;
			if (length + stick > side || sides.indexOf(length) < s) continue;
			sides[s] = length + stick;
			if (place(index + 1)) return true;
			sides[s] = length;
		}
		return false;
	};

	return place(0);
};
