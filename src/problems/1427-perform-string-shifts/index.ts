/**
 * 1427. Perform String Shifts
 *
 * Applies the shifts `[direction, amount]` to `s` (0 moves characters from
 * the front to the back, 1 the other way) and returns the result.
 *
 * The shifts combine into one net rotation.
 *
 * @see https://leetcode.com/problems/perform-string-shifts/
 * @difficulty Easy
 * @timeComplexity O(n + s) for s shifts
 * @spaceComplexity O(n)
 *
 * @example
 * performStringShifts("abc", [[0, 1], [1, 2]]); // "cab"
 */
export const performStringShifts = (
	s: string,
	shift: readonly (readonly number[])[],
): string => {
	const left = shift.reduce(
		(total, [direction = 0, amount = 0]) =>
			total + (direction === 0 ? amount : -amount),
		0,
	);
	const k = ((left % s.length) + s.length) % s.length;
	return s.slice(k) + s.slice(0, k);
};
